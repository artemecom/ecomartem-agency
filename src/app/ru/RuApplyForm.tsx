"use client";

import { useEffect, useState } from "react";

/**
 * RU lead form inside the Telegram Mini App.
 * Posts straight to the ecom-engine webhook with the raw initData string;
 * the server validates the hash, sends the PDF into the user's bot chat
 * and notifies the sales team. Works in a plain browser too (fallback copy).
 */
const ENGINE_WEBHOOK = "https://shared-brain.tail048cfd.ts.net:10000/lead";

type TgWebApp = {
  ready: () => void;
  expand: () => void;
  initData: string;
  initDataUnsafe?: { user?: { first_name?: string; username?: string }; start_param?: string };
};

function getTg(): TgWebApp | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { Telegram?: { WebApp?: TgWebApp } }).Telegram?.WebApp;
}

export default function RuApplyForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [budget, setBudget] = useState("");
  const [experience, setExperience] = useState("");
  const [comment, setComment] = useState("");
  const [inTg, setInTg] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    const tg = getTg();
    if (tg?.initData) {
      setInTg(true);
      tg.ready();
      tg.expand();
      const u = tg.initDataUnsafe?.user;
      if (u?.first_name) setName(u.first_name);
      if (u?.username) setContact("@" + u.username);
    }
    try {
      const src = new URLSearchParams(window.location.search).get("src");
      if (src) localStorage.setItem("ecom_ru_src", src.slice(0, 60));
    } catch {
      /* noop */
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    let src = "";
    try {
      src = localStorage.getItem("ecom_ru_src") || "";
    } catch {
      /* noop */
    }
    const tg = getTg();
    try {
      const r = await fetch(ENGINE_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          market: "ru",
          name,
          contact,
          message: `budget:${budget || "?"} | exp:${experience || "?"} | ${comment}`,
          utm: { src: src || "direct" },
          initData: tg?.initData || "",
        }),
        keepalive: true,
      });
      setStatus(r.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-lime-500 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-white dark:placeholder:text-zinc-500";
  const labelCls =
    "mb-1.5 block font-mono text-[11px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400";

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-lime-500/40 bg-lime-400/10 p-8 text-center">
        <div className="text-2xl font-bold">Заявка принята ✔</div>
        <p className="mt-3 text-zinc-700 dark:text-zinc-300">
          {inTg
            ? "PDF с моделью уже отправлен тебе в этот чат. Команда напишет в ближайшее время."
            : "Мы свяжемся с тобой в Telegram и пришлём PDF с моделью."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-8">
      <h2 className="text-xl font-bold">Забрать PDF: моя бизнес-модель на Shopify + AI (2026)</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Бесплатно. Оставь заявку - PDF придёт сразу в чат, дальше команда разберёт твою ситуацию:
        магазин под ключ, обучение или личный формат.
      </p>

      <form onSubmit={submit} className="mt-6 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Имя</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Как к тебе обращаться" />
          </div>
          <div>
            <label className={labelCls}>Telegram / телефон</label>
            <input required value={contact} onChange={(e) => setContact(e.target.value)} className={inputCls} placeholder="@username или +7..." />
          </div>
        </div>

        <div>
          <label className={labelCls}>Где ты сейчас?</label>
          <select required value={experience} onChange={(e) => setExperience(e.target.value)} className={inputCls}>
            <option value="" disabled>Выбери</option>
            <option value="beginner">Только присматриваюсь</option>
            <option value="tried">Пробовал(а) - не взлетело</option>
            <option value="running">Есть работающий магазин / бизнес</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Готов(а) ли вкладываться в запуск?</label>
          <select required value={budget} onChange={(e) => setBudget(e.target.value)} className={inputCls}>
            <option value="" disabled>Выбери</option>
            <option value="200k_plus">Да, от 200 тыс ₽ (магазин под ключ)</option>
            <option value="60_200k">60-200 тыс ₽ (обучение / старт)</option>
            <option value="not_yet">Пока нет</option>
          </select>
        </div>

        <div>
          <label className={labelCls}>Пара слов о себе и цели (необязательно)</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} className={inputCls} placeholder="Чем занимаешься, что хочешь получить" />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-full bg-lime-400 px-8 py-4 font-semibold text-zinc-950 transition-colors hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Отправляю…" : "Получить PDF бесплатно + разбор →"}
        </button>

        {status === "error" && (
          <p className="text-center text-sm text-red-500">Не отправилось. Попробуй ещё раз или напиши боту напрямую.</p>
        )}
        <p className="text-center font-mono text-[11px] leading-relaxed text-zinc-500">
          Без спама. PDF сразу, разбор - только если есть смысл для обеих сторон.
        </p>
      </form>
    </div>
  );
}
