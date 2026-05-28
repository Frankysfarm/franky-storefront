-- ============================================================
-- Franky's Pasta — Supabase Seed
-- Erstellt Tenant, Location, Kategorien, 40 Produkte, Zahlungsarten
-- ============================================================

-- 1. Tenant
INSERT INTO tenants (id, slug, name, theme_primary, theme_accent, hero_image_url, logo_url,
  durchschnittliche_lieferzeit_min, mindestbestellwert, liefergebuehr, storefront_theme_id,
  biss_brand_config)
VALUES (
  'fp-tenant-001',
  'frankys-pasta',
  'Franky''s Pasta',
  '#4a5e4a',
  '#c9a227',
  NULL,
  '/bilder/logo.jpg',
  28,
  15.00,
  1.99,
  'warm',
  '{"name":"Franky''s Pasta","tagline":["Pasta wie bei","Mamma","— direkt vor deine Tür."],"accent":"gold","mode":"light","storefront_design":"franky"}'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  theme_primary = EXCLUDED.theme_primary,
  biss_brand_config = EXCLUDED.biss_brand_config;

-- 2. Location
INSERT INTO locations (id, tenant_id, name, adresse, stadt, plz, telefon, aktiv)
VALUES (
  'fp-loc-001',
  'fp-tenant-001',
  'Franky''s Pasta Aachen',
  'Aachen',
  'Aachen',
  '52062',
  '0241 / [DEIN-TEL]',
  true
) ON CONFLICT (id) DO NOTHING;

-- 3. Kategorien
INSERT INTO menu_categories (id, location_id, name, icon, sort_order, aktiv) VALUES
  ('fp-cat-pasta',    'fp-loc-001', 'Pasta',      '🍝', 1, true),
  ('fp-cat-pizza',    'fp-loc-001', 'Pizza',      '🍕', 2, true),
  ('fp-cat-sides',    'fp-loc-001', 'Vorspeisen', '🥗', 3, true),
  ('fp-cat-desserts', 'fp-loc-001', 'Desserts',   '🍰', 4, true),
  ('fp-cat-drinks',   'fp-loc-001', 'Drinks',     '🥤', 5, true)
ON CONFLICT (id) DO NOTHING;

-- 4. Pasta-Option-Groups (als JSONB Template)
-- Wird in jedes Pasta-Item als option_groups eingefügt

-- 5. Menu Items — PASTA (10)
INSERT INTO menu_items (id, location_id, category_id, name, beschreibung, preis, bild_url, verfuegbar, beliebt, tags, sort_order, option_groups) VALUES
('PAS-001', 'fp-loc-001', 'fp-cat-pasta', 'Truffelo Frankylo', 'Pasta in cremiger Trüffel-Sahne mit Parmesan ohne Tierlab.', 15.99, '/bilder/truffelo-frankylo.jpg', true, true, ARRAY['v'], 1,
  '[{"id":"nudel","name":"Welche Nudel?","type":"single","required":true,"options":[{"id":"paccheri","label":"Paccheri","priceDelta":0,"default":true},{"id":"tagliatelle","label":"Tagliatelle","priceDelta":0},{"id":"rigatoni","label":"Rigatoni","priceDelta":0},{"id":"penne","label":"Penne","priceDelta":0},{"id":"gnocchi","label":"Gnocchi","priceDelta":0},{"id":"glutenfrei","label":"Glutenfreie Pasta","priceDelta":0},{"id":"protein","label":"Protein-Pasta","priceDelta":0},{"id":"vollkorn","label":"Vollkorn-Pasta","priceDelta":0}]},{"id":"swap","name":"Ernährung anpassen","type":"multi","required":false,"options":[{"id":"vegan","label":"Vegan-Swap","priceDelta":0},{"id":"laktosefrei","label":"Laktosefrei-Swap","priceDelta":0}]},{"id":"extras","name":"Extras","type":"multi","required":false,"options":[{"id":"extra-parm","label":"Extra Parmesan","priceDelta":1.5},{"id":"extra-chili","label":"Frische Chili","priceDelta":0.5},{"id":"extra-bread","label":"Brot dazu","priceDelta":1.5}]},{"id":"drink-gratis","name":"Gratis-Drink dazu?","type":"single","required":false,"options":[{"id":"none","label":"Kein Drink","priceDelta":0,"default":true},{"id":"peach","label":"Elephant Bay Pfirsich","priceDelta":0},{"id":"pomegranate","label":"Elephant Bay Granatapfel","priceDelta":0},{"id":"kola","label":"Fritz-Kola Classic","priceDelta":0},{"id":"kola-zero","label":"Fritz-Kola Super Zero","priceDelta":0},{"id":"limo","label":"Fritz-Limo Honigmelone","priceDelta":0}]}]'::jsonb),
('PAS-002', 'fp-loc-001', 'fp-cat-pasta', 'Gambas El Crema', 'Pasta mit Garnelen in Rosa Sahnesoße + Franky''s Spezial-Gewürz.', 14.99, '/bilder/gambas-el-crema.jpg', true, true, '{}', 2,
  '[{"id":"nudel","name":"Welche Nudel?","type":"single","required":true,"options":[{"id":"paccheri","label":"Paccheri","priceDelta":0,"default":true},{"id":"tagliatelle","label":"Tagliatelle","priceDelta":0},{"id":"rigatoni","label":"Rigatoni","priceDelta":0},{"id":"penne","label":"Penne","priceDelta":0},{"id":"gnocchi","label":"Gnocchi","priceDelta":0}]},{"id":"extras","name":"Extras","type":"multi","required":false,"options":[{"id":"extra-parm","label":"Extra Parmesan","priceDelta":1.5},{"id":"extra-chili","label":"Frische Chili","priceDelta":0.5},{"id":"extra-bread","label":"Brot dazu","priceDelta":1.5}]},{"id":"drink-gratis","name":"Gratis-Drink dazu?","type":"single","required":false,"options":[{"id":"none","label":"Kein Drink","priceDelta":0,"default":true},{"id":"peach","label":"Elephant Bay Pfirsich","priceDelta":0},{"id":"kola","label":"Fritz-Kola Classic","priceDelta":0}]}]'::jsonb),
('PAS-003', 'fp-loc-001', 'fp-cat-pasta', 'Pistacchio El Pesto', 'Pasta mit Pistazienpesto + Hähnchen + gehackten Pistazien.', 14.90, '/bilder/pistacchio-el-pesto.jpg', true, true, '{}', 3, NULL),
('PAS-004', 'fp-loc-001', 'fp-cat-pasta', 'Sucuk Supreme', 'Pasta mit Sucuk vom Rind · Joghurt · Hirtenkäse · Kirschtomaten.', 14.50, '/bilder/sucuk-supreme.jpg', true, false, ARRAY['halal','sp'], 4, NULL),
('PAS-005', 'fp-loc-001', 'fp-cat-pasta', 'Franky''s Arrabbiata', 'Pasta in Tomaten-Sahne mit Kirschtomaten + Joghurt.', 13.99, '/bilder/frankys-arrabbiata.jpg', true, false, ARRAY['v'], 5, NULL),
('PAS-006', 'fp-loc-001', 'fp-cat-pasta', 'Franky''s Alfredo', 'Pasta in cremiger Sahnesoße mit Hähnchen, Schalotten, Knoblauch.', 13.99, '/bilder/frankys-alfredo.jpg', true, false, '{}', 6, NULL),
('PAS-007', 'fp-loc-001', 'fp-cat-pasta', 'Formaggi di Franky', 'Pasta mit drei Käsesorten — alle ohne Tierlab.', 14.50, '/bilder/formaggi-di-franky.jpg', true, false, ARRAY['v'], 7, NULL),
('PAS-008', 'fp-loc-001', 'fp-cat-pasta', 'Bolognese', 'Halal Rinder-Bolognese mit Tomatensoße + Käse.', 14.99, '/bilder/bolognese.jpg', true, false, ARRAY['halal'], 8, NULL),
('PAS-009', 'fp-loc-001', 'fp-cat-pasta', 'Lasagne', 'Klassische Lasagne mit Halal Rinder-Bolognese + Béchamel + Käse.', 13.90, '/bilder/lasagne.jpg', true, false, ARRAY['halal'], 9, NULL),
('PAS-010', 'fp-loc-001', 'fp-cat-pasta', 'Pasta Lemona', 'Pasta in Zitronen-Sahne mit Zitronenabrieb + Parmesan.', 12.50, '/bilder/pasta-lemona.jpg', true, false, ARRAY['v'], 10, NULL)
ON CONFLICT (id) DO NOTHING;

-- 6. Menu Items — PIZZA (8)
INSERT INTO menu_items (id, location_id, category_id, name, beschreibung, preis, bild_url, verfuegbar, beliebt, tags, sort_order, option_groups) VALUES
('PIZ-001', 'fp-loc-001', 'fp-cat-pizza', 'Cheese Cheese', 'Vier-Käse Pizza: Tomate, Mozzarella, Cheddar, Parmesan.', 11.90, '/bilder/cheese-cheese.jpg', true, false, ARRAY['v'], 1, NULL),
('PIZ-002', 'fp-loc-001', 'fp-cat-pizza', 'Garden Club', 'Pizza mit Paprika, Kirschtomaten, Champignons, Zwiebeln.', 12.90, '/bilder/garden-club.jpg', true, false, ARRAY['v'], 2, NULL),
('PIZ-003', 'fp-loc-001', 'fp-cat-pizza', 'Toad Mushroom', 'Pilz-Pizza: Tomate, Champignons, Parmesan.', 12.90, '/bilder/toad-mushroom.jpg', true, false, ARRAY['v'], 3, NULL),
('PIZ-004', 'fp-loc-001', 'fp-cat-pizza', 'Salami Legend', 'Pizza mit Halal-Salami, Mozzarella, Parmesan.', 13.90, '/bilder/salami-legend.jpg', true, false, ARRAY['halal'], 4, NULL),
('PIZ-005', 'fp-loc-001', 'fp-cat-pizza', 'Tonno Rossa', 'Pizza mit Thunfisch + rote Zwiebeln auf Tomatenbasis.', 13.90, '/bilder/tonno-rossa.jpg', true, false, '{}', 5, NULL),
('PIZ-006', 'fp-loc-001', 'fp-cat-pizza', 'White Tuna', 'Pizza mit Hollandaise-Basis + Thunfisch + rote Zwiebeln.', 13.90, '/bilder/white-tuna.jpg', true, false, '{}', 6, NULL),
('PIZ-007', 'fp-loc-001', 'fp-cat-pizza', 'White Chicken', 'Pizza mit Hollandaise-Basis + Hähnchen + Zwiebeln.', 13.90, '/bilder/white-chicken.jpg', true, false, '{}', 7, NULL),
('PIZ-008', 'fp-loc-001', 'fp-cat-pizza', 'Istanbul Style', 'Pizza mit Sucuk + Feta + Parmesan.', 14.90, '/bilder/istanbul-style.jpg', true, false, ARRAY['halal','sp'], 8, NULL)
ON CONFLICT (id) DO NOTHING;

-- 7. Menu Items — SIDES (6)
INSERT INTO menu_items (id, location_id, category_id, name, beschreibung, preis, bild_url, verfuegbar, beliebt, tags, sort_order) VALUES
('SID-001', 'fp-loc-001', 'fp-cat-sides', 'Bruschetta Olive', 'Bruschetta mit Oliventapenade + Mozzarella + Cheddar überbacken.', 9.90, '/bilder/bruschetta-olive.jpg', true, false, ARRAY['v'], 1),
('SID-002', 'fp-loc-001', 'fp-cat-sides', 'Bruschetta Pastirma', 'Bruschetta mit Kräuterbutter + Mozzarella + Pastirma vom Rind.', 9.90, '/bilder/bruschetta-pastirma.jpg', true, true, ARRAY['halal'], 2),
('SID-003', 'fp-loc-001', 'fp-cat-sides', 'Tomatensuppe', 'Hausgemachte Tomatensuppe nach Franky''s Rezept.', 7.90, '/bilder/tomatensuppe.jpg', true, false, ARRAY['v'], 3),
('SID-004', 'fp-loc-001', 'fp-cat-sides', 'Insalata Verde', 'Mixed Greens · Kirschtomaten · hausgemachte Vinaigrette.', 6.50, '/bilder/insalata-verde.jpg', true, false, ARRAY['vg'], 4),
('SID-005', 'fp-loc-001', 'fp-cat-sides', 'Toast Pastrami', 'Toast mit Kräuterbutter + Mozzarella + Pastrami vom Rind.', 8.50, '/bilder/toast-pastrami.jpg', true, false, ARRAY['halal'], 5),
('SID-006', 'fp-loc-001', 'fp-cat-sides', 'Toast Truffel', 'Toast mit Trüffelcreme + Parmesan.', 9.90, '/bilder/toast-truffel.jpg', true, true, ARRAY['v'], 6)
ON CONFLICT (id) DO NOTHING;

-- 8. Menu Items — DESSERTS (11)
INSERT INTO menu_items (id, location_id, category_id, name, beschreibung, preis, bild_url, verfuegbar, beliebt, tags, sort_order) VALUES
('DES-001', 'fp-loc-001', 'fp-cat-desserts', 'San Sebastian Lotus-Creme', 'Basque Cheesecake mit Karamellsauce + Biscoff-Crumble.', 8.50, '/bilder/san-sebastian-lotus-creme.jpg', true, true, ARRAY['v'], 1),
('DES-002', 'fp-loc-001', 'fp-cat-desserts', 'San Sebastian Zartbitter', 'Basque Cheesecake mit dunkler Bitterschokolade-Ganache.', 7.70, '/bilder/san-sebastian-zartbitter.jpg', true, false, ARRAY['v'], 2),
('DES-003', 'fp-loc-001', 'fp-cat-desserts', 'San Sebastian Vollmilch', 'Basque Cheesecake mit cremiger Milchschoko-Ganache.', 7.70, '/bilder/san-sebastian-vollmilch.jpg', true, false, ARRAY['v'], 3),
('DES-004', 'fp-loc-001', 'fp-cat-desserts', 'San Sebastian Pistazie', 'Basque Cheesecake mit Pistazien-Sauce + gehackten Pistazien.', 7.90, '/bilder/san-sebastian-pistazie.jpg', true, true, ARRAY['v'], 4),
('DES-005', 'fp-loc-001', 'fp-cat-desserts', 'Franky''s Original', 'Klassischer Basque Cheesecake. Pur. Burnt-Top, cremig.', 5.90, '/bilder/frankys-original.jpg', true, false, ARRAY['v'], 5),
('DES-006', 'fp-loc-001', 'fp-cat-desserts', 'Franky''s Lotus Bowl', 'Glas-Dessert: Sahne, Biscoff Cookies, Karamellsauce.', 10.90, '/bilder/frankys-lotus-bowl.jpg', true, true, ARRAY['v'], 6),
('DES-007', 'fp-loc-001', 'fp-cat-desserts', 'Franky''s Dubai Bowl', 'Sahne · Pistazien-Kunafa · Schoko · Pistazien. Im Glas.', 10.90, '/bilder/frankys-dubai-bowl.jpg', true, false, ARRAY['v'], 7),
('DES-008', 'fp-loc-001', 'fp-cat-desserts', 'Pistachio Tiramisu', 'Italienisches Tiramisu mit Pistazien-Creme.', 6.90, '/bilder/pistachio-tiramisu.jpg', true, false, ARRAY['v'], 8),
('DES-009', 'fp-loc-001', 'fp-cat-desserts', 'Pistachio Cookie', 'Cookie mit weißer Schoko + Pistazien-Drizzle + Pistazien.', 4.90, '/bilder/pistachio-cookie.jpg', true, false, ARRAY['v'], 9),
('DES-010', 'fp-loc-001', 'fp-cat-desserts', 'Double Chocolate Cookie', 'Dunkler Kakao-Teig mit weißen + dunklen Schoko-Chunks.', 4.50, '/bilder/double-chocolate-cookie.jpg', true, false, ARRAY['v'], 10),
('DES-011', 'fp-loc-001', 'fp-cat-desserts', 'Chocolate Chip Cookie', 'Goldener Cookie mit großen dunklen Schoko-Chunks.', 4.50, '/bilder/chocolate-chip-cookie.jpg', true, false, ARRAY['v'], 11)
ON CONFLICT (id) DO NOTHING;

-- 9. Menu Items — DRINKS (5)
INSERT INTO menu_items (id, location_id, category_id, name, beschreibung, preis, bild_url, verfuegbar, beliebt, tags, sort_order) VALUES
('DRI-001', 'fp-loc-001', 'fp-cat-drinks', 'Elephant Bay Peach Ice Tea', 'Eistee mit Pfirsich-Geschmack von Elephant Bay.', 2.50, '/bilder/elephant-bay-peach.jpg', true, false, ARRAY['v'], 1),
('DRI-002', 'fp-loc-001', 'fp-cat-drinks', 'Elephant Bay Pomegranate', 'Eistee mit Granatapfel-Geschmack.', 2.50, '/bilder/elephant-bay-pomegranate.jpg', true, false, ARRAY['v'], 2),
('DRI-003', 'fp-loc-001', 'fp-cat-drinks', 'Fritz-Kola Classic', 'Original Fritz-Kola — koffeinhaltig.', 2.50, '/bilder/fritz-kola-classic.jpg', true, false, ARRAY['v'], 3),
('DRI-004', 'fp-loc-001', 'fp-cat-drinks', 'Fritz-Kola Super Zero', 'Zero-Sugar Fritz-Kola.', 2.50, '/bilder/fritz-kola-zero.jpg', true, false, ARRAY['v'], 4),
('DRI-005', 'fp-loc-001', 'fp-cat-drinks', 'Fritz-Limo Honigmelone', 'Limonade mit Honigmelonen-Geschmack.', 2.50, '/bilder/fritz-limo-honigmelone.jpg', true, false, ARRAY['v'], 5)
ON CONFLICT (id) DO NOTHING;

-- 10. Payment Methods
INSERT INTO tenant_payment_methods (tenant_id, method, label, icon, enabled_lieferung, enabled_abholung, enabled_vor_ort, sort_order) VALUES
('fp-tenant-001', 'paypal', 'PayPal', NULL, true, true, false, 1),
('fp-tenant-001', 'klarna', 'Klarna', NULL, true, true, false, 2),
('fp-tenant-001', 'apple_pay', 'Apple Pay', NULL, true, true, false, 3),
('fp-tenant-001', 'google_pay', 'Google Pay', NULL, true, true, false, 4),
('fp-tenant-001', 'karte', 'Karte', NULL, true, true, true, 5),
('fp-tenant-001', 'sepa', 'Lastschrift', NULL, true, true, false, 6),
('fp-tenant-001', 'giropay', 'giropay', NULL, true, true, false, 7),
('fp-tenant-001', 'bar', 'Barzahlung', NULL, true, false, true, 8)
ON CONFLICT DO NOTHING;
