import { ArrowRight, Wifi } from "lucide-react";
import SoftAurora from "../ui/SoftAurora";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen p-8 pt-32 md:p-16 md:pt-36 lg:p-24 lg:pt-32"
    >
      <div className="absolute inset-0 opacity-50">
        <SoftAurora
          speed={0.3}
          scale={1.5}
          brightness={0.6}
          color1="#E69A00"
          color2="#CC8800"
          noiseFrequency={1}
          noiseAmplitude={2}
          bandHeight={0.5}
          bandSpread={1.25}
          octaveDecay={0.25}
          layerOffset={0}
          colorSpeed={0.6}
          enableMouseInteraction={false}
        />
      </div>

      <div className="relative z-10 flex flex-col gap-20 lg:gap-24">
        <div className="flex flex-col gap-12 lg:gap-16">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-text max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              Інтернет для дому
              <span className="text-highlight block">який не підводить</span>
            </h1>

            <p className="text-text-muted mt-5 max-w-3xl text-lg md:leading-8 lg:text-xl">
              Для роботи, навчання, 4K і ігор одночасно. Підключаємо за 1-2 дні,
              допомагаємо з роутером і залишаємося на зв&apos;язку після монтажу
            </p>
          </div>
          <div className="flex flex-row justify-center">
            <a
              href="#plans"
              className="text-foreground bg-highlight hover:text-background inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xl font-medium shadow-[inset_0_1px_0_oklch(100%_0_0/0.5)] transition-all duration-400 hover:bg-[oklch(80%_0.2_65)] hover:shadow-[inset_0_1px_0_oklch(100%_0_0/0.75)]"
            >
              Підібрати тариф за хвилину
              <ArrowRight className="h-5 w-5 stroke-[2.5px]" />
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="border-border/25 bg-secondary/25 text-text-muted/75 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm backdrop-blur-sm">
            <Wifi className="text-text-muted/50 h-5 w-5" />
            Від 250 грн на місяць / до 1 Гбіт/с
          </div>
        </div>
      </div>
    </section>
  );
}
