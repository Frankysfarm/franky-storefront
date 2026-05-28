"use client";

import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function InfoModal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 z-[130] bg-black/40" onClick={onClose} />
      <div className="fixed inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-lg sm:max-h-[80vh] z-[131] bg-bone rounded-2xl flex flex-col shadow-xl animate-[reveal-up_0.25s_ease-out]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h2 className="font-display font-bold text-lg text-sage-dark">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 text-sm text-sage-dark leading-relaxed">
          {children}
        </div>
      </div>
    </>
  );
}

export function ImpressumModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <InfoModal open={open} onClose={onClose} title="Impressum">
      <div className="space-y-4">
        <div>
          <h3 className="font-bold mb-1">Angaben gemäß § 5 TMG</h3>
          <p>Franky's Pasta<br />
          [Straße + Hausnummer]<br />
          52062 Aachen</p>
        </div>
        <div>
          <h3 className="font-bold mb-1">Kontakt</h3>
          <p>Telefon: 0241 / [DEIN-TEL]<br />
          E-Mail: info@frankys-pasta.de</p>
        </div>
        <div>
          <h3 className="font-bold mb-1">Umsatzsteuer-ID</h3>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: [UST-ID]</p>
        </div>
        <div>
          <h3 className="font-bold mb-1">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
          <p>[Name des Verantwortlichen]<br />
          [Adresse]</p>
        </div>
      </div>
    </InfoModal>
  );
}

export function DatenschutzModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <InfoModal open={open} onClose={onClose} title="Datenschutzerklärung">
      <div className="space-y-4">
        <div>
          <h3 className="font-bold mb-1">1. Datenschutz auf einen Blick</h3>
          <p>Die folgenden Hinweise geben einen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
        </div>
        <div>
          <h3 className="font-bold mb-1">2. Datenerfassung auf dieser Website</h3>
          <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber (Franky's Pasta, Aachen). Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. Bestelldaten, Lieferadresse). Andere Daten werden automatisch beim Besuch der Website erfasst (z.B. Browser, Betriebssystem, Uhrzeit).</p>
        </div>
        <div>
          <h3 className="font-bold mb-1">3. Bestelldaten</h3>
          <p>Bei einer Bestellung erheben wir: Name, Adresse, Telefonnummer, optional E-Mail. Diese Daten werden ausschließlich zur Bestellabwicklung und Lieferung verwendet und nicht an Dritte weitergegeben, es sei denn, dies ist für die Lieferung erforderlich.</p>
        </div>
        <div>
          <h3 className="font-bold mb-1">4. Cookies</h3>
          <p>Diese Website verwendet localStorage zur Speicherung Ihres Warenkorbs. Es werden keine Tracking-Cookies eingesetzt.</p>
        </div>
        <div>
          <h3 className="font-bold mb-1">5. Ihre Rechte</h3>
          <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Kontaktieren Sie uns unter info@frankys-pasta.de.</p>
        </div>
      </div>
    </InfoModal>
  );
}

export function LiefergebietModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const plzBereiche = [
    { plz: "52062", name: "Aachen-Mitte" },
    { plz: "52064", name: "Aachen-Mitte" },
    { plz: "52066", name: "Aachen-Süd" },
    { plz: "52068", name: "Aachen-Nord" },
    { plz: "52070", name: "Aachen-Ost" },
    { plz: "52072", name: "Aachen-Laurensberg" },
    { plz: "52074", name: "Aachen-Richterich" },
    { plz: "52076", name: "Aachen-Brand" },
    { plz: "52078", name: "Aachen-Haaren" },
    { plz: "52080", name: "Aachen-Eilendorf" },
  ];

  return (
    <InfoModal open={open} onClose={onClose} title="Liefergebiet & Zeiten">
      <div className="space-y-5">
        <div>
          <h3 className="font-bold mb-2">Wir liefern nach:</h3>
          <div className="grid grid-cols-2 gap-1.5">
            {plzBereiche.map((b) => (
              <div key={b.plz} className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg">
                <span className="font-mono text-xs font-bold text-sage">{b.plz}</span>
                <span className="text-xs text-muted">{b.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-2">Öffnungszeiten</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between"><span>Mo – Fr</span><span className="font-bold">11:00 – 22:00</span></div>
            <div className="flex justify-between"><span>Sa – So</span><span className="font-bold">12:00 – 22:00</span></div>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-2">Lieferkonditionen</h3>
          <div className="space-y-1 text-sm text-muted">
            <div>Mindestbestellwert: <b className="text-sage-dark">15,00 €</b></div>
            <div>Liefergebühr: <b className="text-sage-dark">1,99 €</b> (ab 25 € gratis)</div>
            <div>⌀ Lieferzeit: <b className="text-sage-dark">25 – 35 Min</b></div>
          </div>
        </div>
      </div>
    </InfoModal>
  );
}

export function AllergeneModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <InfoModal open={open} onClose={onClose} title="Allergen-Information">
      <div className="space-y-4">
        <p className="text-muted">Gemäß Lebensmittelinformationsverordnung (LMIV) informieren wir über folgende Allergene in unseren Produkten:</p>
        <div className="space-y-2">
          {[
            { code: "A", name: "Glutenhaltiges Getreide", info: "Weizen (Pasta, Pizza-Teig)" },
            { code: "C", name: "Eier", info: "In Pasta-Teig, Cheesecake" },
            { code: "G", name: "Milch/Laktose", info: "Sahne, Käse, Béchamel — laktosefreie Optionen verfügbar" },
            { code: "H", name: "Schalenfrüchte", info: "Pistazien in Pesto, Desserts, Cookies" },
            { code: "D", name: "Fisch", info: "Thunfisch (Tonno Rossa, White Tuna)" },
            { code: "B", name: "Krebstiere", info: "Garnelen (Gambas El Crema)" },
            { code: "F", name: "Soja", info: "Kann in veganen Produkten enthalten sein" },
            { code: "L", name: "Sellerie", info: "Kann in Suppen/Soßen enthalten sein" },
            { code: "M", name: "Senf", info: "Kann in Dressings enthalten sein" },
          ].map((a) => (
            <div key={a.code} className="flex gap-3 p-2.5 bg-white rounded-lg">
              <span className="w-7 h-7 flex items-center justify-center bg-sage/10 text-sage text-xs font-bold rounded-full flex-shrink-0">
                {a.code}
              </span>
              <div>
                <div className="font-bold text-sage-dark text-sm">{a.name}</div>
                <div className="text-xs text-muted">{a.info}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted">
          Für detaillierte Allergen-Informationen zu einzelnen Gerichten wende dich bitte an unser Team.
          Alle Fleisch-Gerichte sind halal-zertifiziert.
        </p>
      </div>
    </InfoModal>
  );
}
