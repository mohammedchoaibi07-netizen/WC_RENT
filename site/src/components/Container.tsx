import type { ReactNode } from "react";

/**
 * Centre le contenu et applique la gouttiere responsive du design system
 * (20px mobile / 40px desktop). "wide" (1320px) pour la quasi-totalite des
 * sections — c'est la largeur par defaut. "narrow" (840px) reste reserve
 * aux formulaires et aux blocs de lecture ou une ligne trop longue nuit a
 * la lisibilite (assistant de reservation, panneaux de synthese).
 */
export function Container({
  children,
  className,
  size = "wide",
}: {
  children: ReactNode;
  className?: string;
  size?: "wide" | "narrow";
}) {
  const maxWidth = size === "wide" ? "max-w-[1320px]" : "max-w-[840px]";
  return <div className={`mx-auto w-full ${maxWidth} px-5 md:px-10 ${className ?? ""}`}>{children}</div>;
}
