import type { Metadata } from "next";
import Link from "next/link";
import PlaybookForm from "./PlaybookForm";
import SmartImg from "../story/SmartImg";

const URL = "https://ecomartem.com/product";
const TITLE = "The $1,997 Organic Shopify Playbook - Free";
const DESCRIPTION =
  "The exact 7-year system I use to get Shopify customers without paying for every click. Gurus sell a worse version for $1,997. I'm giving you the real one free.";

export const metadata: Metadata = {
  title: `${TITLE} | EcomArtem`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: "EcomArtem", type: "website", locale: "en_US", images: ["/founder-16x9.jpg"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/founder-16x9.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

const STACK = [
  { t: "The 9-module Organic Shopify Playbook", d: "The full system: store, offer, traffic, content, scaling. Not theory, the exact thing I run." },
  { t: "My complete tool stack, by stage", d: "The specific apps I use to research products, build the store with AI, source, and convert. No more guessing." },
  { t: "The traffic system (the real 80%)", d: "The hook-and-retention formula that earns the view without paying for every click." },
  { t: "The templates and swipe pack", d: "Launch checklist, offer template, content rhythm, hook bank, caption skeletons. Copy-paste." },
];

const STATS = [
  { n: "1,500+", l: "stores built" },
  { n: "5,000+", l: "people trained" },
  { n: "7 yrs", l: "operating since 2019" },
  { n: "$11,801", l: "top single day" },
];

const PLATFORMS = ["Shopify", "Instagram", "TikTok", "Google", "YouTube", "ChatGPT"];

const STEPS = [
  { n: "1", t: "Grab it free", d: "Two questions, your email, instant access. A copy lands in your inbox too." },
  { n: "2", t: "Build or fix, then get traffic", d: "Follow the system: a store that converts, then organic content that earns the view without paid ads." },
  { n: "3", t: "Scale it", d: "Use the same stack I use to keep the volume up, or have me build the whole store for you." },
];

const PROOF = [
  { img: "/story/proof-1.jpg", cap: "$11,801 in a single day - 67 orders" },
  { img: "/story/proof-2.jpg", cap: "$7,659 in a day - 159 orders at 3%" },
  { img: "/story/result-3.jpg", cap: "$8,914 in three weeks - 238 orders" },
];

const FAQ: { q: string; a: string }[] = [
  { q: "Is it really free? What's the catch?", a: "Really free, no upsell to a paid course. Gurus sell a worse version of this for $1,997. I give the real one away because in 2026 information is cheap, and I only make money if you later use the tool I built or ask me to build your store. So I earn your trust first. That's the whole model." },
  { q: "Will it stay free?", a: "For now. I may turn it into a paid product later or fold it into something bigger. If you're reading this, grab it while it's free." },
  { q: "Who is this for?", a: "Anyone building or running a Shopify store who's tired of guessing at traffic. Beginners get the full path; people with a store and no sales get the fix." },
  { q: "Do I need a budget?", a: "No. The whole point is organic-first: customers without paying for every click. You can start with the store you already have." },
  { q: "Why should I trust you?", a: "7 years running Shopify stores, out of Russia, which is why you may not have seen me. I've made real money and lit real money on fire, and both lessons are in here honestly. Read the founder story if you want the full version." },
  { q: "What do I get right after I sign up?", a: "Instant access to the full playbook, online and as a PDF, plus a copy in your email. Two quick questions up front just help me point you to the right next step." },
];

const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

function CTA({ children = "Send me the playbook - free →", sub }: { children?: React.ReactNode; sub?: string }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <a href="#get" className="inline-flex items-center justify-center rounded-full bg-lime-400 px-8 py-4 text-base font-semibold text-zinc-950 shadow-lg shadow-lime-400/20 transition-colors hover:bg-lime-300">{children}</a>
      {sub ? <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">{sub}</span> : null}
    </div>
  );
}

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-lime-400/30 dark:bg-zinc-950 dark:text-zinc-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <header className="border-b border-zinc-200 px-6 py-5 dark:border-zinc-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="font-bold tracking-tight">EcomArtem</Link>
          <a href="#get" className="rounded-full bg-lime-400 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-lime-300">Claim it free →</a>
        </div>
      </header>

      {/* 1. HERO — attention + value anchor + scarcity + FACE */}
      <section className="px-6 pt-14 pb-16 md:pt-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-5 inline-block rounded-full border border-lime-500/40 bg-lime-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">
              Normally a $1,997 playbook · yours free
            </p>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-zinc-900 dark:text-white md:text-5xl">
              I&apos;m giving away my $1,997 Shopify playbook. For free.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              The exact 7-year system I use to get customers without paying for every click. Gurus gate a worse version behind $1,997. I&apos;m handing you the real one for $0.
            </p>
            <p className="mt-4 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              Heads up: this won&apos;t be free forever. Grab it while it is.
            </p>
            <div className="mt-7">
              <CTA sub="Instant access · in your inbox too" />
            </div>
            <div className="mt-7 flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-9 w-9 rounded-full border-2 border-white bg-gradient-to-br from-zinc-300 to-zinc-400 dark:border-zinc-950 dark:from-zinc-600 dark:to-zinc-700" />
                ))}
              </div>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Learned by <strong className="text-zinc-900 dark:text-white">5,000+ operators</strong>
              </span>
            </div>
          </div>
          <div className="relative">
            <SmartImg src="/founder-16x9.jpg" alt="Artem K., founder of EcomArtem" className="aspect-[4/5] w-full rounded-3xl object-cover object-top" label="Founder photo" />
            <div className="absolute bottom-4 left-4 rounded-xl bg-zinc-950/80 px-4 py-2 backdrop-blur">
              <div className="text-sm font-bold text-white">Artem K.</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-lime-400">Shopify operator · 7 years</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOCIAL PROOF BAR */}
      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
              <div className="font-mono text-3xl font-bold tracking-tight text-lime-600 dark:text-lime-400 md:text-4xl">{s.n}</div>
              <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PLATFORMS STRIP */}
      <section className="border-y border-zinc-200 px-6 py-8 dark:border-zinc-900">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PLATFORMS.map((p) => (
            <span key={p} className="font-mono text-sm uppercase tracking-widest text-zinc-400 dark:text-zinc-600">{p}</span>
          ))}
        </div>
      </section>

      {/* 4. OFFER STACK — value breakdown, anchor repeated */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">What you&apos;re getting</p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">The full stack. Zero to start.</h2>
          <div className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {STACK.map((s) => (
              <div key={s.t} className="flex gap-4 p-5">
                <span className="mt-1 shrink-0 font-bold text-lime-500 dark:text-lime-400">✓</span>
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-white">{s.t}</div>
                  <div className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{s.d}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl border border-lime-500/30 bg-lime-400/10 p-5 dark:border-lime-400/30 dark:bg-lime-400/5 sm:flex-row sm:items-center">
            <div>
              <div className="text-sm text-zinc-600 line-through dark:text-zinc-400">What gurus charge for this: $1,997</div>
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">Your price today: Free</div>
            </div>
            <a href="#get" className="shrink-0 rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-lime-300">Claim it →</a>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-900 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">How it works</p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Three steps, no fluff</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 font-bold text-zinc-950">{s.n}</div>
                <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHAT'S THE CATCH — trust reversal + FACE + name */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/30 md:flex-row md:p-10">
            <SmartImg src="/founder-4x5.jpg" alt="Artem K." className="h-28 w-28 shrink-0 rounded-2xl object-cover object-top" label="Founder" />
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Wait, what&apos;s the catch?</p>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Look, I know what you&apos;re thinking.</h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                <p>&ldquo;Nobody gives away a $1,997 system for free. Where&apos;s the upsell?&rdquo; Fair. So let me spill it.</p>
                <p>In 2026 information is cheap and AI can build a store for you. A course isn&apos;t worth what gurus pretend. I make money two ways only: if the playbook helps and you want the tool I use for traffic, or you want me to build your store personally. Both happen only <strong className="text-zinc-900 dark:text-white">after</strong> I&apos;ve actually helped you.</p>
                <p>So there&apos;s no $4k program at the end. No pressure. I give you the real thing, earn your trust, and win only when you win. That&apos;s the opposite of the guru who gates it behind $1,997.</p>
                <p className="font-semibold text-zinc-900 dark:text-white">That&apos;s the whole catch. I hate hidden ones too.</p>
              </div>
              <div className="mt-6">
                <CTA>Yes, send me the free playbook →</CTA>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PROOF — dashboards */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-900 dark:bg-zinc-900/20">
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

      {/* 8. STORES */}
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
                <figcaption className="p-4">
                  <span className="font-bold text-zinc-900 dark:text-white">{s.n}</span>{" "}
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">{s.d}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FOUNDER STORY TEASER — FACE + pain */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-900 dark:bg-zinc-900/20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <SmartImg src="/story/life-work.jpg" alt="Artem working" className="aspect-[4/3] w-full rounded-2xl object-cover" label="Founder" />
          <div>
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Why I even wrote this</p>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">I made $400k a month, then almost buried it.</h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
              I burned over $700k a year chasing a &ldquo;serious&rdquo; physical brand while the lean online store quietly kept feeding me through the whole collapse. First-time builders burn $10,000-15,000 on ads before their first sale. This playbook is everything I paid for the hard way, so you don&apos;t.
            </p>
            <Link href="/story" className="mt-5 inline-block font-semibold text-lime-600 underline decoration-lime-500/40 underline-offset-2 hover:text-lime-500 dark:text-lime-400">Read the full founder story →</Link>
          </div>
        </div>
      </section>

      {/* 10. GET IT — re-anchor + form */}
      <section id="get" className="scroll-mt-20 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">$1,997 value · your price: free</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">Claim your free playbook</h2>
          <p className="mx-auto mt-4 mb-8 max-w-md text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            Two quick answers and your email. Instant access, online and PDF, plus a copy in your inbox. No card, no strings. And it won&apos;t be free forever.
          </p>
        </div>
        <div className="mx-auto max-w-xl">
          <PlaybookForm />
        </div>
      </section>

      {/* 11. WORK WITH ME */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-900 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Or skip the learning curve</p>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Already want it done for you?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            The playbook hands you the whole system. If you&apos;d rather I just build your store personally, end to end, on 7 years and 1,500+ stores, that door is open. Fewer clients, done properly. Start with a free breakdown: I&apos;ll tell you honestly whether it&apos;s a fit. No hard sell.
          </p>
          <Link href="/story#apply" className="mt-6 inline-flex items-center justify-center rounded-full border border-zinc-300 px-8 py-4 font-semibold text-zinc-900 transition-colors hover:border-lime-500 dark:border-zinc-700 dark:text-white dark:hover:border-lime-400">Book a free store breakdown →</Link>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="border-t border-zinc-200 px-6 py-16 dark:border-zinc-900">
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
          <div className="mt-10 flex justify-center">
            <CTA>Send me the playbook - free →</CTA>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200 px-6 py-10 text-center font-mono text-[11px] uppercase tracking-widest text-zinc-400 dark:border-zinc-900 dark:text-zinc-600">
        EcomArtem · Shopify operator since 2019
      </footer>
    </main>
  );
}
