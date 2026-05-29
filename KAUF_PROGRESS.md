# Kauf-Fertig Progress

## Status: KAUF-FERTIG ✅ (alle Kernfunktionen live)

---

## Phase 1: Analyse ✅
- Alle Komponenten in `/src/components/storefront/` inventarisiert
- CheckoutModal hatte Mock-Submit (zufällige ID)
- Kein Supabase-Insert, keine Stripe-Integration
- `Tenant`-Typ fehlte `id` und `location_id`
- Supabase-Keys vorhanden in `.env`

---

## Phase 2: Echte Bestellung in Supabase ✅
- `Tenant`-Typ um `id` und `location_id` erweitert
- `MOCK_TENANT` in `mock-data.ts` angepasst
- `load-tenant.ts` übergibt jetzt echte IDs aus der DB
- `CheckoutModal.tsx` Submit-Funktion komplett neu:
  - Async mit Loading/Error-State
  - `customer_orders` INSERT mit allen Feldern
  - `order_items` INSERT für alle Warenkorb-Positionen
  - Adresse aus strasse + hausnummer + etage zusammengesetzt

## Phase 3: Stripe-Zahlung ✅
- Nach Order-Erstellung: wenn `zahlungsart !== 'bar'` → Stripe
- Ruft `https://mise-gastro.de/api/checkout/create-session` mit `order_id` auf
- Bei Erfolg: Redirect auf Stripe-URL
- Bei Fehler/Bar-Zahlung: direkt zur Tracking-Seite

## Phase 4: Email-Bestätigung ✅
- Fire-and-forget POST an `https://mise-gastro.de/api/email/process-outbox`
- Wird nach Order-Erstellung getriggert, Fehler werden ignoriert

---

## Phase 5: Visuelles Layout ✅
1. **TopBar**: Delivery-Pill entfernt → schmale Bonus-Club-Bar oben, Logo zentriert (Fraunces Italic)
2. **WelcomeBanner**: Hero-Heading geändert zu "Mamma Mia — die Top 5"
3. **BonusCard standalone**: Aus FrankyStorefront entfernt
4. **BestsellerRail**: Dark-Green → Cream/Beige, Titel "Mamma Mia — die Top 5", weiße Karten mit Border
5. **Section-Header**: "No. 01 Pasta" Format mit Trennlinie
6. **ProductCards**: Bilder 300px statt 200px

---

## Phase 6: Finish-Fixes ✅ (2026-05-29)
- **Stripe Success-URL** → Neue Seite `/[slug]/success?order_id=xxx` zeigt TrackingScreen
- **URL-Param-Detection** → FrankyStorefront erkennt `?order_id=` bei Stripe-Redirect und zeigt Tracking
- **CustomerName im Tracking** → `onComplete(orderId, customerName)` übergibt Namen aus Checkout-Formular
- **Mindestbestellwert-Guard** → `submit()` in CheckoutModal prüft subtotal < mindestbestellwert und zeigt Fehler

## Noch offen / Nice-to-have
- [ ] PLZ-Validierung aus Supabase laden statt aus mock-data (VALID_PLZ Array)
- [ ] Echte Produktbilder in der Supabase DB eintragen (`bild_url`)
- [ ] Stripe-API: success_url auf `/[slug]/success?order_id={order.id}` setzen (serverseitig bei mise-gastro.de)
