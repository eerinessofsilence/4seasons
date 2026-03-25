import {
  ChevronRight,
  Headphones,
  MessageCircleQuestion,
  PhoneCall,
} from "lucide-react";

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
  return (
    <section id="faq">
      <div className="px-10 py-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-text-muted text-sm font-semibold tracking-[0.3em] uppercase">
              FAQ і підтримка
            </p>
            <h2 className="text-text mt-4 text-3xl font-semibold sm:text-4xl">
              Відповідаємо до підключення і не зникаємо після нього.
            </h2>

            <div className="mt-8 space-y-4">
              {faqs.map((item) => (
                <article
                  key={item.question}
                  className="border-border bg-foreground rounded-[1.75rem] border p-6"
                >
                  <div className="flex items-start gap-3">
                    <MessageCircleQuestion className="text-text mt-1 h-5 w-5 shrink-0" />
                    <div>
                      <h3 className="text-text text-lg font-semibold">
                        {item.question}
                      </h3>
                      <p className="text-text-muted mt-3 text-sm leading-6">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside
            id="support"
            className="border-border rounded-4xl border p-8"
            style={{
              backgroundImage: "var(--gradient)",
              boxShadow: "var(--shadow)",
            }}
          >
            <div className="border-border bg-background text-text flex h-14 w-14 items-center justify-center rounded-2xl border">
              <Headphones className="h-6 w-6" />
            </div>
            <h3 className="text-text mt-6 text-2xl font-semibold">
              Потрібна консультація?
            </h3>
            <p className="text-text-muted mt-4 text-sm leading-7">
              Підкажемо по адресі, тарифу, роутеру та самому підключенню. Без
              довгого очікування і без переадресацій між відділами.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="tel:+380000000000"
                className="border-border bg-background text-text hover:text-highlight flex items-center justify-between rounded-3xl border px-5 py-4 text-sm font-semibold transition"
              >
                <span className="flex items-center gap-3">
                  <PhoneCall className="h-4 w-4" />
                  Подзвонити менеджеру
                </span>
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@4seasons.net"
                className="border-border bg-background text-text hover:text-highlight flex items-center justify-between rounded-3xl border px-5 py-4 text-sm font-semibold transition"
              >
                <span className="flex items-center gap-3">
                  <Headphones className="h-4 w-4" />
                  Написати в підтримку
                </span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="border-border bg-background mt-8 rounded-3xl border p-5">
              <p className="text-text/75 tracking-widest uppercase">
                На зв&apos;язку
              </p>
              <p className="text-text-muted mt-3 text-sm leading-6">
                Щодня з 08:00 до 22:00. Відповідаємо живо, без ботів і без
                довгих черг.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
