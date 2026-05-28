# Claude Code Briefing — Franky's Pasta

Dieses File gibt Claude Code den Kontext den er für sinnvolle Edits an diesem Projekt braucht. Bitte als erstes lesen.

---

## Was das ist

Single-Page Online-Shop für **Franky's Pasta** — Halal-zertifizierter Pasta/Pizza-Lieferservice in **Aachen**, NRW. Customer-facing Frontend, aktuell ohne Backend (Bestellung läuft als Demo durch).

Tech-Stack ist bewusst minimal: **Single HTML File**, Vanilla JS, kein Build-Schritt. Das ist Absicht — der Shop soll vom Inhaber ohne Entwickler-Kentnisse hostbar/verschickbar sein.

Es gibt **zwei Versionen** der gleichen Seite:
- `frankys-pasta-shop.html` (314 KB) — referenziert Bilder aus `bilder/` (Production)
- `frankys-pasta-shop-embedded.html` (1.1 MB) — Bilder als Base64 eingebettet (Standalone)

**WICHTIG bei Edits**: Beide Versionen müssen synchron bleiben. Bei JS/CSS/HTML-Änderungen in einer, die andere mit-aktualisieren. Bei Bild-Änderungen nur die `bilder/` Files überschreiben und dann mit einem Skript die `-embedded.html` Version neu generieren (siehe unten).

---

## Brand-Kontext (NIE ändern ohne Rückfrage)

- **Stadt**: Aachen (PLZ-Bereich 52062–52080) — NICHT Köln (das war ein früherer Fehler)
- **Sprache**: Deutsch mit italienischem Microcopy-Akzent ("Andiamo!", "Mamma Mia", "Grazie an deinen Fahrer 🛵")
- **Halal-First**: alle Fleisch-Gerichte sind halal-zertifiziert — das ist Kern-Identität, nicht nice-to-have
- **Telefon**: aktuell `0241 / [DEIN-TEL]` — Platzhalter, soll vom Inhaber gesetzt werden
- **Palette**: Sage-Olive `#4a5e4a` / Cream `#fbf8ee` / Mustard-Gold `#c9a227` — die ist final, nicht "verbessern"
- **Fonts**: Fraunces (Display, Italic-Akzente) + Inter (UI)

## Sortiment (40 Produkte, 5 Kategorien)

SKU-Schema: `PAS-` (Pasta) / `PIZ-` (Pizza) / `SID-` (Sides) / `DES-` (Desserts) / `DRI-` (Drinks)

- 10 Pasta · 8 Pizza · 6 Sides · 11 Desserts · 5 Drinks

**Top-3 Beliebteste** (zeigen Gold-Badge "⭐ Beliebt"): `PAS-001`, `PAS-003`, `SID-002`

**Bestseller-Rail** (Banner oben): `PAS-001, PAS-002, PAS-003, SID-002, SID-006, DES-001`

**21 Produkte haben aktuell Placeholder-Bilder** ("FOTO FOLGT" auf Sage-Hintergrund) — alle Pizzen, alle Sides außer SID-002, alle Drinks, und PAS-005 (Arrabbiata) / PAS-006 (Alfredo). Wird vom Inhaber später nachgeliefert. Einfach Datei in `bilder/` mit gleichem Namen überschreiben.

---

## Code-Struktur in der HTML-Datei

```
Lines 1-3900:    <style> — CSS (Design-System + Components + Responsive)
Lines 3900-4500: <body> — Topbar, Bonus, Bestseller, CatNav, 5 Sektionen, Footer
Lines 4500-5500: HTML für Cart-Drawer, Bottom-Sheet, Checkout-Modal, Tracking-Modal
Lines 5500-6800: <script>
  - products = { pasta: [...], pizza: [...], sides: [...], desserts: [...], drinks: [...] }
  - optionGroupsByCategory = { pasta: [nudel, swap, extras, drink-gratis], pizza: [...] }
  - bestsellers, top3, CROSS_SELL_IDS
  - Cart-Model (Map mit cartKey → {productId, qty, options})
  - renderProductCard(), renderCart(), openProductSheet(), ...
  - Animations (Reveal-IntersectionObserver, Confetti, etc.)
```

## Wichtige JS-Pattern

### Cart-Model
```js
const cart = new Map(); // cartKey → { productId, qty, options }
// cartKey ist eine deterministische String-Repräsentation der Options
// damit "Pasta mit Penne + Vegan-Swap" und "Pasta mit Penne + Vegan-Swap"
// als gleicher Eintrag erkannt werden (qty +1 statt new line)
```

### Product hat options inheritance
Jedes Produkt erbt `optionGroupsByCategory[category]` — keine eigene Options-Liste pro Produkt nötig. Wenn ein Produkt abweichen soll, kann `p.options = [...]` als override gesetzt werden.

