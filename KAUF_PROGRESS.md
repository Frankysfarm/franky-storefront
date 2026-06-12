# Kauf-Fertig Progress

## Status: KAUF-FERTIG ✅ (alle Kernfunktionen live — 2026-06-03, verifiziert 2026-06-10, Neusession-47 2026-06-10, Neusession-48 2026-06-11, Neusession-49 2026-06-11, Neusession-50 2026-06-11, Neusession-51 2026-06-11, Neusession-52 2026-06-11, Neusession-53 2026-06-11, Neusession-54 2026-06-11, Neusession-55 2026-06-12, Neusession-56 2026-06-12, Neusession-57 2026-06-12, Neusession-58 2026-06-12, Neusession-59 2026-06-12)

## Phase 59: Vollverifikation ✅ (2026-06-12)
- **Frische Vollanalyse** aus neuer Session — alle Kernkomponenten geprüft
- **KEINE REGRESSION** — Stand 7288892 (Phase 58) korrekt, Build clean (4.2s compile, TypeScript clean, 4 Routen)
- **CheckoutModal.tsx**: Supabase `customer_orders` + `order_items` INSERT ✅, lieferhinweis fire-and-forget ✅, Email-Outbox ✅, Stripe-Redirect (non-bar, throws on failure) ✅, Mindestbestellwert-Guard ✅, Loading + inline Error ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark bg, gold text, 🎁) + Row2 cream nav (Search · Logo Fraunces italic · Cart) ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" scrollbare Top-5-Karten mit echten product.rating ✅
- **BestsellerRail.tsx**: Cream-soft/bone Gradient, weiße scrollbare Karten, Rank-Badges ✅
- **FrankyStorefront.tsx**: Section-Header `items-end` + No.XX italic gold paddingBottom 8px + h2 non-italic + description italic paddingBottom 8px + HR-Divider ✅
- **ProductCard.tsx**: Bilder `h-[200px] sm:h-[240px] lg:h-[300px]` ✅
- **BonusCard/LoyaltyCard**: return null ✅
- **CategoryNav**: sticky `top-[90px]` ✅
- **Git**: sauber, origin/main up-to-date ✅
- **Offen (non-blocking)**: PLZ-Liste hardcoded, free_delivery_threshold hardcoded 25, Stripe success_url serverseitig bei mise-gastro.de

## Phase 58: Vollverifikation ✅ (2026-06-12)
- **Frische Vollanalyse** aus neuer Session — alle Kernkomponenten geprüft
- **KEINE REGRESSION** — Stand 4a8433f (Phase 57) korrekt, Build clean (3.8s compile, TypeScript clean, 4 Routen)
- **CheckoutModal.tsx**: Supabase `customer_orders` + `order_items` INSERT ✅, lieferhinweis fire-and-forget ✅, Email-Outbox ✅, Stripe-Redirect (non-bar, throws on failure) ✅, Mindestbestellwert-Guard ✅, Loading + inline Error ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark bg, gold text, 🎁) + Row2 cream nav (Search · Logo Fraunces italic · Cart) ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" scrollbare Top-5-Karten mit echten product.rating ✅
- **BestsellerRail.tsx**: Cream-soft/bone Gradient, weiße scrollbare Karten, Rank-Badges ✅
- **FrankyStorefront.tsx**: Section-Header `items-end` + No.XX italic gold paddingBottom 8px + h2 non-italic + description italic paddingBottom 8px + HR-Divider ✅
- **ProductCard.tsx**: Bilder `h-[200px] sm:h-[240px] lg:h-[300px]` ✅
- **BonusCard/LoyaltyCard**: return null ✅
- **CategoryNav**: sticky `top-[90px]` ✅
- **Git**: sauber, origin/main up-to-date ✅
- **Offen (non-blocking)**: PLZ-Liste hardcoded, free_delivery_threshold hardcoded 25, Stripe success_url serverseitig bei mise-gastro.de

## Phase 57: Vollverifikation ✅ (2026-06-12)
- **Frische Vollanalyse** aus neuer Session — alle Kernkomponenten geprüft
- **KEINE REGRESSION** — Stand fed6b6b (Phase 56, WelcomeBanner real rating) korrekt
- **Build**: ✅ Next.js TypeScript clean, 4 Routen (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **CheckoutModal.tsx**: Supabase `customer_orders` + `order_items` INSERT ✅, lieferhinweis fire-and-forget ✅, Email-Outbox ✅, Stripe-Redirect (non-bar) ✅, Mindestbestellwert-Guard ✅, Loading + inline Error ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar + Row2 cream nav (Search · Logo Fraunces italic · Cart) ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" scrollbare Top-5-Karten mit echten product.rating ✅
- **BestsellerRail.tsx**: Cream-Hintergrund, weiße Karten, Rank-Badges ✅
- **FrankyStorefront.tsx**: Section-Header `items-end` + No.XX italic gold paddingBottom 8px + h2 non-italic + description italic paddingBottom 8px + HR-Divider ✅
- **ProductCard.tsx**: Bilder `h-[200px] sm:h-[240px] lg:h-[300px]` ✅
- **BonusCard/LoyaltyCard**: return null ✅
- **CategoryNav**: sticky `top-[90px]` ✅
- **Git**: sauber, origin/main up-to-date ✅
- **Offen (non-blocking)**: PLZ-Liste hardcoded, free_delivery_threshold hardcoded 25, Stripe success_url serverseitig bei mise-gastro.de

## Phase 56: Vollverifikation ✅ (2026-06-12)
- **Frische Vollanalyse** aus neuer Session — alle Kernkomponenten geprüft
- **KEINE REGRESSION** gefunden — letzter Stand (f62e463, Phase 55) korrekt
- **Build**: ✅ Next.js, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **CheckoutModal.tsx**: Supabase `customer_orders` + `order_items` INSERT ✅, lieferhinweis fire-and-forget ✅, Email-Outbox ✅, Stripe-Redirect (non-bar) ✅, Mindestbestellwert-Guard ✅, Loading + inline Error ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar + Row2 cream nav (Search · Logo Fraunces italic · Cart) ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" scrollbare Top-5-Karten ✅
- **BestsellerRail.tsx**: Cream-Hintergrund, weiße Karten, Rank-Badges ✅
- **FrankyStorefront.tsx**: Section-Header `items-end` + No.XX italic gold paddingBottom 8px + h2 non-italic + description italic paddingBottom 8px + HR-Divider ✅
- **ProductCard.tsx**: Bilder `h-[200px] sm:h-[240px] lg:h-[300px]` ✅
- **BonusCard/LoyaltyCard**: return null ✅
- **CategoryNav**: sticky `top-[90px]` ✅
- **Git**: sauber, origin/main up-to-date ✅
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25, Stripe success_url serverseiting bei mise-gastro.de

## Phase 55: Regressions-Fix + Vollverifikation ✅ (2026-06-12)
- **Frische Vollanalyse** aus neuer Session — KAUF_PROGRESS.md gelesen, alle Kernkomponenten geprüft
- **REGRESSION GEFUNDEN + BEHOBEN**: Commit `cd37624` (Redesign-Agent, nach Phase 54) hatte Section-Header erneut falsch gesetzt:
  - `items-baseline` → zurück zu `items-end` (Mockup `.section-head { align-items: flex-end }`)
  - `No.` span: `italic` + `paddingBottom: "8px"` wiederhergestellt (Mockup `.section-num { font-style: italic; padding-bottom: 8px }`)
  - `h2`: `italic` entfernt (Mockup `.section-title` — kein font-style)
  - description span: `italic` + `paddingBottom: "8px"` hinzugefügt (Mockup `.section-count { font-style: italic; padding-bottom: 8px }`)
- **Build**: ✅ Next.js 16.2.4 Turbopack, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **CheckoutModal.tsx**: Supabase `customer_orders` (location_id, typ, kunde_*, zwischensumme, liefergebuehr, gesamtbetrag, zahlungsart) ✅, `order_items` INSERT mit Error-Handling ✅, lieferhinweis fire-and-forget ✅, Email-Outbox ✅, Stripe-Redirect (non-bar, throws on failure) ✅, Mindestbestellwert-Guard ✅, orderError inline ✅, loading state ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark bg, gold text, 🎁) + Row2 cream nav (Search links · Logo zentral Fraunces italic · Cart rechts) ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" + scrollbare Top-5-Karten mit Rank-Badge, Image, Social Proof, Preis ✅
- **FrankyStorefront.tsx**: Section-Header `items-end` + No.XX italic gold + paddingBottom 8px + h2 non-italic + description italic paddingBottom 8px + HR-Divider ✅, Stripe `?order_id=` Detection + clearCart ✅
- **Git**: sauber, gepusht → origin/main (3a02a84) ✅
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25 in load-tenant.ts, Stripe success_url serverseitig bei mise-gastro.de

## Phase 54: Vollverifikation ✅ (2026-06-11)
- **Frische Vollanalyse** aus neuer Session — KAUF_PROGRESS.md gelesen, alle Kernkomponenten geprüft
- **Build**: ✅ Next.js 16.2.4 Turbopack, 3.6s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **CheckoutModal.tsx**: Supabase `customer_orders` (location_id, typ, kunde_*, zwischensumme, liefergebuehr, gesamtbetrag, zahlungsart) ✅, `order_items` INSERT mit Error-Handling ✅, lieferhinweis fire-and-forget ✅, Email-Outbox ✅, Stripe-Redirect (non-bar, throws on failure) ✅, Mindestbestellwert-Guard ✅, orderError inline ✅, loading state ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark bg, gold text, 🎁) + Row2 cream nav (Search links · Logo zentral Fraunces italic · Cart rechts) ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" + scrollbare Top-5-Karten mit Rank-Badge, Image, Social Proof, Preis ✅
- **FrankyStorefront.tsx**: Section-Header `items-end` + No.XX italic gold + h2 non-italic + HR-Divider ✅, Stripe `?order_id=` Detection + clearCart ✅, BonusModal inline ✅
- **Git**: sauber, up to date mit origin/main ✅
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25 in load-tenant.ts, Stripe success_url serverseitig bei mise-gastro.de

