import { useState } from "react";
import { ChevronDown, ChevronRight, Headphones, PhoneCall } from "lucide-react";

const faqs = [
  {
    question: "Скільки триває підключення?",
    answer:
      "Зазвичай підключаємо протягом 1-2 днів після перевірки адреси та узгодження часу.",
  },
  {
    question: "Чи можна залишити власний роутер?",
    answer:
      "Так, якщо він підтримує потрібну швидкість. Якщо ні, підкажемо модель під вашу квартиру і тариф.",
  },
  {
    question: "Як звернутися в підтримку після підключення?",
    answer:
      "Телефоном або поштою. Допоможемо з оплатою, налаштуванням роутера і технічними питаннями.",
  },
];

export default function SupportSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq">
      <div className="px-5 py-16 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-text-muted text-sm font-medium tracking-widest uppercase">
              FAQ і підтримка
            </p>
            <h2 className="text-text mt-4 text-4xl font-semibold sm:text-5xl">
              Відповідаємо до підключення і не зникаємо після нього.
            </h2>

            <div className="border-border bg-foreground mt-8 h-fit overflow-hidden rounded-4xl border">
              {faqs.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <article
                    key={item.question}
                    className={
                      index < faqs.length - 1 ? "border-border border-b" : ""
                    }
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenIndex((currentIndex) =>
                          currentIndex === index ? -1 : index,
                        )
                      }
                      className={`flex w-full gap-4 p-6 text-left ${
                        isOpen ? "items-start" : "items-center"
                      }`}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="text-text block text-xl font-medium text-balance md:text-2xl">
                          {item.question}
                        </span>

                        <span
                          className={`grid overflow-hidden transition-all duration-300 ${
                            isOpen ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <span className="min-h-0">
                            <span className="text-text-muted block leading-6 text-pretty lg:text-lg">
                              {item.answer}
                            </span>
                          </span>
                        </span>
                      </span>

                      <span className="border-border/50 bg-secondary/50 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border">
                        <ChevronDown
                          className={`text-text h-5 w-5 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>
                  </article>
                );
              })}
            </div>
          </div>

          <aside
            id="support"
            className="border-border flex flex-col justify-between gap-8 rounded-4xl border p-5"
            style={{
              backgroundImage: "var(--gradient)",
              boxShadow: "var(--shadow)",
            }}
          >
            <div>
              <h3 className="text-text text-2xl font-semibold">
                Потрібна консультація?
              </h3>
              <p className="text-text-muted mt-4 leading-7">
                Підкажемо по адресі, тарифу, роутеру та самому підключенню. Без
                довгого очікування і без переадресацій між відділами.
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <a
                  href="tel:+380000000000"
                  className="border-border bg-secondary/25 hover:bg-secondary/50 text-text hover:text-highlight/90 flex items-center justify-between rounded-3xl border px-5 py-4 text-sm font-medium transition"
                >
                  <span className="flex items-center gap-3">
                    <PhoneCall className="h-4 w-4" />
                    Подзвонити менеджеру
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </a>
                <a
                  href="mailto:hello@4seasons.net"
                  className="border-border bg-secondary/25 text-text hover:text-highlight/90 hover:bg-secondary/50 flex items-center justify-between rounded-3xl border px-5 py-4 text-sm font-medium transition"
                >
                  <span className="flex items-center gap-3">
                    <Headphones className="h-4 w-4" />
                    Написати в підтримку
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              <div className="border-border/50 bg-foreground rounded-3xl border p-5">
                <p className="text-text/90 tracking-widest uppercase">
                  На зв&apos;язку
                </p>
                <p className="text-text-muted mt-3 text-sm leading-6">
                  Щодня з 08:00 до 22:00. Відповідаємо живо, без ботів і без
                  довгих черг.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
