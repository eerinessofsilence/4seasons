import { Clock3, Mail, MapPin, Phone } from "lucide-react";

const footerGroups = [
  {
    title: "Розділи",
    links: [
      { href: "#network", label: "Мережа" },
      { href: "#plans", label: "Тарифи" },
      { href: "#coverage", label: "Покриття" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    title: "Клієнтам",
    links: [
      { href: "#coverage", label: "Як підключитися" },
      { href: "#faq", label: "Питання та відповіді" },
      { href: "#support", label: "Консультація" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-border bg-background border-t">
      <div className="p-5">
        <div
          className="border-border grid gap-8 rounded-4xl border p-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]"
          style={{
            backgroundImage: "var(--gradient)",
            boxShadow: "var(--shadow)",
          }}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="text-text text-base font-semibold">4Seasons</p>
                <p className="text-text/90 text-sm">
                  Домашній інтернет в Одесі та передмісті
                </p>
              </div>
            </div>
            <p className="text-text-muted max-w-sm text-sm leading-6">
              Швидко підключаємо, допомагаємо з обладнанням і залишаємося на
              зв&apos;язку після монтажу.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <h2 className="text-text text-sm font-semibold tracking-[0.2em] uppercase">
                {group.title}
              </h2>
              <div className="space-y-3">
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-text-muted hover:text-text block text-sm transition"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}

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
                Одеса та передмістя
              </p>
              <p className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0" />
                Щодня, 08:00-22:00
              </p>
            </div>
          </div>
        </div>

        <div className="border-border text-text-muted mt-6 flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 4Seasons. Домашній інтернет для спокійного щоденного ритму.
          </p>
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