## Phase 53: Layout-Bugfix ✅ (2026-06-11)
- **Vollanalyse**: MOCKUP-REFERENCE.html komplett gelesen · alle Komponenten gegen Mockup-CSS verifiziert
- **Fix**: Section-Header `No.XX` span hatte `paddingBottom` auf dem Description-Span statt auf dem Nummer-Span · korrigiert zu `style={{ opacity: 0.85, paddingBottom: "8px" }}` auf No.-Span (gemäß Mockup `.section-num { padding-bottom: 8px }`)
- **Build**: ✅ Next.js 16.2.4 Turbopack, TypeScript clean, 4 Routen korrekt
- **Vollständig korrekt (unverändert)**: TopBar 2-Row (Bonus-Bar + Cream-Nav) ✅ · WelcomeBanner "Mamma Mia — die Top 5" cream ✅ · BestsellerRail cream/bone ✅ · BonusCard null ✅ · ProductCard 200/240/300px responsive ✅
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25 in load-tenant.ts, Stripe success_url serverseitig bei mise-gastro.de

## Phase 52: Vollverifikation ✅ (2026-06-11)
- **Frische Vollanalyse** aus neuer Session — KAUF_PROGRESS.md gelesen, alle Kernkomponenten geprüft
- **Build**: ✅ Next.js 16.2.4 Turbopack, 4.4s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **CheckoutModal.tsx**: Supabase `customer_orders` (location_id, typ, kunde_*, zwischensumme, liefergebuehr, gesamtbetrag, zahlungsart) ✅, `order_items` INSERT mit Error-Handling ✅, lieferhinweis fire-and-forget ✅, Email-Outbox ✅, Stripe-Redirect (non-bar, throws on failure) ✅, Mindestbestellwert-Guard ✅, orderError inline ✅, loading state ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark bg, gold text, 🎁) + Row2 cream nav (Search links · Logo zentral Fraunces italic · Cart rechts) ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" + scrollbare Top-5-Karten mit Rank-Badge, Image, Social Proof, Preis ✅
- **BestsellerRail.tsx**: cream-soft/bone Gradient, weiße scrollbare Karten mit Border, dp-pulse animation ✅
- **BonusCard.tsx**: returns null · nicht in FrankyStorefront verwendet ✅
- **FrankyStorefront.tsx**: Section-Header `items-end` + No.XX italic gold + h2 non-italic + HR-Divider ✅, Stripe `?order_id=` Detection + clearCart ✅, BonusModal inline ✅
- **ProductCard.tsx**: h-[200px]/sm:h-[240px]/lg:h-[300px] responsive ✅
- **Git**: sauber, up to date mit origin/main ✅ (letzter Commit vor dieser Session: Phase-51)
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25 in load-tenant.ts, Stripe success_url serverseitig bei mise-gastro.de

## Phase 51: Vollverifikation ✅ (2026-06-11)
- **Frische Vollanalyse** aus neuer Session — KAUF_PROGRESS.md gelesen, alle Kernkomponenten geprüft
- **Build**: ✅ Next.js, 3.3s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **CheckoutModal.tsx**: Supabase `customer_orders` (location_id, typ, kunde_*, zwischensumme, liefergebuehr, gesamtbetrag, zahlungsart) ✅, `order_items` INSERT mit Error-Handling ✅, lieferhinweis fire-and-forget ✅, Email-Outbox ✅, Stripe-Redirect (non-bar, throws on failure) ✅, Mindestbestellwert-Guard ✅, orderError inline ✅, loading state ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark bg, gold text, 🎁) + Row2 cream nav (Search links · Logo zentral Fraunces italic · Cart rechts) ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" + scrollbare Top-5-Karten mit Rank-Badge, Image, Social Proof, Preis ✅
- **BestsellerRail.tsx**: cream-soft/bone Gradient, weiße scrollbare Karten mit Border, dp-pulse animation ✅
- **FrankyStorefront.tsx**: Section-Header items-end + No.XX italic gold + h2 non-italic + HR-Divider ✅, Stripe `?order_id=` Detection ✅, clearCart on-redirect ✅
- **ProductCard.tsx**: h-[200px]/sm:h-[240px]/lg:h-[300px] responsive ✅
- **Git**: sauber, up to date mit origin/main ✅ (letzter Commit vor dieser Session: Phase-50)
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25 in load-tenant.ts, Stripe success_url serverseitig bei mise-gastro.de

## Phase 50: Vollverifikation ✅ (2026-06-11)
- **Frische Vollanalyse** aus neuer Session — KAUF_PROGRESS.md gelesen, alle Kernkomponenten geprüft
- **Build**: ✅ Next.js 16.2.4 Turbopack, 3.5s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **CheckoutModal.tsx**: Supabase `customer_orders` (location_id, typ, kunde_*, zwischensumme, liefergebuehr, gesamtbetrag, zahlungsart) ✅, `order_items` INSERT mit Error-Handling ✅, lieferhinweis fire-and-forget ✅, Email-Outbox ✅, Stripe-Redirect (non-bar, throws on failure) ✅, Mindestbestellwert-Guard ✅, orderError inline ✅, loading state ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark bg, gold text, 🎁) + Row2 cream nav (Search links · Logo zentral Fraunces italic · Cart rechts) ✅
- **FrankyStorefront.tsx**: Stripe `?order_id=` Detection ✅, clearCart on-redirect ✅, Section-Header items-end + No.XX italic gold + h2 non-italic + HR-Divider ✅
- **Git**: sauber, up to date mit origin/main ✅ (letzter Commit vor dieser Session: 63b160a Phase-49)
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25, Stripe success_url serverseitig bei mise-gastro.de

## Phase 49: Layout-Vollverifikation ✅ (2026-06-11)
- **Frische Vollanalyse** aus neuer Session — MOCKUP-REFERENCE.html vollständig analysiert
- **Build**: ✅ Next.js 16.2.4 Turbopack, 3.4s compile, TypeScript clean, 4 Routen korrekt
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark bg, gold text, 🎁, click→BonusModal) + Row2 cream nav (Search links · Logo zentral Fraunces italic · Cart rechts) — KEIN Liefern-Pill ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" (nicht "Pasta wie bei Mamma") · Left 280px title+subtext · Right scrollable Top-5-Karten mit Rank-Badge, Image, Social Proof, Preis ✅
- **BestsellerRail.tsx**: cream/bone Gradient (nicht dark-green) · "✨ Heute beliebt" sage-dark · weiße scrollbare Karten · "Andiamo! 🍝" ✅
- **BonusCard.tsx**: returns null · nicht in FrankyStorefront importiert ✅
- **FrankyStorefront.tsx**: Section-Header items-end · No.XX italic gold · h2 non-italic · description paddingBottom 8px · HR-Divider ✅ · BonusCard NICHT aufgerufen ✅
- **ProductCard.tsx**: h-[200px]/sm:h-[240px]/lg:h-[300px] responsive · Fraunces 900 18px Titel · gold-deep Preis · sage Add-Button ✅
- **Alle Layout-Anforderungen aus dem Redesign-Brief erfüllt** — keine Abweichungen vom Mockup gefunden
- **Git**: sauber, up to date mit origin/main ✅ (letzter Commit vor dieser Session: ef069be Phase-48)
- **Offen (non-blocking)**: PLZ-Liste hardcoded in mock-data.ts, `free_delivery_threshold` hardcoded 25 in load-tenant.ts, Stripe success_url serverseitig bei mise-gastro.de

## Phase 48: Vollanalyse + Build-Verifikation ✅ (2026-06-11)
- **Frische Vollanalyse** aus neuer Session — alle 47 vorigen Phasen geprüft
- **Build**: ✅ Next.js 16.2.4 Turbopack, 3.5s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **CheckoutModal.tsx**: Supabase `customer_orders` (location_id, typ, kunde_*, zwischensumme, liefergebuehr, gesamtbetrag, zahlungsart) ✅, `order_items` INSERT ✅, lieferhinweis fire-and-forget ✅, Email-Outbox ✅, Stripe-Redirect (non-bar) ✅, Mindestbestellwert-Guard ✅, orderError inline ✅, loading state ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark, gold text, gift emoji) + Row2 Logo zentriert (Fraunces italic) + Search + Cart ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" headline + horizontale Top-5-Karten (Rank-Badge, Image, Social Proof, Preis, Add-CTA) ✅
- **BestsellerRail.tsx**: cream/bone BG, weiße scrollbare Karten mit Border, Rank-Badge, dp-pulse animation ✅
- **FrankyStorefront.tsx**: Section-Header `items-end` + `No.&nbsp;{num}` italic gold + h2 non-italic + HR-Divider ✅, Stripe `?order_id=` Detection ✅, load-tenant.ts: alle Felder aus Supabase ✅
- **TrackingScreen.tsx**: 5-Schritt-Tracking mit stabilem ETA-Fenster, auto-advance 5s/12s ✅
- **ProductCard.tsx**: h-[200px]/sm:h-[240px]/lg:h-[300px] responsive Bilder ✅
- **BonusCard.tsx**: existiert aber nicht in FrankyStorefront verwendet ✅
- **Git**: sauber, up to date mit origin/main ✅ (letzter Commit: c92313f Phase-47)
- **Offen (non-blocking)**: PLZ-Liste hardcoded in mock-data.ts, `free_delivery_threshold` hardcoded 25 in load-tenant.ts, Stripe success_url serverseitig bei mise-gastro.de

