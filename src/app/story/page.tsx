import type { Metadata } from "next";
import Link from "next/link";
import ApplyForm from "./ApplyForm";
import SmartImg from "./SmartImg";
import StickyCTA from "./StickyCTA";

const UPDATED_ISO = "2026-07-10";
const UPDATED_HUMAN = "July 2026";
const URL = "https://ecomartem.com/story";
const TITLE =
  "I Made $400K a Month, Then Almost Buried It All - And What Actually Kept Feeding Me";
const DESCRIPTION =
  "A Shopify operator since 2019 on the fall that taught him everything: why a lean online store in dollars beats heavy physical inventory - and how done-for-you AI-run Shopify stores work in 2026.";

export const metadata: Metadata = {
  title: `${TITLE} | EcomArtem`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "EcomArtem",
    type: "article",
    locale: "en_US",
    images: ["/founder-16x9.jpg"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/founder-16x9.jpg"] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "How much money do I need to start a Shopify store in 2026?",
    a: "Around $5,000 total is a healthy start: roughly $3,000-3,500 for a done-for-you store, plus an advertising budget and tool subscriptions. You can start with less, but a thin budget limits how much you can test.",
  },
  {
    q: "Is it better to build a Shopify store myself or done-for-you?",
    a: "Building a store with AI is easy - anyone can do it. Making it actually profitable is where experience matters. First-time solo builders routinely burn $10,000-15,000 on ads before their first real sales; a done-for-you store built on hundreds of prior stores skips most of those mistakes.",
  },
  {
    q: "What does dropshipping look like in 2026?",
    a: "It is no longer the junk 'shelf' stores of 2019. Today it is a real branded store - proper packaging and social media run like a real company - but without your own warehouse or bulk inventory, with AI running the store, content, and ad analytics.",
  },
  {
    q: "Does a done-for-you Shopify store guarantee income?",
    a: "No. It is a business, not a guarantee. You need an ad budget, you have to test products, and not everything wins on the first try. The done-for-you model reduces risk by building on proven experience instead of your first mistakes.",
  },
  {
    q: "Why choose an online Shopify store over a physical products business?",
    a: "A lean online store runs in dollars, fully online, with no bulk inventory that can get stuck unsold and no huge upfront capital. A physical brand ties up cash in warehouses and depends on ad channels that can be switched off overnight.",
  },
];

const STATS = [
  { n: "1,500+", l: "stores built" },
  { n: "5,000+", l: "people trained" },
  { n: "6 yrs", l: "operating since 2019" },
  { n: "$2K/day", l: "top client, pure organic" },
];

const BRANDS = [
  { img: "/cases/arthouses.jpg", name: "ArtHouses" },
  { img: "/cases/rainrunner.jpg", name: "RainRunner" },
  { img: "/cases/lumena.jpg", name: "Lumena" },
];

// Proof screenshots - drop real revenue/dashboard screenshots at these paths.
const PROOF = [
  { img: "/story/proof-1.jpg", cap: "$11,801 in a single day - 67 orders" },
  { img: "/story/proof-2.jpg", cap: "$7,659 in a day - 159 orders at 3% conversion" },
  { img: "/story/proof-3.jpg", cap: "$2,824 in a day - up 85%" },
];

