import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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

/** ✅ FIX: ровные галочки + текст (grid) */
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
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 sm:py-20 py-0">
        {/* HEADER (может быть больше — карточки отдельно) */}
        <motion.div
          className="max-w-4xl pt-6 sm:pt-0"
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
            className="font-sans font-extrabold tracking-tight text-black text-[26px] leading-[1.12] sm:text-5xl lg:text-6xl sm:leading-[1.05]"
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

        {/* небольшой воздух между заголовком и карточками на мобиле */}
        <div className="h-6 sm:hidden" />

        {/* ✅ МОБИЛКА: ТОЛЬКО карточки = 1 экран (100dvh) */}
        <div className="sm:h-auto h-[100dvh]">
          <div className="h-full grid gap-3 sm:gap-8 lg:grid-cols-2 grid-rows-2 lg:grid-rows-none">
            {offers.map((o, idx) => {
              const isYellow = o.variant === "yellow";
              const isLight = o.variant === "light";

              // ✅ МОБ: ограничиваем пункты, чтобы 100% влезало в 1/2 экрана
              const mobileBullets = o.id === "club" ? o.bullets.slice(0, 3) : o.bullets.slice(0, 3);

              const mobileBottomNote =
                o.id === "path"
                  ? "Результат: опора, ясность, спокойствие."
                  : "Результат: системная жизнь без внутреннего шума.";

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
                    "relative flex flex-col h-full",
                    "rounded-[32px] sm:rounded-[40px] overflow-hidden border",
                    "p-4 sm:p-10",
                    "sm:min-h-[640px]",
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

                  <motion.div variants={inside} className="relative flex flex-col h-full min-h-0">
                    {/* TOP */}
                    <div className="flex justify-between items-start sm:block">
                      <div className="max-w-[72%] sm:max-w-full min-w-0">
                        <h3 className="font-sans font-extrabold tracking-tight text-[20px] leading-[1.15] sm:text-3xl text-black">
                          {o.title}
                        </h3>

                        <p className="sm:hidden mt-1 text-black/70 text-[13px] leading-snug">
                          {o.mobileDescription}
                        </p>

                        <p className="hidden sm:block mt-3 font-sans text-black/65 text-base leading-relaxed">
                          {o.description}
                        </p>
                      </div>

                      <div className="sm:hidden text-3xl font-black text-black leading-none">
                        {o.price}
                      </div>
                    </div>

                    {/* BUTTON */}
                    <div className="mt-3 sm:mt-7">
                      <button
                        type="button"
                        className={[
                          "w-full rounded-full",
                          "h-11 sm:h-12",
                          "font-sans font-bold flex items-center justify-center gap-2 transition shadow-lg",
                          isYellow
                            ? "bg-[#E64B1E] text-white hover:opacity-95"
                            : "bg-yellow-400 text-black hover:bg-yellow-300",
                        ].join(" ")}
                      >
                        <span className="text-[13px] sm:text-base">{o.cta}</span>
                        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>

                      <div
                        className={[
                          "mt-3 sm:mt-6 border-t border-dashed",
                          isYellow ? "border-black/25" : "border-black/15",
                        ].join(" ")}
                      />
                    </div>

                    {/* ✅ FIX: bullets не давят вниз и не наезжают на результат */}
                    <div className="mt-3 sm:mt-6 flex-1 min-h-0 overflow-hidden">
                      <div className="text-[10px] sm:text-xs uppercase tracking-[0.18em] font-sans mb-2 sm:mb-4 text-black/45">
                        Что внутри
                      </div>

                      {/* МОБ: компактный список */}
                      <ul className="sm:hidden space-y-2 font-sans leading-relaxed overflow-hidden">
                        {mobileBullets.map((b, i) => (
                          <CheckItem key={i} text={b} />
                        ))}
                      </ul>

                      {/* ПК: полный список */}
                      <ul className="hidden sm:block space-y-3 font-sans leading-relaxed">
                        {o.bullets.map((b, i) => (
                          <CheckItem key={i} text={b} />
                        ))}
                      </ul>
                    </div>

                    {/* ✅ результат всегда внизу и НЕ налезает */}
                    <p className="sm:hidden mt-auto pt-2 text-[12px] text-black/70 leading-snug">
                      {mobileBottomNote}
                    </p>

                    {/* ПК: как было */}
                    <div className="hidden sm:block">
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
                            <li>- достигаются цели</li>
                            <li>- выстраиваются отношения</li>
                            <li>- живётся без внутреннего шума</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* небольшой низ на мобиле чтобы не прилипало к краю браузера */}
        <div className="h-4 sm:hidden" />
      </div>
    </section>
  );
}