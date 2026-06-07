"use client";

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import type { Tenant, Product } from "@/lib/types";

interface CtaButton {
  id?: string;
  label: string;
  url: string;
  icon?: string;
}

interface BrandPage {
  hero?: { title?: string; subtitle?: string; image_url?: string };
  about?: { title?: string; text?: string };
  gallery?: string[];
  contact?: { address?: string; phone?: string; email?: string; hours?: string };
  buttons?: CtaButton[];
}

// Icon-Key (Backoffice) → monochromes SVG (nimmt Button-Farbe an). 'external'/unbekannt = kein Icon.
const ICON_PATHS: Record<string, string> = {
  calendar: "M7 2v3M17 2v3M3.5 9.5h17M5 5h14a1.5 1.5 0 0 1 1.5 1.5V19A1.5 1.5 0 0 1 19 20.5H5A1.5 1.5 0 0 1 3.5 19V6.5A1.5 1.5 0 0 1 5 5Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  truck: "M3 6h11v9H3zM14 9h4l3 3v3h-7M7.5 18a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM17.5 18a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z",
  phone: "M6 3h3l1.5 5-2 1.5a12 12 0 0 0 6 6l1.5-2 5 1.5v3a2 2 0 0 1-2 2A17 17 0 0 1 4 5a2 2 0 0 1 2-2Z",
  instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4ZM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM17.5 6.5h.01",
  cart: "M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h7.7a1.5 1.5 0 0 0 1.5-1.2L21 8H6M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  map: "M12 21s-6.5-5.5-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.5 12 21 12 21ZM12 12.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.9 6.8 20.6l1-5.8L3.5 9.7l5.9-.9Z",
};

