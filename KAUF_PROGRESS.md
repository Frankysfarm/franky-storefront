# KAUF-FERTIG STATUS

## ✅ CODE VOLLSTÄNDIG — Build clean (2026-07-17, zuletzt verifiziert: Session 444)

Alle Phasen 1–5 implementiert. Build sauber: Next.js 16.2.4, TypeScript ✓, 4 Routen (/ /_not-found /[slug] /[slug]/success).

**CheckoutModal.tsx**: Supabase insert ✓, order_items insert ✓, Stripe redirect ✓, Email-Outbox ✓, PLZ-Validierung (52062–52080) ✓, Loading-States + Fehlerbehandlung ✓  
**TopBar.tsx**: Bonus-Club-Bar (sage-dark, gold) + Fraunces-Logo zentral ✓  
**WelcomeBanner.tsx**: "Mamma Mia — die Top 5" Hero mit scrollbaren Top-5-Karten ✓  
**BestsellerRail.tsx**: cream/beige Hintergrund, weiße Karten ✓  
**FrankyStorefront.tsx**: "No. 01 Pasta" Section-Header mit Trennlinie ✓  
**ProductCard.tsx**: Bilder 220/260/300px responsive, gold-deep Preise ✓

---

## 🚨 EINZIGER OFFENER PUNKT: Production-Server Deploy

Der Code liegt auf GitHub (main). Der Docker-Container auf `mise-gastro.de` läuft noch auf altem Stand.

### Option A — Manuell (sofort, ~2 Minuten):
```bash
ssh <user>@mise-gastro.de
cd /opt/franky-storefront
git pull origin main
docker compose build --no-cache franky-storefront
docker compose up -d --no-deps franky-storefront
```

### Option B — GitHub Actions Workflow via Web UI (einmalig einrichten):
Der Agent kann `.github/workflows/deploy.yml` nicht pushen (OAuth-Token fehlt `workflow`-Scope).
**Du kannst es direkt im GitHub-Browser-UI anlegen:**
1. Gehe zu: https://github.com/Frankysfarm/franky-storefront/new/main?filename=.github%2Fworkflows%2Fdeploy.yml
2. Füge folgenden Inhalt ein:

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            set -e
            cd /opt/franky-storefront
            git fetch origin main
            git reset --hard origin/main
            docker compose build --no-cache franky-storefront
            docker compose up -d --no-deps franky-storefront
```

3. Secrets setzen unter: https://github.com/Frankysfarm/franky-storefront/settings/secrets/actions
   - `SSH_HOST` = IP/Hostname von mise-gastro.de
   - `SSH_USERNAME` = dein SSH-User
   - `SSH_PRIVATE_KEY` = privater SSH-Key (alles aus `~/.ssh/id_rsa`)

**Warum der Agent das nicht selbst lösen kann**: OAuth-Token ohne `workflow`-Scope — GitHub blockiert Push von Workflow-Dateien. Kein SSH-Zugang zu mise-gastro.de.

**Testen nach Deploy**: https://mise-gastro.de/biss-app/frankys-pasta
