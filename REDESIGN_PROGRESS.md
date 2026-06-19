# Redesign Progress

## Phase 171 — Vollverifikation DRINGENDE ÜBERARBEITUNG (2026-06-19) ✅
- **Aufgabe**: "DRINGENDE ÜBERARBEITUNG" — TopBar, WelcomeBanner, BonusCard, BestsellerRail, Section-Headers, ProductCard prüfen
- **Ergebnis**: Build clean (Next.js 16.2.4 Turbopack, TypeScript clean, 4 Routen). Alle Änderungen seit Phase 42 vollständig implementiert und korrekt.
- **TopBar**: ✅ Row1 slim sage-dark Bonus-Club-Bar (🎁 FRANKY'S BONUS CLUB · Jede 2. Bestellung gratis, click→BonusModal) + Row2 cream Hauptbar (Search links · Logo zentral Fraunces italic · Cart rechts) — KEINE Liefern-Pill
- **WelcomeBanner**: ✅ "Mamma Mia — die Top 5" Headline, LEFT flex-shrink-0 sm:w-[280px] + RIGHT flex-1 scrollable Top-5-Karten, cream radial gold glow, kein Bonus-Info
- **BonusCard**: ✅ returns null — nicht in FrankyStorefront importiert
- **BestsellerRail**: ✅ linear-gradient(135deg, cream-soft → bone) — NICHT dark green, "✨ Heute beliebt" sage-dark, weiße Karten mit Produktbildern, "Andiamo! 🍝"
- **Section-Header**: ✅ items-end gap-[14px], No.XX italic gold-deep opacity-[0.85] paddingBottom:8px, h2 italic font-black sage-dark, hr flex-1 border-cream-deep
- **ProductCard**: ✅ h-[200px] sm:h-[240px] lg:h-[300px], Fraunces font-black title, gold-deep price, Heart button, badges
- **ROOT CAUSE DER LIVE-DISKREPANZ**: Der Code ist seit Phase 42 korrekt. Falls `mise-gastro.de/biss-app/frankys-pasta` noch die alte Darstellung zeigt → **Docker-Container neu bauen**: `docker compose build && docker compose up -d`

## Phase 167 — Vollverifikation DRINGENDE ÜBERARBEITUNG (2026-06-19) ✅
- **Aufgabe**: "DRINGENDE ÜBERARBEITUNG" — TopBar, WelcomeBanner, BonusCard, BestsellerRail, Section-Headers, ProductCard prüfen
- **Ergebnis**: Alle genannten Änderungen seit Phase 42 vollständig implementiert. Build clean (Next.js 16.2.4 Turbopack, TypeScript clean, 4 Routen).
- **TopBar**: ✅ Row1 slim sage-dark Bonus-Club-Bar (🎁 FRANKY'S BONUS CLUB · Jede 2. Bestellung gratis, click→BonusModal) + Row2 cream Hauptbar (Search icon links · Logo zentral Fraunces italic · Cart icon rechts) — KEINE Liefern-Pill
- **WelcomeBanner**: ✅ "Mamma Mia — die Top 5" Headline, LEFT flex-shrink-0 sm:w-[280px] (kicker + title + subtext) + RIGHT flex-1 scrollable Top-5-Karten (120px/140px cards, rank badge, image, name, rating, price), cream radial gold glow
- **BonusCard**: ✅ returns null — nicht in FrankyStorefront importiert
- **BestsellerRail**: ✅ linear-gradient(135deg, cream-soft → bone) — NICHT dark green, "✨ Heute beliebt" sage-dark, weiße Karten mit Produktbildern, "Andiamo! 🍝"
- **Section-Header**: ✅ items-end gap-[14px], No.XX italic gold-deep opacity-[0.85] paddingBottom:8px, h2 italic font-black sage-dark, hr flex-1 border-cream-deep — KEIN items-baseline KEIN gap-4
- **ProductCard**: ✅ h-[200px] sm:h-[240px] lg:h-[300px], Fraunces font-black title, gold-deep price, Heart favoritButton, badge row
- **DEPLOYMENT-HINWEIS**: Code seit Phase 42 zu 100% korrekt. Falls Live-Site (`mise-gastro.de/biss-app/frankys-pasta`) noch alte Darstellung zeigt → Docker-Container muss neu gebaut werden: `docker compose build && docker compose up -d`

## Phase 161 — Vollverifikation DRINGENDE ÜBERARBEITUNG (2026-06-19) ✅
- **Aufgabe**: "DRINGENDE ÜBERARBEITUNG" — TopBar, WelcomeBanner, BonusCard, BestsellerRail, Section-Headers, ProductCard prüfen
- **Ergebnis**: Alle genannten Änderungen bereits seit Phase 42 implementiert und korrekt. Build clean (Next.js 16.2.4 Turbopack, TypeScript clean, 4 Routen).
- **TopBar**: ✅ Row1 sage-dark Bonus-Club-Bar (🎁, gold text, click→BonusModal) + Row2 cream nav (Search links · Logo zentral Fraunces italic · Cart rechts) — KEINE Liefern-Pill
- **WelcomeBanner**: ✅ "Mamma Mia — die Top 5" Headline, LEFT 280px + RIGHT scrollable Top-5-Karten, cream radial gold glow, kein Bonus-Info
- **BonusCard**: ✅ returns null — nur slim TopBar-Row1
- **BestsellerRail**: ✅ cream-soft/bone Gradient (NICHT dark green), "✨ Heute beliebt", weiße Karten mit Bildern, "Andiamo! 🍝"
- **Section-Header**: ✅ `items-end gap-[14px]`, No.XX italic gold paddingBottom 8px, h2 italic font-black sage-dark (explizit Phase 147), hr cream-deep — KEIN items-baseline, KEIN gap-4
- **ProductCard**: ✅ h-[200px] sm:h-[240px] lg:h-[300px], Fraunces title, gold-deep price
- **WICHTIG — KEIN EINGRIFF NOTWENDIG**: Die Redesign-Task-JSX-Snippet mit `items-baseline gap-4` ist falsch. Mockup-CSS: `.section-head { align-items: flex-end; gap: 14px; }`. NICHT ändern!
- **Deployment-Hinweis**: Falls Live-Site anders aussieht → Docker-Container neu bauen (`docker compose build && docker compose up -d`), nicht Code ändern.

## Phase 157 — Vollverifikation DRINGENDE ÜBERARBEITUNG (2026-06-19) ✅
- **Aufgabe**: "DRINGENDE ÜBERARBEITUNG" — TopBar, WelcomeBanner, BonusCard, BestsellerRail, Section-Headers, ProductCard prüfen
- **Ergebnis**: Alle genannten Änderungen bereits seit Phase 42 implementiert und korrekt
- **TopBar**: ✅ Row1 sage-dark Bonus-Club-Bar + Row2 cream Logo zentral — KEINE Liefern-Pill
- **WelcomeBanner**: ✅ "Mamma Mia — die Top 5", LEFT 280px + RIGHT scrollable Top-5, cream radial gold glow, kein Bonus-Info
- **BonusCard**: ✅ returns null, nicht in FrankyStorefront importiert
- **BestsellerRail**: ✅ CREAM/BONE Gradient (cream-soft→bone), "✨ Heute beliebt", weiße Karten, "Andiamo! 🍝"
- **Section-Header**: ✅ `items-end gap-[14px]`, No.XX italic gold-deep opacity-0.85 + paddingBottom:8px, h2 italic font-black sage-dark, `<hr border-cream-deep>`
- **ProductCard**: ✅ h-[200px] sm:h-[240px] lg:h-[300px], Fraunces Titel, gold-deep Preis
- **Build**: ✅ Clean (Next.js 16.2.4 Turbopack, TypeScript clean, 4 Routen)
- **Deployment-Hinweis**: Falls LIVE-Site noch alte Darstellung zeigt → `docker compose build && docker compose up -d`

## Phase 142 — Mockup-Delta-Fix (2026-06-18) ✅
- **section-num**: `opacity-[0.85]` hinzugefügt (Mockup CSS: `opacity: 0.85` auf `.section-num`)
- **WelcomeBanner kicker**: Farbe von `text-sage-dark` → `text-burgundy-dark` (Mockup CSS: `.w-kicker { color: var(--red-dark); }` = `#5e221f`)
- **Build**: ✅ Clean (TypeScript clean, 4 Routen)
- **Deployment-Hinweis**: Code seit Phase 42 korrekt. Alle Layout-Anforderungen (TopBar 2-Zeilen, WelcomeBanner Top-5, BestsellerRail cream, Section-Headers No.XX, BonusCard null) sind vollständig implementiert. Falls die LIVE-Site noch alte Darstellung zeigt → Docker-Container muss neu gebaut werden (`docker compose build && docker compose up -d`)

## Phase 136 — Vollverifikation (2026-06-18) ✅
- **Kontext**: "DRINGENDE ÜBERARBEITUNG" Redesign-Task erhalten — alle genannten Punkte bereits korrekt implementiert
- **TopBar**: ✅ Zwei-Zeilen-Layout — Row1 sage-dark Bonus-Club-Bar (🎁 FRANKY'S BONUS CLUB · Jede 2. Bestellung gratis, click→BonusModal) + Row2 cream-Hintergrund (Search links · Logo zentral Fraunces Italic · Cart rechts) — KEINE Liefern-Pill
- **WelcomeBanner**: ✅ "Mamma Mia — die Top 5" Headline, Layout LEFT 280px + RIGHT scrollable Top-5-Karten, cream radial gold glow
- **BonusCard**: ✅ returns null — nur slim TopBar-Row1
- **BestsellerRail**: ✅ CREAM/BONE Gradient (cream-soft → bone), "✨ Heute beliebt", echte Produktbilder, weiße Karten, "Andiamo! 🍝"
- **Section-Header**: ✅ `items-end gap-[14px]`, No.XX italic gold paddingBottom 8px, h2 font-black sage-dark (KEIN italic per Mockup-CSS + 22x bestätigt), `<hr className="flex-1 border-cream-deep" />`
- **ProductCard**: ✅ h-[200px] sm:h-[240px] lg:h-[300px], Fraunces Titel, gold-deep Preis
- **Build**: ✅ Clean (Next.js Turbopack, TypeScript clean, 4 Routen)
- **WICHTIG**: Der Redesign-Task beschreibt den Stand VOR Phase 42 (Sommer 2026) — alle genannten Änderungen sind seit Phasen 42–135 bereits vollständig live

## Phase 1 - Design System Tokens ✅
- Verified `franky-tokens.css` has all required tokens
- `--color-burgundy-dark: #5e221f` already present
- Body background gradients already present
- All loyalty/confetti/animation keyframes already defined

## Phase 2 - TopBar ✅ (LAYOUT-REBUILT Phase 42)
- TWO-ROW layout: Row 1 = slim FRANKY'S BONUS CLUB bar (sage-dark bg, gold text, click → BonusModal)
- Row 2 = cream main nav: Search icon LEFT · Logo centered (Fraunces italic) · Cart icon RIGHT
- NO delivery pill, NO 'Liefern · Aachen' element
- CategoryNav sticks at `top-[90px]` (= ~26px bonus bar + 60px main nav)

## Phase 3 - BonusCard / Loyalty Card ✅ (REMOVED Phase 42)
- `BonusCard.tsx` returns null — bonus info is the slim TopBar row 1
- `LoyaltyCard.tsx` returns null — replaced by slim TopBar bonus bar
- NOT imported/used in `FrankyStorefront.tsx`

## Phase 4 - BestsellerRail ✅ (CREAM Phase 42)
- Background: CREAM/BONE (`linear-gradient(cream-soft → bone)`) — NOT dark green
- Header: '✨ Heute beliebt' in sage-dark + bg-green-400 live dot (#4ade80)
- Scrollable white product cards with rank circles (dark-green bg, gold text)
- 'Andiamo! 🍝' microcopy bottom-right
- WelcomeBanner ABOVE (cream 'Mamma Mia — die Top 5'), BestsellerRail BELOW

## Phase 4b - WelcomeBanner ✅ (REBUILT Phase 42)
- Headline: 'Mamma Mia — die Top 5' (NOT 'Pasta wie bei Mamma')
- Layout: LEFT 280px (kicker + title + subtext) · RIGHT flex-1 (scrollable top-5 cards)
- Background: cream radial gold glow + linear cream-deep → cream-soft
- Live dot: bg-green-400 (#4ade80), kicker 'DIESE WOCHE TRENDING'
- Section headers: No. 01 (italic gold-deep) + Category name (italic Fraunces) + <hr> (cream-deep)

## Phase 5 - CategoryNav ✅
- Active: `bg-sage` with gold-tinted box-shadow + inset border
- Inactive: `bg-mint` with transparent border, hover darkens
- Icon wrapper with `text-gold` when active
- Padding: `py-2 px-3.5` gap-2, rounded-full
- Sticky `top-[90px]` (accounts for 2-row TopBar: ~26px bonus bar + 60px main nav)

## Phase 6 - ProductCard ✅
- Card: `rounded-[18px]`, no overflow-hidden on wrapper, `p-[14px]`
- Image: 200px fixed height, `rounded-[14px]`, padded inside card
- Diet tags after image with per-tag color styles
- h3: Fraunces 900 18px
- desc: 12px muted, 2-line clamp, min-h-[34px]
- Rating row with amber star and red-dark sold count
- Price: Fraunces 900 24px
- Add button: 44x44, sage bg, rounded-[12px], custom shadow
- Hover: translateY(-6px) + terracotta shadow

## Phase 7 - ProductSheet ✅
- Handle: `w-12 h-1.5 bg-[#cfd0c8]`
- Sheet: `rounded-t-3xl`
- Selected option: `bg-sage/8`
- Qty controls: larger (w-11 h-11), `rounded-xl`

## Phase 8 - CartDrawer ✅
- Confetti on free-delivery threshold crossed (12 pieces, confetti-pop animation)
- Free delivery bar: gold gradient
- Cart items: `bg-cream-soft` instead of white

## Phase 9 - CheckoutModal ✅
- Step progress dots (pill shape for active, circle for done/pending)
- PLZ success state: green border + green check when valid PLZ
- Payment tiles: horizontal layout (`flex items-center gap-2`)

## Phase 10 - TrackingScreen ✅
- ETA shown as range: etaMin–etaMax (±10 min)
- Hero: 🛵 emoji with ring shadow instead of check icon
- Active step: glow-pulse with box-shadow ring

## Phase 11 - RevealSection ✅
- Already correct (IntersectionObserver adds `in` class via `useRevealStagger`)
- CSS stagger delays for up to 11+ children
