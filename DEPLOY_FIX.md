# ACTION REQUIRED: Docker Rebuild Needed

## Status
- **Code**: COMPLETE & CORRECT (since session ~42, 370+ sessions ago)
- **Build**: Passes clean (5.8s)
- **Problem**: Production Docker container has NOT been rebuilt with the updated code

## All 6 Layout Changes (Already in code):
1. `TopBar.tsx` — Bonus-Club slim bar top + centered logo, no delivery pill ✓
2. `WelcomeBanner.tsx` — "Mamma Mia — die Top 5" hero with scrollable Top-5 cards ✓  
3. `BonusCard.tsx` — Returns null (standalone card removed) ✓
4. `BestsellerRail.tsx` — Cream/bone gradient background, real product images ✓
5. `FrankyStorefront.tsx` — Section headers: "No. 01 / Pasta" format with divider ✓
6. `ProductCard.tsx` — Large images (220px/260px/300px), Fraunces title, gold price ✓

## Fix Required (SSH into server):
```bash
cd /path/to/franky-storefront
git pull origin main
docker-compose up -d --build
```

## After Fix:
**PLEASE DEACTIVATE THIS SCHEDULED TASK** — the code has been complete for 370+ sessions.
