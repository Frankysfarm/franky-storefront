"use client";

import { useState, useMemo } from "react";
import type { Product, Category, Tenant } from "@/lib/types";
import { useCartStore } from "@/lib/store";
import { buildProductMap } from "@/lib/mock-data";
import { formatPriceRaw } from "@/lib/format";
import { TopBar } from "./TopBar";
import { WelcomeBanner } from "./WelcomeBanner";
import { CategoryNav } from "./CategoryNav";
import { BestsellerRail } from "./BestsellerRail";
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
import type { DietTag } from "@/lib/types";

interface Props {
  tenant: Tenant;
  categories: Category[];
  products: Product[];
  bestsellers: string[];
}

export function FrankyStorefront({ tenant, categories, products, bestsellers }: Props) {
  const [sheetProduct, setSheetProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [tracking, setTracking] = useState<{ orderId: string } | null>(null);
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [datenschutzOpen, setDatenschutzOpen] = useState(false);
  const [liefergebietOpen, setLiefergebietOpen] = useState(false);
  const [allergeneOpen, setAllergeneOpen] = useState(false);
  const [dietFilter, setDietFilter] = useState<DietTag | "all">("all");
  const addItem = useCartStore((s) => s.addItem);

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

  const handleAddDirect = (product: Product) => {
    if (product.option_groups && product.option_groups.length > 0) {
      setSheetProduct(product);
    } else {
      addItem(product, 1, null);
      setCartOpen(true);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <TopBar
        tenant={tenant}
        onCartOpen={() => setCartOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />

      <CategoryNav categories={categories} />

      <WelcomeBanner tenant={tenant} />

      <BestsellerRail
        products={products}
        bestsellers={bestsellers}
        onAdd={handleAddDirect}
      />

      <DietFilter active={dietFilter} onChange={setDietFilter} />

      {/* Product Sections */}
      <main className="max-w-[1240px] mx-auto px-6">
        {categories.map((cat) => {
          const catProducts = productsByCategory.get(cat.id) ?? [];
          if (catProducts.length === 0) return null;
          return (
            <section key={cat.id} id={`section-${cat.id}`} className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                {cat.icon && <span className="text-xl">{cat.icon}</span>}
                <h2 className="font-display font-black text-xl text-sage-dark">
                  {cat.name}
                </h2>
                <span className="text-sm text-muted">({catProducts.length})</span>
              </div>

              <RevealSection>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <MobileCartFab onOpen={() => setCartOpen(true)} productMap={productMap} tenant={tenant} />

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
        onComplete={(orderId) => {
          setCheckoutOpen(false);
          setTracking({ orderId });
        }}
        productMap={productMap}
        tenant={tenant}
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
          customerName=""
          deliveryTimeMin={tenant.durchschnittliche_lieferzeit_min}
          onClose={() => setTracking(null)}
        />
      )}

      {/* Legal Modals */}
      <ImpressumModal open={impressumOpen} onClose={() => setImpressumOpen(false)} />
      <DatenschutzModal open={datenschutzOpen} onClose={() => setDatenschutzOpen(false)} />
      <LiefergebietModal open={liefergebietOpen} onClose={() => setLiefergebietOpen(false)} />
      <AllergeneModal open={allergeneOpen} onClose={() => setAllergeneOpen(false)} />
    </div>
  );
}

function MobileCartFab({
  onOpen,
  productMap,
}: {
  onOpen: () => void;
  productMap: Map<string, Product>;
  tenant: Tenant;
}) {
  const totalItems = useCartStore((s) => s.totalItems());
  const subtotal = useCartStore((s) => s.subtotal(productMap));

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden px-4 pb-5 pt-2 bg-gradient-to-t from-cream via-cream/95 to-transparent pointer-events-none">
      <button
        onClick={onOpen}
        className="pointer-events-auto w-full h-14 bg-sage text-white rounded-2xl flex items-center justify-between px-5 shadow-lg hover:bg-sage-hover transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
            {totalItems}
          </span>
          <span className="font-bold">Warenkorb</span>
        </div>
        <span className="font-bold tabular-nums">{formatPriceRaw(subtotal)}</span>
      </button>
    </div>
  );
}
