# Redesign Progress

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
