import { useMemo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
	fbq?: (...args: any[]) => void;
  }
}

export default function PaymentSuccess() {
  const supportHref = "https://t.me/TataZakzheva/";
  const systemBotHref = "https://t.me/happi_10_bot";

  const search =
	typeof window !== "undefined"
	  ? new URLSearchParams(window.location.search)
	  : null;

  const sessionId = search ? search.get("session_id") : null;
  const offerId = search ? search.get("offerId") : null;
  const leadId = search ? search.get("leadId") : null;

  // preview params (для клиента)
  const preview = search ? search.get("preview") : null; // "1"
  const token = search ? search.get("token") : null;
  const previewValue = search ? search.get("value") : null; // "49"
  const previewCurrency = search ? search.get("currency") : null; // "EUR"

  // Vite env in Vercel: VITE_SUCCESS_PREVIEW_TOKEN
  const PREVIEW_TOKEN = import.meta.env.VITE_SUCCESS_PREVIEW_TOKEN || "";

  const isPreviewAllowed = preview === "1" && !!token && token === PREVIEW_TOKEN;

  // IMPORTANT: in preview we do NOT allow offerId-driven product UI
  const effectiveOfferId = isPreviewAllowed ? "preview" : offerId;
  const isSystem = effectiveOfferId === "system";

  const nowText =
	typeof window !== "undefined" ? new Date().toLocaleString("ru-RU") : "";

  const badgeText = useMemo(() => {
	return "Оплачено (подтверждение на сервере)";
  }, []);

  const pixelFired = useRef(false);
  const [orderValue, setOrderValue] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string>("EUR");
  const [paidOk, setPaidOk] = useState<boolean>(false);

  // Persist "sent once" across refresh for this session
  const firedKey = sessionId
	? `fbq_purchase_fired_${sessionId}`
	: isPreviewAllowed
	? `fbq_purchase_fired_preview_${token ?? "1"}`
	: null;

  // ===============================
  // 1) REAL MODE (по session_id) — строго после оплаты
  // ===============================
  useEffect(() => {
	if (!sessionId) return;
	let cancelled = false;

	const loadSession = async () => {
	  try {
		// if already fired for this sessionId — do nothing (even after refresh)
		if (firedKey && sessionStorage.getItem(firedKey) === "1") {
		  pixelFired.current = true;
		}

		const res = await fetch(
		  `/api/stripe/session?session_id=${encodeURIComponent(sessionId)}`
		);
		if (!res.ok) return;

		const data = await res.json();

		if (cancelled) return;
		if (data.payment_status !== "paid") return;

		const value = data.amount ? data.amount / 100 : 0;
		const cur = (data.currency || "EUR").toUpperCase();

		setOrderValue(value);
		setCurrency(cur);
		setPaidOk(true);

		// fire fbq only once
		if (!pixelFired.current && typeof window !== "undefined" && window.fbq) {
		  window.fbq("track", "Purchase", {
			value,
			currency: cur,
		  });
		  pixelFired.current = true;
		  if (firedKey) sessionStorage.setItem(firedKey, "1");
		}
	  } catch (err) {
		console.error("Meta pixel / session load error:", err);
	  }
	};

	loadSession();
	return () => {
	  cancelled = true;
	};
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // ===============================
  // 2) PREVIEW MODE (для клиента) — без session_id, но только по секретному token
  // ===============================
  useEffect(() => {
	if (sessionId) return; // если есть sessionId — preview не нужен
	if (!isPreviewAllowed) return;

	try {
	  // if already fired in this preview — do nothing (even after refresh)
	  if (firedKey && sessionStorage.getItem(firedKey) === "1") {
		pixelFired.current = true;
	  }
	  if (pixelFired.current) return;

	  const v = Number(String(previewValue ?? "49").replace(",", "."));
	  const cur = String(previewCurrency ?? "EUR").toUpperCase();
	  const safeValue = Number.isFinite(v) && v > 0 ? v : 49;

	  setOrderValue(safeValue);
	  setCurrency(cur);
	  setPaidOk(true); // в preview считаем “ok”, чтобы страница отображалась

	  if (typeof window !== "undefined" && window.fbq) {
		window.fbq("track", "Purchase", {
		  value: safeValue,
		  currency: cur,
		});
		pixelFired.current = true;
		if (firedKey) sessionStorage.setItem(firedKey, "1");
	  }
	} catch (e) {
	  console.error("Meta pixel preview error:", e);
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, isPreviewAllowed, previewValue, previewCurrency, token]);

  // ===============================
  // Защита: если не paid и не preview — показываем “проверяем оплату”
  // ===============================
  const canShow = paidOk || isPreviewAllowed;

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
			  <div className="flex justify-center">
				<div className="h-16 w-16 rounded-full bg-[#EAF7EF] border border-black/10 grid place-items-center">
				  <Check className="h-8 w-8 text-[#16A34A]" strokeWidth={3} />
				</div>
			  </div>

			  <h1 className="mt-5 text-center font-sans font-extrabold tracking-tight text-black text-[22px] sm:text-[26px] leading-[1.15]">
				Оплата прошла успешно
			  </h1>

			  {!canShow ? (
				<p className="mt-3 text-center text-black/65 text-[13px] sm:text-[14px] leading-relaxed">
				  Проверяем оплату… Если вы открыли страницу вручную — она доступна
				  только после оплаты.
				</p>
			  ) : (
				<>
				  <p className="mt-2 text-center text-black/65 text-[13px] sm:text-[14px] leading-relaxed">
					{isSystem
					  ? "Вы успешно оплатили курс «Архитектура счастья»."
					  : "Спасибо за оплату."}
				  </p>

				  {isSystem && (
					<p className="mt-2 text-center text-black/60 text-[13px] leading-relaxed">
					  Чтобы получить доступ к материалам, перейдите в Telegram-бота
					  курса.
					</p>
				  )}

				  <div className="mt-6 h-px bg-black/10" />

				  <div className="mt-5 grid gap-3">
					<div className="rounded-2xl bg-[#F6F1E7] border border-black/10 p-4">
					  <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
						Stripe session
					  </div>
					  <div className="mt-2 font-mono text-[12px] text-black/75 break-all">
						{sessionId || (isPreviewAllowed ? "PREVIEW" : "—")}
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
						Date &amp; time
					  </div>
					  <div className="mt-2 text-[13px] text-black/75">
						{nowText || "—"}
					  </div>
					</div>

					{orderValue !== null && (
					  <div className="rounded-2xl bg-[#F6F1E7] border border-black/10 p-4">
						<div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
						  Order Value
						</div>
						<div className="mt-2 text-[13px] text-black/75">
						  {orderValue} {currency}
						</div>
					  </div>
					)}

					<div className="rounded-2xl bg-[#F6F1E7] border border-black/10 p-4">
					  <div className="flex items-center justify-between">
						<div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
						  Status
						</div>
						<div className="font-sans font-extrabold text-black text-[14px]">
						  {badgeText}
						</div>
					  </div>
					</div>
				  </div>

				  <div className="mt-8 grid gap-3">
					{/* ВАЖНО: в preview скрываем кнопку бота (и вообще продукт логику) */}
					{isSystem && !isPreviewAllowed && (
					  <a
						href={systemBotHref}
						target="_blank"
						rel="noreferrer"
						className="w-full"
					  >
						<Button
						  size="lg"
						  className="w-full rounded-full h-12 font-semibold bg-yellow-400 text-black hover:bg-yellow-300"
						>
						  Перейти в бот курса
						  <ArrowRight className="ml-2 h-5 w-5" />
						</Button>
					  </a>
					)}

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
						Написать
						<ArrowRight className="ml-2 h-5 w-5" />
					  </Button>
					</a>
				  </div>

				  <div className="mt-6 text-center text-[12px] text-black/50 leading-snug">
					Подтверждение оплаты происходит на сервере через Stripe webhook.
				  </div>
				</>
			  )}
			</div>
		  </div>
		</motion.div>
	  </div>
	</section>
  );
}