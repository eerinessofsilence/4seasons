import { ArrowRight, Router, Tv, Zap } from "lucide-react";

const servicePillars = [
  {
    icon: Router,
    title: "xPON підключення",
    text: "Оптичне підключення для квартири, будинку чи невеликого офісу без зайвих компромісів.",
  },
  {
    icon: Tv,
    title: "4K, IPTV та ігри",
    text: "Запасу швидкості вистачає для телевізора, консолі та кількох активних пристроїв одночасно.",
  },
  {
    icon: Zap,
    title: "Резерв ключових вузлів",
    text: "Мережу підготовлено до вечірнього навантаження, коли вдома всі онлайн в один час.",
  },
];

export default function Network() {
  return (
    <section id="network" className="border-border border-b">
      <div className="px-5 py-16 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-8 lg:sticky lg:top-20">
            <div className="flex flex-col space-y-5">
              <h2 className="text-text max-w-3xl text-4xl leading-[1.2] font-semibold lg:text-5xl">
                Технології, які відчуваються щодня
              </h2>
              <p className="text-text-muted max-w-2xl text-base leading-7 sm:text-lg">
                Стабільне підключення, запас швидкості для телевізора й консолей
                та готовність мережі до навантаження у вечірні години, коли
                вдома всі онлайн одночасно
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#coverage"
                className="bg-text text-background hover:bg-highlight inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition"
              >
                Перевірити адресу
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div
            className="border-border rounded-4xl border p-6 sm:p-8"
            style={{
              backgroundImage: "var(--gradient)",
              boxShadow: "var(--shadow)",
            }}
          >
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-text-muted text-sm font-medium tracking-widest uppercase">
                  Що ви отримаєте
                </p>
                <h2 className="text-text text-3xl font-medium sm:text-4xl">
                  Мережу, яка витримує домашній ритм.
                </h2>
              </div>

              <div className="space-y-4">
                {servicePillars.map((pillar) => {
                  const Icon = pillar.icon;

                  return (
                    <div
                      key={pillar.title}
                      className="border-border bg-background rounded-3xl border p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="border-border/50 bg-secondary/50 text-text-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-text text-lg font-medium">
                            {pillar.title}
                          </h3>
                          <p className="text-text-muted mt-2 text-sm leading-6">
                            {pillar.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