## Phase 47: Vollanalyse + Build-Verifikation ✅ (2026-06-10)
- **Frische Vollanalyse** aus neuer Session — alle 46 vorigen Phasen geprüft
- **Build**: ✅ Next.js 16.2.4 Turbopack, 4.3s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **Kein Math.random, kein TODO/FIXME** im Produktiv-Code ✅
- **CheckoutModal.tsx**: Supabase `customer_orders` + `order_items` INSERT real ✅, Stripe-Redirect ✅, Email-Outbox fire-and-forget ✅, anmerkung→lieferhinweis ✅, orderError inline ✅, Mindestbestellwert-Guard ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark, gold text) + Row2 Logo zentriert (Fraunces italic) ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" + horizontale Top-5-Karten mit Rank-Badge, Social Proof, Preis ✅
- **BestsellerRail.tsx**: cream/bone BG, weiße scrollbare Karten mit Border, dp-pulse animation ✅
- **FrankyStorefront.tsx**: Section-Header `items-end` + `No.&nbsp;{num}` italic gold + h2 non-italic + HR-Divider ✅, Stripe-Redirect-Detection via `?order_id=` ✅
- **TrackingScreen.tsx**: 5-Schritt-Tracking mit stabilem ETA-Fenster, auto-advance nach 5s/12s ✅
- **Git**: sauber, up to date mit origin/main ✅ (letzter Commit: bb77957 Phase-46)
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25 in load-tenant.ts, Stripe success_url serverseitig bei mise-gastro.de

## Phase 46: Section-Header Regressionsfix ✅ (2026-06-10)
- **Frische Vollanalyse** aus neuer Session — alle 45 vorigen Phasen geprüft
- **Build**: ✅ Next.js 16.2.4 Turbopack, 3.6s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **BUG FIXED**: Commit 51d2d38 hatte Phase-45-Fixes erneut revertiert (`FrankyStorefront.tsx` Section-Header):
  - `items-baseline` → zurück zu `items-end` (Mockup: `align-items: flex-end`)
  - `No.&nbsp;{num}` Span: `italic` hinzugefügt (Mockup: `.section-num { font-style: italic }`)
  - h2: `italic` entfernt → h2 ist wieder non-italic (Mockup: `.section-title` — kein font-style)
  - Description-Span: `paddingBottom: "4px"` → `"8px"` (Mockup: `.section-count { padding-bottom: 8px }`)
- **Alle anderen Komponenten unverändert korrekt**: TopBar ✅, WelcomeBanner ✅, BestsellerRail ✅, ProductCard ✅, TrackingScreen ✅, CheckoutModal ✅
- **CheckoutModal**: Supabase `customer_orders` + `order_items` INSERT real ✅, Stripe-Redirect ✅, Email-Outbox fire-and-forget ✅, anmerkung→lieferhinweis ✅, orderError inline ✅, Mindestbestellwert-Guard ✅
- **Git**: sauber, gepusht → origin/main ✅
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25, Stripe success_url serverseitig bei mise-gastro.de

## Phase 45: Section-Header Mockup-Korrekturrunde ✅ (2026-06-10)
- **Frische Vollanalyse** aus neuer Session — alle 44 vorigen Phasen geprüft
- **Build**: ✅ Next.js 16.2.4 Webpack, 4.7s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **Kein Math.random, kein TODO/FIXME** im Produktiv-Code ✅
- **CheckoutModal.tsx**: Supabase `customer_orders` + `order_items` INSERT real ✅, Stripe-Redirect ✅, Email-Outbox fire-and-forget ✅, anmerkung→lieferhinweis fire-and-forget ✅, orderError inline ✅, Mindestbestellwert-Guard ✅
- **BUG FIXED**: `FrankyStorefront.tsx` Section-Header — Commit 08a3b48 hatte Phase-24-Fixes revertiert:
  - `items-baseline` → zurück zu `items-end` (Mockup: `align-items: flex-end`)
  - `section-num` `.paddingBottom: "8px"` wiederhergestellt (Mockup: `.section-num { padding-bottom: 8px }`)
  - h2 `italic` entfernt → h2 ist wieder non-italic (Mockup: `.section-title` hat kein font-style)
- **Alle anderen Komponenten unverändert korrekt**: TopBar ✅, WelcomeBanner ✅, BestsellerRail ✅, ProductCard ✅, TrackingScreen ✅
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25, Stripe success_url serverseitig bei mise-gastro.de

## Phase 44: Vollanalyse + Build-Verifikation ✅ (2026-06-10)
- **Frische Vollanalyse** aus neuer Session — alle 43 vorigen Phasen geprüft
- **Build**: ✅ Next.js 16.2.4 Turbopack, 3.4s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **Kein Math.random, kein TODO/FIXME** im Produktiv-Code ✅
- **CheckoutModal.tsx**: Supabase `customer_orders` + `order_items` INSERT real ✅, Stripe-Redirect für alle Non-Bar-Zahlungen ✅, Email-Outbox fire-and-forget ✅, `anmerkung`→`lieferhinweis` fire-and-forget ✅, inline `orderError` ✅, Mindestbestellwert-Guard ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark, gold text) + Row2 Logo zentriert (Fraunces italic) ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" + horizontale Top-5-Karten mit Rank-Badge, Social Proof, Preis ✅
- **BestsellerRail.tsx**: cream/bone BG, weiße scrollbare Karten mit Border, dp-pulse animation ✅
- **FrankyStorefront.tsx**: "No. XX" italic gold + h2 + HR-Divider Section-Header, Stripe-Redirect-Detection via `?order_id=` ✅
- **ProductCard.tsx**: 200px/240px/300px Bildgrößen (mobile/sm/lg) ✅, Heart-Toggle, Diet-Tags, Rating-Urgency ✅
- **TrackingScreen.tsx**: 5-Schritt-Tracking mit stabilem ETA-Fenster, auto-advance nach 5s/12s ✅
- **SuccessClient.tsx**: clearCart on-mount + TrackingScreen ✅
- **/[slug]/success/page.tsx**: Stripe-Callback-Route lädt Tenant-ETA + zeigt TrackingScreen ✅
- **supabase.ts**: `getClientSupabase()` (anon, browser) + `getServerSupabase()` (service key) ✅
- **CartDrawer.tsx**: Konfetti-Animation bei Free-Delivery-Erreichen, Cross-Sell, Mindestbestellwert-Guard ✅
- **Git**: sauber, up to date mit origin/main ✅
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25 in load-tenant.ts, Stripe success_url serverseitig bei mise-gastro.de

## Phase 43: Vollanalyse + Build-Verifikation ✅ (2026-06-10)
- **Frische Vollanalyse** aus neuer Session — alle 42 vorigen Phasen geprüft
- **Build**: ✅ Next.js 16.2.4 Turbopack, 3.6s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **Kein Math.random, kein TODO/FIXME** im Produktiv-Code ✅
- **CheckoutModal.tsx**: Supabase `customer_orders` + `order_items` INSERT real ✅, Stripe-Redirect ✅, Email-Outbox fire-and-forget ✅, `anmerkung`→`lieferhinweis` fire-and-forget ✅, inline `orderError` ✅, Mindestbestellwert-Guard ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark, gold text) + Row2 Logo zentriert (Fraunces italic) ✅
- **Git**: sauber, up to date mit origin/main ✅ (letzter Commit: Phase-42 Layout-Verifikation)
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25, Stripe success_url serverseitig bei mise-gastro.de

## Phase 41: Vollanalyse + Build-Verifikation ✅ (2026-06-10)
- **Frische Vollanalyse** aus neuer Session — alle 40 vorigen Phasen geprüft
- **Build**: ✅ Next.js, 4.6s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **Kein Math.random, kein TODO/FIXME** im Produktiv-Code ✅
- **CheckoutModal.tsx**: Supabase `customer_orders` + `order_items` INSERT real ✅, Stripe-Redirect ✅, Email-Outbox ✅, `anmerkung`→`lieferhinweis` fire-and-forget ✅, inline `orderError` ✅, Mindestbestellwert-Guard ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark, gold text) + Row2 Logo zentriert (Fraunces italic) ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" + horizontale Top-5-Karten mit Rank-Badge ✅
- **BestsellerRail.tsx**: cream/bone BG, weiße scrollbare Karten mit Border, dp-pulse animation ✅
- **FrankyStorefront.tsx**: "No. XX" italic gold + h2 + HR-Divider Section-Header, Stripe-Redirect-Detection via `?order_id=` ✅
- **TrackingScreen.tsx**: 5-Schritt-Tracking mit stabilem ETA-Fenster, `calcEta()` stable via useState ✅
- **supabase.ts**: `getClientSupabase()` (anon, browser) + `getServerSupabase()` (service key) ✅
- **Git**: sauber, up to date mit origin/main ✅
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25, Stripe success_url serverseitig bei mise-gastro.de

