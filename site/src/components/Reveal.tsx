"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fait apparaitre son contenu en fondu + leger glissement vers le haut des
 * qu'il entre dans le viewport (420ms, cubic-bezier(.22,.61,.36,1), comme
 * specifie par le design system). Respecte prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -64px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
      className={`transition-all duration-[420ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        visible ? "is-visible opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
