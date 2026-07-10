"use client";

import { useForm, ValidationError } from "@formspree/react";

/**
 * Apply form for the /story advertorial funnel.
 * Reuses the site Formspree endpoint with a hidden `source` field so
 * story-apply leads are filterable from general contact submissions.
 * Flow: qualify here -> sales team follows up on WhatsApp -> ultra-hot -> call.
 */
export default function ApplyForm() {
  const [state, handleSubmit] = useForm("xpqbdzow");

  if (state.succeeded) {
    return (
      <div className="rounded-2xl border border-lime-400/40 bg-lime-400/5 p-8 text-center">
        <div className="text-2xl font-bold text-white">You&apos;re in.</div>
        <p className="mt-3 text-zinc-300">
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
    "w-full rounded-lg border border-zinc-700 bg-zinc-900/60 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-lime-400";
  const labelCls =
    "mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-zinc-400";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input type="hidden" name="source" value="story-apply" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Name</label>
          <input id="name" name="name" required className={inputCls} placeholder="Your name" />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="mt-1 text-xs text-red-400" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Email</label>
          <input id="email" name="email" type="email" required className={inputCls} placeholder="you@email.com" />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-xs text-red-400" />
        </div>
      </div>

      <div>
        <label htmlFor="whatsapp" className={labelCls}>WhatsApp (with country code)</label>
        <input id="whatsapp" name="whatsapp" required className={inputCls} placeholder="+1 555 123 4567" />
        <ValidationError prefix="WhatsApp" field="whatsapp" errors={state.errors} className="mt-1 text-xs text-red-400" />
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
        <label htmlFor="message" className={labelCls}>What&apos;s pulling you to this? (optional)</label>
        <textarea id="message" name="message" rows={3} className={inputCls} placeholder="A line or two about your situation and goal." />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-1 text-xs text-red-400" />
      </div>

      <ValidationError errors={state.errors} className="text-xs text-red-400" />

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
