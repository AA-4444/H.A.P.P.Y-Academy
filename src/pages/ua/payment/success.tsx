import { useMemo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/newlogo.svg";

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

  const preview = search ? search.get("preview") : null;
  const token = search ? search.get("token") : null;
  const previewValue = search ? search.get("value") : null;
  const previewCurrency = search ? search.get("currency") : null;

  const PREVIEW_TOKEN = import.meta.env.VITE_SUCCESS_PREVIEW_TOKEN || "";

  const isPreviewAllowed =
	preview === "1" && !!token && token === PREVIEW_TOKEN;

  const effectiveOfferId = isPreviewAllowed ? "preview" : offerId;
  const isSystem = effectiveOfferId === "system";

  const nowText =
	typeof window !== "undefined"
	  ? new Date().toLocaleString("ru-RU")
	  : "";

  const badgeText = useMemo(() => {
	return "Оплата успешна";
  }, []);

  const pixelFired = useRef(false);
  const [orderValue, setOrderValue] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string>("EUR");
  const [paidOk, setPaidOk] = useState<boolean>(false);

  const firedKey = sessionId
	? `fbq_purchase_fired_${sessionId}`
	: isPreviewAllowed
	? `fbq_purchase_fired_preview_${token ?? "1"}`
	: null;

  // ===============================
  // REAL MODE
  // ===============================
  useEffect(() => {
	if (!sessionId) return;
	let cancelled = false;

	const loadSession = async () => {
	  try {
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

		if (!pixelFired.current && window.fbq) {
		  window.fbq("track", "Purchase", {
			value,
			currency: cur,
		  });
		  pixelFired.current = true;
		  if (firedKey) sessionStorage.setItem(firedKey, "1");
		}
	  } catch (err) {
		console.error("Meta pixel error:", err);
	  }
	};

	loadSession();
	return () => {
	  cancelled = true;
	};
  }, [sessionId]);

  // ===============================
  // PREVIEW MODE
  // ===============================
  useEffect(() => {
	if (sessionId) return;
	if (!isPreviewAllowed) return;

	try {
	  if (firedKey && sessionStorage.getItem(firedKey) === "1") {
		pixelFired.current = true;
	  }
	  if (pixelFired.current) return;

	  const v = Number(String(previewValue ?? "49").replace(",", "."));
	  const cur = String(previewCurrency ?? "EUR").toUpperCase();
	  const safeValue = Number.isFinite(v) && v > 0 ? v : 49;

	  setOrderValue(safeValue);
	  setCurrency(cur);
	  setPaidOk(true);

	  if (window.fbq) {
		window.fbq("track", "Purchase", {
		  value: safeValue,
		  currency: cur,
		});
		pixelFired.current = true;
		if (firedKey) sessionStorage.setItem(firedKey, "1");
	  }
	} catch (e) {
	  console.error("Preview pixel error:", e);
	}
  }, [sessionId, isPreviewAllowed]);

  const canShow = paidOk || isPreviewAllowed;

  return (
	<section className="min-h-screen bg-[#F6F1E7]">
	  <div className="min-h-screen flex items-center justify-center px-4 py-10">
		<motion.div
		  initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
		  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
		  transition={{ duration: 0.5, ease: "easeOut" }}
		  className="w-full max-w-[560px]"
		>
		  <div className="rounded-[32px] border border-black/10 bg-white shadow-2xl overflow-hidden">
			<div className="p-8">

			  {/* LOGO */}
			  <div className="flex justify-center">
				<img
				  src={logo}
				  alt="HAPPI10"
				  className="h-14 w-auto object-contain"
				/>
			  </div>

			  {/* SUCCESS ICON */}
			  <div className="mt-6 flex justify-center">
				<div className="h-16 w-16 rounded-full bg-[#EAF7EF] border border-black/10 grid place-items-center">
				  <Check className="h-8 w-8 text-[#16A34A]" strokeWidth={3} />
				</div>
			  </div>

			  <h1 className="mt-6 text-center font-extrabold text-black text-2xl leading-tight">
				Оплата прошла успешно
			  </h1>

			  {!canShow ? (
				<p className="mt-4 text-center text-black/65 text-sm">
				  Проверяем оплату…
				</p>
			  ) : (
				<>
				  <p className="mt-4 text-center text-black/70 text-sm leading-relaxed">
					{isSystem
					  ? "Вы успешно оплатили курс «Архитектура счастья»."
					  : "Спасибо за оплату."}
				  </p>

				  {/* 🔥 Пожелание */}
				  <div className="mt-6 rounded-2xl bg-[#F6F1E7] border border-black/10 p-5 text-sm text-black/80 leading-relaxed space-y-3">
					<p>Желаю успешного прохождения курса!</p>
					<p>
					  И напоминаю, что важный элемент твоего состояния счастья -
					  это <strong>Благодарность</strong>.
					</p>
					<p>Я тебе Благодарен за доверие!</p>
					<p>
					  Если у тебя есть желание и возможность - ты уже можешь
					  стать <strong>Амбассадором счастья</strong> и
					  проспонсировать участие в курсе на любую сумму доната
					  для того, кто в этом нуждается.
					</p>
				  </div>

				  <div className="mt-6 h-px bg-black/10" />

				  {/* 🔎 Stripe / Lead / Value */}
				  <div className="mt-5 grid gap-3">
					<InfoBlock title="Stripe session" value={sessionId || (isPreviewAllowed ? "PREVIEW" : "—")} />
					
					<InfoBlock title="Date & time" value={nowText || "—"} />
					{orderValue !== null && (
					  <InfoBlock title="Order Value" value={`${orderValue} ${currency}`} />
					)}
					<InfoBlock title="Status" value={badgeText} bold />
				  </div>

				  {/* BUTTONS */}
				  <div className="mt-8 grid gap-3">

					{isSystem && !isPreviewAllowed && (
					  <a href={systemBotHref} target="_blank" rel="noreferrer">
						<Button className="w-full h-12 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 font-semibold">
						  Перейти в бот курса
						  <ArrowRight className="ml-2 h-5 w-5" />
						</Button>
					  </a>
					)}

					<Link to="/ambassador">
					  <Button className="w-full h-12 rounded-full bg-[#E64B1E] text-white hover:opacity-95 font-semibold">
						Стать Амбассадором счастья
						
					  </Button>
					</Link>

					<Link to="/#programs">
					  <Button className="w-full h-12 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 font-semibold">
						Вернуться на сайт
					  </Button>
					</Link>

					<a href={supportHref} target="_blank" rel="noreferrer">
					  <Button className="w-full h-12 rounded-full bg-black text-white hover:opacity-90 font-semibold">
						Написать в поддержку
					  </Button>
					</a>
				  </div>

				  <div className="mt-6 text-center text-xs text-black/50">
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

/* Helper block */
function InfoBlock({
  title,
  value,
  bold = false,
}: {
  title: string;
  value: string;
  bold?: boolean;
}) {
  return (
	<div className="rounded-2xl bg-[#F6F1E7] border border-black/10 p-4">
	  <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
		{title}
	  </div>
	  <div
		className={`mt-2 break-all ${
		  bold
			? "font-extrabold text-black text-[14px]"
			: "font-mono text-[12px] text-black/75"
		}`}
	  >
		{value}
	  </div>
	</div>
  );
}