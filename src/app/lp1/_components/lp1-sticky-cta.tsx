"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only bottom bar linking to the form; hidden while the form itself
 * is on screen. Label comes from the server (lp1.sticky.cta).
 */
export function Lp1StickyCta({ label, targetId }: { label: string; targetId: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setHidden(entry.isIntersecting)),
      { threshold: 0.15 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  if (!label) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-gold/25 bg-forest/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-transform duration-200 lg:hidden ${hidden ? "translate-y-[110%]" : ""}`}
    >
      <a
        href={`#${targetId}`}
        className="block rounded-full bg-gold py-3.5 text-center text-sm font-semibold tracking-wide text-forest"
      >
        {label}
      </a>
    </div>
  );
}