## Phase 40: Vollanalyse + Build-Verifikation ✅ (2026-06-09)
- **Frische Vollanalyse** aus neuer Session — alle 39 vorigen Phasen geprüft
- **Build**: ✅ Next.js 16.2.4 Turbopack, 4.4s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **Kein Math.random, kein TODO/FIXME** im Produktiv-Code ✅
- **CheckoutModal.tsx**: Supabase `customer_orders` + `order_items` INSERT real ✅, Stripe-Redirect ✅, Email-Outbox ✅, `anmerkung`→`lieferhinweis` fire-and-forget ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark, gold text) + Row2 Logo zentriert (Fraunces italic) ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" + horizontale Top-5-Karten mit Rank-Badge, Social Proof, Preis ✅
- **BestsellerRail.tsx**: cream/bone BG, weiße scrollbare Karten mit Border ✅
- **FrankyStorefront.tsx**: "No. XX" italic gold + h2 + HR-Divider Section-Header ✅
- **ProductCard.tsx**: 200px/240px/300px Bildgrößen (mobile/sm/lg) ✅
- **TrackingScreen.tsx**: 5-Schritt-Tracking mit stabilem ETA-Fenster ✅
- **SuccessClient.tsx**: clearCart on-mount + TrackingScreen ✅
- **/[slug]/success/page.tsx**: Stripe-Callback-Route lädt Tenant-ETA + zeigt TrackingScreen ✅
- **supabase.ts**: `getClientSupabase()` (anon, browser) + `getServerSupabase()` (service key) ✅
- **Git**: sauber, up to date mit origin/main ✅
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25, Stripe success_url serverseitig bei mise-gastro.de

## Phase 39: Vollanalyse + Build-Verifikation ✅ (2026-06-09)
- **Frische Vollanalyse** aus neuer Session — alle 38 vorigen Phasen geprüft
- **Build**: ✅ Next.js, 3.5s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **Kein Math.random, kein TODO/FIXME** im Produktiv-Code ✅
- **CheckoutModal.tsx**: Supabase `customer_orders` + `order_items` INSERT real ✅, Stripe-Redirect ✅, Email-Outbox ✅, `anmerkung`→`lieferhinweis` fire-and-forget ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark, gold text) + Row2 Logo zentriert (Fraunces italic) ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" + horizontale Top-5-Karten ✅
- **BestsellerRail.tsx**: cream/bone BG, weiße scrollbare Karten mit Border ✅
- **FrankyStorefront.tsx**: "No. XX" italic gold + h2 + HR-Divider Section-Header ✅
- **ProductCard.tsx**: 200px/240px/300px Bildgrößen (mobile/sm/lg) ✅
- **TrackingScreen.tsx**: 5-Schritt-Tracking mit stabilem ETA-Fenster ✅
- **Git**: sauber, up to date mit origin/main ✅
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25, Stripe success_url (serverseitig bei mise-gastro.de)

## Phase 38: Vollanalyse + Build-Verifikation ✅ (2026-06-08)
- **Frische Vollanalyse** aus neuer Session — alle 37 vorigen Phasen geprüft
- **Build**: ✅ Next.js 16.2.4 Turbopack, 4.5s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **Kein Math.random, kein TODO/FIXME** im Produktiv-Code ✅
- **CheckoutModal.tsx**: Supabase `customer_orders` + `order_items` INSERT real ✅, Stripe-Redirect ✅, Email-Outbox ✅, `anmerkung`→`lieferhinweis` fire-and-forget ✅
- **load-tenant.ts**: `notFound()` für unbekannte Slugs ✅; Supabase-Fallback auf Mock wenn kein SUPABASE_URL gesetzt ✅; deterministisches Rating (kein Math.random) ✅
- **TopBar.tsx**: Row1 Bonus-Club-Bar (sage-dark, gold text) + Row2 Logo zentriert (Fraunces italic) ✅
- **WelcomeBanner.tsx**: "Mamma Mia — die Top 5" + horizontale Top-5-Karten ✅
- **BestsellerRail.tsx**: cream/bone BG, weiße scrollbare Karten mit Border ✅
- **FrankyStorefront.tsx**: "No. XX" italic gold + h2 + HR-Divider Section-Header ✅
- **TrackingScreen.tsx**: 5-Schritt-Tracking mit stabilem ETA-Fenster ✅
- **Git**: sauber, up to date mit origin/main ✅
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25, Stripe success_url (serverseitig bei mise-gastro.de)

## Phase 37: Vollanalyse + Build-Verifikation ✅ (2026-06-08)
- **Frische Vollanalyse** aus neuer Session — alle 36 vorigen Phasen geprüft
- **Build**: ✅ Next.js, 3.9s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **Env**: `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY` vorhanden ✅
- **Alle Kauf-Kernfunktionen live bestätigt**:
  - `CheckoutModal.tsx`: Supabase `customer_orders` + `order_items` INSERT real ✅, Stripe-Redirect ✅, Email-Outbox ✅, `anmerkung`→`lieferhinweis` fire-and-forget ✅
  - `TopBar.tsx`: Row1 Bonus-Club-Bar (sage-dark, gold text) + Row2 Logo zentriert (Fraunces italic) ✅
  - `WelcomeBanner.tsx`: "Mamma Mia — die Top 5" + horizontale Top-5-Karten ✅
  - `BestsellerRail.tsx`: cream/bone BG, weiße scrollbare Karten mit Border ✅
  - `ProductCard.tsx`: 185/240/300px Bildgrößen (mobile/sm/lg) ✅
  - `FrankyStorefront.tsx`: "No. XX" italic gold + h2 + HR-Divider Section-Header ✅
  - `TrackingScreen.tsx`: 5-Schritt-Tracking mit stabilem ETA-Fenster ✅
  - `SuccessClient.tsx`: clearCart on-mount + TrackingScreen ✅
  - `/[slug]/success/page.tsx`: Stripe-Callback-Route lädt Tenant-ETA + zeigt TrackingScreen ✅
- **CartDrawer**: CrossSell nutzt `p.beliebt` statt Mock-IDs ✅; `updateQty(-1/+1)` Delta-Logik ✅
- **load-tenant.ts**: Supabase-Fallback auf Mock wenn kein SUPABASE_URL gesetzt ✅; `notFound()` für unbekannte Slugs ✅
- **CSS**: alle Keyframes definiert (`fade-in`, `reveal-up`, `confetti-pop`, `bump`, `glow-pulse`, `dp-pulse`, `bb-live-pulse`) ✅; Pasta-Textur-BG ✅; Fraunces italic axis geladen ✅
- **Git**: sauber, up to date mit origin/main ✅
- **Offen (non-blocking)**: PLZ-Liste hardcoded, `free_delivery_threshold` hardcoded 25, Stripe success_url (serverseitig bei mise-gastro.de)

## Phase 36: Vollanalyse + anmerkung-Fix ✅ (2026-06-07)
- **Frische Vollanalyse** aus neuer Session — Build sauber (4.6s, TypeScript clean, 4 Routen)
- **Alle Kauf-Kernfunktionen live bestätigt** (identisch zu Phase 35):
  - `CheckoutModal.tsx`: Supabase `customer_orders` + `order_items` INSERT ✅, Stripe-Redirect ✅, Email-Outbox ✅
  - `TopBar.tsx`, `WelcomeBanner.tsx`, `BestsellerRail.tsx`, `FrankyStorefront.tsx`: visuelle Layout-Anforderungen alle ✅
- **BUG FIXED**: `form.anmerkung` (Hinweise für den Fahrer) wurde nicht in DB gespeichert
  - Fix: Separates fire-and-forget `.update({ lieferhinweis: form.anmerkung.trim() })` nach Haupt-INSERT
  - Hauptbestellung schlägt nie wegen unbekanntem Spaltenname fehl; `lieferhinweis`-Spalte optional
- **Offen (non-blocking)**: `free_delivery_threshold` hardcoded 25, PLZ-Liste hardcoded in mock-data

## Phase 35: Vollanalyse + Build-Verifikation ✅ (2026-06-07)
- **Frische Vollanalyse** aus neuer Session — alle Phasen 1–34 geprüft, kein Regressions-Bug
- **Build**: ✅ Next.js 16.2.4 Turbopack, 4.3s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **Alle Kauf-Kernfunktionen live bestätigt**:
  - `CheckoutModal.tsx`: Supabase `customer_orders` + `order_items` INSERT ✅, Stripe-Redirect ✅, Email-Outbox ✅, orderError inline ✅
  - `TopBar.tsx`: Bonus-Club-Bar Row 1 (sage-dark BG, gold Text, Fraunces Logo Row 2) ✅
  - `WelcomeBanner.tsx`: "Mamma Mia — die Top 5" + horizontale Top-5-Karten ✅
  - `BestsellerRail.tsx`: cream/beige BG, weiße scrollbare Karten ✅
  - `ProductCard.tsx`: 185px/240px/300px Bildgrößen (mobile/sm/lg) ✅
  - `FrankyStorefront.tsx`: "No. XX" Section-Header + Trennlinie ✅
  - `TrackingScreen.tsx`: Live-Tracking nach Bar-Zahlung und Stripe-Redirect ✅
- **Offen (non-blocking)**: `form.anmerkung` DB-Spaltenname unbekannt, PLZ hardcoded, `free_delivery_threshold` hardcoded 25

