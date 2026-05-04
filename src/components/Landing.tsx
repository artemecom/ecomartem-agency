"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";

/* ==========================================================================
   ICONS
========================================================================== */

type IconName =
  | "arrow"
  | "check"
  | "x"
  | "database"
  | "cpu"
  | "rocket"
  | "eye"
  | "sun"
  | "moon";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "arrow":
      return (
        <svg {...props}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "check":
      return (
        <svg {...props} strokeWidth={2}>
          <path d="M4 12l5 5L20 6" />
        </svg>
      );
    case "x":
      return (
        <svg {...props} strokeWidth={2}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "database":
      return (
        <svg {...props}>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
          <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
        </svg>
      );
    case "cpu":
      return (
        <svg {...props}>
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...props}>
          <path d="M14 14l-4-4M16 7l1-1a4 4 0 015 5l-1 1M7 16l-1 1a4 4 0 005 5l1-1" />
          <path d="M9 15l-3 3M5 19l-1 1M15 9l3-3" />
          <path d="M11 13l-2 2-3-1 1-3 2-2" />
        </svg>
      );
    case "eye":
      return (
        <svg {...props}>
          <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "sun":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      );
    case "moon":
      return (
        <svg {...props}>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      );
    default:
      return null;
  }
}

/* ==========================================================================
   HOOKS — useReveal (intersection observer reveal)
========================================================================== */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            const target = e.target as HTMLElement;
            if (target.dataset.once !== "false") io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ==========================================================================
   HOOKS — useSmoothScroll (lightweight Lenis-style)
========================================================================== */

function useSmoothScroll() {
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let target = window.scrollY;
    let current = window.scrollY;
    let raf: number;

    const onWheel = (e: WheelEvent) => {
      target += e.deltaY;
      target = Math.max(
        0,
        Math.min(target, document.documentElement.scrollHeight - window.innerHeight)
      );
      e.preventDefault();
    };
    const tick = () => {
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.5) current = target;
      window.scrollTo(0, current);
      raf = requestAnimationFrame(tick);
    };
    const onScrollAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.slice(1);
      const el = id ? document.getElementById(id) : document.body;
      if (!el) return;
      e.preventDefault();
      target = el.getBoundingClientRect().top + window.scrollY - 60;
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("click", onScrollAnchor);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("click", onScrollAnchor);
      cancelAnimationFrame(raf);
    };
  }, []);
}

/* ==========================================================================
   HOOKS — useLineReveal (manifesto)
========================================================================== */

function useLineReveal(rootSelector: string) {
  useEffect(() => {
    const root = document.querySelector(rootSelector);
    if (!root) return;
    const lines = root.querySelectorAll(".line-reveal");
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.line || 0);
            setTimeout(() => e.target.classList.add("in"), idx * 180);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    lines.forEach((l) => io.observe(l));

    const sec = document.getElementById("manifesto");
    const io2 = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) sec?.classList.add("lit");
          else sec?.classList.remove("lit");
        });
      },
      { threshold: 0.3 }
    );
    if (sec) io2.observe(sec);
    return () => {
      io.disconnect();
      io2.disconnect();
    };
  }, [rootSelector]);
}

/* ==========================================================================
   HOOKS — useCaseHover
========================================================================== */

function useCaseHover() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".case3");
    const onMove = (e: Event) => {
      const me = e as MouseEvent;
      const target = me.currentTarget as HTMLElement;
      const r = target.getBoundingClientRect();
      target.style.setProperty("--mx", ((me.clientX - r.left) / r.width) * 100 + "%");
      target.style.setProperty("--my", ((me.clientY - r.top) / r.height) * 100 + "%");
    };
    cards.forEach((c) => c.addEventListener("mousemove", onMove));
    return () => cards.forEach((c) => c.removeEventListener("mousemove", onMove));
  }, []);
}

/* ==========================================================================
   EFFECT — CustomCursor (dot + ring with magnetic hover)
========================================================================== */

function CustomCursor() {
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    const checkHover = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest(
        "a, button, .case3, .svc-card, .loop-step, .faq-item, .alt, .stat-card, .dash"
      );
      if (t) ring.classList.add("hover");
      else ring.classList.remove("hover");
    };
    const onLeave = () => {
      dot.classList.add("hidden");
      ring.classList.add("hidden");
    };
    const onEnter = () => {
      dot.classList.remove("hidden");
      ring.classList.remove("hidden");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", checkHover);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", checkHover);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      dot.remove();
      ring.remove();
    };
  }, []);
  return null;
}

/* ==========================================================================
   EFFECT — ScrollProgress
========================================================================== */

function ScrollProgress() {
  useEffect(() => {
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      bar.remove();
    };
  }, []);
  return null;
}

/* ==========================================================================
   EFFECT — NoiseOverlay
========================================================================== */

function NoiseOverlay() {
  return <div className="noise" aria-hidden="true" />;
}

/* ==========================================================================
   EFFECT — HeroMesh (WebGL gradient mesh)
========================================================================== */

function HeroMesh() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const vs = `
      attribute vec2 p;
      varying vec2 v;
      void main(){ v = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }
    `;
    const fs = `
      precision mediump float;
      varying vec2 v;
      uniform float t;
      uniform vec2 res;
      uniform vec3 c1;
      uniform vec3 c2;
      uniform vec3 c0;

      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i+vec2(1.,0.));
        float c = hash(i+vec2(0.,1.));
        float d = hash(i+vec2(1.,1.));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
      }
      float fbm(vec2 p){
        float s = 0.0; float a = 0.5;
        for(int i=0;i<5;i++){ s += a*noise(p); p *= 2.0; a *= 0.5; }
        return s;
      }

      void main(){
        vec2 uv = v;
        vec2 q = uv * 2.0 - 1.0;
        q.x *= res.x / res.y;

        float n = fbm(uv * 2.5 + vec2(t*0.04, t*0.03));
        float m = fbm(uv * 1.5 - vec2(t*0.02, -t*0.025));

        float blob1 = smoothstep(0.55, 0.0, length(q - vec2(sin(t*0.2)*0.4, cos(t*0.18)*0.3)));
        float blob2 = smoothstep(0.6, 0.0, length(q + vec2(cos(t*0.22)*0.5, sin(t*0.15)*0.35)));

        vec3 col = c0;
        col = mix(col, c1, blob1 * (0.7 + 0.3*n));
        col = mix(col, c2, blob2 * 0.55 * m);

        float g = (hash(uv * res + t) - 0.5) * 0.04;
        col += g;

        float vg = smoothstep(1.4, 0.4, length(q));
        col *= mix(0.6, 1.0, vg);

        gl_FragColor = vec4(col, 0.55);
      }
    `;

    function compile(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uT = gl.getUniformLocation(prog, "t");
    const uRes = gl.getUniformLocation(prog, "res");
    const uC0 = gl.getUniformLocation(prog, "c0");
    const uC1 = gl.getUniformLocation(prog, "c1");
    const uC2 = gl.getUniformLocation(prog, "c2");

    function readVar(name: string, fallback: string): [number, number, number] {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
      if (v.startsWith("#")) {
        const r = parseInt(v.slice(1, 3), 16) / 255;
        const g = parseInt(v.slice(3, 5), 16) / 255;
        const b = parseInt(v.slice(5, 7), 16) / 255;
        return [r, g, b];
      }
      const m = v.match(/(\d+(\.\d+)?)/g);
      if (m && m.length >= 3) return m.slice(0, 3).map((x) => parseFloat(x) / 255) as [number, number, number];
      return [0, 0, 0];
    }

    let raf: number;
    const start = performance.now();
    const draw = () => {
      const t = (performance.now() - start) / 1000;
      gl.uniform1f(uT, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform3fv(uC0, readVar("--bg", "#0A0A0A"));
      gl.uniform3fv(uC1, readVar("--accent", "#84CC16"));
      gl.uniform3fv(uC2, readVar("--accent-2", "#F97316"));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <div className="hero-mesh">
      <canvas ref={ref}></canvas>
    </div>
  );
}

/* ==========================================================================
   EFFECT — Magnetic wrapper
========================================================================== */

function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf: number;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      tx = x * strength;
      ty = y * strength;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate(${cx}px, ${cy}px)`;
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    tick();
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return (
    <span ref={ref} className="magnetic">
      {children}
    </span>
  );
}

/* ==========================================================================
   EFFECT — FlipDigit / FlipNumber / FlipOnScroll (railway-board digits)
========================================================================== */

function FlipDigit({ digit }: { digit: number }) {
  return (
    <span className="flip-digit">
      <span className="flip-digit-inner" style={{ transform: `translateY(-${digit}em)` }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </span>
    </span>
  );
}

function FlipNumber({ value, format = (x: number) => String(x) }: { value: number; format?: (x: number) => string }) {
  const str = format(value);
  return (
    <span className="flip">
      {str.split("").map((ch, i) =>
        /\d/.test(ch) ? <FlipDigit key={i} digit={parseInt(ch, 10)} /> : <span key={i}>{ch}</span>
      )}
    </span>
  );
}

function FlipOnScroll({
  to,
  format = (x: number) => String(x),
  duration = 1400,
}: {
  to: number;
  format?: (x: number) => string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    let raf: number;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setV(Math.round(to * eased * 10) / 10);
              if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, duration]);
  return (
    <span ref={ref}>
      <FlipNumber value={v} format={format} />
    </span>
  );
}

/* ==========================================================================
   EFFECT — LoopParticles (flow along Founder-Led AI Loop)
========================================================================== */

function LoopParticles() {
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!wrap.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const container = wrap.current;
    let active = true;
    let raf: number;

    const particles: { el: HTMLDivElement; t: number; speed: number; size: number }[] = [];
    const COUNT = 18;
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement("div");
      p.className = "loop-particle";
      container.appendChild(p);
      const size = 2 + Math.random() * 3;
      particles.push({ el: p, t: Math.random(), speed: 0.08 + Math.random() * 0.12, size });
      p.style.width = size + "px";
      p.style.height = size + "px";
    }

    function pathPoint(t: number, w: number, h: number): [number, number] {
      const cardY = h * 0.5;
      const arrowY = h * 0.96;
      const xs = [w * 0.125, w * 0.375, w * 0.625, w * 0.875];
      if (t < 0.8) {
        const seg = (t / 0.8) * 3;
        const i = Math.min(2, Math.floor(seg));
        const f = seg - i;
        return [xs[i] + (xs[i + 1] - xs[i]) * f, cardY + Math.sin(t * Math.PI * 4) * 8];
      } else {
        const f = (t - 0.8) / 0.2;
        const x = xs[3] + (xs[0] - xs[3]) * f;
        const y = cardY + (arrowY - cardY) * Math.sin(f * Math.PI);
        return [x, y];
      }
    }

    const tick = () => {
      const r = container.getBoundingClientRect();
      particles.forEach((p) => {
        p.t += p.speed * 0.005;
        if (p.t > 1) p.t -= 1;
        const [x, y] = pathPoint(p.t, r.width, r.height);
        p.el.style.transform = `translate(${x}px, ${y}px)`;
        const a = p.t < 0.05 ? p.t / 0.05 : p.t > 0.95 ? (1 - p.t) / 0.05 : 1;
        p.el.style.opacity = (0.55 * a).toFixed(2);
      });
      if (active) raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      active = false;
      cancelAnimationFrame(raf);
      particles.forEach((p) => p.el.remove());
    };
  }, []);
  return <div className="loop-flow" ref={wrap}></div>;
}

/* ==========================================================================
   ROOT — Landing component
   Sections are added in subsequent edits.
========================================================================== */

export default function Landing() {
  useReveal();
  useSmoothScroll();
  useLineReveal("#manifesto");
  useCaseHover();

  // Promote portrait/about-bio in view
  useEffect(() => {
    const els = document.querySelectorAll(".portrait, .about-bio");
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    els.forEach((el) => io.observe(el));

    const sub = document.getElementById("hero-sub");
    if (sub) setTimeout(() => sub.classList.add("in"), 600);

    const ax = document.querySelectorAll(".anti-list li");
    const io2 = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io2.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    ax.forEach((el) => io2.observe(el));

    return () => {
      io.disconnect();
      io2.disconnect();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <NoiseOverlay />
      {/* Sections will be inserted here in next steps */}
      <Nav />
      <Hero />
      <Operator />
      <Loop />
      <Services />
      <Manifesto />
      <AntiTargets />
      <Cases />
      <About />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}

/* ==========================================================================
   SECTION — Nav
========================================================================== */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <a href="#top" className="nav-logo">
        <span className="dot"></span>
        <span>EcomArtem</span>
      </a>
      <div className="nav-links">
        <a href="#services">Pricing</a>
        <a href="#manifesto">Manifesto</a>
        <a href="#about">About</a>
        <a href="#faq">Resources</a>
        <a href="#contact-form">Contact</a>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          <Icon name={theme === "dark" ? "sun" : "moon"} size={15} />
        </button>
        <a href="#contact-form" className="nav-cta">
          Send brief →
        </a>
      </div>
    </nav>
  );
}

/* ==========================================================================
   SECTION — Hero
========================================================================== */

function Hero() {
  const headline1 = ["Most", "agencies", "talk", "AI."];
  const headline2 = ["We", "ship", "AI", "into", "your", "Shopify", "stack."];
  return (
    <header className="hero" id="top">
      <div className="hero-grid-bg"></div>
      <div className="hero-glow"></div>
      <HeroMesh />
      <div className="wrap hero-inner">
        <div className="hero-meta">
          <span className="pill">● Now booking Q3 2026</span>
          <span className="pill" style={{ color: "var(--accent)" }}>
            5 / 6 slots open
          </span>
        </div>
        <h1 className="stagger">
          {headline1.map((w, i) => (
            <span key={"a" + i} style={{ animationDelay: `${i * 60}ms`, marginRight: "0.25em" }}>
              {w}
            </span>
          ))}
          <br />
          {headline2.map((w, i) => (
            <span
              key={"b" + i}
              style={{
                animationDelay: `${(i + headline1.length) * 60}ms`,
                marginRight: "0.25em",
                color: w === "Shopify" || w === "AI" ? "var(--accent)" : undefined,
              }}
            >
              {w}
            </span>
          ))}
        </h1>
        <p className="hero-sub blur-reveal" id="hero-sub">
          Done-for-you AI integration for 7-figure DTC brands. Marketing + ops + CX. Transparent pricing.
          Performance-tied retainer. Built by an operator running Shopify brands in the US since 2019.
        </p>
        <div className="hero-actions reveal" data-delay="4">
          <Magnetic strength={0.25}>
            <a href="#contact-form" className="btn btn-primary btn-fill">
              Send a brief <span className="arrow">→</span>
            </a>
          </Magnetic>
          <a href="#contact-form" className="link">
            or request a 20-min consultation
          </a>
        </div>
        <div className="hero-fineprint reveal" data-delay="5">
          <span>//</span> No daily standups. No dedicated AMs. We ship — we don&apos;t advise.
        </div>

        <div className="scope-pill reveal" data-delay="6">
          <a className="scope-cell" href="#services">
            <span className="scope-title">Launch</span>
            <span className="scope-sub">Build &amp; migrate Shopify stores</span>
          </a>
          <span className="scope-divider" aria-hidden="true"></span>
          <a className="scope-cell" href="#services">
            <span className="scope-title">AI Marketing</span>
            <span className="scope-sub">Creatives, ads, attribution</span>
          </a>
          <span className="scope-divider" aria-hidden="true"></span>
          <a className="scope-cell" href="#services">
            <span className="scope-title">AI Operations</span>
            <span className="scope-sub">Automate the repetitive work</span>
          </a>
          <span className="scope-divider" aria-hidden="true"></span>
          <a className="scope-cell" href="#services">
            <span className="scope-title">Retention &amp; CX</span>
            <span className="scope-sub">Chatbots, email/SMS, personalization</span>
          </a>
        </div>

        <a className="scope-scroll reveal" data-delay="7" href="#cases">
          <span>See our work</span>
          <span className="scope-arrow" aria-hidden="true">
            ↓
          </span>
        </a>

        <div className="hero-strip reveal" data-delay="8">
          <span>
            <b>Shopify</b> — only platform we touch
          </span>
          <span>
            <b>Async-first</b> — no daily calls
          </span>
          <span>
            <b>−50%</b> if KPIs missed
          </span>
          <span>
            <b>$1–10M</b> brand revenue range
          </span>
        </div>
      </div>
    </header>
  );
}

/* ==========================================================================
   SECTION — Operator (live credibility)
========================================================================== */

function Operator() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 6;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -6;
    setTilt({ x, y });
  };
  return (
    <section className="section" id="proof">
      <div className="wrap">
        <div className="sh reveal">
          <span className="eyebrow">02 / Operator credibility</span>
          <h2>
            We spend our own money on Meta and Pinterest{" "}
            <span style={{ color: "var(--accent)" }}>every day</span>.
          </h2>
          <p className="lede">
            That&apos;s how we know what works in 2026. Then we apply the same playbook to your store — without the
            testing tax, the ego, or the agency markup.
          </p>
        </div>

        <div className="op-grid">
          <div
            className="dash reveal"
            data-delay="1"
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            style={{ transform: `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }}
          >
            <div className="dash-bar">
              <span className="dot r"></span>
              <span className="dot y"></span>
              <span className="dot g"></span>
              <span className="url">arthouses.store / ads-manager / live</span>
            </div>
            <div className="dash-body">
              <div className="dash-head">
                <span>Meta · last 7 days</span>
                <span className="live">live</span>
              </div>
              <div className="dash-stats">
                <div className="dash-stat">
                  <div className="lbl">Spend</div>
                  <div className="val">
                    $<FlipOnScroll to={48280} format={(x) => x.toLocaleString()} />
                  </div>
                  <div className="delta">+12.4%</div>
                </div>
                <div className="dash-stat">
                  <div className="lbl">ROAS</div>
                  <div className="val">
                    <FlipOnScroll to={4.7} format={(x) => x.toFixed(1)} />x
                  </div>
                  <div className="delta">+0.6</div>
                </div>
                <div className="dash-stat">
                  <div className="lbl">CPA</div>
                  <div className="val">
                    $<FlipOnScroll to={21.4} format={(x) => x.toFixed(1)} />
                  </div>
                  <div className="delta dn">−8.1%</div>
                </div>
              </div>
              <div className="chart">
                <svg viewBox="0 0 600 180" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[40, 80, 120].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      x2="600"
                      y1={y}
                      y2={y}
                      stroke="var(--border-soft)"
                      strokeDasharray="2 4"
                    />
                  ))}
                  <path
                    d="M0,140 L40,128 L80,132 L120,110 L160,118 L200,92 L240,98 L280,72 L320,84 L360,60 L400,68 L440,46 L480,52 L520,32 L560,38 L600,22 L600,180 L0,180 Z"
                    fill="url(#g1)"
                  />
                  <path
                    d="M0,140 L40,128 L80,132 L120,110 L160,118 L200,92 L240,98 L280,72 L320,84 L360,60 L400,68 L440,46 L480,52 L520,32 L560,38 L600,22"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div className="dash-table">
                <div className="row head">
                  <span>Campaign</span>
                  <span>Spend</span>
                  <span>ROAS</span>
                  <span>CPA</span>
                </div>
                <div className="row">
                  <b>AH-CRT-Sofa-V12</b>
                  <span>$12.4k</span>
                  <span>5.1x</span>
                  <span>$18</span>
                </div>
                <div className="row">
                  <b>AH-RT-Bestseller</b>
                  <span>$9.8k</span>
                  <span>6.3x</span>
                  <span>$14</span>
                </div>
                <div className="row">
                  <b>AH-PR-Lookalike-3%</b>
                  <span>$7.1k</span>
                  <span>3.9x</span>
                  <span>$28</span>
                </div>
              </div>
            </div>
          </div>

          <div className="stat-stack">
            <div className="stat-card reveal" data-delay="2">
              <div className="meta">// Shopify stores built</div>
              <div className="num">
                <FlipOnScroll to={500} format={(x) => String(Math.round(x))} />+
              </div>
              <div className="lbl">Since 2019 — for clients and our own brands. Apparel, home, beauty, supplements, more.</div>
            </div>
            <div className="stat-card hl reveal" data-delay="3">
              <div className="meta">// Active brand</div>
              <div className="num">
                ArtHouses<span className="unit">.store</span>
              </div>
              <div className="lbl">Premium furniture · DACH market · Founder-operated daily.</div>
            </div>
            <div className="stat-card reveal" data-delay="4">
              <div className="meta">// Total ad spend managed</div>
              <div className="num">
                $<FlipOnScroll to={12.4} format={(x) => x.toFixed(1)} />M+
              </div>
              <div className="lbl">
                Across Meta, Google, Pinterest, TikTok. Lifetime, paid out of our own bank accounts.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION — Loop (Founder-Led AI Loop)
