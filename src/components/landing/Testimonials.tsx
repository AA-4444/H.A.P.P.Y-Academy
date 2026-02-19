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

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [breakpoint]);

  return isMobile;
}

export default function Testimonials() {
  const testimonials = useMemo<Testimonial[]>(
    () => [
      {
        id: "rybakov",
        avatar: avaNatalya,
        name: "Игорь Рыбаков",
        subtitle:
          "Миллиардер, со-основатель корпорации ТЕХНОНИКОЛЬ, инвестор, участник списка Forbes",
        text: `«Ицхак спасибо! Ты первый человек, который так мощно сделал заход в «духовно-материальные планы». Все думают, что в духовном и материальном плане у меня все амбиции удовлетворены. Но конечно же не все))) Спасибо тебе мой дорогой друг!».`,
      },
      {
        id: "chernyak",
        avatar: avaOlga,
        name: "Евгений Черняк",
        subtitle:
          "Предприниматель, основатель Global Spirits. Автор бизнес-подкаста Big Money, мультимиллионер",
        text: `«Ицхак — тренер №1, по нашим замерам, после которого растет эффективность торговой команды».`,
      },
      {
        id: "hartmann",
        avatar: avaGalina,
        name: "Оскар Хартманн",
        subtitle:
          "Серийный предприниматель и венчурный инвестор. Со-основатель KupiVIP, инвестор 100+ стартапов, мультимиллионер",
        text: `«Ицхак — один из лидирующих людей, который говорит про все вопросы, про которые не говорят в школе».

Предисловие из книги «Делай Просто. Просто делай»:
«Если бы не Ицхак, этой книги бы не было».`,
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [pausedUntil, setPausedUntil] = useState<number>(0);

  const isMobile = useIsMobile(768);

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
    let ro: ResizeObserver | null = null;

    const calc = () => {
      let max = 0;
      for (const el of measureRefs.current) {
        if (!el) continue;
        // scrollHeight стабильнее, чем getBoundingClientRect на мобилках
        max = Math.max(max, el.scrollHeight);
      }
      setFixedHeight(max > 0 ? Math.ceil(max) : null);
    };

    // 1) сразу после mount
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(calc);
      return raf2;
    });

    // 2) после загрузки шрифтов (iOS часто меняет метрики)
    const fontsAny = (document as any).fonts as FontFaceSet | undefined;
    if (fontsAny?.ready) {
      fontsAny.ready.then(() => {
        requestAnimationFrame(() => requestAnimationFrame(calc));
      });
    }

    // 3) при изменении размеров/переносов — ResizeObserver
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => calc());
      measureRefs.current.forEach((el) => el && ro?.observe(el));
    }

    // 4) ресайз/ориентация
    window.addEventListener("resize", calc);
    window.addEventListener("orientationchange", calc);

    return () => {
      cancelAnimationFrame(raf1);
      window.removeEventListener("resize", calc);
      window.removeEventListener("orientationchange", calc);
      ro?.disconnect();
    };
  }, [testimonials]);

  const t = testimonials[active];

  return (
    <section id="reviews" className="bg-[#F6F1E7]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20 relative">
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-[10px] sm:text-[12px] tracking-[0.2em] font-semibold text-black/45 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Отзывы
          </div>
        </div>

        {/* ✅ ИЗМЕРИТЕЛЬ: та же ширина/типографика, но скрыт корректно */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="mt-12 text-center mx-auto max-w-5xl" style={{ visibility: "hidden" }}>
            {testimonials.map((x, i) => (
              <div
                key={x.id}
                ref={(el) => {
                  measureRefs.current[i] = el;
                }}
              >
                <h3 className="font-sans font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.05]">
                  {x.name}
                </h3>

                <p className="mt-4 font-sans text-black/70 text-lg sm:text-xl lg:text-2xl">
                  {x.subtitle}
                </p>

                <p className="mt-8 font-sans text-black/80 text-lg sm:text-xl lg:text-2xl leading-relaxed whitespace-pre-line">
                  {x.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ ОСНОВНОЙ КОНТЕНТ */}
        <div
          className="mt-12 text-center mx-auto max-w-5xl"
          style={
            fixedHeight
              ? isMobile
                ? { height: fixedHeight } // ✅ МОБИЛКА: жёстко фиксируем
                : { minHeight: fixedHeight } // ✅ ПК: можно minHeight
              : undefined
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
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
                        "ring-[3px] lg:ring-[4px]",
                        "ring-offset-4 lg:ring-offset-6",
                        "ring-offset-[#F7F3EE]",
                        isActive ? "ring-accent" : "ring-black/10 group-hover:ring-black/25",
                      ].join(" ")}
                    >
                      <div className="rounded-full overflow-hidden h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32">
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