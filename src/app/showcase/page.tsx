"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Lenis from "lenis";
import CountUp from "react-countup";

/* ============================================================
   ANIMATION SHOWCASE PAGE
   Open at /showcase — preview animations to pick for final landing.
============================================================ */

export default function ShowcasePage() {
  return (
    <main className="relative min-h-screen bg-zinc-950 text-zinc-50 selection:bg-lime-400/40">
      <SmoothScroll />
      <CustomCursor />
      <ScrollProgress />
      <NoiseOverlay />

      <NavBar />

      <SectionHero />
      <SectionMagnetic />
      <SectionParallax />
      <SectionCountUp />
      <SectionDrawSVG />
      <SectionStaggerCards />
      <SectionFinal />
    </main>
  );
}

/* ============================================================
   1. SMOOTH SCROLL (Lenis)
============================================================ */

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

/* ============================================================
   2. CUSTOM CURSOR (dot follower with magnetic pull)
============================================================ */

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { damping: 25, stiffness: 350 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", moveCursor);

    const hoverables = document.querySelectorAll(
      "a, button, [data-cursor-hover]"
    );
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{ x, y }}
      >
        <motion.div
          className="rounded-full bg-lime-400 mix-blend-difference"
          animate={{
            width: isHovering ? 48 : 16,
            height: isHovering ? 48 : 16,
            x: isHovering ? -16 : 0,
            y: isHovering ? -16 : 0,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        />
      </motion.div>
      <style jsx global>{`
        @media (min-width: 768px) {
          body {
            cursor: none;
          }
          a, button, [data-cursor-hover] {
            cursor: none;
          }
        }
      `}</style>
    </>
  );
}

/* ============================================================
   3. SCROLL PROGRESS BAR (top of viewport)
============================================================ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-lime-400 origin-left z-[9998]"
      style={{ scaleX }}
    />
  );
}

/* ============================================================
   4. NOISE OVERLAY (subtle film grain)
============================================================ */

function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9997] opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

/* ============================================================
   NAV
============================================================ */

function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 backdrop-blur-md bg-zinc-950/40">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <span className="font-bold text-lg tracking-tight">EcomArtem</span>
        <div className="hidden md:flex gap-8 text-sm text-zinc-400">
          <a href="#hero" className="hover:text-lime-400 transition-colors">Hero</a>
          <a href="#magnetic" className="hover:text-lime-400 transition-colors">Magnetic</a>
          <a href="#parallax" className="hover:text-lime-400 transition-colors">Parallax</a>
          <a href="#countup" className="hover:text-lime-400 transition-colors">CountUp</a>
          <a href="#drawsvg" className="hover:text-lime-400 transition-colors">DrawSVG</a>
          <a href="#cards" className="hover:text-lime-400 transition-colors">Cards</a>
        </div>
        <button
          className="px-4 py-2 bg-lime-400 text-zinc-950 rounded-full text-sm font-medium hover:bg-lime-300 transition-colors"
          data-cursor-hover
        >
          Book a call →
        </button>
      </div>
    </nav>
  );
}

/* ============================================================
   SECTION 1 — HERO (word-by-word stagger reveal)
============================================================ */

