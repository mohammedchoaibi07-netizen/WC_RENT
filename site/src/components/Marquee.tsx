import { Icon } from "./Icon";

/**
 * Bande d'infos clef en defilement horizontal continu (contenu duplique une
 * fois pour boucler sans coupure). En pause au survol ; figee et affichee en
 * une seule ligne statique pour prefers-reduced-motion (voir globals.css).
 */
export function Marquee({ items }: { items: Array<{ icon: string; label: string }> }) {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-navy-800 py-3.5">
      <div className="flex w-max animate-marquee gap-10">
        <div className="flex gap-10">
          {items.map((item, i) => (
            <span key={`a-${i}`} className="flex flex-none items-center gap-2 whitespace-nowrap text-[14px] font-semibold text-white">
              <Icon name={item.icon} size={16} className="text-blue-400" />
              {item.label}
            </span>
          ))}
        </div>
        <div className="marquee-duplicate flex gap-10" aria-hidden="true">
          {items.map((item, i) => (
            <span key={`b-${i}`} className="flex flex-none items-center gap-2 whitespace-nowrap text-[14px] font-semibold text-white">
              <Icon name={item.icon} size={16} className="text-blue-400" />
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
