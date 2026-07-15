"use client";

import { useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";

/**
 * Apply form for the /story advertorial funnel.
 * Reuses the site Formspree endpoint with a hidden `source` field so
 * story-apply leads are filterable from general contact submissions.
 * Flow: qualify here -> sales team follows up on WhatsApp -> ultra-hot -> call.
 * Theme-aware (light default + dark:, follows device).
 *
 * Leads are mirrored to the ecom-engine webhook with first-touch UTM
 * (fire-and-forget; Formspree stays the primary submit path).
 */
const ENGINE_WEBHOOK = "https://shared-brain.tail048cfd.ts.net:10000/lead";
const UTM_KEY = "ecom_utm";
const UTM_PARAMS = ["src", "utm_source", "utm_medium", "utm_campaign", "utm_content", "v"];

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
      contact: `${f.get("email") || ""} ${f.get("whatsapp") || ""}`.trim(),
      message: `budget:${f.get("budget") || "?"} | exp:${f.get("experience") || "?"} | convinced:${f.get("convinced") || "?"} | ${f.get("message") || ""}`,
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

export default function ApplyForm() {
  const [state, handleSubmit] = useForm("xpqbdzow");

  useEffect(captureUtm, []);

  if (state.succeeded) {
    return (
      <div className="rounded-2xl border border-lime-500/40 bg-lime-400/10 p-8 text-center dark:border-lime-400/40 dark:bg-lime-400/5">
        <div className="text-2xl font-bold text-zinc-900 dark:text-white">You&apos;re in.</div>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          Our team will reach out on WhatsApp shortly. In the meantime, here&apos;s your free blueprint:
        </p>
        <a
          href="/downloads/2026-ai-shopify-blueprint.pdf"
          target="_blank"
          rel="noopener"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-lime-400 px-7 py-3.5 font-semibold text-zinc-950 transition-colors hover:bg-lime-300"
        >
          Download the 2026 AI Shopify Blueprint (PDF) →
        </a>
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
      <input type="hidden" name="source" value="story-apply" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Name</label>
          <input id="name" name="name" required className={inputCls} placeholder="Your name" />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="mt-1 text-xs text-red-500 dark:text-red-400" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Email</label>
          <input id="email" name="email" type="email" required className={inputCls} placeholder="you@email.com" />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-xs text-red-500 dark:text-red-400" />
        </div>
      </div>

      <div>
        <label htmlFor="whatsapp" className={labelCls}>WhatsApp (with country code)</label>
        <input id="whatsapp" name="whatsapp" required className={inputCls} placeholder="+1 555 123 4567" />
        <ValidationError prefix="WhatsApp" field="whatsapp" errors={state.errors} className="mt-1 text-xs text-red-500 dark:text-red-400" />
      </div>

      <div>
        <label htmlFor="budget" className={labelCls}>Can you start with at least $5,000? (store + ad budget)</label>
        <select id="budget" name="budget" required defaultValue="" className={inputCls}>
          <option value="" disabled>Select one</option>
          <option value="yes_5k_plus">Yes - $5,000 or more</option>
          <option value="yes_3_5k">Around $3,000-5,000</option>
          <option value="not_yet">Not yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="experience" className={labelCls}>Where are you now?</label>
        <select id="experience" name="experience" required defaultValue="" className={inputCls}>
          <option value="" disabled>Select one</option>
          <option value="complete_beginner">Complete beginner</option>
          <option value="tried_shopify_or_business">Tried Shopify / ran another business or freelance</option>
          <option value="have_store">Already have a running store</option>
        </select>
      </div>

      <div>
        <label htmlFor="convinced" className={labelCls}>What convinced you to apply?</label>
        <select id="convinced" name="convinced" defaultValue="" className={inputCls}>
          <option value="">Select one (optional)</option>
          <option value="several_videos">I&apos;ve watched several of your videos</option>
          <option value="one_video">One specific video</option>
          <option value="article">This article</option>
          <option value="referral">Someone recommended you</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>What&apos;s pulling you to this? (optional)</label>
        <textarea id="message" name="message" rows={3} className={inputCls} placeholder="A line or two about your situation and goal." />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-1 text-xs text-red-500 dark:text-red-400" />
      </div>

      <ValidationError errors={state.errors} className="text-xs text-red-500 dark:text-red-400" />

      <button
        type="submit"
        disabled={state.submitting}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-lime-400 px-8 py-4 font-semibold text-zinc-950 transition-colors hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state.submitting ? "Sending…" : "Apply - talk to the team →"}
      </button>

      <p className="text-center font-mono text-[11px] leading-relaxed text-zinc-500">
        No spam. Our team reaches out on WhatsApp. Only a mutual fit gets a call.
      </p>
    </form>
  );
}
