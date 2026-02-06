import { useMemo, useState } from "react";
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
};

type LeadFormData = {
  name: string;
  contact: string;
  comment: string;
};

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

function MobileBulletsModal({
  open,
  onClose,
  offer,
}: {
  open: boolean;
  onClose: () => void;
  offer: Offer | null;
}) {
  return (
    <AnimatePresence>
      {open && offer ? (
        <>
          <motion.button
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/50 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed inset-x-0 bottom-0 z-[70] sm:hidden"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div
              className="mx-auto w-full max-w-[520px] rounded-t-[28px] bg-[#F6F1E7] shadow-2xl border border-black/10"
              style={{ paddingBottom: "max(16px, env(safe-area-inset-bottom))" }}
            >
              <div className="px-4 pt-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
                      Что внутри
                    </div>
                    <div className="mt-2 font-sans font-extrabold tracking-tight text-black text-[18px] leading-[1.15]">
                      {offer.title}
                    </div>
                    <div className="mt-2 text-black/70 text-[13px] leading-snug">
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

              <div className="px-4 pt-4 max-h-[55vh] overflow-auto pr-2">
                <ul className="space-y-3 pb-2">
                  {offer.bullets.map((b, i) => (
                    <CheckItem key={i} text={b} />
                  ))}
                </ul>
              </div>

              <div className="px-4 pt-3">
                <div className="rounded-2xl bg-white/60 border border-black/10 p-3">
                  <div className="flex items-baseline justify-between">
                    <div className="text-black/60 text-xs uppercase tracking-[0.18em] font-semibold">
                      Цена
                    </div>
                    <div className="text-black font-black text-xl leading-none">
                      {offer.price}
                      {offer.priceNote ? (
                        <span className="ml-1 text-black/60 text-sm font-semibold">
                          {offer.priceNote}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className={[
                    "mt-3 w-full rounded-full h-12 font-semibold",
                    offer.variant === "yellow"
                      ? "bg-[#E64B1E] text-white hover:opacity-95"
                      : "bg-yellow-400 text-black hover:bg-yellow-300",
                  ].join(" ")}
                  onClick={onClose}
                >
                  Понятно
                </Button>
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
  const [data, setData] = useState<LeadFormData>({
    name: "",
    contact: "",
    comment: "",
  });

  // sent теперь используем как "уходим на оплату"
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const title = offer?.id === "club" ? "Заявка на спецпредложение" : "Заявка на курс";
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

      // ВАЖНО: идём в checkout, а не /api/lead
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

      setSent(true); // покажем экран "перенаправляем"
      window.location.href = json.url; // редирект на Stripe Checkout
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
                      Сейчас откроется безопасная страница оплаты Stripe.
                      После успешной оплаты заявка придёт нам в Telegram и мы свяжемся с вами.
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
                      Нажимая «Перейти к оплате», вы соглашаетесь на обработку данных для связи с вами.
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

export default function Programs() {
  const offers = useMemo<Offer[]>(
    () => [
      {
        id: "path",
        title: "Путь к счастью",
        description: "Это фундамент. Первый этаж вашего дома.",
        mobileDescription: "Фундамент вашего устойчивого состояния.",
        price: "1 €",
        ctaNote: "Скоро открываем курс",
        bullets: [
          "Курс из 22 писем от Ицхака",
          "Пошаговое внедрение элементов",
          "Практические задания",
          "Финальное видео Ицхака",
          "Коуч-сессия с учеником Ицхака",
        ],
        cta: "Стать счастливым",
        variant: "light",
      },
      {
        id: "club",
        title: "Клуб «Архитектура Счастья»",
        description: "Полный проект вашего внутреннего дома.",
        mobileDescription: "Полная система из 10 ключевых элементов.",
        price: "49 €",
        priceNote: "/ М",
        ctaNote: "Оставь заявку на специальное предложение",
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
    []
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

  const openMore = (id: string) => {
    setActiveOfferId(id);
    setBulletsModalOpen(true);
  };

  const closeMore = () => {
    setBulletsModalOpen(false);
    setActiveOfferId(null);
  };

  const openLead = (id: string) => {
    setActiveOfferId(id);
    setLeadModalOpen(true);
  };

  const closeLead = () => {
    setLeadModalOpen(false);
    setActiveOfferId(null);
  };

  return (
    <section id="programs" className="bg-[#F6F1E7]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 sm:py-20">
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.span
            variants={headerItem}
            className="inline-flex items-center gap-2 text-[10px] sm:text-[12px] font-semibold tracking-[0.2em] text-black/45 uppercase mb-6 sm:mb-8"
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
            className="mt-6 font-sans text-black/70 text-base sm:text-lg leading-relaxed"
          >
            Начните с фундамента — или заходите в полный проект и стройте устойчивое состояние системно.
          </motion.p>
        </motion.div>

        <div className="mt-10 sm:mt-12 grid gap-6 lg:gap-8 lg:grid-cols-2 items-stretch">
          {offers.map((o, idx) => {
            const isYellow = o.variant === "yellow";
            const isLight = o.variant === "light";

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
                whileHover={{ y: -4 }}
                className={[
                  "relative flex flex-col",
                  "rounded-[32px] sm:rounded-[40px] overflow-hidden border",
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
                  <div className="sm:hidden">
                    <div className="flex justify-between items-start">
                      <div className="max-w-[72%] min-w-0">
                        <h3 className="font-sans font-extrabold tracking-tight text-[18px] leading-[1.15] text-black">
                          {o.title}
                        </h3>
                        <p className="mt-2 text-black/70 text-[14px] leading-snug">
                          {o.mobileDescription}
                        </p>
                      </div>

                      <div className="text-3xl font-black text-black leading-none">
                        {o.price}
                        {o.priceNote ? (
                          <span className="ml-1 text-black/60 text-base font-semibold">
                            {o.priceNote}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
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

                      <button
                        type="button"
                        onClick={() => openMore(o.id)}
                        className="w-full rounded-full h-11 bg-white/70 text-black border border-black/10 font-sans font-semibold hover:bg-white transition"
                      >
                        Узнать больше
                      </button>

                      {o.ctaNote ? (
                        <div className="text-[12px] text-black/60 leading-snug text-center">
                          {o.ctaNote}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="hidden sm:block">
                    <div className="max-w-full">
                      <h3 className="font-sans font-extrabold tracking-tight text-3xl leading-tight text-black">
                        {o.title}
                      </h3>
                      <p className="mt-3 font-sans text-black/65 text-base leading-relaxed">
                        {o.description}
                      </p>
                    </div>

                    <div className="mt-7">
                      <div className="text-xs uppercase tracking-[0.18em] font-sans text-black/45">
                        Цена
                      </div>
                      <div className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-1">
                        <div className="font-sans font-extrabold tracking-tight text-5xl sm:text-6xl text-black leading-none">
                          {o.price}
                        </div>
                        {o.priceNote ? (
                          <div className="pb-1 text-sm sm:text-base font-sans font-semibold text-black/60">
                            {o.priceNote}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-7">
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

                      {o.ctaNote ? (
                        <div className="mt-3 text-sm font-sans text-black/65">
                          {o.ctaNote}
                        </div>
                      ) : null}

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
                    </div>

                    <div>
                      {o.id === "path" ? (
                        <p className="mt-8 font-sans text-black/70 text-base leading-relaxed">
                          Вы начинаете чувствовать опору, ясность и баланс уже в процессе.
                        </p>
                      ) : (
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
                      )}
                    </div>
                  </div>

                  <div className="mt-auto" />
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <MobileBulletsModal open={bulletsModalOpen} onClose={closeMore} offer={activeOffer} />
      <LeadFormModal open={leadModalOpen} onClose={closeLead} offer={activeOffer} />
    </section>
  );
}