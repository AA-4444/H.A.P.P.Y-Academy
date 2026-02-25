// AmbassadorSuccess.tsx
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AmbassadorSuccess() {
  const supportHref = "https://t.me/TataZakzheva/";

  const search =
	typeof window !== "undefined"
	  ? new URLSearchParams(window.location.search)
	  : null;

  const sessionId = search ? search.get("session_id") : null;
  const leadId = search ? search.get("leadId") : null;

  const nowText =
	typeof window !== "undefined" ? new Date().toLocaleString("ru-RU") : "";

  const badgeText = useMemo(() => {
	return "Вклад принят ❤️";
  }, []);

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
		  <div className="rounded-[32px] border border-black/10 bg-white shadow-2xl overflow-hidden">
			<div className="p-6 sm:p-8">
			  
			  {/* Icon */}
			  <div className="flex justify-center">
				<div className="h-16 w-16 rounded-full bg-[#FFF3E8] border border-black/10 grid place-items-center">
				  <Heart
					className="h-8 w-8 text-[#E64B1E]"
					strokeWidth={2.5}
					fill="currentColor"
				  />
				</div>
			  </div>

			  {/* Title */}
			  <h1 className="mt-5 text-center font-sans font-extrabold tracking-tight text-black text-[22px] sm:text-[26px] leading-[1.15]">
				Спасибо за ваш вклад
			  </h1>

			  <p className="mt-3 text-center text-black/65 text-[14px] leading-relaxed">
				Вы стали <span className="font-semibold">Амбассадором счастья</span>.
				<br />
				Ваш донат создаёт возможность восстановления
				для людей, переживающих кризис.
			  </p>

			  <div className="mt-6 h-px bg-black/10" />

			  {/* Info blocks */}
			  <div className="mt-5 grid gap-3">

				<div className="rounded-2xl bg-[#F6F1E7] border border-black/10 p-4">
				  <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
					Transaction (Stripe session)
				  </div>
				  <div className="mt-2 font-mono text-[12px] text-black/75 break-all">
					{sessionId || "—"}
				  </div>
				</div>

				<div className="rounded-2xl bg-[#F6F1E7] border border-black/10 p-4">
				  <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
					Lead ID
				  </div>
				  <div className="mt-2 font-mono text-[12px] text-black/75 break-all">
					{leadId || "—"}
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

				<div className="rounded-2xl bg-[#FFF3E8] border border-[#E64B1E]/30 p-4">
				  <div className="flex items-center justify-between gap-3">
					<div className="text-[10px] uppercase tracking-[0.18em] text-[#E64B1E] font-semibold">
					  Status
					</div>
					<div className="font-sans font-extrabold text-[#E64B1E] text-[14px]">
					  {badgeText}
					</div>
				  </div>
				</div>

			  </div>

			  {/* Message block */}
			  <div className="mt-6 rounded-2xl bg-[#FFF3E8] border border-[#E64B1E]/20 p-4 text-[13px] text-black/70 leading-relaxed">
				Люди, которые поддерживают других,
				усиливают собственное ощущение смысла,
				влияния и внутреннего достоинства.
				<br />
				<span className="font-semibold">
				  Счастье углубляется, когда им делятся.
				</span>
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

				<a
				  href={supportHref}
				  target="_blank"
				  rel="noreferrer"
				  className="w-full"
				>
				  <Button
					size="lg"
					className="w-full rounded-full h-12 font-semibold bg-[#E64B1E] text-white hover:opacity-95"
				  >
					Связаться с нами <ArrowRight className="ml-2 h-5 w-5" />
				  </Button>
				</a>

			  </div>

			  <div className="mt-6 text-center text-[12px] text-black/50 leading-snug">
				Подтверждение оплаты обрабатывается на сервере через Stripe webhook.
				Если что-то пошло не так — напишите нам.
			  </div>

			</div>
		  </div>
		</motion.div>
	  </div>
	</section>
  );
}