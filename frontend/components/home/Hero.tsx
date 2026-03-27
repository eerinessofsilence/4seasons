import { ArrowRight, Wifi } from "lucide-react";
import SoftAurora from "../ui/SoftAurora";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen px-5 py-12 pt-32 md:px-10 md:py-24 md:pt-36"
    >
      <div className="absolute inset-0 opacity-50">
        <SoftAurora
          speed={0.2}
          scale={1.5}
          brightness={0.5}
          color1="#E69A00"
          color2="#CC8800"
          noiseFrequency={1}
          noiseAmplitude={2}
          bandHeight={0.5}
          bandSpread={1}
          octaveDecay={0.1}
          layerOffset={0}
          colorSpeed={0.5}
          enableMouseInteraction={false}
        />
      </div>

      <div className="relative z-10 flex flex-col gap-16">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-text max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
            Домашній інтернет
            <span className="text-highlight block">без просідань</span>
          </h1>

          <p className="text-text-muted mt-5 max-w-2xl text-lg md:leading-8 lg:text-xl">
            Для роботи, навчання, 4K і ігор одночасно. Підключаємо за 1-2 дні,
            допомагаємо з роутером і залишаємося на зв&apos;язку після монтажу
          </p>
        </div>
        <div className="flex flex-row justify-center">
          <a
            href="#plans"
            className="hero-cta inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xl font-medium"
          >
            Підібрати тариф за хвилину
            <ArrowRight className="h-5 w-5 stroke-[2.5px]" />
          </a>
        </div>
        <div className="flex justify-center">
          <div className="border-border/50 bg-foreground text-text-muted inline-flex items-center gap-3 rounded-full border px-3 py-1 text-sm backdrop-blur-sm">
            <Wifi className="h-5 w-5" />
            Від 299 грн на місяць / до 1 Гбіт/с
          </div>
        </div>
      </div>
    </section>
  );
}
