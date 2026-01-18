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

  return (
    <section
      ref={sectionRef}
      className="bg-[#F6F1E7]"
      style={{
        
        minHeight: `calc(100vh + ${items.length * 220}px)`,
      }}
    >
      <div ref={stickyRef} className="sticky top-0 h-screen flex items-center">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.25fr] gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -22, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest text-black/45 uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Что внутри системы
              </span>

              <h2 className="font-sans font-extrabold tracking-tight text-black text-3xl sm:text-4xl md:text-5xl leading-[1.05] mb-8">
                Что ты получаешь
              </h2>

              <div className="space-y-3">
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

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                  className="rounded-full px-8 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
                >
                  Принять участие
                </Button>

                <Button
                  size="lg"
                  onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                  className="rounded-full px-8 bg-accent text-white hover:opacity-95 font-semibold"
                >
                  Записаться FREE на вводный урок
                </Button>
              </div>
            </motion.div>

           
            <div className="hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pillars;

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
  const end = start + step * 0.85;

  const y = useTransform(progress, [start, end], [26, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const blur = useTransform(progress, [start, end], [10, 0]);

  const ctaY = useTransform(progress, [start + step * 0.12, end], [14, 0]);
  const ctaOpacity = useTransform(progress, [start + step * 0.12, end], [0, 1]);
  const ctaBlur = useTransform(progress, [start + step * 0.12, end], [10, 0]);

  return (
    <motion.div style={{ opacity, y, filter: blur as unknown as string }}>
      <div className="flex items-center gap-4 min-w-0">
        <span
          className={[
            "font-sans text-xs tracking-widest shrink-0",
            active ? "text-black/70" : "text-black/30",
          ].join(" ")}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        
        <span
          className={[
            "min-w-0 flex-1",
            "font-serif leading-tight",
            "text-3xl sm:text-4xl md:text-5xl",
            "transition-colors duration-300",
            active ? "text-black" : "text-black/35",
            "whitespace-normal break-words sm:whitespace-nowrap sm:truncate",
          ].join(" ")}
        >
          {label}
        </span>


        <span className="shrink-0 hidden sm:flex w-[110px] justify-end">
          <motion.span
            style={{
              opacity: ctaOpacity,
              y: ctaY,
              filter: ctaBlur as unknown as string,
            }}
          >
            <Button
              variant="outline"
              size="sm"
              className="rounded-full text-xs font-sans px-3"
              onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
            >
              Узнать
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </motion.span>
        </span>
      </div>
    </motion.div>
  );
}