========================================================================== */

function Loop() {
  const arrowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!arrowRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            arrowRef.current?.classList.add("in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(arrowRef.current);
    return () => io.disconnect();
  }, []);
  const steps: { idx: string; icon: IconName; title: string; body: string; tag: string }[] = [
    {
      idx: "01",
      icon: "database",
      title: "Your data",
      body: "Sales, ads, support tickets, product feed → unified data layer the AI can actually reason over.",
      tag: "Shopify · Klaviyo · Gorgias · Meta",
    },
    {
      idx: "02",
      icon: "cpu",
      title: "AI workflow",
      body: "Creative gen, copy variants, ops automations, agentic decisions — all running against your real data.",
      tag: "Anthropic · OpenAI · n8n",
    },
    {
      idx: "03",
      icon: "rocket",
      title: "Ship to market",
      body: "Push to Meta, Google, Klaviyo, store. Collect feedback. Feed results back into the loop.",
      tag: "Meta · Google · Klaviyo",
    },
    {
      idx: "04",
      icon: "eye",
      title: "Founder oversight",
      body: "Weekly 30-min review. We refine the loop, kill what underperforms, double down on what works.",
      tag: "30 min / week · async-first",
    },
  ];
  return (
    <section className="section" id="loop">
      <div className="wrap loop-wrap" style={{ position: "relative" }}>
        <LoopParticles />
        <div className="sh reveal">
          <span className="eyebrow">03 / Signature framework</span>
          <h2>
            The Founder-Led <span style={{ color: "var(--accent)" }}>AI Loop</span>.
          </h2>
          <p className="lede">
            How we make every dollar of your marketing spend pay back. Four steps. One loop. Operated by someone
            who runs the same playbook on their own brand every day.
          </p>
        </div>
        <div className="loop">
          {steps.map((s, i) => (
            <div className="loop-step reveal" data-delay={i + 1} key={s.idx}>
              <div className="idx">Step {s.idx}</div>
              <div className="icon">
                <Icon name={s.icon} size={18} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="tag">{s.tag}</div>
            </div>
          ))}
        </div>
        <div className="loop-arrow reveal" ref={arrowRef}>
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
            <path d="M 1180 30 C 1180 60, 50 60, 20 30 C 20 0, 80 0, 100 18" />
            <path d="M 100 18 L 92 12 M 100 18 L 92 24" />
            <text x="600" y="50" textAnchor="middle">
              LOOP RESTARTS WEEKLY
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION — Services (7 cards + bundle, Charle-style grid)
========================================================================== */

type ServiceVisualKind =
  | "shopify-launch"
  | "ads"
  | "ops"
  | "cx"
  | "migration"
  | "seo"
  | "cro"
  | "loop";

function ServiceVisual({ kind }: { kind: ServiceVisualKind }) {
  switch (kind) {
    case "shopify-launch":
      return (
        <svg viewBox="0 0 320 180" className="svc-visual-svg" preserveAspectRatio="xMidYMid slice">
          {/* Browser chrome */}
          <rect width="320" height="180" fill="var(--bg)" />
          <rect x="0" y="0" width="320" height="20" fill="var(--bg-soft)" />
          <circle cx="9" cy="10" r="2.5" fill="#ff5f57" opacity="0.5" />
          <circle cx="18" cy="10" r="2.5" fill="#febc2e" opacity="0.5" />
          <circle cx="27" cy="10" r="2.5" fill="#28c840" opacity="0.5" />
          <rect x="40" y="5" width="240" height="11" rx="3" fill="var(--bg)" stroke="var(--border-soft)" strokeWidth="0.5" />
          <text x="50" y="13" fontFamily="var(--font-mono)" fontSize="7" fill="var(--fg-dim)">store.myshopify.com/admin/products</text>

          {/* Sidebar (Shopify-admin style) */}
          <rect x="0" y="20" width="58" height="160" fill="var(--bg-soft)" />
          <g fontFamily="var(--font-body)" fontSize="6" fill="var(--fg-muted)">
            <rect x="6" y="28" width="46" height="10" rx="2" fill="var(--bg-elev)" />
            <text x="12" y="35" fill="var(--fg)" fontWeight="500">▸ Products</text>
            <text x="12" y="48">Orders</text>
            <text x="12" y="58">Customers</text>
            <text x="12" y="68">Marketing</text>
            <text x="12" y="78">Discounts</text>
            <text x="12" y="88">Analytics</text>
            <text x="12" y="98">Apps</text>
            <line x1="6" y1="105" x2="52" y2="105" stroke="var(--border-soft)" strokeWidth="0.3" />
            <text x="12" y="115" fill="var(--accent)">▸ AI Studio</text>
          </g>

          {/* Main: header */}
          <text x="68" y="34" fontFamily="var(--font-display)" fontSize="11" fill="var(--fg)" fontWeight="600">Products</text>
          <rect x="252" y="26" width="56" height="13" rx="3" fill="var(--accent)" />
          <text x="261" y="35" fontFamily="var(--font-body)" fontSize="6" fill="#0A0A0A" fontWeight="600">+ Generate AI</text>

          {/* Product row 1 — COMPLETE (real product photo via loremflickr tags) */}
          <g>
            <rect x="68" y="48" width="240" height="36" rx="4" fill="var(--bg-soft)" stroke="var(--border-soft)" strokeWidth="0.5" />
            <clipPath id="prodImg1">
              <rect x="74" y="54" width="24" height="24" rx="2" />
            </clipPath>
            <image
              href="https://arthouses.store/cdn/shop/files/image_1_e1c11004-8605-4ae5-804c-75bb51b19fa8.jpg?v=1775740932&width=200"
              x="74"
              y="54"
              width="24"
              height="24"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#prodImg1)"
            />
            <text x="106" y="62" fontFamily="var(--font-body)" fontSize="7" fill="var(--fg)" fontWeight="600">Comfy Lounge · Onyx</text>
            <text x="106" y="72" fontFamily="var(--font-body)" fontSize="6" fill="var(--fg-muted)">Living room · Premium · 12 in stock</text>
            <text x="248" y="68" fontFamily="var(--font-mono)" fontSize="7" fill="var(--fg)" textAnchor="end">€1,890</text>
            <rect x="254" y="60" width="48" height="10" rx="2" fill="var(--bg-elev)" stroke="var(--accent)" strokeWidth="0.5" />
            <text x="278" y="67" fontFamily="var(--font-mono)" fontSize="5" fill="var(--accent)" textAnchor="middle">● ACTIVE</text>
          </g>

          {/* Product row 2 — AI GENERATING (animated progress bar via SVG <animate>) */}
          <g>
            <rect x="68" y="88" width="240" height="36" rx="4" fill="var(--bg-soft)" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="0.5" className="anim-glow" />
            <clipPath id="prodImg2">
              <rect x="74" y="94" width="24" height="24" rx="2" />
            </clipPath>
            <image
              href="https://arthouses.store/cdn/shop/files/Herorenders_2_whitemarbleintensegreyveining.jpg?v=1775237468&width=200"
              x="74"
              y="94"
              width="24"
              height="24"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#prodImg2)"
              opacity="0.55"
              className="anim-shimmer"
            />
            <text x="106" y="102" fontFamily="var(--font-body)" fontSize="7" fill="var(--accent)" className="anim-shimmer">
              AI generating description...
            </text>
            {/* progress bar — background track */}
            <rect x="106" y="108" width="120" height="2" rx="1" fill="var(--accent)" opacity="0.18" />
            {/* progress bar — animated fill (0% → 100% loop) */}
            <rect x="106" y="108" width="0" height="2" rx="1" fill="var(--accent)">
              <animate attributeName="width" values="0;120;120;0" keyTimes="0;0.7;0.85;1" dur="4s" repeatCount="indefinite" />
            </rect>
            {/* status line — single text node, no overlapping tspans */}
            <text x="106" y="118" fontFamily="var(--font-mono)" fontSize="5" fill="var(--fg-dim)">
              Claude · processing token stream
            </text>
            <text x="270" y="108" fontFamily="var(--font-mono)" fontSize="5" fill="var(--accent)" className="anim-live">● LIVE</text>
          </g>

          {/* Product row 3 — SKELETON QUEUE (next product placeholder) */}
          <g>
            <rect x="68" y="128" width="240" height="36" rx="4" fill="var(--bg-soft)" stroke="var(--border-soft)" strokeWidth="0.5" opacity="0.7" />
            <clipPath id="prodImg3">
              <rect x="74" y="134" width="24" height="24" rx="2" />
            </clipPath>
            <image
              href="https://arthouses.store/cdn/shop/files/lifestyle_CHA1043902-10_1_2048x_fb7bf3ee-e397-4852-bd29-af3f9c8287f7.jpg?v=1775740929&width=200"
              x="74"
              y="134"
              width="24"
              height="24"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#prodImg3)"
              opacity="0.35"
            />
            <rect x="106" y="140" width="80" height="3" rx="1" fill="var(--border)" />
            <rect x="106" y="148" width="120" height="2" rx="1" fill="var(--border)" opacity="0.6" />
            <rect x="106" y="154" width="60" height="2" rx="1" fill="var(--border)" opacity="0.4" />
            <text x="270" y="148" fontFamily="var(--font-mono)" fontSize="5" fill="var(--fg-dim)">QUEUED</text>
          </g>

          {/* Bottom status bar */}
          <text x="68" y="174" fontFamily="var(--font-mono)" fontSize="5" fill="var(--fg-dim)">3 / 247 products · AI engine running</text>
          <circle cx="304" cy="172" r="2" fill="var(--accent)" className="anim-pulse" />
        </svg>
      );
    case "ads":
      return (
        <svg viewBox="0 0 320 180" className="svc-visual-svg" preserveAspectRatio="xMidYMid slice">
          {/* Browser chrome */}
          <rect width="320" height="180" fill="var(--bg)" />
          <rect x="0" y="0" width="320" height="20" fill="var(--bg-soft)" />
          <circle cx="9" cy="10" r="2.5" fill="#ff5f57" opacity="0.5" />
          <circle cx="18" cy="10" r="2.5" fill="#febc2e" opacity="0.5" />
          <circle cx="27" cy="10" r="2.5" fill="#28c840" opacity="0.5" />
          <rect x="40" y="5" width="240" height="11" rx="3" fill="var(--bg)" stroke="var(--border-soft)" strokeWidth="0.5" />
          <text x="50" y="13" fontFamily="var(--font-mono)" fontSize="7" fill="var(--fg-dim)">business.facebook.com/adsmanager/campaigns</text>

          {/* Top bar */}
          <text x="14" y="34" fontFamily="var(--font-display)" fontSize="10" fill="var(--fg)" fontWeight="600">Campaigns</text>
          <text x="76" y="34" fontFamily="var(--font-mono)" fontSize="6" fill="var(--fg-muted)">Last 7 days · ArtHouses Ad Account</text>
          <text x="252" y="34" fontFamily="var(--font-mono)" fontSize="7" fill="var(--accent)" className="anim-live">● LIVE</text>
          <circle cx="246" cy="32" r="2" fill="var(--accent)" className="anim-pulse" />

          {/* Stats row */}
          <g fontFamily="var(--font-mono)" fontSize="6">
            <text x="14" y="48" fill="var(--fg-dim)">SPEND</text>
            <text x="14" y="58" fill="var(--fg)" fontSize="9" fontWeight="600">$48,280</text>
            <text x="80" y="48" fill="var(--fg-dim)">ROAS</text>
            <text x="80" y="58" fill="var(--accent)" fontSize="9" fontWeight="600">4.7×</text>
            <text x="140" y="48" fill="var(--fg-dim)">CPA</text>
            <text x="140" y="58" fill="var(--fg)" fontSize="9" fontWeight="600">$21.4</text>
            <text x="200" y="48" fill="var(--fg-dim)">CTR</text>
            <text x="200" y="58" fill="var(--fg)" fontSize="9" fontWeight="600">3.2%</text>
            <text x="252" y="48" fill="var(--fg-dim)">PURCHASES</text>
            <text x="252" y="58" fill="var(--fg)" fontSize="9" fontWeight="600">2,254</text>
          </g>

          {/* Mini chart */}
          <rect x="14" y="68" width="292" height="42" rx="3" fill="var(--bg-soft)" />
          <path
            d="M20,100 L40,94 L60,96 L80,88 L100,90 L120,82 L140,84 L160,76 L180,74 L200,68 L220,72 L240,62 L260,66 L280,58 L300,52"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.2"
          />
          <path
            d="M20,100 L40,94 L60,96 L80,88 L100,90 L120,82 L140,84 L160,76 L180,74 L200,68 L220,72 L240,62 L260,66 L280,58 L300,52 L300,108 L20,108 Z"
            fill="var(--accent)"
            fillOpacity="0.15"
          />
          <circle cx="300" cy="52" r="2" fill="var(--accent)" className="anim-pulse" />
          <text x="20" y="78" fontFamily="var(--font-mono)" fontSize="5" fill="var(--fg-dim)">7-DAY ROAS TREND</text>

          {/* Campaign rows */}
          <g fontFamily="var(--font-body)" fontSize="6">
            {/* Header */}
            <text x="14" y="122" fill="var(--fg-dim)" fontFamily="var(--font-mono)">CAMPAIGN</text>
            <text x="170" y="122" fill="var(--fg-dim)" fontFamily="var(--font-mono)">SPEND</text>
            <text x="220" y="122" fill="var(--fg-dim)" fontFamily="var(--font-mono)">ROAS</text>
            <text x="270" y="122" fill="var(--fg-dim)" fontFamily="var(--font-mono)">STATUS</text>

            {/* Row 1 — top performer with glow */}
            <rect x="11" y="128" width="298" height="13" rx="2" fill="var(--bg-elev)" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="0.5" className="anim-glow" />
            <rect x="14" y="132" width="2" height="5" fill="var(--accent)" />
            <text x="20" y="137" fill="var(--fg)" fontWeight="600">AH-CRT-Sofa-V12</text>
            <text x="170" y="137" fill="var(--fg)">$12.4k</text>
            <text x="220" y="137" fill="var(--accent)" fontWeight="600">5.1×</text>
            <text x="270" y="137" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="5">● ACTIVE</text>

            {/* Row 2 */}
            <rect x="11" y="143" width="298" height="13" rx="2" fill="transparent" />
            <rect x="14" y="147" width="2" height="5" fill="var(--accent)" opacity="0.6" />
            <text x="20" y="152" fill="var(--fg)" fontWeight="500">AH-RT-Bestseller</text>
            <text x="170" y="152" fill="var(--fg)">$9.8k</text>
            <text x="220" y="152" fill="var(--accent)" fontWeight="600">6.3×</text>
            <text x="270" y="152" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="5">● ACTIVE</text>

            {/* Row 3 */}
            <rect x="11" y="158" width="298" height="13" rx="2" fill="transparent" />
            <rect x="14" y="162" width="2" height="5" fill="var(--fg-dim)" />
            <text x="20" y="167" fill="var(--fg)" fontWeight="500">AH-PR-LAL-3%</text>
            <text x="170" y="167" fill="var(--fg)">$7.1k</text>
            <text x="220" y="167" fill="var(--fg)">3.9×</text>
            <text x="270" y="167" fill="var(--fg-dim)" fontFamily="var(--font-mono)" fontSize="5">○ PAUSED</text>
          </g>
        </svg>
      );
    case "ops":
      return (
        <svg viewBox="0 0 320 180" className="svc-visual-svg" preserveAspectRatio="xMidYMid slice">
          {/* Browser chrome */}
          <rect width="320" height="180" fill="var(--bg)" />
          <rect x="0" y="0" width="320" height="20" fill="var(--bg-soft)" />
          <circle cx="9" cy="10" r="2.5" fill="#ff5f57" opacity="0.5" />
          <circle cx="18" cy="10" r="2.5" fill="#febc2e" opacity="0.5" />
          <circle cx="27" cy="10" r="2.5" fill="#28c840" opacity="0.5" />
          <rect x="40" y="5" width="240" height="11" rx="3" fill="var(--bg)" stroke="var(--border-soft)" strokeWidth="0.5" />
          <text x="50" y="13" fontFamily="var(--font-mono)" fontSize="7" fill="var(--fg-dim)">app.n8n.io/workflow/shopify-ai-ops</text>

          {/* Workflow header */}
          <text x="14" y="34" fontFamily="var(--font-display)" fontSize="9" fill="var(--fg)" fontWeight="600">Shopify → AI → All systems</text>
          <text x="222" y="34" fontFamily="var(--font-mono)" fontSize="6" fill="var(--accent)" className="anim-live">● 12 nodes · running</text>

          {/* Trigger node — Shopify (left) */}
          <g fontFamily="var(--font-body)" fontSize="6">
            <rect x="14" y="76" width="56" height="32" rx="4" fill="var(--bg-elev)" stroke="var(--border)" strokeWidth="0.5" />
            <rect x="14" y="76" width="56" height="8" rx="4" fill="#95BF47" opacity="0.4" />
            <text x="20" y="82" fill="#95BF47" fontFamily="var(--font-mono)" fontSize="5">TRIGGER</text>
            <text x="20" y="94" fill="var(--fg)" fontWeight="600">Shopify</text>
            <text x="20" y="103" fill="var(--fg-dim)" fontSize="5">order.created</text>
          </g>

          {/* AI hub — center */}
          <g fontFamily="var(--font-body)" fontSize="6">
            <rect x="118" y="62" width="80" height="60" rx="6" fill="var(--bg-elev)" stroke="var(--accent)" strokeWidth="1" className="anim-glow" />
            <rect x="118" y="62" width="80" height="10" rx="6" fill="var(--accent)" opacity="0.18" />
            <text x="124" y="69" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="5">AI WORKFLOW</text>
            <text x="124" y="84" fill="var(--fg)" fontWeight="600" fontSize="8">Claude</text>
            <text x="124" y="94" fill="var(--fg-dim)" fontSize="5">enrich · classify · route</text>
            {/* Mini activity dots */}
            <circle cx="125" cy="105" r="1.5" fill="var(--accent)" className="anim-pulse" />
            <circle cx="132" cy="105" r="1.5" fill="var(--accent)" className="anim-pulse anim-d-1" />
            <circle cx="139" cy="105" r="1.5" fill="var(--accent)" className="anim-pulse anim-d-2" />
            <circle cx="146" cy="105" r="1.5" fill="var(--accent)" className="anim-pulse anim-d-3" />
            <text x="156" y="108" fill="var(--fg-dim)" fontFamily="var(--font-mono)" fontSize="5">processing 4/s</text>
          </g>

          {/* Action nodes — right (3 destinations) */}
          <g fontFamily="var(--font-body)" fontSize="6">
            {/* Klaviyo */}
            <rect x="246" y="42" width="60" height="26" rx="4" fill="var(--bg-elev)" stroke="var(--border)" strokeWidth="0.5" />
            <rect x="246" y="42" width="3" height="26" fill="#FFC04C" opacity="0.7" />
            <text x="252" y="52" fill="var(--fg)" fontWeight="600">Klaviyo</text>
            <text x="252" y="62" fill="var(--fg-dim)" fontSize="5">+ trigger flow</text>

            {/* Gorgias */}
            <rect x="246" y="78" width="60" height="26" rx="4" fill="var(--bg-elev)" stroke="var(--border)" strokeWidth="0.5" />
            <rect x="246" y="78" width="3" height="26" fill="#FF5C8A" opacity="0.7" />
            <text x="252" y="88" fill="var(--fg)" fontWeight="600">Gorgias</text>
            <text x="252" y="98" fill="var(--fg-dim)" fontSize="5">+ assign tag</text>

            {/* ERP */}
            <rect x="246" y="114" width="60" height="26" rx="4" fill="var(--bg-elev)" stroke="var(--border)" strokeWidth="0.5" />
            <rect x="246" y="114" width="3" height="26" fill="#6B8AFD" opacity="0.7" />
            <text x="252" y="124" fill="var(--fg)" fontWeight="600">NetSuite</text>
            <text x="252" y="134" fill="var(--fg-dim)" fontSize="5">+ sync inventory</text>
          </g>

          {/* Connection lines */}
          <g stroke="var(--accent)" strokeWidth="0.8" fill="none">
            <path d="M70,92 L118,92" className="anim-flow" />
            <path d="M198,80 L246,55" className="anim-flow anim-d-1" />
            <path d="M198,92 L246,91" className="anim-flow anim-d-2" />
            <path d="M198,104 L246,127" className="anim-flow anim-d-3" />
          </g>

          {/* Bottom log */}
          <text x="14" y="156" fontFamily="var(--font-mono)" fontSize="5" fill="var(--fg-dim)">[14:32:08] order #ah-19284 → Klaviyo flow:welcome triggered</text>
          <text x="14" y="166" fontFamily="var(--font-mono)" fontSize="5" fill="var(--fg-dim)">[14:32:09] order #ah-19284 → AI tag: high-LTV-prospect → assigned</text>
          <text x="14" y="176" fontFamily="var(--font-mono)" fontSize="5" fill="var(--accent)" className="anim-shimmer">[14:32:09] order #ah-19284 → NetSuite inventory −1 ✓</text>
        </svg>
      );
    case "cx":
      return (
        <svg viewBox="0 0 320 180" className="svc-visual-svg" preserveAspectRatio="xMidYMid slice">
          {/* Browser chrome */}
          <rect width="320" height="180" fill="var(--bg)" />
          <rect x="0" y="0" width="320" height="20" fill="var(--bg-soft)" />
          <circle cx="9" cy="10" r="2.5" fill="#ff5f57" opacity="0.5" />
          <circle cx="18" cy="10" r="2.5" fill="#febc2e" opacity="0.5" />
          <circle cx="27" cy="10" r="2.5" fill="#28c840" opacity="0.5" />
          <rect x="40" y="5" width="240" height="11" rx="3" fill="var(--bg)" stroke="var(--border-soft)" strokeWidth="0.5" />
          <text x="50" y="13" fontFamily="var(--font-mono)" fontSize="7" fill="var(--fg-dim)">arthouses.store · ai concierge</text>

          {/* Chat header */}
          <rect x="14" y="28" width="200" height="14" rx="7" fill="var(--bg-soft)" />
          <circle cx="22" cy="35" r="3" fill="var(--accent)" />
          <text x="30" y="38" fontFamily="var(--font-body)" fontSize="6" fill="var(--fg)" fontWeight="600">ArtHouses Concierge</text>
          <text x="120" y="38" fontFamily="var(--font-mono)" fontSize="5" fill="var(--accent)" className="anim-live">● online · &lt;1m reply</text>

          {/* Customer message */}
          <g>
            <rect x="120" y="48" width="184" height="22" rx="11" fill="var(--accent)" />
            <text x="130" y="58" fontFamily="var(--font-body)" fontSize="6.5" fill="#0A0A0A">Looking for a velvet sofa,</text>
            <text x="130" y="66" fontFamily="var(--font-body)" fontSize="6.5" fill="#0A0A0A">under €2k, dark color</text>
          </g>
          <text x="296" y="78" fontFamily="var(--font-mono)" fontSize="5" fill="var(--fg-dim)" textAnchor="end">14:32 · sent</text>

          {/* AI typing → response */}
          <g>
            <rect x="14" y="84" width="240" height="56" rx="11" fill="var(--bg-elev)" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="0.5" className="anim-glow" />
            <text x="24" y="94" fontFamily="var(--font-mono)" fontSize="5" fill="var(--accent)" className="anim-shimmer">AI · matched 3 from catalog</text>

            {/* Mini product cards inline */}
            <g>
              <clipPath id="cxImg1"><rect x="22" y="98" width="20" height="20" rx="2" /></clipPath>
              <image href="https://cdn.shopify.com/s/files/1/0821/4406/7805/files/collection-furniture.jpg?v=1775602187&width=160" x="22" y="98" width="20" height="20" preserveAspectRatio="xMidYMid slice" clipPath="url(#cxImg1)" />
              <text x="46" y="106" fontFamily="var(--font-body)" fontSize="6" fill="var(--fg)" fontWeight="600">Vela · Onyx</text>
              <text x="46" y="114" fontFamily="var(--font-mono)" fontSize="5" fill="var(--fg-muted)">€1,890 · IN STOCK</text>

              <clipPath id="cxImg2"><rect x="98" y="98" width="20" height="20" rx="2" /></clipPath>
              <image href="https://arthouses.store/cdn/shop/files/image_1_e1c11004-8605-4ae5-804c-75bb51b19fa8.jpg?v=1775740932&width=160" x="98" y="98" width="20" height="20" preserveAspectRatio="xMidYMid slice" clipPath="url(#cxImg2)" />
              <text x="122" y="106" fontFamily="var(--font-body)" fontSize="6" fill="var(--fg)" fontWeight="600">Bourne · Slate</text>
              <text x="122" y="114" fontFamily="var(--font-mono)" fontSize="5" fill="var(--fg-muted)">€1,640 · IN STOCK</text>

              <clipPath id="cxImg3"><rect x="174" y="98" width="20" height="20" rx="2" /></clipPath>
              <image href="https://arthouses.store/cdn/shop/files/image_2_8fe14ac1-65ca-452f-af10-11d4a4bf1878.jpg?v=1775740931&width=160" x="174" y="98" width="20" height="20" preserveAspectRatio="xMidYMid slice" clipPath="url(#cxImg3)" />
              <text x="198" y="106" fontFamily="var(--font-body)" fontSize="6" fill="var(--fg)" fontWeight="600">Auro · Charcoal</text>
              <text x="198" y="114" fontFamily="var(--font-mono)" fontSize="5" fill="var(--fg-muted)">€1,950 · LOW STOCK</text>
            </g>

            <text x="24" y="132" fontFamily="var(--font-body)" fontSize="6" fill="var(--fg-muted)">All ship in 3 days. Want to compare?</text>
          </g>

          {/* Klaviyo flow trigger badge */}
          <g>
            <rect x="14" y="148" width="290" height="20" rx="4" fill="var(--bg-soft)" stroke="var(--border-soft)" strokeWidth="0.5" />
            <text x="22" y="160" fontFamily="var(--font-mono)" fontSize="5" fill="var(--fg-dim)">KLAVIYO · auto-trigger</text>
            <circle cx="100" cy="158" r="2" fill="var(--accent)" className="anim-pulse" />
            <text x="106" y="160" fontFamily="var(--font-body)" fontSize="6" fill="var(--fg)">browse-abandon</text>
            <text x="172" y="160" fontFamily="var(--font-body)" fontSize="6" fill="var(--fg-dim)">→</text>
            <circle cx="184" cy="158" r="2" fill="var(--accent)" className="anim-pulse anim-d-2" />
            <text x="190" y="160" fontFamily="var(--font-body)" fontSize="6" fill="var(--fg)">post-purchase</text>
            <text x="252" y="160" fontFamily="var(--font-body)" fontSize="6" fill="var(--fg-dim)">→</text>
            <circle cx="264" cy="158" r="2" fill="var(--border)" />
            <text x="270" y="160" fontFamily="var(--font-body)" fontSize="6" fill="var(--fg-dim)">winback</text>
          </g>
        </svg>
      );
    case "migration":
      return (
        <svg viewBox="0 0 320 180" className="svc-visual-svg" preserveAspectRatio="xMidYMid slice">
          {/* Browser chrome */}
          <rect width="320" height="180" fill="var(--bg)" />
          <rect x="0" y="0" width="320" height="20" fill="var(--bg-soft)" />
          <circle cx="9" cy="10" r="2.5" fill="#ff5f57" opacity="0.5" />
          <circle cx="18" cy="10" r="2.5" fill="#febc2e" opacity="0.5" />
          <circle cx="27" cy="10" r="2.5" fill="#28c840" opacity="0.5" />
          <rect x="40" y="5" width="240" height="11" rx="3" fill="var(--bg)" stroke="var(--border-soft)" strokeWidth="0.5" />
          <text x="50" y="13" fontFamily="var(--font-mono)" fontSize="7" fill="var(--fg-dim)">migrate.ecomartem.com/run/m-2284</text>

          {/* Header */}
          <text x="14" y="34" fontFamily="var(--font-display)" fontSize="9" fill="var(--fg)" fontWeight="600">Migration in progress</text>
          <text x="200" y="34" fontFamily="var(--font-mono)" fontSize="6" fill="var(--accent)" className="anim-live">● 247 of 318 SKUs migrated</text>

          {/* FROM panel */}
          <g fontFamily="var(--font-body)" fontSize="6">
            <rect x="14" y="44" width="120" height="100" rx="6" fill="var(--bg-soft)" stroke="var(--border)" strokeWidth="0.5" />
            <text x="22" y="56" fill="var(--fg-dim)" fontFamily="var(--font-mono)" fontSize="5">FROM</text>

            {/* Magento — checked */}
            <rect x="22" y="64" width="104" height="16" rx="3" fill="var(--bg-elev)" />
            <rect x="26" y="68" width="8" height="8" rx="1.5" fill="#F26322" opacity="0.85" />
            <text x="38" y="74" fill="var(--fg)" fontWeight="500">Magento 2</text>
            <text x="100" y="74" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="5">✓ done</text>

            {/* WooCommerce — in progress */}
            <rect x="22" y="84" width="104" height="16" rx="3" fill="var(--bg-elev)" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="0.5" className="anim-glow" />
            <rect x="26" y="88" width="8" height="8" rx="1.5" fill="#7F54B3" opacity="0.85" />
            <text x="38" y="94" fill="var(--fg)" fontWeight="500">WooCommerce</text>
            <text x="92" y="94" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="5">73%</text>

            {/* BigCommerce — queued */}
            <rect x="22" y="104" width="104" height="16" rx="3" fill="var(--bg-elev)" opacity="0.6" />
            <rect x="26" y="108" width="8" height="8" rx="1.5" fill="#34313F" opacity="0.85" />
            <text x="38" y="114" fill="var(--fg)" fontWeight="500">BigCommerce</text>
            <text x="92" y="114" fill="var(--fg-dim)" fontFamily="var(--font-mono)" fontSize="5">queued</text>

            <text x="22" y="134" fill="var(--fg-dim)" fontFamily="var(--font-mono)" fontSize="5">301 redirects · ✓ preserved</text>
          </g>

          {/* Animated arrow */}
          <g>
            <path d="M138,94 L180,94" stroke="var(--accent)" strokeWidth="1.4" fill="none" className="anim-flow" />
            <path d="M180,94 L172,89 M180,94 L172,99" stroke="var(--accent)" strokeWidth="1.4" fill="none" />
            {/* Particle moving along */}
            <circle r="1.5" fill="var(--accent)">
              <animate attributeName="cx" values="138;180" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="94;94" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* TO panel */}
          <g fontFamily="var(--font-body)" fontSize="6">
            <rect x="186" y="44" width="120" height="100" rx="6" fill="var(--bg-elev)" stroke="var(--accent)" strokeWidth="0.8" className="anim-glow" />
            <text x="194" y="56" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="5">TO</text>
            <text x="194" y="74" fill="var(--fg)" fontFamily="var(--font-display)" fontSize="13" fontWeight="700">Shopify</text>
            <text x="194" y="88" fill="var(--fg)" fontFamily="var(--font-display)" fontSize="13" fontWeight="700">Plus</text>

            <line x1="194" y1="96" x2="298" y2="96" stroke="var(--border-soft)" strokeWidth="0.3" />

            <text x="194" y="106" fill="var(--accent)" fontWeight="600">+ AI-native from day 1</text>
            <text x="194" y="116" fill="var(--accent)" fontWeight="600">+ SEO 100% preserved</text>
            <text x="194" y="126" fill="var(--accent)" fontWeight="600">+ Zero downtime</text>
            <text x="194" y="136" fill="var(--accent)" fontWeight="600">+ Theme rebuilt</text>
          </g>

          {/* Bottom progress bar */}
          <g>
            <rect x="14" y="156" width="292" height="6" rx="3" fill="var(--bg-soft)" />
            <rect x="14" y="156" height="6" rx="3" fill="var(--accent)">
              <animate attributeName="width" values="0;226;226;0" keyTimes="0;0.7;0.85;1" dur="5s" repeatCount="indefinite" />
            </rect>
            <text x="14" y="172" fontFamily="var(--font-mono)" fontSize="5" fill="var(--fg-dim)">ETA · 2h 14m remaining</text>
            <text x="306" y="172" fontFamily="var(--font-mono)" fontSize="5" fill="var(--accent)" textAnchor="end" className="anim-shimmer">live</text>
          </g>
        </svg>
      );
    case "seo":
      return (
        <svg viewBox="0 0 320 180" className="svc-visual-svg" preserveAspectRatio="xMidYMid slice">
          {/* Browser chrome */}
          <rect width="320" height="180" fill="var(--bg)" />
          <rect x="0" y="0" width="320" height="20" fill="var(--bg-soft)" />
          <circle cx="9" cy="10" r="2.5" fill="#ff5f57" opacity="0.5" />
          <circle cx="18" cy="10" r="2.5" fill="#febc2e" opacity="0.5" />
          <circle cx="27" cy="10" r="2.5" fill="#28c840" opacity="0.5" />
          <rect x="40" y="5" width="240" height="11" rx="3" fill="var(--bg)" stroke="var(--border-soft)" strokeWidth="0.5" />
          <text x="50" y="13" fontFamily="var(--font-mono)" fontSize="7" fill="var(--fg-dim)">google.com/search?q=best+velvet+sofa</text>

          {/* Google-style header */}
          <text x="14" y="34" fontFamily="var(--font-display)" fontSize="11" fill="var(--fg)" fontWeight="600">Google</text>
          {/* Search box */}
          <rect x="56" y="24" width="208" height="14" rx="7" fill="var(--bg-soft)" stroke="var(--border-soft)" strokeWidth="0.5" />
          <text x="64" y="34" fontFamily="var(--font-body)" fontSize="7" fill="var(--fg)">best velvet sofa under €2000</text>
          <rect x="252" y="29" width="0.8" height="6" fill="var(--accent)" className="anim-caret" />

          {/* Tabs */}
          <g fontFamily="var(--font-body)" fontSize="6" fill="var(--fg-muted)">
            <text x="14" y="50" fill="var(--accent)" fontWeight="600">All</text>
            <line x1="12" y1="52" x2="22" y2="52" stroke="var(--accent)" strokeWidth="1" />
            <text x="34" y="50">Images</text>
            <text x="60" y="50">Shopping</text>
            <text x="92" y="50">Videos</text>
            <text x="120" y="50">News</text>
          </g>

          {/* AI Overview block — highlighted */}
          <g>
            <rect x="14" y="58" width="292" height="58" rx="6" fill="var(--bg-elev)" stroke="var(--accent)" strokeWidth="0.8" className="anim-glow" />
            <rect x="14" y="58" width="292" height="12" rx="6" fill="var(--accent)" opacity="0.12" />
            <circle cx="22" cy="64" r="2.5" fill="var(--accent)" />
            <text x="29" y="67" fontFamily="var(--font-mono)" fontSize="6" fill="var(--accent)" fontWeight="600">AI OVERVIEW · sourced from 8 sites</text>

            <text x="22" y="84" fontFamily="var(--font-body)" fontSize="6.5" fill="var(--fg)">For under €2,000, top velvet sofas in 2026 include the</text>
            <text x="22" y="94" fontFamily="var(--font-body)" fontSize="6.5" fill="var(--fg)"><tspan fontWeight="600" fill="var(--accent)">ArtHouses Vela (€1,890)</tspan>, Bourne Slate (€1,640) and</text>
            <text x="22" y="104" fontFamily="var(--font-body)" fontSize="6.5" fill="var(--fg)">Auro Charcoal (€1,950).</text>

            {/* Citations row */}
            <g fontFamily="var(--font-mono)" fontSize="5" fill="var(--accent)">
              <rect x="22" y="108" width="1.5" height="4" fill="var(--accent)" className="anim-pulse" />
              <text x="26" y="111">[1]</text>
              <text x="34" y="111" fill="var(--fg-muted)">arthouses.store</text>
              <text x="78" y="111" fill="var(--fg-muted)">·</text>
              <text x="84" y="111">[2]</text>
              <text x="92" y="111" fill="var(--fg-muted)">arthouses.store/guides</text>
              <text x="158" y="111" fill="var(--fg-muted)">·</text>
              <text x="164" y="111" fill="var(--fg-dim)">[3] reddit</text>
              <text x="200" y="111" fill="var(--fg-dim)">[4] dezeen</text>
            </g>
          </g>

          {/* Organic results */}
          <g fontFamily="var(--font-body)" fontSize="6.5">
            {/* Result 1 — ours */}
            <text x="14" y="128" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="5">arthouses.store › collections › velvet</text>
            <text x="14" y="138" fill="var(--fg)" fontWeight="600" fontSize="7.5">Velvet Sofas — ArtHouses</text>
            <text x="14" y="148" fill="var(--fg-muted)">12 designer velvet sofas in stock. Free DACH shipping.</text>

            {/* Result 2 — ours */}
            <text x="14" y="160" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="5">arthouses.store › guides › velvet-care</text>
            <text x="14" y="170" fill="var(--fg)" fontWeight="600" fontSize="7.5">Velvet Care Guide · 7 min read</text>
          </g>

          {/* Schema badges */}
          <g fontFamily="var(--font-mono)" fontSize="5" fill="var(--accent)">
            <rect x="240" y="125" width="32" height="10" rx="2" fill="none" stroke="var(--accent)" strokeWidth="0.5" className="anim-pulse" />
            <text x="256" y="132" textAnchor="middle">Schema</text>
            <rect x="276" y="125" width="32" height="10" rx="2" fill="none" stroke="var(--accent)" strokeWidth="0.5" className="anim-pulse anim-d-2" />
            <text x="292" y="132" textAnchor="middle">FAQ</text>
            <rect x="240" y="138" width="32" height="10" rx="2" fill="none" stroke="var(--accent)" strokeWidth="0.5" className="anim-pulse anim-d-3" />
            <text x="256" y="145" textAnchor="middle">Product</text>
            <rect x="276" y="138" width="32" height="10" rx="2" fill="none" stroke="var(--accent)" strokeWidth="0.5" className="anim-pulse anim-d-4" />
            <text x="292" y="145" textAnchor="middle">GEO</text>
          </g>
        </svg>
      );
    case "cro":
      return (
        <svg viewBox="0 0 320 180" className="svc-visual-svg" preserveAspectRatio="xMidYMid slice">
          {/* Browser chrome */}
          <rect width="320" height="180" fill="var(--bg)" />
          <rect x="0" y="0" width="320" height="20" fill="var(--bg-soft)" />
          <circle cx="9" cy="10" r="2.5" fill="#ff5f57" opacity="0.5" />
          <circle cx="18" cy="10" r="2.5" fill="#febc2e" opacity="0.5" />
          <circle cx="27" cy="10" r="2.5" fill="#28c840" opacity="0.5" />
          <rect x="40" y="5" width="240" height="11" rx="3" fill="var(--bg)" stroke="var(--border-soft)" strokeWidth="0.5" />
          <text x="50" y="13" fontFamily="var(--font-mono)" fontSize="7" fill="var(--fg-dim)">app.ecomartem.com/cro/test/pdp-velvet-v8</text>

          {/* Header */}
          <text x="14" y="34" fontFamily="var(--font-display)" fontSize="9" fill="var(--fg)" fontWeight="600">PDP test · Velvet Sofa</text>
          <text x="186" y="34" fontFamily="var(--font-mono)" fontSize="6" fill="var(--accent)" className="anim-live">● 95.4% confidence reached</text>

          {/* VARIANT A — Control */}
          <g fontFamily="var(--font-body)" fontSize="6">
            <rect x="14" y="44" width="142" height="124" rx="6" fill="var(--bg-soft)" stroke="var(--border)" strokeWidth="0.5" />
            <text x="22" y="56" fill="var(--fg-dim)" fontFamily="var(--font-mono)" fontSize="5">VARIANT A · CONTROL</text>

            {/* Mock product page */}
            <clipPath id="croImgA"><rect x="22" y="62" width="60" height="44" rx="3" /></clipPath>
            <image href="https://cdn.shopify.com/s/files/1/0821/4406/7805/files/collection-furniture.jpg?v=1775602187&width=480" x="22" y="62" width="60" height="44" preserveAspectRatio="xMidYMid slice" clipPath="url(#croImgA)" />
            <text x="88" y="70" fill="var(--fg)" fontWeight="600">Velvet Sofa</text>
            <text x="88" y="80" fill="var(--fg-dim)" fontSize="5">€1,890 · IN STOCK</text>
            <text x="88" y="90" fill="var(--fg-dim)" fontSize="5">★ 4.8 · 124 reviews</text>
            <rect x="88" y="96" width="44" height="10" rx="2" fill="var(--border)" />
            <text x="92" y="103" fill="var(--fg)" fontSize="5">Add to cart</text>

            {/* Mini metrics */}
            <line x1="22" y1="116" x2="148" y2="116" stroke="var(--border-soft)" strokeWidth="0.3" />
            <text x="22" y="128" fill="var(--fg-dim)" fontFamily="var(--font-mono)" fontSize="5">CVR</text>
            <text x="22" y="140" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="600">2.4%</text>
            <text x="76" y="128" fill="var(--fg-dim)" fontFamily="var(--font-mono)" fontSize="5">SESSIONS</text>
            <text x="76" y="140" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="9" fontWeight="500">8,242</text>
            <text x="22" y="158" fill="var(--fg-dim)" fontSize="5">— baseline</text>
          </g>

          {/* VARIANT B — Winner */}
          <g fontFamily="var(--font-body)" fontSize="6">
            <rect x="166" y="44" width="142" height="124" rx="6" fill="var(--bg-elev)" stroke="var(--accent)" strokeWidth="1" className="anim-glow" />
            <rect x="166" y="44" width="142" height="10" rx="6" fill="var(--accent)" opacity="0.18" />
            <text x="174" y="51" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="5" fontWeight="600">VARIANT B · WINNER</text>
            <text x="280" y="51" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="5">AI-suggested</text>

            {/* Mock product page — improved */}
            <clipPath id="croImgB"><rect x="174" y="62" width="60" height="44" rx="3" /></clipPath>
            <image href="https://arthouses.store/cdn/shop/files/image_1_e1c11004-8605-4ae5-804c-75bb51b19fa8.jpg?v=1775740932&width=480" x="174" y="62" width="60" height="44" preserveAspectRatio="xMidYMid slice" clipPath="url(#croImgB)" />
            <rect x="174" y="62" width="60" height="44" rx="3" fill="none" stroke="var(--accent)" strokeWidth="0.5" opacity="0.5" />
            <text x="240" y="70" fill="var(--fg)" fontWeight="600">Velvet Sofa</text>
            <rect x="240" y="74" width="22" height="6" rx="1" fill="var(--accent)" />
            <text x="242" y="79" fill="#0A0A0A" fontSize="4" fontWeight="600">★ 4.8 · 124</text>
            <text x="240" y="89" fill="var(--fg)" fontWeight="600">€1,890</text>
            <text x="265" y="89" fill="var(--fg-dim)" fontSize="5">Free DACH ship</text>
            <rect x="240" y="94" width="60" height="12" rx="2" fill="var(--accent)" className="anim-shimmer" />
            <text x="270" y="102" fill="#0A0A0A" fontSize="6" fontWeight="600" textAnchor="middle">Add to cart →</text>

            {/* Mini metrics */}
            <line x1="174" y1="116" x2="300" y2="116" stroke="var(--border-soft)" strokeWidth="0.3" />
            <text x="174" y="128" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="5">CVR</text>
            <text x="174" y="140" fill="var(--accent)" fontFamily="var(--font-mono)" fontSize="11" fontWeight="700" className="anim-shimmer">3.7%</text>
            <text x="228" y="128" fill="var(--fg-dim)" fontFamily="var(--font-mono)" fontSize="5">SESSIONS</text>
            <text x="228" y="140" fill="var(--fg)" fontFamily="var(--font-mono)" fontSize="9" fontWeight="500">8,189</text>
            <text x="174" y="158" fill="var(--accent)" fontSize="5" fontWeight="600">+54% lift · ship to prod</text>
          </g>
        </svg>
      );
    case "loop":
      return (
        <svg viewBox="0 0 600 360" className="svc-visual-svg" preserveAspectRatio="xMidYMid meet">
          {/* Browser chrome */}
          <rect width="600" height="360" fill="var(--bg)" />
          <rect x="0" y="0" width="600" height="26" fill="var(--bg-soft)" />
          <circle cx="14" cy="13" r="3.5" fill="#ff5f57" opacity="0.5" />
          <circle cx="26" cy="13" r="3.5" fill="#febc2e" opacity="0.5" />
          <circle cx="38" cy="13" r="3.5" fill="#28c840" opacity="0.5" />
          <rect x="56" y="6" width="488" height="14" rx="4" fill="var(--bg)" stroke="var(--border-soft)" strokeWidth="0.5" />
          <text x="68" y="16" fontFamily="var(--font-mono)" fontSize="9" fill="var(--fg-dim)">app.ecomartem.com/loop · all systems live</text>

          {/* Header */}
          <text x="20" y="48" fontFamily="var(--font-display)" fontSize="13" fill="var(--fg)" fontWeight="600">Founder-Led AI Loop · operations dashboard</text>
          <text x="450" y="48" fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent)" className="anim-live">● 3 services · synced</text>

          {/* PANEL 1 — Marketing fragment (top-left) */}
          <g>
            <rect x="20" y="62" width="280" height="92" rx="6" fill="var(--bg-soft)" stroke="var(--border-soft)" strokeWidth="0.5" />
            <text x="30" y="78" fontFamily="var(--font-mono)" fontSize="8" fill="var(--accent)">01 · MARKETING</text>
            <text x="30" y="93" fontFamily="var(--font-body)" fontSize="9" fill="var(--fg-muted)">Meta · last 7 days</text>

            <text x="30" y="115" fontFamily="var(--font-mono)" fontSize="7" fill="var(--fg-dim)">ROAS</text>
            <text x="30" y="130" fontFamily="var(--font-mono)" fontSize="14" fill="var(--accent)" fontWeight="600">4.7×</text>
            <text x="80" y="115" fontFamily="var(--font-mono)" fontSize="7" fill="var(--fg-dim)">SPEND</text>
            <text x="80" y="130" fontFamily="var(--font-mono)" fontSize="14" fill="var(--fg)" fontWeight="600">$48k</text>
            <text x="140" y="115" fontFamily="var(--font-mono)" fontSize="7" fill="var(--fg-dim)">CPA</text>
            <text x="140" y="130" fontFamily="var(--font-mono)" fontSize="14" fill="var(--fg)" fontWeight="600">$21</text>

            {/* Mini chart */}
            <path
              d="M195,140 L210,135 L225,130 L240,120 L255,118 L270,108 L285,98"
              stroke="var(--accent)"
              strokeWidth="1.4"
              fill="none"
            />
            <path
              d="M195,140 L210,135 L225,130 L240,120 L255,118 L270,108 L285,98 L285,148 L195,148 Z"
              fill="var(--accent)"
              fillOpacity="0.18"
            />
            <circle cx="285" cy="98" r="2.5" fill="var(--accent)" className="anim-pulse" />
          </g>

          {/* PANEL 2 — Ops fragment (top-right) */}
          <g>
            <rect x="312" y="62" width="268" height="92" rx="6" fill="var(--bg-soft)" stroke="var(--border-soft)" strokeWidth="0.5" />
            <text x="322" y="78" fontFamily="var(--font-mono)" fontSize="8" fill="var(--accent)">02 · OPS · workflow</text>

            {/* Trigger */}
            <rect x="322" y="92" width="60" height="22" rx="4" fill="var(--bg-elev)" stroke="var(--border)" strokeWidth="0.5" />
            <rect x="322" y="92" width="60" height="6" rx="4" fill="#95BF47" opacity="0.5" />
            <text x="328" y="108" fontFamily="var(--font-body)" fontSize="8" fill="var(--fg)" fontWeight="600">Shopify</text>

            {/* AI hub */}
            <rect x="406" y="86" width="76" height="34" rx="5" fill="var(--bg-elev)" stroke="var(--accent)" strokeWidth="1" className="anim-glow" />
            <text x="412" y="100" fontFamily="var(--font-mono)" fontSize="7" fill="var(--accent)">AI · CLAUDE</text>
            <text x="412" y="113" fontFamily="var(--font-body)" fontSize="8" fill="var(--fg)" fontWeight="500">enrich · route</text>

            {/* Outputs */}
            <rect x="506" y="78" width="64" height="14" rx="3" fill="var(--bg-elev)" stroke="var(--border)" strokeWidth="0.5" />
            <text x="514" y="88" fontFamily="var(--font-body)" fontSize="7" fill="var(--fg)">Klaviyo</text>
            <rect x="506" y="96" width="64" height="14" rx="3" fill="var(--bg-elev)" stroke="var(--border)" strokeWidth="0.5" />
            <text x="514" y="106" fontFamily="var(--font-body)" fontSize="7" fill="var(--fg)">Gorgias</text>
            <rect x="506" y="114" width="64" height="14" rx="3" fill="var(--bg-elev)" stroke="var(--border)" strokeWidth="0.5" />
            <text x="514" y="124" fontFamily="var(--font-body)" fontSize="7" fill="var(--fg)">NetSuite</text>

            {/* Connections */}
            <g stroke="var(--accent)" strokeWidth="0.8" fill="none">
              <path d="M382,103 L406,103" className="anim-flow" />
              <path d="M482,98 L506,85" className="anim-flow anim-d-1" />
              <path d="M482,103 L506,103" className="anim-flow anim-d-2" />
              <path d="M482,108 L506,121" className="anim-flow anim-d-3" />
            </g>

            <text x="322" y="146" fontFamily="var(--font-mono)" fontSize="6" fill="var(--fg-dim)">[14:32:09] order #ah-19284 · routed</text>
          </g>

          {/* PANEL 3 — CX fragment (bottom-left) */}
          <g>
            <rect x="20" y="166" width="280" height="92" rx="6" fill="var(--bg-soft)" stroke="var(--border-soft)" strokeWidth="0.5" />
            <text x="30" y="182" fontFamily="var(--font-mono)" fontSize="8" fill="var(--accent)">03 · CUSTOMER EXPERIENCE</text>

            {/* Customer message */}
            <rect x="148" y="190" width="142" height="18" rx="9" fill="var(--accent)" />
            <text x="156" y="202" fontFamily="var(--font-body)" fontSize="8" fill="#0A0A0A">Velvet sofa, under €2k?</text>

            {/* AI response with product */}
            <rect x="30" y="214" width="260" height="36" rx="8" fill="var(--bg-elev)" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="0.5" className="anim-glow" />
            <text x="38" y="226" fontFamily="var(--font-mono)" fontSize="6" fill="var(--accent)" className="anim-shimmer">AI · 3 matches from catalog</text>

            <clipPath id="loopCxImg1"><rect x="38" y="230" width="14" height="14" rx="2" /></clipPath>
            <image href="https://arthouses.store/cdn/shop/files/image_1_e1c11004-8605-4ae5-804c-75bb51b19fa8.jpg?v=1775740932&width=160" x="38" y="230" width="14" height="14" preserveAspectRatio="xMidYMid slice" clipPath="url(#loopCxImg1)" />
            <text x="56" y="240" fontFamily="var(--font-body)" fontSize="7" fill="var(--fg)">Vela</text>

            <clipPath id="loopCxImg2"><rect x="84" y="230" width="14" height="14" rx="2" /></clipPath>
            <image href="https://arthouses.store/cdn/shop/files/image_2_8fe14ac1-65ca-452f-af10-11d4a4bf1878.jpg?v=1775740931&width=160" x="84" y="230" width="14" height="14" preserveAspectRatio="xMidYMid slice" clipPath="url(#loopCxImg2)" />
            <text x="102" y="240" fontFamily="var(--font-body)" fontSize="7" fill="var(--fg)">Bourne</text>

            <clipPath id="loopCxImg3"><rect x="138" y="230" width="14" height="14" rx="2" /></clipPath>
            <image href="https://cdn.shopify.com/s/files/1/0821/4406/7805/files/collection-furniture.jpg?v=1775602187&width=160" x="138" y="230" width="14" height="14" preserveAspectRatio="xMidYMid slice" clipPath="url(#loopCxImg3)" />
            <text x="156" y="240" fontFamily="var(--font-body)" fontSize="7" fill="var(--fg)">Auro</text>
          </g>

          {/* PANEL 4 — Loop synthesis (bottom-right) */}
          <g>
            <rect x="312" y="166" width="268" height="92" rx="6" fill="var(--bg-elev)" stroke="var(--accent)" strokeWidth="1" className="anim-glow" />
            <text x="322" y="182" fontFamily="var(--font-mono)" fontSize="8" fill="var(--accent)">04 · LOOP SYNTHESIS</text>

            {/* 4-node loop */}
            <g fontFamily="var(--font-mono)" fontSize="7">
              {[
                { x: 332, label: "data" },
                { x: 394, label: "AI" },
                { x: 456, label: "ship" },
                { x: 518, label: "review" },
              ].map((n, i) => (
                <g key={i}>
                  <rect x={n.x} y="200" width="50" height="28" rx="4" fill="var(--bg-soft)" stroke={i === 1 ? "var(--accent)" : "var(--border)"} strokeWidth={i === 1 ? "1" : "0.5"} />
                  <text x={n.x + 25} y="218" textAnchor="middle" fill={i === 1 ? "var(--accent)" : "var(--fg)"} fontWeight={i === 1 ? "600" : "500"}>
                    {String(i + 1).padStart(2, "0")} · {n.label}
                  </text>
                </g>
              ))}
            </g>
            {/* connections */}
            <g stroke="var(--accent)" strokeWidth="1" fill="none">
              <path d="M382,214 L394,214" />
              <path d="M444,214 L456,214" />
              <path d="M506,214 L518,214" />
              {/* Loop back arrow */}
              <path d="M568,228 C 568,250 332,250 332,232" strokeDasharray="3 3" />
              <path d="M332,232 L327,238 M332,232 L337,238" />
            </g>
            {/* Particle */}
            <circle r="2" fill="var(--accent)">
              <animate attributeName="cx" values="382;394;444;456;506;518" dur="3s" repeatCount="indefinite" />
              <animate attributeName="cy" values="214;214;214;214;214;214" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;1;1;1;0" dur="3s" repeatCount="indefinite" />
            </circle>

            <text x="322" y="248" fontFamily="var(--font-mono)" fontSize="6" fill="var(--fg-dim)">refining · weekly oversight 30m</text>
          </g>

          {/* Footer status */}
          <text x="20" y="296" fontFamily="var(--font-mono)" fontSize="8" fill="var(--fg-dim)">[ALL 3 SERVICES SYNCED] · last sync 2s ago</text>
          <text x="580" y="296" fontFamily="var(--font-mono)" fontSize="8" fill="var(--accent)" textAnchor="end" className="anim-shimmer">+54% lift this quarter</text>

          {/* Bottom progress bar */}
          <rect x="20" y="312" width="560" height="3" rx="1.5" fill="var(--bg-soft)" />
          <rect x="20" y="312" height="3" rx="1.5" fill="var(--accent)">
            <animate attributeName="width" values="0;420;420;560;560;0" keyTimes="0;0.4;0.6;0.85;0.95;1" dur="6s" repeatCount="indefinite" />
          </rect>
          <text x="20" y="332" fontFamily="var(--font-mono)" fontSize="7" fill="var(--fg-dim)">monthly profit audit · 73% complete</text>
        </svg>
      );
    default:
      return null;
  }
}

