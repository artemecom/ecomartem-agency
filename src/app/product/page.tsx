import type { Metadata } from "next";
import Link from "next/link";
import PlaybookForm from "./PlaybookForm";
import SmartImg from "../story/SmartImg";

const URL = "https://ecomartem.com/product";
const TITLE = "The Organic Shopify Playbook - Free";
const DESCRIPTION =
  "My entire 7-year system for getting Shopify customers without paying for every click. Free, no upsell to a paid course. Get the playbook.";

export const metadata: Metadata = {
  title: `${TITLE} | EcomArtem`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE, description: DESCRIPTION, url: URL, siteName: "EcomArtem",
    type: "website", locale: "en_US", images: ["/founder-16x9.jpg"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/founder-16x9.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

const CLAIMS = [
  { n: "9 modules", l: "+ a copy-paste templates pack" },
  { n: "7 years", l: "of real store experience, distilled" },
  { n: "$0", l: "no paid course behind it" },
];

const PLATFORMS = ["Shopify", "Instagram", "TikTok", "Google", "YouTube", "ChatGPT"];

const STEPS = [
  { n: "1", t: "Grab the free playbook", d: "Two questions, your email, instant access. A copy lands in your inbox too." },
  { n: "2", t: "Build or fix, then get traffic", d: "Follow the system: a store that converts, then organic content that earns the view without paid ads." },
  { n: "3", t: "Scale it", d: "Use the same content stack I use to keep the volume up, or have me build the whole store for you." },
];

const INSIDE: { n: string; t: string; d: string }[] = [
  { n: "01", t: "The truth about ecom in 2026", d: "Why the product is now the easy part, and where the real money hides." },
  { n: "02", t: "Build the store fast, and right", d: "The 6 setup choices that actually move conversion. Launch checklist included." },
  { n: "03", t: "Nail the offer before traffic", d: "The mistake that burns budgets to zero sales, and the offer template that fixes it." },
  { n: "04", t: "The traffic system (the real 80%)", d: "Organic-first, one channel, the hook-and-retention formula that earns the view." },
  { n: "05", t: "Produce content daily without burnout", d: "The exact stack I use, and the line between what you automate and what stays human." },
  { n: "06", t: "Be visible to the AI agents too", d: "The 2026 edge almost no store owner has noticed yet." },
  { n: "07", t: "Measure what actually matters", d: "The four numbers that tell you the truth every week." },
  { n: "08", t: "When to scale (and get help)", d: "How to add paid ads without lighting money on fire." },
  { n: "09", t: "Templates and swipe pack", d: "Checklists, offer template, content rhythm, hook bank, caption skeletons." },
];

// Real client dashboards - drop verified revenue screenshots at these paths.
const PROOF = [
  { img: "/story/proof-1.jpg", cap: "$11,801 in a single day - 67 orders" },
  { img: "/story/proof-2.jpg", cap: "$7,659 in a day - 159 orders at 3% conversion" },
  { img: "/story/result-3.jpg", cap: "$8,914 in three weeks - 238 orders" },
];

const FAQ: { q: string; a: string }[] = [
  { q: "Is it really free? What's the catch?", a: "Really free, and there's no upsell to a paid course. In 2026 information is cheap and AI can build a store for you, so a course isn't worth much. If the playbook helps, some of you will want the tool I use for traffic, or want me to build your store. That's the only monetization. I earn trust first." },
  { q: "Who is this for?", a: "Anyone building or running a Shopify store who is tired of guessing at traffic. Beginners get the full path; people with a store and no sales get the fix." },
  { q: "Do I need a budget?", a: "No. The whole point is organic-first: getting customers without paying for every click. You can start with the store you already have." },
  { q: "Why should I trust you?", a: "7 years running Shopify stores, out of Russia, which is why you may not have seen me. I've made real money and lit real money on fire, and both lessons are in here honestly." },
  { q: "What do I get right after signing up?", a: "Instant access to the full playbook, plus a copy in your email. Two quick questions up front help me point you to the right next step." },
  { q: "Will it stay free?", a: "For now, yes. I may turn it into a paid product later or fold it into something bigger. If you're reading this, grab it while it's free." },
];

const faqLd = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

function CTA({ children = "Send me the playbook →" }: { children?: React.ReactNode }) {
  return (
    <a href="#get" className="inline-flex items-center justify-center rounded-full bg-lime-400 px-8 py-4 text-base font-semibold text-zinc-950 shadow-lg shadow-lime-400/20 transition-colors hover:bg-lime-300">
      {children}
    </a>
  );
}

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-lime-400/30 dark:bg-zinc-950 dark:text-zinc-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <header className="border-b border-zinc-200 dark:border-zinc-900 px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="font-bold tracking-tight">EcomArtem</Link>
          <a href="#get" className="rounded-full bg-lime-400 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-lime-300">Get it free →</a>
        </div>
      </header>

      {/* 1. HERO + CLAIMS */}
      <section className="px-6 pt-14 md:pt-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Free playbook · No paid course behind it</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-zinc-900 dark:text-white md:text-6xl">
            I&apos;m giving away my entire 7-year Shopify playbook. For free.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            The exact system I use to get customers for a Shopify store without paying for every click. I&apos;m a Russian operator who&apos;s run stores for 7 years, so you probably haven&apos;t seen me. No upsell, no fake scarcity. The store is the easy 20%. This is how you win the 80%.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <CTA />
            <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Instant access · in your inbox too</span>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {CLAIMS.map((c) => (
              <div key={c.l} className="rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40 p-6">
                <div className="font-mono text-3xl font-bold tracking-tight text-lime-600 dark:text-lime-400">{c.n}</div>
                <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{c.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SCARCITY */}
      <section className="px-6 py-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-lime-500/30 bg-lime-400/10 dark:border-lime-400/30 dark:bg-lime-400/5 p-5 text-center">
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            This is free for now. I may turn it into a paid product later. If you&apos;re here, grab it while it&apos;s free.
          </p>
        </div>
      </section>

      {/* 3. SOCIAL PROOF */}
      <section className="px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-zinc-300 to-zinc-400 dark:border-zinc-950 dark:from-zinc-600 dark:to-zinc-700" />
            ))}
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">
            Join <span className="font-semibold text-zinc-900 dark:text-white">5,000+ operators</span> who&apos;ve learned this system. 1,500+ stores built.
          </p>
        </div>
      </section>

      {/* 4. PLATFORMS STRIP */}
      <section className="border-y border-zinc-200 dark:border-zinc-900 px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PLATFORMS.map((p) => (
            <span key={p} className="font-mono text-sm uppercase tracking-widest text-zinc-400 dark:text-zinc-600">{p}</span>
          ))}
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">How it works</p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Three steps, no fluff</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 font-bold text-zinc-950">{s.n}</div>
                <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHAT'S INSIDE (PACKAGE) */}
      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/20 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">9 modules + a templates pack</p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Everything that&apos;s inside</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {INSIDE.map((m) => (
              <div key={m.n} className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 p-6">
                <div className="font-mono text-sm font-bold text-lime-600 dark:text-lime-400">{m.n}</div>
                <h3 className="mt-2 text-lg font-bold text-zinc-900 dark:text-white">{m.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{m.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-zinc-600 dark:text-zinc-400">People sell watered-down versions of this for hundreds of dollars. I&apos;m giving you the real one for nothing.</p>
        </div>
      </section>

      {/* 7. WHAT'S THE CATCH */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/30 p-8 md:p-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">So what&apos;s the catch</p>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Look, I know what you&apos;re thinking.</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p>&ldquo;Nothing&apos;s free. What&apos;s he selling?&rdquo; Fair. Every guru gives you a free thing to sell you the $997 thing. I&apos;m not doing that.</p>
            <p>In 2026 information is cheap and AI can build a store for you, so a course isn&apos;t worth much. My honest angle: if the playbook helps, some of you will want the tool I use to produce traffic content, and a few will want me to just build the whole store for you. That&apos;s how I make money here. Not by gating the knowledge.</p>
            <p className="font-semibold text-zinc-900 dark:text-white">So I give you the real thing and earn your trust first. That&apos;s the whole funnel. I hate hidden ones too.</p>
          </div>
        </div>
      </section>

      {/* 8. PROOF */}
      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/20 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Real client stores · real dashboards</p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">This system has real numbers behind it</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {PROOF.map((p) => (
              <figure key={p.img} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                <SmartImg src={p.img} alt={p.cap} className="aspect-[4/3] w-full bg-white object-contain" label="Revenue screenshot" />
                <figcaption className="p-4 text-sm text-zinc-700 dark:text-zinc-300">{p.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 8b. STORES (examples) */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Real brands, not shelf junk</p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Stores we&apos;ve built and run</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { img: "/playbook/store-arthouses.jpg", n: "ArtHouses", d: "Premium lighting and home. DACH / EU." },
              { img: "/playbook/store-rainrunner.jpg", n: "RainRunner", d: "Eco raincoats. £54.90, 5/5 rated. UK / EU." },
              { img: "/playbook/store-lumena.jpg", n: "Lumena", d: "Ocean lamps and speakers. 5,000+ customers." },
            ].map((s) => (
              <figure key={s.n} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                <SmartImg src={s.img} alt={`${s.n} storefront`} className="aspect-[3/4] w-full object-cover object-top" label="Storefront" />
                <figcaption className="p-4"><span className="font-bold text-zinc-900 dark:text-white">{s.n}</span> <span className="text-sm text-zinc-600 dark:text-zinc-400">{s.d}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 9. GET IT (FINAL CTA + FORM) */}
      <section id="get" className="scroll-mt-20 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">Get the playbook</h2>
          <p className="mt-4 mb-8 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            Drop your details and two quick answers. Instant access, plus a copy in your inbox. Free, no spam.
          </p>
          <PlaybookForm />
        </div>
      </section>

      {/* WORK WITH ME (secondary offer) */}
      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/20 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Or skip the learning curve</p>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Already want it done for you?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            The playbook hands you the whole system. If you&apos;d rather I just build your store personally, end to end, on 7 years and 1,500+ stores, that door is open. Fewer clients, done properly. Start with a free breakdown: I&apos;ll look at your situation and tell you honestly whether it&apos;s a fit. No hard sell.
          </p>
          <Link href="/story#apply" className="mt-6 inline-flex items-center justify-center rounded-full bg-lime-400 px-8 py-4 font-semibold text-zinc-950 transition-colors hover:bg-lime-300">
            Book a free store breakdown →
          </Link>
        </div>
      </section>

      {/* AUTHOR */}
      <section className="px-6 py-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/30 p-8 text-center md:flex-row md:text-left">
          <SmartImg src="/founder-4x5.jpg" alt="Artem K., founder of EcomArtem" className="h-24 w-24 shrink-0 rounded-full object-cover object-top" label="Photo" />
          <div>
            <div className="text-lg font-bold text-zinc-900 dark:text-white">Artem K. - founder, EcomArtem</div>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">Shopify operator since 2019. Built and helped build 1,500+ stores, trained 5,000+ people, runs his own brands. Want the longer version? <Link href="/story" className="text-lime-600 underline decoration-lime-500/40 underline-offset-2 hover:text-lime-500 dark:text-lime-400">Read the founder story</Link>.</p>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="border-t border-zinc-200 dark:border-zinc-900 px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Frequently asked</h2>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-900">
            {FAQ.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">{f.q}</h3>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center"><CTA /></div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 dark:border-zinc-900 px-6 py-10 text-center font-mono text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
        EcomArtem · Shopify operator since 2019
      </footer>
    </main>
  );
}
