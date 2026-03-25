import { ArrowRight, Check, Tv, Wifi } from "lucide-react";

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
    <section id="plans" className="border-border border-b">
      <div className="mx-auto max-w-6xl space-y-8 py-16">
        <div className="flex flex-col gap-3">
          <div className="max-w-3xl">
            <p className="text-text-muted text-sm font-semibold tracking-[0.3em] uppercase">
              Тарифи
            </p>
            <h2 className="text-text mt-4 text-3xl font-semibold sm:text-4xl">
              Три плани без перевантаження опціями.
            </h2>
          </div>
          <p className="text-text-muted max-w-xl text-base leading-7">
            Без заплутаних пакетів і прихованих доплат. Ви одразу бачите,
            скільки платите, яку швидкість отримуєте і для якого сценарію
            підійде кожен тариф.
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1fr_1.1fr_1fr]">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`border-border space-y-4 rounded-4xl border p-6 ${
                plan.featured ? "bg-secondary" : "bg-foreground"
              }`}
              style={
                plan.featured
                  ? {
                      backgroundImage: "var(--gradient)",
                      boxShadow: "var(--shadow)",
                    }
                  : undefined
              }
            >
              <div className="flex flex-col items-start justify-between gap-4">
                <div className="flex w-full items-center justify-between gap-3">
                  <h3 className="text-text text-2xl">{plan.name}</h3>
                  {plan.featured ? (
                    <span className="border-border/50 text-background bg-highlight rounded-full border px-2 py-1 text-sm font-medium tracking-wide text-nowrap uppercase">
                      Оптимальний вибір
                    </span>
                  ) : null}
                </div>
                <p className="text-text-muted mt-3 leading-6">
                  {plan.description}
                </p>
              </div>

              <div className="flex items-end gap-2">
                <p className="text-text text-4xl font-medium">{plan.price}</p>
                <p className="text-text-muted pb-1 text-sm">грн / міс</p>
              </div>

              <div className="border-border/25 bg-secondary/25 rounded-3xl border px-5 py-4">
                <p className="text-text-muted text-sm tracking-widest uppercase">
                  Швидкість
                </p>
                <p className="text-text mt-2 text-xl font-medium">
                  {plan.speed}
                </p>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-text-muted flex items-center gap-3 text-sm"
                  >
                    <span className="border-border/25 bg-secondary/25 text-highlight/90 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex justify-end">
                <a
                  href="#coverage"
                  className="text-text hover:text-highlight mt-8 inline-flex items-center gap-2 text-right text-sm font-medium transition-colors duration-200"
                >
                  Перевірити доступність
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {extras.map((extra) => {
            const Icon = extra.icon;

            return (
              <div
                key={extra.title}
                className="border-border bg-foreground rounded-[1.75rem] border p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="border-border bg-background text-text flex h-12 w-12 items-center justify-center rounded-2xl border">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-text text-lg font-semibold">
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
      </div>
    </section>
  );
}
