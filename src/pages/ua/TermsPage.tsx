import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export default function TermsPage() {
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
                Умови використання
              </h1>

              <p className="mt-4 text-black/70 text-base sm:text-lg leading-relaxed">
                Використовуючи сайт і залишаючи заявки, ви погоджуєтеся з умовами нижче.
              </p>

              <div className="mt-8 space-y-6 text-black/70 leading-relaxed">
                <section>
                  <h2 className="text-black font-bold text-lg">1. Загальні положення</h2>
                  <p className="mt-2">
                    Сайт надає інформацію про програми та можливість залишити заявку/відгук.
                    Ми можемо оновлювати вміст і функціональність без попереднього повідомлення.
                  </p>
                </section>

                <section>
                  <h2 className="text-black font-bold text-lg">2. Заявки та комунікація</h2>
                  <p className="mt-2">
                    Залишаючи контакти, ви підтверджуєте, що дані коректні, і погоджуєтеся, що ми можемо зв’язатися
                    з вами за вказаними каналами.
                  </p>
                </section>

                <section>
                  <h2 className="text-black font-bold text-lg">3. Інтелектуальна власність</h2>
                  <p className="mt-2">
                    Усі матеріали сайту (тексти, дизайн, структура) захищені. Копіювання та поширення без дозволу
                    заборонено.
                  </p>
                </section>

                <section>
                  <h2 className="text-black font-bold text-lg">4. Обмеження відповідальності</h2>
                  <p className="mt-2">
                    Ми намагаємося підтримувати актуальність інформації, але не гарантуємо відсутність помилок.
                    Використання матеріалів здійснюється на ваш ризик.
                  </p>
                </section>

                <section>
                  <h2 className="text-black font-bold text-lg">5. Зміна умов</h2>
                  <p className="mt-2">
                    Ми можемо оновлювати ці умови. Актуальна версія завжди доступна на цій сторінці.
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