const isReserveBtn = (b: CtaButton) =>
  b.id === "reserve" || /(?:^|#)reserv/i.test(b.url ?? "");

interface MItem {
  name: string;
  desc: string;
  price: string;
  ico: string;
  img: string;
}

export function BrandPageClient({
  tenant,
  products = [],
  primary,
  accent,
  logoUrl,
  orderUrl,
}: {
  tenant: Tenant;
  products?: Product[];
  primary?: string | null;
  accent?: string | null;
  logoUrl?: string | null;
  orderUrl?: string;
}) {
  const brand: BrandPage = (tenant.storefront_settings as { brand_page?: BrandPage })?.brand_page ?? {};
  const contact = brand.contact ?? {};

  // Bestell-Link: vom Server gesetzt (z. B. /Pasta-Aachen bei maskierter Domain), sonst Subpath.
  const orderHref = orderUrl || `/biss-app/${tenant.slug}`;

  // Owner-Farben (Backoffice) mit Orange-Fallback. Als CSS-Variablen auf .mg-root gesetzt —
  // überschreiben die :root-Defaults für alle Kind-Elemente. Kein gesetzter Wert = Orange bleibt.
  const rootColorVars: Record<string, string> = {
    "--mg-ember": primary || "#FF5A1F",
    "--mg-ember-2": primary ? `color-mix(in srgb, ${primary} 70%, #ffffff)` : "#FF8A3D",
    "--mg-gold": accent || "#F2B25C",
  };

  // Default-Buttons wenn der Owner im Backoffice noch nichts gesetzt hat (= heutiger Look).
  const defaultButtons: CtaButton[] = [
    { id: "reserve", label: "Tisch reservieren", url: "#reservieren", icon: "calendar" },
    { id: "order", label: "Online bestellen", url: orderHref, icon: "truck" },
    { id: "menu", label: "Speisekarte", url: "#mg-menu", icon: "menu" },
  ];
  const gallery = brand.gallery ?? [];
  const heroImage = brand.hero?.image_url ?? tenant.hero_image_url;

  const brandName = (brand.hero?.title ?? tenant.name ?? "FRANKYS").toUpperCase();
  const taglineParts = (brand.hero?.subtitle ?? "Pasta. Halal. Aachen.").split(" ");
  const intro = brand.about?.text ?? "Handgemachte Pasta nach italienischer Tradition. Halal. Frisch. Jeden Tag — direkt aus unserer Küche zu dir.";

  const hoursLines = (contact.hours ?? "Mo-Fr 11:00-22:00\nSa+So 12:00-23:00").split("\n");
  const heroHours = hoursLines[0]?.split(/[\s–-]+/).slice(-2).join("-") ?? "11–22 Uhr";
  const liveText = `Jetzt geöffnet · bis ${heroHours.split(/[\s–-]+/).pop() ?? "22"} Uhr`;

  const menu: MItem[] = products.slice(0, 4).map((p) => ({
    name: p.name,
    desc: p.beschreibung ?? "",
    price: p.preis ? `${Number(p.preis).toFixed(0)} €` : "",
    ico: "🍝",
    img: p.bild_url ?? "",
  }));

  const storyTitle = brand.about?.title ?? "Frische Pasta. Jeden Tag.";
  const storyText = brand.about?.text ?? "Bei Frankys machen wir alles selbst — frischer Teig um 6:30 Uhr, lange geschmorte Saucen, beste italienische Zutaten. Halal-zertifiziert.";
  const stats = [
    { n: "2019", l: "Gegründet" },
    { n: "18h", l: "Teigruhe" },
    { n: "100%", l: "Halal" },
  ];

  const marquee = ["Frische Pasta", "Handgemacht seit 2019", "Halal-zertifiziert", "Frisch um 6:30 Uhr", "Aus Aachen mit Liebe"];
  const partners = ["Lieferando", "Eigene App", "Abholung"];
  const phone = contact.phone ?? "+49 241 12345678";
  const mail = contact.email ?? `kontakt@${tenant.slug}.de`;
  const address = contact.address ?? "Adalbertstr. 30, 52066 Aachen";
  const city = tenant.stadt ?? "Aachen";

  // ── Reservierungs-Modal ──
  const [resvOpen, setResvOpen] = useState(false);
  const [resvState, setResvState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [resvErr, setResvErr] = useState("");
  const [form, setForm] = useState({
    gast_name: "", gast_telefon: "", gast_email: "",
    gast_anzahl: 2, datum: "", zeit_von: "", notiz: "", hp: "",
  });
  const setF = (k: string, v: string | number) => setForm((f) => ({ ...f, [k]: v }));
  const openResv = () => { setResvErr(""); setResvState("idle"); setResvOpen(true); };
  const closeResv = () => { setResvOpen(false); };

  const submitResv = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.gast_name || !form.datum || !form.zeit_von || !form.gast_anzahl) {
      setResvErr("Bitte Name, Datum, Uhrzeit und Personenanzahl ausfüllen.");
      return;
    }
    setResvState("sending"); setResvErr("");
    try {
      const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const r = await fetch(`${base}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, slug: tenant.slug }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.ok) throw new Error(j.error || "Fehler beim Senden");
      setResvState("ok");
    } catch (err) {
      setResvState("err");
      setResvErr(err instanceof Error ? err.message : "Etwas ist schiefgelaufen.");
    }
  };

  // ── CTA-Buttons (Backoffice-konfigurierbar, Fallback = Defaults) ──
  const ctaButtons: CtaButton[] = brand.buttons?.length ? brand.buttons : defaultButtons;
  const variantClass = (v: "primary" | "gold" | "ghost") =>
    v === "primary" ? "mg-btn-primary" : v === "gold" ? "mg-btn-gold" : "mg-btn-ghost";
  const renderIcon = (key?: string) => {
    if (!key || !ICON_PATHS[key]) return null;
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden="true">
        <path d={ICON_PATHS[key]} />
      </svg>
    );
  };
  const renderCta = (b: CtaButton, variant: "primary" | "gold" | "ghost", key: string) => {
    const cls = `mg-btn ${variantClass(variant)}`;
    const inner = <>{renderIcon(b.icon)}{b.label}{variant === "primary" ? " ↗" : ""}</>;
    return isReserveBtn(b) ? (
      <button key={key} type="button" onClick={openResv} className={cls}>{inner}</button>
    ) : (
      <a key={key} href={b.url || "#"} className={cls}>{inner}</a>
    );
  };
  const navReserve = ctaButtons.find(isReserveBtn);
  const navOrder = ctaButtons.find((b) => !isReserveBtn(b));

  const sectionsRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    sectionsRef.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    const onScroll = () => {
      const h = document.getElementById("mg-header");
      if (h) h.classList.toggle("scrolled", window.scrollY > 20);
    };
    addEventListener("scroll", onScroll);
    return () => {
      io.disconnect();
      removeEventListener("scroll", onScroll);
    };
  }, []);

  const MarqueeBlock = () => (
    <span>
      {marquee.map((t, i) => (
        <i key={i}>{t}</i>
      ))}
    </span>
  );

  return (
    <>
      <style jsx global>{`
        :root {
          --mg-bg: #14100B; --mg-bg2: #1C1611; --mg-bg3: #241B14;
          --mg-cream: #F5ECDD; --mg-cream-soft: #C9BCA8;
          --mg-ember: #FF5A1F; --mg-ember-2: #FF8A3D; --mg-gold: #F2B25C;
          --mg-line: rgba(245,236,221,.12); --mg-glow: rgba(255,90,31,.55);
          --mg-ease: cubic-bezier(.22,1,.36,1);
        }
        .mg-root { background: var(--mg-bg); color: var(--mg-cream); font-family: 'Hanken Grotesk', sans-serif;
          font-size: 17px; line-height: 1.55; -webkit-font-smoothing: antialiased; min-height: 100vh; position: relative; }
        .mg-root::before { content: ""; position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            radial-gradient(900px 600px at 50% -8%, rgba(255,90,31,.22), transparent 60%),
            radial-gradient(700px 500px at 92% 18%, rgba(242,178,92,.10), transparent 55%),
            radial-gradient(700px 600px at 4% 70%, rgba(255,90,31,.08), transparent 55%);
          animation: mgFlick 7s ease-in-out infinite; }
        @keyframes mgFlick { 0%,100% { opacity: .9 } 50% { opacity: 1 } }
        .mg-wrap { max-width: 1280px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }
        .mg-eyebrow { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; text-transform: uppercase;
          letter-spacing: .16em; font-size: 12.5px; color: var(--mg-ember-2); display: inline-flex; gap: 9px; align-items: center; }
        .mg-eyebrow::before { content: ""; width: 22px; height: 1.5px; background: var(--mg-ember); }
        .mg-btn { display: inline-flex; align-items: center; gap: .55em; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700;
          font-size: 15px; padding: 14px 26px; border-radius: 999px; transition: transform .25s var(--mg-ease),
          background .25s, color .25s, box-shadow .25s; white-space: nowrap; text-decoration: none; cursor: pointer; border: none; }
        .mg-btn:hover { transform: translateY(-2px); }
        .mg-btn-primary { background: var(--mg-ember); color: #fff; box-shadow: 0 10px 30px rgba(255,90,31,.4); }
        .mg-btn-primary:hover { background: var(--mg-ember-2); box-shadow: 0 14px 40px rgba(255,90,31,.55); }
        .mg-btn-gold { background: var(--mg-gold); color: #231a10; }
        .mg-btn-gold:hover { background: #f6c071; }
        .mg-btn-ghost { background: transparent; color: var(--mg-cream); box-shadow: inset 0 0 0 1.5px var(--mg-line); }
        .mg-btn-ghost:hover { box-shadow: inset 0 0 0 1.5px var(--mg-ember); color: var(--mg-ember-2); }

        .mg-topbar { background: var(--mg-ember); color: #fff; overflow: hidden;
          font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800; font-size: 13px; letter-spacing: .1em;
          text-transform: uppercase; position: relative; z-index: 300; }
        .mg-marquee { display: flex; white-space: nowrap; }
        .mg-marquee > span { padding: 10px 0; display: inline-flex; }
        .mg-marquee > span > i { font-style: normal; display: inline-flex; align-items: center; gap: 24px; padding-right: 24px; }
        .mg-marquee > span > i::after { content: "●"; font-size: 8px; margin-left: 24px; }
        .mg-mq-a { animation: mgScrollx 30s linear infinite; }
        @keyframes mgScrollx { from { transform: translateX(0) } to { transform: translateX(-50%) } }

        .mg-header { position: sticky; top: 0; z-index: 200;
          transition: background .3s, backdrop-filter .3s, border-color .3s;
          border-bottom: 1px solid transparent; }
        .mg-header.scrolled { background: rgba(20,16,11,.72); backdrop-filter: blur(14px); border-color: var(--mg-line); }
        .mg-nav { display: flex; align-items: center; gap: 28px; height: 78px; }
        .mg-logo { font-family: 'Anton', sans-serif; font-size: 30px; text-transform: uppercase; letter-spacing: .02em;
          display: flex; align-items: center; gap: 7px; color: var(--mg-cream); text-decoration: none; }
        .mg-logo .dot { width: 11px; height: 11px; border-radius: 50%; background: var(--mg-ember);
          box-shadow: 0 0 14px var(--mg-glow); margin-bottom: 13px; }
        .mg-navlinks { display: flex; gap: 26px; margin-left: auto;
          font-family: 'Bricolage Grotesque', sans-serif; font-weight: 600; font-size: 15px; }
        .mg-navlinks a { padding: 4px 0; color: var(--mg-cream-soft); transition: color .2s; text-decoration: none; }
        .mg-navlinks a:hover { color: var(--mg-cream); }
        .mg-nav-cta { display: flex; gap: 10px; align-items: center; }
        .mg-nav-cta .mg-btn { padding: 11px 20px; font-size: 14px; }

        .mg-hero { padding: 40px 0; text-align: center; }
        .mg-live { display: inline-flex; align-items: center; gap: 9px;
          font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 13px;
          letter-spacing: .06em; text-transform: uppercase; background: var(--mg-bg2);
          border: 1px solid var(--mg-line); border-radius: 999px; padding: 8px 16px; color: var(--mg-cream-soft); }
        .mg-live .pulse { width: 9px; height: 9px; border-radius: 50%; background: #5fd36a;
          box-shadow: 0 0 0 0 rgba(95,211,106,.6); animation: mgPulse 2s infinite; }
        @keyframes mgPulse {
          0% { box-shadow: 0 0 0 0 rgba(95,211,106,.6) }
          70% { box-shadow: 0 0 0 9px rgba(95,211,106,0) }
          100% { box-shadow: 0 0 0 0 rgba(95,211,106,0) }
        }
        .mg-hero-name { font-family: 'Anton', sans-serif; text-transform: uppercase;
          font-size: clamp(72px, 20vw, 280px); line-height: .8; letter-spacing: -.02em; margin: 18px 0 4px;
          background: linear-gradient(180deg, #fff 0%, var(--mg-gold) 45%, var(--mg-ember) 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          filter: drop-shadow(0 0 60px rgba(255,90,31,.35)); word-break: break-word; }
        .mg-hero-tag { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800;
          font-size: clamp(19px, 2.3vw, 28px); text-transform: uppercase; letter-spacing: .01em; color: var(--mg-cream); }
        .mg-hero-tag em { font-style: normal; color: var(--mg-ember-2); }
        .mg-hero-intro { max-width: 560px; margin: 18px auto 0; color: var(--mg-cream-soft); font-size: 16.5px; }
        .mg-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 28px; }
        .mg-hero-strip { display: flex; gap: 14px; margin-top: 46px; align-items: stretch; flex-wrap: wrap; }
        .mg-hero-strip .mg-photo { flex: 1; min-height: 300px; border-radius: 24px; min-width: 0; }
        .mg-hero-strip .mg-photo:nth-child(2) { flex: 1.4; }
        .mg-hero-meta { background: var(--mg-ember); color: #fff; border-radius: 24px;
          padding: 26px; min-width: 220px; display: flex; flex-direction: column; justify-content: space-between;
          text-align: left; overflow: hidden; position: relative; }
        .mg-hero-meta::after { content: "🔥"; position: absolute; right: -10px; bottom: -14px; font-size: 90px; opacity: .18; }
        .mg-hero-meta .hours { font-family: 'Anton', sans-serif; font-size: 34px; line-height: 1; }
        .mg-hero-meta .lbl { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700;
          text-transform: uppercase; letter-spacing: .1em; font-size: 11px; opacity: .85; margin-bottom: 6px; }

        .mg-photo { position: relative; overflow: hidden; border-radius: 16px; background: var(--mg-bg2);
          background-size: cover; background-position: center; }
        .mg-photo .mg-fill { position: absolute; inset: 0;
          background:
            radial-gradient(130% 120% at 25% 8%, rgba(255,138,61,.85), transparent 52%),
            radial-gradient(130% 130% at 88% 96%, rgba(20,16,11,.95), transparent 60%),
            linear-gradient(140deg, #c9461c, #3a1f12); }
        .mg-photo.has-img .mg-fill { display: none; }
        .mg-photo .mg-num { position: absolute; right: 14px; top: 10px;
          font-family: 'Anton', sans-serif; font-size: 64px; line-height: 1;
          color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,.35); opacity: .6; }
        .mg-photo .mg-tag { position: absolute; left: 13px; bottom: 13px;
          font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 11px;
          letter-spacing: .12em; text-transform: uppercase; color: #fff; background: rgba(0,0,0,.35);
          padding: 6px 12px; border-radius: 999px; backdrop-filter: blur(4px); }
        .mg-photo .mg-ico { position: absolute; inset: 0; display: grid; place-items: center; font-size: 58px;
          filter: drop-shadow(0 6px 18px rgba(0,0,0,.4)); }

        .mg-section { padding: 80px 0; }
        .mg-sec-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px;
          margin-bottom: 38px; flex-wrap: wrap; }
        .mg-sec-title { font-family: 'Anton', sans-serif; text-transform: uppercase;
          font-size: clamp(38px, 5.5vw, 72px); color: var(--mg-cream); }
        .mg-sec-title .em { color: var(--mg-ember); }

        .mg-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .mg-card { background: var(--mg-bg2); border-radius: 16px; overflow: hidden;
          border: 1px solid var(--mg-line);
          transition: transform .35s var(--mg-ease), box-shadow .35s, border-color .35s;
          text-decoration: none; color: var(--mg-cream); display: block; }
        .mg-card:hover { transform: translateY(-7px); border-color: rgba(255,90,31,.4);
          box-shadow: 0 26px 50px rgba(0,0,0,.45), 0 0 0 1px rgba(255,90,31,.2); }
        .mg-card .mg-photo { aspect-ratio: 4/3; border-radius: 0; }
        .mg-card-body { padding: 18px 18px 20px; }
        .mg-card-body h3 { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 800;
          font-size: 20px; text-transform: uppercase; }
        .mg-card-body p { color: var(--mg-cream-soft); font-size: 14px; margin-top: 6px; min-height: 38px; }
        .mg-card-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 14px; }
        .mg-price { font-family: 'Anton', sans-serif; font-size: 24px; color: var(--mg-ember-2); }
        .mg-round { width: 42px; height: 42px; border-radius: 50%; display: grid; place-items: center;
          background: var(--mg-bg3); border: 1px solid var(--mg-line); transition: .35s var(--mg-ease); }
        .mg-card:hover .mg-round { transform: rotate(45deg); background: var(--mg-ember);
          border-color: var(--mg-ember); color: #fff; }

        .mg-statement { padding: 90px 0; text-align: center; }
        .mg-statement h2 { font-family: 'Anton', sans-serif; text-transform: uppercase;
          font-size: clamp(44px, 9vw, 150px); line-height: .86; letter-spacing: -.02em; color: var(--mg-cream); }
        .mg-statement h2 .out { color: transparent; -webkit-text-stroke: 2px var(--mg-cream-soft); opacity: .5; }
        .mg-statement h2 .em { color: var(--mg-ember); }
        .mg-statement p { max-width: 540px; margin: 22px auto 0; color: var(--mg-cream-soft); }

        .mg-story { display: grid; grid-template-columns: 1fr 1fr; border-radius: 24px; overflow: hidden;
          border: 1px solid var(--mg-line); }
        .mg-story .mg-photo { min-height: 460px; border-radius: 0; }
        .mg-story-text { padding: clamp(34px, 5vw, 66px); background: var(--mg-bg2);
          display: flex; flex-direction: column; justify-content: center; }
        .mg-story-text h2 { font-family: 'Anton', sans-serif; text-transform: uppercase;
          font-size: clamp(36px, 4.5vw, 58px); margin: 14px 0; color: var(--mg-cream); }
        .mg-story-text h2 .em { color: var(--mg-ember); }
        .mg-story-text p { color: var(--mg-cream-soft); max-width: 440px; }
        .mg-stat-row { display: flex; gap: 38px; margin-top: 32px; flex-wrap: wrap; }
        .mg-stat .n { font-family: 'Anton', sans-serif; font-size: 46px;
          background: linear-gradient(180deg, var(--mg-gold), var(--mg-ember));
          -webkit-background-clip: text; background-clip: text; color: transparent; }
        .mg-stat .l { font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: var(--mg-cream-soft); }

        .mg-reserve { background: radial-gradient(120% 140% at 0% 0%, rgba(255,90,31,.25), transparent 55%), var(--mg-bg2);
          border: 1px solid var(--mg-line); border-radius: 24px;
          padding: clamp(36px, 5vw, 66px); display: grid; grid-template-columns: 1fr 1fr; gap: 44px; align-items: center; }
        .mg-reserve h2 { font-family: 'Anton', sans-serif; text-transform: uppercase;
          font-size: clamp(42px, 5.5vw, 80px); color: var(--mg-cream); }
        .mg-reserve h2 .em { color: var(--mg-ember); }
        .mg-reserve p { color: var(--mg-cream-soft); max-width: 400px; margin-top: 14px; }

        .mg-deliver { display: grid; grid-template-columns: 1fr 1fr; gap: 38px; align-items: center;
          background: var(--mg-bg2); border: 1px solid var(--mg-line); border-radius: 24px;
          padding: clamp(32px, 4vw, 54px); }
        .mg-deliver h2 { font-family: 'Anton', sans-serif; text-transform: uppercase;
          font-size: clamp(36px, 4.5vw, 60px); color: var(--mg-cream); }
        .mg-deliver p { color: var(--mg-cream-soft); margin-top: 12px; max-width: 420px; }
        .mg-deliver .mg-photo { aspect-ratio: 4/3; border-radius: 16px; }
        .mg-partners { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
        .mg-partner { background: var(--mg-bg); border: 1px solid var(--mg-line); border-radius: 999px;
          padding: 11px 18px; font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700; font-size: 14px;
          display: flex; align-items: center; gap: 8px; }

        .mg-gallery { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 160px; gap: 12px; }
        .mg-gallery .mg-photo { border-radius: 11px; }
        .mg-g-tall { grid-row: span 2; }
        .mg-g-wide { grid-column: span 2; }

        .mg-footer { background: var(--mg-bg2); border-top: 1px solid var(--mg-line);
          margin-top: 80px; padding: 66px 0 30px; }
        .mg-foot-top { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 30px; }
        .mg-foot-brand .mg-logo { font-size: 48px; }
        .mg-foot-brand p { color: var(--mg-cream-soft); max-width: 300px; margin-top: 14px; font-size: 15px; }
        .mg-foot-col h4 { font-family: 'Bricolage Grotesque', sans-serif; font-weight: 700;
          text-transform: uppercase; letter-spacing: .1em; font-size: 12.5px;
          color: var(--mg-ember-2); margin-bottom: 16px; }
        .mg-foot-col a, .mg-foot-col p { display: block; color: var(--mg-cream-soft);
          margin-bottom: 9px; font-size: 15px; transition: .2s; text-decoration: none; }
        .mg-foot-col a:hover { color: var(--mg-ember-2); }
        .mg-foot-bottom { display: flex; justify-content: space-between; align-items: center;
          margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--mg-line);
          font-size: 13px; color: #6b6055; flex-wrap: wrap; gap: 10px; }

        .reveal { opacity: 1; transition: opacity .8s var(--mg-ease), transform .8s var(--mg-ease); }
        @media (prefers-reduced-motion: no-preference) {
          .reveal:not(.in) { opacity: 0; transform: translateY(30px); }
          .reveal.in { opacity: 1; transform: none; }
        }

        @media (max-width: 1000px) {
          .mg-cards { grid-template-columns: repeat(2, 1fr); }
          .mg-story, .mg-reserve, .mg-deliver { grid-template-columns: 1fr; }
          .mg-story .mg-photo { min-height: 280px; }
          .mg-hero-strip .mg-photo { flex: 1 1 40%; min-height: 200px; }
          .mg-hero-meta { flex: 1 1 100%; flex-direction: row; align-items: center; gap: 20px; }
          .mg-foot-top { grid-template-columns: 1fr 1fr; }
          .mg-gallery { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 660px) {
          .mg-navlinks { display: none; }
          .mg-nav-cta .mg-btn-gold { display: none; }
          .mg-nav-cta .mg-btn-primary { padding: 9px 15px; font-size: 13px; }
          .mg-cards { grid-template-columns: 1fr; }
          .mg-hero-strip .mg-photo { flex: 1 1 100%; }
          .mg-row { grid-template-columns: 1fr; }
        }

        /* ── Reservierungs-Modal ── */
        .mg-modal-overlay { position: fixed; inset: 0; z-index: 9999; background: rgba(10,7,4,.72);
          backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center;
          padding: 20px; animation: mgFade .25s var(--mg-ease); }
        @keyframes mgFade { from { opacity: 0 } to { opacity: 1 } }
        .mg-modal { position: relative; width: 100%; max-width: 480px; max-height: 92vh; overflow-y: auto;
          background: linear-gradient(180deg, var(--mg-bg2), var(--mg-bg)); border: 1px solid var(--mg-line);
          border-radius: 20px; padding: 34px; box-shadow: 0 30px 80px rgba(0,0,0,.6), 0 0 0 1px rgba(255,90,31,.08);
          animation: mgPop .3s var(--mg-ease); }
        @keyframes mgPop { from { transform: translateY(16px) scale(.97); opacity: 0 } to { transform: none; opacity: 1 } }
        .mg-modal-x { position: absolute; top: 16px; right: 16px; width: 34px; height: 34px; border-radius: 50%;
          background: rgba(245,236,221,.08); color: var(--mg-cream-soft); border: none; cursor: pointer; font-size: 14px;
          transition: background .2s, color .2s; }
        .mg-modal-x:hover { background: rgba(255,90,31,.2); color: var(--mg-cream); }
        .mg-modal h3 { font-family: 'Anton', sans-serif; text-transform: uppercase; font-weight: 400;
          font-size: clamp(26px, 5vw, 34px); letter-spacing: .01em; margin: 10px 0 4px; line-height: 1; }
        .mg-modal-sub { color: var(--mg-cream-soft); font-size: 14.5px; margin: 0 0 20px; }
        .mg-modal-form { display: flex; flex-direction: column; gap: 12px; }
        .mg-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .mg-modal-form .mg-row:has(.mg-lab) { grid-template-columns: 1fr 1fr 1fr; }
        .mg-lab { display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: var(--mg-cream-soft);
          font-family: 'Bricolage Grotesque', sans-serif; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; }
        .mg-inp { width: 100%; background: rgba(245,236,221,.05); border: 1px solid var(--mg-line); border-radius: 11px;
          padding: 13px 15px; color: var(--mg-cream); font-size: 15px; font-family: inherit; transition: border-color .2s, background .2s; }
        .mg-inp::placeholder { color: #7c7466; }
        .mg-inp:focus { outline: none; border-color: var(--mg-ember); background: rgba(255,90,31,.06); }
        .mg-inp[type="date"], .mg-inp[type="time"] { color-scheme: dark; padding: 11px 12px; }
        select.mg-inp { padding: 11px 12px; }
        textarea.mg-inp { resize: vertical; min-height: 52px; }
        .mg-hp { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }
        .mg-modal-err { color: #ff8a6a; font-size: 13.5px; margin: 2px 0 0; }
        .mg-modal-fine { color: #7c7466; font-size: 11.5px; text-align: center; margin: 10px 0 0; }
        .mg-modal-ok { text-align: center; padding: 14px 0; }
        .mg-modal-ok h3 { margin-bottom: 8px; }
        .mg-modal-ok p { color: var(--mg-cream-soft); font-size: 15px; margin: 0 auto 22px; max-width: 320px; }
        .mg-ok-ico { width: 64px; height: 64px; margin: 0 auto 16px; border-radius: 50%; display: grid; place-items: center;
          background: rgba(255,90,31,.15); color: var(--mg-ember-2); font-size: 30px; border: 1.5px solid var(--mg-ember); }
      `}</style>

      <div className="mg-root" style={rootColorVars as unknown as CSSProperties}>
        <div className="mg-topbar">
          <div className="mg-marquee mg-mq-a">
            <MarqueeBlock />
            <MarqueeBlock />
          </div>
        </div>

        <header className="mg-header" id="mg-header">
          <div className="mg-wrap mg-nav">
            <a href="#mg-top" className="mg-logo">
              {logoUrl ? (
                <img src={logoUrl} alt={brandName} style={{ height: 46, width: "auto", maxWidth: 200, objectFit: "contain", display: "block" }} />
              ) : (
                <>{brandName}<span className="dot"></span></>
              )}
            </a>
            <nav className="mg-navlinks">
              <a href="#mg-menu">Karte</a>
              <a href="#mg-reservierung">Reservieren</a>
              <a href="#mg-lieferung">Lieferung</a>
              <a href="#mg-kontakt">Kontakt</a>
            </nav>
            <div className="mg-nav-cta">
              {navOrder && renderCta(navOrder, "gold", "nav-order")}
              {navReserve && renderCta(navReserve, "primary", "nav-reserve")}
            </div>
          </div>
        </header>

        <main id="mg-top" ref={sectionsRef}>
          <section className="mg-hero mg-wrap">
            <div className="mg-live"><span className="pulse"></span><span>{liveText}</span></div>
            <h1 className="mg-hero-name">{brandName}</h1>
            <p className="mg-hero-tag">
              {taglineParts.map((part, i) => {
                const last = i === taglineParts.length - 1;
                return <span key={i} style={last ? { color: "var(--mg-ember-2)" } : undefined}>{part}{!last && " "}</span>;
              })}
            </p>
            <p className="mg-hero-intro">{intro}</p>
            <div className="mg-hero-actions">
              {ctaButtons.map((b, i) =>
                renderCta(b, i === 0 ? "primary" : i === 1 ? "gold" : "ghost", `hero-${i}`)
              )}
            </div>
            <div className="mg-hero-strip">
              <div className={`mg-photo ${heroImage ? 'has-img' : ''}`} style={heroImage ? { backgroundImage: `url('${heroImage}')` } : undefined}>
                <span className="mg-fill"></span>
                <span className="mg-num">01</span>
                <span className="mg-tag">Heute frisch</span>
              </div>
              <div className={`mg-photo ${gallery[0] ? 'has-img' : ''}`} style={gallery[0] ? { backgroundImage: `url('${gallery[0]}')` } : undefined}>
                <span className="mg-fill"></span>
                <span className="mg-num">02</span>
                <span className="mg-tag">Signature</span>
              </div>
              <div className="mg-hero-meta">
                <div>
                  <div className="lbl">Heute geöffnet</div>
                  <div className="hours">{heroHours}</div>
                </div>
                <div style={{ fontSize: 13, opacity: .9 }}>{city} · {address}</div>
              </div>
            </div>
          </section>

          {menu.length > 0 && (
            <section className="mg-section mg-wrap" id="mg-menu">
              <div className="mg-sec-head">
                <div>
                  <div className="mg-eyebrow">Frisch aus der Küche</div>
                  <h2 className="mg-sec-title">Unsere <span className="em">Karte</span></h2>
                </div>
                <a href={orderHref} className="mg-btn mg-btn-ghost">Ganze Karte ↗</a>
              </div>
              <div className="mg-cards">
                {menu.map((m, i) => (
                  <a key={i} className="mg-card" href={orderHref}>
                    <div className={`mg-photo ${m.img ? 'has-img' : ''}`} style={m.img ? { backgroundImage: `url('${m.img}')` } : undefined}>
                      <span className="mg-fill"></span>
                      <span className="mg-num">0{i+1}</span>
                      {!m.img && <span className="mg-ico">{m.ico}</span>}
                      <span className="mg-tag">Spezialität</span>
                    </div>
                    <div className="mg-card-body">
                      <h3>{m.name}</h3>
                      <p>{m.desc}</p>
                      <div className="mg-card-foot">
                        <span className="mg-price">{m.price}</span>
                        <span className="mg-round">↗</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          <section className="mg-statement mg-wrap reveal">
            <h2>
              <span className="out">Pasta</span> aus dem <span className="em">Feuer</span><br />
              der Tradition.
            </h2>
            <p>Kein Schnickschnack. Frischer Teig, ehrliche Saucen, ausgewählte Zutaten — und der Mut, Dinge stundenlang köcheln zu lassen, bis sie perfekt sind.</p>
          </section>

          <section className="mg-section mg-wrap">
            <div className="mg-story reveal">
              <div className={`mg-photo ${gallery[1] ? 'has-img' : ''}`} style={gallery[1] ? { backgroundImage: `url('${gallery[1]}')` } : undefined}>
                <span className="mg-fill"></span>
                {!gallery[1] && <span className="mg-ico">👨‍🍳</span>}
                <span className="mg-tag">Unsere Küche</span>
              </div>
              <div className="mg-story-text">
                <div className="mg-eyebrow">Über uns</div>
                <h2>{storyTitle}</h2>
                <p>{storyText}</p>
                <div className="mg-stat-row">
                  {stats.map((s, i) => (
                    <div key={i} className="mg-stat">
                      <div className="n">{s.n}</div>
                      <div className="l">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mg-section mg-wrap" id="mg-reservierung">
            <div className="mg-reserve reveal">
              <div>
                <div className="mg-eyebrow" style={{ color: 'var(--mg-gold)' }}>Tisch sichern</div>
                <h2>Sichere<br />dir deinen <span className="em">Platz</span></h2>
                <p>Plane deinen Besuch im Voraus. Schick uns deine Anfrage — wir bestätigen dir den besten Tisch in Kürze.</p>
                <div style={{ marginTop: 28 }}>
                  <button type="button" onClick={openResv} className="mg-btn mg-btn-primary">Tisch reservieren ↗</button>
                </div>
              </div>
              <div style={{ background: 'var(--mg-bg)', border: '1px solid var(--mg-line)', borderRadius: 16, padding: 28 }}>
                <div className="mg-eyebrow" style={{ marginBottom: 16 }}>Öffnungszeiten</div>
                {hoursLines.map((line, i) => (
                  <p key={i} style={{ color: 'var(--mg-cream)', fontSize: 17, marginBottom: 4 }}>{line}</p>
                ))}
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--mg-line)' }}>
                  <div className="mg-eyebrow" style={{ marginBottom: 16 }}>Direkt fragen</div>
                  <a href={`mailto:${mail}`} style={{ color: 'var(--mg-cream)', textDecoration: 'underline' }}>{mail}</a>
                </div>
              </div>
            </div>
          </section>

          <section className="mg-section mg-wrap" id="mg-lieferung">
            <div className="mg-deliver reveal">
              <div className={`mg-photo ${gallery[2] ? 'has-img' : ''}`} style={gallery[2] ? { backgroundImage: `url('${gallery[2]}')` } : undefined}>
                <span className="mg-fill"></span>
                {!gallery[2] && <span className="mg-ico">🛵</span>}
                <span className="mg-tag">Lieferung</span>
              </div>
              <div>
                <div className="mg-eyebrow">Direkt zu dir</div>
                <h2>Lieferdienst &amp; Abholung</h2>
                <p>Keine Zeit vorbeizukommen? Bestell online und genieße unsere Pasta zu Hause — frisch geliefert oder bereit zur Abholung.</p>
                <div className="mg-partners">
                  {partners.map((p, i) => (<span key={i} className="mg-partner">🛵 {p}</span>))}
                </div>
                <div style={{ marginTop: 24 }}>
                  <a href={orderHref} className="mg-btn mg-btn-primary">Jetzt bestellen ↗</a>
                </div>
              </div>
            </div>
          </section>

          {gallery.length >= 4 && (
            <section className="mg-section mg-wrap">
              <div className="mg-sec-head">
                <div>
                  <div className="mg-eyebrow">Vom Pass</div>
                  <h2 className="mg-sec-title">Galerie</h2>
                </div>
              </div>
              <div className="mg-gallery reveal">
                {gallery.slice(0, 6).map((src, i) => {
                  const classes = ["mg-photo", "has-img"];
                  if (i === 0) classes.push("mg-g-tall");
                  if (i === 2 || i === 4) classes.push("mg-g-wide");
                  return (
                    <div key={i} className={classes.join(" ")} style={{ backgroundImage: `url('${src}')` }}>
                      <span className="mg-fill"></span>
                      <span className="mg-tag">0{i+1}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </main>

        <footer className="mg-footer" id="mg-kontakt">
          <div className="mg-wrap">
            <div className="mg-foot-top">
              <div className="mg-foot-brand">
                <div className="mg-logo">
                  {logoUrl ? (
                    <img src={logoUrl} alt={brandName} style={{ height: 60, width: "auto", maxWidth: 260, objectFit: "contain", display: "block" }} />
                  ) : (
                    <>{brandName}<span className="dot"></span></>
                  )}
                </div>
                <p>{intro}</p>
              </div>
              <div className="mg-foot-col">
                <h4>Öffnungszeiten</h4>
                {hoursLines.map((line, i) => (<p key={i}>{line}</p>))}
              </div>
              <div className="mg-foot-col">
                <h4>Kontakt</h4>
                <p>{address}</p>
                <a href={`tel:${phone}`}>{phone}</a>
                <a href={`mailto:${mail}`}>{mail}</a>
              </div>
              <div className="mg-foot-col">
                <h4>Rechtliches</h4>
                <a href={`/${tenant.slug}/impressum`}>Impressum</a>
                <a href={`/${tenant.slug}/datenschutz`}>Datenschutz</a>
                <a href={`/${tenant.slug}/agb`}>AGB</a>
              </div>
            </div>
            <div className="mg-foot-bottom">
              <span>© {new Date().getFullYear()} {brandName} · Alle Rechte vorbehalten</span>
              <span>Gebaut mit Mise · Branding 10/10</span>
            </div>
          </div>
        </footer>

        {resvOpen && (
          <div className="mg-modal-overlay" onClick={closeResv}>
            <div className="mg-modal" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="mg-modal-x" onClick={closeResv} aria-label="Schließen">✕</button>
              {resvState === "ok" ? (
                <div className="mg-modal-ok">
                  <div className="mg-ok-ico">✓</div>
                  <h3>Anfrage gesendet!</h3>
                  <p>Danke, {form.gast_name.split(" ")[0] || "und bis bald"}. Wir prüfen die Verfügbarkeit und bestätigen deinen Tisch in Kürze{form.gast_email ? " per E-Mail" : ""}.</p>
                  <button type="button" className="mg-btn mg-btn-primary" onClick={closeResv}>Schließen</button>
                </div>
              ) : (
                <form onSubmit={submitResv} className="mg-modal-form">
                  <div className="mg-eyebrow" style={{ color: "var(--mg-gold)" }}>Tisch sichern</div>
                  <h3>Tisch reservieren</h3>
                  <p className="mg-modal-sub">Bei {brandName} in {city}. Wir bestätigen deine Anfrage schnellstmöglich.</p>

                  <input className="mg-inp" placeholder="Dein Name *" value={form.gast_name} onChange={(e) => setF("gast_name", e.target.value)} required />
                  <div className="mg-row">
                    <input className="mg-inp" type="tel" placeholder="Telefon" value={form.gast_telefon} onChange={(e) => setF("gast_telefon", e.target.value)} />
                    <input className="mg-inp" type="email" placeholder="E-Mail" value={form.gast_email} onChange={(e) => setF("gast_email", e.target.value)} />
                  </div>
                  <div className="mg-row">
                    <label className="mg-lab">Datum *<input className="mg-inp" type="date" value={form.datum} onChange={(e) => setF("datum", e.target.value)} required /></label>
                    <label className="mg-lab">Uhrzeit *<input className="mg-inp" type="time" value={form.zeit_von} onChange={(e) => setF("zeit_von", e.target.value)} required /></label>
                    <label className="mg-lab">Personen *
                      <select className="mg-inp" value={form.gast_anzahl} onChange={(e) => setF("gast_anzahl", Number(e.target.value))}>
                        {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n}</option>)}
                        <option value={12}>12+</option>
                      </select>
                    </label>
                  </div>
                  <textarea className="mg-inp" placeholder="Anmerkung (optional) — z.B. Hochstuhl, Allergie, Anlass" value={form.notiz} onChange={(e) => setF("notiz", e.target.value)} rows={2} />
                  <input className="mg-hp" tabIndex={-1} autoComplete="off" value={form.hp} onChange={(e) => setF("hp", e.target.value)} />

                  {resvErr && <p className="mg-modal-err">{resvErr}</p>}
                  <button type="submit" className="mg-btn mg-btn-primary" disabled={resvState === "sending"} style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>
                    {resvState === "sending" ? "Senden…" : "Anfrage senden ↗"}
                  </button>
                  <p className="mg-modal-fine">Anfrage unverbindlich · Bestätigung folgt durch das Restaurant</p>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
