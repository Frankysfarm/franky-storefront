# Redesign Progress

## Phase 1 - Design System Tokens ✅
- Verified `franky-tokens.css` has all required tokens
- `--color-burgundy-dark: #5e221f` already present
- Body background gradients already present
- All loyalty/confetti/animation keyframes already defined

## Phase 2 - TopBar ✅
- Cart badge uses `bg-burgundy-dark` (dark red) instead of `bg-burgundy`
- ETA badge hidden on mobile (correct)
- Delivery pill on left with green dot pulse

## Phase 3 - BonusCard / Loyalty Card ✅
- `BonusCard.tsx` already existed with full dark-green animated card
- Registered in `FrankyStorefront.tsx` after WelcomeBanner
- Loyalty animations (loyalty-shine-sweep, loyalty-icon-bob, loyalty-glow-pulse, loyalty-enter) in CSS

## Phase 4 - BestsellerRail ✅
- Dark green banner with radial gradient overlays
- Scrollable white product cards with rank circles (dark green bg, gold text)
- Top-3 "⭐ Beliebt" pill overlay on image
- Left column: kicker text, live dot, title

## Phase 5 - CategoryNav ✅
- Active: `bg-sage` with gold-tinted box-shadow + inset border
- Inactive: `bg-mint` with transparent border, hover darkens
- Icon wrapper with `text-gold` when active
- Padding: `py-2 px-3.5` gap-2, rounded-full
- Sticky `top-[60px]`

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