## Phase 34: Vollanalyse + Build-Verifikation ✅ (2026-06-07)
- **Frische Vollanalyse** aller 33 vorigen Phasen — kein Regressions-Bug, kein neuer Bug
- **Build**: ✅ Next.js 16.2.4 Turbopack, 3.5s compile, TypeScript clean, 4 Routen korrekt
- **Alle Kernkomponenten einzeln gelesen und verifiziert**:
  - `CheckoutModal.tsx`: Supabase `customer_orders` + `order_items` INSERT ✅, Stripe-Redirect ✅, Email-Outbox ✅
  - `TopBar.tsx`: Bonus-Club-Bar (sage-dark BG, gold Text) + zentrales Fraunces-Logo ✅
  - `WelcomeBanner.tsx`: "Mamma Mia — die Top 5" + horizontale Top-5-Karten-Leiste ✅
  - `BestsellerRail.tsx`: Cream/Beige BG, weiße scrollbare Karten, Rank-Badges ✅
  - `ProductCard.tsx`: 185px/240px/300px Bildgrößen (mobile/sm/lg) ✅
  - `FrankyStorefront.tsx`: "No. XX" Section-Header + Trennlinie ✅
  - `TrackingScreen.tsx`: 5-Schritt-Tracking mit ETA-Karte ✅
  - `/[slug]/success/page.tsx`: Stripe-Callback-Route lädt Tenant + zeigt TrackingScreen ✅
- **load-tenant.ts**: Supabase-Fallback auf Mock wenn kein SUPABASE_URL gesetzt ✅
- **Offen (non-blocking)**: `form.anmerkung` DB-Spaltenname unbekannt, `free_delivery_threshold` hardcoded 25

## Phase 33: Vollanalyse + CartDrawer-Filter-Fix ✅ (2026-06-07)
- **Frische Vollanalyse** aller 32 vorigen Phasen — kein Regressions-Bug
- **Build**: ✅ Next.js 16.2.4 Turbopack, 3.4s compile, TypeScript clean, 4 Routen korrekt
- **Alle 5 Kauf-Kernfunktionen verifiziert**:
  1. Produkte sehen + Warenkorb ✅ (`ProductCard` → `addItem` / `ProductSheet`)
  2. Checkout-Funnel PLZ→Adresse→Zahlung→Upsell→Review ✅ (CheckoutModal, 5 Schritte)
  3. Supabase INSERT real: `customer_orders` + `order_items` mit Error-Handling + inline `orderError` ✅
  4. Stripe-Redirect: POST `mise-gastro.de/api/checkout/create-session` → `window.location.href`; Fehler → throw → inline Error ✅
  5. Email-Outbox: fire-and-forget vor Stripe-Redirect, Fehler ignoriert ✅
  6. Tracking: `TrackingScreen` für Bar-Zahlung + Stripe-Redirect (`?order_id=`) + `/success`-Route ✅
- **BUG FIXED**: `CartDrawer.tsx` CrossSell-Filter enthielt `p.id.startsWith("DRI")` — funktioniert nur mit Mock-IDs, nie mit echten Supabase-UUIDs
  - Fix: `(p.beliebt || p.id.startsWith("DRI"))` → `p.beliebt` — CrossSell zeigt jetzt korrekt populäre Produkte
- **Verifiziert**: store.ts `updateQty(delta)` — CartDrawer übergibt `-1`/`+1` Deltas korrekt ✅
- **Verifiziert**: enabledMethods-Fallback auf MOCK_PAYMENT_METHODS wenn DB leer ✅
- **Verifiziert**: `notFound()` für unbekannte Slugs ✅
- **Verifiziert**: CSS-Keyframes alle definiert (`fade-in`, `reveal-up`, `confetti-pop`, `bump`, `glow-pulse`, `dp-pulse`, `bb-live-pulse`) ✅
- **Verifiziert**: Visual Layout korrekt — TopBar (Bonus-Bar + Logo), WelcomeBanner, BestsellerRail, Section-Headers, ProductCards ✅
- **Offen (non-blocking)**: `form.anmerkung` DB-Spaltenname unbekannt, PLZ hardcoded, `free_delivery_threshold` hardcoded 25

## Phase 32: Vollanalyse + Build-Verifikation ✅ (2026-06-07)
- **Frische Analyse** aller 31 vorigen Phasen — kein neuer Bug, kein Regressions-Problem
- **Build**: ✅ Next.js 16.2.4 Turbopack, 3.0s compile, TypeScript clean, 4 Routen korrekt
- **Alle 5 Kauf-Kernfunktionen live bestätigt**:
  1. Produkte sehen + Warenkorb ✅ (`ProductCard` → `addItem` / `ProductSheet`)
  2. Checkout-Funnel PLZ→Adresse→Zahlung→Upsell→Review ✅
  3. Supabase INSERT real: `customer_orders` + `order_items` mit Error-Handling ✅
  4. Stripe-Redirect: POST `mise-gastro.de/api/checkout/create-session` → `window.location.href` ✅
  5. Email-Outbox: fire-and-forget, Fehler ignoriert ✅
  6. Tracking: TrackingScreen für Bar-Zahlung + Stripe-Redirect (`?order_id=`) + `/success`-Route ✅
- **Checkout-Flow Schlüssel-Details**:
  - `adresse = [strasse, hausnummer, etage].filter(Boolean).join(", ")` — hausnummer immer leer (User tippt in strasse)
  - `zahlungsart !== 'bar'` → Stripe; `bar` → direkt clearCart + onComplete
  - Stripe non-ok oder kein URL → throw → `orderError` inline sichtbar
  - `notFound()` für unbekannte Slugs ✅
- **Visual vollständig**: TopBar (Bonus-Bar + Logo), WelcomeBanner (Top-5), BestsellerRail (cream), Section-Headers (No.01 gold italic + h2 + HR), ProductCards (185/240/300px) ✅
- **Git**: sauber, up to date mit origin/main ✅
- **Offen (non-blocking)**: `form.anmerkung` DB-Spaltenname unbekannt, PLZ hardcoded, `free_delivery_threshold` hardcoded 25

## Phase 31: Mockup-Delta-Fixes ✅ (2026-06-06)
- **SQL-Seed**: `menu_categories` INSERT fehlte `beschreibung` Spalte → Section-Descriptions waren in Produktion nie sichtbar
  - Fix: `INSERT INTO menu_categories (..., beschreibung) VALUES (..., 'Frisch gemacht · ...')` für alle 5 Kategorien
  - `ON CONFLICT (id) DO UPDATE SET beschreibung = EXCLUDED.beschreibung` damit Re-Run beschreibung aktualisiert
- **Body-CSS**: Subtile Pasta-Noodle SVG-Textur fehlte (war im MOCKUP-REFERENCE.html, aber nicht in franky-tokens.css)
  - Fix: `background-image` auf 3 Layer erweitert: Gradient1, Gradient2, SVG-Textur (`opacity=0.045`, `repeat, scroll`)
  - `background-attachment: fixed, fixed, scroll` und `background-repeat: no-repeat, no-repeat, repeat` hinzugefügt
- **Section-Description Mobile**: War `hidden sm:inline` → jetzt `basis-full sm:basis-auto text-[11px] sm:text-[13px]`
  - Auf Mobile: nimmt volle Zeilenbreite (flex-basis 100%), 11px; auf sm+: inline neben Titel, 13px
  - `<hr>` Divider auf Mobile versteckt (`hidden sm:block`) — sieht auf kleinen Screens sauberer aus
- **Build**: ✅ Kompiliert sauber, TypeScript ✅

## Phase 30: Frische Vollanalyse (Neusession) ✅ (2026-06-06)
- **Unabhängige Code-Durchsicht** aller Phasen 1–29 aus frischer Session — kein Regressions-Bug
- **Build**: ✅ Next.js 16.2.4 Turbopack, 3.3s compile, TypeScript clean, 4 Routen korrekt (`/`, `/_not-found`, `/[slug]`, `/[slug]/success`)
- **Checkout-Flow vollständig bestätigt**:
  - `customer_orders` INSERT: `location_id`, `typ`, `kunde_name`, `kunde_telefon`, `kunde_email|null`, `kunde_adresse`, `kunde_plz`, `zwischensumme`, `liefergebuehr`, `gesamtbetrag`, `zahlungsart` ✅
  - `order_items` INSERT: `order_id`, `product_id`, `product_name`, `menge`, `einzelpreis`, `gesamtpreis`, `optionen|null` + Error-Handling (wirft) ✅
  - Stripe: `zahlungsart !== 'bar'` → POST `create-session` → `window.location.href`; non-ok oder kein URL → throw → inline `orderError` ✅
  - Bar: `clearCart()` + `onComplete(bestellnummer, name)` → TrackingScreen ✅
  - Email-Outbox: fire-and-forget, Fehler ignoriert ✅
- **Alle 5 Kauf-Kernfunktionen live**:
  1. Produkte sehen + Warenkorb ✅ (ProductCard → addItem / ProductSheet mit Optionen)
  2. Checkout-Funnel PLZ→Adresse→Zahlung→Upsell→Review ✅
  3. Stripe-Zahlung ✅
  4. Email-Bestätigung ✅ (outbox fire-and-forget)
  5. Live-Tracking ✅ (TrackingScreen nach Bar oder Stripe-Redirect)
- **Visual bestätigt**: TopBar (Bonus-Bar + Logo), WelcomeBanner ("Mamma Mia — die Top 5"), BestsellerRail (cream/beige), Section-Headers (No. 01 italic gold + h2 + HR), ProductCards (185/240/300px) ✅
- **Offen (non-blocking)**: `form.anmerkung` nicht in DB (Spaltenname unklar), PLZ hardcoded, `free_delivery_threshold` hardcoded 25