function SectionHero() {
  const headline = "Most agencies talk AI. We ship AI.".split(" ");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Subtle gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(132, 204, 22, 0.08), transparent 50%), radial-gradient(circle at 70% 80%, rgba(132, 204, 22, 0.05), transparent 50%)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.span
          className="inline-block px-4 py-1.5 mb-8 text-xs font-mono uppercase tracking-widest text-lime-400 border border-lime-400/30 rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          [ Animation Showcase ]
        </motion.span>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight">
          {headline.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto"
        >
          Word-by-word stagger reveal · spring easing · blur transition · subtle gradient mesh background
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
          className="mt-12"
        >
          <a
            href="#magnetic"
            className="inline-block text-sm text-zinc-500 hover:text-lime-400 transition-colors"
          >
            Scroll to next ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 2 — MAGNETIC BUTTON
============================================================ */

function SectionMagnetic() {
  return (
    <section
      id="magnetic"
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
    >
      <SectionLabel index="02" name="Magnetic Button" />

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Magnetic CTA + Reverse Fill
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Button gravitates toward cursor (60px radius). Hover triggers reverse-fill animation.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <MagneticButton variant="primary">Book a 20-min call →</MagneticButton>
        <MagneticButton variant="secondary">Get free assessment</MagneticButton>
      </div>
    </section>
  );
}

function MagneticButton({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 15, stiffness: 150 });
  const springY = useSpring(y, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClasses =
    "relative px-8 py-4 rounded-full font-medium text-base overflow-hidden group";
  const variantClasses =
    variant === "primary"
      ? "bg-lime-400 text-zinc-950"
      : "border border-zinc-700 text-zinc-50";

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${variantClasses}`}
      data-cursor-hover
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" ? (
        <motion.span
          className="absolute inset-0 bg-zinc-950"
          initial={{ x: "100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      ) : (
        <motion.span
          className="absolute inset-0 bg-lime-400"
          initial={{ x: "-100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      {variant === "secondary" && (
        <motion.span
          className="absolute inset-0 z-20 flex items-center justify-center text-zinc-950 font-medium"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {children}
        </motion.span>
      )}
    </motion.button>
  );
}

/* ============================================================
   SECTION 3 — PARALLAX DEPTH
============================================================ */

function SectionParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);

  return (
    <section
      id="parallax"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <SectionLabel index="03" name="Parallax Depth" />

      <motion.div
        className="absolute -z-30 text-[20vw] font-black text-zinc-900 select-none"
        style={{ y: yBg }}
      >
        DEEP
      </motion.div>

      <motion.div
        className="absolute -z-20 text-[12vw] font-bold text-zinc-800 select-none"
        style={{ y: yMid }}
      >
        Mid layer
      </motion.div>

      <motion.div
        className="relative z-10 text-center"
        style={{ y: yFg }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Parallax Depth Layers
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          3 layers move at different speeds (0.3x / 0.6x / 0.9x scroll). Creates 3D depth without WebGL.
        </p>
      </motion.div>
    </section>
  );
}

/* ============================================================
   SECTION 4 — COUNT-UP NUMBERS
============================================================ */

function SectionCountUp() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { number: 5, suffix: "+", label: "Stores managed in US", sub: "Since 2019" },
    { number: 8.4, prefix: "$", suffix: "M+", decimals: 1, label: "Total ad spend managed", sub: "Across Meta, Google, Pinterest" },
    { number: 47, suffix: "%", label: "Average ROAS uplift", sub: "Within 90 days" },
  ];

  return (
    <section
      id="countup"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
    >
      <SectionLabel index="04" name="Count-up on scroll" />

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          We spend our own money on Meta every day.
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Numbers count from 0 to value with easeOutExpo when section enters viewport.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="p-8 border border-zinc-800 rounded-2xl bg-zinc-900/30 backdrop-blur-sm"
          >
            <div className="text-5xl md:text-6xl font-bold tracking-tight mb-2 font-mono">
              {inView && (
                <CountUp
                  start={0}
                  end={stat.number}
                  duration={2.5}
                  decimals={stat.decimals || 0}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              )}
            </div>
            <div className="text-sm text-zinc-300 font-medium mb-1">{stat.label}</div>
            <div className="text-xs text-zinc-500">{stat.sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 5 — SVG DRAW-ON (Founder-Led AI Loop preview)
============================================================ */

function SectionDrawSVG() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="drawsvg"
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      <SectionLabel index="05" name="SVG draw-on (loop)" />

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          The Founder-Led AI Loop
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Circular SVG path draws stroke-by-stroke when section enters viewport.
        </p>
      </div>

      <svg
        viewBox="0 0 600 600"
        className="w-full max-w-2xl"
        fill="none"
        stroke="currentColor"
      >
        <motion.circle
          cx="300"
          cy="300"
          r="240"
          stroke="rgb(132 204 22)"
          strokeWidth="2"
          strokeDasharray="0 1"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
        />
        {[
          { x: 300, y: 60, label: "1. Your data" },
          { x: 540, y: 300, label: "2. AI workflow" },
          { x: 300, y: 540, label: "3. Ship" },
          { x: 60, y: 300, label: "4. Founder oversight" },
        ].map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="8"
              fill="rgb(132 204 22)"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.4 }}
            />
            <motion.text
              x={node.x}
              y={node.y + (i === 0 ? -25 : i === 2 ? 35 : 5)}
              textAnchor="middle"
              fill="rgb(244 244 245)"
              fontSize="16"
              fontWeight="600"
              fontFamily="var(--font-geist-sans)"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.4 }}
            >
              {node.label}
            </motion.text>
          </g>
        ))}
      </svg>
    </section>
  );
}

/* ============================================================
   SECTION 6 — STAGGER CARDS GRID (services preview)
============================================================ */

function SectionStaggerCards() {
  const services = [
    { tag: "Launch", title: "Shopify Launch", price: "From $8,000" },
    { tag: "Growth", title: "AI Performance Marketing", price: "$3,500/mo" },
    { tag: "Growth", title: "Shopify Ops Automation", price: "$1,500/mo" },
    { tag: "Growth", title: "AI Customer Experience", price: "$3,000/mo" },
    { tag: "Scale", title: "Shopify Migration", price: "From $5,000" },
    { tag: "Scale", title: "SEO & GEO", price: "$2,500/mo" },
  ];

  return (
    <section
      id="cards"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32"
    >
      <SectionLabel index="06" name="Stagger Cards + Hover Lift" />

      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Services Grid
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto">
          Cards stagger-reveal on scroll. Hover = lift 12px + lime border glow + price scale.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            whileHover={{ y: -12 }}
            className="group p-8 border border-zinc-800 rounded-2xl bg-zinc-900/40 backdrop-blur-sm hover:border-lime-400/50 transition-colors duration-300"
            data-cursor-hover
          >
            <div className="text-xs font-mono uppercase tracking-widest text-lime-400 mb-4">
              [ {s.tag} ↘ ]
            </div>
            <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
            <motion.div
              className="text-3xl font-mono font-bold tracking-tight text-zinc-300 group-hover:text-lime-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              {s.price}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 7 — FINAL CTA
============================================================ */

function SectionFinal() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-32">
      <SectionLabel index="07" name="Final" />

      <div className="text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
        >
          Like what you see?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-lg text-zinc-400 mb-12"
        >
          Tell me which animations to keep — I&apos;ll apply them to the production landing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <MagneticButton variant="primary">Pick animations →</MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   HELPER — Section label
============================================================ */

function SectionLabel({ index, name }: { index: string; name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="absolute top-32 left-6 md:left-12 text-xs font-mono uppercase tracking-widest text-zinc-600"
    >
      <span className="text-lime-400">[{index}]</span> {name}
    </motion.div>
  );
}
