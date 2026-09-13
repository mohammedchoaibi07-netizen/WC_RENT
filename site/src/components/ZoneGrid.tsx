"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { Icon } from "./Icon";
import { api, type ZoneInfo } from "@/lib/api";
import { PROVINCE_LABELS } from "@/lib/content";

export function ZoneGrid() {
  const [zones, setZones] = useState<ZoneInfo[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get<ZoneInfo[]>("/zones", 8000)
      .then((data) =>
        setZones(
          [...data].sort((a, b) => PROVINCE_LABELS[a.province].localeCompare(PROVINCE_LABELS[b.province])),
        ),
      )
      .catch(() => setError(true));
  }, []);

  if (error) {
    return <p className="m-0 text-[16px] text-grey-500">Zones indisponibles pour le moment — contactez-nous.</p>;
  }

  if (!zones) {
    return <p className="m-0 text-[16px] text-grey-500">Chargement des zones...</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {zones.map((z, i) => (
        <Reveal key={z.province} delayMs={i * 40}>
          <div className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-grey-200 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(8,43,82,0.08)]">
            <span className="text-[16px] font-bold text-navy-800">{PROVINCE_LABELS[z.province]}</span>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-050 px-2.5 py-1 text-[13px] font-bold text-navy-800">
              <Icon name="truck" size={14} className="text-blue-500" />
              {z.deliveryDelayHours}h
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
