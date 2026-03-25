import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { href: "#network", label: "Мережа" },
  { href: "#plans", label: "Тарифи" },
  { href: "#coverage", label: "Покриття" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  return (
    <header className="border-border bg-background sticky top-0 z-50 border-b">
      <div className="flex items-center justify-between px-5 py-3 md:px-10">
        <Link to="/" className="flex items-center gap-3">
          <div>
            <p className="text-text text-xl font-semibold">4Seasons</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-text-muted hover:text-text font-medium transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#coverage"
            className="bg-foreground text-text border-border/50 hover:bg-secondary inline-flex items-center gap-2 rounded-full border px-4 py-2 font-semibold transition-all duration-200"
          >
            Перевірити адресу
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
