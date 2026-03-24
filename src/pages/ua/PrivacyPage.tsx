import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F6F1E7] flex flex-col">
      <Header />

      <main className="flex-1 pt-[88px] sm:pt-[96px]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
          <div className="rounded-[28px] sm:rounded-[32px] bg-white border border-black/10 shadow-[0_20px_70px_rgba(0,0,0,0.15)] overflow-hidden">
            <div className="p-6 sm:p-10">
              <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
                документи
              </div>

              <h1 className="mt-3 font-sans font-extrabold tracking-tight text-black text-3xl sm:text-5xl leading-[1.05]">
                Політика конфіденційності
              </h1>

              <p className="mt-4 text-black/70 text-base sm:text-lg leading-relaxed">
                Ми дбайливо ставимося до ваших даних і використовуємо їх лише для зв’язку з вами та покращення сервісу.
              </p>

              <div className="mt-8 space-y-6 text-black/70 leading-relaxed">
                <section>
                  <h2 className="text-black font-bold text-lg">1. Які дані ми збираємо</h2>
                  <p className="mt-2">
                    Ми можемо збирати дані, які ви добровільно залишаєте у формах: ім’я, контакт (телефон/Telegram),
                    коментар, а також технічну інформацію (сторінка, з якої надіслано заявку).
                  </p>
                </section>

                <section>
                  <h2 className="text-black font-bold text-lg">2. Навіщо ми використовуємо дані</h2>
                  <p className="mt-2">
                    Дані використовуються, щоб обробити вашу заявку/відгук, зв’язатися з вами, надіслати деталі програми
                    та покращувати якість підтримки.
                  </p>
                </section>

                <section>
                  <h2 className="text-black font-bold text-lg">3. Кому ми передаємо дані</h2>
                  <p className="mt-2">
                    Ми не продаємо і не передаємо ваші дані третім особам, окрім випадків, коли це необхідно для роботи
                    сервісу (наприклад, надсилання заявки в наш Telegram для обробки).
                  </p>
                </section>

                <section>
                  <h2 className="text-black font-bold text-lg">4. Строк зберігання</h2>
                  <p className="mt-2">
                    Ми зберігаємо дані стільки, скільки необхідно для обробки заявки та комунікації, або поки ви не
                    попросите видалити ваші дані.
                  </p>
                </section>

                <section>
                  <h2 className="text-black font-bold text-lg">5. Ваші права</h2>
                  <p className="mt-2">
                    Ви можете запросити доступ/виправлення/видалення даних. Для цього напишіть нам у підтримку.
                  </p>
                </section>

                <section>
                  <h2 className="text-black font-bold text-lg">6. Контакти</h2>
                  <p className="mt-2">
                    З питань конфіденційності — напишіть у підтримку через Telegram: <b>@happiness_support</b>.
                  </p>
                </section>

                <div className="pt-2 text-xs text-black/45">
                  Дата оновлення: 12.02.2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}