import { Check, Tv, Wifi } from "lucide-react";

const plans = [
  {
    name: "Комфорт",
    price: "299",
    speed: "100 Мбіт/с",
    description:
      "Для серфінгу, відео, месенджерів і спокійного користування вдома",
    features: [
      "Безлімітний трафік",
      "Підійде для 2-3 пристроїв",
      "Підтримка щодня",
    ],
    comparison: {
      bestFor: "Серфінг, месенджери та відео без високого навантаження",
      devices: "2-3 пристрої",
      streaming: "YouTube, відеодзвінки, HD-стрімінг",
      support: "Щодня",
      traffic: "Безлімітний",
    },
  },
  {
    name: "Родина",
    price: "399",
    speed: "500 Мбіт/с",
    description:
      "Для квартири, де одночасно працюють, навчаються і дивляться 4K",
    features: [
      "Комфортно для всієї квартири",
      "4K, IPTV та відеодзвінки",
      "Найкращий баланс ціни і швидкості",
    ],
    comparison: {
      bestFor: "Квартири, де одночасно працюють, навчаються і дивляться 4K",
      devices: "5-8 пристроїв",
      streaming: "4K, IPTV, Zoom і робота без просідань",
      support: "Щодня",
      traffic: "Безлімітний",
    },
    featured: true,
  },
  {
    name: "Гігабіт",
    price: "549",
    speed: "1000 Мбіт/с",
    description: "Для великого дому, стрімінгу та техніки, яка постійно онлайн",
    features: [
      "До 1 Гбіт/с",
      "Підійде для NAS, консолей і камер",
      "Пріоритетна підтримка",
    ],
    comparison: {
      bestFor: "Великі доми, стрімінг, камери та техніка, що постійно онлайн",
      devices: "8+ пристроїв",
      streaming: "4K/8K, консолі, NAS і важкі сценарії",
      support: "Пріоритетна",
      traffic: "Безлімітний",
    },
  },
];

const comparisonGridClass =
  "grid grid-cols-[minmax(12rem,1.15fr)_repeat(3,minmax(11rem,1fr))] gap-4 md:gap-6";

const comparisonRows = [
  {
    label: "Швидкість",
    values: plans.map((plan) => plan.speed),
  },
  {
    label: "Для кого",
    values: plans.map((plan) => plan.comparison.bestFor),
  },
  {
    label: "Кількість пристроїв",
    values: plans.map((plan) => plan.comparison.devices),
  },
  {
    label: "Стрімінг і робота",
    values: plans.map((plan) => plan.comparison.streaming),
  },
  {
    label: "Підтримка",
    values: plans.map((plan) => plan.comparison.support),
  },
  {
    label: "Трафік",
    values: plans.map((plan) => plan.comparison.traffic),
  },
];

const extras = [
  {
    icon: Wifi,
    title: "Wi-Fi роутер",
    text: "Підкажемо модель під площу квартири, товщину стін і кількість пристроїв",
  },
  {
    icon: Tv,
    title: "IPTV пакет",
    text: "Підключіть телебачення разом з інтернетом без окремої складної схеми",
  },
];

