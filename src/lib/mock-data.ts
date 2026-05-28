import type { Product, Category, PaymentMethod, Tenant, OptionGroup } from "./types";

const PASTA_OPTIONS: OptionGroup[] = [
  {
    id: "nudel",
    name: "Welche Nudel?",
    type: "single",
    required: true,
    options: [
      { id: "paccheri", label: "Paccheri", priceDelta: 0, default: true },
      { id: "tagliatelle", label: "Tagliatelle", priceDelta: 0 },
      { id: "rigatoni", label: "Rigatoni", priceDelta: 0 },
      { id: "penne", label: "Penne", priceDelta: 0 },
      { id: "gnocchi", label: "Gnocchi", priceDelta: 0 },
      { id: "glutenfrei", label: "Glutenfreie Pasta", priceDelta: 0 },
      { id: "protein", label: "Protein-Pasta", priceDelta: 0 },
      { id: "vollkorn", label: "Vollkorn-Pasta", priceDelta: 0 },
    ],
  },
  {
    id: "swap",
    name: "Ernährung anpassen",
    type: "multi",
    required: false,
    options: [
      { id: "vegan", label: "Vegan-Swap", priceDelta: 0, badge: "🌱" },
      { id: "laktosefrei", label: "Laktosefrei-Swap", priceDelta: 0, badge: "🥛" },
    ],
  },
  {
    id: "extras",
    name: "Extras",
    type: "multi",
    required: false,
    options: [
      { id: "extra-parm", label: "Extra Parmesan", priceDelta: 1.5, badge: "🧀" },
      { id: "extra-chili", label: "Frische Chili", priceDelta: 0.5, badge: "🌶️" },
      { id: "extra-bread", label: "Brot dazu", priceDelta: 1.5, badge: "🥖" },
    ],
  },
  {
    id: "drink-gratis",
    name: "Gratis-Drink dazu?",
    type: "single",
    required: false,
    options: [
      { id: "none", label: "Kein Drink", priceDelta: 0, default: true },
      { id: "peach", label: "Elephant Bay Pfirsich", priceDelta: 0 },
      { id: "pomegranate", label: "Elephant Bay Granatapfel", priceDelta: 0 },
      { id: "kola", label: "Fritz-Kola Classic", priceDelta: 0 },
      { id: "kola-zero", label: "Fritz-Kola Super Zero", priceDelta: 0 },
      { id: "limo", label: "Fritz-Limo Honigmelone", priceDelta: 0 },
    ],
  },
];

const PIZZA_OPTIONS: OptionGroup[] = [
  {
    id: "extras",
    name: "Extras",
    type: "multi",
    required: false,
    options: [
      { id: "extra-cheese", label: "Extra Käse", priceDelta: 1.5, badge: "🧀" },
      { id: "extra-chili-oil", label: "Chili-Öl", priceDelta: 0.5, badge: "🌶️" },
      { id: "extra-rocket", label: "Frische Rucola", priceDelta: 1.0, badge: "🌿" },
    ],
  },
  {
    id: "drink-gratis",
    name: "Gratis-Drink dazu?",
    type: "single",
    required: false,
    options: [
      { id: "none", label: "Kein Drink", priceDelta: 0, default: true },
      { id: "peach", label: "Elephant Bay Pfirsich", priceDelta: 0 },
      { id: "pomegranate", label: "Elephant Bay Granatapfel", priceDelta: 0 },
      { id: "kola", label: "Fritz-Kola Classic", priceDelta: 0 },
      { id: "kola-zero", label: "Fritz-Kola Super Zero", priceDelta: 0 },
      { id: "limo", label: "Fritz-Limo Honigmelone", priceDelta: 0 },
    ],
  },
];

export const MOCK_TENANT: Tenant = {
  id: "fp-tenant-001",
  location_id: "fp-loc-001",
  name: "Franky's Pasta",
  slug: "frankys-pasta",
  logo_url: "/bilder/logo.jpg",
  hero_image_url: null,
  theme_primary: "#4a5e4a",
  theme_accent: "#c9a227",
  mindestbestellwert: 15,
  liefergebuehr: 1.99,
  free_delivery_threshold: 25,
  durchschnittliche_lieferzeit_min: 28,
  telefon: "0241 / [DEIN-TEL]",
  adresse: "Aachen",
  stadt: "Aachen",
};

