import { Clock3, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-12"
        style={{
          backgroundImage:
            "linear-gradient(180deg, var(--bg-dark) 0%, oklch(0% 0 0 / 0) 100%)",
        }}
      />

      <div className="relative z-10 space-y-16 p-8 pt-16 md:p-16 lg:p-24">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="space-y-2">
                <a href="/" className="flex items-center opacity-50">
                  <img
                    src="/logo-footer.svg"
                    alt="4Seasons"
                    className="h-7 w-auto"
                  />
                </a>
                <p className="text-text/75 font-medium lg:text-lg">
                  Домашній інтернет у Києвi
                </p>
              </div>
            </div>
            <p className="text-text-muted max-w-sm text-sm leading-6">
              Швидко підключаємо, допомагаємо з обладнанням і залишаємося на
              зв&apos;язку після монтажу.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-text text-sm font-semibold tracking-[0.2em] uppercase">
              Контакти
            </h2>
            <div className="text-text-muted space-y-3 text-sm">
              <a
                href="tel:+380000000000"
                className="hover:text-text flex items-start gap-3 transition"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                +380 (00) 000-00-00
              </a>
              <a
                href="mailto:hello@4seasons.net"
                className="hover:text-text flex items-start gap-3 transition"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                hello@4seasons.net
              </a>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                Голосіївський район, Київ
              </p>
              <p className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0" />
                Щодня, 08:00-22:00
              </p>
            </div>
          </div>
        </div>

        <div className="text-text-muted/50 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 4Seasons. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#hero" className="hover:text-text transition">
              Політика конфіденційності
            </a>
            <a href="#plans" className="hover:text-text transition">
              Публічна оферта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
