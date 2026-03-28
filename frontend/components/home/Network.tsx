import { MapIcon, Router, Tv, Zap } from "lucide-react";

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
    <section id="network" className="px-5 py-12 md:px-10 md:py-24">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-8 lg:sticky lg:top-20">
          <div className="flex flex-col space-y-5">
            <h2 className="text-text max-w-3xl text-4xl leading-[1.2] font-semibold lg:text-5xl">
              Технології, які відчуваються щодня
            </h2>
            <p className="text-text-muted max-w-2xl text-base leading-7 sm:text-lg">
              Стабільне підключення, запас швидкості для телевізора й консолей
              та готовність мережі до навантаження у вечірні години, коли вдома
              всі онлайн одночасно
            </p>
          </div>

          <a
            href="#coverage"
            className="border-border bg-secondary/75 hover:text-text-muted text-text hover:bg-secondary inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-lg font-medium backdrop-blur-lg transition-colors duration-200"
          >
            <MapIcon className="h-5 w-5" />
            Перевірити адресу
          </a>
        </div>

        <div className="border-border relative rounded-4xl border p-5">
          <div className="pointer-events-none absolute inset-0 rounded-4xl bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.05),transparent_75%),radial-gradient(circle_at_90%_100%,rgba(200,200,200,0.05),transparent_75%)]" />

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
                    className="border-border/50 bg-foreground relative overflow-hidden rounded-3xl border p-5"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_100%,rgba(200,200,200,0.075),transparent_50%),linear-gradient(120deg,rgba(255,255,255,0.05),transparent_50%)]" />

                    <div className="relative z-10 flex items-start gap-4">
                      <div className="border-border/50 bg-secondary/50 text-highlight/75 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
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
    </section>
  );
}
