"use client";

import { useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";

/** Гейт для бесплатного плейбука (RU-воронка). Контакт + короткая анкета -> отдаёт плейбук.
 * Тот же Formspree, тег source=product-playbook-ru, зеркалится в ecom-engine с UTM. */
const ENGINE_WEBHOOK = "/api/lead";
const UTM_KEY = "ecom_utm";
const UTM_PARAMS = ["src", "utm_source", "utm_medium", "utm_campaign", "utm_content", "v"];
const PLAYBOOK_URL = "/playbook-ru";

function captureUtm() {
  try {
    const p = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const k of UTM_PARAMS) { const v = p.get(k); if (v) found[k] = v.slice(0, 100); }
    if (Object.keys(found).length) localStorage.setItem(UTM_KEY, JSON.stringify(found));
  } catch { /* storage unavailable */ }
}

function sendToEngine(form: HTMLFormElement) {
  try {
    const f = new FormData(form);
    let utm: Record<string, string> = {};
    try { utm = JSON.parse(localStorage.getItem(UTM_KEY) || "{}"); } catch { /* noop */ }
    fetch(ENGINE_WEBHOOK, {
      method: "POST", headers: { "Content-Type": "application/json" }, keepalive: true,
      body: JSON.stringify({
        market: "ru", name: f.get("name"), contact: `${f.get("email") || ""}`.trim(),
        message: `PLAYBOOK-RU optin | stage:${f.get("stage") || "?"} | goal:${f.get("goal") || "?"}`,
        utm: Object.keys(utm).length ? utm : { utm_source: "direct" },
      }),
    }).catch(() => {});
  } catch { /* never block submit */ }
}

export default function PlaybookFormRu() {
  const [state, handleSubmit] = useForm("xpqbdzow");
  useEffect(captureUtm, []);

  if (state.succeeded) {
    return (
      <div className="rounded-2xl border border-lime-500/40 bg-lime-400/10 p-8 text-center dark:border-lime-400/40 dark:bg-lime-400/5">
        <div className="text-2xl font-bold text-zinc-900 dark:text-white">Готово, забирай.</div>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">Открывай прямо тут. Копию отправил на почту, чтобы не потерял.</p>
        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={PLAYBOOK_URL} target="_blank" rel="noopener" className="inline-flex items-center justify-center rounded-full bg-lime-400 px-7 py-3.5 font-semibold text-zinc-950 transition-colors hover:bg-lime-300">Читать онлайн →</a>
          <a href="/downloads/plejbuk-shopify.pdf" target="_blank" rel="noopener" className="inline-flex items-center justify-center rounded-full border border-zinc-300 px-7 py-3.5 font-semibold text-zinc-900 transition-colors hover:border-lime-500 dark:border-zinc-700 dark:text-white dark:hover:border-lime-400">Скачать PDF</a>
        </div>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-zinc-500">Без спама. Захочешь магазин под ключ лично со мной, ты знаешь, где меня найти.</p>
      </div>
    );
  }

  const inputCls = "w-full rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-lime-500 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-white dark:placeholder:text-zinc-500 dark:focus:border-lime-400";
  const labelCls = "mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400";

  return (
    <form onSubmit={(e) => { sendToEngine(e.currentTarget); handleSubmit(e); }} className="flex flex-col gap-5">
      <input type="hidden" name="source" value="product-playbook-ru" />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>Имя</label>
          <input id="name" name="name" required className={inputCls} placeholder="Как тебя зовут" />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="mt-1 text-xs text-red-500 dark:text-red-400" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>Почта (куда отправить)</label>
          <input id="email" name="email" type="email" required className={inputCls} placeholder="you@email.com" />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-xs text-red-500 dark:text-red-400" />
        </div>
      </div>
      <div>
        <label htmlFor="stage" className={labelCls}>Где ты сейчас?</label>
        <select id="stage" name="stage" required defaultValue="" className={inputCls}>
          <option value="" disabled>Выбери одно</option>
          <option value="thinking">Только думаю начать</option>
          <option value="marketplace">Торгую на ВБ / Озоне</option>
          <option value="running_no_sales">Есть магазин, продаж мало</option>
          <option value="running_sales">Магазин с реальными продажами</option>
        </select>
      </div>
      <div>
        <label htmlFor="goal" className={labelCls}>Что тебе нужно?</label>
        <select id="goal" name="goal" required defaultValue="" className={inputCls}>
          <option value="" disabled>Выбери одно</option>
          <option value="learn_diy">Научиться делать самому</option>
          <option value="traffic">Наладить трафик и продажи</option>
          <option value="done_for_you">Чтобы сделали под ключ</option>
        </select>
      </div>
      <ValidationError errors={state.errors} className="text-xs text-red-500 dark:text-red-400" />
      <button type="submit" disabled={state.submitting} className="mt-1 inline-flex items-center justify-center rounded-full bg-lime-400 px-8 py-4 font-semibold text-zinc-950 transition-colors hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60">
        {state.submitting ? "Отправляю…" : "Забрать систему →"}
      </button>
      <p className="text-center font-mono text-[11px] leading-relaxed text-zinc-500">Бесплатно. Без спама. Два вопроса, чтобы подсказать тебе следующий шаг.</p>
    </form>
  );
}
