"use client";

import { useState, useMemo } from "react";
import { X, ArrowLeft, ArrowRight, MapPin, Phone, Mail, Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPriceRaw } from "@/lib/format";
import { getClientSupabase } from "@/lib/supabase";
import type { Product, Tenant, CheckoutForm, PaymentMethod } from "@/lib/types";
import { VALID_PLZ, MOCK_PAYMENT_METHODS } from "@/lib/mock-data";

interface Props {
  open: boolean;
  onClose: () => void;
  onComplete: (orderId: string, customerName: string) => void;
  productMap: Map<string, Product>;
  tenant: Tenant;
  paymentMethods?: PaymentMethod[];
}

type Step = "plz" | "address" | "contact" | "payment" | "review";
const STEPS: Step[] = ["plz", "address", "contact", "payment", "review"];

export function CheckoutModal({ open, onClose, onComplete, productMap, tenant, paymentMethods }: Props) {
  const activePaymentMethods = (paymentMethods ?? MOCK_PAYMENT_METHODS).filter((pm) => pm.enabled_lieferung);
  const [step, setStep] = useState<Step>("plz");
  const defaultPayment = (paymentMethods ?? MOCK_PAYMENT_METHODS).find((pm) => pm.enabled_lieferung)?.method ?? "bar";
  const [form, setForm] = useState<CheckoutForm>({
    plz: "",
    strasse: "",
    hausnummer: "",
    etage: "",
    name: "",
    telefon: "",
    email: "",
    zahlungsart: defaultPayment,
    anmerkung: "",
  });
  const [plzError, setPlzError] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [freeDeliveryPromo, setFreeDeliveryPromo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const rawItems = useCartStore((s) => s.items);
  const items = useMemo(() => useCartStore.getState().getComputedItems(productMap), [rawItems, productMap]);
  const subtotal = useCartStore((s) => s.subtotal(productMap));
  const deliveryFee = useCartStore((s) =>
    s.deliveryFee(productMap, tenant.liefergebuehr, tenant.free_delivery_threshold),
  );
  const clearCart = useCartStore((s) => s.clearCart);
  const effectiveDeliveryFee = freeDeliveryPromo ? 0 : deliveryFee;
  const grandTotal = Math.max(0, subtotal - promoDiscount) + effectiveDeliveryFee + tipAmount;

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "PASTA10") {
      const discount = subtotal * 0.1;
      setPromoDiscount(discount);
      setPromoMsg({ type: "ok", text: `10% Rabatt (−${formatPriceRaw(discount)}) angewendet!` });
    } else if (code === "FRANKY5") {
      setPromoDiscount(5);
      setPromoMsg({ type: "ok", text: "5 € Rabatt angewendet!" });
    } else if (code === "GRATIS") {
      setFreeDeliveryPromo(true);
      setPromoMsg({ type: "ok", text: "Gratis-Lieferung aktiviert!" });
    } else {
      setPromoMsg({ type: "err", text: `"${promoCode}" ist leider ungültig.` });
    }
  };

  const stepIndex = STEPS.indexOf(step);

  const update = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validatePlz = () => {
    if (!VALID_PLZ.includes(form.plz)) {
      setPlzError(`Wir liefern leider noch nicht nach ${form.plz || "dort"}. Nur ${VALID_PLZ[0]}–${VALID_PLZ[VALID_PLZ.length - 1]}.`);
      return false;
    }
    setPlzError("");
    return true;
  };

  const next = () => {
    if (step === "plz" && !validatePlz()) return;
    if (step === "address" && (!form.strasse || !form.hausnummer)) return;
    if (step === "contact" && (!form.name || !form.telefon)) return;
    const idx = STEPS.indexOf(step);
    if (idx < STEPS.length - 1) setStep(STEPS[idx + 1]);
  };

  const back = () => {
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
    else onClose();
  };

  const submit = async () => {
    if (submitting) return;
    if (subtotal < tenant.mindestbestellwert) {
      setSubmitError(`Mindestbestellwert von ${formatPriceRaw(tenant.mindestbestellwert)} nicht erreicht.`);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    try {
      const supabase = getClientSupabase();
      const kundeAdresse = `${form.strasse} ${form.hausnummer}${form.etage ? `, ${form.etage}` : ""}`;

      // 1. Create order
      const { data: order, error: orderErr } = await supabase
        .from("customer_orders")
        .insert({
          location_id: tenant.location_id,
          typ: "lieferung",
          kunde_name: form.name,
          kunde_telefon: form.telefon,
          kunde_email: form.email || null,
          kunde_adresse: kundeAdresse,
          kunde_plz: form.plz,
          anmerkung: form.anmerkung || null,
          zwischensumme: subtotal,
          liefergebuehr: effectiveDeliveryFee,
          trinkgeld: tipAmount,
          rabatt: promoDiscount,
          gesamtbetrag: grandTotal,
          zahlungsart: form.zahlungsart,
          status: "neu",
        })
        .select("id,bestellnummer")
        .single();

      if (orderErr || !order) {
        throw new Error(orderErr?.message ?? "Bestellung konnte nicht erstellt werden.");
      }

      // 2. Insert order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        name: item.product.name,
        menge: item.qty,
        einzelpreis: item.unitPrice,
        gesamtpreis: item.lineTotal,
        optionen: item.selections ?? null,
      }));

      const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
      if (itemsErr) {
        console.error("order_items insert failed:", itemsErr.message);
      }

      // 3. Trigger email outbox (fire-and-forget)
      fetch("https://mise-gastro.de/api/email/process-outbox", { method: "POST" }).catch(() => {});

      // 4. Route by payment method
      if (form.zahlungsart !== "bar") {
        const sessionRes = await fetch("https://mise-gastro.de/api/checkout/create-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: order.id }),
        });

        if (sessionRes.ok) {
          const { url } = await sessionRes.json();
          if (url) {
            clearCart();
            window.location.href = url;
            return;
          }
        }
        // If Stripe session fails, fall through to show tracking with the created order
      }

      clearCart();
      onComplete(order.bestellnummer ?? order.id, form.name);
    } catch (err: any) {
      setSubmitError(err?.message ?? "Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  const eta = new Date();
  eta.setMinutes(eta.getMinutes() + tenant.durchschnittliche_lieferzeit_min);
  const etaStr = eta.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <div className="fixed inset-0 z-[110] bg-black/50" onClick={onClose} />

      <div className="fixed inset-0 z-[111] flex items-end sm:items-center justify-center">
        <div className="bg-bone w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[90vh] flex flex-col shadow-xl animate-[reveal-up_0.3s_ease-out]">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-line">
            <button onClick={back} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream transition-colors">
              <ArrowLeft size={18} />
            </button>
            <div className="flex flex-col items-center gap-1.5">
              <div className="text-xs font-bold text-sage-dark">
                Schritt {stepIndex + 1} von {STEPS.length}
              </div>
              {/* Step dots */}
              <div className="flex items-center gap-1.5">
                {STEPS.map((s, i) => (
                  <div
                    key={s}
                    className={`rounded-full transition-all ${
                      i < stepIndex
                        ? "w-2 h-2 bg-sage"
                        : i === stepIndex
                          ? "w-5 h-2 bg-sage"
                          : "w-2 h-2 bg-cream-deep"
                    }`}
                  />
                ))}
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {submitError && (
              <div className="mb-3 px-4 py-3 bg-burgundy/10 text-burgundy text-sm rounded-xl">
                {submitError}
              </div>
            )}
            {step === "plz" && (
              <div>
                <h2 className="font-display font-black text-xl text-sage-dark mb-1">
                  Wo sollen wir liefern?
                </h2>
                <p className="text-sm text-muted mb-4">Prüfe ob wir in dein Gebiet liefern.</p>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="PLZ eingeben (z.B. 52062)"
                    value={form.plz}
                    onChange={(e) => { update("plz", e.target.value.replace(/\D/g, "")); setPlzError(""); }}
                    className={`w-full pl-10 pr-10 py-3 bg-white border rounded-xl text-base focus:ring-2 outline-none transition-all ${
                      form.plz.length === 5 && VALID_PLZ.includes(form.plz)
                        ? "border-sage-bright focus:border-sage-bright focus:ring-sage-bright/20"
                        : "border-line focus:border-sage focus:ring-sage/20"
                    }`}
                  />
                  {form.plz.length === 5 && VALID_PLZ.includes(form.plz) && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-sage-bright rounded-full flex items-center justify-center">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </div>
                {form.plz.length === 5 && VALID_PLZ.includes(form.plz) && (
                  <div className="mt-2 text-sm text-sage-bright bg-sage/5 p-3 rounded-lg font-medium">
                    ✓ Super! Wir liefern nach {form.plz}.
                  </div>
                )}
                {plzError && (
                  <div className="mt-2 text-sm text-burgundy bg-burgundy/5 p-3 rounded-lg">
                    {plzError}
                  </div>
                )}
              </div>
            )}

            {step === "address" && (
              <div>
                <h2 className="font-display font-black text-xl text-sage-dark mb-4">
                  Deine Adresse
                </h2>
                <div className="space-y-3">
                  <div className="grid grid-cols-[2fr_1fr] gap-3">
                    <input
                      placeholder="Straße *"
                      value={form.strasse}
                      onChange={(e) => update("strasse", e.target.value)}
                      className="px-4 py-3 bg-white border border-line rounded-xl focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none"
                    />
                    <input
                      placeholder="Nr. *"
                      value={form.hausnummer}
                      onChange={(e) => update("hausnummer", e.target.value)}
                      className="px-4 py-3 bg-white border border-line rounded-xl focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none"
                    />
                  </div>
                  <input
                    placeholder="Etage / Klingel (optional)"
                    value={form.etage}
                    onChange={(e) => update("etage", e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-line rounded-xl focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none"
                  />
                  <div className="px-3 py-2 bg-sage/5 rounded-lg text-sm text-sage">
                    📍 {form.plz} Aachen
                  </div>
                </div>
              </div>
            )}

            {step === "contact" && (
              <div>
                <h2 className="font-display font-black text-xl text-sage-dark mb-4">
                  Kontaktdaten
                </h2>
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      placeholder="Dein Name *"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-line rounded-xl focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      type="tel"
                      placeholder="Telefonnummer *"
                      value={form.telefon}
                      onChange={(e) => update("telefon", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-line rounded-xl focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      type="email"
                      placeholder="E-Mail (optional)"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-line rounded-xl focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div>
                <h2 className="font-display font-black text-xl text-sage-dark mb-1">
                  Wie möchtest du zahlen?
                </h2>
                <p className="text-sm text-muted mb-4">Wähle deine bevorzugte Zahlungsart.</p>

                <div className="grid grid-cols-2 gap-2">
                  {activePaymentMethods.map((pm) => (
                    <label
                      key={pm.method}
                      className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer border transition-all ${
                        form.zahlungsart === pm.method
                          ? "bg-sage/5 border-sage"
                          : "bg-white border-transparent hover:border-line-strong"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={pm.method}
                        checked={form.zahlungsart === pm.method}
                        onChange={() => update("zahlungsart", pm.method)}
                        className="sr-only"
                      />
                      <span className="text-lg leading-none">
                        {pm.method === "bar" ? "💵" : pm.method === "karte" ? "💳" : pm.method === "paypal" ? "🅿️" : pm.method === "klarna" ? "🟣" : pm.method === "apple_pay" ? "🍎" : pm.method === "google_pay" ? "🔵" : pm.method === "sepa" ? "🏦" : "💱"}
                      </span>
                      <span className="text-xs font-semibold text-sage-dark">{pm.label}</span>
                    </label>
                  ))}
                </div>

                {/* Tip */}
                <div className="mt-5 p-4 bg-cream-soft rounded-xl">
                  <div className="text-sm font-bold text-sage-dark mb-1">
                    Grazie an deinen Fahrer 🛵
                  </div>
                  <div className="text-xs text-muted mb-3">
                    100 % geht direkt an die Person, die dir die Pasta bringt.
                  </div>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 5].map((t) => (
                      <button
                        key={t}
                        onClick={() => setTipAmount(t)}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                          tipAmount === t
                            ? "bg-sage text-white"
                            : "bg-white text-sage-dark hover:bg-cream-deep"
                        }`}
                      >
                        {t === 0 ? "Kein" : `${t} €`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-5 p-4 bg-white rounded-xl border border-line">
                  <div className="text-sm font-bold text-sage-dark mb-2">
                    🎟️ Gutscheincode
                  </div>
                  <div className="flex gap-2">
                    <input
                      placeholder="z.B. PASTA10"
                      value={promoCode}
                      onChange={(e) => { setPromoCode(e.target.value); setPromoMsg(null); }}
                      className="flex-1 px-3 py-2 bg-cream-soft border border-line rounded-lg text-sm focus:border-sage outline-none"
                    />
                    <button
                      onClick={applyPromo}
                      disabled={!promoCode.trim()}
                      className="px-4 py-2 bg-sage text-white text-sm font-bold rounded-lg hover:bg-sage-hover disabled:opacity-40 transition-colors"
                    >
                      Einlösen
                    </button>
                  </div>
                  {promoMsg && (
                    <div className={`mt-2 text-xs font-medium p-2 rounded-lg ${
                      promoMsg.type === "ok" ? "bg-sage/10 text-sage" : "bg-burgundy/10 text-burgundy"
                    }`}>
                      {promoMsg.text}
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === "review" && (
              <div>
                <h2 className="font-display font-black text-xl text-sage-dark mb-4">
                  Bestellübersicht
                </h2>

                {/* Items */}
                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div key={item.cartKey} className="flex justify-between text-sm">
                      <span>
                        {item.qty}× {item.product.name}
                        {item.optionsSummary && (
                          <span className="text-xs text-muted block">{item.optionsSummary}</span>
                        )}
                      </span>
                      <span className="font-bold tabular-nums">{formatPriceRaw(item.lineTotal)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-line pt-3 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Zwischensumme</span>
                    <span className="tabular-nums">{formatPriceRaw(subtotal)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sage">
                      <span>Gutschein</span>
                      <span className="font-bold tabular-nums">−{formatPriceRaw(promoDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted">Lieferung</span>
                    <span className={`tabular-nums ${effectiveDeliveryFee === 0 ? "text-sage-bright font-bold" : ""}`}>
                      {effectiveDeliveryFee === 0 ? "GRATIS" : formatPriceRaw(effectiveDeliveryFee)}
                    </span>
                  </div>
                  {tipAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted">Trinkgeld</span>
                      <span className="tabular-nums">{formatPriceRaw(tipAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-base border-t border-line pt-2">
                    <span>Gesamt</span>
                    <span className="tabular-nums">{formatPriceRaw(grandTotal)}</span>
                  </div>
                </div>

                {/* Address Summary */}
                <div className="mt-4 p-3 bg-cream-soft rounded-xl text-sm">
                  <div className="font-bold text-sage-dark">{form.name}</div>
                  <div className="text-muted">
                    {form.strasse} {form.hausnummer}
                    {form.etage && `, ${form.etage}`}
                  </div>
                  <div className="text-muted">{form.plz} Aachen</div>
                  <div className="text-muted mt-1">{form.telefon}</div>
                </div>

                {/* Bestellanmerkung */}
                <textarea
                  placeholder="Anmerkung zur Bestellung (optional)"
                  value={form.anmerkung}
                  onChange={(e) => update("anmerkung", e.target.value)}
                  maxLength={200}
                  rows={2}
                  className="mt-4 w-full px-4 py-3 bg-white border border-line rounded-xl text-sm focus:border-sage focus:ring-2 focus:ring-sage/20 outline-none resize-none"
                />

                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span>⏱ Lieferung gegen</span>
                  <b className="text-sage-dark">{etaStr}</b> <span className="text-xs text-muted">(&plusmn; 5 Min)</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-line px-5 py-4 flex items-center gap-3">
            <div className="flex-1">
              <div className="text-xs text-muted">Gesamt</div>
              <div className="font-bold text-lg tabular-nums">{formatPriceRaw(grandTotal)}</div>
            </div>
            {step === "review" ? (
              <button
                onClick={submit}
                disabled={submitting}
                className="flex-1 h-12 bg-sage text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-sage-hover disabled:opacity-60 transition-colors"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Wird gesendet…
                  </>
                ) : (
                  <>
                    Jetzt bestellen
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={next}
                className="flex-1 h-12 bg-sage text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-sage-hover transition-colors"
              >
                Weiter
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
