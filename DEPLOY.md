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

Danach diese Datei anlegen: `.github/workflows/deploy.yml`

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
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd ${{ secrets.DEPLOY_PATH }}
            git pull origin main
            docker compose build --no-cache franky-storefront
            docker compose up -d --no-deps franky-storefront
            echo "Deploy abgeschlossen: $(date)"
```

**WICHTIG:** Workflow-Datei muss mit einem PAT (Personal Access Token) mit `workflow`-Scope gepusht werden, oder direkt über das GitHub Web-UI erstellt werden (github.com → Repository → .github/workflows → neue Datei anlegen).

## Warum der Live-Server noch die alte Version zeigt

Der Code ist **seit Session 42 vollständig korrekt** (alle 6 Layout-Änderungen: TopBar, WelcomeBanner, BonusCard, BestsellerRail, Section-Header, ProductCard). Der Build läuft sauber durch. Das Docker-Image auf dem Server wurde jedoch nie neu gebaut — daher zeigt `mise-gastro.de/biss-app/frankys-pasta` noch die alte Version.
