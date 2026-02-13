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
				документы
			  </div>

			  <h1 className="mt-3 font-sans font-extrabold tracking-tight text-black text-3xl sm:text-5xl leading-[1.05]">
				Условия использования
			  </h1>

			  <p className="mt-4 text-black/70 text-base sm:text-lg leading-relaxed">
				Используя сайт и оставляя заявки, вы соглашаетесь с условиями ниже.
			  </p>

			  <div className="mt-8 space-y-6 text-black/70 leading-relaxed">
				<section>
				  <h2 className="text-black font-bold text-lg">1. Общие положения</h2>
				  <p className="mt-2">
					Сайт предоставляет информацию о программах и возможность оставить заявку/отзыв.
					Мы можем обновлять содержимое и функциональность без предварительного уведомления.
				  </p>
				</section>

				<section>
				  <h2 className="text-black font-bold text-lg">2. Заявки и коммуникация</h2>
				  <p className="mt-2">
					Оставляя контакты, вы подтверждаете, что данные корректны, и соглашаетесь, что мы можем связаться
					с вами по указанным каналам.
				  </p>
				</section>

				<section>
				  <h2 className="text-black font-bold text-lg">3. Интеллектуальная собственность</h2>
				  <p className="mt-2">
					Все материалы сайта (тексты, дизайн, структура) защищены. Копирование и распространение без разрешения
					запрещено.
				  </p>
				</section>

				<section>
				  <h2 className="text-black font-bold text-lg">4. Ограничение ответственности</h2>
				  <p className="mt-2">
					Мы стараемся поддерживать актуальность информации, но не гарантируем отсутствие ошибок.
					Использование материалов осуществляется на ваш риск.
				  </p>
				</section>

				<section>
				  <h2 className="text-black font-bold text-lg">5. Изменение условий</h2>
				  <p className="mt-2">
					Мы можем обновлять эти условия. Актуальная версия всегда доступна на этой странице.
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