import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import avaNatalya from "@/assets/v01.png";
import avaOlga from "@/assets/v02.png";
import avaGalina from "@/assets/v03.png";

type Testimonial = {
  id: string;
  avatar: string;
  name: string;
  subtitle: string;
  text: string;
};

export default function Testimonials() {
  const testimonials = useMemo<Testimonial[]>(
    () => [
      {
        id: "rybakov",
        avatar: avaNatalya,
        name: "Игорь Рыбаков",
        subtitle: "Долларовый миллиардер. В ТОП-100 Forbes России.",
        text: `«Ицхак спасибо! Ты первый человек, который так мощно сделал заход в «духовно-материальные планы». Все думают, что в духовном и материальном плане у меня все амбиции удовлетворены. Но конечно же не все))) Спасибо тебе мой дорогой друг!».`,
      },
      {
        id: "chernyak",
        avatar: avaOlga,
        name: "Евгений Черняк",
        subtitle: "Долларовый мультимиллионер.",
        text: `«Ицхак — тренер №1, по нашим замерам, после которого растет эффективность торговой команды».`,
      },
      {
        id: "hartmann",
        avatar: avaGalina,
        name: "Оскар Хартманн",
        subtitle: "Долларовый мультимиллионер. Серийный предприниматель.",
        text: `«Ицхак — один из лидирующих людей, который говорит про все вопросы, про которые не говорят в школе».

Предисловие из книги «Делай Просто. Просто делай»:
«Если бы не Ицхак, этой книги бы не было».`,
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // пауза автопереключения после ручного действия
  const [pausedUntil, setPausedUntil] = useState<number>(0);

  // фиксируем высоту блока, чтобы секция не "прыгала"
  const [fixedHeight, setFixedHeight] = useState<number | null>(null);
  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);

  const AUTOPLAY_MS = 9000;
  const MANUAL_PAUSE_MS = 10000;

  const goTo = (i: number) => {
    setActive(i);
    setPausedUntil(Date.now() + MANUAL_PAUSE_MS);
  };

  useEffect(() => {
    if (isHovering) return;

    const t = window.setInterval(() => {
      if (Date.now() < pausedUntil) return;
      setActive((i) => (i + 1) % testimonials.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(t);
  }, [isHovering, pausedUntil, testimonials.length]);

  useLayoutEffect(() => {
    const calc = () => {
      let max = 0;
      for (const el of measureRefs.current) {
        if (!el) continue;
        max = Math.max(max, el.getBoundingClientRect().height);
      }
      setFixedHeight(max > 0 ? Math.ceil(max) : null);
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [testimonials]);

  const t = testimonials[active];

  return (
    <section id="reviews" className="bg-[#F6F1E7]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-[10px] sm:text-[12px] tracking-[0.2em] font-semibold text-black/45 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Отзывы
          </div>
        </div>

        {/* измеритель: скрытый, но участвует в расчёте высоты */}
        <div className="pointer-events-none absolute opacity-0 -z-10">
          {testimonials.map((x, i) => (
            <div
              key={x.id}
              ref={(el) => {
                measureRefs.current[i] = el;
              }}
              className="text-center max-w-5xl"
            >
              <h3 className="font-sans font-extrabold tracking-tight text-4xl md:text-6xl leading-[1.05]">
                {x.name}
              </h3>
              <p className="mt-4 font-sans text-lg md:text-2xl">
                {x.subtitle}
              </p>
              <p className="mt-8 font-sans text-lg md:text-2xl leading-relaxed whitespace-pre-line">
                {x.text}
              </p>
            </div>
          ))}
        </div>

        {/* центральный текст */}
        <div
          className="mt-12 text-center mx-auto max-w-5xl"
          style={fixedHeight ? { minHeight: fixedHeight } : undefined}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* НА ПК БОЛЬШЕ */}
              <h3 className="font-sans font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.05]">
                {t.name}
              </h3>

              <p className="mt-4 font-sans text-black/70 text-lg sm:text-xl lg:text-2xl">
                {t.subtitle}
              </p>

              <p className="mt-8 font-sans text-black/80 text-lg sm:text-xl lg:text-2xl leading-relaxed whitespace-pre-line">
                {t.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* аватарки */}
        <div
          className="mt-12"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="mx-auto max-w-6xl overflow-x-auto overflow-y-visible no-scrollbar">
            <div className="flex items-center justify-center gap-10 sm:gap-14 min-w-max px-2 py-3">
              {testimonials.map((p, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onMouseEnter={() => goTo(i)}
                    onFocus={() => goTo(i)}
                    onClick={() => goTo(i)}
                    className="group flex flex-col items-center gap-4 focus:outline-none"
                    aria-label={`Показать отзыв: ${p.name}`}
                  >
                    <div
                      className={[
                        "rounded-full transition",
                        // НА ПК БОЛЬШЕ кольцо
                        "ring-[3px] lg:ring-[4px]",
                        "ring-offset-4 lg:ring-offset-6",
                        "ring-offset-[#F7F3EE]",
                        isActive ? "ring-accent" : "ring-black/10 group-hover:ring-black/25",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "rounded-full overflow-hidden",
                          // НА ПК БОЛЬШЕ фото
                          "h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32",
                        ].join(" ")}
                      >
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="h-full w-full object-cover"
                          draggable={false}
                        />
                      </div>
                    </div>

                    <div
                      className={[
                        "text-center font-sans font-semibold leading-tight transition",
                        // НА ПК БОЛЬШЕ подпись
                        "text-sm sm:text-base lg:text-lg",
                        isActive ? "text-black" : "text-black/55 group-hover:text-black/75",
                      ].join(" ")}
                    >
                      {p.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}