export default function PlansSection() {
  return (
    <section id="plans" className="space-y-12 px-5 py-12 md:px-10 md:py-24">
      <div className="flex flex-col gap-3">
        <div className="max-w-4xl text-pretty">
          <p className="text-text-muted text-sm font-medium tracking-widest uppercase">
            Тарифи
          </p>
          <h2 className="text-text mt-4 text-4xl font-semibold sm:text-5xl">
            Три плани без перевантаження опціями.
          </h2>
        </div>
        <p className="text-text-muted max-w-2xl leading-7 text-pretty">
          Без заплутаних пакетів і прихованих доплат. Ви одразу бачите, скільки
          платите, яку швидкість отримуєте і для якого сценарію підійде кожен
          тариф
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr_1fr]">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`relative space-y-4 overflow-hidden rounded-4xl border p-6 ${
              plan.featured
                ? "bg-secondary/50 border-border"
                : "bg-secondary/25 border-border/50"
            }`}
          >
            {plan.featured ? (
              <div className="pointer-events-none absolute -inset-4 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.05),transparent_50%),radial-gradient(circle_at_90%_100%,rgba(200,200,200,0.1),transparent_50%)]" />
            ) : (
              <div className="pointer-events-none absolute -inset-4 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.025),transparent_25%),radial-gradient(circle_at_90%_100%,rgba(200,200,200,0.05),transparent_25%)]" />
            )}

            <div className="flex flex-col items-start justify-between gap-4">
              <div className="flex w-full items-center justify-between gap-3">
                <h3 className="text-text text-2xl">{plan.name}</h3>
                {plan.featured ? (
                  <span className="text-background bg-highlight rounded-full px-3 py-1 text-sm font-medium tracking-wide text-nowrap uppercase">
                    Оптимальний вибір
                  </span>
                ) : null}
              </div>
              <p className="text-text-muted mt-3 leading-6">
                {plan.description}
              </p>
            </div>

            <div className="flex items-end gap-2">
              <p className="text-text text-4xl font-semibold">{plan.price}</p>
              <p className="text-text-muted pb-1 text-sm">грн / міс</p>
            </div>

            <div className="border-border/50 bg-secondary/50 rounded-3xl border px-5 py-4">
              <p className="text-text-muted text-sm tracking-widest uppercase">
                Швидкість
              </p>
              <p className="text-text mt-2 text-xl font-medium">{plan.speed}</p>
            </div>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="text-text-muted flex items-center gap-3 text-sm"
                >
                  <span className="border-border/25 bg-secondary/50 text-highlight/90 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <a
                href="#coverage"
                className={`plans-cta mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-right font-medium transition-all duration-400 ${
                  plan.featured ? "plans-cta-featured" : "plans-cta-subtle"
                }`}
              >
                Обрати тариф
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="border-border/50 bg-secondary/25 overflow-hidden rounded-4xl border">
        <div className="overflow-x-auto overscroll-contain">
          <div className="min-w-200">
            <div
              className={`${comparisonGridClass} text-text-muted/75 border-border/50 items-end border-b px-5 py-4 text-sm md:px-6`}
            >
              <p className="text-lg font-medium tracking-widest uppercase">
                Порівняння
              </p>
              {plans.map((plan) => (
                <p
                  key={plan.name}
                  className="text-text text-lg font-medium uppercase"
                >
                  {plan.name}
                </p>
              ))}
            </div>

            {comparisonRows.map((row, index) => (
              <div
                key={row.label}
                className={`${comparisonGridClass} items-start px-5 py-5 md:px-6 ${
                  index < comparisonRows.length - 1
                    ? "border-border/25 border-b"
                    : ""
                }`}
              >
                <p className="text-text/90 pr-3 text-sm leading-6 font-semibold md:text-base">
                  {row.label}
                </p>
                {row.values.map((value, valueIndex) => (
                  <p
                    key={`${row.label}-${plans[valueIndex]?.name}`}
                    className="text-text-muted text-sm leading-6 text-pretty md:text-base"
                  >
                    {value}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {extras.map((extra) => {
          const Icon = extra.icon;

          return (
            <div
              key={extra.title}
              className="border-border/50 bg-foreground relative overflow-hidden rounded-[1.75rem] border p-6"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_100%,rgba(200,200,200,0.075),transparent_50%),linear-gradient(120deg,rgba(255,255,255,0.05),transparent_50%)]" />

              <div className="relative z-10 flex items-start gap-4">
                <div className="border-border/50 bg-secondary/50 text-highlight/75 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-text text-lg font-medium">
                    {extra.title}
                  </h3>
                  <p className="text-text-muted mt-2 text-sm leading-6">
                    {extra.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
