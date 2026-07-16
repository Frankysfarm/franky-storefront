# KAUF-FERTIG STATUS

## ✅ CODE VOLLSTÄNDIG — Build clean (2026-07-16, Session-428)

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

### Option B — Auto-Deploy einrichten (einmalig, dann permanent):
1. Neuen GitHub PAT mit `repo` + `workflow` scope erstellen
2. GitHub Secrets setzen: `SSH_HOST`, `SSH_USERNAME`, `SSH_PRIVATE_KEY`
3. Workflow-Datei pushen (der Agent kann das mit dem neuen Token)

**Warum der Agent das nicht selbst lösen kann**: Der konfigurierte OAuth-Token hat keinen `workflow`-Scope (GitHub verweigert Push von Workflow-Dateien). Der Agent hat keinen SSH-Zugang zu mise-gastro.de. Code-Änderungen können gepusht werden.

**Testen nach Deploy**: https://mise-gastro.de/biss-app/frankys-pasta
