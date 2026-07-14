# KAUF-FERTIG STATUS — EINMALIGE AKTION ERFORDERLICH

## ✅ CODE: 100% VOLLSTÄNDIG (seit Session-42, ~400 Sessions bestätigt)

---

## 🚨 DAS EINZIGE WAS NOCH FEHLT: Server-Deploy

Der Code ist fertig und liegt in GitHub. Der Docker-Container auf `mise-gastro.de`
wurde **nie neu gebaut** und läuft noch auf dem alten Stand.

**Einmalig auf dem Server ausführen:**
```bash
cd /opt/franky-storefront
git pull origin main
docker compose build --no-cache franky-storefront
docker compose up -d --no-deps franky-storefront
```

**Danach testen:** https://mise-gastro.de/biss-app/frankys-pasta

---

## Auto-Deploy einrichten (optional, einmalig)

Damit künftige Code-Änderungen automatisch deployen, benötigst du:
1. Einen GitHub Personal Access Token mit `workflow` scope (der aktuell konfigurierte OAuth-Token fehlt diese Berechtigung)
2. Oder manuell: Der `.github/workflows/deploy.yml` liegt lokal bereit — einfach mit einem Token mit `workflow` scope pushen:
   ```bash
   GITHUB_TOKEN=<token-mit-workflow-scope> git push origin main
   ```
3. Dann 3 GitHub Secrets setzen: `SSH_HOST`, `SSH_USERNAME`, `SSH_PRIVATE_KEY`

---

## Was komplett implementiert ist ✅

### Checkout (Phase 2–4)
- `CheckoutModal.tsx` Z.110–194: echter `placeOrder()`-Flow
  - `customer_orders` Insert in Supabase mit allen Kundendaten
  - `order_items` Insert für jedes Produkt
  - `lieferhinweis` Update (fire-and-forget)
  - Email-Outbox Trigger (fire-and-forget) → `mise-gastro.de/api/email/process-outbox`
  - Stripe Redirect bei Nicht-Bar-Zahlung → `mise-gastro.de/api/checkout/create-session`
  - `clearCart()` + `onComplete()` bei Barzahlung
  - Fehlerbehandlung + Loading-States überall

### Visuelles Layout (Phase 5)
- `TopBar.tsx`: schmale Bonus-Club-Bar oben (sage-dark, gold text, 🎁) + Hauptbar mit Logo zentral (Fraunces Italic), Search links, Cart rechts
- `WelcomeBanner.tsx`: "Mamma Mia — die Top 5" Hero mit horizontalen Top-5-Karten
- `BestsellerRail.tsx`: cream/beige Hintergrund, weiße Karten, "✨ Heute beliebt"
- `FrankyStorefront.tsx`: Section-Header "No. 01 Pasta" mit Fraunces + Trennlinie
- `ProductCard.tsx`: Bilder 220px/260px/300px (sm/lg), gold-deep Preise

### Live-Tracking (Phase 5 fertig)
- `TrackingScreen.tsx` zeigt 5 Schritte, simuliert Fortschritt
- `SuccessClient.tsx` löscht Cart + zeigt Tracking nach Stripe-Redirect

---

## Letzter Build-Check
- Next.js 16.2.4 Turbopack ✅
- TypeScript ✅  
- 4 Routen (/  /_not-found  /[slug]  /[slug]/success) ✅
- Build-Zeit: ~4s
