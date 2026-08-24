import type { Metadata } from "next";
import Link from "next/link";
import PlaybookForm from "./PlaybookForm";
import SmartImg from "../story/SmartImg";

const URL = "https://ecomartem.com/product";
const TITLE = "The $1,997 Organic Shopify Playbook - Free";
const DESCRIPTION =
  "The exact 7-year system I use to get Shopify customers without paying for every click, plus the autopilot content tool behind it. Gurus sell a worse version for $1,997. I'm giving you the real one free.";

export const metadata: Metadata = {
  title: `${TITLE} | EcomArtem`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: "EcomArtem", type: "website", locale: "en_US", images: ["/founder-16x9.jpg"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/founder-16x9.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

const STATS = [
  { n: "1,500+", l: "stores built" },
  { n: "5,000+", l: "people trained" },
  { n: "7 yrs", l: "operating since 2019" },
  { n: "$11,801", l: "top single day" },
];

const PLATFORMS = ["Shopify", "Instagram", "TikTok", "Google", "YouTube", "ChatGPT"];

const OLDWAY = [
  "Weeks hunting for a product, alone, second-guessing every pick",
  "$5,000-20,000 burned on ads before a single real sale",
  "Copying the same tired store everyone else already has",
  "Posting into the void, quitting in month two when it's quiet",
];

const SECRETS = [
  { t: "My secret organic playbook", d: "The exact hook-and-retention formula I use to make strangers stop, watch, and buy, without a single dollar of ads. This is the part gurus never actually teach." },
  { t: "The free-traffic system", d: "How to get customers without paying for every click. One channel, done deep, that compounds into an asset instead of rented attention that dies the day you stop paying." },
  { t: "The autopilot content tool", d: "The tool that broke my content wall (jump to it below). Turns your real products into organic videos and learns from what sells. The closest thing to free traffic I've found in 7 years." },
  { t: "My complete tool stack, by stage", d: "The specific apps I use to research products, build the store with AI, source, and convert. No more paralysis over which app to use." },
  { t: "The templates and swipe pack", d: "Launch checklist, offer template, content rhythm, hook bank, caption skeletons. Copy, paste, post." },
];

const STEPS = [
  { n: "1", t: "Grab it free", d: "Two questions, your email, instant access. A copy lands in your inbox too." },
  { n: "2", t: "Build or fix, then get traffic", d: "Follow the system: a store that converts, then organic content that earns the view without paid ads." },
  { n: "3", t: "Put content on autopilot", d: "Use the same engine I use to keep the volume up while you sleep, or have me build the whole store for you." },
];

const STACK = [
  "The 9-module Organic Shopify Playbook (the full system)",
  "My secret organic + free-traffic strategies",
  "The autopilot content tool and exactly how I use it",
  "My complete app stack, stage by stage",
  "The templates and swipe pack",
];

const PROOF = [
  { img: "/story/proof-1.jpg", cap: "$11,801 in a single day - 67 orders" },
  { img: "/story/proof-2.jpg", cap: "$7,659 in a day - 159 orders at 3%" },
  { img: "/story/result-3.jpg", cap: "$8,914 in three weeks - 238 orders" },
  { img: "/story/result-1.jpg", cap: "$5,017 in the first weeks - 138 orders" },
  { img: "/story/result-2.jpg", cap: "$1,908 in a day - up 147%" },
  { img: "/story/proof-3.jpg", cap: "$2,824 in a day - up 85%" },
];

const FORYOU = [
  "You're building or running a Shopify store and tired of guessing at traffic",
  "You want customers without paying for every single click",
  "You'll actually post and reply, even when it's boring",
  "You want a real brand, not a shelf-junk store",
];
const NOTFORYOU = [
  "You want a get-rich-quick button with zero effort",
  "You won't put in a few posts a week for a few months",
  "You're looking for someone to blame when you don't start",
];

const FAQ: { q: string; a: string }[] = [
  { q: "Is it really free? What's the catch?", a: "Really free, no upsell to a paid course. Gurus sell a worse version of this for $1,997. I give the real one away because in 2026 information is cheap, and I only make money if you later use the tool I built or ask me to build your store. So I earn your trust first. That's the whole model." },
  { q: "Will it stay free?", a: "For now. I may turn it into a paid product later or fold it into something bigger. If you're reading this, grab it while it's free." },
  { q: "Is this just another dropshipping course?", a: "No. It's the organic-traffic system I run across 1,500+ stores, plus my exact tool stack and the autopilot content engine. Not 15 hours of theory, the parts that actually move money." },
  { q: "Do I need a big budget?", a: "No. The whole point is organic-first: customers without paying for every click. You can start with the store you already have." },
  { q: "I'm a complete beginner. Will I get it?", a: "Yes. It's written plainly, step by step, with checklists and templates. Beginners get the full path; people with a store and no sales get the fix." },
  { q: "Why should I trust you?", a: "7 years running Shopify stores, out of Russia, which is why you may not have seen me. I've made real money and lit real money on fire, and both lessons are in here honestly. Read the founder story if you want the full version." },
  { q: "What do I get right after I sign up?", a: "Instant access to the full playbook, online and as a PDF, plus a copy in your email. Two quick questions up front just help me point you to the right next step." },
];

const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

function CTA({ children = "Send me the playbook - free →", sub, center }: { children?: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={`flex flex-col gap-2 ${center ? "items-center" : "items-start"}`}>
      <a href="#get" className="inline-flex items-center justify-center rounded-full bg-lime-400 px-8 py-4 text-base font-semibold text-zinc-950 shadow-lg shadow-lime-400/20 transition-colors hover:bg-lime-300">{children}</a>
      {sub ? <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">{sub}</span> : null}
    </div>
  );
}

function PriceTag({ center }: { center?: boolean }) {
  return (
    <div className={`flex items-end gap-3 ${center ? "justify-center" : ""}`}>
      <span className="relative text-3xl font-bold text-zinc-400 md:text-4xl">
        $1,997
        <span className="absolute left-0 top-1/2 h-[3px] w-full -rotate-6 bg-red-500" />
      </span>
      <span className="text-5xl font-extrabold leading-none tracking-tight text-lime-500 dark:text-lime-400 md:text-6xl">FREE</span>
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

      {/* 1. HERO */}
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
              My secret organic strategies, the free-traffic system, and the autopilot tool behind it, the exact stack I use to get customers without paying for every click. Gurus gate a worse version behind $1,997. I&apos;m handing you the real one for $0.
            </p>
            <div className="mt-6"><PriceTag /></div>
            <p className="mt-4 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              Heads up: this won&apos;t be free forever. Grab it while it is.
            </p>
            <div className="mt-7"><CTA sub="Instant access · in your inbox too" /></div>
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

      {/* 2. SOCIAL PROOF */}
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

      {/* 3. PLATFORMS */}
      <section className="border-y border-zinc-200 px-6 py-8 dark:border-zinc-900">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PLATFORMS.map((p) => (
            <span key={p} className="font-mono text-sm uppercase tracking-widest text-zinc-400 dark:text-zinc-600">{p}</span>
          ))}
        </div>
      </section>

      {/* 4. THE OLD WAY IS DEAD */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Read this if you&apos;ve tried before</p>
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">The old way to build a store is dead.</h2>
          <p className="mb-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            Almost everyone who fails at this fails the same way. Not because they&apos;re lazy, because they were handed the expensive, lonely, outdated version of the game:
          </p>
          <ul className="space-y-3">
            {OLDWAY.map((o) => (
              <li key={o} className="flex gap-3 text-zinc-700 dark:text-zinc-300">
                <span className="mt-1 shrink-0 text-red-500">✕</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-lg font-semibold leading-relaxed text-zinc-900 dark:text-white">
            The store was never the hard part. Getting seen without paying for every click is. That&apos;s the whole game, and it&apos;s exactly what this playbook hands you.
          </p>
        </div>
      </section>

      {/* 5. WHAT'S INSIDE — sell the secrets */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-900 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">What&apos;s actually inside</p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">The stuff I&apos;ve never put in one place before</h2>
          <div className="space-y-4">
            {SECRETS.map((s, i) => (
              <div key={s.t} className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="font-mono text-lg font-bold text-lime-600 dark:text-lime-400">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{s.t}</h3>
                  <p className="mt-1 leading-relaxed text-zinc-600 dark:text-zinc-400">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CARTVIRAL WOW — the autopilot miracle */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-lime-500/30 bg-gradient-to-b from-lime-400/10 to-transparent dark:border-lime-400/25">
            <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">The part that feels like cheating</p>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
                  Your content, on autopilot.
                </h2>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <p>Everyone quits at the same wall: making content every single day. So inside I show you the tool that broke that wall for me.</p>
                  <p>It plugs into your store, turns your <strong className="text-zinc-900 dark:text-white">real products</strong> into scroll-stopping organic videos, and gets smarter every time you post, it learns from what actually sells and writes the next batch itself. Organic traffic, close to autopilot.</p>
                  <p>Then flip one switch, and the same engine spits out <strong className="text-zinc-900 dark:text-white">paid ad creatives</strong> that turn cheap views into cash. Organic that earns the view for free, paid that prints from it.</p>
                  <p className="font-semibold text-zinc-900 dark:text-white">It&apos;s the closest thing to a free traffic machine I&apos;ve found in 7 years. The exact way I use it is in the playbook.</p>
                </div>
                <div className="mt-6"><CTA>Show me the autopilot tool →</CTA></div>
              </div>
              <div>
                <SmartImg src="/playbook/cv-4.png" alt="Autopilot content tool generating a product video" className="w-full rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800" label="Tool screenshot" />
                <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-zinc-500">Real products in · organic videos out · learns from your sales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOW IT WORKS */}
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

      {/* 8. OFFER STACK + DRAMATIC PRICE */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">The full stack</p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Everything you get, zero to start</h2>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/30">
            <ul className="space-y-4">
              {STACK.map((s) => (
                <li key={s} className="flex gap-3 text-lg text-zinc-800 dark:text-zinc-200">
                  <span className="mt-1 shrink-0 font-bold text-lime-500 dark:text-lime-400">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col items-center gap-4 border-t border-zinc-200 pt-8 text-center dark:border-zinc-800">
              <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">What a guru charges for this</div>
              <PriceTag center />
              <a href="#get" className="mt-2 inline-flex items-center justify-center rounded-full bg-lime-400 px-10 py-4 text-lg font-bold text-zinc-950 shadow-lg shadow-lime-400/20 transition-colors hover:bg-lime-300">Claim it free →</a>
              <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">No card · no strings · in your inbox in 30 seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. WHAT'S THE CATCH */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-900 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 md:flex-row md:p-10">
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
              <div className="mt-6"><CTA>Yes, send me the free playbook →</CTA></div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. PROOF */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Real client stores · real dashboards</p>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">This system has real numbers behind it</h2>
          <p className="mb-8 text-zinc-600 dark:text-zinc-400">Across 8 live brands we run, with ROAS up to 4.7x and 150+ orders a day at peak. Real stores, real dashboards.</p>
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

      {/* 11. STORES */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-900 dark:bg-zinc-900/20">
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

      {/* 12. FOUNDER STORY */}
      <section className="px-6 py-16">
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

      {/* 13. WHO IT'S FOR */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-900 dark:bg-zinc-900/20">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-lime-500/30 bg-lime-400/5 p-7 dark:border-lime-400/25">
            <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">This is for you if</h3>
            <ul className="space-y-3">
              {FORYOU.map((f) => (
                <li key={f} className="flex gap-3 text-zinc-700 dark:text-zinc-300"><span className="mt-1 shrink-0 text-lime-500 dark:text-lime-400">✓</span><span>{f}</span></li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">It&apos;s not for you if</h3>
            <ul className="space-y-3">
              {NOTFORYOU.map((f) => (
                <li key={f} className="flex gap-3 text-zinc-600 dark:text-zinc-400"><span className="mt-1 shrink-0 text-red-500">✕</span><span>{f}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 14. GET IT */}
      <section id="get" className="scroll-mt-20 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-4 flex justify-center"><PriceTag center /></div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">Claim your free playbook</h2>
          <p className="mx-auto mt-4 mb-8 max-w-md text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            Two quick answers and your email. Instant access, online and PDF, plus a copy in your inbox. No card, no strings. And it won&apos;t be free forever.
          </p>
        </div>
        <div className="mx-auto max-w-xl"><PlaybookForm /></div>
      </section>

      {/* 15. WORK WITH ME */}
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

      {/* 16. FAQ */}
      <section className="px-6 py-16">
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
          <div className="mt-10 flex justify-center"><CTA center>Send me the playbook - free →</CTA></div>
        </div>
      </section>

      {/* 17. P.S. */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-900 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">P.S.</p>
          <p className="mt-3 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            I could gate all of this behind $1,997 like everyone else does, and plenty of people told me to. I&apos;d rather give you the real thing, prove it works, and earn the right to help you later. That only works if the playbook is genuinely good, so it is. Grab it while it&apos;s free, and go win the 80% everyone skips.
          </p>
          <p className="mt-4 font-semibold text-zinc-900 dark:text-white">— Artem</p>
        </div>
      </section>

      <footer className="border-t border-zinc-200 px-6 py-10 text-center font-mono text-[11px] uppercase tracking-widest text-zinc-400 dark:border-zinc-900 dark:text-zinc-600">
        EcomArtem · Shopify operator since 2019
      </footer>
    </main>
  );
}
