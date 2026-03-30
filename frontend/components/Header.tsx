import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Mail,
  Menu,
  Moon,
  Phone,
  Sun,
  UserRound,
  X,
} from "lucide-react";
import { useLocation } from "react-router-dom";

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

const THEME_STORAGE_KEY = "4seasons-theme";
const HEADER_IDLE_DELAY = 1600;

function getInitialIsLightTheme() {
  if (typeof window === "undefined") {
    return false;
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light") {
    return true;
  }

  if (savedTheme === "dark") {
    return false;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches;
}

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
  const [isLightTheme, setIsLightTheme] = useState(getInitialIsLightTheme);
  const [hasScrolled, setHasScrolled] = useState(() =>
    typeof window === "undefined" ? false : window.scrollY > 8,
  );
  const [activeHash, setActiveHash] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hash,
  );
  const [isHeaderActive, setIsHeaderActive] = useState(true);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const idleTimeoutRef = useRef<number | null>(null);

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const toggleTheme = () => setIsLightTheme((currentValue) => !currentValue);

  const closeMobileMenu = (restoreFocus = false) => {
    setIsMobileMenuOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => {
        triggerRef.current?.focus();
      });
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("light", isLightTheme);
    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      isLightTheme ? "light" : "dark",
    );
  }, [isLightTheme]);

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
    const clearIdleTimeout = () => {
      if (idleTimeoutRef.current !== null) {
        window.clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = null;
      }
    };

    const scheduleHeaderFade = () => {
      clearIdleTimeout();
      setIsHeaderActive(true);

      if (window.scrollY <= 8 || isMobileMenuOpen) {
        return;
      }

      idleTimeoutRef.current = window.setTimeout(() => {
        setIsHeaderActive(false);
      }, HEADER_IDLE_DELAY);
    };

    const handleScroll = () => {
      const isAtTop = window.scrollY <= 8;

      setHasScrolled(!isAtTop);

      if (isAtTop) {
        clearIdleTimeout();
        setIsHeaderActive(true);
        return;
      }

      scheduleHeaderFade();
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearIdleTimeout();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);

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
    <header
      className={`sticky top-0 z-50 -mb-16 transition-[opacity,background-color] duration-500 ${
        hasScrolled || isMobileMenuOpen ? "bg-foreground" : "bg-transparent"
      } ${
        !hasScrolled || isMobileMenuOpen || isHeaderActive
          ? "translate-y-0 opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      onFocusCapture={() => setIsHeaderActive(true)}
    >
      <div className="relative px-8 py-3 md:px-16 lg:px-24">
        <div className="grid grid-cols-[1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <a
            href="/"
            className="flex items-center gap-3 lg:justify-self-start"
            onClick={() => closeMobileMenu()}
          >
            <img
              src={isLightTheme ? "/logo-light.svg" : "/logo.svg"}
              alt="4Seasons"
              className="h-7 w-auto md:h-8"
            />
          </a>

          <nav className="hidden items-center justify-center gap-8 lg:flex lg:justify-self-center">
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

          <div className="flex items-center gap-3 justify-self-end">
            <button
              type="button"
              role="switch"
              aria-checked={isLightTheme}
              aria-label={
                isLightTheme ? "Switch to dark theme" : "Switch to light theme"
              }
              onClick={toggleTheme}
              className="border-border/50 bg-foreground relative inline-flex h-10 w-20 shrink-0 cursor-pointer items-center rounded-full border px-1.5 shadow-inner transition-all duration-200 active:scale-[0.97]"
            >
              <span className="pointer-events-none relative z-10 grid w-full grid-cols-2 place-items-center">
                <Sun
                  className={`h-4 w-4 transition-colors duration-200 ${
                    isLightTheme ? "text-text" : "text-text-muted/55"
                  }`}
                />
                <Moon
                  className={`h-4 w-4 transition-colors duration-200 ${
                    isLightTheme ? "text-text-muted" : "text-text"
                  }`}
                />
              </span>
              <span
                aria-hidden="true"
                className={`border-border bg-secondary absolute top-1.25 left-[8.25px] h-7 w-7 rounded-full border shadow-sm transition-transform duration-300 ${
                  isLightTheme ? "translate-x-0" : "translate-x-[32.75px]"
                }`}
              />
            </button>
            <a
              type="button"
              className="border-border bg-secondary/50 hover:text-text-muted text-text hover:bg-secondary hidden cursor-pointer items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-lg transition-colors duration-200 lg:inline-flex"
              aria-label="Особистий кабінет"
              href="https://my.4seasons.net.ua/"
            >
              <UserRound className="h-4 w-4" />
              Особистий кабінет
            </a>
            <button
              ref={triggerRef}
              type="button"
              className="border-border/50 bg-foreground text-text hover:bg-secondary relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 lg:hidden"
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
        </div>

        <div
          id="mobile-menu-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          aria-hidden={!isMobileMenuOpen}
          className={`border-border/25 bg-foreground absolute inset-x-0 top-full z-60 mx-5 mt-px rounded-b-[1.75rem] border-x border-b p-5 shadow-[0_24px_64px_oklch(0%_0_0/0.3)] transition-all duration-200 lg:hidden ${
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
            type="button"
            tabIndex={mobileTabIndex}
            className="border-border bg-secondary/50 hover:text-text-muted text-text hover:bg-secondary mt-5 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border px-4 py-3 text-base font-medium backdrop-blur-lg transition-colors duration-200"
            onClick={() => closeMobileMenu()}
            href="https://my.4seasons.net.ua/"
          >
            <UserRound className="h-5 w-5" />
            Особистий кабінет
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
