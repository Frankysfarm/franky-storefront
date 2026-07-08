"use client";

import { useState, useMemo, useEffect } from "react";
import { X } from "lucide-react";
import type { Product, Category, Tenant } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import { buildProductMap } from "@/lib/mock-data";
import { TopBar } from "./TopBar";
import { WelcomeBanner } from "./WelcomeBanner";
import { BestsellerRail } from "./BestsellerRail";
import { WelcomePopup } from "./WelcomePopup";
import { StickyCart } from "./StickyCart";
import { CategoryNav } from "./CategoryNav";
import { ProductCard } from "./ProductCard";
import { ProductSheet } from "./ProductSheet";
import { CartDrawer } from "./CartDrawer";
import { CheckoutModal } from "./CheckoutModal";
import { TrackingScreen } from "./TrackingScreen";
import { SearchOverlay } from "./SearchOverlay";
import { ScrollToTop } from "./ScrollToTop";
import { RevealSection } from "./RevealSection";
import { ImpressumModal, DatenschutzModal, LiefergebietModal, AllergeneModal } from "./LegalModals";
import { DietFilter } from "./DietFilter";
import type { DietTag, PaymentMethod } from "@/lib/types";

interface Props {
  tenant: Tenant;
  categories: Category[];
  products: Product[];
  bestsellers: string[];
  paymentMethods?: PaymentMethod[];
}

