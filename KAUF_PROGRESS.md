# Kauf-Fertig Progress

## ✅ CODE VOLLSTÄNDIG — Deployment-Token fehlt

**Build:** Next.js 16.2.4 Turbopack clean (`compiled 3.2s`, TypeScript ✅, 4 Routen ✅)
**Verifiziert durch:** Session-261 (2026-06-23) — vollständige Inspektion aller Komponenten

---

## Was implementiert ist

### Phase 2–4: Echter Checkout
- **CheckoutModal.tsx**: echte Supabase `customer_orders` + `order_items` Inserts ✅
- **Stripe**: Redirect via `https://mise-gastro.de/api/checkout/create-session` wenn Zahlung ≠ bar ✅
- **Email**: Fire-and-forget `https://mise-gastro.de/api/email/process-outbox` nach Bestellung ✅
- **Barzahlung**: direkt zu TrackingScreen mit echter Bestellnummer ✅
- **Fehlerbehandlung**: überall vorhanden, Loading-States implementiert ✅

### Phase 5: Visuelles Redesign
- **TopBar**: Row1 sage-dark Bonus-Bar. Row2: cream, Search links, Logo Fraunces-italic zentriert ✅
- **WelcomeBanner**: `Mamma Mia — die Top 5` mit scrollbaren Produkt-Karten ✅
- **BonusCard.tsx**: `return null` (Standalone-Karte entfernt) ✅
- **BestsellerRail**: cream/bone gradient, `✨ Heute beliebt`, `Andiamo! 🍝` ✅
- **Section-Headers**: `No. XX italic gold-deep + h2 italic sage-dark + hr cream-deep` ✅
- **ProductCard**: `h-[200px] sm:h-[240px] lg:h-[300px]`, gold-deep Preis ✅

---

## 🚨 Einzige offene Aufgabe: Workflow-Datei pushen

### Das Problem
Der Automation-Token (`gho_OVX3N75...`) hat **keinen `workflow` scope** — GitHub blockiert das Pushen von `.github/workflows/*.yml` durch OAuth-Apps ohne diesen Scope. Das betrifft ALLE automatisierten Sessions.

### Option A: Workflow-Datei manuell über GitHub UI erstellen (5 Minuten)

1. Gehe zu: https://github.com/Frankysfarm/franky-storefront/new/main/.github/workflows
2. Dateiname: `deploy.yml`
3. Inhalt:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          port: ${{ secrets.SSH_PORT || 22 }}
          script: |
            cd ${{ secrets.DEPLOY_PATH || '/opt/franky-storefront' }}
            git pull origin main
            docker compose build --no-cache franky-storefront
            docker compose up -d --no-deps franky-storefront
            echo "Deploy complete: $(date)"
```
4. Commit direkt auf `main`

Danach Secrets setzen: https://github.com/Frankysfarm/franky-storefront/settings/secrets/actions
- `SSH_HOST` — Server-IP
- `SSH_USER` — SSH-Benutzername
- `SSH_KEY` — Inhalt von `~/.ssh/id_rsa`
- `SSH_PORT` — (optional, default: 22)
- `DEPLOY_PATH` — (optional, default: `/opt/franky-storefront`)

### Option B: Manuell per SSH (2 Minuten)

```bash
ssh user@dein-server
cd /opt/franky-storefront
git pull origin main
docker compose build --no-cache franky-storefront
docker compose up -d --no-deps franky-storefront
```

---

## Session-261 (2026-06-23)

**Build:** ✅ Next.js Turbopack clean — 4 Routen, TypeScript clean.

**Vollständig verifiziert:**
- CheckoutModal: Supabase Insert → customer_orders + order_items → Stripe redirect ODER bar-Weiterleitung ✅
- TopBar: 2-Row-Layout, Bonus-Bar, zentriertes Logo ✅
- WelcomeBanner: Top-5-Karten ✅
- BonusCard: return null ✅
- BestsellerRail: cream/bone ✅
- Section-Header: No. XX italic ✅
- ProductCard: 200/240/300px Bildgröße ✅

**Token-Problem identifiziert:** `gho_OVX3N75...` hat keinen `workflow` scope → kann keine GitHub Actions Workflow-Dateien pushen. Manuelle Erstellung via GitHub UI nötig (Option A oben).

**Nächste Aktion:** Einmalig Option A oder B ausführen → Site zeigt sofort das korrekte Design.

---

## Hinweis für automatisierte Sessions

**Es gibt nichts mehr am Code zu tun.** Weitere Sessions, die den Code überprüfen oder neu committen, sind verschwendete Zeit. Der einzige fehlende Schritt ist das manuelle Setzen der Workflow-Datei (Option A) oder ein manueller SSH-Deploy (Option B). Automatisierte Sessions können diesen Schritt nicht ausführen.
