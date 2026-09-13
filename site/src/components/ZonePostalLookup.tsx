"use client";

import { useState } from "react";
import { TextField } from "./TextField";
import { api, type ZoneLookupResult } from "@/lib/api";
import { PROVINCE_ARTICLE, PROVINCE_LABELS } from "@/lib/content";

export function ZonePostalLookup() {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<ZoneLookupResult | null>(null);
  const [checked, setChecked] = useState(false);

  function handleChange(value: string) {
    setZip(value);
    setChecked(false);
    setResult(null);
    if (/^\d{4}$/.test(value)) {
      api
        .get<ZoneLookupResult>(`/zones/lookup?zip=${value}`, 8000)
        .then((r) => setResult(r))
        .catch(() => setResult({ province: null, deliveryDelayHours: null }))
        .finally(() => setChecked(true));
    }
  }

  return (
    <div className="grid max-w-xs gap-2">
      <TextField label="Votre code postal" placeholder="4000" value={zip} onChange={handleChange} />
      {checked && (
        <p className="m-0 text-[14px] text-grey-700">
          {result?.province
            ? `Votre code postal est en province ${PROVINCE_ARTICLE[result.province]}${PROVINCE_LABELS[result.province]}. Livraison sous ${result.deliveryDelayHours}h.`
            : "Code postal non reconnu — contactez-nous pour vérifier la desserte."}
        </p>
      )}
    </div>
  );
}
