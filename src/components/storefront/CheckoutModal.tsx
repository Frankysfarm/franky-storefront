"use client";

import { useState, useMemo } from "react";
import { UpsellStep } from "./UpsellStep";
import { X, ArrowLeft, MapPin, Apple, CheckCircle2, ChevronRight } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPriceRaw } from "@/lib/format";
import { getClientSupabase } from "@/lib/supabase";
import type { Product, Tenant, CheckoutForm, PaymentMethod } from "@/lib/types";
import { VALID_PLZ, MOCK_PAYMENT_METHODS } from "@/lib/mock-data";

const PAYMENT_ICONS: Record<string, string> = {
  bar: "💵",
  karte: "💳",
  apple_pay: "🍎",
  google_pay: "📱",
  paypal: "🅿️",
  klarna: "🛍️",
  sepa: "🏦",
  giropay: "🏦",
};

interface Props {
  open: boolean;
  onClose: () => void;
  onComplete: (orderId: string, customerName: string) => void;
  productMap: Map<string, Product>;
  tenant: Tenant;
  allProducts: Product[];
  paymentMethods?: PaymentMethod[];
}

type Step = "plz-check" | "lieferung" | "zahlung" | "upsell" | "review";
const STEPS: Step[] = ["plz-check", "lieferung", "zahlung", "upsell", "review"];
const STEP_LABELS: Record<Step, string> = {
  "plz-check": "PLZ",
  lieferung: "Lieferung",
  zahlung: "Zahlung",
  upsell: "Extras",
  review: "Übersicht",
};

