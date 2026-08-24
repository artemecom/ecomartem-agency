"use client";

import { useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";

/**
 * Opt-in gate for the free Organic Shopify Playbook (/product funnel).
 * Captures contact + a short qualifier, then reveals the playbook.
 * Same Formspree endpoint as the site, tagged source=product-playbook for filtering,
 * mirrored to the ecom-engine webhook with first-touch UTM (fire-and-forget).
 * Theme-aware (light default + dark:, follows device).
 */
const ENGINE_WEBHOOK = "/api/lead";
const UTM_KEY = "ecom_utm";
const UTM_PARAMS = ["src", "utm_source", "utm_medium", "utm_campaign", "utm_content", "v"];
const PLAYBOOK_URL = "/playbook"; // hosted, designed playbook page

function captureUtm() {
  try {
    const p = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const k of UTM_PARAMS) {
      const v = p.get(k);
      if (v) found[k] = v.slice(0, 100);
    }
    if (Object.keys(found).length) localStorage.setItem(UTM_KEY, JSON.stringify(found));
  } catch {
    /* storage unavailable — attribution is best-effort */
  }
}

function sendToEngine(form: HTMLFormElement) {
  try {
    const f = new FormData(form);
    let utm: Record<string, string> = {};
    try {
      utm = JSON.parse(localStorage.getItem(UTM_KEY) || "{}");
    } catch {
      /* noop */
    }
    const body = JSON.stringify({
      market: "en",
      name: f.get("name"),
      contact: `${f.get("email") || ""}`.trim(),
      message: `PLAYBOOK optin | stage:${f.get("stage") || "?"} | goal:${f.get("goal") || "?"}`,
      utm: Object.keys(utm).length ? utm : { utm_source: "direct" },
    });
    fetch(ENGINE_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* never block the primary submit */
  }
}

export default function PlaybookForm() {
  const [state, handleSubmit] = useForm("xpqbdzow");

  useEffect(captureUtm, []);

  if (state.succeeded) {
    return (
      <div className="rounded-2xl border border-lime-500/40 bg-lime-400/10 p-8 text-center dark:border-lime-400/40 dark:bg-lime-400/5">
        <div className="text-2xl font-bold text-zinc-900 dark:text-white">It&apos;s yours.</div>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          Read it right here. I also sent a copy to your email so you don&apos;t lose it.
        </p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={PLAYBOOK_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center rounded-full bg-lime-400 px-7 py-3.5 font-semibold text-zinc-950 transition-colors hover:bg-lime-300"
          >
            Read it online →
          </a>
          <a
            href="/downloads/organic-shopify-playbook.pdf"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-7 py-3.5 font-semibold text-zinc-900 transition-colors hover:border-lime-500 dark:border-zinc-700 dark:text-white dark:hover:border-lime-400"
          >
            Download PDF
          </a>
        </div>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
          No spam. If you ever want the store built for you, you know where I am.
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-lime-500 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-lime-400";
  const labelCls =
    "mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400";

  return (
    <form
      onSubmit={(e) => {
        sendToEngine(e.currentTarget);
        handleSubmit(e);
      }}
      className="flex flex-col gap-5"
    >
      <input type="hidden" name="source" value="product-playbook" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>First name</label>
          <input id="name" name="name" required className={inputCls} placeholder="Your name" />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="mt-1 text-xs text-red-500 dark:text-red-400" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Email (where I send it)</label>
          <input id="email" name="email" type="email" required className={inputCls} placeholder="you@email.com" />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-xs text-red-500 dark:text-red-400" />
        </div>
      </div>

      <div>
        <label htmlFor="stage" className={labelCls}>Where are you with Shopify right now?</label>
        <select id="stage" name="stage" required defaultValue="" className={inputCls}>
          <option value="" disabled>Select one</option>
          <option value="thinking">Just thinking about starting</option>
          <option value="building">Building my first store</option>
          <option value="running_no_sales">Have a store, few or no sales</option>
          <option value="running_sales">Running store with real sales</option>
        </select>
      </div>

      <div>
        <label htmlFor="goal" className={labelCls}>What do you actually want?</label>
        <select id="goal" name="goal" required defaultValue="" className={inputCls}>
          <option value="" disabled>Select one</option>
          <option value="learn_diy">Learn to do it myself</option>
          <option value="traffic">Fix my traffic / get customers</option>
          <option value="done_for_you">Have it built for me</option>
        </select>
      </div>

      <ValidationError errors={state.errors} className="text-xs text-red-500 dark:text-red-400" />

      <button
        type="submit"
        disabled={state.submitting}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-lime-400 px-8 py-4 font-semibold text-zinc-950 transition-colors hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.submitting ? "Sending…" : "Send me the playbook →"}
      </button>

      <p className="text-center font-mono text-[11px] leading-relaxed text-zinc-500">
        Free. No spam. Two questions so I can point you to the right next step.
      </p>
    </form>
  );
}
