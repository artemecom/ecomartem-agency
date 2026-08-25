import type { Metadata } from "next";
import Link from "next/link";
import PlaybookFormRu from "./PlaybookFormRu";
import SmartImg from "../../story/SmartImg";

const URL = "https://ecomartem.com/ru/product";
const TITLE = "Плейбук по Shopify за 199 000 ₽ - бесплатно";
const DESCRIPTION =
  "7 лет опыта перехода с маркетплейсов на свой магазин на Shopify. Как гнать трафик без рекламы, какие сервисы, как поставить контент на поток. Отдаю бесплатно.";

export const metadata: Metadata = {
  title: `${TITLE} | EcomArtem`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: "EcomArtem", type: "website", locale: "ru_RU", images: ["/founder-16x9.jpg"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/founder-16x9.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

const STATS = [
  { n: "1 500+", l: "магазинов собрали" },
  { n: "5 000+", l: "человек обучили" },
  { n: "7 лет", l: "в ecom с 2019" },
  { n: "0 ₽", l: "во сколько тебе обойдётся" },
];

const PLATFORMS = ["Shopify", "Instagram", "TikTok", "YouTube", "Telegram"];

const OLDWAY = [
  "Склад забит товаром, деньги заморожены - а тут ещё и склады площадок горят",
  "Комиссию подняли за ночь - и ты в минусе, а спросить не с кого",
  "Заблокировали карточку по одной жалобе - и год работы коту под хвост",
  "Клиент купил у тебя, а достался площадке. База - не твоя",
];

const SECRETS = [
  { t: "Как я гоню органический трафик", d: "Как заставить незнакомца остановиться, досмотреть и купить - не платя за каждый клик. Ровно то, чему гуру как раз и не учат." },
  { t: "Система бесплатного трафика", d: "Как приводить клиентов без рекламы. Один канал, прокачанный вглубь - он копится в актив, а не сгорает, как арендованное внимание." },
  { t: "Сервис, который делает контент за меня", d: "Тот самый тул, что пробил мне стену с ежедневным контентом (про него ниже). Лепит видео из твоих реальных товаров и умнеет с каждой продажей." },
  { t: "Весь мой стек по шагам", d: "Конкретные сервисы: поиск товара, сборка магазина нейронкой, поставщики, конверсия. Хватит гадать, чем пользоваться." },
  { t: "Шаблоны и заготовки", d: "Чек-лист запуска, шаблон оффера, контент-ритм, банк хуков. Бери и делай." },
];

const STEPS = [
  { n: "1", t: "Забери бесплатно", d: "Два вопроса, почта - и доступ сразу. Копия падает ещё и на почту." },
  { n: "2", t: "Собери или почини - потом трафик", d: "По системе: магазин, который продаёт, и органика, которая приносит просмотры без рекламы." },
  { n: "3", t: "Поставь контент на автопилот", d: "Тем же движком держишь объём, пока спишь. Или я лично соберу тебе магазин под ключ." },
];

const STACK = [
  "Полный плейбук по своему магазину на Shopify - вся система",
  "Как я гоню органику и бесплатный трафик",
  "Сервис-автопилот для контента - и как я им пользуюсь",
  "Весь мой стек сервисов по шагам",
  "Шаблоны, чек-листы, заготовки",
];

const PROOF = [
  { img: "/story/proof-1.jpg", cap: "11 801 $ за один день - 67 заказов" },
  { img: "/story/proof-2.jpg", cap: "7 659 $ за день - 159 заказов при конверсии 3%" },
  { img: "/story/result-3.jpg", cap: "8 914 $ за три недели - 238 заказов" },
];

const FORYOU = [
  "Сидишь на ВБ или Озоне и устал зависеть от чужих правил",
  "Хочешь клиентов без переплаты за каждый клик",
  "Готов реально снимать и отвечать - даже когда лень",
  "Хочешь свой бренд, а не полку в чужом магазине",
];
const NOTFORYOU = [
  "Ищешь кнопку «разбогатеть» без движений",
  "Не готов постить пару раз в неделю хотя бы пару месяцев",
  "Ищешь, на кого свалить, что так и не начал",
];

const FAQ: { q: string; a: string }[] = [
  { q: "Это правда бесплатно? В чём подвох?", a: "Правда бесплатно, без апселла на платный курс. Гуру продают версию похуже за 199 000 ₽. Я отдаю настоящее даром, потому что в 2026 инфа не стоит почти ничего, а зарабатываю только если плейбук зайдёт и ты потом захочешь сервис, которым я пользуюсь, или чтобы я лично собрал тебе магазин. Сначала польза - потом доверие. Вот и вся схема." },
  { q: "Останется бесплатным?", a: "Пока да. Может, потом сделаю платным или вошью в продукт побольше. Читаешь сейчас - забирай, пока раздаю." },
  { q: "Это очередной курс по дропшиппингу?", a: "Нет. Это система органического трафика, которую я кручу на 1 500+ магазинах, плюс мой стек сервисов и движок контента на автопилоте. Не 15 часов теории, а то, что реально двигает деньги." },
  { q: "Нужен большой бюджет?", a: "Нет. Вся суть в органике - клиенты без переплаты за каждый клик. Можно начать с тем магазином, что уже есть." },
  { q: "Я новичок. Разберусь?", a: "Да. Написано по-человечески, по шагам, с чек-листами и шаблонами. Новичку - весь путь от нуля, у кого магазин без продаж - починка." },
  { q: "Почему тебе можно верить?", a: "7 лет строю магазины на Shopify. Зарабатывал и терял на своей шкуре - оба урока честно внутри. Хочешь всю историю - почитай мою страницу." },
];

const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

function CTA({ children = "Забрать плейбук бесплатно →", sub, center }: { children?: React.ReactNode; sub?: string; center?: boolean }) {
  return (
    <div className={`flex flex-col gap-2 ${center ? "items-center" : "items-start"}`}>
      <a href="#get" className="inline-flex items-center justify-center rounded-full bg-lime-400 px-8 py-4 text-base font-semibold text-zinc-950 shadow-lg shadow-lime-400/20 transition-colors hover:bg-lime-300">{children}</a>
      {sub ? <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">{sub}</span> : null}
    </div>
  );
}

function PriceTag({ center }: { center?: boolean }) {
  return (
    <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${center ? "justify-center" : ""}`}>
      <span className="relative text-2xl font-bold text-zinc-400 md:text-4xl">
        199 000 ₽
        <span className="absolute left-0 top-1/2 h-[3px] w-full -rotate-6 bg-red-500" />
      </span>
      <span className="text-3xl font-extrabold leading-none tracking-tight text-lime-500 dark:text-lime-400 md:text-5xl">БЕСПЛАТНО</span>
    </div>
  );
}

export default function ProductPageRu() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-lime-400/30 dark:bg-zinc-950 dark:text-zinc-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <header className="border-b border-zinc-200 px-6 py-5 dark:border-zinc-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/ru" className="font-bold tracking-tight">EcomArtem</Link>
          <a href="#get" className="rounded-full bg-lime-400 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-lime-300">Забрать бесплатно →</a>
        </div>
      </header>

      {/* HERO */}
      <section className="px-6 pt-14 pb-16 md:pt-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-5 inline-block rounded-full border border-lime-500/40 bg-lime-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">
              Такой плейбук продают за 199 000 ₽ · тебе даром
            </p>
            <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-zinc-900 dark:text-white md:text-[44px] md:leading-[1.08]">
              Свой магазин вместо чужой полки. Бесплатно.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              7 лет строю магазины на Shopify. Пока склады ВБ и Озона лихорадит, я собрал всё про переход на своё: как гнать трафик без рекламы, какими сервисами пользоваться, как поставить контент на поток. Гуру просят за это под 200 тысяч. У меня ноль.
            </p>
            <div className="mt-6"><PriceTag /></div>
            <p className="mt-4 text-sm font-semibold text-zinc-800 dark:text-zinc-200">Учти: бесплатно - это ненадолго. Забирай, пока раздаю.</p>
            <div className="mt-7"><CTA sub="Доступ сразу · и на почту" /></div>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-lime-400" />Обучил <strong className="text-zinc-900 dark:text-white">5 000+ человек</strong></span>
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-lime-400" /><strong className="text-zinc-900 dark:text-white">1 500+ магазинов</strong> собрал</span>
            </div>
          </div>
          <div className="relative">
            <SmartImg src="/founder-16x9.jpg" alt="Артём, основатель EcomArtem" className="aspect-[4/5] w-full rounded-3xl object-cover object-top" label="Фото" />
            <div className="absolute bottom-4 left-4 rounded-xl bg-zinc-950/80 px-4 py-2 backdrop-blur">
              <div className="text-sm font-bold text-white">Артём</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-lime-400">Shopify · 7 лет</div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
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

      {/* PLATFORMS */}
      <section className="border-y border-zinc-200 px-6 py-8 dark:border-zinc-900">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PLATFORMS.map((p) => (<span key={p} className="font-mono text-sm uppercase tracking-widest text-zinc-400 dark:text-zinc-600">{p}</span>))}
        </div>
      </section>

      {/* OLD WAY */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Читай, если сидишь на маркетплейсах</p>
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Маркетплейс - это не твой бизнес. Это съёмная квартира.</h2>
          <p className="mb-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">Почти все, кто в итоге теряет всё, теряют одинаково. Не потому что ленивые - просто им достался дорогой и хрупкий путь:</p>
          <ul className="space-y-3">
            {OLDWAY.map((o) => (<li key={o} className="flex gap-3 text-zinc-700 dark:text-zinc-300"><span className="mt-1 shrink-0 text-red-500">✕</span><span>{o}</span></li>))}
          </ul>
          <p className="mt-6 text-lg font-semibold leading-relaxed text-zinc-900 dark:text-white">Собрать магазин - это самое простое, дай бог 20% работы. А вот приводить клиентов, не переплачивая за каждый клик - те самые 80%, про которые никто не хочет говорить. Как раз этому и учит плейбук.</p>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-900 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Что реально внутри</p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">То, что я нигде раньше в одном месте не выкладывал</h2>
          <div className="space-y-4">
            {SECRETS.map((s, i) => (
              <div key={s.t} className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="font-mono text-lg font-bold text-lime-600 dark:text-lime-400">{String(i + 1).padStart(2, "0")}</div>
                <div><h3 className="text-lg font-bold text-zinc-900 dark:text-white">{s.t}</h3><p className="mt-1 leading-relaxed text-zinc-600 dark:text-zinc-400">{s.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARTVIRAL WOW */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-lime-500/30 bg-gradient-to-b from-lime-400/10 to-transparent dark:border-lime-400/25">
            <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Тут начинается почти читерство</p>
                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">Твой контент - на автопилоте.</h2>
                <div className="mt-4 space-y-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                  <p>Все ломаются в одном месте: снимать контент каждый день. Внутри показываю сервис, который эту стену мне пробил.</p>
                  <p>Он цепляется к твоему магазину, лепит из <strong className="text-zinc-900 dark:text-white">реальных товаров</strong> ролики в стиле обычного контента и с каждым постом становится умнее. Учится на продажах, а не на догадках. Органика идёт почти сама.</p>
                  <p>А потом щёлкаешь тумблер - и тот же движок выдаёт <strong className="text-zinc-900 dark:text-white">креативы под платную рекламу</strong>. Органика зарабатывает просмотр даром, платка делает из него деньги.</p>
                  <p className="font-semibold text-zinc-900 dark:text-white">Ближе к бесплатной машине трафика я за 7 лет ничего не встречал. Как я этим пользуюсь - разбираю в плейбуке.</p>
                </div>
                <div className="mt-6"><CTA>Покажи этот автопилот →</CTA></div>
              </div>
              <div>
                <SmartImg src="/playbook/cv-4.png" alt="Автопилот контента" className="w-full rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800" label="Скрин" />
                <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-zinc-500">Реальные товары на входе · готовые ролики на выходе · учится на продажах</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-900 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Как это устроено</p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Три шага, без воды</h2>
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

      {/* OFFER STACK + PRICE */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Что в пакете</p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Что получаешь - с нуля</h2>
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/30">
            <ul className="space-y-4">
              {STACK.map((s) => (<li key={s} className="flex gap-3 text-lg text-zinc-800 dark:text-zinc-200"><span className="mt-1 shrink-0 font-bold text-lime-500 dark:text-lime-400">✓</span><span>{s}</span></li>))}
            </ul>
            <div className="mt-8 flex flex-col items-center gap-4 border-t border-zinc-200 pt-8 text-center dark:border-zinc-800">
              <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Сколько за это просят гуру</div>
              <PriceTag center />
              <a href="#get" className="mt-2 inline-flex items-center justify-center rounded-full bg-lime-400 px-10 py-4 text-lg font-bold text-zinc-950 shadow-lg shadow-lime-400/20 transition-colors hover:bg-lime-300">Забрать бесплатно →</a>
              <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Без карты · без условий · на почте за 30 секунд</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATCH */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-900 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 md:flex-row md:p-10">
            <SmartImg src="/founder-4x5.jpg" alt="Артём" className="h-28 w-28 shrink-0 rounded-2xl object-cover object-top" label="Фото" />
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Так в чём подвох?</p>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Знаю, о чём ты сейчас думаешь.</h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                <p>«Никто не раздаёт систему за 200 тысяч задаром. Где развод?» Вопрос честный - отвечаю честно.</p>
                <p>В 2026 инфа стоит копейки, её и так везде навалом. Курс не стоит тех денег, что рисуют гуру. Я зарабатываю только двумя способами: если плейбук зашёл и ты захотел тот сервис, которым я гоню трафик, или если попросишь собрать магазин лично. И то, и другое - <strong className="text-zinc-900 dark:text-white">уже после</strong> того, как я реально помог.</p>
                <p>Так что никакого курса за 200 тысяч в конце. Никакого впаривания. Отдаю настоящее, зарабатываю доверие, выигрываю только когда выигрываешь ты. Это ровно наоборот, чем у гуру, который всё прячет за ценником.</p>
                <p className="font-semibold text-zinc-900 dark:text-white">Вот и весь подвох. Я скрытые тоже терпеть не могу.</p>
              </div>
              <div className="mt-6"><CTA>Давай, скидывай плейбук →</CTA></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Пруфы, не теория</p>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">За системой - реальные цифры</h2>
          <p className="mb-8 text-zinc-600 dark:text-zinc-400">8 живых брендов, ROAS до 4.7, на пике 150+ заказов в день. Не слова - скрины кабинетов.</p>
          <div className="grid gap-5 md:grid-cols-3">
            {PROOF.map((p) => (
              <figure key={p.img} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                <SmartImg src={p.img} alt={p.cap} className="aspect-[4/3] w-full bg-white object-contain" label="Скрин выручки" />
                <figcaption className="p-4 text-sm text-zinc-700 dark:text-zinc-300">{p.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* STORES */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-900 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-5xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Реальные бренды, не помойка</p>
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Магазины, которые мы собрали и ведём</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { img: "/playbook/store-arthouses.jpg", n: "ArtHouses", d: "Премиум-свет и товары для дома. DACH / EU." },
              { img: "/playbook/store-rainrunner.jpg", n: "RainRunner", d: "Эко-дождевики. £54.90, рейтинг 5/5. UK / EU." },
              { img: "/playbook/store-lumena.jpg", n: "Lumena", d: "Лампы-океаны и колонки. 5 000+ клиентов." },
            ].map((s) => (
              <figure key={s.n} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                <SmartImg src={s.img} alt={s.n} className="aspect-[3/4] w-full object-cover object-top" label="Витрина" />
                <figcaption className="p-4"><span className="font-bold text-zinc-900 dark:text-white">{s.n}</span>{" "}<span className="text-sm text-zinc-600 dark:text-zinc-400">{s.d}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-lime-500/30 bg-lime-400/5 p-7 dark:border-lime-400/25">
            <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">Это тебе, если</h3>
            <ul className="space-y-3">{FORYOU.map((f) => (<li key={f} className="flex gap-3 text-zinc-700 dark:text-zinc-300"><span className="mt-1 shrink-0 text-lime-500 dark:text-lime-400">✓</span><span>{f}</span></li>))}</ul>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950">
            <h3 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">Это не тебе, если</h3>
            <ul className="space-y-3">{NOTFORYOU.map((f) => (<li key={f} className="flex gap-3 text-zinc-600 dark:text-zinc-400"><span className="mt-1 shrink-0 text-red-500">✕</span><span>{f}</span></li>))}</ul>
          </div>
        </div>
      </section>

      {/* GET IT */}
      <section id="get" className="scroll-mt-20 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-4 flex justify-center"><PriceTag center /></div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">Забирай свой плейбук</h2>
          <p className="mx-auto mt-4 mb-8 max-w-md text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">Два коротких вопроса и почта. Доступ сразу - онлайн и PDF, плюс копия на почту. Без карты, без условий. И бесплатно - не навсегда.</p>
        </div>
        <div className="mx-auto max-w-xl"><PlaybookFormRu /></div>
      </section>

      {/* WORK WITH ME */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-900 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">Или не набивай шишки годами</p>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Хочешь, чтобы сделали под ключ?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">Плейбук отдаёт тебе всю систему. А если хочешь, чтобы я лично собрал твой магазин под ключ - на 7 годах и 1 500+ магазинах - дверь открыта. Клиентов беру мало, зато делаю качественно. Начни с бесплатного разбора: честно скажу, подходит тебе или нет. Без впаривания.</p>
          <Link href="/story#apply" className="mt-6 inline-flex items-center justify-center rounded-full border border-zinc-300 px-8 py-4 font-semibold text-zinc-900 transition-colors hover:border-lime-500 dark:border-zinc-700 dark:text-white dark:hover:border-lime-400">Записаться на бесплатный разбор →</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">Частые вопросы</h2>
          <div className="divide-y divide-zinc-200 dark:divide-zinc-900">
            {FAQ.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">{f.q}</h3>
                <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center"><CTA center>Забрать плейбук бесплатно →</CTA></div>
        </div>
      </section>

      {/* P.S. */}
      <section className="border-t border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-900 dark:bg-zinc-900/20">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">P.S.</p>
          <p className="mt-3 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">Я мог бы, как все, спрятать это за 199 000 ₽ - мне так и советовали. Но лучше отдам настоящее, докажу, что работает, и заслужу право помочь тебе дальше. Это сработает, только если плейбук реально хороший. Он такой. Забирай, пока раздаю, и иди забирать те 80%, которые все пропускают.</p>
          <p className="mt-4 font-semibold text-zinc-900 dark:text-white">- Артём</p>
        </div>
      </section>

      <footer className="border-t border-zinc-200 px-6 py-10 text-center font-mono text-[11px] uppercase tracking-widest text-zinc-400 dark:border-zinc-900 dark:text-zinc-600">
        EcomArtem · Shopify с 2019
      </footer>
    </main>
  );
}
