import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Offer = {
  id: string;
  title: string;
  description: string;
  mobileDescription: string;
  price: string;
  priceNote?: string;
  bullets: string[];
  cta: string;
  variant: "light" | "yellow";
  ctaNote?: string;
  longDescription?: string;
};

type LeadFormData = {
  name: string;
  contact: string;
  comment: string;
};

const SUPPORT_HREF = "https://t.me/TataZakzheva/";

function TitleWithBreaks({ text }: { text: string }) {
  const lines = String(text ?? "").split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="grid grid-cols-[24px_1fr] gap-3 items-start">
      <span
        className="mt-[2px] h-6 w-6 shrink-0 rounded-full flex items-center justify-center bg-[#E64B1E]"
        aria-hidden="true"
      >
        <span className="text-black text-sm leading-none">✓</span>
      </span>
      <span className="text-black/70 text-sm sm:text-base leading-snug sm:leading-relaxed">
        {text}
      </span>
    </li>
  );
}

/** ✅ Лочим скролл без прыжков */
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

/** ✅ URL helpers */
function setModalUrl(kind: "lead" | "details", offerId: string) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.delete("lead");
  url.searchParams.delete("details");
  url.searchParams.delete("offerId");

  url.searchParams.set(kind, "1");
  url.searchParams.set("offerId", offerId);

  // hash не трогаем, чтобы не было лишних скроллов
  window.history.pushState({ kind, offerId }, "", url.toString());
}

function clearModalUrl() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.delete("lead");
  url.searchParams.delete("details");
  url.searchParams.delete("offerId");
  window.history.replaceState({}, "", url.toString());
}

