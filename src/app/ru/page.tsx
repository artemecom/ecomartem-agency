import type { Metadata } from "next";
import Script from "next/script";
import { ARTICLE_HTML, ARTICLE_TITLE } from "./article-html";
import RuApplyForm from "./RuApplyForm";

/**
 * RU advertorial for the Telegram Mini App funnel.
 * Opened from the bot via a web_app button (t.me deep link -> bot -> this page),
 * so every reader has already started the bot = pushable base.
 * Kept out of search indexes: this page exists for the TG funnel, not SEO.
 */
export const metadata: Metadata = {
  title: ARTICLE_TITLE,
  robots: { index: false, follow: false },
};

export default function RuStoryPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      <style>{`
        .ru-article{max-width:680px;margin:0 auto;font-size:1.06rem;line-height:1.75}
        .ru-article p{margin:0 0 1.1em}
        .ru-article h3{font-size:1.35rem;font-weight:700;margin:1.6em 0 .6em;line-height:1.3}
        .ru-article h4{font-size:1.15rem;font-weight:700;margin:1.4em 0 .5em}
        .ru-article blockquote{border-left:3px solid #a3e635;padding:2px 0 2px 16px;margin:1.2em 0;color:inherit;opacity:.92;font-style:italic}
        .ru-article ul,.ru-article ol{margin:0 0 1.1em;padding-left:1.4em}
        .ru-article li{margin-bottom:.4em}
        .ru-article img{max-width:100%;border-radius:12px;margin:1.2em 0}
        .ru-article figure{margin:1.2em 0}
        .ru-article figcaption{font-size:.85rem;opacity:.65;text-align:center;margin-top:.4em}
        .ru-article a{color:#65a30d;text-decoration:underline}
        .ru-article hr{border:none;border-top:1px solid rgba(128,128,128,.25);margin:1.6em 0}
        .ru-article b,.ru-article strong{font-weight:700}
      `}</style>

      <div className="px-5 pb-24 pt-10 sm:pt-14">
        <article className="ru-article">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">
            Разбор от практика · 7 лет · 1500 магазинов
          </p>
          <h1 className="mb-6 text-2xl font-bold leading-snug sm:text-3xl">{ARTICLE_TITLE}</h1>
          <div dangerouslySetInnerHTML={{ __html: ARTICLE_HTML }} />
        </article>

        <div className="mx-auto mt-12 max-w-[680px]" id="apply">
          <RuApplyForm />
        </div>
      </div>
    </main>
  );
}
