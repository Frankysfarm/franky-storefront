"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product, Selections, OptionGroup } from "./types";

function buildCartKey(productId: string, selections: Selections | null): string {
  if (!selections) return productId;
  const sorted = Object.entries(selections)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${Array.isArray(v) ? v.sort().join(",") : v}`)
    .join("|");
  return `${productId}::${sorted}`;
}

function computeUnitPrice(
  product: Product,
  selections: Selections | null,
): number {
  let price = product.preis;
  if (!selections || !product.option_groups) return price;
  for (const group of product.option_groups) {
    const val = selections[group.id];
    if (!val) continue;
    if (group.type === "multi" && Array.isArray(val)) {
      for (const optId of val) {
        const opt = group.options.find((o) => o.id === optId);
        if (opt) price += opt.priceDelta;
      }
    } else if (typeof val === "string") {
      const opt = group.options.find((o) => o.id === val);
      if (opt) price += opt.priceDelta;
    }
  }
  return price;
}

function buildOptionsSummary(
  selections: Selections | null,
  optionGroups: OptionGroup[] | null,
): string {
  if (!selections || !optionGroups) return "";
  const parts: string[] = [];
  for (const group of optionGroups) {
    const val = selections[group.id];
    if (group.type === "multi" && Array.isArray(val) && val.length) {
      const labels = val
        .map((optId) => group.options.find((o) => o.id === optId)?.label)
        .filter(Boolean);
      if (labels.length) parts.push(labels.join(", "));
    } else if (typeof val === "string") {
      const opt = group.options.find((o) => o.id === val);
      if (opt && !opt.default) parts.push(opt.label);
    }
  }
  return parts.join(" · ");
}

interface CartStore {
  items: Map<string, CartItem>;
  tipAmount: number;

  addItem: (product: Product, qty: number, selections: Selections | null) => void;
  removeItem: (cartKey: string) => void;
  updateQty: (cartKey: string, delta: number) => void;
  editItem: (
    oldKey: string,
    product: Product,
    qty: number,
    selections: Selections | null,
  ) => void;
  clearCart: () => void;
  setTip: (amount: number) => void;

  totalItems: () => number;
  subtotal: (products: Map<string, Product>) => number;
  deliveryFee: (products: Map<string, Product>, baseFee: number, freeThreshold: number) => number;
  grandTotal: (products: Map<string, Product>, baseFee: number, freeThreshold: number) => number;
  getComputedItems: (products: Map<string, Product>) => Array<{
    cartKey: string;
    product: Product;
    qty: number;
    unitPrice: number;
    lineTotal: number;
    optionsSummary: string;
    selections: Selections | null;
  }>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: new Map(),
      tipAmount: 0,

      addItem: (product, qty, selections) => {
        const key = buildCartKey(product.id, selections);
        set((state) => {
          const items = new Map(state.items);
          const existing = items.get(key);
          if (existing) {
            items.set(key, { ...existing, qty: existing.qty + qty });
          } else {
            items.set(key, { cartKey: key, productId: product.id, qty, selections });
          }
          return { items };
        });
      },

      removeItem: (cartKey) => {
        set((state) => {
          const items = new Map(state.items);
          items.delete(cartKey);
          return { items };
        });
      },

      updateQty: (cartKey, delta) => {
        set((state) => {
          const items = new Map(state.items);
          const item = items.get(cartKey);
          if (!item) return state;
          const next = item.qty + delta;
          if (next <= 0) {
            items.delete(cartKey);
          } else {
            items.set(cartKey, { ...item, qty: next });
          }
          return { items };
        });
      },

      editItem: (oldKey, product, qty, selections) => {
        const newKey = buildCartKey(product.id, selections);
        set((state) => {
          const items = new Map(state.items);
          items.delete(oldKey);
          items.set(newKey, { cartKey: newKey, productId: product.id, qty, selections });
          return { items };
        });
      },

      clearCart: () => set({ items: new Map(), tipAmount: 0 }),

      setTip: (amount) => set({ tipAmount: amount }),

      totalItems: () => {
        let count = 0;
        for (const item of get().items.values()) count += item.qty;
        return count;
      },

      subtotal: (products) => {
        let total = 0;
        for (const item of get().items.values()) {
          const product = products.get(item.productId);
          if (!product) continue;
          total += computeUnitPrice(product, item.selections) * item.qty;
        }
        return total;
      },

      deliveryFee: (products, baseFee, freeThreshold) => {
        const sub = get().subtotal(products);
        return sub >= freeThreshold ? 0 : baseFee;
      },

      grandTotal: (products, baseFee, freeThreshold) => {
        return (
          get().subtotal(products) +
          get().deliveryFee(products, baseFee, freeThreshold) +
          get().tipAmount
        );
      },

      getComputedItems: (products) => {
        const result: ReturnType<CartStore["getComputedItems"]> = [];
        for (const item of get().items.values()) {
          const product = products.get(item.productId);
          if (!product) continue;
          const unitPrice = computeUnitPrice(product, item.selections);
          result.push({
            cartKey: item.cartKey,
            product,
            qty: item.qty,
            unitPrice,
            lineTotal: unitPrice * item.qty,
            optionsSummary: buildOptionsSummary(item.selections, product.option_groups),
            selections: item.selections,
          });
        }
        return result;
      },
    }),
    {
      name: "franky-cart",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const parsed = JSON.parse(str);
          if (parsed?.state?.items) {
            parsed.state.items = new Map(Object.entries(parsed.state.items));
          }
          return parsed;
        },
        setItem: (name, value) => {
          const serializable = {
            ...value,
            state: {
              ...value.state,
              items: Object.fromEntries(value.state.items),
            },
          };
          localStorage.setItem(name, JSON.stringify(serializable));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);

export { buildCartKey, computeUnitPrice, buildOptionsSummary };
