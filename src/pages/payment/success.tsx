import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  const supportHref = "https://t.me/TataZakzheva/";

  const sessionId =
	typeof window !== "undefined"
	  ? new URLSearchParams(window.location.search).get("session_id")
	  : null;

  const nowText =
	typeof window !== "undefined" ? new Date().toLocaleString("ru-RU") : "";

  return (
	<section
	  className="min-h-screen bg-[#F6F1E7]"
	  style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
	>
	  <div className="min-h-screen flex items-center justify-center px-4 py-10">
		<motion.div
		  initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
		  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
		  transition={{ duration: 0.5, ease: "easeOut" }}
		  className="w-full max-w-[520px]"
		>
		  {/* ONE card only */}
		  <div className="rounded-[32px] border border-black/10 bg-white shadow-2xl overflow-hidden">
			<div className="p-6 sm:p-8">
			  {/* Big check in circle */}
			  <div className="flex justify-center">
				<div className="h-16 w-16 rounded-full bg-[#EAF7EF] border border-black/10 grid place-items-center">
				  <Check className="h-8 w-8 text-[#16A34A]" strokeWidth={3} />
				</div>
			  </div>

			  <h1 className="mt-5 text-center font-sans font-extrabold tracking-tight text-black text-[22px] sm:text-[26px] leading-[1.15]">
				Оплата прошла успешно
			  </h1>

			  <p className="mt-2 text-center text-black/65 text-[13px] sm:text-[14px] leading-relaxed">
				Скоро с вами свяжется менеджер.
				<br className="hidden sm:block" />
				Если остались вопросы — напишите нам.
			  </p>

			  <div className="mt-6 h-px bg-black/10" />

			  {/* Info blocks like receipt but in your style */}
			  <div className="mt-5 grid gap-3">
				<div className="rounded-2xl bg-[#F6F1E7] border border-black/10 p-4">
				  <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
					Transaction
				  </div>
				  <div className="mt-2 font-mono text-[12px] text-black/75 break-all">
					{sessionId || "—"}
				  </div>
				</div>

				<div className="rounded-2xl bg-[#F6F1E7] border border-black/10 p-4">
				  <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
					Date & time
				  </div>
				  <div className="mt-2 text-[13px] text-black/75">
					{nowText || "—"}
				  </div>
				</div>

				<div className="rounded-2xl bg-[#F6F1E7] border border-black/10 p-4">
				  <div className="flex items-center justify-between gap-3">
					<div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
					  Total
					</div>
					<div className="font-sans font-extrabold text-black text-[16px]">
					  Успешно 
					</div>
				  </div>
				</div>
			  </div>

			  <div className="mt-6">
				<div className="text-[12px] font-semibold text-black/60">
				  Summary
				</div>
				<div className="mt-3 space-y-2">
				  <div className="flex items-center justify-between text-[13px] text-black/70">
					<span>Связь с менеджером</span>
					<span className="text-black/50">в ближайшее время</span>
				  </div>
				  <div className="flex items-center justify-between text-[13px] text-black/70">
					<span>Доступ / детали</span>
					<span className="text-black/50">после подтверждения</span>
				  </div>
				</div>
			  </div>

			  {/* Buttons */}
			  <div className="mt-8 grid gap-3">
				<Link to="/#programs" className="w-full">
				  <Button
					size="lg"
					className="w-full rounded-full h-12 font-semibold bg-yellow-400 text-black hover:bg-yellow-300"
				  >
					Вернуться на сайт
				  </Button>
				</Link>

				<a href={supportHref} target="_blank" rel="noreferrer" className="w-full">
				  <Button
					size="lg"
					className="w-full rounded-full h-12 font-semibold bg-[#E64B1E] text-white hover:opacity-95"
				  >
					Написать <ArrowRight className="ml-2 h-5 w-5" />
				  </Button>
				</a>
			  </div>

			  <div className="mt-6 text-center text-[12px] text-black/50 leading-snug">
				Если окно оплаты закрылось — мы получили ваш платёж.
			  </div>
			</div>
		  </div>
		</motion.div>
	  </div>
	</section>
  );
}