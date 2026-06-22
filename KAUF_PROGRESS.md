# Kauf-Fertig Progress

## ✅ FERTIG — Alle Phasen abgeschlossen (seit Session 42)

**Code-Status:** 100% vollständig. Keine weiteren Code-Änderungen nötig.
**Build:** Next.js 16.2.4 Turbopack clean, TypeScript ✅, 4 Routen ✅

---

## Was implementiert ist

### Phase 2–4: Echter Checkout (seit Session ~42)
- **CheckoutModal**: echte Supabase `customer_orders` + `order_items` Inserts
- **Stripe**: Redirect via `https://mise-gastro.de/api/checkout/create-session` wenn Zahlung ≠ bar
- **Email**: Fire-and-forget `https://mise-gastro.de/api/email/process-outbox` nach Bestellung
- **Barzahlung**: direkt zu TrackingScreen mit echter Bestellnummer

### Phase 5: Visuelles Redesign (seit Session ~42)
- **TopBar**: Row1 sage-dark Bonus-Bar (`🎁 FRANKY'S BONUS CLUB · Jede 2. Bestellung gratis` → BonusModal). Row2: cream, Search links, Logo Fraunces-italic zentriert, Cart-Icon rechts. Keine Delivery-Pill.
- **WelcomeBanner**: `Mamma Mia — die Top 5` mit scrollbaren Top-5-Produkt-Karten
- **BonusCard.tsx**: `return null` (Standalone-Karte entfernt)
- **BestsellerRail**: cream/bone gradient, `✨ Heute beliebt`, `Andiamo! 🍝`
- **Section-Headers**: `No. XX italic gold-deep + h2 italic sage-dark + hr cream-deep`
- **ProductCard**: `h-[200px] sm:h-[240px] lg:h-[300px]`, gold-deep Preis

---

## 🚨 Einzige offene Aufgabe: Server-Deployment

**Das Repo ist korrekt. Die Live-Site zeigt altes Design weil der Docker-Container nie neu gebaut wurde.**

### Option A: GitHub Actions (jetzt eingerichtet — empfohlen)

Die Datei `.github/workflows/deploy.yml` ist im Repo. Du musst einmalig 4 GitHub Secrets setzen:

1. Gehe zu: `https://github.com/Frankysfarm/franky-storefront/settings/secrets/actions`
2. Füge hinzu:
   - `SSH_HOST` — IP oder Hostname des Servers (z.B. `123.45.67.89`)
   - `SSH_USER` — SSH-Benutzername (z.B. `root` oder `deploy`)
   - `SSH_KEY` — Inhalt deines privaten SSH-Schlüssels (z.B. `cat ~/.ssh/id_rsa`)
   - `SSH_PORT` — (optional, default: 22)
   - `DEPLOY_PATH` — (optional, default: `/opt/franky-storefront`)

Danach löst jeder `git push origin main` einen automatischen Rebuild aus. Du kannst auch manuell triggern unter:
`https://github.com/Frankysfarm/franky-storefront/actions`

### Option B: Manuell per SSH (einmalig, ~2 Min)

```bash
ssh user@dein-server
cd /pfad/zum/franky-storefront/   # wo das Repo auf dem Server liegt
git pull origin main
docker compose build --no-cache franky-storefront
docker compose up -d --no-deps franky-storefront
```

---

## Hinweis für automatisierte Sessions

**Diese Routine hat nichts mehr zu tun.** Der Code ist seit Session 42 fertig.
Weitere Verifikations-Commits sind nutzlos. Bitte diese geplante Aufgabe deaktivieren.
