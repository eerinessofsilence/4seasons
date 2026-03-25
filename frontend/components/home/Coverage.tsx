import { ArrowRight, MapPinned, ShieldEllipsis, Wrench } from "lucide-react";

const coverageAreas = [
  "Одеса",
  "Чорноморськ",
  "Таїрова",
  "Фонтан",
  "Передмістя",
];

const steps = [
  {
    icon: MapPinned,
    title: "1. Перевіряємо адресу",
    text: "Швидко дивимось, чи доступне підключення саме у вашому будинку.",
  },
  {
    icon: Wrench,
    title: "2. Домовляємось про візит",
    text: "Погоджуємо зручний час і приїжджаємо з усім потрібним для монтажу.",
  },
  {
    icon: ShieldEllipsis,
    title: "3. Підключаємо і налаштовуємо",
    text: "Запускаємо інтернет, перевіряємо швидкість і одразу залишаємо контакти підтримки.",
  },
];

export default function CoverageSection() {
  return (
    <section id="coverage" className="border-border border-b">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="border-border bg-foreground rounded-[1.75rem] border p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="border-border bg-background text-text flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-text text-xl font-semibold">
                        {step.title}
                      </h3>
                      <p className="text-text-muted leading-6">{step.text}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          <div
            className="border-border rounded-4xl border p-8"
            style={{
              backgroundImage: "var(--gradient)",
              boxShadow: "var(--shadow)",
            }}
          >
            <p className="text-text-muted text-sm font-semibold tracking-[0.3em] uppercase">
              Покриття 4Seasons
            </p>
            <h2 className="text-text mt-4 text-3xl font-semibold sm:text-4xl">
              Перевіримо, чи доступне підключення за вашою адресою
            </h2>
            <p className="text-text-muted mt-4 text-base leading-7">
              Працюємо в Одесі та передмісті. Після заявки швидко скажемо, які
              тарифи доступні у вашому будинку і коли можемо приїхати
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {coverageAreas.map((area) => (
                <span
                  key={area}
                  className="border-border bg-background text-text rounded-full border px-2 py-1 text-sm"
                >
                  {area}
                </span>
              ))}
            </div>

            <a
              href="#support"
              className="text-text hover:text-highlight mt-8 inline-flex items-center gap-2 text-sm font-semibold transition"
            >
              Залишити адресу
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
