import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";
const QUIZ_URL = "https://www.happi10.com/quiz";

/* =========================
   reduced motion
========================= */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();

    if ("addEventListener" in mq) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if ("removeEventListener" in mq) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  return reduced;
}

type Pillar = { label: string; tone: "red" | "orange" | "yellow" };

function toneStyles(tone: Pillar["tone"]) {
  if (tone === "yellow") return { bg: "bg-yellow-400", text: "text-black" };
  if (tone === "orange") return { bg: "bg-[#F0623C]", text: "text-white" };
  return { bg: "bg-[#E4002B]", text: "text-white" };
}

function PillCircle({
  label,
  tone,
  size = "lg",
  disableHover,
}: {
  label: string;
  tone: Pillar["tone"];
  size?: "sm" | "md" | "lg";
  disableHover?: boolean;
}) {
  const styles = toneStyles(tone);

  const dim =
    size === "sm"
      ? "h-[120px] w-[120px]"
      : size === "md"
      ? "h-[140px] w-[140px]"
      : "h-[136px] w-[136px] sm:h-[150px] sm:w-[150px] lg:h-[160px] lg:w-[160px]";

  const text =
    size === "sm"
      ? "text-[12px] leading-[1.05]"
      : size === "md"
      ? "text-[13px] leading-[1.05]"
      : "text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.05]";

  return (
    <motion.div
      whileHover={disableHover ? undefined : { y: -6, scale: 1.06 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.7 }}
      className={[
        "rounded-full grid place-items-center select-none",
        dim,
        styles.bg,
        "shadow-[0_22px_65px_rgba(0,0,0,0.18)]",
        "ring-1 ring-inset ring-black/10",
      ].join(" ")}
    >
      <div
        className={[
          "px-3 text-center font-sans font-extrabold tracking-tight",
          styles.text,
          text,
        ].join(" ")}
      >
        {label}
      </div>
    </motion.div>
  );
}

export default function ArchitectureSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const onChange = () => setIsMobile(!!mq.matches);
    onChange();

    if ("addEventListener" in mq) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if ("removeEventListener" in mq) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  const pillars = useMemo<Pillar[]>(
    () => [
      { label: "Вдячність", tone: "yellow" },
      { label: "Навчання", tone: "orange" },
      { label: "Гнучкість мислення", tone: "red" },
      { label: "Компліменти", tone: "yellow" },
      { label: "Усвідомленість", tone: "orange" },
      { label: "Доброта", tone: "red" },
      { label: "Сенси і цінності", tone: "yellow" },
      { label: "Переконання і критерії успіху", tone: "orange" },
      { label: "Плани і цілі", tone: "red" },
      { label: "Енергія", tone: "yellow" },
    ],
    []
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 26, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 180, damping: 26, mass: 0.7 });
  const glowX = useTransform(sx, (v) => `${v}px`);
  const glowY = useTransform(sy, (v) => `${v}px`);

  const onMove = (e: React.MouseEvent) => {
    if (!rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    mx.set(e.clientX - (r.left + r.width / 2));
    my.set(e.clientY - (r.top + r.height / 2));
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const goPrograms = () => {
    const el = document.getElementById("programs");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-[#F6F1E7]">
      <div className="mx-auto w-full px-3 sm:px-4 lg:px-6 py-16 sm:py-20">
        <motion.div
          ref={rootRef}
          onMouseMove={isMobile || prefersReducedMotion ? undefined : onMove}
          onMouseLeave={isMobile || prefersReducedMotion ? undefined : onLeave}
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.10)]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(0,0,0,0.10) 1px, transparent 1px)",
                backgroundSize: "150px 150px",
              }}
            />

            <div className="absolute -top-28 -left-28 h-[420px] w-[420px] rounded-full bg-black/5 blur-3xl" />
            <div
              className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-35"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,214,0,0.55), rgba(230,75,30,0.22), rgba(0,0,0,0))",
              }}
            />

            {!prefersReducedMotion && (
              <motion.div
                className="absolute h-[560px] w-[560px] rounded-full blur-3xl opacity-30"
                style={{
                  left: "50%",
                  top: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                  x: glowX,
                  y: glowY,
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,214,0,0.55), rgba(230,75,30,0.20), rgba(0,0,0,0))",
                }}
              />
            )}

            <div className="absolute inset-0 ring-1 ring-black/10" />
          </div>

          <div className="relative px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-14">
            <motion.h2 className="font-sans font-extrabold tracking-tight text-black text-3xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-5xl">
              © Архітектура щастя - це система
            </motion.h2>

            <div className="mt-6 sm:mt-7 max-w-4xl space-y-3">
              <p className="font-sans text-black/75 text-base sm:text-lg leading-relaxed">
                Курс допомагає:
              </p>

              <div className="grid gap-2 sm:gap-3">
                <p className="font-sans text-black/85 text-base sm:text-lg leading-relaxed">
                  відновити внутрішню енергію
                </p>
                <p className="font-sans text-black/85 text-base sm:text-lg leading-relaxed">
                  прибрати внутрішній хаос
                </p>
                <p className="font-sans text-black/85 text-base sm:text-lg leading-relaxed">
                  сфокусуватися на головному
                </p>
                <p className="font-sans text-black/85 text-base sm:text-lg leading-relaxed">
                  повернути радість життя
                </p>
              </div>
            </div>

            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4">
              <Button
                size="xl"
                onClick={goPrograms}
                className="rounded-full px-10 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
              >
                Стати щасливим
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="xl"
                asChild
                className="rounded-full px-10 bg-[#F0623C] text-white hover:bg-[#e45733] font-semibold"
              >
                <a href={QUIZ_URL} target="_blank" rel="noopener noreferrer">
                  Пройти тест
                </a>
              </Button>
            </div>

            <div className="hidden lg:block mt-12">
              <div className="grid grid-cols-5 gap-6">
                {pillars.map((p) => (
                  <PillCircle key={p.label} {...p} size="lg" />
                ))}
              </div>
            </div>

            <div className="lg:hidden mt-10">
              <div className="grid grid-cols-2 gap-4 justify-items-center">
                {pillars.map((p) => (
                  <PillCircle key={p.label} {...p} size="sm" disableHover />
                ))}
              </div>
            </div>

            <p className="mt-10 font-sans text-black/70 text-sm sm:text-base">
              Якщо хоча б один елемент не вбудований - конструкція втрачає стійкість.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}