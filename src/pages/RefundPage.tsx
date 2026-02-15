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
				документы
			  </div>

			  <h1 className="mt-3 font-sans font-extrabold tracking-tight text-black text-3xl sm:text-5xl leading-[1.05]">
				Возврат и отмена
			  </h1>

			  <p className="mt-4 text-black/70 text-base sm:text-lg leading-relaxed">
				Ниже описаны правила возврата/отмены. Если у вас вопрос — напишите в поддержку.
			  </p>

			  <div className="mt-8 space-y-6 text-black/70 leading-relaxed">
				<section>
				  <h2 className="text-black font-bold text-lg">1. Когда возможен возврат</h2>
				  <p className="mt-2">
					Возврат рассматривается индивидуально в зависимости от продукта и факта предоставления доступа/услуг.
				  </p>
				</section>

				<section>
				  <h2 className="text-black font-bold text-lg">2. Как оформить запрос</h2>
				  <p className="mt-2">
					Напишите в поддержку и укажите: имя, контакт, дату оплаты, продукт и причину обращения.
					Мы ответим и подскажем следующие шаги.
				  </p>
				</section>

				<section>
				  <h2 className="text-black font-bold text-lg">3. Сроки рассмотрения</h2>
				  <p className="mt-2">
					Обычно мы отвечаем в течение 1–3 рабочих дней. Срок возврата зависит от платёжной системы.
				  </p>
				</section>

				<section>
				  <h2 className="text-black font-bold text-lg">
					4. Контакты поддержки
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
				  Дата обновления: 12.02.2026
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