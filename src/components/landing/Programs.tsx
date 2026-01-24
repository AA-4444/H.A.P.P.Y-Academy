import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IoCheckmarkDone } from "react-icons/io5";

type Offer = {
  id: string;
  title: string;
  description: string;
  price: string;
  priceNote?: string;
  bullets: string[];
  cta: string;
  variant: "light" | "yellow";
  sticker?: string;
};

/* =========================
   ⭐️ STAR STICKER (COMMENTED OUT)
   ========================= */
/*
function StarStickerSVG({ text }: { text: string }) {
  const t = (text || "").toUpperCase();

  const fontSize = 14;
  const letterSpacing = 2;

  return (
    <div
      className={[
        "absolute right-5 top-5 z-20 rotate-[12deg]",
        "pointer-events-none",
        "will-change-transform",
        "drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]",
        "sm:drop-shadow-[0_14px_35px_rgba(0,0,0,0.28)]",
      ].join(" ")}
    >
      <svg
        width="132"
        height="132"
        viewBox="0 0 120 120"
        aria-label={t}
        className="block"
        style={{ shapeRendering: "geometricPrecision" }}
      >
        <path
          d="M60 6
             L72 18
             L88 12
             L92 30
             L110 34
             L100 50
             L114 62
             L96 70
             L102 88
             L84 86
             L78 104
             L60 94
             L42 104
             L36 86
             L18 88
             L24 70
             L6 62
             L20 50
             L10 34
             L28 30
             L32 12
             L48 18
             Z"
          fill="#E64B1E"
        />
        <text
          x="60"
          y="55"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#FFFFFF"
          fontSize={fontSize}
          fontWeight="900"
          letterSpacing={letterSpacing}
          style={{
            textTransform: "uppercase",
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
          }}
        >
          {t}
        </text>
      </svg>
    </div>
  );
}
*/

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex gap-3 items-start">
     
      <span
        className={[
          "mt-[2px] h-6 w-6 shrink-0 rounded-full",
          "flex items-center justify-center",
          "bg-[#E64B1E]", 
        ].join(" ")}
        aria-hidden="true"
      >
       
        <span className="text-black text-sm leading-none">✓</span>
      </span>

      <span className="text-black/70">{text}</span>
    </li>
  );
}

export default function Programs() {
  const offers = useMemo<Offer[]>(
    () => [
      {
        id: "path",
        title: "Путь к счастью",
        description: "Это фундамент. Первый этаж вашего дома.",
        price: "1 €",
        bullets: [
          "Курс из 22 писем от Ицхака",
          "Пошаговое внедрение элементов",
          "Практические задания",
          "Финальное видео Ицхака",
          "Коуч-сессия с учеником Ицхака",
        ],
        cta: "Начать строительство за 1 €",
        variant: "light",
      },
      {
        id: "club",
        title: "Клуб «Архитектура Счастья»",
        description: "Полный проект вашего внутреннего дома.",
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

  return (
    <section id="programs" className="bg-[#F6F1E7]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
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
            <span className="w-2 h-2 rounded-full bg-accent" />
            Программы и продукты
          </motion.span>

          <motion.h2
            variants={headerItem}
            className="font-sans font-extrabold tracking-tight text-black text-4xl sm:text-5xl lg:text-6xl leading-[1.05]"
          >
            Выберите формат участия
          </motion.h2>

          <motion.p
            variants={headerItem}
            className="mt-6 font-sans text-black/70 text-base sm:text-lg leading-relaxed"
          >
            Начните с фундамента — или заходите в полный проект и стройте устойчивое
            состояние системно.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:gap-8 lg:grid-cols-2 items-stretch">
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
                  "relative h-full",
                  "rounded-[32px] sm:rounded-[40px] overflow-hidden",
                  "border",
                  "min-h-[640px] sm:min-h-[680px]",
                  isYellow
                    ? "bg-yellow-400 border-black/15 shadow-[0_22px_70px_rgba(0,0,0,0.14)]"
                    : "bg-white border-black/10 shadow-[0_18px_50px_rgba(0,0,0,0.10)]",
                ].join(" ")}
              >
                {isLight ? (
                  <div className="pointer-events-none absolute inset-0">
                    <div
                      className="absolute -bottom-24 -right-24 h-[420px] w-[420px] rounded-full blur-3xl opacity-35"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, rgba(255, 214, 0, 0.55), rgba(230, 75, 30, 0.24), rgba(0,0,0,0))",
                      }}
                    />
                  </div>
                ) : null}

                <motion.div variants={inside} className="relative p-8 sm:p-10 h-full flex flex-col">
                  <h3 className="font-sans font-extrabold tracking-tight text-2xl sm:text-3xl leading-tight text-black pr-2">
                    {o.title}
                  </h3>

                  <p
                    className={[
                      "mt-3 font-sans leading-relaxed",
                      isYellow ? "text-black/70" : "text-black/65",
                    ].join(" ")}
                  >
                    {o.description}
                  </p>

                  <div className="mt-7">
                    <div
                      className={[
                        "text-xs uppercase tracking-[0.18em] font-sans",
                        isYellow ? "text-black/60" : "text-black/45",
                      ].join(" ")}
                    >
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
                      className={[
                        "w-full h-12 rounded-full",
                        "font-sans font-bold",
                        "flex items-center justify-center gap-2",
                        "transition",
                        "shadow-[0_12px_30px_rgba(0,0,0,0.18)]",
                        isYellow
                          ? "bg-[#E64B1E] text-white hover:opacity-95"
                          : "bg-yellow-400 text-black hover:bg-yellow-300",
                      ].join(" ")}
                    >
                      {o.cta}
                      <ArrowRight className="h-5 w-5" />
                    </button>

                    <div
                      className={[
                        "mt-6 border-t border-dashed",
                        isYellow ? "border-black/25" : "border-black/15",
                      ].join(" ")}
                    />
                  </div>

                  <div className="mt-6">
                    <div
                      className={[
                        "text-xs uppercase tracking-[0.18em] font-sans mb-4",
                        isYellow ? "text-black/60" : "text-black/45",
                      ].join(" ")}
                    >
                      Что внутри
                    </div>

                    <ul className="space-y-3 font-sans text-base leading-relaxed">
                      {o.bullets.map((b, i) => (
                        <CheckItem key={i} text={b} />
                      ))}
                    </ul>
                  </div>

                  {o.id === "path" ? (
                    <p className="mt-8 font-sans text-black/70 leading-relaxed">
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

                  <div className="mt-auto pt-8" />
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}