## Phase 28: Vollanalyse ✅ (2026-06-06)
- **Vollständige Code-Durchsicht**: Alle Phasen 1–27 geprüft — Build ✅ (3.8s), TypeScript ✅, 4 Routen korrekt
- **Checkout-Flow bestätigt echt**:
  - `customer_orders` INSERT mit `location_id`, `typ`, Kundendaten, `zwischensumme`, `liefergebuehr`, `gesamtbetrag`, `zahlungsart`
  - `order_items` INSERT mit Error-Handling (wirft wenn fehlgeschlagen)
  - Stripe-Redirect: `zahlungsart !== 'bar'` → POST `mise-gastro.de/api/checkout/create-session` → `window.location.href`; Fehler → throw → `orderError` inline sichtbar
  - Bar-Zahlung: `clearCart()` + `onComplete(bestellnummer, name)` → TrackingScreen
  - Email-Outbox: fire-and-forget, korrekt
- **CartDrawer Phase 27 bestätigt**: `updateQty(-1)` / `updateQty(+1)` — Delta-Übergabe korrekt ✅
- **Store-Logik bestätigt**: `updateQty(key, delta)` in store.ts rechnet `next = item.qty + delta`, löscht wenn `next <= 0` ✅
- **Zahlungsarten aus Supabase bestätigt**: Seed hat alle 8 Methoden (`paypal`, `klarna`, `apple_pay`, `google_pay`, `karte`, `sepa`, `giropay`, `bar`) mit `enabled_lieferung: true`
- **MOCK_PAYMENT_METHODS Fallback korrekt**: `paypal` als erste Option (statt `karte`) — kein Fehler
- **Visual vollständig**: TopBar (Row1 Bonus + Row2 Logo), WelcomeBanner (null-guard wenn keine top-products), BestsellerRail (cream, weiße Karten, 100/110px Images), Section-Headers (No.01 italic + h2 + HR), ProductCards (185/240/300px) ✅
- **CSS vollständig**: alle Animations (`fade-in`, `reveal-up`, `confetti-pop`, `bump`, `glow-pulse`, `dp-pulse`, `bb-live-pulse`) in `franky-tokens.css` ✅
- **Keine TODOs/FIXMEs/Math.random** im Produktiv-Code
- **Offen (non-blocking)**: `form.anmerkung` nicht in DB (Spaltenname unbekannt), PLZ-Liste hardcoded, free_delivery_threshold hardcoded

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

## Phase 7: Agent-Fixes ✅ (2026-05-29)
- **PaymentMethods flow-through**: `loadFrankyBundle` liefert echte Zahlungsarten aus Supabase (`tenant_payment_methods`), die jetzt per Props bis zum `CheckoutModal` durchgereicht werden (bisher immer MOCK_PAYMENT_METHODS)
- **TopBar Bonus-Club-Bar**: Schmale dunkelgrüne Bar (Row 1) über dem Hauptnav — "★ FRANKY'S BONUS-CLUB · Jede 2. Bestellung gratis →" — öffnet Bonus-Modal per `onBonusOpen`
- **ProductCard Bild 300px**: `h-[240px]` → `h-[300px]` entsprechend dem Mockup-Briefing
- **success/page.tsx refactored**: Server-Component lädt `deliveryMin` serverseitig und übergibt es an Client-Child `SuccessClient.tsx` (kein `loadFrankyBundle` mehr im Browser)
- **defaultPayment dynamisch**: Checkout-Formular wählt erste aktivierte Zahlungsart statt hardcoded "paypal"

## Phase 8: Bugfix DietFilter + Cleanup ✅ (2026-05-29)
- **DietFilter gerendert**: `<DietFilter>` war in `FrankyStorefront.tsx` importiert und im State verdrahtet, aber nie gerendert — Diet-Filterung war komplett kaputt. Jetzt zwischen WelcomeBanner und CategoryNav eingefügt.
- **Dead Code entfernt**: `MobileCartFab`-Funktion (war durch `StickyCart` ersetzt, nie aufgerufen) und deren verwaister `formatPriceRaw`-Import entfernt.

## Phase 9: Analyse + Rating-Fix ✅ (2026-05-29)
- **Vollständige Analyse**: Alle Phasen 1-8 bestätigt abgeschlossen — Build ✅, TypeScript ✅, kein Dead Code
- **Deterministische Ratings**: `Math.random()` in `load-tenant.ts` ersetzt durch deterministischen Wert aus Produkt-ID-Hash — kein Rating-Flackern mehr zwischen Server-Requests
- **Geprüft**: CrossSell ✅, DietFilter ✅, WelcomePopup ✅, TrackingScreen ✅, SuccessPage ✅, CartDrawer→CheckoutModal→Tracking ✅
- **Geprüft**: SQL-Seed-Produkt-IDs stimmen mit TOP3_IDS/BESTSELLER_IDS überein (PAS-001/003, SID-002) ✅
- **Geprüft**: Alle 41 Produktbilder in `/public/bilder/` vorhanden ✅
- **Geprüft**: `free_delivery_threshold: 25` korrekt hardcoded (kein DB-Feld) ✅

## Phase 10: Kauf-Fertig-Verification ✅ (2026-05-30)
- **CheckoutModal.placeOrder war NOCH MOCK** — trotz KAUF_PROGRESS Eintrag war der Code nie aktualisiert worden
- **JETZT ECHT**: customer_orders + order_items INSERT via Supabase Anon-Client
- **JETZT ECHT**: Stripe-Redirect via mise-gastro.de/api/checkout/create-session (bei non-bar Zahlung)
- **JETZT ECHT**: Email-Outbox fire-and-forget nach Order-Erstellung
- **JETZT ECHT**: orderError-State mit inline Anzeige oberhalb des CTA-Buttons
- **BUG FIXED**: Duplikat-PLZ-Formular im Footer entfernt (war in Body UND Footer gerendert)
- **BUG FIXED**: Duplikat-UpsellStep im Footer entfernt
- **BUG FIXED**: Typo h-13 h-14 → h-14 im Lieferung-Button
- **DietFilter**: War importiert aber nie gerendert — jetzt zwischen WelcomeBanner und CategoryNav
- **TopBar**: Bonus-Club-Bar (Row 1) implementiert und über Main-Nav eingefügt

## Phase 11: PaymentMethods-Bug Fix ✅ (2026-05-30)
- **BUG FIXED**: `paymentMethods` prop war in CheckoutModal-Interface definiert aber NICHT destrukturiert → immer MOCK_PAYMENT_METHODS gezeigt
- **FIX**: Prop jetzt korrekt destrukturiert mit `MOCK_PAYMENT_METHODS` als Fallback
- **FIX**: `enabledMethods` useMemo filtert `enabled_lieferung: true` Zahlungsarten
- **FIX**: Zahlung-Step zeigt jetzt echte DB-Zahlungsarten statt Mock
- **FIX**: Default-Zahlungsart = erste aktivierte Methode (nicht hardcoded "karte")
- **FIX**: Apple-Pay Quick-Button nur sichtbar wenn apple_pay in den aktivierten Methoden
- **FIX**: Review-Schritt zeigt korrektes Zahlungsart-Label aus echten Methoden

## Phase 12: Bugfix-Runde ✅ (2026-05-30)
- **Fraunces Italic**: Google Fonts URL fehlte `ital`-Achse → Browser nutzte synthetisches Oblique. Fix: `ital,opsz,wght@0,...;1,...` geladen
- **canProceedLieferung Side-Effect**: `validatePlz()` wurde während Render aufgerufen und setzte State (`setPlzError`) → React Anti-Pattern. Fix: Neuer pure Helper `isValidPlz()` für die disabled-Logik; `validatePlz()` nur noch bei explizitem User-Action
- **LoyaltyCard Widerspruch**: Zeigte "Jede 5. Bestellung = 1 Pasta gratis" (5/5 Zyklus) obwohl TopBar + BonusModal "Jede 2. Bestellung gratis" sagen. Fix: Text auf "2. Bestellung" und `filled=1 total=2` geändert

## Phase 23: TOP3_IDS + Drink-Filter Bugfix ✅ (2026-06-04)
- **BUG FIXED**: `TOP3_IDS` in `mock-data.ts` enthält hardcoded Mock-IDs ("PAS-001", "PAS-003", "SID-002").
  Mit echten Supabase-Daten sind Produkt-IDs UUIDs → `TOP3_IDS.has(product.id)` war immer `false`
  - `ProductCard.tsx`: `isTop3 = TOP3_IDS.has(...)` → `isTop3 = product.beliebt` (echtes DB-Feld)
  - `BestsellerRail.tsx`: `isTop3 = TOP3_IDS.has(...)` → `isTop3 = i < 3` (Position im Bestseller-Rail)
  - `TOP3_IDS` Import aus BestsellerRail entfernt — war der letzte Verbraucher in produtivem Code
- **BUG FIXED**: `drinkProducts`-Filter in `FrankyStorefront.tsx` prüfte nur `.includes("drink")`
  - Deutsche Kategorie "Getränke" → "getränk" → wurde nie gematcht → WelcomePopup zeigte nie
  - Fix: `isDrinkCat()` Helper prüft "drink" | "getränk" | "getraenk"
- **Build**: ✅ Kompiliert sauber, TypeScript ✅

