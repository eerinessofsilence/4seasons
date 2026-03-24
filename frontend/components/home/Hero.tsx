import { ArrowRight, CirclePlay, Wifi } from "lucide-react";
import LineWaves from "../ui/LineWaves";

export default function Hero() {
  return (
    <section id="hero" className="border-border container border-b p-5">
      <div className="border-border relative overflow-hidden rounded-4xl border">
        <div className="absolute inset-0 opacity-60">
          <LineWaves
            speed={0.05}
            innerLineCount={15}
            outerLineCount={30}
            warpIntensity={1}
            rotation={-15}
            edgeFadeWidth={0}
            colorCycleSpeed={1}
            brightness={0.4}
            color1="#666666"
            color2="#222222"
            color3="#444444"
            enableMouseInteraction
            mouseInfluence={2}
          />
        </div>

        <div className="from-background/10 via-background/30 to-background absolute inset-0 bg-linear-to-b" />

        <div className="relative z-10 flex flex-col gap-10 p-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-text max-w-xl text-7xl font-semibold tracking-tight">
              Інтернет для всієї
              <span className="block">родини</span>
            </h1>

            <p className="mt-4 max-w-xl text-lg">
              Працюйте, навчайтеся, дивіться 4K і грайте одночасно. Стабільна
              швидкість у кожній кімнаті без вечірніх просідань.
            </p>
          </div>

          <div className="flex justify-center gap-6">
            <a
              href="#plans"
              className="text-background bg-text hover:bg-text-muted inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-lg font-medium transition-colors duration-200"
            >
              Обрати тариф
              <ArrowRight className="h-5 w-5" />
            </a>

            <a
              href="#coverage"
              className="border-border/50 bg-secondary/50 text-text hover:bg-secondary/75 inline-flex items-center justify-center gap-2 rounded-2xl border px-6 py-3 text-xl font-medium backdrop-blur-md transition-all"
            >
              <CirclePlay className="text-text h-6 w-6" />
              Як підключаємо
            </a>
          </div>

          <div className="mt-8 flex justify-center lg:justify-start">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/75 backdrop-blur-sm">
              <Wifi className="h-4 w-4" />
              Тарифи від 299 грн/міс і швидкість до 1 Гбіт/с
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
