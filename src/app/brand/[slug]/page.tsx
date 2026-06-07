import { loadFrankyBundle } from "@/lib/load-tenant";
import { notFound } from "next/navigation";
import { ThemeWrap } from "@/components/storefront/ThemeWrap";
import { BrandPageClient } from "./BrandPageClient";

export const dynamic = "force-dynamic";

interface BrandPageData {
  enabled?: boolean;
  hero?: { title?: string; subtitle?: string; image_url?: string; video_url?: string; overlay_opacity?: number };
  buttons?: { id: string; label: string; url: string; icon?: string }[];
  about?: { title?: string; text?: string };
  gallery?: string[];
  contact?: { address?: string; phone?: string; email?: string; hours?: string };
  press?: string[];
  why_us?: { title: string; text: string }[];
}

/**
 * Auto-generiert sinnvolle Defaults aus Menu + Location wenn brand_page leer ist.
 * Jedes neue Restaurant bekommt sofort eine vollständige Brand-Page.
 */
function autoFillBrandPage(bundle: any): BrandPageData {
  const tenant = bundle.tenant;
  const products = bundle.products ?? [];
  const categories = bundle.categories ?? [];
  const existing = (tenant.storefront_settings?.brand_page ?? {}) as BrandPageData;

  // Galerie: Top 8 Items mit Bildern (priorisiere beliebte)
  const galleryFromMenu = products
    .filter((p: any) => p.bild_url)
    .sort((a: any, b: any) => (b.beliebt ? 1 : 0) - (a.beliebt ? 1 : 0))
    .slice(0, 8)
    .map((p: any) => p.bild_url);

  // Hero-Bild: top beliebtes Item oder erstes Item
  const heroImage = products.find((p: any) => p.beliebt && p.bild_url)?.bild_url
                  ?? products.find((p: any) => p.bild_url)?.bild_url
                  ?? tenant.hero_image_url;

  // Subtitle: aus Kategorien ableiten
  const categoryNames = categories.map((c: any) => c.name).slice(0, 3).join(" · ");
  const autoSubtitle = categoryNames
    ? `${categoryNames}. Frisch ${tenant.stadt ? "in " + tenant.stadt : "gemacht"}.`
    : `Frisch gemacht ${tenant.stadt ? "in " + tenant.stadt : ""}.`;

  // Storefront-URL (Lieferung): /Pasta-Aachen oder /biss-app/<slug>
  const orderUrl = tenant.storefront_settings?.public_url ?? `/biss-app/${tenant.slug}`;

  return {
    enabled: existing.enabled ?? true,
    hero: {
      title: existing.hero?.title ?? tenant.name,
      subtitle: existing.hero?.subtitle ?? autoSubtitle,
      image_url: existing.hero?.image_url ?? heroImage,
      video_url: existing.hero?.video_url,
      overlay_opacity: existing.hero?.overlay_opacity ?? 0.65,
    },
    // Buttons NICHT auto-befüllen — BrandPageClient nutzt eigene Defaults wenn leer.
    // So bleiben die handgemachten CTA-Defaults erhalten, bis der Owner im Backoffice eigene setzt.
    buttons: existing.buttons && existing.buttons.length > 0 ? existing.buttons : undefined,
    about: existing.about ?? {
      title: `Echt ${tenant.stadt ? tenant.stadt + "er" : ""} ${categoryNames ? categoryNames.split(" · ")[0] : "Genuss"} — handgemacht`,
      text: `Bei ${tenant.name} machen wir alles selbst. Frische Zutaten, lange perfektionierte Rezepte, echte Handarbeit. Probier dich durch unsere Karte — du wirst den Unterschied schmecken.`,
    },
    gallery: (existing.gallery && existing.gallery.length > 0)
      ? existing.gallery
      : galleryFromMenu,
    contact: {
      address: existing.contact?.address ?? (tenant.adresse ? `${tenant.adresse}\n${tenant.plz ?? ""} ${tenant.stadt ?? ""}`.trim() : undefined),
      phone: existing.contact?.phone ?? tenant.telefon ?? undefined,
      email: existing.contact?.email,
      hours: existing.contact?.hours,
    },
    press: existing.press,
    why_us: existing.why_us,
  };
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bundle = await loadFrankyBundle(slug);
  if (!bundle?.tenant) notFound();

  // Auto-fill mit Menu-Daten falls Felder leer
  const autoBrand = autoFillBrandPage(bundle);
  const enrichedTenant = {
    ...bundle.tenant,
    storefront_settings: {
      ...(bundle.tenant.storefront_settings ?? {}),
      brand_page: autoBrand,
    },
  };

  // Owner-Farben + Logo + Bestell-Link an die Brand-Page durchreichen.
  // WICHTIG: Brand-Page-Farbe kommt NUR aus storefront_settings.theme (vom Brand-Editor gesetzt).
  // NICHT aus der Legacy-Spalte tenant.theme_primary (= Storefront-Farbe), sonst änderte sich
  // jede bestehende Brand-Page ungewollt. Kein Theme gesetzt = Orange-Fallback im Client.
  const theme = bundle.tenant.storefront_settings?.theme ?? {};
  const primary = theme.primary ?? null;
  const accent = theme.accent ?? null;
  const logoUrl = bundle.tenant.logo_url ?? null;
  // Bestell-Link: erst expliziter order_url, sonst der vom Owner konfigurierte Bestell-Button
  // (z. B. /Pasta-Aachen bei maskierter Domain), sonst Subpath-Fallback. Kein DB-Eingriff nötig.
  const cfgButtons = (bundle.tenant.storefront_settings?.brand_page?.buttons ?? []) as { url?: string; id?: string }[];
  const orderBtn = cfgButtons.find(
    (b) => b.id !== 'reserve' && b.url && !b.url.startsWith('#') && !/^(tel:|mailto:)/i.test(b.url),
  );
  const orderUrl = orderBtn?.url ?? `/biss-app/${bundle.tenant.slug}`;

  return (
    <ThemeWrap
      primaryColor={theme.primary ?? bundle.tenant.theme_primary}
      accentColor={theme.accent ?? bundle.tenant.theme_accent}
      backgroundColor={theme.background}
    >
      <BrandPageClient
        tenant={enrichedTenant}
        products={bundle.products ?? []}
        primary={primary}
        accent={accent}
        logoUrl={logoUrl}
        orderUrl={orderUrl}
      />
    </ThemeWrap>
  );
}