### Reveal-Animation
`.reveal-stagger.in > * { opacity: 1 }` ist als catch-all gesetzt (nicht nur `:nth-child(1-8)`!) — das hatte einen Bug verursacht wo Cards 9+ unsichtbar blieben. Beim Hinzufügen neuer Sektionen mit vielen Cards darauf achten.

---

## Bekannte Bugs & Caveats

1. **Browser-Cache aggressiv** — User sieht Edits oft erst nach Hard-Refresh (Cmd+Shift+R). Im Doubt: in DevTools "Disable cache" einschalten.
2. **Bilder sind .jpg** — auch wenn original aus dem CSV-Katalog manche `.png` heißen, alle internen Refs sind `.jpg` (für Konsistenz). Wenn neue Bilder dazukommen: als JPEG q78 400×400px speichern.
3. **`scroll-behavior: smooth` + `scrollTo({behavior:'instant'})`** — bei programmatischem Testing wichtig, Smooth-Scroll explizit deaktivieren sonst Race-Conditions.
4. **Mindestbestellwert 15 €** ist in JS hard-coded — wenn ändern: Suche nach `15` in Cart-Logic.
5. **Free-Delivery-Threshold 25 €** ist in JS hard-coded — Suche nach `25` in Cart-Logic.

---

## Was Claude Code NICHT tun sollte ohne Rückfrage

- **Tech-Stack wechseln** (React/Next/Vue/etc) — die Single-File-Architektur ist Absicht
- **Bilder ohne Approval optimieren** — die JPEGs sind schon auf 400×400 q78 optimiert
- **Halal-Tags entfernen** — Kern-Identität
- **Brand-Farben ändern** — finalisiert
- **Stadt zurück auf Köln** — definitiv Aachen
- **Tracking/Analytics einbauen** ohne explizite Anfrage (Datenschutz!)

## Was Claude Code GERN tun darf

- **Bugs fixen** — vor allem in Mobile-UX und Section-Spacing
- **Conversion-Optimierung**: Trust-Signale, sticky CTAs, Mikrofeedback bei Add-to-Cart
- **Performance**: Lazy-Loading für Bilder, Preloading critical assets, etc.
- **Neue Sektionen**: Über uns, FAQ, AGB, Impressum, Datenschutz
- **Tracking-Screen verbessern**: animiertes Bike, Live-Karte, etc.
- **Backend-Integration vorbereiten**: Formspree, Stripe-Stub, Email-Versand

---

## Synchronisations-Skript (Bilder → Embedded HTML)

Wenn Bilder in `bilder/` geändert werden, muss die `-embedded.html` neu generiert werden. Hier ein Python-Skript dafür:

```python
import base64, re
from pathlib import Path

with open('frankys-pasta-shop.html') as f: html = f.read()

# Replace bilder/SKU.jpg refs with embedded base64
def replace(match):
    fn = match.group(1)
    path = Path('bilder') / fn
    if path.exists():
        b64 = base64.b64encode(path.read_bytes()).decode()
        return f'"data:image/jpeg;base64,{b64}"'
    return match.group(0)

html_embed = re.sub(r'"bilder/([^"]+)"', replace, html)

with open('frankys-pasta-shop-embedded.html', 'w') as f:
    f.write(html_embed)
```

---

## Test-Checklist nach Edits

```bash
# Lokale HTTP-Server starten
python3 -m http.server 8000

# Im Browser öffnen
# Desktop: Chrome → http://localhost:8000/frankys-pasta-shop.html
# Mobile-Simulation: F12 → Device-Toolbar → iPhone 12 (390x844)

# Checks:
# [ ] Logo komplett sichtbar oben mittig (kein "abgeschnitten unten")
# [ ] Bonus-Card animiert (Glow, Shine, Icon-Bob)
# [ ] Bestseller-Banner kompakt, scrollbar
# [ ] 5 Kategorien in CatNav (Pasta, Pizza, Sides, Desserts, Drinks)
# [ ] Alle 40 Cards sichtbar (keine opacity:0 ghost-Cards)
# [ ] Mobile: keine "großen Lücken" zwischen Sections
# [ ] Card-Tap öffnet Bottom-Sheet
# [ ] Pasta-Sheet zeigt 4 Modifier-Gruppen (Nudel-Wahl required)
# [ ] Cart-Bump-Animation bei Add-to-Cart
# [ ] Free-Delivery-Progress in Cart (ab 25€ Confetti)
# [ ] PLZ-Eingabe (52062 valid, 50667 invalid)
# [ ] 8 Zahlungsmethoden anzeigbar
# [ ] Tracking-Screen nach Bestellung
```
