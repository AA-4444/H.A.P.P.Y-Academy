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
      <span className="text-black/75 text-sm sm:text-base leading-snug sm:leading-relaxed">
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
          {/* backdrop */}
          <motion.button
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* modal */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-[70] sm:hidden"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div
              className={[
                "mx-auto w-full max-w-[520px]",
                "rounded-t-[28px] bg-[#F6F1E7] shadow-2xl",
                "border border-black/10",
              ].join(" ")}
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

export default function Programs() {
  const offers = useMemo<Offer[]>(
    () => [
      {
        id: "path",
        title: "Путь к счастью",
        description: "Это фундамент. Первый этаж вашего дома.",
        mobileDescription: "Фундамент вашего устойчивого состояния.",
        price: "1 €",
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
        priceNote: "/ месяц",
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
    hidden: { opacity: 0, y: 70, filter: "blur(12px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 120, damping: 18, mass: 0.9 },
    },
  };

  const inside = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.06 },
    },
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const activeOffer = useMemo(
    () => offers.find((o) => o.id === activeOfferId) ?? null,
    [offers, activeOfferId]
  );

  const openMore = (id: string) => {
    setActiveOfferId(id);
    setModalOpen(true);
  };

  const closeMore = () => {
    setModalOpen(false);
    setActiveOfferId(null);
  };

  return (
    <section id="programs" className="bg-[#F6F1E7]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 sm:py-20 py-10">
        {/* HEADER */}
        <motion.div
          className="max-w-4xl"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.span
            variants={headerItem}
            className="inline-flex items-center gap-2 text-[10px] sm:text-[12px] font-semibold tracking-[0.2em] text-black/45 uppercase mb-3 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#E64B1E]" />
            Программы и продукты
          </motion.span>

          <motion.h2
            variants={headerItem}
            className="font-sans font-extrabold tracking-tight text-black text-[30px] leading-[1.12] sm:text-5xl lg:text-6xl sm:leading-[1.05]"
          >
            Выберите формат участия
          </motion.h2>

          <motion.p
            variants={headerItem}
            className="hidden sm:block mt-6 font-sans text-black/70 text-base sm:text-lg leading-relaxed"
          >
            Начните с фундамента - или заходите в полный проект и стройте устойчивое
            состояние системно.
          </motion.p>
        </motion.div>

        {/* CARDS */}
        <div className="mt-6 sm:mt-12 grid gap-4 sm:gap-8 lg:grid-cols-2">
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
                  delay: idx * 0.1,
                }}
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

                <motion.div variants={inside} className="relative flex flex-col">
                  {/* TOP */}
                  <div className="flex justify-between items-start sm:block">
                    <div className="max-w-[72%] sm:max-w-full min-w-0">
                      <h3 className="font-sans font-extrabold tracking-tight text-[22px] leading-[1.15] sm:text-3xl text-black">
                        {o.title}
                      </h3>

                      <p className="sm:hidden mt-2 text-black/70 text-[14px] leading-snug">
                        {o.mobileDescription}
                      </p>

                      <p className="hidden sm:block mt-3 font-sans text-black/65 text-base leading-relaxed">
                        {o.description}
                      </p>
                    </div>

                    <div className="sm:hidden text-3xl font-black text-black leading-none">
                      {o.price}
                      {o.priceNote ? (
                        <span className="ml-1 text-black/60 text-base font-semibold">
                          {o.priceNote}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* DESKTOP: FULL LIST */}
                  <div className="hidden sm:block mt-7">
                    <div className="text-xs uppercase tracking-[0.18em] font-sans text-black/45">
                      Что внутри
                    </div>
                    <ul className="mt-4 space-y-3 font-sans leading-relaxed">
                      {o.bullets.map((b, i) => (
                        <CheckItem key={i} text={b} />
                      ))}
                    </ul>
                  </div>

                  {/* CTA AREA */}
                  <div className="mt-4 sm:mt-8 flex flex-col gap-3">
                    <button
                      type="button"
                      className={[
                        "w-full rounded-full h-12",
                        "font-sans font-bold flex items-center justify-center gap-2 transition shadow-lg",
                        isYellow
                          ? "bg-[#E64B1E] text-white hover:opacity-95"
                          : "bg-yellow-400 text-black hover:bg-yellow-300",
                      ].join(" ")}
                    >
                      <span className="text-[14px] sm:text-base">{o.cta}</span>
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>

                    {/* ✅ MOBILE: “Узнать больше” opens modal */}
                    <button
                      type="button"
                      onClick={() => openMore(o.id)}
                      className={[
                        "sm:hidden w-full rounded-full h-11",
                        "bg-white/70 text-black border border-black/10",
                        "font-sans font-semibold",
                        "hover:bg-white transition",
                      ].join(" ")}
                    >
                      Узнать больше
                    </button>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* ✅ MOBILE MODAL */}
      <MobileBulletsModal open={modalOpen} onClose={closeMore} offer={activeOffer} />
    </section>
  );
}