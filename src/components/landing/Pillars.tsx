import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";

const itemsBase = [
  { label: "архитектуру мышления" },
  { label: "понимание истинных целей" },
  { label: "порядок в решениях" },
  { label: "инструменты внедрения в реальной жизни" },
  { label: "логику: что делать, зачем и в каком порядке" },
];

const Pillars = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo(() => itemsBase, []);
  const isInView = useInView(stickyRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.8 });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsub = progress.on("change", (v) => {
      const idx = Math.max(0, Math.min(items.length - 1, Math.floor(v * items.length)));
      setActiveIndex(idx);
    });
    return () => unsub();
  }, [progress, items.length]);

  const buttonsOpacity = useTransform(progress, [0.8, 0.95], [0, 1]);
  const buttonsY = useTransform(progress, [0.8, 0.95], [40, 0]);
  const buttonsBlur = useTransform(progress, [0.8, 0.95], [15, 0]);

  return (
    <section
      ref={sectionRef}
      className="bg-[#F6F1E7]"
      style={{
        minHeight: `calc(100vh + ${items.length * 200}px)`,
      }}
    >
      <div ref={stickyRef} className="sticky top-0 h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 sm:px-6 flex justify-center">
          
          {/* Контейнер с max-w-fit сжимается по тексту, а mx-auto центрирует его в экране */}
          <div className="max-w-fit w-full flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-[12px] font-semibold tracking-[0.2em] text-black/45 uppercase mb-6 sm:mb-8">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Что внутри системы
              </span>

              <h2 className="font-sans font-extrabold tracking-tight text-black text-4xl sm:text-4xl md:text-6xl leading-[1.1] mb-8 sm:mb-12">
                Что ты получаешь
              </h2>

              <div className="flex flex-col w-full">
                <div className="space-y-4 sm:space-y-6">
                  {items.map((it, index) => (
                    <PillarRow
                      key={it.label}
                      index={index}
                      label={it.label}
                      progress={progress}
                      total={items.length}
                      active={activeIndex === index}
                    />
                  ))}
                </div>

                <motion.div 
                  className="mt-10 sm:mt-14 flex flex-col gap-3 sm:gap-4 w-full" 
                  style={{ 
                      opacity: buttonsOpacity, 
                      y: buttonsY, 
                      filter: buttonsBlur as unknown as string 
                  }}
                >
                  <Button
                    size="lg"
                    onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                    className="w-full rounded-full bg-yellow-400 text-black hover:bg-yellow-300 font-bold h-14 sm:h-16 text-sm sm:text-lg shadow-sm"
                  >
                    Принять участие
                  </Button>

                  <Button
                    size="lg"
                    onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                    className="w-full rounded-full bg-[#F0623C] text-white hover:opacity-90 font-bold h-14 sm:h-16 text-sm sm:text-lg shadow-sm"
                  >
                    Записаться FREE на вводный урок
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

function PillarRow({
  index,
  label,
  progress,
  total,
  active,
}: {
  index: number;
  label: string;
  progress: MotionValue<number>;
  total: number;
  active: boolean;
}) {
  const step = 1 / total;
  const start = index * step;
  const end = start + step * 0.8;

  const y = useTransform(progress, [start, end], [20, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const blur = useTransform(progress, [start, end], [8, 0]);

  return (
    <motion.div style={{ opacity, y, filter: blur as unknown as string }}>
      <div className="flex items-baseline gap-3 sm:gap-6">
        <span
          className={[
            "font-sans text-[10px] sm:text-sm tracking-widest shrink-0 w-6 sm:w-8",
            active ? "text-black/70" : "text-black/30",
          ].join(" ")}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <span
          className={[
            "font-serif leading-tight",
            "text-xl sm:text-4xl md:text-6xl", 
            "transition-colors duration-500",
            active ? "text-black" : "text-black/35",
            "whitespace-normal sm:whitespace-nowrap", // На мобильных разрешаем перенос, чтобы не ломать экран
          ].join(" ")}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export default Pillars;