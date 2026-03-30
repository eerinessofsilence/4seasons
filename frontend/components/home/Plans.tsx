import type { CSSProperties } from "react";
import {
  BellRing,
  Building2,
  Cable,
  Check,
  ShieldCheck,
  Tv,
  Wifi,
  Wrench,
  Zap,
} from "lucide-react";

interface PlanCardData {
  name: string;
  price: string;
  speed: string;
  description: string;
  features: string[];
  note?: string;
  badge?: string;
  featured?: boolean;
}

interface ComparisonRow {
  label: string;
  values: string[];
}

const apartmentPlans: PlanCardData[] = [
  {
    name: "Super",
    price: "250",
    speed: "100 Мбіт/с",
    description: "Базовий безлімітний тариф для квартири без зайвих доплат",
    features: [
      "Без обмежень трафіку",
      "Бонус на ТВ канали",
      "Працює без електрики",
    ],
    note: "2 500 грн / рік",
  },
  {
    name: "Gigabit",
    price: "350",
    speed: "1 Гбіт/с",
    description:
      "Для квартир з великим навантаженням, Smart TV та запасом швидкості",
    features: [
      "Без обмежень трафіку",
      "Бонус на ТВ канали",
      "SMS-нагадування про оплату",
      "Працює без електрики",
    ],
    note: "3 500 грн / рік",
    badge: "Оптимальний вибір",
    featured: true,
  },
];

const businessPlans: PlanCardData[] = [
  {
    name: "Start",
    price: "650",
    speed: "10 Мбіт/с",
    description:
      "Стартовий тариф для кас, CRM, офісної пошти та базових бізнес-задач",
    features: [
      "Без обмежень трафіку",
      "Бонус на ТВ канали",
      "Гарантований канал",
    ],
  },
  {
    name: "Business",
    price: "850",
    speed: "100 Мбіт/с",
    description:
      "Для офісу, де важливі стабільність, нагадування про оплату та швидкість",
    features: [
      "Без обмежень трафіку",
      "Бонус на ТВ канали",
      "SMS-нагадування про оплату",
      "Гарантований канал",
      "Працює без електрики",
    ],
    badge: "Для офісу",
    featured: true,
  },
  {
    name: "Corporation",
    price: "1 200",
    speed: "1000 Мбіт/с",
    description:
      "Для камер, серверів, кількох відділів і важких мережевих сценаріїв",
    features: [
      "Без обмежень трафіку",
      "Бонус на ТВ канали",
      "SMS-нагадування про оплату",
      "Гарантований канал",
      "Працює без електрики",
    ],
  },
];

const apartmentComparisonRows: ComparisonRow[] = [
  {
    label: "Швидкість",
    values: apartmentPlans.map((plan) => plan.speed),
  },
  {
    label: "Трафік",
    values: apartmentPlans.map(() => "Без обмежень"),
  },
  {
    label: "ТВ бонус",
    values: apartmentPlans.map(() => "Так"),
  },
  {
    label: "SMS-нагадування",
    values: ["Ні", "Так"],
  },
  {
    label: "Працює без електрики",
    values: apartmentPlans.map(() => "Так"),
  },
  {
    label: "Оплата за рік",
    values: apartmentPlans.map((plan) => plan.note ?? "За тарифом"),
  },
];

const businessComparisonRows: ComparisonRow[] = [
  {
    label: "Швидкість",
    values: businessPlans.map((plan) => plan.speed),
  },
  {
    label: "Трафік",
    values: businessPlans.map(() => "Без обмежень"),
  },
  {
    label: "ТВ бонус",
    values: businessPlans.map(() => "Так"),
  },
  {
    label: "SMS-нагадування",
    values: ["Ні", "Так", "Так"],
  },
  {
    label: "Гарантований канал",
    values: businessPlans.map(() => "Так"),
  },
  {
    label: "Працює без електрики",
    values: ["Ні", "Так", "Так"],
  },
  {
    label: "Вартість підключення",
    values: businessPlans.map(() => "Індивідуально*"),
  },
];

function getComparisonGridStyle(planCount: number): CSSProperties {
  return {
    display: "grid",
    gridTemplateColumns: `minmax(12rem, 1.15fr) repeat(${planCount}, minmax(11rem, 1fr))`,
  };
}

