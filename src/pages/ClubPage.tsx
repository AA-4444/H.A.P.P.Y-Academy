import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

type LeadFormData = {
  name: string;
  contact: string;
  comment: string;
};

const SUPPORT_HREF = "https://t.me/TataZakzheva/";

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
	if (!locked) return;

	const body = document.body;
	const html = document.documentElement;

	const prevBodyOverflow = body.style.overflow;
	const prevBodyPaddingRight = body.style.paddingRight;
	const prevHtmlOverflow = html.style.overflow;

	const scrollbarWidth = window.innerWidth - html.clientWidth;
	if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

	body.style.overflow = "hidden";
	html.style.overflow = "hidden";

	return () => {
	  body.style.overflow = prevBodyOverflow;
	  body.style.paddingRight = prevBodyPaddingRight;
	  html.style.overflow = prevHtmlOverflow;
	};
  }, [locked]);
}

function useCountdown(target: Date) {
  const [msLeft, setMsLeft] = useState(() =>
	Math.max(0, target.getTime() - Date.now())
  );

  useEffect(() => {
	const id = window.setInterval(() => {
	  setMsLeft(Math.max(0, target.getTime() - Date.now()));
	}, 1000);
	return () => window.clearInterval(id);
  }, [target]);

  const totalSec = Math.floor(msLeft / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  const pad2 = (n: number) => String(n).padStart(2, "0");
  return { msLeft, days, hours: pad2(hours), mins: pad2(mins), secs: pad2(secs) };
}

function LeadModal({
  open,
  onClose,
  offerId,
  offerTitle,
}: {
  open: boolean;
  onClose: () => void;
  offerId: string;
  offerTitle: string;
}) {
  useLockBodyScroll(open);

  const [data, setData] = useState<LeadFormData>({
	name: "",
	contact: "",
	comment: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
	if (!open) return;
	const onKey = (e: KeyboardEvent) => {
	  if (e.key === "Escape") onClose();
	};
	window.addEventListener("keydown", onKey);
	return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const resetAndClose = () => {
	setData({ name: "", contact: "", comment: "" });
	setSent(false);
	setSubmitting(false);
	onClose();
  };

  const submit = async (e: React.FormEvent) => {
	e.preventDefault();
	if (submitting) return;

	const nameOk = data.name.trim().length >= 2;
	const contactOk = data.contact.trim().length >= 5;
	if (!nameOk || !contactOk) return;

	setSubmitting(true);

	try {
	  const payload = {
		offerId,
		offerTitle,
		name: data.name.trim(),
		contact: data.contact.trim(),
		comment: [
		  "ЗАЯВКА НА КЛУБ 49€ (страница /club)",
		  data.comment.trim() ? `Комментарий: ${data.comment.trim()}` : "",
		]
		  .filter(Boolean)
		  .join("\n"),
		pageUrl: typeof window !== "undefined" ? window.location.href : "",
	  };

	  const res = await fetch("/api/leads", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	  });

	  if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`Lead API error: ${res.status} ${text}`);
	  }

	  const json = await res.json().catch(() => ({} as any));
	  if (json?.ok !== true) {
		throw new Error(`Lead API returned not ok: ${JSON.stringify(json)}`);
	  }

	  setSent(true);
	  setSubmitting(false);
	} catch (err) {
	  console.error(err);
	  alert("Ошибка отправки. Проверь /api/leads и попробуй ещё раз.");
	  setSubmitting(false);
	}
  };

  // ✅ safe top для iPhone (чтобы не резало скругления)
  const mobileSheetMaxH = "calc(100dvh - env(safe-area-inset-top) - 12px)";
  const mobileSheetTopGap = "calc(env(safe-area-inset-top) + 10px)";

  return (
	<AnimatePresence>
	  {open ? (
		<>
		  <motion.button
			type="button"
			aria-label="Закрыть"
			onClick={resetAndClose}
			className="fixed inset-0 z-[80] bg-black/55"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		  />

		  {/* ✅ MOBILE bottom sheet */}
		  <motion.div
			className="fixed inset-x-0 bottom-0 z-[90] sm:hidden"
			initial={{ y: 40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			exit={{ y: 40, opacity: 0 }}
			transition={{ duration: 0.22, ease: "easeOut" }}
		  >
			<div
			  className="mx-auto w-full max-w-[520px] rounded-t-[28px] bg-[#F6F1E7] shadow-2xl border border-black/10 overflow-hidden flex flex-col"
			  style={{
				paddingBottom: "max(16px, env(safe-area-inset-bottom))",
				maxHeight: mobileSheetMaxH,
				marginTop: mobileSheetTopGap,
			  }}
			>
			  <div className="px-4 pt-4 shrink-0">
				<div className="flex items-start justify-between gap-3">
				  <div className="min-w-0">
					<div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
					  Клуб «Архитектура Счастья»
					</div>
					<div className="mt-2 font-sans font-extrabold tracking-tight text-black text-[18px] leading-[1.15]">
					  Заявка на участие
					</div>
					<div className="mt-2 text-black/70 text-[13px] leading-snug">
					  Оставьте вашу заявку и вскоре мы свяжемся с вами
					</div>
				  </div>

				  <button
					type="button"
					onClick={resetAndClose}
					className="h-10 w-10 rounded-full bg-black/5 hover:bg-black/10 grid place-items-center shrink-0"
					aria-label="Закрыть"
				  >
					<X className="h-5 w-5 text-black/70" />
				  </button>
				</div>

				<div className="mt-4 h-px bg-black/10" />
			  </div>

			  <div className="px-4 py-4 overflow-auto min-h-0 flex-1">
				{sent ? (
				  <div className="rounded-2xl bg-white/70 border border-black/10 p-4">
					<div className="font-sans font-extrabold text-black text-[18px]">
					  Заявка отправлена ✅
					</div>
					<div className="mt-2 text-black/70 text-[13px] leading-relaxed">
					  Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
					</div>

					<Button
					  size="lg"
					  className="mt-4 w-full rounded-full h-12 font-semibold bg-yellow-400 text-black hover:bg-yellow-300"
					  onClick={resetAndClose}
					>
					  Закрыть
					</Button>
				  </div>
				) : (
				  <form onSubmit={submit} className="space-y-3">
					<div>
					  <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-black/55">
						Имя
					  </label>
					  <input
						value={data.name}
						onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
						className="mt-2 w-full h-12 rounded-2xl px-4 bg-white/70 border border-black/10 outline-none focus:ring-2 focus:ring-black/20"
						placeholder="Как к вам обращаться?"
						autoComplete="name"
					  />
					</div>

					<div>
					  <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-black/55">
						Телефон или Telegram
					  </label>
					  <input
						value={data.contact}
						onChange={(e) => setData((p) => ({ ...p, contact: e.target.value }))}
						className="mt-2 w-full h-12 rounded-2xl px-4 bg-white/70 border border-black/10 outline-none focus:ring-2 focus:ring-black/20"
						placeholder="+49… или @username"
						autoComplete="tel"
					  />
					</div>

					<div>
					  <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-black/55">
						Комментарий (необязательно)
					  </label>
					  <textarea
						value={data.comment}
						onChange={(e) => setData((p) => ({ ...p, comment: e.target.value }))}
						className="mt-2 w-full min-h-[110px] rounded-2xl p-4 bg-white/70 border border-black/10 outline-none focus:ring-2 focus:ring-black/20 resize-none"
						placeholder="Удобное время / вопрос / город…"
					  />
					</div>

					<Button
					  size="lg"
					  type="submit"
					  disabled={
						submitting ||
						data.name.trim().length < 2 ||
						data.contact.trim().length < 5
					  }
					  className="w-full rounded-full h-12 font-semibold bg-[#E64B1E] text-white hover:opacity-95 disabled:opacity-60"
					>
					  {submitting ? "Отправляем..." : "Оставить заявку"}
					</Button>

					<div className="text-[12px] text-black/55 leading-snug">
					  Нажимая «Оставить заявку», вы соглашаетесь на обработку данных для связи с вами.
					</div>
				  </form>
				)}
			  </div>

			  <div className="px-4 pb-4 shrink-0">
				<a href={SUPPORT_HREF} target="_blank" rel="noreferrer" className="block w-full">
				  <Button
					size="lg"
					className="w-full rounded-full h-12 font-semibold bg-white/70 text-black border border-black/10 hover:bg-white"
				  >
					Возникли вопросы <ArrowRight className="ml-2 h-5 w-5" />
				  </Button>
				</a>
			  </div>
			</div>
		  </motion.div>

		  {/* ✅ DESKTOP centered modal */}
		  <motion.div
			className="fixed inset-0 z-[90] hidden sm:flex items-center justify-center p-6"
			initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
			animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
			transition={{ duration: 0.2, ease: "easeOut" }}
		  >
			<div className="w-full max-w-[680px] rounded-[28px] bg-[#F6F1E7] border border-black/10 shadow-2xl overflow-hidden">
			  <div className="px-6 pt-6">
				<div className="flex items-start justify-between gap-4">
				  <div className="min-w-0">
					<div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
					  Клуб «Архитектура Счастья»
					</div>
					<div className="mt-2 font-sans font-extrabold tracking-tight text-black text-[22px] leading-[1.15]">
					  Заявка на участие
					</div>
					<div className="mt-2 text-black/70 text-[14px] leading-relaxed">
					  Оставьте вашу заявку и вскоре мы свяжемся с вами
					</div>
				  </div>

				  <button
					type="button"
					onClick={resetAndClose}
					className="h-10 w-10 rounded-full bg-black/5 hover:bg-black/10 grid place-items-center shrink-0"
					aria-label="Закрыть"
				  >
					<X className="h-5 w-5 text-black/70" />
				  </button>
				</div>

				<div className="mt-5 h-px bg-black/10" />
			  </div>

			  <div className="px-6 py-6">
				{sent ? (
				  <div className="rounded-2xl bg-white/70 border border-black/10 p-5">
					<div className="font-sans font-extrabold text-black text-[20px]">
					  Заявка отправлена ✅
					</div>
					<div className="mt-2 text-black/70 text-sm leading-relaxed">
					  Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
					</div>

					<div className="mt-4 grid gap-3">
					  <Button
						size="lg"
						className="w-full rounded-full h-12 font-semibold bg-yellow-400 text-black hover:bg-yellow-300"
						onClick={resetAndClose}
					  >
						Закрыть
					  </Button>

					  <a href={SUPPORT_HREF} target="_blank" rel="noreferrer" className="w-full">
						<Button
						  size="lg"
						  className="w-full rounded-full h-12 font-semibold bg-white/70 text-black border border-black/10 hover:bg-white"
						>
						  Возникли вопросы <ArrowRight className="ml-2 h-5 w-5" />
						</Button>
					  </a>
					</div>
				  </div>
				) : (
				  <form onSubmit={submit} className="space-y-3">
					<div>
					  <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-black/55">
						Имя
					  </label>
					  <input
						value={data.name}
						onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
						className="mt-2 w-full h-12 rounded-2xl px-4 bg-white/70 border border-black/10 outline-none focus:ring-2 focus:ring-black/20"
						placeholder="Как к вам обращаться?"
						autoComplete="name"
					  />
					</div>

					<div>
					  <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-black/55">
						Телефон или Telegram
					  </label>
					  <input
						value={data.contact}
						onChange={(e) => setData((p) => ({ ...p, contact: e.target.value }))}
						className="mt-2 w-full h-12 rounded-2xl px-4 bg-white/70 border border-black/10 outline-none focus:ring-2 focus:ring-black/20"
						placeholder="+49… или @username"
						autoComplete="tel"
					  />
					</div>

					<div>
					  <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-black/55">
						Комментарий (необязательно)
					  </label>
					  <textarea
						value={data.comment}
						onChange={(e) => setData((p) => ({ ...p, comment: e.target.value }))}
						className="mt-2 w-full min-h-[110px] rounded-2xl p-4 bg-white/70 border border-black/10 outline-none focus:ring-2 focus:ring-black/20 resize-none"
						placeholder="Удобное время / вопрос / город…"
					  />
					</div>

					<Button
					  size="lg"
					  type="submit"
					  disabled={
						submitting ||
						data.name.trim().length < 2 ||
						data.contact.trim().length < 5
					  }
					  className="w-full rounded-full h-12 font-semibold bg-[#E64B1E] text-white hover:opacity-95 disabled:opacity-60"
					>
					  {submitting ? "Отправляем..." : "Оставить заявку"}
					</Button>

					<div className="text-[12px] text-black/55 leading-snug">
					  Нажимая «Оставить заявку», вы соглашаетесь на обработку данных для связи с вами.
					</div>
				  </form>
				)}
			  </div>
			</div>
		  </motion.div>
		</>
	  ) : null}
	</AnimatePresence>
  );
}

export default function ClubPage() {
  // ✅ как в Programs: 18 февраля 2026
  const salesOpenDate = useMemo(() => new Date(2026, 1, 18, 0, 0, 0), []);
  const cd = useCountdown(salesOpenDate);

  const [leadOpen, setLeadOpen] = useState(false);

  const ctaNote =
	cd.msLeft > 0 ? `${cd.days}д ${cd.hours}:${cd.mins}:${cd.secs}` : "Продажи открыты";

  const offerId = "club";
  const offerTitle = "Клуб «Архитектура Счастья» (49€/мес)";

  return (
	<div className="min-h-screen bg-[#F6F1E7] flex flex-col">
	  <Header />

	  <main className="flex-1 pt-[88px] sm:pt-[96px]">
		<section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-10 sm:py-14">
		  <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-black/10 shadow-xl overflow-hidden">
			<div className="p-6 sm:p-10">
			  <div className="inline-flex items-center gap-2 text-[10px] sm:text-[12px] font-semibold tracking-[0.2em] text-black/45 uppercase">
				<span className="w-2 h-2 rounded-full bg-[#E64B1E]" />
				Клуб
			  </div>

			  <h1 className="mt-4 font-sans font-extrabold tracking-tight text-black text-3xl sm:text-5xl lg:text-6xl leading-[1.05]">
				Клуб «Архитектура Счастья»
			  </h1>

			  <p className="mt-4 text-black/70 text-base sm:text-lg leading-relaxed max-w-[80ch]">
				Полный проект вашего внутреннего дома. Система из 10 ключевых элементов,
				видео-уроки, еженедельные встречи и поддержка кураторов.
			  </p>

			  {/* ✅ таймер как в Programs */}
			  <div className="mt-6 rounded-2xl bg-[#F6F1E7] border border-black/10 p-4 sm:p-5">
				<div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-black/55 text-center">
				  Открытие продаж через
				</div>
				<div className="mt-1 font-black text-red-600 text-[22px] sm:text-3xl leading-none text-center">
				  {ctaNote}
				</div>
			  </div>

			  <div className="mt-7 flex flex-wrap items-end gap-3">
				<div className="text-black/60 text-xs uppercase tracking-[0.18em] font-semibold">
				  Цена
				</div>
				<div className="text-black font-black text-4xl sm:text-5xl leading-none whitespace-nowrap">
				  49 €
				  <span className="ml-2 text-black/60 text-base sm:text-lg font-semibold whitespace-nowrap">
					/ М
				  </span>
				</div>
			  </div>

			  <div className="mt-7 grid lg:grid-cols-2 gap-6">
				<div className="rounded-2xl bg-[#F6F1E7] border border-black/10 p-5">
				  <div className="text-xs uppercase tracking-[0.18em] font-semibold text-black/55">
					Что внутри
				  </div>
				  <ul className="mt-4 space-y-3 text-black/70">
					<li>— Видео-уроки и тренинги</li>
					<li>— Полная система 10 элементов</li>
					<li>— Еженедельные онлайн-встречи с Ицхаком</li>
					<li>— Личный саппорт кураторов</li>
					<li>— Сообщество людей, строящих осознанную жизнь</li>
				  </ul>
				</div>

				<div className="rounded-2xl bg-[#F6F1E7] border border-black/10 p-5">
				  <div className="text-xs uppercase tracking-[0.18em] font-semibold text-black/55">
					Результат
				  </div>
				  <ul className="mt-4 space-y-2 text-black/70">
					<li>— достигаются цели</li>
					<li>— выстраиваются отношения</li>
					<li>— живётся без внутреннего шума</li>
					<li>— появляется устойчивость и ясность</li>
				  </ul>

				  <div className="mt-6 grid gap-3">
					<Button
					  size="lg"
					  className="w-full rounded-full h-12 font-semibold bg-[#E64B1E] text-white hover:opacity-95"
					  onClick={() => setLeadOpen(true)}
					>
					  Оставить заявку <ArrowRight className="ml-2 h-5 w-5" />
					</Button>

					<a href={SUPPORT_HREF} target="_blank" rel="noreferrer" className="w-full">
					  <Button
						size="lg"
						className="w-full rounded-full h-12 font-semibold bg-white/70 text-black border border-black/10 hover:bg-white"
					  >
						Возникли вопросы <ArrowRight className="ml-2 h-5 w-5" />
					  </Button>
					</a>
				  </div>
				</div>
			  </div>
			</div>
		  </div>

		  <LeadModal
			open={leadOpen}
			onClose={() => setLeadOpen(false)}
			offerId={offerId}
			offerTitle={offerTitle}
		  />
		</section>
	  </main>

	  <Footer />
	</div>
  );
}