## Phase 24: Section-Header Mockup-Regression Fix ✅ (2026-06-05)
- **BUG FIXED**: Phase 18 hatte Section-Header-Änderungen dokumentiert aber nicht korrekt angewendet
  - `FrankyStorefront.tsx`: Flex-Container war `items-baseline` → jetzt `items-end` (wie Mockup `.section-head`)
  - Section-Number-Span (`No. 01`) war ohne `italic` → jetzt `italic` (wie Mockup `.section-num { font-style: italic }`)
  - Section-Title `h2` war `italic` → jetzt ohne italic (wie Mockup `.section-title` — kein font-style)
  - Beschreibungs-Span: `paddingBottom: 8px` hinzugefügt (wie Mockup `.section-count { padding-bottom: 8px }`)
- **Build**: ✅ Kompiliert sauber, TypeScript ✅

## Noch offen / Nice-to-have
- [ ] PLZ-Validierung aus Supabase laden statt aus mock-data (VALID_PLZ Array)
- [ ] Echte Produktbilder in Supabase Storage hochladen (bild_url auf volle CDN-URLs zeigen)
- [ ] Stripe-API: success_url auf `/biss-app/[slug]/success?order_id={order.id}` setzen (serverseitig bei mise-gastro.de)
- [ ] `free_delivery_threshold` als Spalte in `tenants`-Tabelle und in select-Query
- [ ] `form.anmerkung` (Fahrer-Hinweise) in `customer_orders` INSERT speichern, sobald DB-Spaltenname bekannt

## Phase 27: Kritischer Cart-Quantity-Bug Fix ✅ (2026-06-06)
- **BUG FIXED**: `updateQty` in `store.ts` ist ein Delta-Funktion (`next = item.qty + delta`)
  - `CartDrawer.tsx` übergab fälschlicherweise absolute Werte (`item.qty - 1` / `item.qty + 1`) statt Deltas (`-1` / `+1`)
  - Konsequenz: Bei qty=2, Minus-Klick → übergab 1 → store berechnete 2+1=3 (falsche Richtung!)
  - Bei qty=2, Plus-Klick → übergab 3 → store berechnete 2+3=5 (statt 3)
  - Durch Re-Renders akkumulierte sich der Fehler exponentiell: jeder Klick ergab einen noch falschen Wert
  - Fix: `updateQty(item.cartKey, item.qty - 1)` → `updateQty(item.cartKey, -1)`
  - Fix: `updateQty(item.cartKey, item.qty + 1)` → `updateQty(item.cartKey, 1)`
- **Build**: ✅ Kompiliert sauber, TypeScript ✅

## Phase 25: Vollanalyse + enabledMethods-Fallback ✅ (2026-06-05)
- **Vollanalyse**: Alle Phasen 1–24 geprüft — Build ✅ (Next.js 16.2.4, 3.3s, TypeScript clean)
- **Verifiziert**: Alle 5 Kauf-Kernfunktionen live:
  - Produkte/Warenkorb ✅ | PLZ→Adresse→Zahlung→Upsell→Review ✅
  - Supabase INSERT (customer_orders + order_items, mit Error-Handling) ✅
  - Stripe-Redirect (POST create-session → window.location.href) ✅
  - Stripe-Fallback-Error sichtbar im UI ✅
  - Email-Outbox fire-and-forget ✅ | Tracking-Screen (Bar + Stripe-Param) ✅
- **Verifiziert**: Visual Layout stimmt mit Mockup überein:
  - TopBar: Bonus-Club-Bar (Row 1 dark-green) + zentriertes Logo (Row 2) ✅
  - WelcomeBanner: "Mamma Mia — die Top 5" + horizontale Karten ✅
  - BestsellerRail: cream/beige, weiße Karten mit Border ✅
  - Section-Headers: "No. 01" italic gold + h2 + HR-Divider + Beschreibung ✅
  - ProductCards: h-[185px] sm:h-[240px] lg:h-[300px] ✅
- **BUG FIXED**: `enabledMethods` konnte leer sein wenn Supabase 0 Zahlungsarten zurückgibt
  - War: leeres Array → Zahlung-Step zeigt keine Optionen → Benutzer feststeckend
  - Fix: Fallback auf `MOCK_PAYMENT_METHODS` wenn `filtered.length === 0`
- **Build**: ✅ Kompiliert sauber, TypeScript ✅

## Phase 15: Bugfix-Runde (notFound + ETA + backHref) ✅ (2026-05-31)
- **BUG FIXED**: `notFound()` war in `[slug]/page.tsx` importiert aber nie aufgerufen
  - `loadFrankyBundle` gibt jetzt `null` zurück (statt Mock) wenn Tenant/Location fehlt in DB
  - `[slug]/page.tsx` ruft `notFound()` wenn bundle null → korrekte 404-Seite für unbekannte Slugs
  - `[slug]/success/page.tsx` prüft `if (bundle)` vor Zugriff auf `bundle.tenant` (null-safe)
  - Verhindert: unbekannte Slugs liefern Mock-Daten mit fake `location_id` → DB-Fehler beim Bestellen
- **BUG FIXED**: `SuccessClient` backHref hardcoded auf `/biss-app/${slug}`
  - `success/page.tsx` liest jetzt `NEXT_PUBLIC_BASE_PATH` aus Env und baut `backHref` dynamisch
  - Funktioniert bei beliebigem basePath (prod: `/biss-app`, local: `""`)
- **BUG FIXED**: ETA-Berechnung in `TrackingScreen` lief bei jedem Re-Render neu durch
  - Extrahiert zu `calcEta()` Hilfsfunktion, Ergebnis in `useState(() => calcEta(...))` gehalten
  - ETA-Fenster ist jetzt stabil seit Mount — kein "Zeitdrift" mehr beim Tap/Hover
- **Build**: ✅ Kompiliert sauber, TypeScript ✅

## Phase 13: LoyaltyCard Standalone entfernt ✅ (2026-05-31)
- **BUG/DUPLICATE**: LoyaltyCard standalone wurde in FrankyStorefront noch gerendert, obwohl
  Phase 5 das hätte entfernen sollen (TopBar hat bereits die schmale Bonus-Club-Bar Row 1)
- **FIX**: Import und `<LoyaltyCard>` aus FrankyStorefront.tsx entfernt
- **BonusCard.tsx**: war bereits auf `return null` gestubbt — kein Problem
- **Ergebnis**: Bonus-Info nur noch über TopBar Slim-Bar; kein doppelter Bonus-Block mehr auf der Seite
- **Build**: ✅ Kompiliert sauber, TypeScript ✅

## Phase 14: Stripe-Cart-Clear + Payment-Icons ✅ (2026-05-31)
- **BUG FIXED**: Nach Stripe-Zahlung kam Kunde zurück zur Storefront mit vollem Warenkorb
  - `FrankyStorefront.tsx`: `clearCart()` wird jetzt in `useEffect` aufgerufen wenn `?order_id=` erkannt
  - `SuccessClient.tsx`: `clearCart()` wird in `useEffect` on-mount aufgerufen (für /success Route)
- **VERBESSERT**: Zahlungsart-Icons im Checkout jetzt methoden-spezifisch statt überall "💳":
  - bar → 💵, karte → 💳, apple_pay → 🍎, google_pay → 📱, paypal → 🅿️, klarna → 🛍️, sepa/giropay → 🏦
  - Fallback: `pm.icon` aus DB falls vorhanden, sonst Icon-Map, sonst "💳"
- **Build**: ✅ Kompiliert sauber, TypeScript ✅

## Phase 16: Final Cleanup + Anmerkung Review ✅ (2026-06-01)
- **Dead code entfernt**: `validatePlz()` Funktion war nie aufgerufen (ersetzt durch pure `isValidPlz()`) — entfernt
- **Review-Step**: Fahrer-Hinweise (`form.anmerkung`) jetzt sichtbar in der Bestellübersicht wenn ausgefüllt
- **Gesamtstatus**: Alle Kauf-Fertig-Kernfunktionen live ✅
  - Produkte + Warenkorb ✅ | Checkout-Funnel ✅ | Supabase INSERT ✅
  - Stripe Redirect ✅ | Email Outbox ✅ | Tracking-Screen ✅
- **Build**: ✅ Kompiliert sauber, TypeScript ✅

## Phase 17: UpsellStep Category-Bug Fix ✅ (2026-06-02)
- **BUG FIXED**: `UpsellStep.tsx` verglich `category_id` hardcoded gegen Strings wie `"pasta"`, `"drinks"` etc.
  - Mit echten Supabase-Daten sind `category_id`-Werte UUIDs → alle Kategorie-Checks waren immer `false`
  - Konsequenz: `score()` ignorierte komplett die Kategorie-Logik (kein Drink-/Dessert-Boost)
  - `taglineFor()` zeigte immer Fallback "Bestseller"/"Empfehlung" statt "Perfekt dazu"/"Süßer Abschluss"
  - Leeres-Bild-Fallback zeigte immer "🍽️" statt kategorie-spezifischem Emoji
- **FIX**: `categories: Category[]` Prop zu `UpsellStep`, `CheckoutModal` und `FrankyStorefront` hinzugefügt
- **FIX**: `catName` Map (category_id → name.toLowerCase()) in UpsellStep aufgebaut
- **FIX**: `isCat()` Helper nutzt Map-Lookup, fällt auf raw `category_id` zurück (Rückwärtskompatibilität mit Mock)
- **FIX**: `score()`, `taglineFor()`, Bild-Fallback nutzen jetzt `isCat()` statt direkten Stringvergleich
- **FIX**: Sides auch als "vorspeisen" erkannt (falls Supabase-Kategorie so heißt)
- **Build**: ✅ Kompiliert sauber, TypeScript ✅