function getComparisonMinWidth(planCount: number): string {
  return `${Math.max(48, (planCount + 1) * 13)}rem`;
}

function PlanCards({
  plans,
  columnsClassName,
}: {
  plans: PlanCardData[];
  columnsClassName: string;
}) {
  return (
    <div className={`grid gap-4 ${columnsClassName}`}>
      {plans.map((plan) => (
        <article
          key={plan.name}
          className={`relative flex h-full flex-col overflow-hidden rounded-4xl border p-5 ${
            plan.featured
              ? "border-border bg-secondary/50"
              : "border-border/50 bg-secondary/25"
          }`}
        >
          {plan.featured ? (
            <div className="pointer-events-none absolute -inset-4 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.05),transparent_50%),radial-gradient(circle_at_90%_100%,rgba(200,200,200,0.1),transparent_50%)]" />
          ) : (
            <div className="pointer-events-none absolute -inset-4 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.025),transparent_25%),radial-gradient(circle_at_90%_100%,rgba(200,200,200,0.05),transparent_25%)]" />
          )}

          <div className="relative z-10 flex h-full flex-col space-y-6">
            <div className="space-y-6">
              <div className="flex justify-between">
                <h3 className="text-text text-2xl">{plan.name}</h3>
                {plan.badge ? (
                  <span className="bg-highlight text-background inline-flex shrink-0 items-center rounded-full px-2 text-sm font-medium tracking-wide uppercase">
                    {plan.badge}
                  </span>
                ) : null}
              </div>
              <p className="text-text-muted max-w-xs leading-6">
                {plan.description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <p className="text-text text-5xl font-semibold">{plan.price}</p>
                <p className="text-text-muted text-sm">
                  / місяць (UAH) <br />
                  {plan.note}
                </p>
              </div>
            </div>

            <div className="border-border/50 bg-secondary/50 space-y-3 rounded-3xl border p-5">
              <div className="border-border/50 border-b pb-3">
                <p className="text-text-muted text-sm tracking-widest uppercase">
                  Швидкість
                </p>
                <p className="text-text mt-1 text-2xl font-medium">
                  {plan.speed}
                </p>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-text-muted flex items-center gap-3 text-sm"
                  >
                    <span className="border-border/75 bg-foreground/5 text-highlight/90 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-8">
              <a
                href="#coverage"
                className={`plans-cta inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all duration-400 ${
                  plan.featured ? "plans-cta-featured" : "plans-cta-subtle"
                }`}
              >
                Замовити
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ComparisonTable({
  title,
  plans,
  rows,
}: {
  title: string;
  plans: PlanCardData[];
  rows: ComparisonRow[];
}) {
  const gridStyle = getComparisonGridStyle(plans.length);

  return (
    <div className="border-border/50 bg-secondary/25 overflow-hidden rounded-4xl border">
      <div className="overflow-x-auto">
        <div style={{ minWidth: getComparisonMinWidth(plans.length) }}>
          <div
            style={gridStyle}
            className="text-text-muted/75 border-border/50 items-end gap-4 border-b px-5 py-4 text-sm md:gap-6 md:px-6"
          >
            <p className="text-lg font-medium tracking-widest uppercase">
              {title}
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

          {rows.map((row, index) => (
            <div
              key={row.label}
              style={gridStyle}
              className={`items-start gap-4 px-5 py-5 md:gap-6 md:px-6 ${
                index < rows.length - 1 ? "border-border/25 border-b" : ""
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
  );
}

export default function PlansSection() {
  return (
    <section id="plans" className="space-y-12 p-8 md:p-16 lg:p-24">
      <div className="flex flex-col gap-3">
        <div className="max-w-4xl text-pretty">
          <p className="text-text-muted text-sm font-medium tracking-widest uppercase">
            Тарифи
          </p>
          <h2 className="text-text mt-4 text-4xl font-semibold sm:text-5xl">
            Тарифи для квартир і нежитлових приміщень без прихованих дрібниць.
          </h2>
        </div>
        <p className="text-text-muted max-w-3xl leading-7 text-pretty">
          Зібрали в одному місці домашні та бізнес-тарифи, річну оплату для
          квартир, додаткові послуги та реальні умови підключення. Без
          маркетингових пакетів, де головне губиться в дрібному шрифті.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-text max-w-2xl text-3xl font-semibold sm:text-4xl">
            Безлімітні тарифи для квартири з оплатою помісячно або за рік.
          </h3>
          <p className="text-text-muted max-w-2xl leading-7">
            Обидва тарифи без обмежень трафіку, з бонусом на ТВ канали та
            можливістю працювати навіть під час відключень електрики.
          </p>
        </div>

        <PlanCards plans={apartmentPlans} columnsClassName="xl:grid-cols-2" />
        <ComparisonTable
          title="Порівняння"
          plans={apartmentPlans}
          rows={apartmentComparisonRows}
        />
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-text max-w-2xl text-3xl font-semibold sm:text-4xl">
            Бізнес-тарифи для офісів, сервісних точок і комерційних приміщень
          </h3>
          <p className="text-text-muted max-w-3xl leading-7">
            Тут важлива не лише швидкість, а й гарантований канал, стабільність
            та коректний розрахунок вартості під конкретну локацію
          </p>
        </div>

        <PlanCards plans={businessPlans} columnsClassName="xl:grid-cols-3" />
        <ComparisonTable
          title="Порівняння"
          plans={businessPlans}
          rows={businessComparisonRows}
        />
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-3">
        <article className="border-border/50 bg-foreground relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_100%,rgba(200,200,200,0.075),transparent_50%),linear-gradient(120deg,rgba(255,255,255,0.05),transparent_50%)]" />

          <div className="relative z-10 flex h-full flex-col space-y-6">
            <div className="flex items-center gap-3">
              <div className="border-border/50 bg-secondary/50 text-highlight/75 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
                <Tv className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-text text-xl font-medium">Додатково</h3>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-8">
              <div>
                <ul className="space-y-3">
                  <li className="text-text-muted flex items-start gap-3 text-sm leading-6">
                    <span className="border-border/25 bg-secondary/50 text-highlight/90 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    Бонус на ТВ канали: постійна знижка на послуги кабельного
                    телебачення від Divan TV.
                  </li>
                  <li className="text-text-muted flex items-start gap-3 text-sm leading-6">
                    <span className="border-border/25 bg-secondary/50 text-highlight/90 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    SMS-розсилка: нагадування про оплату із зазначенням
                    поточного балансу.
                  </li>
                  <li className="text-text-muted flex items-start gap-3 text-sm leading-6">
                    <span className="border-border/25 bg-secondary/50 text-highlight/90 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    Особиста IP-адреса: 50 UAH / міс за потреби.
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="border-border/50 bg-secondary/50 text-highlight/80 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
                    <Wrench className="h-5 w-5" />
                  </span>
                  <p className="text-text text-xl font-medium tracking-wide">
                    Виклик майстра
                  </p>
                </div>
                <ul className="space-y-3">
                  <li className="text-text-muted flex items-start gap-3 text-sm leading-6">
                    <span className="border-border/25 bg-secondary/50 text-highlight/90 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    Безкоштовно, якщо проблема виникла з боку провайдера.
                  </li>
                  <li className="text-text-muted flex items-start gap-3 text-sm leading-6">
                    <span className="border-border/25 bg-secondary/50 text-highlight/90 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    Від 100 UAH, якщо проблема виникла в межах приміщення
                    клієнта або з боку клієнта.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>

        <article className="border-border/50 bg-foreground relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-5 xl:col-span-2">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_100%,rgba(200,200,200,0.075),transparent_50%),linear-gradient(120deg,rgba(255,255,255,0.05),transparent_50%)]" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center gap-3">
              <div className="border-border/50 bg-secondary/50 text-highlight/75 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
                <Cable className="h-5 w-5" />
              </div>
              <div className="">
                <h3 className="text-text text-xl font-medium">Підключення</h3>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-text mb-3 text-sm font-semibold tracking-wide uppercase">
                  Базові умови
                </p>
                <ul className="space-y-3">
                  <li className="text-text-muted flex items-start gap-3 text-sm leading-6">
                    <span className="border-border/25 bg-secondary/50 text-highlight/90 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    200 UAH, якщо від роутера до загальної розподільчої шафи на
                    поверсі вже закладено кабель типу кручена пара.
                  </li>
                  <li className="text-text-muted flex items-start gap-3 text-sm leading-6">
                    <span className="border-border/25 bg-secondary/50 text-highlight/90 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    Складне підключення: від 200 UAH, якщо кабелю немає.
                  </li>
                  <li className="text-text-muted flex items-start gap-3 text-sm leading-6">
                    <span className="border-border/25 bg-secondary/50 text-highlight/90 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    Для квартир підключення коштує 1 грн при оплаті за рік, якщо
                    будинок уже підключений.
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-text mb-3 text-sm font-semibold tracking-wide uppercase">
                  У вартість входить
                </p>
                <ul className="space-y-3">
                  <li className="text-text-muted flex items-start gap-3 text-sm leading-6">
                    <span className="border-border/25 bg-secondary/50 text-highlight/90 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    Прокладання кабелю від активного обладнання провайдера до
                    квартири плюс до 20 м кабелю.
                  </li>
                  <li className="text-text-muted flex items-start gap-3 text-sm leading-6">
                    <span className="border-border/25 bg-secondary/50 text-highlight/90 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    Конектор RJ-45, виділення порта абоненту та реєстраційна
                    процедура.
                  </li>
                  <li className="text-text-muted flex items-start gap-3 text-sm leading-6">
                    <span className="border-border/25 bg-secondary/50 text-highlight/90 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    Короткий інструктаж щодо роботи в локальній мережі.
                  </li>
                  <li className="text-text-muted flex items-start gap-3 text-sm leading-6">
                    <span className="border-border/25 bg-secondary/50 text-highlight/90 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    Прокладання кабелю по квартирі за вказівкою замовника: від
                    200 UAH.
                  </li>
                  <li className="text-text-muted flex items-start gap-3 text-sm leading-6">
                    <span className="border-border/25 bg-secondary/50 text-highlight/90 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    Налаштування Wi-Fi роутера, приставки, Smart TV або
                    додаткових розеток: від 200 UAH.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="#coverage"
                className="text-foreground bg-highlight hover:text-background inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 hover:bg-[oklch(80%_0.2_65)]"
              >
                Перевірити підключення будинку
              </a>
            </div>
          </div>
        </article>
      </div>

      <div className="border-border/50 bg-secondary/5 relative overflow-hidden rounded-4xl border p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.07),transparent_60%),radial-gradient(circle_at_90%_100%,rgba(200,200,200,0.08),transparent_65%)]" />

        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-start">
          <div className="border-border/50 bg-foreground/5 text-highlight/85 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border">
            <Building2 className="h-6 w-6" />
          </div>

          <div className="space-y-3">
            <p className="text-text-muted text-sm font-medium tracking-widest uppercase">
              Важливо для бізнесу
            </p>
            <h3 className="text-text text-2xl font-semibold">
              Точну вартість підключення нежитлових приміщень узгоджуємо
              індивідуально.
            </h3>
            <p className="text-text-muted max-w-4xl leading-7">
              Фінальна ціна тарифу та підключення залежить від розташування
              приміщення, складності маршруту і того, чи підключення виконується
              по крученій парі або через волоконно-оптичний кабель.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="border-border/50 bg-foreground/25 text-text inline-flex items-center gap-2 rounded-full border px-3 py-2">
                <ShieldCheck className="h-4 w-4" />
                Гарантований канал для всіх бізнес-тарифів
              </div>
              <div className="border-border/50 bg-foreground/25 text-text inline-flex items-center gap-2 rounded-full border px-3 py-2">
                <Zap className="h-4 w-4" />
                Резерв по живленню для BUSINESS та CORPORATION
              </div>
              <div className="border-border/50 bg-foreground/25 text-text inline-flex items-center gap-2 rounded-full border px-3 py-2">
                <BellRing className="h-4 w-4" />
                SMS-нагадування для BUSINESS та CORPORATION
              </div>
              <div className="border-border/50 bg-foreground/25 text-text inline-flex items-center gap-2 rounded-full border px-3 py-2">
                <Wifi className="h-4 w-4" />
                xPON та локальна інфраструктура під конкретну адресу
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