function Services() {
  type Card = {
    kind: ServiceVisualKind;
    cat: string;
    title: string;
    desc: string;
    price: string;
    per: string;
    setup?: string;
  };
  const groups: { label: string; cards: Card[] }[] = [
    {
      label: "Launch",
      cards: [
        {
          kind: "shopify-launch",
          cat: "Launch",
          title: "Shopify Launch",
          desc:
            "Bespoke Shopify store design and development with AI integrated from day one. Tracking, content engine, and 30-day launch playbook included.",
          price: "From $8,000",
          per: "one-time",
        },
      ],
    },
    {
      label: "Growth",
      cards: [
        {
          kind: "ads",
          cat: "Growth",
          title: "AI Performance Marketing",
          desc:
            "AI-generated creatives at scale. Meta + Google + Pinterest scaling with restored attribution. Performance-tied retainer.",
          price: "$3,500",
          per: "/ mo",
        },
        {
          kind: "ops",
          cat: "Growth",
          title: "Shopify Ops Automation",
          desc:
            "API pipelines for pricing, inventory, translations. AI helpers for your team. Integrations with Klaviyo, Gorgias, ERPs.",
          price: "$1,500",
          per: "/ mo",
        },
        {
          kind: "cx",
          cat: "Growth",
          title: "AI Customer Experience",
          desc:
            "Custom AI chatbot. AI email/SMS flows. Personalization across PDP and landing pages.",
          price: "$3,000",
          per: "/ mo",
        },
      ],
    },
    {
      label: "Scale",
      cards: [
        {
          kind: "migration",
          cat: "Scale",
          title: "Shopify Migration",
          desc:
            "Zero-downtime migration from BigCommerce, WooCommerce, Magento or custom platforms to Shopify Plus. SEO and redirects preserved.",
          price: "From $5,000",
          per: "one-time",
        },
        {
          kind: "seo",
          cat: "Scale",
          title: "SEO & GEO",
          desc:
            "Optimization for traditional search and AI engines (ChatGPT, Perplexity, Claude). Schema, structured data, programmatic SEO at scale.",
          price: "$2,500",
          per: "/ mo",
        },
        {
          kind: "cro",
          cat: "Scale",
          title: "CRO & A/B Testing",
          desc:
            "AI-generated test hypotheses. Variant testing on PDP, cart, checkout. Quarterly CRO sprint roadmap.",
          price: "$2,500",
          per: "/ mo",
        },
      ],
    },
  ];

  return (
    <section className="section" id="services">
      <div className="wrap">
        <div className="sh reveal">
          <span className="eyebrow">04 / Services & pricing</span>
          <h2>Seven services. One bundle. Pick what you need.</h2>
          <p className="lede">
            All prices public. All retainers performance-tied — if the KPIs we agree on aren&apos;t hit in 90 days,
            you get 50% off your next quarter. No anchoring, no quotes, no surprises.
          </p>
        </div>

        {groups.map((g, gi) => (
          <div className="svc-group" key={g.label}>
            <div className="svc-group-head reveal">
              <span className="svc-group-label">
                {String(gi + 1).padStart(2, "0")} / {g.label}
              </span>
              <span className="svc-group-rule"></span>
            </div>
            <div className={"svc-row svc-row-" + g.cards.length}>
              {g.cards.map((c, i) => (
                <article className="svc-card reveal" data-delay={i + 1} key={c.title}>
                  <header className="svc-card-head">
                    <span className="svc-cat">{c.cat}</span>
                    <span className="svc-arrow">
                      <Icon name="arrow" size={14} />
                    </span>
                  </header>
                  <div className="svc-visual">
                    <ServiceVisual kind={c.kind} />
                  </div>
                  <div className="svc-body">
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                  </div>
                  <footer className="svc-foot">
                    <div className="svc-price">
                      <span className="svc-price-num mono">{c.price}</span>
                      <span className="svc-price-per mono">{c.per}</span>
                      {c.setup && <span className="svc-price-setup mono">{c.setup}</span>}
                    </div>
                    <a href="#contact-form" className="svc-link">
                      View details <Icon name="arrow" size={12} />
                    </a>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        ))}

        {/* Bundle row */}
        <div className="svc-bundle reveal" style={{ position: "relative" }}>
          <span
            className="svc-arrow"
            style={{
              position: "absolute",
              top: 22,
              right: 22,
              zIndex: 5,
              width: 28,
              height: 28,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--border)",
              borderRadius: 6,
              background: "var(--bg-elev)",
            }}
          >
            <Icon name="arrow" size={14} />
          </span>
          <div className="svc-bundle-inner">
            <div className="svc-bundle-left">
              <span className="badge">Recommended</span>
              <span className="svc-cat">Bundle · Founder-Led AI Loop</span>
              <h3>All 3 Growth services, as one integrated loop.</h3>
              <p>
                Marketing + Ops + Customer Experience working off the same data layer. Priority response, monthly
                executive review, ArtHouses case-study briefing, quarterly profit audit.
              </p>
              <ul className="svc-bundle-bullets">
                <li>
                  <span className="check">
                    <Icon name="check" size={14} />
                  </span>
                  <span>Performance-tied: −50% if KPIs missed</span>
                </li>
                <li>
                  <span className="check">
                    <Icon name="check" size={14} />
                  </span>
                  <span>Direct line to founder — no AM in between</span>
                </li>
                <li>
                  <span className="check">
                    <Icon name="check" size={14} />
                  </span>
                  <span>Quarterly strategy + scope bonuses included</span>
                </li>
              </ul>
              <div className="svc-bundle-foot">
                <div className="svc-price">
                  <span className="svc-price-num mono" style={{ fontSize: 36 }}>
                    $<FlipOnScroll to={8500} format={(x) => x.toLocaleString()} />
                  </span>
                  <span className="svc-price-per mono">/ mo</span>
                </div>
                <span className="svc-bundle-note mono">Saves you scope, not money — see manifesto</span>
                <a href="#contact-form" className="btn btn-primary btn-fill" style={{ marginTop: 4 }}>
                  Start with a brief <span className="arrow">→</span>
                </a>
              </div>
            </div>
            <div className="svc-bundle-right">
              <ServiceVisual kind="loop" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION — Manifesto
========================================================================== */

function Manifesto() {
  return (
    <section
      className="section"
      id="manifesto"
      style={{
        background: "var(--bg-soft)",
        borderTop: "1px solid var(--border-soft)",
        borderBottom: "1px solid var(--border-soft)",
      }}
    >
      <div className="wrap manifesto">
        <span className="eyebrow" style={{ marginBottom: 28, display: "inline-flex" }}>
          05 / Manifesto
        </span>
        <h2>
          <span className="line-reveal" data-line="0">
            <span>Why we publish</span>
          </span>
          <span className="line-reveal" data-line="1">
            <span>
              our <span style={{ color: "var(--accent)" }}>prices</span>.
            </span>
          </span>
        </h2>
        <p className="line-reveal" data-line="2">
          <span>
            <span className="muted">95% of agencies hide their pricing behind</span> &quot;request a quote&quot;
            forms. <span className="muted">We think that&apos;s manipulation.</span>
          </span>
        </p>
        <p className="line-reveal" data-line="3">
          <span>
            <span className="muted">If you&apos;re a $1–10M Shopify brand, you should be able to know in</span> 30
            seconds <span className="muted">whether we&apos;re a fit. No discovery calls, no proposals, no anchoring tactics.</span>
          </span>
        </p>
        <p className="line-reveal" data-line="4">
          <span>
            <span className="muted">Here&apos;s the math.</span>{" "}If our retainer doesn&apos;t return ROI in your first 90 days, you get −50% off your next quarter — launch offer.{" "}<span className="muted">If it works, you&apos;ll know. If it doesn&apos;t, we won&apos;t pretend.</span>
          </span>
        </p>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION — AntiTargets
========================================================================== */

function AntiTargets() {
  const items = [
    "Anyone on BigCommerce / WooCommerce / Magento. We're Shopify-only by design.",
    "Enterprise with in-house ML teams. You don't need us — you need a vendor.",
    "B2B SaaS / B2B services. Not our domain.",
    "Founders who want daily calls and dedicated AMs. We're async-first.",
    '"AI-curious" who need education before action. We ship — we don\'t teach.',
    "Hobby projects without growth commitment.",
  ];
  const alts = [
    { name: "Eastside Co.", desc: "Full-service Shopify Plus agency, UK-based" },
    { name: "Pilothouse", desc: "Performance media at scale, in-house team" },
    { name: "Common Thread Collective", desc: "DTC growth marketing, US-based" },
  ];
  return (
    <section className="section" id="anti">
      <div className="wrap">
        <div className="sh reveal">
          <span className="eyebrow">06 / Filter</span>
          <h2>We don&apos;t work with everyone.</h2>
          <p className="lede">
            Here&apos;s who shouldn&apos;t fill out our form. Saving you a discovery call is worth more than
            pretending we&apos;d be a fit.
          </p>
        </div>
        <div className="anti-grid">
          <ul className="anti-list">
            {items.map((t, i) => (
              <li className="reveal" data-delay={Math.min(i, 5)} key={t}>
                <span className="x">
                  <Icon name="x" size={12} />
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="anti-side reveal" data-delay="2">
            <h3>If that&apos;s you — here are 3 better-fit alternatives:</h3>
            <p>
              We&apos;d rather send you to the right team than waste a quarter pretending. No referral fees, no
              kickbacks.
            </p>
            <div className="alt-list">
              {alts.map((a) => (
                <a className="alt" key={a.name} href="#" onClick={(e) => e.preventDefault()}>
                  <span>
                    <span className="name">{a.name}</span>
                    <span className="desc">{a.desc}</span>
                  </span>
                  <span className="arrow">
                    <Icon name="arrow" size={16} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION — Cases
========================================================================== */

type CaseKind = "arthouses" | "rainrunner" | "lumena";

/* Hybrid case media: static image (default) + video loop on hover.
   Drop files into /public/cases/{kind}.jpg + /public/cases/{kind}.mp4.
   Falls back to CaseVisual SVG if no media files present. */
function CaseMedia({ kind, brand }: { kind: CaseKind; brand: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasImage, setHasImage] = useState(true);
  const [hasVideo, setHasVideo] = useState(true);

  const handleEnter = () => {
    if (videoRef.current && hasVideo) {
      videoRef.current.play().catch(() => setHasVideo(false));
    }
  };
  const handleLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  if (!hasImage) return <CaseVisual kind={kind} />;

  return (
    <div className="case-media" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/cases/${kind}.jpg`}
        alt={brand}
        className="case-media-img"
        onError={() => setHasImage(false)}
        loading="lazy"
      />
      {hasVideo && (
        <video
          ref={videoRef}
          src={`/cases/${kind}.mp4`}
          muted
          loop
          playsInline
          preload="metadata"
          className="case-media-video"
          onError={() => setHasVideo(false)}
        />
      )}
    </div>
  );
}

function CaseVisual({ kind }: { kind: CaseKind }) {
  if (kind === "arthouses") {
    return (
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className="case-svg">
        <rect width="320" height="200" fill="#161210" />
        <rect x="14" y="14" width="92" height="110" rx="6" fill="#2a221c" />
        <circle cx="60" cy="60" r="20" fill="#d4b78a" opacity="0.85" />
        <rect x="50" y="60" width="20" height="40" fill="#d4b78a" opacity="0.85" />
        <text x="22" y="118" fontFamily="ui-monospace,monospace" fontSize="7" fill="#a08772">CHANDELIER · 01</text>
        <rect x="114" y="14" width="92" height="110" rx="6" fill="#1d1714" />
        <rect x="140" y="36" width="40" height="60" rx="4" fill="#3d2e24" />
        <rect x="148" y="44" width="24" height="44" fill="#7a5a44" />
        <text x="122" y="118" fontFamily="ui-monospace,monospace" fontSize="7" fill="#a08772">PANEL · OAK</text>
        <rect x="214" y="14" width="92" height="110" rx="6" fill="#221c19" />
        <rect x="226" y="60" width="68" height="40" rx="6" fill="#5a4639" />
        <rect x="234" y="50" width="52" height="14" rx="3" fill="#705646" />
        <text x="222" y="118" fontFamily="ui-monospace,monospace" fontSize="7" fill="#a08772">SOFA · VELVET</text>
        <rect x="14" y="134" width="140" height="54" rx="6" fill="#1d1714" />
        <rect x="24" y="144" width="30" height="34" rx="3" fill="#7a5a44" />
        <text x="62" y="158" fontSize="10" fill="#e6d4ba" fontWeight="600">Smart Lamp · Onyx</text>
        <text x="62" y="172" fontFamily="ui-monospace,monospace" fontSize="8" fill="#a08772">€ 489 · IN STOCK</text>
        <rect x="162" y="134" width="144" height="54" rx="6" fill="#1d1714" />
        <rect x="172" y="144" width="30" height="34" rx="3" fill="#d4b78a" />
        <text x="210" y="158" fontSize="10" fill="#e6d4ba" fontWeight="600">Bedding · Linen</text>
        <text x="210" y="172" fontFamily="ui-monospace,monospace" fontSize="8" fill="#a08772">€ 320 · NEW</text>
      </svg>
    );
  }
  if (kind === "rainrunner") {
    return (
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className="case-svg">
        <defs>
          <linearGradient id="rrSky" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#3a4a5e" />
            <stop offset="1" stopColor="#1c2530" />
          </linearGradient>
        </defs>
        <rect width="320" height="200" fill="url(#rrSky)" />
        {Array.from({ length: 30 }).map((_, i) => (
          <line
            key={i}
            x1={i * 12}
            y1="0"
            x2={i * 12 - 30}
            y2="200"
            stroke="#7c8da0"
            strokeOpacity="0.35"
            strokeWidth="1"
          />
        ))}
        <ellipse cx="160" cy="195" rx="50" ry="6" fill="#0a0e14" opacity="0.5" />
        <path d="M130,80 Q160,68 190,80 L196,170 Q160,180 124,170 Z" fill="#2a4a3a" />
        <path d="M130,80 Q160,68 190,80 L186,98 L160,90 L134,98 Z" fill="#1f3a2c" />
        <path d="M158,90 L162,170" stroke="#3a5e48" strokeWidth="1" />
        <rect x="14" y="14" width="110" height="22" rx="4" fill="#0a0e14" fillOpacity="0.7" />
        <text x="24" y="28" fontFamily="ui-monospace,monospace" fontSize="9" fill="#cfd8e0">RAINRUNNER</text>
        <text x="98" y="28" fontFamily="ui-monospace,monospace" fontSize="9" fill="#84CC16">★ 5/5</text>
        <rect x="14" y="168" width="124" height="20" rx="4" fill="#0a0e14" fillOpacity="0.7" />
        <text x="24" y="182" fontFamily="ui-monospace,monospace" fontSize="9" fill="#cfd8e0">£54.90 · RECYCLED</text>
      </svg>
    );
  }
  if (kind === "lumena") {
    return (
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className="case-svg">
        <defs>
          <radialGradient id="lumGlow" cx="50%" cy="55%" r="50%">
            <stop offset="0" stopColor="#4ec5d8" />
            <stop offset="0.5" stopColor="#2876a8" />
            <stop offset="1" stopColor="#0a1430" />
          </radialGradient>
        </defs>
        <rect width="320" height="200" fill="#0a1430" />
        <ellipse cx="160" cy="110" rx="120" ry="80" fill="url(#lumGlow)" opacity="0.95" />
        <path d="M50,120 Q90,108 130,118 T210,116 Q250,108 290,120" stroke="#7fdce8" strokeOpacity="0.3" fill="none" />
        <path d="M50,130 Q90,120 130,130 T210,128 Q250,120 290,130" stroke="#7fdce8" strokeOpacity="0.3" fill="none" />
        <ellipse cx="160" cy="160" rx="38" ry="6" fill="#000" opacity="0.5" />
        <ellipse cx="160" cy="118" rx="32" ry="42" fill="#0a1a2c" />
        <ellipse cx="160" cy="118" rx="24" ry="34" fill="#1a3a52" />
        <ellipse cx="160" cy="118" rx="16" ry="22" fill="#7fdce8" opacity="0.6" />
        <ellipse cx="154" cy="108" rx="6" ry="10" fill="#cfeef4" opacity="0.7" />
        <rect x="14" y="14" width="84" height="22" rx="4" fill="#000" fillOpacity="0.5" />
        <text x="24" y="28" fontFamily="ui-monospace,monospace" fontSize="9" fill="#cfeef4">LUMENA™</text>
        <rect x="14" y="168" width="158" height="20" rx="4" fill="#000" fillOpacity="0.5" />
        <text x="24" y="182" fontFamily="ui-monospace,monospace" fontSize="9" fill="#84CC16">5,000+ CUSTOMERS · TIKTOK</text>
      </svg>
    );
  }
  return null;
}

function Cases() {
  const cases: {
    brand: string;
    url: string;
    tags: string[];
    desc: string;
    result: string;
    visual: CaseKind;
    feat?: boolean;
    badge?: string;
  }[] = [
    {
      brand: "ArtHouses.store",
      url: "https://arthouses.store",
      tags: ["Premium Home Goods", "DACH/EU", "Active"],
      desc:
        "Curated designer home goods — lighting (chandeliers, smart lamps with wireless charging), wall panels, upholstered furniture, luxury bedding. Museum-quality aesthetic.",
      result: "Our own brand. Live testing ground for every AI workflow we sell.",
      visual: "arthouses",
      feat: true,
      badge: "Built and operated by us",
    },
    {
      brand: "RainRunner Raincoats",
      url: "https://rainrunner.store",
      tags: ["Sustainable Fashion", "UK/EU", "Active"],
      desc:
        'Eco-friendly raincoats from 100% recycled materials. £54.90 per unit, 5/5 customer rating. "Future of rainwear" positioning.',
      result: "Shopify build + AI content engine + performance marketing setup.",
      visual: "rainrunner",
    },
    {
      brand: "Lumena™",
      url: "https://lumenalamps.shop",
      tags: ["Home Décor / CE", "Viral DTC", "Active"],
      desc:
        '"World\'s First Ocean Lamps & Speakers." Bluetooth speakers, diffusers, gift bundles. 5,000+ customers. As seen on TikTok.',
      result: "Shopify launch + viral creative engine + retention email/SMS flows.",
      visual: "lumena",
    },
  ];
  const marqueeItems = [
    "ArtHouses.store · DACH",
    "RainRunner · UK/EU",
    "Lumena™ · Viral DTC",
    "Premium Home Goods",
    "Sustainable Fashion",
    "Ocean Lamps",
    "Eco · Recycled",
    "Founder-operated",
    "Shopify-only",
    "AI-native ops",
  ];
  return (
    <section className="section" id="cases">
      <div className="wrap">
        <div className="sh reveal">
          <span className="eyebrow">07 / Proof</span>
          <h2>Brands we&apos;ve built.</h2>
          <p className="lede">
            Real Shopify brands. Real URLs. The first one is ours — operated daily, and the live testing ground
            for everything we ship to clients.
          </p>
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((b, i) => (
              <span key={i}>{b}</span>
            ))}
          </div>
        </div>

        <div className="case3-grid">
          {cases.map((c, i) => (
            <a
              className={"case3 reveal" + (c.feat ? " feat" : "")}
              data-delay={i + 1}
              key={c.brand}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="case3-visual">
                <CaseMedia kind={c.visual} brand={c.brand} />
              </div>
              <div className="case3-body">
                {c.badge && <span className="case3-badge">{c.badge}</span>}
                <h3>{c.brand}</h3>
                <div className="case3-tags">
                  {c.tags.map((t) => (
                    <span className="case3-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>
                <p className="case3-desc">{c.desc}</p>
                <div className="case3-result">
                  <b>{c.result}</b>
                </div>
                <div className="case3-foot">
                  <span className="case3-url">{c.url.replace("https://", "")}</span>
                  <span className="case3-cta">
                    View case study <Icon name="arrow" size={12} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION — About
========================================================================== */

function About() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <div className="sh reveal">
          <span className="eyebrow">08 / Founder</span>
          <h2>I&apos;m Artem. I&apos;ve been building Shopify brands since 2019.</h2>
        </div>
        <div className="about-grid">
          <div className="portrait portrait-photo">
            <div className="portrait-photo-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/founder-4x5.jpg" alt="Artem — founder, in a parking garage with a DJI clip-on mic on his collar" />
            </div>
            <span className="stamp">// FOUNDER · 2026</span>
            <span className="stamp-bottom">UNRETOUCHED · NATURAL LIGHT</span>
          </div>
          <div className="about-bio">
            <p>
              I spent <b>seven years operating Shopify brands</b> — apparel, home, supplements. I lost money. I
              made money. I learned which agency tactics are theater and which actually move revenue.
            </p>
            <p>
              Then in 2024 the AI tooling got <b>genuinely useful</b> for ecommerce ops, and the gap between
              operators who understood it and the agencies selling &quot;AI strategy&quot; decks became absurd.
            </p>
            <p>
              So I started this. <b>One operator, async-first, transparent pricing.</b> If you want a 14-person
              account team and quarterly business reviews, I am not your guy. If you want someone who&apos;s
              losing money on bad creatives at 2am the same way you are — send a brief, I&apos;ll reply async.
            </p>
            <p>
              I still run <b>ArtHouses.store</b>{" "}daily. That&apos;s not a bio bullet — it&apos;s the reason this
              works. The playbook ships to my own bank account first.
            </p>
            <div className="links">
              <a href="https://instagram.com/ecomartem" target="_blank" rel="noopener noreferrer">
                → Instagram / @ecomartem
              </a>
              <a href="https://youtube.com/@ecomartem" target="_blank" rel="noopener noreferrer">
                → YouTube / @ecomartem
              </a>
              <a href="#">→ X / @artem_k</a>
              <a href="#">→ LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION — FAQ
========================================================================== */

function FAQ() {
  const items = [
    {
      q: "Why Shopify only?",
      a:
        "Because depth beats breadth. Every workflow we ship — from Klaviyo flows to inventory automations — is tuned to Shopify's data model and APIs. Trying to support BigCommerce + WooCommerce + Magento at the same level would dilute everything we do.",
    },
    {
      q: 'What does "performance-tied retainer" actually mean?',
      a:
        "We agree on 2–3 KPIs in writing during onboarding (typically ROAS, CAC, and a revenue target). If we miss them by quarter-end, your next quarter is 50% off — automatically, no negotiation. Documented in the master agreement.",
    },
    {
      q: "How fast do you respond? (We're async-first — what does that look like?)",
      a:
        'Replies under 24 hours on weekdays via Slack. One scheduled 30-minute review per week. No daily standups, no Zoom-by-default. If something is genuinely on fire we jump on a call inside 2 hours — but "on fire" is rare.',
    },
    {
      q: "What if my ad spend is below $30k/mo?",
      a:
        "We're probably not the right fit yet. Below $30k/mo, the math on a $3,500/mo retainer is hard to justify. Come back when you've crossed it — we'll be here.",
    },
    {
      q: "Do you take equity instead of cash?",
      a:
        "No. Equity deals create the wrong incentives, the wrong reporting cadence, and a relationship that's hard to exit cleanly. Cash, performance clauses, and a one-month-out termination — that's it.",
    },
    {
      q: "Can I see the AI tools you use?",
      a:
        "Yes — full stack disclosed during onboarding. Anthropic Claude for reasoning, OpenAI for some specific generation tasks, n8n for orchestration, plus a handful of internal tools we've built. No black boxes.",
    },
    {
      q: "Where are you based / what timezone?",
      a:
        "Founder is based in EU (CET). Async-first means timezone overlap rarely matters. We service brands in US, UK, EU, and AU.",
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="sh reveal">
          <span className="eyebrow">09 / FAQ</span>
          <h2>Things people ask before they book.</h2>
        </div>
        <div className="faq reveal">
          {items.map((it, i) => (
            <div
              className={"faq-item" + (open === i ? " open" : "")}
              key={it.q}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <div className="faq-q">
                <span>{it.q}</span>
                <span className="plus">+</span>
              </div>
              <div className="faq-a">
                <div className="faq-a-inner">{it.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   SECTION — Final CTA + Contact Form
========================================================================== */

function FinalCTA() {
  return (
    <section className="final-cta" id="cta">
      <div className="final-cta-inner reveal">
        <span className="eyebrow" style={{ marginBottom: 28, display: "inline-flex" }}>
          10 / Ship
        </span>
        <h2>
          <span className="shimmer">Ready to make your marketing spend pay back?</span>
        </h2>
        <div className="final-cta-actions">
          <Magnetic strength={0.25}>
            <a href="#contact-form" className="btn btn-primary btn-fill">
              Send a brief <span className="arrow">→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.18}>
            <a href="#contact-form" className="btn btn-ghost btn-fill">
              Request 20-min consultation
            </a>
          </Magnetic>
        </div>
        <div className="final-counter">
          <span className="live">
            Currently serving <b><FlipOnScroll to={4} format={(x) => String(Math.round(x))} /> brands</b>. Total
            MRR managed: <b>$<FlipOnScroll to={842} format={(x) => x.toLocaleString()} />k</b>. Updated daily.
          </span>
        </div>
      </div>

      {/* Contact / Brief form */}
      <div className="contact-form-wrap reveal" id="contact-form">
        <div className="contact-form-inner">
          <div className="contact-form-side">
            <span className="eyebrow" style={{ marginBottom: 20, display: "inline-flex" }}>
              brief · ~3 min
            </span>
            <h3 style={{ marginBottom: 14 }}>Tell me what you&apos;re shipping.</h3>
            <p style={{ color: "var(--fg-muted)", fontSize: 15, lineHeight: 1.5, marginBottom: 24 }}>
              I review every brief myself within <b style={{ color: "var(--fg)" }}>24 business hours</b>. If we&apos;re a fit, I&apos;ll send a Loom walkthrough of your store with 3 quick wins — even before our first call.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, color: "var(--fg-muted)", fontSize: 14 }}>
              <li>→ No discovery-call qualifying. The brief tells me what I need.</li>
              <li>→ If we&apos;re not a fit, I link you to better-fit alternatives.</li>
              <li>→ Async-first. Reply by Loom or written within 24h.</li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   ContactForm — Formspree-react integration (Ajax, no page reload)
========================================================================== */

function ContactForm() {
  const [state, handleSubmit] = useForm("xpqbdzow");

  if (state.succeeded) {
    return (
      <div className="contact-form contact-form-success">
        <div className="ff-success-icon" aria-hidden="true">
          <Icon name="check" size={28} />
        </div>
        <h4 className="ff-success-title">Brief received.</h4>
        <p className="ff-success-body">
          Reply within <b>24 business hours</b>. If we&apos;re a fit, you&apos;ll get a Loom walkthrough of your store with 3 quick wins.
        </p>
        <p className="ff-success-meta">No newsletter. No drip. Just a real reply.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="ff-row">
        <label className="ff-label">
          <span>Your name</span>
          <input type="text" id="name" name="name" required placeholder="Jane Doe" />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="ff-error" />
        </label>
        <label className="ff-label">
          <span>Work email</span>
          <input type="email" id="email" name="email" required placeholder="jane@yourbrand.com" />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="ff-error" />
        </label>
      </div>
      <label className="ff-label">
        <span>Shopify store URL</span>
        <input
          type="text"
          inputMode="url"
          id="store_url"
          name="store_url"
          required
          placeholder="yourbrand.com or https://yourbrand.myshopify.com"
          autoComplete="url"
        />
        <ValidationError prefix="Store URL" field="store_url" errors={state.errors} className="ff-error" />
      </label>
      <div className="ff-row">
        <label className="ff-label">
          <span>Monthly revenue</span>
          <select name="revenue" required defaultValue="">
            <option value="" disabled>Pick a range</option>
            <option value="under-30k">Under $30k/mo (we&apos;re probably not a fit yet)</option>
            <option value="30-100k">$30k–$100k/mo</option>
            <option value="100-300k">$100k–$300k/mo</option>
            <option value="300k-1m">$300k–$1M/mo</option>
            <option value="1m+">$1M+/mo</option>
          </select>
        </label>
        <label className="ff-label">
          <span>Interested in</span>
          <select name="service" required defaultValue="">
            <option value="" disabled>Pick a service</option>
            <option value="bundle">Founder-Led AI Loop (Bundle)</option>
            <option value="launch">Shopify Launch (one-time)</option>
            <option value="marketing">AI Performance Marketing</option>
            <option value="ops">Shopify Ops Automation</option>
            <option value="cx">AI Customer Experience</option>
            <option value="migration">Shopify Migration</option>
            <option value="seo">SEO &amp; GEO</option>
            <option value="cro">CRO &amp; A/B Testing</option>
            <option value="not-sure">Not sure yet — advise me</option>
          </select>
        </label>
      </div>
      <label className="ff-label">
        <span>What&apos;s the one thing you&apos;d want fixed first?</span>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="ROAS dropped from 4× to 1.8× in 3 months. Or: spending 20h/week on manual ops. Or: launching new line, need stack from scratch."
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="ff-error" />
      </label>

      <fieldset className="ff-fieldset">
        <legend className="ff-legend">How should we reply?</legend>
        <label className="ff-radio">
          <input type="radio" name="response_pref" value="async" defaultChecked />
          <span className="ff-radio-body">
            <span className="ff-radio-title">Async — Loom walkthrough + written</span>
            <span className="ff-radio-sub">Founder reviews personally · 24h reply · best fit for our model</span>
          </span>
        </label>
        <label className="ff-radio">
          <input type="radio" name="response_pref" value="consultation" />
          <span className="ff-radio-body">
            <span className="ff-radio-title">20-min consultation call</span>
            <span className="ff-radio-sub">A team manager runs the call · founder joins for closing if relevant</span>
          </span>
        </label>
      </fieldset>

      <ValidationError errors={state.errors} className="ff-error ff-error-form" />

      <button type="submit" className="btn btn-primary btn-fill ff-submit" disabled={state.submitting}>
        {state.submitting ? "Sending…" : (
          <>Send brief <span className="arrow">→</span></>
        )}
      </button>
      <p className="ff-fineprint">
        No newsletter. No drip sequences. Reply within 24 business hours or you&apos;ll never hear from us again.
      </p>
    </form>
  );
}

/* ==========================================================================
   SECTION — Footer
========================================================================== */

function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="#top" className="nav-logo">
              <span className="dot"></span>EcomArtem
            </a>
            <p>
              Done-for-you AI integration for 7-figure Shopify DTC brands. Built by an operator. Async-first.
              Transparent pricing.
            </p>
          </div>
          <div className="foot-col">
            <h5>Product</h5>
            <ul>
              <li>
                <a href="#services">Marketing Loop</a>
              </li>
              <li>
                <a href="#services">Ops Loop</a>
              </li>
              <li>
                <a href="#services">Experience Loop</a>
              </li>
              <li>
                <a href="#services">Full Bundle</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <ul>
              <li>
                <a href="#manifesto">Manifesto</a>
              </li>
              <li>
                <a href="#about">About Artem</a>
              </li>
              <li>
                <a href="#cases">Case studies</a>
              </li>
              <li>
                <a href="#contact-form">Send a brief</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Elsewhere</h5>
            <ul>
              <li>
                <a href="#">X / Twitter</a>
              </li>
              <li>
                <a href="#">LinkedIn</a>
              </li>
              <li>
                <a href="https://arthouses.store" target="_blank" rel="noopener noreferrer">
                  ArtHouses.store
                </a>
              </li>
              <li>
                <a href="#">RSS</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bot">
          <span>// We ship — we don&apos;t advise.</span>
          <span>© 2026 EcomArtem · All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
