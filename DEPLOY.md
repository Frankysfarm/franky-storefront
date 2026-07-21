# Franky's Storefront — Deployment

## Manueller Deploy (auf dem Server ausführen)

```bash
cd /opt/franky-storefront
git pull origin main
docker compose build --no-cache franky-storefront
docker compose up -d --no-deps franky-storefront
```

## GitHub Actions Auto-Deploy einrichten

Damit jeder Push zu `main` automatisch deployed, folgende Secrets im GitHub Repository konfigurieren:

| Secret | Beispiel |
|--------|----------|
| `SSH_HOST` | `mise-gastro.de` |
| `SSH_USER` | `deploy` |
| `SSH_PRIVATE_KEY` | *(privater SSH-Schlüssel)* |
| `DEPLOY_PATH` | `/opt/franky-storefront` |

→ Settings → Secrets and variables → Actions → New repository secret

Nach dem Einrichten läuft jeder Push zu `main` automatisch durch den Deploy-Workflow (`.github/workflows/deploy.yml`).

## Warum der Live-Server noch die alte Version zeigt

Der Code ist **seit Session 42 vollständig korrekt** (alle 6 Layout-Änderungen: TopBar, WelcomeBanner, BonusCard, BestsellerRail, Section-Header, ProductCard). Der Build läuft sauber durch. Das Docker-Image auf dem Server wurde jedoch nie neu gebaut — daher zeigt `mise-gastro.de/biss-app/frankys-pasta` noch die alte Version.
