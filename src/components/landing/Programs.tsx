import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

type Offer = {
  id: string;
  badge: string;
  title: string;
  description: string;
  price: string;
  priceNote?: string;
  bullets: string[];
  cta: string;
  variant: "light" | "yellow";
  sticker?: string; // "ТОП"
};

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
        // ✅ тень на ОБЁРТКЕ (мобила мягче, десктоп сильнее)
        "drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]",
        "sm:drop-shadow-[0_14px_35px_rgba(0,0,0,0.28)]",
      ].join(" ")}
    >
      <svg
        width="132"
        height="132"
        viewBox="0 0 120 120"
        aria-label={t}
        // ✅ убрали drop-shadow отсюда
        className="block"
        style={{
          // чуть более аккуратные края при повороте на iOS
          shapeRendering: "geometricPrecision",
        }}
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

function CheckItem({ text, tone }: { text: string; tone: "light" | "yellow" }) {
  const isYellow = tone === "yellow";
  return (
    <li className="flex gap-3">
      <span
        className={[
          "mt-[2px] h-6 w-6 shrink-0 rounded-full",
          "flex items-center justify-center",
          "ring-1 ring-inset",
          isYellow ? "bg-black/10 ring-black/25" : "bg-black/[0.04] ring-black/12",
        ].join(" ")}
      >
        <Check className="h-4 w-4 text-black/85" strokeWidth={3} />
      </span>
      <span className={isYellow ? "text-black/80" : "text-black/70"}>{text}</span>
    </li>
  );
}

export default function Programs() {
  const offers = useMemo<Offer[]>(
    () => [
      {
        id: "tripwire",
        badge: "Быстрый старт",
        title: "Минимальный пакет",
        description:
          "Один практический модуль, задание и чеклист — чтобы начать без подготовки.",
        price: "1 €",
        bullets: [
          "доступ к первому практическому модулю",
          "1 задание + чеклист внедрения",
          "доступ на 7 дней",
          "быстрый старт без подготовки",
        ],
        cta: "Принять участие за 1 €",
        variant: "light",
      },
      {
        id: "club",
        badge: "Клуб",
        title: "Клуб «Энергия и Счастье»",
        description:
          "Регулярная практика, материалы, живое сообщество и поддержка для устойчивых результатов.",
        price: "49 €",
        priceNote: "/ месяц",
        bullets: [
          "курсы: «10 шагов», «Победитель лени», «Полный контроль»",
          "совместное чтение книг",
          "сообщество + Telegram-чат",
          "архив Zoom-сессий «Мастер Счастья»",
        ],
        cta: "Вступить в клуб",
        variant: "yellow",
        sticker: "ТОП",
      },
    ],
    []
  );

  // ===== Animations =====
  const headerItem = {
    hidden: { opacity: 0, y: 14, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  // Карточки: именно "снизу вверх", мягко и тяжело
  const cardUp = {
    hidden: { opacity: 0, y: 90, filter: "blur(12px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        mass: 0.9,
      },
    },
  };

  // Внутренности карточки тоже слегка подтягиваются
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
        {/* HEADER */}
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
            Исследуйте продукты и программы
          </motion.h2>

          <motion.p
            variants={headerItem}
            className="mt-6 font-sans text-black/70 text-base sm:text-lg leading-relaxed"
          >
            Превратите любой час вашего дня в возможность для трансформации с ресурсами
            от программы личного развития №1 в мире.
          </motion.p>
        </motion.div>

        {/* PRICING */}
        <div className="mt-12 grid gap-6 lg:gap-8 lg:grid-cols-2 items-stretch">
          {offers.map((o, idx) => {
            const isYellow = o.variant === "yellow";

            return (
              <motion.article
                key={o.id}
                variants={cardUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.35 }}
                // небольшая задержка, чтобы выглядело "по очереди"
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
                {o.sticker ? <StarStickerSVG text={o.sticker} /> : null}

                <motion.div
                  variants={inside}
                  className="p-8 sm:p-10 h-full flex flex-col"
                >
                  {/* top badge */}
                  <div
                    className={[
                      "inline-flex items-center self-start rounded-full px-3 py-1",
                      "text-[11px] tracking-[0.22em] uppercase font-sans font-semibold",
                      isYellow
                        ? "bg-white/40 text-black/70"
                        : "bg-black/[0.04] text-black/55",
                    ].join(" ")}
                  >
                    {o.badge}
                  </div>

                  <h3 className="mt-5 font-sans font-extrabold tracking-tight text-2xl sm:text-3xl leading-tight text-black pr-16">
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

                  {/* price */}
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

                  {/* CTA right after price */}
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

                  {/* includes */}
                  <div className="mt-6">
                    <div
                      className={[
                        "text-xs uppercase tracking-[0.18em] font-sans mb-4",
                        isYellow ? "text-black/60" : "text-black/45",
                      ].join(" ")}
                    >
                      Что входит
                    </div>

                    <ul className="space-y-3 font-sans text-base leading-relaxed">
                      {o.bullets.map((b, i) => (
                        <CheckItem key={i} text={b} tone={o.variant} />
                      ))}
                    </ul>
                  </div>

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