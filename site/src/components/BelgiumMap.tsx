"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { api, type Province, type ZoneInfo } from "@/lib/api";
import { PROVINCE_LABELS } from "@/lib/content";
import { BRUSSELS_CENTROID, PROVINCE_PATHS, PROVINCE_VIEWBOX } from "@/lib/provincePaths";

const OTHER_PROVINCES = (Object.keys(PROVINCE_PATHS) as Province[]).filter((c) => c !== "BRUXELLES");

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

  const select = (code: Province) => () => setSelected(code);
  const selectOnKey = (code: Province) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelected(code);
    }
  };
  const fillClass = (code: Province) => (zones[code] === 48 ? "fill-navy-700" : "fill-blue-100");
  const strokeClass = (code: Province) => (selected === code ? "stroke-blue-500 stroke-2" : "stroke-white");

  return (
    <div className="grid gap-4">
      <svg
        viewBox={PROVINCE_VIEWBOX}
        className="w-full max-w-xl"
        role="img"
        aria-label="Carte des provinces belges, coloriée par délai de livraison"
      >
        {OTHER_PROVINCES.map((code) => (
          <a
            key={code}
            href="#"
            role="button"
            tabIndex={0}
            aria-label={`${PROVINCE_LABELS[code]}, livraison sous ${zones[code]}h`}
            onClick={(e) => {
              e.preventDefault();
              select(code)();
            }}
            onKeyDown={selectOnKey(code)}
            className="cursor-pointer outline-none"
          >
            <path d={PROVINCE_PATHS[code]} className={`${fillClass(code)} ${strokeClass(code)} transition-colors`} strokeWidth={selected === code ? 2 : 0.6} />
          </a>
        ))}
        {/* Bruxelles en dernier dans le document : sa zone tactile agrandie
            (invisible, 45 unités = ~44px rendus à 390px) gagne le hit-test
            sur le chevauchement avec le Brabant flamand qui l'entoure. */}
        <a
          href="#"
          role="button"
          tabIndex={0}
          aria-label={`Bruxelles-Capitale, livraison sous ${zones.BRUXELLES}h`}
          onClick={(e) => {
            e.preventDefault();
            select("BRUXELLES")();
          }}
          onKeyDown={selectOnKey("BRUXELLES")}
          className="cursor-pointer outline-none"
        >
          <path
            d={PROVINCE_PATHS.BRUXELLES}
            className={`${fillClass("BRUXELLES")} ${strokeClass("BRUXELLES")} transition-colors`}
            strokeWidth={selected === "BRUXELLES" ? 2 : 0.6}
          />
          <circle cx={BRUSSELS_CENTROID.x} cy={BRUSSELS_CENTROID.y} r={45} fill="transparent" pointerEvents="all" />
        </a>
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
