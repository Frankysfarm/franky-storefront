import { getServerSupabase } from "./supabase";
import type { Product, Category, Tenant, PaymentMethod, OptionGroup } from "./types";
import { MOCK_TENANT, MOCK_CATEGORIES, MOCK_PRODUCTS, MOCK_PAYMENT_METHODS, BESTSELLER_IDS } from "./mock-data";

export interface TenantBundle {
  tenant: Tenant;
  categories: Category[];
  products: Product[];
  paymentMethods: PaymentMethod[];
  bestsellers: string[];
}

export async function loadFrankyBundle(slug: string): Promise<TenantBundle> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    return {
      tenant: MOCK_TENANT,
      categories: MOCK_CATEGORIES,
      products: MOCK_PRODUCTS,
      paymentMethods: MOCK_PAYMENT_METHODS,
      bestsellers: BESTSELLER_IDS,
    };
  }

  try {
    const sb = getServerSupabase();

    const { data: tenantRow, error: tenantErr } = await sb
      .from("tenants")
      .select("id,slug,name,theme_primary,theme_accent,hero_image_url,logo_url,durchschnittliche_lieferzeit_min,mindestbestellwert,liefergebuehr")
      .eq("slug", slug)
      .maybeSingle();

    if (tenantErr) {
      console.error(`Supabase tenant query error:`, tenantErr.message);
    }

    if (!tenantRow) {
      console.warn(`Tenant "${slug}" not found in DB, using mock data`);
      return {
        tenant: MOCK_TENANT,
        categories: MOCK_CATEGORIES,
        products: MOCK_PRODUCTS,
        paymentMethods: MOCK_PAYMENT_METHODS,
        bestsellers: BESTSELLER_IDS,
      };
    }

    const { data: location } = await sb
      .from("locations")
      .select("id,tenant_id,name,adresse,stadt,plz,telefon")
      .eq("tenant_id", tenantRow.id)
      .eq("aktiv", true)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (!location) {
      return {
        tenant: MOCK_TENANT,
        categories: MOCK_CATEGORIES,
        products: MOCK_PRODUCTS,
        paymentMethods: MOCK_PAYMENT_METHODS,
        bestsellers: BESTSELLER_IDS,
      };
    }

    const [{ data: dbCategories }, { data: dbItems }, { data: dbPayments }] = await Promise.all([
      sb.from("menu_categories")
        .select("id,name,icon,sort_order")
        .eq("location_id", location.id)
        .eq("aktiv", true)
        .order("sort_order"),
      sb.from("menu_items")
        .select("id,category_id,name,beschreibung,preis,bild_url,verfuegbar,beliebt,tags,sort_order,option_groups")
        .eq("location_id", location.id)
        .eq("verfuegbar", true)
        .order("sort_order"),
      sb.from("tenant_payment_methods")
        .select("method,label,icon,enabled_lieferung,enabled_abholung,enabled_vor_ort,sort_order")
        .eq("tenant_id", tenantRow.id)
        .order("sort_order"),
    ]);

    const tenant: Tenant = {
      id: tenantRow.id,
      location_id: location.id,
      name: tenantRow.name,
      slug: tenantRow.slug,
      logo_url: tenantRow.logo_url,
      hero_image_url: tenantRow.hero_image_url,
      theme_primary: tenantRow.theme_primary,
      theme_accent: tenantRow.theme_accent,
      mindestbestellwert: Number(tenantRow.mindestbestellwert ?? 15),
      liefergebuehr: Number(tenantRow.liefergebuehr ?? 1.99),
      free_delivery_threshold: 25,
      durchschnittliche_lieferzeit_min: tenantRow.durchschnittliche_lieferzeit_min ?? 28,
      telefon: location.telefon,
      adresse: location.adresse,
      stadt: location.stadt,
    };

    const categories: Category[] = (dbCategories ?? []).map((c: any) => ({
      id: c.id,
      name: c.name,
      icon: c.icon,
      sort_order: c.sort_order,
    }));

    const products: Product[] = (dbItems ?? []).map((item: any) => ({
      id: item.id,
      category_id: item.category_id,
      name: item.name,
      beschreibung: item.beschreibung,
      preis: Number(item.preis),
      bild_url: item.bild_url,
      verfuegbar: item.verfuegbar,
      beliebt: item.beliebt,
      tags: item.tags ?? [],
      badges: item.beliebt ? ["star"] : [],
      rating: 4.5 + ((item.id.charCodeAt(0) ?? 0) % 10) * 0.04,
      sort_order: item.sort_order ?? 0,
      option_groups: (item.option_groups as OptionGroup[]) ?? null,
    }));

    const paymentMethods: PaymentMethod[] = (dbPayments ?? []).map((pm: any) => ({
      method: pm.method,
      label: pm.label,
      icon: pm.icon,
      enabled_lieferung: pm.enabled_lieferung,
    }));

    const bestsellers = products
      .filter((p) => p.beliebt)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6)
      .map((p) => p.id);

    return { tenant, categories, products, paymentMethods, bestsellers };
  } catch (err) {
    console.error("Supabase load failed, falling back to mock:", err);
    return {
      tenant: MOCK_TENANT,
      categories: MOCK_CATEGORIES,
      products: MOCK_PRODUCTS,
      paymentMethods: MOCK_PAYMENT_METHODS,
      bestsellers: BESTSELLER_IDS,
    };
  }
}