function BulletsModal({
  open,
  onClose,
  offer,
  onJoinClub,
}: {
  open: boolean;
  onClose: () => void;
  offer: Offer | null;
  onJoinClub: () => void;
}) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // ✅ safe top: чтобы на iPhone Chrome не съедало верх/скругления
  const mobileSheetMaxH =
    "calc(100dvh - env(safe-area-inset-top) - 12px)";
  const mobileSheetTopGap = "calc(env(safe-area-inset-top) + 10px)";

  return (
    <AnimatePresence>
      {open && offer ? (
        <>
          <motion.button
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
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
              {/* header */}
              <div className="px-4 pt-4 shrink-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
                      Что внутри
                    </div>
                    <div className="mt-2 font-sans font-extrabold tracking-tight text-black text-[18px] leading-[1.15]">
                      <TitleWithBreaks text={offer.title} />
                    </div>
                    <div className="mt-2 text-black/70 text-[13px] leading-snug whitespace-pre-line">
                      {offer.mobileDescription}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="h-10 w-10 rounded-full bg-black/5 hover:bg-black/10 grid place-items-center shrink-0"
                    aria-label="Закрыть"
                  >
                    <X className="h-5 w-5 text-black/70" />
                  </button>
                </div>

                <div className="mt-4 h-px bg-black/10" />
              </div>

              {/* body scroll */}
              <div className="px-4 pt-4 pr-2 overflow-auto min-h-0 flex-1">
                <ul className="space-y-3 pb-2">
                  {offer.bullets.map((b, i) => (
                    <CheckItem key={i} text={b} />
                  ))}
                </ul>

                {offer.longDescription ? (
                  <div className="mt-4 rounded-2xl bg-white/60 border border-black/10 p-3">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
                      Подробнее
                    </div>
                    <div className="mt-2 text-black/70 text-[13px] leading-relaxed whitespace-pre-line">
                      {offer.longDescription}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* footer */}
              <div className="px-4 pt-3 pb-4 shrink-0">
                <div className="rounded-2xl bg-white/60 border border-black/10 p-3">
                  <div className="flex items-baseline justify-between">
                    <div className="text-black/60 text-xs uppercase tracking-[0.18em] font-semibold">
                      Цена
                    </div>
                    <div className="text-black font-black text-xl leading-none whitespace-nowrap">
                      {offer.price}
                      {offer.priceNote ? (
                        <span className="ml-1 text-black/60 text-sm font-semibold whitespace-nowrap">
                          {offer.priceNote}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* ✅ Для 49€ — 2 кнопки */}
                {offer.id === "club" ? (
                  <div className="mt-3 grid gap-3">
                 
                    <a
                      href={SUPPORT_HREF}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full"
                    >
                      <Button
                        size="lg"
                        className="w-full rounded-full h-12 font-semibold bg-white/70 text-black border border-black/10 hover:bg-white"
                      >
                        Возникли вопросы <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </a>
                  </div>
                ) : (
                  <Button
                    size="lg"
                    className="mt-3 w-full rounded-full h-12 font-semibold bg-yellow-400 text-black hover:bg-yellow-300"
                    onClick={onClose}
                  >
                    Понятно
                  </Button>
                )}
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
            <div className="w-full max-w-[820px] rounded-[28px] bg-[#F6F1E7] border border-black/10 shadow-2xl overflow-hidden">
              <div className="px-6 pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
                      Что внутри
                    </div>
                    <div className="mt-2 font-sans font-extrabold tracking-tight text-black text-[26px] leading-[1.15]">
                      <TitleWithBreaks text={offer.title} />
                    </div>
                    <div className="mt-3 text-black/70 text-[14px] leading-relaxed whitespace-pre-line max-w-[64ch]">
                      {offer.description}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="h-10 w-10 rounded-full bg-black/5 hover:bg-black/10 grid place-items-center shrink-0"
                    aria-label="Закрыть"
                  >
                    <X className="h-5 w-5 text-black/70" />
                  </button>
                </div>

                <div className="mt-5 h-px bg-black/10" />
              </div>

              <div className="px-6 py-6 max-h-[62vh] supports-[height:62dvh]:max-h-[62dvh] overflow-auto pr-4">
                <ul className="space-y-3">
                  {offer.bullets.map((b, i) => (
                    <CheckItem key={i} text={b} />
                  ))}
                </ul>

                {offer.longDescription ? (
                  <div className="mt-5 rounded-2xl bg-white/60 border border-black/10 p-4">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
                      Подробнее
                    </div>
                    <div className="mt-2 text-black/70 text-[14px] leading-relaxed whitespace-pre-line">
                      {offer.longDescription}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="px-6 pb-6">
                <div className="rounded-2xl bg-white/60 border border-black/10 p-4">
                  <div className="flex items-baseline justify-between">
                    <div className="text-black/60 text-xs uppercase tracking-[0.18em] font-semibold">
                      Цена
                    </div>
                    <div className="text-black font-black text-2xl leading-none whitespace-nowrap">
                      {offer.price}
                      {offer.priceNote ? (
                        <span className="ml-2 text-black/60 text-base font-semibold whitespace-nowrap">
                          {offer.priceNote}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                {offer.id === "club" ? (
                  <div className="mt-4 grid gap-3">
                    

                    <a
                      href={SUPPORT_HREF}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full"
                    >
                      <Button
                        size="lg"
                        className="w-full rounded-full h-12 font-semibold bg-white/70 text-black border border-black/10 hover:bg-white"
                      >
                        Возникли вопросы <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </a>
                  </div>
                ) : (
                  <Button
                    size="lg"
                    className="mt-4 w-full rounded-full h-12 font-semibold bg-yellow-400 text-black hover:bg-yellow-300"
                    onClick={onClose}
                  >
                    Понятно
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function LeadFormModal({
  open,
  onClose,
  offer,
}: {
  open: boolean;
  onClose: () => void;
  offer: Offer | null;
}) {
  useLockBodyScroll(open);

  const [data, setData] = useState<LeadFormData>({
    name: "",
    contact: "",
    comment: "",
  });

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const title =
    offer?.id === "club" ? "Заявка на спецпредложение" : "Заявка на курс";
  const subtitle =
    offer?.id === "club"
      ? "Оставьте контакты — вы перейдёте к оплате, а после успешной оплаты мы пришлём детали."
      : "Оставьте контакты — вы перейдёте к оплате, а после успешной оплаты мы пришлём доступ.";

  const resetAndClose = () => {
    setData({ name: "", contact: "", comment: "" });
    setSent(false);
    setSubmitting(false);
    onClose();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!offer) return;

    const nameOk = data.name.trim().length >= 2;
    const contactOk = data.contact.trim().length >= 5;
    if (!nameOk || !contactOk) return;

    setSubmitting(true);

    try {
      const payload = {
        offerId: offer.id,
        offerTitle: offer.title,
        name: data.name.trim(),
        contact: data.contact.trim(),
        comment: data.comment.trim(),
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
      };

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Checkout API error: ${res.status} ${text}`);
      }

      const json = await res.json().catch(() => ({} as any));
      if (!json?.url) throw new Error("No checkout url returned");

      setSent(true);
      window.location.href = json.url;
    } catch (err) {
      console.error(err);
      alert("Ошибка. Попробуйте ещё раз.");
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && offer ? (
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

          <motion.div
            className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div
              className={[
                "w-full sm:max-w-[620px]",
                "rounded-t-[28px] sm:rounded-[28px]",
                "bg-[#F6F1E7] border border-black/10 shadow-2xl overflow-hidden",
              ].join(" ")}
              style={{
                paddingBottom: "max(16px, env(safe-area-inset-bottom))",
              }}
            >
              <div className="px-5 sm:px-6 pt-5 sm:pt-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
                      {offer.title}
                    </div>
                    <div className="mt-2 font-sans font-extrabold tracking-tight text-black text-[20px] sm:text-[22px] leading-[1.15]">
                      {title}
                    </div>
                    <div className="mt-2 text-black/70 text-[13px] sm:text-[14px] leading-snug">
                      {subtitle}
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

              <div className="px-5 sm:px-6 py-5 sm:py-6">
                {sent ? (
                  <div className="rounded-2xl bg-white/70 border border-black/10 p-4 sm:p-5">
                    <div className="font-sans font-extrabold text-black text-[18px] sm:text-[20px]">
                      Перенаправляем на оплату…
                    </div>
                    <div className="mt-2 text-black/70 text-sm sm:text-base leading-relaxed">
                      Сейчас откроется безопасная страница оплаты Stripe. После успешной
                      оплаты заявка придёт нам в Telegram и мы свяжемся с вами.
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
                        onChange={(e) =>
                          setData((p) => ({ ...p, name: e.target.value }))
                        }
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
                        onChange={(e) =>
                          setData((p) => ({ ...p, contact: e.target.value }))
                        }
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
                        onChange={(e) =>
                          setData((p) => ({ ...p, comment: e.target.value }))
                        }
                        className="mt-2 w-full min-h-[92px] rounded-2xl p-4 bg-white/70 border border-black/10 outline-none focus:ring-2 focus:ring-black/20 resize-none"
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
                      className={[
                        "w-full rounded-full h-12 font-semibold",
                        offer.variant === "yellow"
                          ? "bg-[#E64B1E] text-white hover:opacity-95"
                          : "bg-yellow-400 text-black hover:bg-yellow-300",
                      ].join(" ")}
                    >
                      {submitting ? "Переходим к оплате..." : "Перейти к оплате"}
                    </Button>

                    <div className="text-[12px] text-black/55 leading-snug">
                      Нажимая «Перейти к оплате», вы соглашаетесь на обработку данных
                      для связи с вами.
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

export default function Programs() {
  const salesOpenDate = useMemo(() => new Date(2026, 1, 18, 0, 0, 0), []);
  const cd = useCountdown(salesOpenDate);

  const offers = useMemo<Offer[]>(
    () => [
      {
        id: "path",
        title: "3 первых шага к мастерству.\nТри элемента счастья",
        description:
          "Практическое введение в систему «Архитектура Счастья».\n3 урока о базовых элементах счастья.",
        mobileDescription:
          "Практическое введение в систему «Архитектура Счастья».\n3 урока о базовых элементах счастья.",
        price: "10 €",
        bullets: [
          "Практическое введение в систему «Архитектура Счастья».",
          "3 урока о базовых элементах счастья.",
        ],
        cta: "Стать счастливым",
        variant: "light",
        longDescription: `Этот 3-дневный курс - практическое введение в систему «Архитектура Счастья».
Он создан для людей, которые устали искать мотивацию, вдохновение или «правильное состояние» - и хотят понять, как реально управлять своим внутренним состоянием в повседневной жизни.

Здесь нет абстрактной философии, эзотерики или эмоциональных качелей.
Курс построен как рабочая модель: ты получаешь понятные объяснения, выполняешь простые, но точные практики — и наблюдаешь изменения в ощущении себя, уровне энергии и ясности мышления.
Без мотивационных лозунгов — только работающие практики, которые переключают мозг из режима дефицита в состояние энергии, ясности и внутренней опоры.
Если пройти курс честно — первые изменения ощущаются уже на 3-й день.`,
      },
      {
        id: "club",
        title: "Клуб «Архитектура Счастья»",
        description: "Полный проект вашего внутреннего дома.",
        mobileDescription: "Полная система из 10 ключевых элементов.",
        price: "49 €",
        priceNote: "/ М",
        ctaNote:
          cd.msLeft > 0 ? `${cd.days}д ${cd.hours}:${cd.mins}:${cd.secs}` : "Продажи открыты",
        bullets: [
          "Видео-уроки и тренинги",
          "Полная система 10 элементов",
          "Еженедельные онлайн-встречи с Ицхаком",
          "Личный саппорт кураторов",
          "Сообщество людей, строящих осознанную жизнь",
        ],
        cta: "Войти в клуб",
        variant: "yellow",
      },
    ],
    [cd.days, cd.hours, cd.mins, cd.secs, cd.msLeft]
  );

  const headerItem = {
    hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const cardUp = {
    hidden: { opacity: 0, y: 90, filter: "blur(12px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.9 },
    },
  };

  const inside = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut", delay: 0.08 },
    },
  };

  const [bulletsModalOpen, setBulletsModalOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const activeOffer = useMemo(
    () => offers.find((o) => o.id === activeOfferId) ?? null,
    [offers, activeOfferId]
  );

  /** ✅ Открыть details + URL */
  const openMore = (id: string) => {
    setActiveOfferId(id);
    setBulletsModalOpen(true);
    setLeadModalOpen(false);
    setModalUrl("details", id);
  };

  /** ✅ Закрыть details + очистить URL */
  const closeMore = () => {
    setBulletsModalOpen(false);
    setActiveOfferId(null);
    clearModalUrl();
  };

  /** ✅ Открыть lead + URL */
  const openLead = (id: string) => {
    setActiveOfferId(id);
    setLeadModalOpen(true);
    setBulletsModalOpen(false);
    setModalUrl("lead", id);
  };

  /** ✅ Закрыть lead + очистить URL */
  const closeLead = () => {
    setLeadModalOpen(false);
    setActiveOfferId(null);
    clearModalUrl();
  };

  /** ✅ “Вступить в клуб” из details → открываем lead */
  const joinClubFromMore = () => {
    if (!activeOfferId) return;
    setBulletsModalOpen(false);
    setLeadModalOpen(true);
    setModalUrl("lead", activeOfferId);
  };

  /** ✅ Синхронизация модалок по URL + back/forward */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyFromUrl = () => {
      const sp = new URLSearchParams(window.location.search);
      const lead = sp.get("lead");
      const details = sp.get("details");
      const offerId = sp.get("offerId");

      if (lead === "1" && offerId) {
        setActiveOfferId(offerId);
        setLeadModalOpen(true);
        setBulletsModalOpen(false);
        return;
      }

      if (details === "1" && offerId) {
        setActiveOfferId(offerId);
        setBulletsModalOpen(true);
        setLeadModalOpen(false);
        return;
      }

      // если параметров нет — закрываем всё
      setLeadModalOpen(false);
      setBulletsModalOpen(false);
      setActiveOfferId(null);
    };

    applyFromUrl();

    const onPop = () => applyFromUrl();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return (
    <section id="programs" className="bg-[#F6F1E7]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.span
            variants={headerItem}
            className="inline-flex items-center gap-2 text-[10px] sm:text-[12px] font-semibold tracking-[0.2em] text-black/45 uppercase mb-6 sm:mb-7"
          >
            <span className="w-2 h-2 rounded-full bg-[#E64B1E]" />
            Программы и продукты
          </motion.span>

          <motion.h2
            variants={headerItem}
            className="font-sans font-extrabold tracking-tight text-black text-3xl sm:text-5xl lg:text-6xl leading-[1.05]"
          >
            Выберите формат участия
          </motion.h2>

          <motion.p
            variants={headerItem}
            className="mt-5 font-sans text-black/70 text-base sm:text-lg leading-relaxed"
          >
            Начните с фундамента — или заходите в полный проект и стройте устойчивое состояние системно.
          </motion.p>
        </motion.div>

        <div className="mt-9 sm:mt-10 grid gap-6 lg:gap-8 lg:grid-cols-2 items-stretch">
          {offers.map((o, idx) => {
            const isYellow = o.variant === "yellow";
            const isLight = o.variant === "light";
            const hidePrimaryCta = o.id === "club";

            return (
              <motion.article
                key={o.id}
                variants={cardUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                  mass: 0.9,
                  delay: idx * 0.12,
                }}
                className={[
                  "relative flex flex-col",
                  "rounded-[32px] sm:rounded-[40px] overflow-hidden border",
                  "lg:min-h-[650px]",
                  "p-5 sm:p-10",
                  isYellow
                    ? "bg-yellow-400 border-black/15 shadow-xl"
                    : "bg-white border-black/10 shadow-lg",
                ].join(" ")}
              >
                {isLight && (
                  <div className="pointer-events-none absolute inset-0 hidden sm:block">
                    <div
                      className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full blur-3xl opacity-35"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(255, 214, 0, 0.55), rgba(230, 75, 30, 0.24), rgba(0,0,0,0))",
                      }}
                    />
                  </div>
                )}

                <motion.div variants={inside} className="relative h-full flex flex-col">
                  {/* MOBILE */}
                  <div className="sm:hidden">
                    <div className="flex justify-between items-start">
                      <div className="max-w-[72%] min-w-0">
                        <h3 className="font-sans font-extrabold tracking-tight text-[18px] leading-[1.15] text-black">
                          <TitleWithBreaks text={o.title} />
                        </h3>
                        <p className="mt-2 text-black/70 text-[14px] leading-snug whitespace-pre-line">
                          {o.mobileDescription}
                        </p>
                      </div>

                      <div className="text-3xl font-black text-black leading-none whitespace-nowrap">
                        {o.price}
                        {o.priceNote ? (
                          <span className="ml-1 text-black/60 text-base font-semibold whitespace-nowrap">
                            {o.priceNote}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {o.ctaNote ? (
                      <div className="mt-4 text-center">
                        <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-black/55">
                          Открытие продаж через
                        </div>
                        <div className="mt-1 font-black text-red-600 text-[20px] leading-none">
                          {o.ctaNote}
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-5 flex flex-col gap-3">
                      {!hidePrimaryCta ? (
                        <button
                          type="button"
                          onClick={() => openLead(o.id)}
                          className={[
                            "w-full rounded-full h-12",
                            "font-sans font-bold flex items-center justify-center gap-2 transition shadow-lg",
                            isYellow
                              ? "bg-[#E64B1E] text-white hover:opacity-95"
                              : "bg-yellow-400 text-black hover:bg-yellow-300",
                          ].join(" ")}
                        >
                          <span className="text-[14px]">{o.cta}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => openMore(o.id)}
                        className="w-full rounded-full h-11 bg-white/70 text-black border border-black/10 font-sans font-semibold hover:bg-white transition"
                      >
                        Узнать больше
                      </button>
                    </div>
                  </div>

                  {/* DESKTOP */}
                  <div className="hidden sm:flex flex-col h-full">
                    <div>
                      <div className="max-w-full">
                        <h3 className="font-sans font-extrabold tracking-tight text-3xl leading-tight text-black">
                          <TitleWithBreaks text={o.title} />
                        </h3>
                        <p className="mt-3 font-sans text-black/65 text-base leading-relaxed whitespace-pre-line">
                          {o.description}
                        </p>
                      </div>

                      <div className="mt-7">
                        <div className="text-xs uppercase tracking-[0.18em] font-sans text-black/45">
                          Цена
                        </div>

                        <div className="mt-2 flex items-end gap-x-2 gap-y-1 flex-wrap">
                          <div className="font-sans font-extrabold tracking-tight text-5xl sm:text-6xl text-black leading-none whitespace-nowrap">
                            {o.price}
                          </div>
                          {o.priceNote ? (
                            <div className="pb-1 text-sm sm:text-base font-sans font-semibold text-black/60 whitespace-nowrap">
                              {o.priceNote}
                            </div>
                          ) : null}
                        </div>

                        {o.ctaNote ? (
                          <div className="mt-5 text-center">
                            <div className="text-[11px] uppercase tracking-[0.18em] font-semibold text-black/55">
                              Открытие продаж через
                            </div>
                            <div className="mt-1 font-black text-red-600 text-2xl leading-none">
                              {o.ctaNote}
                            </div>
                          </div>
                        ) : null}
                      </div>

                      <div
                        className={[
                          "mt-6 border-t border-dashed",
                          isYellow ? "border-black/25" : "border-black/15",
                        ].join(" ")}
                      />
                    </div>

                    <div className="mt-6">
                      <div className="text-xs uppercase tracking-[0.18em] font-sans mb-4 text-black/45">
                        Что внутри
                      </div>
                      <ul className="space-y-3 font-sans leading-relaxed">
                        {o.bullets.map((b, i) => (
                          <CheckItem key={i} text={b} />
                        ))}
                      </ul>

                      {o.id === "club" ? (
                        <div className="mt-8">
                          <div className="font-sans font-semibold text-black/80 mb-3">
                            Результат
                          </div>
                          <ul className="space-y-2 font-sans text-black/70">
                            <li>— достигаются цели</li>
                            <li>— выстраиваются отношения</li>
                            <li>— живётся без внутреннего шума</li>
                          </ul>
                        </div>
                      ) : (
                        <p className="mt-8 font-sans text-black/70 text-base leading-relaxed">
                          Вы начинаете чувствовать опору, ясность и баланс уже в процессе.
                        </p>
                      )}
                    </div>

                    <div className="mt-auto pt-7">
                      {!hidePrimaryCta ? (
                        <button
                          type="button"
                          onClick={() => openLead(o.id)}
                          className={[
                            "w-full h-12 rounded-full",
                            "font-sans font-bold flex items-center justify-center gap-2 transition shadow-lg",
                            isYellow
                              ? "bg-[#E64B1E] text-white hover:opacity-95"
                              : "bg-yellow-400 text-black hover:bg-yellow-300",
                          ].join(" ")}
                        >
                          {o.cta}
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      ) : (
                        <div className="h-12" />
                      )}

                      <button
                        type="button"
                        onClick={() => openMore(o.id)}
                        className="mt-3 w-full h-11 rounded-full bg-white/70 text-black border border-black/10 font-sans font-semibold hover:bg-white transition"
                      >
                        Узнать больше
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <BulletsModal
        open={bulletsModalOpen}
        onClose={closeMore}
        offer={activeOffer}
        onJoinClub={joinClubFromMore}
      />

      <LeadFormModal open={leadModalOpen} onClose={closeLead} offer={activeOffer} />
    </section>
  );
}