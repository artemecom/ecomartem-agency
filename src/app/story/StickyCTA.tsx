"use client";

import { useEffect, useState } from "react";

/**
 * Floating CTA that rides along the scroll on this long-form advertorial.
 * Appears after the hero, hides when the apply form is in view.
 */
export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = window.innerHeight + y > document.body.scrollHeight - 800;
      setShow(y > 600 && !nearBottom);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <a
        href="#apply"
        className="w-full max-w-md rounded-full bg-lime-400 px-8 py-4 text-center font-semibold text-zinc-950 shadow-xl shadow-lime-400/25 transition-colors hover:bg-lime-300"
      >
        Apply - get your store built →
      </a>
    </div>
  );
}
