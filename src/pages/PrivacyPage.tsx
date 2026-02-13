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
				документы
			  </div>

			  <h1 className="mt-3 font-sans font-extrabold tracking-tight text-black text-3xl sm:text-5xl leading-[1.05]">
				Политика конфиденциальности
			  </h1>

			  <p className="mt-4 text-black/70 text-base sm:text-lg leading-relaxed">
				Мы бережно относимся к вашим данным и используем их только для связи с вами и улучшения сервиса.
			  </p>

			  <div className="mt-8 space-y-6 text-black/70 leading-relaxed">
				<section>
				  <h2 className="text-black font-bold text-lg">1. Какие данные мы собираем</h2>
				  <p className="mt-2">
					Мы можем собирать данные, которые вы добровольно оставляете в формах: имя, контакт (телефон/Telegram),
					комментарий, а также техническую информацию (страница, с которой отправлена заявка).
				  </p>
				</section>

				<section>
				  <h2 className="text-black font-bold text-lg">2. Зачем мы используем данные</h2>
				  <p className="mt-2">
					Данные используются, чтобы обработать вашу заявку/отзыв, связаться с вами, отправить детали программы
					и улучшать качество поддержки.
				  </p>
				</section>

				<section>
				  <h2 className="text-black font-bold text-lg">3. Кому мы передаём данные</h2>
				  <p className="mt-2">
					Мы не продаём и не передаём ваши данные третьим лицам, кроме случаев, когда это необходимо для работы
					сервиса (например, отправка заявки в наш Telegram для обработки).
				  </p>
				</section>

				<section>
				  <h2 className="text-black font-bold text-lg">4. Срок хранения</h2>
				  <p className="mt-2">
					Мы храним данные столько, сколько необходимо для обработки заявки и коммуникации, либо пока вы не
					попросите удалить ваши данные.
				  </p>
				</section>

				<section>
				  <h2 className="text-black font-bold text-lg">5. Ваши права</h2>
				  <p className="mt-2">
					Вы можете запросить доступ/исправление/удаление данных. Для этого напишите нам в поддержку.
				  </p>
				</section>

				<section>
				  <h2 className="text-black font-bold text-lg">6. Контакты</h2>
				  <p className="mt-2">
					По вопросам конфиденциальности — напишите в поддержку через Telegram: <b>@happiness_support</b>.
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