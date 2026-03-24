import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export default function RefundPage() {
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
                Повернення та скасування
              </h1>

              <p className="mt-4 text-black/70 text-base sm:text-lg leading-relaxed">
                Нижче описані правила повернення/скасування. Якщо у вас є запитання — напишіть у підтримку.
              </p>

              <div className="mt-8 space-y-6 text-black/70 leading-relaxed">
                <section>
                  <h2 className="text-black font-bold text-lg">1. Коли можливе повернення</h2>
                  <p className="mt-2">
                    Повернення розглядається індивідуально залежно від продукту та факту надання доступу/послуг.
                  </p>
                </section>

                <section>
                  <h2 className="text-black font-bold text-lg">2. Як оформити запит</h2>
                  <p className="mt-2">
                    Напишіть у підтримку та вкажіть: ім’я, контакт, дату оплати, продукт і причину звернення.
                    Ми відповімо та підкажемо наступні кроки.
                  </p>
                </section>

                <section>
                  <h2 className="text-black font-bold text-lg">3. Строки розгляду</h2>
                  <p className="mt-2">
                    Зазвичай ми відповідаємо протягом 1–3 робочих днів. Строк повернення залежить від платіжної системи.
                  </p>
                </section>

                <section>
                  <h2 className="text-black font-bold text-lg">
                    4. Контакти підтримки
                  </h2>
                  <p className="mt-2">
                    Telegram:{" "}
                    <a
                      href="https://t.me/TataZakzheva"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#E64B1E] hover:underline"
                    >
                      @TataZakzheva
                    </a>
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