export const MOCK_CATEGORIES: Category[] = [
  { id: "pasta", name: "Pasta", icon: "🍝", sort_order: 1 },
  { id: "pizza", name: "Pizza", icon: "🍕", sort_order: 2 },
  { id: "sides", name: "Vorspeisen", icon: "🥗", sort_order: 3 },
  { id: "desserts", name: "Desserts", icon: "🍰", sort_order: 4 },
  { id: "drinks", name: "Drinks", icon: "🥤", sort_order: 5 },
];

export const MOCK_PRODUCTS: Product[] = [
  // === PASTA ===
  { id: "PAS-001", category_id: "pasta", name: "Truffelo Frankylo", beschreibung: "Pasta in cremiger Trüffel-Sahne mit Parmesan ohne Tierlab.", preis: 15.99, bild_url: "/bilder/truffelo-frankylo.jpg", verfuegbar: true, beliebt: true, tags: ["v"], badges: ["star", "best"], rating: 4.8, sort_order: 1, option_groups: PASTA_OPTIONS },
  { id: "PAS-002", category_id: "pasta", name: "Gambas El Crema", beschreibung: "Pasta mit Garnelen in Rosa Sahnesoße + Franky's Spezial-Gewürz.", preis: 14.99, bild_url: "/bilder/gambas-el-crema.jpg", verfuegbar: true, beliebt: true, tags: [], badges: ["star"], rating: 4.8, sort_order: 2, option_groups: PASTA_OPTIONS },
  { id: "PAS-003", category_id: "pasta", name: "Pistacchio El Pesto", beschreibung: "Pasta mit Pistazienpesto + Hähnchen + gehackten Pistazien.", preis: 14.90, bild_url: "/bilder/pistacchio-el-pesto.jpg", verfuegbar: true, beliebt: true, tags: [], badges: ["star", "best"], rating: 4.8, sort_order: 3, option_groups: PASTA_OPTIONS },
  { id: "PAS-004", category_id: "pasta", name: "Sucuk Supreme", beschreibung: "Pasta mit Sucuk vom Rind · Joghurt · Hirtenkäse · Kirschtomaten.", preis: 14.50, bild_url: "/bilder/sucuk-supreme.jpg", verfuegbar: true, beliebt: false, tags: ["halal", "sp"], badges: [], rating: 4.7, sort_order: 4, option_groups: PASTA_OPTIONS },
  { id: "PAS-005", category_id: "pasta", name: "Franky's Arrabbiata", beschreibung: "Pasta in Tomaten-Sahne mit Kirschtomaten + Joghurt.", preis: 13.99, bild_url: "/bilder/frankys-arrabbiata.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: [], rating: 4.5, sort_order: 5, option_groups: PASTA_OPTIONS },
  { id: "PAS-006", category_id: "pasta", name: "Franky's Alfredo", beschreibung: "Pasta in cremiger Sahnesoße mit Hähnchen, Schalotten, Knoblauch.", preis: 13.99, bild_url: "/bilder/frankys-alfredo.jpg", verfuegbar: true, beliebt: false, tags: [], badges: [], rating: 4.5, sort_order: 6, option_groups: PASTA_OPTIONS },
  { id: "PAS-007", category_id: "pasta", name: "Formaggi di Franky", beschreibung: "Pasta mit drei Käsesorten — alle ohne Tierlab.", preis: 14.50, bild_url: "/bilder/formaggi-di-franky.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: [], rating: 4.7, sort_order: 7, option_groups: PASTA_OPTIONS },
  { id: "PAS-008", category_id: "pasta", name: "Bolognese", beschreibung: "Halal Rinder-Bolognese mit Tomatensoße + Käse.", preis: 14.99, bild_url: "/bilder/bolognese.jpg", verfuegbar: true, beliebt: false, tags: ["halal"], badges: [], rating: 4.7, sort_order: 8, option_groups: PASTA_OPTIONS },
  { id: "PAS-009", category_id: "pasta", name: "Lasagne", beschreibung: "Klassische Lasagne mit Halal Rinder-Bolognese + Béchamel + Käse.", preis: 13.90, bild_url: "/bilder/lasagne.jpg", verfuegbar: true, beliebt: false, tags: ["halal"], badges: ["tradition"], rating: 4.7, sort_order: 9, option_groups: null },
  { id: "PAS-010", category_id: "pasta", name: "Pasta Lemona", beschreibung: "Pasta in Zitronen-Sahne mit Zitronenabrieb + Parmesan.", preis: 12.50, bild_url: "/bilder/pasta-lemona.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: ["best_preis"], rating: 4.7, sort_order: 10, option_groups: PASTA_OPTIONS },

  // === PIZZA ===
  { id: "PIZ-001", category_id: "pizza", name: "Cheese Cheese", beschreibung: "Vier-Käse Pizza: Tomate, Mozzarella, Cheddar, Parmesan.", preis: 11.90, bild_url: "/bilder/cheese-cheese.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: [], rating: 4.5, sort_order: 1, option_groups: PIZZA_OPTIONS },
  { id: "PIZ-002", category_id: "pizza", name: "Garden Club", beschreibung: "Pizza mit Paprika, Kirschtomaten, Champignons, Zwiebeln.", preis: 12.90, bild_url: "/bilder/garden-club.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: [], rating: 4.5, sort_order: 2, option_groups: PIZZA_OPTIONS },
  { id: "PIZ-003", category_id: "pizza", name: "Toad Mushroom", beschreibung: "Pilz-Pizza: Tomate, Champignons, Parmesan.", preis: 12.90, bild_url: "/bilder/toad-mushroom.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: [], rating: 4.5, sort_order: 3, option_groups: PIZZA_OPTIONS },
  { id: "PIZ-004", category_id: "pizza", name: "Salami Legend", beschreibung: "Pizza mit Halal-Salami, Mozzarella, Parmesan.", preis: 13.90, bild_url: "/bilder/salami-legend.jpg", verfuegbar: true, beliebt: false, tags: ["halal"], badges: ["best"], rating: 4.5, sort_order: 4, option_groups: PIZZA_OPTIONS },
  { id: "PIZ-005", category_id: "pizza", name: "Tonno Rossa", beschreibung: "Pizza mit Thunfisch + rote Zwiebeln auf Tomatenbasis.", preis: 13.90, bild_url: "/bilder/tonno-rossa.jpg", verfuegbar: true, beliebt: false, tags: [], badges: [], rating: 4.5, sort_order: 5, option_groups: PIZZA_OPTIONS },
  { id: "PIZ-006", category_id: "pizza", name: "White Tuna", beschreibung: "Pizza mit Hollandaise-Basis + Thunfisch + rote Zwiebeln.", preis: 13.90, bild_url: "/bilder/white-tuna.jpg", verfuegbar: true, beliebt: false, tags: [], badges: ["new"], rating: 4.5, sort_order: 6, option_groups: PIZZA_OPTIONS },
  { id: "PIZ-007", category_id: "pizza", name: "White Chicken", beschreibung: "Pizza mit Hollandaise-Basis + Hähnchen + Zwiebeln.", preis: 13.90, bild_url: "/bilder/white-chicken.jpg", verfuegbar: true, beliebt: false, tags: [], badges: [], rating: 4.5, sort_order: 7, option_groups: PIZZA_OPTIONS },
  { id: "PIZ-008", category_id: "pizza", name: "Istanbul Style", beschreibung: "Pizza mit Sucuk + Feta + Parmesan.", preis: 14.90, bild_url: "/bilder/istanbul-style.jpg", verfuegbar: true, beliebt: false, tags: ["halal", "sp"], badges: [], rating: 4.5, sort_order: 8, option_groups: PIZZA_OPTIONS },

  // === SIDES ===
  { id: "SID-001", category_id: "sides", name: "Bruschetta Olive", beschreibung: "Bruschetta mit Oliventapenade + Mozzarella + Cheddar überbacken.", preis: 9.90, bild_url: "/bilder/bruschetta-olive.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: [], rating: 4.5, sort_order: 1, option_groups: null },
  { id: "SID-002", category_id: "sides", name: "Bruschetta Pastirma", beschreibung: "Bruschetta mit Kräuterbutter + Mozzarella + Pastirma vom Rind.", preis: 9.90, bild_url: "/bilder/bruschetta-pastirma.jpg", verfuegbar: true, beliebt: true, tags: ["halal"], badges: ["star", "best"], rating: 4.8, sort_order: 2, option_groups: null },
  { id: "SID-003", category_id: "sides", name: "Tomatensuppe", beschreibung: "Hausgemachte Tomatensuppe nach Franky's Rezept.", preis: 7.90, bild_url: "/bilder/tomatensuppe.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: [], rating: 4.5, sort_order: 3, option_groups: null },
  { id: "SID-004", category_id: "sides", name: "Insalata Verde", beschreibung: "Mixed Greens · Kirschtomaten · hausgemachte Vinaigrette.", preis: 6.50, bild_url: "/bilder/insalata-verde.jpg", verfuegbar: true, beliebt: false, tags: ["vg"], badges: [], rating: 4.5, sort_order: 4, option_groups: null },
  { id: "SID-005", category_id: "sides", name: "Toast Pastrami", beschreibung: "Toast mit Kräuterbutter + Mozzarella + Pastrami vom Rind.", preis: 8.50, bild_url: "/bilder/toast-pastrami.jpg", verfuegbar: true, beliebt: false, tags: ["halal"], badges: [], rating: 4.5, sort_order: 5, option_groups: null },
  { id: "SID-006", category_id: "sides", name: "Toast Truffel", beschreibung: "Toast mit Trüffelcreme + Parmesan.", preis: 9.90, bild_url: "/bilder/toast-truffel.jpg", verfuegbar: true, beliebt: true, tags: ["v"], badges: ["star"], rating: 4.8, sort_order: 6, option_groups: null },

  // === DESSERTS ===
  { id: "DES-001", category_id: "desserts", name: "San Sebastian Lotus-Creme", beschreibung: "Basque Cheesecake mit Karamellsauce + Biscoff-Crumble.", preis: 8.50, bild_url: "/bilder/san-sebastian-lotus-creme.jpg", verfuegbar: true, beliebt: true, tags: ["v"], badges: ["star", "best"], rating: 4.8, sort_order: 1, option_groups: null },
  { id: "DES-002", category_id: "desserts", name: "San Sebastian Zartbitter", beschreibung: "Basque Cheesecake mit dunkler Bitterschokolade-Ganache.", preis: 7.70, bild_url: "/bilder/san-sebastian-zartbitter.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: [], rating: 4.7, sort_order: 2, option_groups: null },
  { id: "DES-003", category_id: "desserts", name: "San Sebastian Vollmilch", beschreibung: "Basque Cheesecake mit cremiger Milchschoko-Ganache.", preis: 7.70, bild_url: "/bilder/san-sebastian-vollmilch.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: ["new"], rating: 4.5, sort_order: 3, option_groups: null },
  { id: "DES-004", category_id: "desserts", name: "San Sebastian Pistazie", beschreibung: "Basque Cheesecake mit Pistazien-Sauce + gehackten Pistazien.", preis: 7.90, bild_url: "/bilder/san-sebastian-pistazie.jpg", verfuegbar: true, beliebt: true, tags: ["v"], badges: ["star", "best"], rating: 4.8, sort_order: 4, option_groups: null },
  { id: "DES-005", category_id: "desserts", name: "Franky's Original", beschreibung: "Klassischer Basque Cheesecake. Pur. Burnt-Top, cremig.", preis: 5.90, bild_url: "/bilder/frankys-original.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: ["tradition"], rating: 4.7, sort_order: 5, option_groups: null },
  { id: "DES-006", category_id: "desserts", name: "Franky's Lotus Bowl", beschreibung: "Glas-Dessert: Sahne, Biscoff Cookies, Karamellsauce.", preis: 10.90, bild_url: "/bilder/frankys-lotus-bowl.jpg", verfuegbar: true, beliebt: true, tags: ["v"], badges: ["star", "best"], rating: 4.8, sort_order: 6, option_groups: null },
  { id: "DES-007", category_id: "desserts", name: "Franky's Dubai Bowl", beschreibung: "Sahne · Pistazien-Kunafa · Schoko · Pistazien. Im Glas.", preis: 10.90, bild_url: "/bilder/frankys-dubai-bowl.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: ["new"], rating: 4.7, sort_order: 7, option_groups: null },
  { id: "DES-008", category_id: "desserts", name: "Pistachio Tiramisu", beschreibung: "Italienisches Tiramisu mit Pistazien-Creme.", preis: 6.90, bild_url: "/bilder/pistachio-tiramisu.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: [], rating: 4.7, sort_order: 8, option_groups: null },
  { id: "DES-009", category_id: "desserts", name: "Pistachio Cookie", beschreibung: "Cookie mit weißer Schoko + Pistazien-Drizzle + Pistazien.", preis: 4.90, bild_url: "/bilder/pistachio-cookie.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: ["star"], rating: 4.8, sort_order: 9, option_groups: null },
  { id: "DES-010", category_id: "desserts", name: "Double Chocolate Cookie", beschreibung: "Dunkler Kakao-Teig mit weißen + dunklen Schoko-Chunks.", preis: 4.50, bild_url: "/bilder/double-chocolate-cookie.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: [], rating: 4.7, sort_order: 10, option_groups: null },
  { id: "DES-011", category_id: "desserts", name: "Chocolate Chip Cookie", beschreibung: "Goldener Cookie mit großen dunklen Schoko-Chunks.", preis: 4.50, bild_url: "/bilder/chocolate-chip-cookie.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: ["tradition"], rating: 4.7, sort_order: 11, option_groups: null },

  // === DRINKS ===
  { id: "DRI-001", category_id: "drinks", name: "Elephant Bay Peach Ice Tea", beschreibung: "Eistee mit Pfirsich-Geschmack von Elephant Bay.", preis: 2.50, bild_url: "/bilder/elephant-bay-peach.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: [], rating: 4.5, sort_order: 1, option_groups: null },
  { id: "DRI-002", category_id: "drinks", name: "Elephant Bay Pomegranate", beschreibung: "Eistee mit Granatapfel-Geschmack.", preis: 2.50, bild_url: "/bilder/elephant-bay-pomegranate.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: [], rating: 4.5, sort_order: 2, option_groups: null },
  { id: "DRI-003", category_id: "drinks", name: "Fritz-Kola Classic", beschreibung: "Original Fritz-Kola — koffeinhaltig.", preis: 2.50, bild_url: "/bilder/fritz-kola-classic.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: [], rating: 4.5, sort_order: 3, option_groups: null },
  { id: "DRI-004", category_id: "drinks", name: "Fritz-Kola Super Zero", beschreibung: "Zero-Sugar Fritz-Kola.", preis: 2.50, bild_url: "/bilder/fritz-kola-zero.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: [], rating: 4.5, sort_order: 4, option_groups: null },
  { id: "DRI-005", category_id: "drinks", name: "Fritz-Limo Honigmelone", beschreibung: "Limonade mit Honigmelonen-Geschmack.", preis: 2.50, bild_url: "/bilder/fritz-limo-honigmelone.jpg", verfuegbar: true, beliebt: false, tags: ["v"], badges: [], rating: 4.5, sort_order: 5, option_groups: null },
];

export const BESTSELLER_IDS = ["PAS-001", "PAS-002", "PAS-003", "SID-002", "SID-006", "DES-001"];
export const TOP3_IDS = new Set(["PAS-001", "PAS-003", "SID-002"]);

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  { method: "paypal", label: "PayPal", icon: null, enabled_lieferung: true },
  { method: "klarna", label: "Klarna", icon: null, enabled_lieferung: true },
  { method: "apple_pay", label: "Apple Pay", icon: null, enabled_lieferung: true },
  { method: "google_pay", label: "Google Pay", icon: null, enabled_lieferung: true },
  { method: "karte", label: "Karte", icon: null, enabled_lieferung: true },
  { method: "sepa", label: "Lastschrift", icon: null, enabled_lieferung: true },
  { method: "giropay", label: "giropay", icon: null, enabled_lieferung: true },
  { method: "bar", label: "Barzahlung", icon: null, enabled_lieferung: true },
];

export const VALID_PLZ = [
  "52062", "52064", "52066", "52068", "52070",
  "52072", "52074", "52076", "52078", "52080",
];

export function buildProductMap(products: Product[]): Map<string, Product> {
  return new Map(products.map((p) => [p.id, p]));
}