// Real client dashboards (from our results channel) - no invented names, just verified numbers.
const RESULTS = [
  { img: "/story/result-1.jpg", cap: "$5,017 in the first three weeks - 138 orders" },
  { img: "/story/result-2.jpg", cap: "$1,908 in a day - up 147%" },
  { img: "/story/result-3.jpg", cap: "$8,914 in three weeks - 238 orders" },
];

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  image: ["https://ecomartem.com/founder-16x9.jpg"],
  datePublished: UPDATED_ISO,
  dateModified: UPDATED_ISO,
  inLanguage: "en",
  mainEntityOfPage: { "@type": "WebPage", "@id": URL },
  author: {
    "@type": "Person",
    name: "Artem K.",
    jobTitle: "Founder, EcomArtem",
    description:
      "Shopify operator since 2019. Built and helped build 1,500+ Shopify stores. Founder of EcomArtem.",
  },
  publisher: { "@type": "Organization", name: "EcomArtem", url: "https://ecomartem.com" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/* ---- presentational helpers (server-rendered for AI extractability). Theme-aware: light default + dark: overrides, follows device via prefers-color-scheme ---- */
function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">{children}</p>;
}
function Pull({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-8 border-l-2 border-lime-500 dark:border-lime-400 pl-5 text-xl font-semibold leading-snug text-zinc-900 dark:text-white md:text-2xl">
      {children}
    </blockquote>
  );
}
function CTAButton({ children }: { children: React.ReactNode }) {
  return (
    <a href="#apply" className="inline-flex items-center justify-center rounded-full bg-lime-400 px-8 py-4 font-semibold text-zinc-950 transition-colors hover:bg-lime-300">
      {children}
    </a>
  );
}
function GateCTA() {
  return (
    <div className="my-10 rounded-2xl border border-lime-500/30 dark:border-lime-400/30 bg-lime-400/10 dark:bg-lime-400/5 p-6">
      <div className="font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Free bonus</div>
      <h3 className="mt-2 text-xl font-bold text-zinc-900 dark:text-white">Get the 2026 AI Shopify Blueprint (PDF)</h3>
      <p className="mt-2 leading-relaxed text-zinc-700 dark:text-zinc-300">
        The exact system we use - product, store, AI creative, traffic, AI-search - and the $10-15k mistakes to skip. Yours instantly when you apply below.
      </p>
      <a href="#apply" className="mt-4 inline-flex items-center justify-center rounded-full bg-lime-400 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-lime-300">
        Get the free Blueprint →
      </a>
    </div>
  );
}

