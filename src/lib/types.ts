export interface Product {
  id: string;
  category_id: string;
  name: string;
  beschreibung: string | null;
  preis: number;
  oldPreis?: number | null;
  bild_url: string | null;
  verfuegbar: boolean;
  beliebt: boolean;
  tags: string[];
  badges: string[];
  rating: number;
  sort_order: number;
  option_groups: OptionGroup[] | null;
}

export interface Category {
  id: string;
  name: string;
  icon: string | null;
  sort_order: number;
}

export interface OptionGroup {
  id: string;
  name: string;
  type: "single" | "multi";
  required: boolean;
  max?: number;
  options: OptionItem[];
}

export interface OptionItem {
  id: string;
  label: string;
  priceDelta: number;
  default?: boolean;
  badge?: string;
}

export type Selections = Record<string, string | string[]>;

export interface CartItem {
  cartKey: string;
  productId: string;
  qty: number;
  selections: Selections | null;
}

export interface CartComputedItem extends CartItem {
  product: Product;
  unitPrice: number;
  lineTotal: number;
  optionsSummary: string;
}

export interface CheckoutForm {
  plz: string;
  strasse: string;
  hausnummer: string;
  etage: string;
  name: string;
  telefon: string;
  email: string;
  zahlungsart: string;
  anmerkung: string;
}

export interface Tenant {
  id: string;
  location_id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  hero_image_url: string | null;
  theme_primary: string | null;
  theme_accent: string | null;
  mindestbestellwert: number;
  liefergebuehr: number;
  free_delivery_threshold: number;
  durchschnittliche_lieferzeit_min: number;
  telefon: string | null;
  adresse: string | null;
  stadt: string | null;
}

export interface PaymentMethod {
  method: string;
  label: string;
  icon: string | null;
  enabled_lieferung: boolean;
}

export type DietTag = "v" | "vg" | "halal" | "lf" | "sp";

export const DIET_TAG_LABELS: Record<DietTag, string> = {
  v: "Vegetarisch",
  vg: "Vegan",
  halal: "Halal-zertifiziert",
  lf: "Laktosefrei",
  sp: "Scharf",
};

export const DIET_TAG_SHORT: Record<DietTag, string> = {
  v: "V",
  vg: "VG",
  halal: "HALAL",
  lf: "LAKTOSEFREI",
  sp: "🌶",
};