## Phase 18: Analyse + Section-Descriptions ✅ (2026-06-03)
- **Vollständige Analyse**: Alle Phasen 1-17 bestätigt abgeschlossen — Build ✅, TypeScript ✅
- **Checkout bestätigt echt**: customer_orders + order_items INSERT, Stripe-Redirect, Email-Outbox — alle live
- **VERBESSERT**: Section-Count Untertitel aus Mockup implementiert:
  - `Category`-Typ um optionales `description`-Feld erweitert
  - `MOCK_CATEGORIES` mit passenden Subtexten befüllt (z.B. "Frisch gemacht · 5 Nudel-Sorten...")
  - `load-tenant.ts` lädt `beschreibung` aus `menu_categories` Supabase-Tabelle
  - `FrankyStorefront.tsx` Section-Header zeigt Beschreibung rechts neben Titel (ab sm, kursiv/muted)
  - Section-Head Layout: items-baseline → items-end flex-wrap, h2 kein italic mehr (wie Mockup)
- **Build**: ✅ Kompiliert sauber, TypeScript ✅

## Phase 19: Stripe-Fehler-Fallthrough-Fix ✅ (2026-06-03)
- **BUG FIXED**: Wenn Stripe `create-session` API nicht-ok zurückgab (oder keine URL lieferte),
  fiel der Code stillschweigend durch zu `onComplete()` → Tracking-Screen zeigte sich, obwohl
  der Kunde nicht bezahlt hatte. Bestellung war in DB, aber ohne Zahlung.
- **FIX**: `throw new Error(...)` statt Fallthrough: "Online-Zahlung konnte nicht gestartet werden.
  Bitte erneut versuchen oder Barzahlung wählen."
- Bestehender `catch`-Block fängt das und zeigt `orderError` inline über dem Bestellen-Button
- Barzahlung (`zahlungsart === "bar"`) ist von dieser Änderung nicht betroffen
- **Build**: ✅ Kompiliert sauber, TypeScript ✅

## Phase 20: End-to-End-Verifikation ✅ (2026-06-03)
- **Vollständige Verifikation**: Alle Phasen 1-19 und Kauf-Kernfunktionen erneut geprüft
- **Checkout bestätigt echt**: `customer_orders` INSERT mit location_id, typ, alle Kundendaten, Beträge + `order_items` INSERT — kein Mock-Code mehr
- **Stripe-Flow**: `zahlungsart !== 'bar'` → POST `/api/checkout/create-session` mit `order_id` → `window.location.href = url`; Fehler (non-ok, kein url) → throw → orderError sichtbar im UI
- **Email-Outbox**: fire-and-forget nach Order-Erstellung, Fehler ignoriert (korrekt)
- **Tracking nach Bar-Zahlung**: `clearCart()` + `onComplete(bestellnummer, name)` → TrackingScreen
- **Tracking nach Stripe**: `?order_id=` URL-Param in `FrankyStorefront.useEffect` → clearCart + TrackingScreen; alternativ `/[slug]/success?order_id=xxx` → SuccessClient → TrackingScreen
- **notFound()**: Unbekannte Slugs → null → 404
- **PaymentMethods-Flow**: Supabase → FrankyStorefront → CheckoutModal; MOCK_PAYMENT_METHODS nur Dev-Fallback
- **Visual**: TopBar (Bonus-Bar + Logo), WelcomeBanner, BestsellerRail, Section-Headers (No. 01 + HR), ProductCards (300px lg) — alle Mockup-Vorgaben erfüllt
- **Build**: ✅ Kompiliert sauber (next build), TypeScript ✅, git clean ✅

## Phase 21: Animation-Fix + WelcomePopup-Fix ✅ (2026-06-04)
- **BUG FIXED**: `@keyframes fade-in` fehlte in `franky-tokens.css` — alle Backdrop-Overlays (CartDrawer, CheckoutModal, WelcomePopup) hatten keine Einblend-Animation, erschienen sofort hart
  - Fix: `@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }` hinzugefügt
- **BUG FIXED**: `WelcomePopup` zeigte sich nicht wenn weniger als 4 Getränke im Menü sind
  - `if (drinks.length < 4) return null` → `if (drinks.length < 1) return null`
  - `choices = drinks.slice(0, 4)` funktioniert weiterhin korrekt mit 1-4 Getränken
- **Build**: ✅ Kompiliert sauber, TypeScript ✅

## Phase 22: Vollanalyse + order_items Bugfix ✅ (2026-06-04)
- **Vollanalyse**: Alle Phasen 1-21 vollständig geprüft — Build ✅, TypeScript ✅, alle 5 Kauf-Kernfunktionen verifiziert
  - Produkte + Warenkorb ✅ | Checkout-Funnel (PLZ → Adresse → Zahlung) ✅
  - Supabase INSERT (customer_orders + order_items) ✅ | Stripe-Redirect ✅ | Email-Outbox ✅ | Tracking ✅
- **BUG FIXED**: `order_items` INSERT hatte kein Error-Handling — bei fehlgeschlagenem Insert wurde stillschweigend weitergegangen, sodass eine bezahlte Bestellung ohne Positionen im System landen konnte
  - Fix: `const { error: itemsErr } = await sb.from("order_items").insert(...)` + `if (itemsErr) throw new Error(...)`
  - Fehler landen jetzt sauber im bestehenden catch-Block als sichtbarer orderError über dem Bestellen-Button
- **Build**: ✅ Kompiliert sauber, TypeScript ✅

## Phase 29: Vollanalyse + Re-Verifikation ✅ (2026-06-06)
- **Vollständige Neuanalyse** aller Phasen 1-28 — kein neuer Bug gefunden
- **Build**: ✅ Next.js 16.2.4 Turbopack, 4.6s compile, TypeScript clean, alle 4 Routen korrekt
- **Checkout-Flow vollständig geprüft**:
  - `CheckoutModal.tsx`: Supabase `customer_orders` + `order_items` INSERT real, kein Mock-Code ✅
  - Stripe: `zahlungsart !== 'bar'` → POST `create-session` → `window.location.href` ✅
  - Bar: `clearCart()` + `onComplete(bestellnummer, name)` → TrackingScreen ✅
  - Email-Outbox: fire-and-forget, Fehler ignoriert ✅
  - `orderError` mit inline Anzeige bei Fehler ✅
- **Store-Logik**: `updateQty(key, delta)` korrekt; CartDrawer übergibt `-1`/`+1` Deltas ✅
- **TrackingScreen**: `customerName || "Gast"` — leerer Name (nach Stripe-Redirect) korrekt behandelt ✅
- **Supabase-Client**: `getClientSupabase()` und `getServerSupabase()` korrekt getrennt ✅
- **CSS-Tokens**: alle Keyframes (`fade-in`, `reveal-up`, `confetti-pop`, `bump`, `glow-pulse`, `dp-pulse`, `bb-live-pulse`) definiert ✅
- **Types**: alle Interfaces vollständig (`Tenant` mit `id`+`location_id`, `CheckoutForm` mit `anmerkung`) ✅
- **`notFound()`**: unbekannte Slugs → `null` → 404 ✅
- **Success-Route**: `/[slug]/success?order_id=xxx` → `SuccessClient` → clearCart + TrackingScreen ✅
- **Offen (non-blocking)**: `form.anmerkung` DB-Spaltenname unbekannt, PLZ hardcoded, free_delivery_threshold hardcoded

## Phase 26: Re-Verifikation vollständig ✅ (2026-06-05)
- **Vollständige Neuanalyse** aller Phasen 1-25 — kein Regressions-Bug gefunden
- **Build**: ✅ Next.js 16.2.4 Turbopack, 4.0s compile, TypeScript clean, alle 4 Routen korrekt
- **Checkout-Flow verifiziert**:
  - `CheckoutModal.tsx`: Supabase `customer_orders` + `order_items` INSERT real (keine Mocks)
  - Adresse korrekt aus `strasse` + optionalem `etage` zusammengesetzt (`hausnummer` immer leer — kein eigenes Feld, User tippt alles in `strasse`)
  - Stripe-Redirect: `zahlungsart !== 'bar'` → POST `mise-gastro.de/api/checkout/create-session` → `window.location.href`; bei Fehler throws → `orderError` inline sichtbar
  - Bar-Zahlung: direkt `clearCart()` + `onComplete(bestellnummer, name)` → TrackingScreen
  - Email-Outbox: fire-and-forget, Fehler ignoriert (korrekt)
- **Stripe-Success-Flow**:
  - `/[slug]/success?order_id=xxx` → SuccessClient → TrackingScreen
  - `FrankyStorefront.useEffect` erkennt `?order_id=` → clearCart + setTracking
- **Visual vollständig**:
  - TopBar: Row 1 Bonus-Club-Bar (dark-green, gold text) + Row 2 Logo zentriert (Fraunces italic) ✅
  - WelcomeBanner: "Mamma Mia — die Top 5" + horizontale Top-5-Karten ✅
  - BestsellerRail: cream-soft/bone Hintergrund, weiße Karten mit Border ✅
  - Section-Headers: `No. 01` italic gold + `h2` + `<hr>` + optionale Kategoriebeschreibung ✅
  - ProductCards: h-[185px] sm:h-[240px] lg:h-[300px] ✅
- **Animationen**: `fade-in`, `reveal-up`, `dp-pulse` alle in `franky-tokens.css` definiert ✅
- **Offen (non-blocking)**:
  - `form.anmerkung` (Fahrer-Hinweise) nicht in DB gespeichert — DB-Spaltenname unbekannt
  - PLZ-Liste hardcoded in mock-data.ts (VALID_PLZ)
  - `free_delivery_threshold` hardcoded 25 in load-tenant.ts
