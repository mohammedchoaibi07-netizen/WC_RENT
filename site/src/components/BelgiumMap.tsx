"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { api, type Province, type ZoneInfo } from "@/lib/api";
import { PROVINCE_LABELS } from "@/lib/content";
import { PROVINCE_PATHS, PROVINCE_VIEWBOX, SMALL_PROVINCE_CENTROIDS } from "@/lib/provincePaths";

const SMALL_PROVINCES = Object.keys(SMALL_PROVINCE_CENTROIDS) as Province[];
const NORMAL_PROVINCES = (Object.keys(PROVINCE_PATHS) as Province[]).filter(
  (c) => !SMALL_PROVINCES.includes(c),
);

export function BelgiumMap() {
  const [zones, setZones] = useState<Partial<Record<Province, 24 | 48>> | null>(null);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<Province | null>(null);

  useEffect(() => {
    api
      .get<ZoneInfo[]>("/zones", 8000)
      .then((data) => {
        const map: Partial<Record<Province, 24 | 48>> = {};
        data.forEach((z) => {
          map[z.province] = z.deliveryDelayHours;
        });
        setZones(map);
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <p className="m-0 text-[16px] text-grey-500">Carte indisponible pour le moment — contactez-nous.</p>;
  }

  if (!zones) {
    return <p className="m-0 text-[16px] text-grey-500">Chargement de la carte...</p>;
  }

  const selectOnKey = (code: Province) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelected(code);
    }
  };
  const fillClass = (code: Province) => (zones[code] === 48 ? "fill-navy-700" : "fill-blue-100");
  const strokeClass = (code: Province) => (selected === code ? "stroke-blue-500 stroke-2" : "stroke-white");

  const region = (code: Province, extraCircle?: { x: number; y: number }) => (
    <a
      key={code}
      href="#"
      role="button"
      tabIndex={0}
      aria-label={`${PROVINCE_LABELS[code]}, livraison sous ${zones[code]}h`}
      onClick={(e) => {
        e.preventDefault();
        setSelected(code);
      }}
      onKeyDown={selectOnKey(code)}
      className="cursor-pointer outline-none"
    >
      <path d={PROVINCE_PATHS[code]} className={`${fillClass(code)} ${strokeClass(code)} transition-colors`} strokeWidth={selected === code ? 2 : 0.6} />
      {/* Zone tactile invisible agrandie : garantit ≥44px de rayon quelle
          que soit la taille réelle de la forme. Posée en dernier dans le
          document pour gagner le hit-test sur un chevauchement avec une
          province voisine plus grande (ex. Bruxelles dans le Brabant
          flamand) — voir provincePaths.ts pour la liste des provinces
          concernées, trouvée par mesure M-02 réelle, pas par supposition. */}
      {extraCircle && <circle cx={extraCircle.x} cy={extraCircle.y} r={45} fill="transparent" pointerEvents="all" />}
    </a>
  );

  return (
    <div className="grid gap-4">
      <svg
        viewBox={PROVINCE_VIEWBOX}
        className="w-full max-w-xl"
        role="img"
        aria-label="Carte des provinces belges, coloriée par délai de livraison"
      >
        {NORMAL_PROVINCES.map((code) => region(code))}
        {SMALL_PROVINCES.map((code) => region(code, SMALL_PROVINCE_CENTROIDS[code]))}
      </svg>

      <div className="flex flex-wrap items-center gap-4 text-[14px] font-semibold text-navy-800">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full border border-grey-200 bg-blue-100" />
          Livraison sous 24h
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-navy-700" />
          Livraison sous 48h
        </span>
      </div>

      {selected && (
        <p className="m-0 text-[16px] text-grey-700">
          {PROVINCE_LABELS[selected]} : livraison sous {zones[selected]}h.
        </p>
      )}
    </div>
  );
}
