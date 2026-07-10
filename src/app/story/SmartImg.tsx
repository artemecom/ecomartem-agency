"use client";

import { useState } from "react";

/**
 * Renders an <img>, but if the file is missing (404) it degrades to a clean
 * labeled placeholder instead of a broken-image icon. Lets us ship proof/
 * testimonial slots that look intentional until the real asset is dropped in.
 */
export default function SmartImg({
  src,
  alt,
  className = "",
  label,
}: {
  src: string;
  alt: string;
  className?: string;
  label?: string;
}) {
  const [ok, setOk] = useState(true);

  if (!ok) {
    return (
      <div
        className={`flex items-center justify-center border border-dashed border-zinc-300 bg-zinc-100 text-center dark:border-zinc-700 dark:bg-zinc-900/40 ${className}`}
      >
        <span className="px-4 font-mono text-[10px] uppercase leading-relaxed tracking-widest text-zinc-400 dark:text-zinc-500">
          {label ?? "Add image"}
          <br />
          <span className="text-zinc-400 dark:text-zinc-600">{src}</span>
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} loading="lazy" onError={() => setOk(false)} />
  );
}