export default function StoryPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-lime-400/30 dark:bg-zinc-950 dark:text-zinc-50">
      <StickyCTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <header className="border-b border-zinc-200 dark:border-zinc-900 px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="font-bold tracking-tight">EcomArtem</Link>
          <a href="#apply" className="rounded-full bg-lime-400 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-lime-300">Apply →</a>
        </div>
      </header>

      {/* HERO */}
      <section className="px-6 pt-14 md:pt-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">
            Founder story · Updated {UPDATED_HUMAN}
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-zinc-900 dark:text-white md:text-6xl">
            I used to make $400,000 a month. Then I believed in myself - and almost buried the one thing that kept feeding me.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            The honest story of my fall - and why a lean online Shopify store in dollars beat everything &ldquo;serious&rdquo; I built. Plus how done-for-you AI stores actually work in 2026.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a href="#apply" className="inline-flex items-center justify-center rounded-full bg-lime-400 px-8 py-4 text-base font-semibold text-zinc-950 shadow-lg shadow-lime-400/20 transition-colors hover:bg-lime-300">
              Apply now →
            </a>
            <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">60-second form · team replies on WhatsApp</span>
          </div>
          <div className="mt-10">
            <SmartImg src="/founder-16x9.jpg" alt="Artem K., founder of EcomArtem" className="aspect-[16/9] w-full rounded-2xl object-cover" label="Hero photo" />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40 p-6 text-center">
              <div className="font-mono text-3xl font-bold tracking-tight text-lime-600 dark:text-lime-400 md:text-4xl">{s.n}</div>
              <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ARTICLE */}
      <article className="mx-auto max-w-3xl px-6 py-6">
        <P>I&apos;m 24. I grew up in a single-parent home, without much money, always looking for opportunities to earn.</P>
        <P>I&apos;ve never worked a normal 9-5 job, not a single day in my life. With one exception: at 14, I lasted three days loading trucks in a warehouse. By day two I already knew - it wasn&apos;t for me. Day three, I quit.</P>
        <Pull>I walked away with about forty dollars and one very clear thought - I need to build something online.</Pull>
        <P>Then came years of trying and failing. A marketing agency. Attempts at building games. Reselling branded goods. Some of it even made money. But it truly started at 16, when I found some English YouTube videos about Shopify.</P>
        <P>By 2019, on my fourth or fifth attempt, I built the first store that had actual sales - not just a pretty website. That&apos;s when it clicked: don&apos;t build junk stores, build brands. From that point, Shopify started feeding me.</P>

        <div className="my-10 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <SmartImg src="/story/life-work.jpg" alt="Artem working on a laptop at sunset over the Tuscan hills" className="w-full" label="Photo" />
        </div>

        <P>Over the next years I built one of the largest e-commerce audiences in my native language, helped 5,000+ people build stores, and at my 2021-2022 peak I was making $300,000-400,000 a month - from my own stores and consulting. My team and I have now built over 1,500 stores.</P>
        <P>And here&apos;s the part I&apos;m actually writing this for.</P>

        <H>How I believed in myself a little too much</H>
        <P>At my peak, I decided dropshipping was &ldquo;not serious enough&rdquo; for me anymore. I thought it was time to build &ldquo;real,&rdquo; big, physical brands.</P>
        <P>So I went all in. Cosmetics. Household goods. Registered trademarks. Retail shelves, not just marketplaces. Turnover crossed a million dollars. On advertising alone I was burning over $700,000 a year.</P>
        <P>And then it all froze. Ads - shut off. Warehouses full of product, millions of dollars in stock, not moving. The money I poured into the &ldquo;serious business&rdquo; turned into dead weight I was chained to.</P>
        <Pull>That&apos;s my fall. Honest, and happening right now.</Pull>

        <H>But this isn&apos;t just a story about falling and getting back up. It&apos;s something more important.</H>
        <P>Here&apos;s the twist. Both of those were e-commerce. Both were &ldquo;selling things.&rdquo;</P>
        <P>I always used to tell people the same thing: online stores win because they&apos;re fully online, with no bulk inventory that can get stuck unsold, and without insane upfront capital.</P>
        <P>Then I took the money my lean online business earned… and poured it into the exact opposite: physical product, warehouses, and ad spend that could be switched off overnight.</P>
        <Pull>The &ldquo;serious&rdquo; business died. The lean online store kept feeding me - right through the collapse.</Pull>
        <P>I paid millions to learn the most valuable lesson of my life on my own skin: not heavy physical inventory - but a lean online business you can run from a laptop. And now I can say it like almost no one else, because I&apos;ve lived both sides.</P>

        <H>Why right now is the best moment this niche has ever had</H>
        <P>We&apos;ve entered a new era. Not the era of chatbots that talk - the era of AI that writes code, executes tasks, and builds entire systems. In this business, that changes everything. The barrier to entry is collapsing in real time.</P>
        <P>One example: creating quality ad creative used to mean a thousand dollars for a studio shoot, a photographer, the product, logistics - and a month of preparing and editing. Now it&apos;s less than $20 and ten minutes with the right tool. And the result is often better than the studio shoot.</P>
        <P>Same across the board: building the store, product pages, content, ads, analytics. What only big teams with big budgets could do two years ago is now available to anyone - cheaper, faster, and better.</P>
        <Pull>The window is open. It won&apos;t stay open forever.</Pull>
        <GateCTA />

        <H>What this actually means for you in 2026</H>
        <P>It&apos;s still dropshipping. But not the junk &ldquo;shelf&rdquo; stores from 2019, with everything dumped in, no logo, no socials.</P>
        <P>Today it&apos;s a real brand. Proper packaging, social media run like an actual company - just without your own warehouse and without buying inventory in bulk. And on top of it, AI that runs the store: it builds the store and lifts its conversion, produces more products and better content, and makes your ads more effective through daily analytics and creative variety.</P>
        <Pull>You invest less - and you get a product better than 90% of the market.</Pull>
        <GateCTA />

        <H>Why this is the best business model I&apos;ve found in fifteen years</H>
        <P>I&apos;ve built cosmetics brands, physical-product brands, IT products, games. I keep coming back to this one. Here&apos;s why it beats everything else I&apos;ve tried.</P>
        <P><strong className="font-semibold text-zinc-900 dark:text-white">You sell to the richest buyers on earth.</strong> Your customers are in the US, UK and Western Europe - the most payment-ready audience in the world, paying in dollars. You&apos;re not fighting over a small local market with thin wallets; you&apos;re selling into the biggest, wealthiest one there is.</P>
        <P><strong className="font-semibold text-zinc-900 dark:text-white">It runs from a laptop, from anywhere.</strong> No office, no warehouse, no staff you have to stand next to. A store you built in one country keeps selling while you&apos;re on the other side of the world. That isn&apos;t a perk - it&apos;s the whole point.</P>
        <P><strong className="font-semibold text-zinc-900 dark:text-white">No inventory, almost no capital at risk.</strong> You don&apos;t buy stock in bulk and pray it sells. No warehouse full of dead money. You pay for the product after the customer pays you - which is why $5k is enough to start what used to need a factory.</P>
        <P><strong className="font-semibold text-zinc-900 dark:text-white">It scales by turning a dial.</strong> Found a winner? You don&apos;t hire and you don&apos;t build a bigger warehouse - you turn up the ad budget and AI handles the rest. Growth is a number you increase, not a building you expand.</P>
        <P><strong className="font-semibold text-zinc-900 dark:text-white">Crisis-proof by design.</strong> It isn&apos;t tied to one country&apos;s economy or one traffic source. Global market, dollar income, every ad channel open - Meta, Google, TikTok, organic. If one thing wobbles, you pivot the product or the market in a week.</P>
        <Pull>Online, in dollars, from anywhere, with no inventory, and it scales like a volume knob. I looked for something better for six years. There isn&apos;t one.</Pull>

        <H>&ldquo;Then I&apos;ll just do it myself&rdquo; - and why that costs the most</H>
        <P>Right here you might think: &ldquo;If AI made it all this easy, why pay anyone? I&apos;ll build the store myself.&rdquo; And you&apos;d be right. Half right.</P>
        <P>In six years of running my own Shopify agency, I&apos;ve heard it dozens of times: &ldquo;Guys, that&apos;s expensive. It&apos;s 2026, there&apos;s AI, there are a thousand YouTube videos - I&apos;ll spin up a site in an evening.&rdquo;</P>
        <P>And they&apos;re right: building a store isn&apos;t hard. Picking a product isn&apos;t hard. Technically, anyone can do it today. The hard part is something else - the store has no experience baked in. No understanding of the market. None of the hundred small decisions that separate a store that sells from a pretty page with zero orders.</P>
        <P>So they&apos;d go off to do it themselves. And six months, a year later, they&apos;d come back. Almost word for word:</P>
        <Pull>&ldquo;Man, I built a few stores this year. Burned $10,000-15,000 on ads. All to zero. I should&apos;ve just bought one from you for three.&rdquo;</Pull>
        <P>And they&apos;d buy - only now with a lost year and a burned budget behind them. Six years tells me this cold: clients we built the store for always outperformed the ones who bought a course and went solo. Not because they&apos;re less capable - it&apos;s just that behind us are hundreds of stores, with every mistake already tested. Building a store with AI is easy. Turning it into a system that actually makes money - that&apos;s what decides everything.</P>
      </article>

      {/* PROOF GALLERY */}
      <section className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/20 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Real client stores · real dashboards</p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Numbers, not just words</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {PROOF.map((p) => (
              <figure key={p.img} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                <SmartImg src={p.img} alt={p.cap} className="aspect-[4/3] w-full bg-white object-contain" label="Revenue screenshot" />
                <figcaption className="p-4 text-sm text-zinc-700 dark:text-zinc-300">{p.cap}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 text-zinc-600 dark:text-zinc-400">Across our portfolio: 1,500+ stores, ours and clients&apos;. My own team&apos;s stores steadily run $120,000-170,000 in monthly revenue.</p>
        </div>
      </section>

      {/* BRANDS STRIP */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Brands I&apos;ve built</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {BRANDS.map((b) => (
              <div key={b.name} className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <SmartImg src={b.img} alt={b.name} className="aspect-[4/3] w-full object-cover" label={b.name} />
                <div className="p-4 font-mono text-xs uppercase tracking-widest text-zinc-600 dark:text-zinc-400">{b.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MID CTA */}
      <section className="px-6 py-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-3xl border border-lime-500/30 dark:border-lime-400/30 bg-lime-400/10 dark:bg-lime-400/5 p-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Want a store built on all of that experience?</h2>
          <p className="max-w-xl text-zinc-700 dark:text-zinc-300">Not alone off YouTube tutorials - with a team that&apos;s built 1,500+ stores and puts AI into every step.</p>
          <CTAButton>Apply now →</CTAButton>
        </div>
      </section>

      {/* MORE RESULTS — real client dashboards, no names */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">More client stores</p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">It&apos;s a pattern, not luck</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {RESULTS.map((r) => (
              <figure key={r.img} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                <SmartImg src={r.img} alt={r.cap} className="aspect-[4/3] w-full bg-white object-contain" label="Revenue screenshot" />
                <figcaption className="p-4 text-sm text-zinc-700 dark:text-zinc-300">{r.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* THE REAL POINT — quiet-luxury freedom gallery */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">The real point</p>
          <h2 className="mb-10 max-w-2xl text-2xl font-semibold leading-tight tracking-tight text-zinc-900 dark:text-white md:text-3xl">
            It was never about the stuff. It&apos;s the freedom to run it from anywhere.
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {[
              { src: "/story/travel-1.jpg", tag: "Rome" },
              { src: "/story/travel-3.jpg", tag: "Lake Como" },
              { src: "/story/travel-5.jpg", tag: "Golden hour" },
              { src: "/story/travel-2.jpg", tag: "Tuscany" },
              { src: "/story/travel-6.jpg", tag: "Off-grid" },
              { src: "/story/travel-4.jpg", tag: "On the move" },
            ].map((p) => (
              <figure key={p.src} className="group overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800/80">
                <SmartImg
                  src={p.src}
                  alt={p.tag}
                  className="aspect-[4/5] w-full object-cover brightness-95 grayscale-[40%] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-100 group-hover:grayscale-0"
                  label="Photo"
                />
              </figure>
            ))}
          </div>
          <p className="mt-8 max-w-xl leading-relaxed text-zinc-500">
            A business in dollars, fully online, that doesn&apos;t need you at a desk buys one thing: options. That&apos;s the point - not the toys, the freedom that pays for them.
          </p>
        </div>
      </section>

      {/* WHO IT'S FOR + RISKS */}
      <article className="mx-auto max-w-3xl px-6 py-6">
        <H>Who this is for</H>
        <P>This isn&apos;t for someone chasing a &ldquo;get-rich button.&rdquo; And it&apos;s not only for total beginners (though them too). It&apos;s for someone who has already tried - ran a product business, another business, or freelanced. Heard about Shopify, tried to figure it out, and got stuck. Someone tired of being chained to physical inventory and to their own time, who wants a business that runs fully online and keeps running whether you&apos;re at the desk or not.</P>
        <P>Starting capital - around <span className="font-semibold text-zinc-900 dark:text-white">$5,000</span>: the service itself, an ad budget, and subscriptions. Less can work, but $5k is a healthy start.</P>
        <H>The risks - honestly</H>
        <P>This is a business, not a guarantee. You need an ad budget, you need to test products, and not everything wins on the first attempt. Which is exactly why we don&apos;t hand someone video lessons and leave them alone - we build the system on our experience instead of on their own first mistakes. That&apos;s how you control the risk: put it in the hands of people who&apos;ve done it hundreds of times.</P>
      </article>

      {/* APPLY */}
      <section id="apply" className="scroll-mt-20 border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/20 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">If you read this far, you&apos;re not random.</h2>
          <p className="mt-4 mb-8 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            Leave your details and get the free <strong className="text-zinc-900 dark:text-white">2026 AI Shopify Blueprint (PDF)</strong> instantly. Our team then reaches out on WhatsApp - only a mutual fit gets a call.
          </p>
          <ApplyForm />
        </div>
      </section>

      {/* AUTHOR BOX */}
      <section className="px-6 py-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/30 p-8 text-center md:flex-row md:text-left">
          <SmartImg src="/founder-4x5.jpg" alt="Artem K., founder of EcomArtem" className="h-24 w-24 shrink-0 rounded-full object-cover object-top" label="Photo" />
          <div>
            <div className="text-lg font-bold text-zinc-900 dark:text-white">Artem K. - founder, EcomArtem</div>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">Shopify operator since 2019. Built and helped build 1,500+ stores, trained 5,000+ people, and runs his own brands. Now putting AI into every step of building and scaling Shopify stores.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
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
        </div>
      </section>

      <footer className="border-t border-zinc-200 dark:border-zinc-900 px-6 py-10 text-center font-mono text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
        EcomArtem · Shopify operator since 2019
      </footer>
    </main>
  );
}
