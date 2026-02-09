import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

export default function PathMorePage() {
  return (
	<div className="min-h-screen bg-[#F6F1E7] flex flex-col">
	  <Header />

	  <main className="flex-1">
		<section className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
		  <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-black/10 shadow-xl overflow-hidden">
			<div className="p-6 sm:p-10">
			  <div className="text-[10px] sm:text-[12px] uppercase tracking-[0.2em] text-black/45 font-semibold">
				Узнать больше
			  </div>

			  <h1 className="mt-3 font-sans font-extrabold tracking-tight text-black text-2xl sm:text-4xl leading-[1.12]">
				3 первых шага к мастерству.
				<br />
				Три элемента счастья
			  </h1>

			  <div className="mt-6 text-black/70 text-[14px] sm:text-[16px] leading-relaxed whitespace-pre-line">
				{`Этот 3-дневный курс - практическое введение в систему «Архитектура Счастья».
Он создан для людей, которые устали искать мотивацию, вдохновение или «правильное состояние» - и хотят понять, как реально управлять своим внутренним состоянием в повседневной жизни.

Здесь нет абстрактной философии, эзотерики или эмоциональных качелей.
Курс построен как рабочая модель: ты получаешь понятные объяснения, выполняешь простые, но точные практики — и наблюдаешь изменения в ощущении себя, уровне энергии и ясности мышления.
Без мотивационных лозунгов — только работающие практики, которые переключают мозг из режима дефицита в состояние энергии, ясности и внутренней опоры.
Если пройти курс честно — первые изменения ощущаются уже на 3-й день.`}
			  </div>

			  <div className="mt-8 flex flex-col sm:flex-row gap-3">
				<Link to="/#programs" className="w-full sm:w-auto">
				  <Button
					size="lg"
					className="w-full sm:w-auto rounded-full h-12 px-6 font-semibold bg-yellow-400 text-black hover:bg-yellow-300"
				  >
					Вернуться к программам
				  </Button>
				</Link>

				<Link to="/" className="w-full sm:w-auto">
				  <Button
					size="lg"
					variant="outline"
					className="w-full sm:w-auto rounded-full h-12 px-6 font-semibold border-black/15"
				  >
					На главную
				  </Button>
				</Link>
			  </div>

			  <div className="mt-6 text-[12px] text-black/50 leading-snug">
				Подсказка: если хочешь, я добавлю сюда кнопку “Перейти к оплате 1€” и
				сразу открою твою форму/Stripe.
			  </div>
			</div>
		  </div>
		</section>
	  </main>

	  <Footer />
	</div>
  );
}