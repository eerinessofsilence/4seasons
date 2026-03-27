import type { LucideIcon } from "lucide-react";
import {
  Gauge,
  MessageSquareText,
  ShieldCheck,
  TimerReset,
} from "lucide-react";

interface BenefitItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefits: BenefitItem[] = [
  {
    icon: ShieldCheck,
    title: "Швидкість без сюрпризів",
    description:
      "Онлайн-уроки, серіали, відеодзвінки й робота не заважають одне одному у вечірні години.",
  },
  {
    icon: Gauge,
    title: "Тарифи без дрібного шрифту",
    description:
      "Ви одразу бачите швидкість, щомісячну ціну та кому підходить кожен план.",
  },
  {
    icon: TimerReset,
    title: "Швидке підключення",
    description:
      "Після перевірки адреси швидко погоджуємо час візиту й запускаємо інтернет без затримок.",
  },
  {
    icon: MessageSquareText,
    title: "Підтримка по-людськи",
    description:
      "Допомагаємо з оплатою, роутером і налаштуванням без довгих черг та переадресацій.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="space-y-12 px-5 py-12 md:px-10 md:py-24">
      <div className="max-w-3xl">
        <p className="text-text-muted text-sm font-medium tracking-widest uppercase">
          Чому нас обирають
        </p>
        <h2 className="text-text mt-2 text-4xl font-semibold lg:text-5xl">
          Інтернет для дому, де завжди багато онлайн-життя
        </h2>
        <p className="text-text-muted mt-3 text-base leading-7">
          Коли вдома одночасно працюють ноутбук, телевізор і кілька телефонів,
          важлива не лише цифра в тарифі, а й стабільна мережа, швидке
          підключення та нормальна підтримка
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-1 xl:grid-cols-2">
        {benefits.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="border-border bg-foreground relative overflow-hidden rounded-3xl border p-5"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_50%,rgba(255,255,255,0.025),transparent_40%),linear-gradient(170deg,rgba(255,255,255,0.025),transparent_34%)]" />

              <div className="relative z-10">
                <div className="flex items-center gap-2">
                  <div className="border-border/50 bg-secondary/50 text-highlight/75 flex h-10 w-10 shrink-0 flex-nowrap items-center justify-center rounded-xl border">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-text text-lg font-medium">
                    {item.title}
                  </h3>
                </div>
                <p className="text-text-muted mt-3 leading-5">
                  {item.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