export function CheckoutModal({ open, onClose, onComplete, productMap, tenant, allProducts, paymentMethods = MOCK_PAYMENT_METHODS }: Props) {
  const [step, setStep] = useState<Step>("plz-check");
  const [plzChecked, setPlzChecked] = useState(false);
  const rawItems = useCartStore((s) => s.items);
  const items = useMemo(() => useCartStore.getState().getComputedItems(productMap), [rawItems, productMap]);
  const subtotal = useCartStore((s) => s.subtotal(productMap));
  const deliveryFee = useCartStore((s) => s.deliveryFee(productMap, tenant.liefergebuehr, tenant.free_delivery_threshold));
  const grandTotal = useCartStore((s) => s.grandTotal(productMap, tenant.liefergebuehr, tenant.free_delivery_threshold));
  const clearCart = useCartStore((s) => s.clearCart);

  const enabledMethods = useMemo(
    () => paymentMethods.filter((pm) => pm.enabled_lieferung),
    [paymentMethods],
  );
  const defaultPayment = enabledMethods[0]?.method ?? "karte";

  const [form, setForm] = useState<CheckoutForm>({
    name: "",
    telefon: "",
    email: "",
    plz: "",
    strasse: "",
    hausnummer: "",
    etage: "",
    anmerkung: "",
    zahlungsart: defaultPayment,
  });
  const [plzError, setPlzError] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState("");

  if (!open) return null;

  const currentIdx = STEPS.indexOf(step);
  const update = (k: keyof CheckoutForm, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const isValidPlz = (plz: string) => plz.trim().length > 0 && VALID_PLZ.includes(plz.trim());

  const validatePlz = (plz: string) => {
    if (!plz.trim() || !VALID_PLZ.includes(plz.trim())) {
      setPlzError(`PLZ ${plz} liegt außerhalb unseres Liefergebiets (Aachen)`);
      return false;
    }
    setPlzError("");
    return true;
  };

  const canProceedLieferung =
    form.name.trim().length >= 2 &&
    form.telefon.replace(/\D/g, "").length >= 6 &&
    isValidPlz(form.plz) &&
    form.strasse.trim().length >= 3;

  const next = () => {
    const i = STEPS.indexOf(step);
    if (i < STEPS.length - 1) setStep(STEPS[i + 1]);
  };
  const back = () => {
    const i = STEPS.indexOf(step);
    if (i > 0) setStep(STEPS[i - 1]);
  };

  const placeOrder = async () => {
    if (subtotal < tenant.mindestbestellwert) {
      setOrderError(`Mindestbestellwert ${formatPriceRaw(tenant.mindestbestellwert)} nicht erreicht.`);
      return;
    }
    setLoading(true);
    setOrderError("");
    try {
      const sb = getClientSupabase();
      const adresse = [form.strasse, form.hausnummer, form.etage].filter(Boolean).join(", ");

      const { data: order, error: orderErr } = await sb
        .from("customer_orders")
        .insert({
          location_id: tenant.location_id,
          typ: "lieferung",
          kunde_name: form.name,
          kunde_telefon: form.telefon,
          kunde_email: form.email || null,
          kunde_adresse: adresse,
          kunde_plz: form.plz,
          zwischensumme: subtotal,
          liefergebuehr: deliveryFee,
          gesamtbetrag: grandTotal,
          zahlungsart: form.zahlungsart,
        })
        .select("id,bestellnummer")
        .single();

      if (orderErr || !order) {
        throw new Error(orderErr?.message ?? "Bestellung konnte nicht gespeichert werden.");
      }

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        menge: item.qty,
        einzelpreis: item.unitPrice,
        gesamtpreis: item.lineTotal,
        optionen: item.selections ?? null,
      }));

      await sb.from("order_items").insert(orderItems);

      // Fire email outbox (fire-and-forget)
      fetch("https://mise-gastro.de/api/email/process-outbox", { method: "POST" }).catch(() => {});

      if (form.zahlungsart !== "bar") {
        const res = await fetch("https://mise-gastro.de/api/checkout/create-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id: order.id }),
        });
        if (res.ok) {
          const { url } = await res.json();
          if (url) {
            window.location.href = url;
            return;
          }
        }
      }

      clearCart();
      onComplete(String(order.bestellnummer ?? order.id), form.name);
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : "Fehler beim Bestellen. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[130] bg-black/60 backdrop-blur-sm animate-[fade-in_0.25s_ease-out]" onClick={onClose} />

      <div
        className="fixed inset-x-0 bottom-0 sm:inset-0 z-[140] flex sm:items-center sm:justify-center"
        onClick={onClose}
      >
        <div
          className="bg-bone w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden flex flex-col animate-[reveal-up_0.35s_cubic-bezier(0.34,1.56,0.64,1)]"
          style={{ maxHeight: "94vh", minHeight: "60vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <header className="px-5 pt-3 pb-4 border-b border-line">
            {/* Drag handle */}
            <div className="sm:hidden flex justify-center mb-2">
              <div className="w-12 h-1.5 bg-sage-dark/15 rounded-full" />
            </div>

            <div className="flex items-center justify-between mb-3">
              <button
                onClick={currentIdx === 0 ? onClose : back}
                className="w-9 h-9 rounded-xl bg-mint hover:bg-mint-deep flex items-center justify-center text-sage-dark active:scale-95 transition-all"
                aria-label={currentIdx === 0 ? "Schließen" : "Zurück"}
              >
                {currentIdx === 0 ? <X size={18} /> : <ArrowLeft size={18} />}
              </button>

              <div className="font-display font-black text-base text-sage-dark">
                Bestellung abschließen
              </div>

              <div className="w-9" />
            </div>

            {/* Step progress */}
            <div className="flex items-center gap-1.5">
              {STEPS.map((s, i) => (
                <div key={s} className="flex-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i <= currentIdx ? "bg-sage" : "bg-sage-dark/12"
                    }`}
                  />
                  <div
                    className={`text-[10px] mt-1 font-bold tracking-wide uppercase transition-colors text-center ${
                      i === currentIdx
                        ? "text-sage-dark"
                        : i < currentIdx
                        ? "text-sage/70"
                        : "text-sage-dark/35"
                    }`}
                  >
                    {STEP_LABELS[s]}
                  </div>
                </div>
              ))}
            </div>
          </header>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            {step === "plz-check" && (
              <div className="text-center py-2">
                <div
                  className="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-3"
                  style={{
                    background: "linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-hover) 100%)",
                    boxShadow: "0 8px 20px rgba(74,94,74,0.3)",
                  }}
                >
                  <MapPin size={28} className="text-gold" strokeWidth={2.5} />
                </div>
                <h2
                  className="font-display font-black text-sage-dark leading-tight"
                  style={{ fontSize: "22px", letterSpacing: "-0.02em" }}
                >
                  Liefern wir <em className="italic text-sage">zu dir?</em>
                </h2>
                <p className="text-[13px] text-sage-dark/65 mt-1.5 max-w-[260px] mx-auto leading-snug">
                  Lass uns kurz schauen ob wir in deiner Region liefern.
                </p>

                <div className="mt-5 max-w-[260px] mx-auto">
                  <label className="block">
                    <div className="text-left text-[10.5px] font-extrabold tracking-wide uppercase text-sage-dark/65 mb-1.5">
                      Deine Postleitzahl
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={5}
                      autoFocus
                      value={form.plz}
                      onChange={(e) => {
                        const v = e.target.value.replace(/\D/g, "").slice(0, 5);
                        update("plz", v);
                        if (v.length === 5) {
                          if (VALID_PLZ.includes(v)) {
                            setPlzError("");
                            setPlzChecked(true);
                          } else {
                            setPlzError(`Leider liegt ${v} außerhalb unseres Liefergebiets (Aachen)`);
                            setPlzChecked(false);
                          }
                        } else {
                          setPlzError("");
                          setPlzChecked(false);
                        }
                      }}
                      placeholder="52062"
                      className={`input text-center font-display text-2xl font-black tracking-[8px] tabular-nums ${plzError ? "border-burgundy" : plzChecked ? "border-sage" : ""}`}
                      style={{ padding: "14px 12px" }}
                    />
                  </label>

                  {plzChecked && (
                    <div className="mt-3 flex items-center justify-center gap-1.5 text-sage font-bold text-[13px] animate-[reveal-up_0.3s_ease-out]">
                      <CheckCircle2 size={16} fill="currentColor" className="text-sage" />
                      <span>Andiamo! Wir liefern zu dir 🍝</span>
                    </div>
                  )}

                  {plzError && (
                    <div className="mt-3 text-burgundy font-semibold text-[12px] leading-snug">
                      {plzError}
                    </div>
                  )}

                  {!plzChecked && !plzError && (
                    <div className="mt-3 text-[11.5px] text-sage-dark/55">
                      Aachen Innenstadt + Umkreis (PLZ 52062–52080)
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === "lieferung" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sage-dark/75 text-[12px] font-semibold mb-1">
                  <MapPin size={14} />
                  <span>Wohin sollen wir liefern?</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <Field label="Vorname & Name" required>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      autoComplete="name"
                      placeholder="Mario Rossi"
                      className="input"
                    />
                  </Field>
                  <Field label="Telefon" required>
                    <input
                      type="tel"
                      value={form.telefon}
                      onChange={(e) => update("telefon", e.target.value)}
                      autoComplete="tel"
                      placeholder="0241..."
                      className="input"
                    />
                  </Field>
                </div>

                <Field label="E-Mail (für Bestätigung)">
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    autoComplete="email"
                    placeholder="mario@example.com"
                    className="input"
                  />
                </Field>

                <div className="bg-sage/8 rounded-2xl px-3.5 py-2.5 flex items-center justify-between border border-sage/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-sage" fill="currentColor" />
                    <div>
                      <div className="text-[10px] font-extrabold tracking-wide uppercase text-sage-dark/65">Lieferung an</div>
                      <div className="text-[13px] font-bold text-sage-dark">PLZ {form.plz} · Aachen</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("plz-check")}
                    className="text-[11px] font-bold text-sage hover:text-sage-hover underline-offset-2 hover:underline"
                  >
                    Ändern
                  </button>
                </div>

                <div className="grid grid-cols-[1fr_2fr] gap-2.5">
                  <Field label="PLZ" required error={plzError}>
                    <input
                      type="text"
                      value={form.plz}
                      readOnly
                      className="input opacity-50 cursor-not-allowed"
                    />
                  </Field>
                  <Field label="Stadt">
                    <input
                      type="text"
                      value="Aachen"
                      readOnly
                      className="input opacity-60"
                    />
                  </Field>
                </div>

                <Field label="Straße & Hausnummer" required>
                  <input
                    type="text"
                    value={form.strasse}
                    onChange={(e) => update("strasse", e.target.value)}
                    autoComplete="street-address"
                    placeholder="Pontstraße 42"
                    className="input"
                  />
                </Field>

                <Field label="Etage / Klingel (optional)">
                  <input
                    type="text"
                    value={form.etage}
                    onChange={(e) => update("etage", e.target.value)}
                    placeholder="3. Stock · Rossi"
                    className="input"
                  />
                </Field>

                <Field label="Hinweise für den Fahrer">
                  <textarea
                    value={form.anmerkung}
                    onChange={(e) => update("anmerkung", e.target.value)}
                    placeholder="Bei 'Pizza' klingeln · Bitte nicht hupen"
                    rows={2}
                    className="input resize-none"
                  />
                </Field>
              </div>
            )}

            {step === "zahlung" && (
              <div className="space-y-2.5">
                <div className="text-sage-dark/75 text-[12px] font-semibold mb-1">
                  Wie möchtest du zahlen?
                </div>

                {/* Apple/Google Pay quick option */}
                {enabledMethods.some((pm) => pm.method === "apple_pay") && (
                  <>
                    <button
                      onClick={() => {
                        update("zahlungsart", "apple_pay");
                        next();
                      }}
                      className="w-full flex items-center justify-center gap-2 h-14 bg-black text-white rounded-2xl font-bold text-[15px] active:scale-[0.98] transition-all"
                    >
                      <Apple size={20} />
                      <span>Pay · 1-Tap</span>
                      <span className="opacity-70 font-mono text-[12px]">·</span>
                      <span className="tabular-nums">{formatPriceRaw(grandTotal)}</span>
                    </button>

                    <div className="flex items-center gap-3 my-1 text-[11px] text-sage-dark/50 font-semibold uppercase tracking-wider">
                      <div className="flex-1 h-px bg-sage-dark/10" />
                      Oder
                      <div className="flex-1 h-px bg-sage-dark/10" />
                    </div>
                  </>
                )}

                {enabledMethods.map((pm) => (
                  <button
                    key={pm.method}
                    onClick={() => update("zahlungsart", pm.method)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all active:scale-[0.99] ${
                      form.zahlungsart === pm.method
                        ? "bg-white border-sage shadow-[0_4px_14px_-4px_rgba(74,94,74,0.3)]"
                        : "bg-white border-line hover:border-sage/40"
                    }`}
                    style={{ border: "1.5px solid", borderColor: form.zahlungsart === pm.method ? "var(--color-sage)" : "var(--color-line)" }}
                  >
                    <span className="text-2xl">{pm.icon ?? PAYMENT_ICONS[pm.method] ?? "💳"}</span>
                    <div className="flex-1">
                      <div className="font-bold text-[13.5px] text-sage-dark">{pm.label}</div>
                    </div>
                    {form.zahlungsart === pm.method && (
                      <div className="w-6 h-6 rounded-full bg-sage flex items-center justify-center">
                        <CheckCircle2 size={14} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {step === "upsell" && (
              <UpsellStep
                allProducts={allProducts}
                productMap={productMap}
                onSkip={next}
              />
            )}

            {step === "review" && (
              <div className="space-y-4">
                {/* Address summary */}
                <SummaryCard title="Lieferung an" onEdit={() => setStep("lieferung")}>
                  <div className="font-bold text-sage-dark text-[14px]">{form.name}</div>
                  <div className="text-[12px] text-sage-dark/70 leading-snug">
                    {form.strasse}<br />
                    {form.plz} {"Aachen"}
                    {form.etage && <><br />{form.etage}</>}
                  </div>
                  <div className="text-[11px] text-sage-dark/60 mt-1">📞 {form.telefon}</div>
                </SummaryCard>

                {/* Payment summary */}
                <SummaryCard title="Zahlung" onEdit={() => setStep("zahlung")}>
                  <div className="font-bold text-sage-dark text-[13px]">
                    {enabledMethods.find((p) => p.method === form.zahlungsart)?.label ?? "Karte"}
                  </div>
                </SummaryCard>

                {/* Order summary */}
                <div className="bg-white rounded-2xl border border-line p-4">
                  <div className="font-extrabold text-[11px] tracking-wider text-sage-dark uppercase mb-2.5">
                    Deine Bestellung
                  </div>
                  <div className="space-y-1.5 mb-3">
                    {items.map((item) => (
                      <div key={item.cartKey} className="flex justify-between text-[12.5px]">
                        <span className="text-sage-dark">
                          <b>{item.qty}×</b> {item.product.name}
                        </span>
                        <span className="font-bold tabular-nums">{formatPriceRaw(item.lineTotal)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-line pt-2.5 space-y-1">
                    <div className="flex justify-between text-[12px] text-sage-dark/70">
                      <span>Zwischensumme</span>
                      <span className="tabular-nums">{formatPriceRaw(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-[12px] text-sage-dark/70">
                      <span>Lieferung</span>
                      <span className={`tabular-nums ${deliveryFee === 0 ? "text-sage font-bold" : ""}`}>
                        {deliveryFee === 0 ? "GRATIS" : formatPriceRaw(deliveryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[16px] font-display font-black text-sage-dark border-t border-line pt-1.5 mt-1.5">
                      <span>Gesamt</span>
                      <span className="tabular-nums text-gold-deep">{formatPriceRaw(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-[10.5px] text-sage-dark/55 text-center leading-relaxed">
                  Mit Bestellen akzeptierst du unsere AGB.<br />
                  Widerrufsrecht bei Speisen ausgeschlossen (§ 312 g II BGB).
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <footer className="border-t border-line bg-cream pt-3 px-5" style={{ paddingBottom: "max(env(safe-area-inset-bottom, 16px), 16px)" }}>
            {step === "plz-check" && (
              <button
                onClick={next}
                disabled={!plzChecked}
                className={`w-full h-14 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] ${
                  plzChecked
                    ? "text-white shadow-[0_10px_28px_-8px_rgba(74,94,74,0.55)]"
                    : "bg-mint-deep/60 text-sage-dark/40 cursor-not-allowed"
                }`}
                style={
                  plzChecked
                    ? { background: "linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-hover) 100%)" }
                    : undefined
                }
              >
                {plzChecked ? "Weiter zur Lieferadresse" : "PLZ eingeben"}
                <ChevronRight size={18} />
              </button>
            )}
            {step === "lieferung" && (
              <button
                onClick={next}
                disabled={!canProceedLieferung}
                className={`w-full h-14 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] ${
                  canProceedLieferung
                    ? "text-white shadow-[0_10px_28px_-8px_rgba(74,94,74,0.55)]"
                    : "bg-mint-deep/60 text-sage-dark/40 cursor-not-allowed"
                }`}
                style={
                  canProceedLieferung
                    ? { background: "linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-hover) 100%)" }
                    : undefined
                }
              >
                Weiter zur Zahlung
                <ChevronRight size={18} />
              </button>
            )}
            {step === "zahlung" && (
              <button
                onClick={next}
                className="w-full h-14 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 text-white shadow-[0_10px_28px_-8px_rgba(74,94,74,0.55)] active:scale-[0.98] transition-all duration-300"
                style={{ background: "linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-hover) 100%)" }}
              >
                Weiter
                <ChevronRight size={18} />
              </button>
            )}
            {step === "upsell" && (
              <button
                onClick={next}
                className="w-full h-14 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 text-white shadow-[0_10px_28px_-8px_rgba(74,94,74,0.55)] active:scale-[0.98] transition-all duration-300"
                style={{ background: "linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-hover) 100%)" }}
              >
                Weiter zur Übersicht
                <ChevronRight size={18} />
              </button>
            )}

            {step === "review" && orderError && (
              <div className="mb-3 px-4 py-2.5 rounded-xl bg-burgundy/10 border border-burgundy/30 text-burgundy text-[12px] font-semibold leading-snug">
                {orderError}
              </div>
            )}
            {step === "review" && (
              <button
                onClick={placeOrder}
                disabled={loading}
                className="w-full h-14 rounded-2xl font-bold text-[15px] flex items-center justify-center gap-2 text-white shadow-[0_10px_28px_-8px_rgba(74,94,74,0.55)] active:scale-[0.98] transition-all duration-300"
                style={{ background: "linear-gradient(135deg, var(--color-sage) 0%, var(--color-sage-hover) 100%)" }}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Bestellung wird aufgegeben...
                  </span>
                ) : (
                  <>
                    Jetzt zahlpflichtig bestellen
                    <span className="opacity-70 font-mono text-[12px]">·</span>
                    <span className="tabular-nums">{formatPriceRaw(grandTotal)}</span>
                  </>
                )}
              </button>
            )}
          </footer>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid var(--color-line);
          border-radius: 14px;
          background: white;
          font-size: 14px;
          color: var(--color-sage-dark);
          font-family: inherit;
          outline: none;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .input:focus {
          border-color: var(--color-sage);
          box-shadow: 0 0 0 3px rgba(74,94,74,0.12);
        }
        .input::placeholder {
          color: rgba(42,58,44,0.35);
        }
      `}</style>
    </>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[10.5px] font-extrabold tracking-wide uppercase text-sage-dark/70 mb-1">
        {label} {required && <span className="text-burgundy">*</span>}
      </div>
      {children}
      {error && <div className="text-[10.5px] text-burgundy font-semibold mt-1">{error}</div>}
    </label>
  );
}

function SummaryCard({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-line p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-extrabold tracking-wider text-sage-dark uppercase">{title}</span>
        <button
          onClick={onEdit}
          className="text-[11px] font-bold text-sage underline-offset-2 hover:underline"
        >
          Ändern
        </button>
      </div>
      {children}
    </div>
  );
}
