import type { Metadata } from "next";
import Link from "next/link";
import PlaybookFormRu from "./PlaybookFormRu";
import SmartImg from "../../story/SmartImg";

const URL = "https://ecomartem.com/ru/product";
const TITLE = "Своя система интернет-магазина на Shopify, бесплатно";
const DESCRIPTION =
  "Полная система магазина на Shopify: от выбора товара до бесплатного трафика, пошагово и с конкретными сервисами. 7 лет, стабильный результат тысячам людей. Забирай бесплатно.";

export const metadata: Metadata = {
  title: `${TITLE} | EcomArtem`,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: "EcomArtem", type: "website", locale: "ru_RU", images: ["/founder-16x9.jpg"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/founder-16x9.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

const SECTION = "px-6 py-14 md:py-20";

const STATS = [
  { n: "1 500+", l: "магазинов собрали" },
  { n: "5 000+", l: "человек обучили" },
  { n: "7 лет", l: "в онлайн-торговле" },
  { n: "0 ₽", l: "цена вопроса" },
];

const OLDWAY = [
  "Комиссии и штрафы растут, а решаешь не ты",
  "Карточку могут заблокировать в любой день",
  "Клиентов ты не видишь, они принадлежат площадке, не тебе",
  "Соседи демпингуют, и ты режешь цену следом",
];

const SECRETS: { t: string; d: string; hot?: boolean }[] = [
  { t: "Выбор выигрышного товара", d: "Как находить товар с реальным спросом моими сервисами, а не наугад." },
  { t: "Магазин за день на нейронке", d: "Собрать аккуратный магазин, которому доверяют, быстро и без дизайнера." },
  { t: "Поставщики и доставка", d: "У кого брать, как упаковать под бренд и не влететь на сроках." },
  { t: "Оффер и конверсия", d: "Формула оффера и приложения, которые превращают заходы в заказы." },
  { t: "Бесплатный трафик тоннами", d: "Самое сложное в e-com, и я его решил. Моя система органики плюс автопилот гонят трафик тоннами и без бюджета.", hot: true },
  { t: "Шаблоны и заготовки", d: "Чек-лист запуска, шаблон оффера, банк хуков. Бери и делай." },
];

const STEPS = [
  { n: "1", t: "Забери систему", d: "Два вопроса, почта, доступ сразу." },
  { n: "2", t: "Собери магазин правильно", d: "Выбери товар, подними магазин, настрой оффер, с конкретными сервисами." },
  { n: "3", t: "Включи бесплатный трафик", d: "Моя система органики плюс автопилот гонят трафик тоннами и без бюджета. Или соберу тебе магазин под ключ." },
];

const STACK = [
  "Полная система: от выбора товара до трафика, по шагам",
  "Поиск выигрышного товара, конкретные сервисы",
  "Магазин за день на нейронке",
  "Поставщики, оффер и конверсия",
  "Моя система бесплатного трафика плюс автопилот (та самая фишка)",
  "Шаблоны: чек-листы, офферы, банк хуков",
];

const PROOF = [
  { img: "/story/proof-1.jpg", cap: "11 801 $ за день, 67 заказов" },
  { img: "/story/proof-2.jpg", cap: "7 659 $ за день, конверсия 3%" },
  { img: "/story/result-3.jpg", cap: "8 914 $ за три недели, 238 заказов" },
  { img: "/story/result-1.jpg", cap: "5 017 $ за первые недели" },
];

const STORES = [
  { img: "/playbook/store-arthouses.jpg", n: "ArtHouses", d: "Свет и товары для дома. DACH / EU." },
  { img: "/playbook/store-rainrunner.jpg", n: "RainRunner", d: "Эко-дождевики. UK / EU." },
  { img: "/playbook/store-lumena.jpg", n: "Lumena", d: "Лампы и колонки. 5 000+ клиентов." },
];

const FORYOU = [
  "Строишь или ведёшь магазин и устал гадать, откуда брать трафик",
  "Хочешь клиентов без оплаты за каждый клик",
  "Готов постить и отвечать, даже когда скучно",
  "Нужен бренд, а не магазин-однодневка",
];
const NOTFORYOU = [
  "Ждёшь кнопку «разбогатеть» без работы",
  "Не готов пару постов в неделю пару месяцев",
  "Ищешь, кого винить, что не начал",
];

const FAQ: { q: string; a: string }[] = [
  { q: "Реально даром? В чём подвох?", a: "Да, даром, и без апсейла в платный курс. Эксперты продают версию хуже за 199 тысяч. Я отдаю настоящую, потому что в 2026 информация стоит копейки, а зарабатываю только если ты потом возьмёшь мой инструмент под трафик или закажешь магазин под ключ. Сначала польза, доверие потом." },
  { q: "Это надолго бесплатно?", a: "Пока да. Позже может стать платным. Читаешь сейчас, забирай." },
  { q: "Это очередной курс по дропшиппингу?", a: "Нет. Это полная система: от поиска товара и сборки магазина до трафика, который реально продаёт, плюс мой стек сервисов и движок-автопилот. Не 15 часов теории, а то, что приносит деньги." },
  { q: "Нужен большой бюджет?", a: "Нет. Весь смысл в органике: клиенты без оплаты за клик. Можно стартовать с тем магазином, что уже есть." },
  { q: "Я новичок, разберусь?", a: "Да. Написано по-человечески, по шагам, с чек-листами. Новичку весь путь, у кого магазин без продаж, точечный разбор." },
];

const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

function CTA({ children = "Забрать систему →", sub, center }: { children?: React.ReactNode; sub?: string; center?: boolean }) {
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
      <span className="text-3xl font-extrabold leading-none tracking-tight text-lime-500 dark:text-lime-400 md:text-5xl">0 ₽</span>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">{children}</p>;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-balance text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-3xl">{children}</h2>;
}

export default function ProductPageRu() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-lime-400/30 dark:bg-zinc-950 dark:text-zinc-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <header className="border-b border-zinc-200 px-6 py-5 dark:border-zinc-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/ru" className="font-bold tracking-tight">EcomArtem</Link>
          <a href="#get" className="rounded-full bg-lime-400 px-4 py-2 text-sm font-medium text-zinc-950 transition-colors hover:bg-lime-300">Забрать систему →</a>
        </div>
      </header>

      {/* HERO */}
      <section className="px-6 pt-14 pb-16 md:pt-20">
        <div className="mx-auto grid max-w-6xl items-start gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <p className="mb-5 inline-block rounded-full border border-lime-500/40 bg-lime-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">
              То, за что эксперты берут 199 000 ₽
            </p>
            <h1 className="text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight break-normal hyphens-none text-zinc-900 dark:text-white">
              Свой магазин. Свой трафик. Свои правила.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg">
              Полная система магазина на Shopify: от выбора товара до трафика. Пошагово и с конкретными сервисами. 7 лет приносит стабильный результат тысячам людей, отдаю бесплатно.
            </p>
            <div className="mt-6"><PriceTag /></div>
            <p className="mt-3 text-sm font-semibold text-zinc-800 dark:text-zinc-200">Учти: даром это будет не всегда. Забирай, пока так.</p>
            <div className="mt-7"><CTA sub="Ссылка придёт сразу · без звонков и карты" /></div>
          </div>
          <div className="md:col-span-5">
            <div className="relative">
              <SmartImg src="/founder-16x9.jpg" alt="Артём, основатель EcomArtem" className="aspect-[4/5] w-full rounded-3xl object-cover object-top" label="Фото" />
              <div className="absolute bottom-4 left-4 rounded-xl bg-zinc-950/80 px-4 py-2 backdrop-blur">
                <div className="text-sm font-bold text-white">Артём</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-lime-400">Shopify · 7 лет</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-zinc-200 px-6 py-10 dark:border-zinc-900">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
              <div className="font-mono text-3xl font-bold tracking-tight text-lime-600 dark:text-lime-400 md:text-4xl">{s.n}</div>
              <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OLD WAY */}
      <section className={SECTION}>
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Если ты на ВБ и Озоне</Eyebrow>
          <H2>Маркетплейс это не бизнес, а съёмная квартира</H2>
          <ul className="mt-6 space-y-3">
            {OLDWAY.map((o) => (<li key={o} className="flex gap-3 text-zinc-700 dark:text-zinc-300"><span className="mt-1 shrink-0 text-red-500">✕</span><span>{o}</span></li>))}
          </ul>
          <p className="mt-6 text-lg font-semibold leading-relaxed text-zinc-900 dark:text-white">Товар найти и магазин собрать это ерунда. Весь затык в трафике, тут и отваливаются почти все. Именно его я научился лить бесплатно и тоннами. Даю всю систему целиком, плюс то, чего нет у других.</p>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className={`${SECTION} border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/20`}>
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Что внутри</Eyebrow>
          <H2>Полная система, от товара до трафика</H2>
          <p className="mt-2 max-w-[60ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-lg">Каждый шаг с конкретными сервисами. А сердце системы это бесплатный трафик.</p>
          <div className="mt-6 space-y-3">
            {SECRETS.map((s, i) => (
              <div key={s.t} className={`flex gap-4 rounded-2xl border p-5 ${s.hot ? "border-lime-500/50 bg-lime-400/10 dark:border-lime-400/40 dark:bg-lime-400/5" : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"}`}>
                <div className="font-mono text-lg font-bold text-lime-600 dark:text-lime-400">{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white">{s.t}{s.hot ? <span className="ml-2 inline-block rounded-full bg-lime-400 px-2 py-0.5 align-middle font-mono text-[9px] uppercase tracking-widest text-zinc-950">фишка</span> : null}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CARTVIRAL */}
      <section className={SECTION}>
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-3xl border border-lime-500/30 bg-gradient-to-b from-lime-400/10 to-transparent dark:border-lime-400/25">
            <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">
              <div>
                <Eyebrow>Дальше интереснее</Eyebrow>
                <h2 className="text-balance text-2xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">Контент делается сам</h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-lg">
                  <p>Все бросают на одном: делать контент каждый день. Внутри показываю инструмент, который убрал эту стену.</p>
                  <p>Он берёт твои реальные товары, собирает из них органик-видео и учится на том, что продаёт. Нужен платный трафик, тем же движком делаешь креативы под рекламу.</p>
                </div>
                <div className="mt-6"><CTA>Показать, как это работает →</CTA></div>
              </div>
              <div>
                <SmartImg src="/playbook/cv-4.png" alt="Автопилот контента" className="w-full rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800" label="Скрин" />
                <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-zinc-500">Товары на входе · видео на выходе · учится на продажах</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={`${SECTION} border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/20`}>
        <div className="mx-auto max-w-5xl">
          <Eyebrow>Как это работает</Eyebrow>
          <H2>Три шага, без воды</H2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="rounded-2xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 font-bold text-zinc-950">{s.n}</div>
                <h3 className="mt-4 font-bold text-zinc-900 dark:text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFER STACK + PRICE */}
      <section className={SECTION}>
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Что в пакете</Eyebrow>
          <H2>Что забираешь с собой</H2>
          <div className="mt-6 rounded-3xl border border-zinc-200 bg-zinc-50 p-8 dark:border-zinc-800 dark:bg-zinc-900/30">
            <ul className="space-y-4">
              {STACK.map((s) => (<li key={s} className="flex gap-3 text-zinc-800 dark:text-zinc-200"><span className="mt-1 shrink-0 font-bold text-lime-500 dark:text-lime-400">✓</span><span>{s}</span></li>))}
            </ul>
            <div className="mt-8 flex flex-col items-center gap-4 border-t border-zinc-200 pt-8 text-center dark:border-zinc-800">
              <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Сколько за это берут эксперты</div>
              <PriceTag center />
              <a href="#get" className="mt-2 inline-flex items-center justify-center rounded-full bg-lime-400 px-10 py-4 text-lg font-bold text-zinc-950 shadow-lg shadow-lime-400/20 transition-colors hover:bg-lime-300">Забрать систему →</a>
              <div className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Без карты · без условий · на почте через минуту</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATCH */}
      <section className={`${SECTION} border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/20`}>
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950 md:flex-row md:p-10">
            <SmartImg src="/founder-4x5.jpg" alt="Артём" className="h-28 w-28 shrink-0 rounded-2xl object-cover object-top" label="Фото" />
            <div>
              <Eyebrow>По-честному</Eyebrow>
              <H2>Знаю, о чём ты думаешь</H2>
              <p className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-lg">«Никто не отдаёт даром то, что стоит 199 тысяч. Где развод?» Развода нет. Инфа сейчас стоит копейки, драть за неё двести тысяч смешно. Заработаю, только если зайдёт мой сервис или закажешь магазин под ключ, и то после пользы. Скрытых доплат нет.</p>
              <div className="mt-6"><CTA>Да, скидывай →</CTA></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF + STORES */}
      <section className={SECTION}>
        <div className="mx-auto max-w-5xl">
          <Eyebrow>Не теория, а цифры</Eyebrow>
          <H2>За системой живые цифры</H2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">8 живых магазинов, которые ведём. ROAS до 4,7, на пике 150+ заказов в день.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROOF.map((p) => (
              <figure key={p.img} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                <SmartImg src={p.img} alt={p.cap} className="aspect-[4/3] w-full bg-white object-contain" label="Скрин выручки" />
                <figcaption className="p-3 text-xs text-zinc-700 dark:text-zinc-300">{p.cap}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {STORES.map((s) => (
              <figure key={s.n} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
                <SmartImg src={s.img} alt={s.n} className="aspect-[3/4] w-full object-cover object-top" label="Витрина" />
                <figcaption className="p-4"><span className="font-bold text-zinc-900 dark:text-white">{s.n}</span>{" "}<span className="text-sm text-zinc-600 dark:text-zinc-400">{s.d}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className={`${SECTION} border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/20`}>
        <div className="mx-auto max-w-5xl">
          <Eyebrow>Коротко</Eyebrow>
          <H2>Кому зайдёт, а кому мимо</H2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-lime-500/30 bg-lime-400/5 p-7 dark:border-lime-400/25">
              <h3 className="mb-4 font-bold text-zinc-900 dark:text-white">Тебе зайдёт, если</h3>
              <ul className="space-y-3">{FORYOU.map((f) => (<li key={f} className="flex gap-3 text-zinc-700 dark:text-zinc-300"><span className="mt-1 shrink-0 text-lime-500 dark:text-lime-400">✓</span><span>{f}</span></li>))}</ul>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="mb-4 font-bold text-zinc-900 dark:text-white">Не трать время, если</h3>
              <ul className="space-y-3">{NOTFORYOU.map((f) => (<li key={f} className="flex gap-3 text-zinc-600 dark:text-zinc-400"><span className="mt-1 shrink-0 text-red-500">✕</span><span>{f}</span></li>))}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* GET IT */}
      <section id="get" className="scroll-mt-20 px-6 py-16 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-4 flex justify-center"><PriceTag center /></div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-4xl">Забирай систему</h2>
          <p className="mx-auto mt-4 mb-8 max-w-md text-base leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-lg">Два вопроса и почта. Доступ сразу, онлайн и PDF, копия на почту. Без карты и условий.</p>
        </div>
        <div className="mx-auto max-w-xl"><PlaybookFormRu /></div>
      </section>

      {/* WORK WITH ME */}
      <section className={`${SECTION} border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/20`}>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Или не набивай шишки годами</Eyebrow>
          <H2>Хочешь, соберу под ключ?</H2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-lg">Систему получаешь целиком и можешь всё сделать сам. Если проще, чтобы магазин собрал я, на 7 годах и 1 500+ магазинах, дверь открыта. Клиентов беру мало, зато вдумчиво. Начни с бесплатного разбора: честно скажу, потянем или нет.</p>
          <Link href="/story#apply" className="mt-6 inline-flex items-center justify-center rounded-full border border-zinc-300 px-8 py-4 font-semibold text-zinc-900 transition-colors hover:border-lime-500 dark:border-zinc-700 dark:text-white dark:hover:border-lime-400">Записаться на разбор →</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className={SECTION}>
        <div className="mx-auto max-w-3xl">
          <H2>Частые вопросы</H2>
          <div className="mt-6 divide-y divide-zinc-200 dark:divide-zinc-900">
            {FAQ.map((f) => (
              <div key={f.q} className="py-6">
                <h3 className="mb-2 font-semibold text-zinc-900 dark:text-white">{f.q}</h3>
                <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center"><CTA center>Забрать систему →</CTA></div>
        </div>
      </section>

      {/* P.S. */}
      <section className={`${SECTION} border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-900/20`}>
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-lime-600 dark:text-lime-400">P.S.</p>
          <p className="mt-3 text-base leading-relaxed text-zinc-700 dark:text-zinc-300 md:text-lg">Мог бы продать всё это за 199 тысяч, как все. Мне выгоднее отдать по-настоящему рабочую вещь, доказать делом и заслужить право помочь дальше. Забирай, пока даром.</p>
          <p className="mt-4 font-semibold text-zinc-900 dark:text-white">Артём</p>
        </div>
      </section>

      <footer className="border-t border-zinc-200 px-6 py-10 text-center font-mono text-[11px] uppercase tracking-widest text-zinc-400 dark:border-zinc-900 dark:text-zinc-600">
        EcomArtem · Shopify с 2019
      </footer>
    </main>
  );
}
