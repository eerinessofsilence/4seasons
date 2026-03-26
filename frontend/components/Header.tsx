import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Menu, Phone, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { href: "#network", label: "Мережа" },
  { href: "#plans", label: "Тарифи" },
  { href: "#coverage", label: "Покриття" },
  { href: "#faq", label: "FAQ" },
];

const contactItems = [
  {
    href: "tel:+380000000000",
    label: "+380 (00) 000-00-00",
    icon: Phone,
  },
  {
    href: "mailto:hello@4seasons.net",
    label: "hello@4seasons.net",
    icon: Mail,
  },
];

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hash,
  );

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const openMobileMenu = () => setIsMobileMenuOpen(true);

  const closeMobileMenu = (restoreFocus = false) => {
    setIsMobileMenuOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
      setIsMobileMenuOpen(false);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    setActiveHash(typeof window === "undefined" ? "" : window.location.hash);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    const focusFrame = window.requestAnimationFrame(() => {
      const firstFocusable = panelRef.current
        ? getFocusableElements(panelRef.current)[0]
        : null;

      firstFocusable?.focus();
    });

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu(true);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusableElements = getFocusableElements(panelRef.current);

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const mobileTabIndex = isMobileMenuOpen ? 0 : -1;

  return (
    <header className="border-border bg-foreground sticky top-0 z-50 border-b backdrop-blur">
      <div className="relative px-5 py-3 md:px-10">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-3"
            onClick={() => closeMobileMenu()}
          >
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

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="#coverage"
              className="bg-foreground text-text border-border/50 hover:bg-secondary inline-flex items-center gap-2 rounded-full border px-4 py-2 font-semibold transition-all duration-200"
            >
              Перевірити адресу
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <button
            ref={triggerRef}
            type="button"
            className="border-border bg-foreground text-text hover:bg-secondary relative inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-200 lg:hidden"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
            aria-haspopup="dialog"
            aria-label={isMobileMenuOpen ? "Закрити меню" : "Відкрити меню"}
            onClick={() =>
              isMobileMenuOpen ? closeMobileMenu(true) : openMobileMenu()
            }
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        <div
          id="mobile-menu-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          aria-hidden={!isMobileMenuOpen}
          className={`border-border bg-foreground absolute inset-x-0 top-full z-60 mx-5 mt-px rounded-b-[1.75rem] border-x border-b p-5 shadow-[0_24px_64px_oklch(0%_0_0/0.3)] transition-all duration-200 lg:hidden ${
            isMobileMenuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
          style={{
            backgroundImage:
              "radial-gradient(circle_at_top_right, oklch(0.78 0.19 67 / 0.12), transparent 28%), linear-gradient(180deg, oklch(0.18 0 0), oklch(0.12 0 0))",
          }}
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeHash === item.href;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  tabIndex={mobileTabIndex}
                  aria-current={isActive ? "location" : undefined}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? "border-highlight/25 bg-highlight/5 text-text"
                      : "border-border/50 bg-foreground hover:bg-secondary/50 text-text-muted hover:border-secondary hover:text-text"
                  }`}
                  onClick={() => closeMobileMenu()}
                >
                  <span className="text-base font-medium">{item.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              );
            })}
          </nav>

          <a
            href="#coverage"
            tabIndex={mobileTabIndex}
            className="bg-text text-background hover:bg-highlight mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 font-semibold transition-colors duration-200"
            onClick={() => closeMobileMenu()}
          >
            Перевірити адресу
            <ArrowRight className="h-4 w-4" />
          </a>

          <div className="border-border/60 mt-5 grid grid-cols-1 gap-2 border-t pt-5 sm:grid-cols-2">
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  tabIndex={mobileTabIndex}
                  className="border-border/50 bg-secondary/50 text-text hover:bg-secondary flex items-center gap-3 rounded-2xl border px-4 py-3 transition-colors duration-200"
                  onClick={() => closeMobileMenu()}
                >
                  <span className="border-border/50 bg-foreground/25 text-highlight/90 flex h-10 w-10 items-center justify-center rounded-xl border">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 truncate text-sm font-medium">
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