export function FrankyStorefront({ tenant, categories, products, bestsellers, paymentMethods }: Props) {
  const [sheetProduct, setSheetProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [bonusOpen, setBonusOpen] = useState(false);
  const [tracking, setTracking] = useState<{ orderId: string; customerName: string } | null>(null);
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [datenschutzOpen, setDatenschutzOpen] = useState(false);
  const [liefergebietOpen, setLiefergebietOpen] = useState(false);
  const [allergeneOpen, setAllergeneOpen] = useState(false);
  const [dietFilter, setDietFilter] = useState<DietTag | "all">("all");
  const addItem = useCartStore((s) => s.addItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const drinkProducts = useMemo(() => {
    const isDrinkCat = (name: string) => {
      const n = name.toLowerCase();
      return n.includes("drink") || n.includes("getränk") || n.includes("getraenk");
    };
    return products.filter(p => p.category_id && isDrinkCat(categories.find(c => c.id === p.category_id)?.name ?? ""));
  }, [products, categories]);

  // Detect Stripe success redirect: ?order_id=xxx
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("order_id");
    if (orderId && !tracking) {
      clearCart();
      setTracking({ orderId, customerName: "" });
      window.history.replaceState({}, "", window.location.pathname);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productMap = useMemo(() => buildProductMap(products), [products]);
  const filteredProducts = useMemo(() => {
    if (dietFilter === "all") return products;
    return products.filter((p) => p.tags.includes(dietFilter));
  }, [products, dietFilter]);

  const productsByCategory = useMemo(() => {
    const map = new Map<string, Product[]>();
    for (const cat of categories) {
      map.set(
        cat.id,
        filteredProducts.filter((p) => p.category_id === cat.id).sort((a, b) => a.sort_order - b.sort_order),
      );
    }
    return map;
  }, [filteredProducts, categories]);

  const topProducts = useMemo(() => {
    return bestsellers
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean)
      .slice(0, 5) as Product[];
  }, [products, bestsellers]);

  const handleAddDirect = (product: Product) => {
    if (product.option_groups && product.option_groups.length > 0) {
      setSheetProduct(product);
    } else {
      addItem(product, 1, null);
      setCartOpen(true);
    }
  };

  return (
    <div className="min-h-screen pb-32 sm:pb-28">
      <WelcomePopup drinks={drinkProducts} />
      <TopBar
        tenant={tenant}
        onCartOpen={() => setCartOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
        onBonusOpen={() => setBonusOpen(true)}
      />

      <WelcomeBanner
        topProducts={topProducts}
        onAdd={handleAddDirect}
      />

      <BestsellerRail
        products={products}
        bestsellers={bestsellers}
        onAdd={handleAddDirect}
      />

      <DietFilter active={dietFilter} onChange={setDietFilter} />

      <CategoryNav categories={categories} />

      {/* Product Sections */}
      <main className="max-w-[1240px] mx-auto px-6">
        {categories.map((cat, catIndex) => {
          const catProducts = productsByCategory.get(cat.id) ?? [];
          if (catProducts.length === 0) return null;
          const num = String(catIndex + 1).padStart(2, "0");
          return (
            <section key={cat.id} id={`section-${cat.id}`} className="mt-10">
              <div className="flex items-baseline gap-[14px] mb-[18px] flex-wrap">
                <span
                  className="font-display italic font-black text-gold-deep text-lg flex-shrink-0 opacity-[0.85]"
                >
                  No.&nbsp;{num}
                </span>
                <h2
                  className="font-display italic font-black text-sage-dark flex-shrink-0 section-title-accent"
                  style={{ fontSize: "clamp(30px, 4vw, 42px)", letterSpacing: "-0.025em", lineHeight: 1 }}
                >
                  {cat.icon && <span>{cat.icon} </span>}
                  {cat.name}
                </h2>
                {cat.description && (
                  <span className="text-muted italic font-medium flex-shrink-0 basis-full sm:basis-auto text-[11px] sm:text-[13px]">
                    {cat.description}
                  </span>
                )}
                <hr className="flex-1 border-t-[1.5px] border-cream-deep min-w-[20px]" />
              </div>

              <RevealSection>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4">
                  {catProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAdd={handleAddDirect}
                      onOpen={setSheetProduct}
                    />
                  ))}
                </div>
              </RevealSection>
            </section>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="max-w-[1240px] mx-auto px-6 mt-16 pb-8">
        <div className="border-t border-line pt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-display font-black text-lg text-sage-dark">
                {tenant.name}
              </div>
              <div className="text-sm text-muted mt-1">{tenant.adresse}</div>
              <div className="text-sm text-muted">{tenant.telefon}</div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 bg-sage/10 text-sage text-xs font-bold rounded-full">
                HALAL
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted">
            <button onClick={() => setImpressumOpen(true)} className="hover:text-sage-dark transition-colors">Impressum</button>
            <button onClick={() => setDatenschutzOpen(true)} className="hover:text-sage-dark transition-colors">Datenschutz</button>
            <button onClick={() => setAllergeneOpen(true)} className="hover:text-sage-dark transition-colors">Allergene (LMIV)</button>
            <button onClick={() => setLiefergebietOpen(true)} className="hover:text-sage-dark transition-colors">Liefergebiet</button>
            <span>© {new Date().getFullYear()} {tenant.name}</span>
          </div>
        </div>
      </footer>

      {/* Floating Elements */}
      <ScrollToTop />

      {/* Mobile Cart FAB */}
      <StickyCart onOpen={() => setCartOpen(true)} productMap={productMap} tenant={tenant} />

      {/* Overlays */}
      <ProductSheet product={sheetProduct} onClose={() => setSheetProduct(null)} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        productMap={productMap}
        tenant={tenant}
        allProducts={products}
      />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onComplete={(orderId, customerName) => {
          setCheckoutOpen(false);
          setTracking({ orderId, customerName });
        }}
        productMap={productMap}
        tenant={tenant}
        allProducts={products}
        categories={categories}
        paymentMethods={paymentMethods}
      />
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={products}
        onAdd={handleAddDirect}
      />
      {tracking && (
        <TrackingScreen
          orderId={tracking.orderId}
          customerName={tracking.customerName}
          deliveryTimeMin={tenant.durchschnittliche_lieferzeit_min}
          onClose={() => setTracking(null)}
        />
      )}

      {/* Bonus Club Modal */}
      <BonusModal open={bonusOpen} onClose={() => setBonusOpen(false)} />

      {/* Legal Modals */}
      <ImpressumModal open={impressumOpen} onClose={() => setImpressumOpen(false)} />
      <DatenschutzModal open={datenschutzOpen} onClose={() => setDatenschutzOpen(false)} />
      <LiefergebietModal open={liefergebietOpen} onClose={() => setLiefergebietOpen(false)} />
      <AllergeneModal open={allergeneOpen} onClose={() => setAllergeneOpen(false)} />
    </div>
  );
}

function BonusModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(20,14,8,0.65)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[480px] rounded-2xl overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(228,192,104,0.18) 0%, transparent 55%), var(--color-cream-soft)",
          border: "1.5px solid var(--color-sage-dark)",
          boxShadow: "0 28px 60px -20px rgba(0,0,0,0.35)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-sage-dark hover:bg-sage-dark hover:text-cream transition-colors"
          style={{ background: "rgba(42,38,34,0.06)" }}
          aria-label="Schließen"
        >
          <X size={16} />
        </button>

        <div className="p-7">
          <span
            className="inline-block text-[10.5px] font-extrabold tracking-[1.4px] px-3 py-1 rounded-full mb-4"
            style={{ background: "var(--color-sage-dark)", color: "var(--color-gold)", border: "1px solid rgba(255,213,119,0.4)" }}
          >
            FRANKY&apos;S BONUS-CLUB
          </span>
          <h2
            className="font-display font-black text-sage-dark mb-4"
            style={{ fontSize: "clamp(24px, 3vw, 30px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}
          >
            Jede 2. Bestellung{" "}
            <em className="italic text-gold-deep">gratis</em>
          </h2>

          <div className="flex flex-col gap-4">
            {[
              { num: "1", title: "Bestellen wie immer", text: "Jede Bestellung über 15 € zählt automatisch. Keine Karte, kein Code." },
              { num: "2", title: "Wir merken's uns", text: "Du siehst deinen Stand oben auf der Seite und in der Bestellbestätigung." },
              { num: "🎁", title: "2. Bestellung = aufs Haus", text: "Beim 2. Mal wählst du dein günstigstes Gericht gratis. Wir verrechnen's automatisch." },
            ].map((step) => (
              <div key={step.num} className="flex gap-4 items-start">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-display font-black text-base border"
                  style={{
                    background: step.num === "🎁" ? "var(--color-gold)" : "var(--color-mint)",
                    borderColor: step.num === "🎁" ? "var(--color-gold-deep)" : "var(--color-mint-deep)",
                    color: "var(--color-sage-dark)",
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <h4 className="font-display font-black text-sage-dark text-[15px] mb-0.5">{step.title}</h4>
                  <p className="text-sm text-muted leading-snug">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 text-[11px] text-muted leading-relaxed border-t border-line pt-4">
            *Aktion gültig im Aachener Liefergebiet · Mindestbestellwert pro Bestellung 15 € ·
            Wir behalten uns Änderungen vor.
          </p>
        </div>
      </div>
    </div>
  );
}
