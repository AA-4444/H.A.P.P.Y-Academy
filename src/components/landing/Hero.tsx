import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

import t1 from "@/assets/t1.jpg";
import t2 from "@/assets/t2.png";
import t3 from "@/assets/t3.jpg";
import t4 from "@/assets/t4.png";
import t5 from "@/assets/t5.jpg";
import t6 from "@/assets/t6.png";

import bg1 from "@/assets/bg1.png";
import bg2 from "@/assets/bg2.png";
import bg3 from "@/assets/bg4.png";
import bg4 from "@/assets/bg5.png";
import bg5 from "@/assets/bg6.png";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";
const HEADER_H = 88;
const VIDEO_URL = "https://youtu.be/VZhCbEQUD-A?si=akJc1rkK_nx2LxL4";

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildGridMinRepeats(images: string[], rows: number, cols: number) {
  const total = rows * cols;
  if (!images.length) return [];

  const unique = Array.from(new Set(images));
  const uniqLen = unique.length;

  const out: string[] = new Array(total);
  const prevRow = new Array<string | null>(cols).fill(null);

  for (let r = 0; r < rows; r++) {
    let pool = shuffle(unique);
    const usedInRow = new Set<string>();

    for (let c = 0; c < cols; c++) {
      let pickImg: string | null = null;

      for (let i = 0; i < pool.length; i++) {
        const img = pool[i];
        if (usedInRow.has(img)) continue;
        if (prevRow[c] && img === prevRow[c]) continue;
        pickImg = img;
        pool.splice(i, 1);
        break;
      }

      if (!pickImg) {
        for (let i = 0; i < pool.length; i++) {
          const img = pool[i];
          if (usedInRow.has(img)) continue;
          pickImg = img;
          pool.splice(i, 1);
          break;
        }
      }

      if (!pickImg) pickImg = unique[(Math.random() * uniqLen) | 0];

      usedInRow.add(pickImg);
      out[r * cols + c] = pickImg;
    }

    for (let c = 0; c < cols; c++) prevRow[c] = out[r * cols + c];
  }

  return out;
}

/**
 * SplitText — оставляю как есть (НЕ ТРОГАЮ), просто сейчас не используется.
 */
function SplitText({
  text,
  className,
  baseDelay = 0,
  step = 0.03,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  step?: number;
}) {
  const [inView, setInView] = useState(false);
  const tokens = useMemo(() => (text ? text.split(/(\s+)/) : []), [text]);

  useEffect(() => {
    const id = window.setTimeout(() => setInView(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  let charIndex = 0;

  return (
    <span
      className={["st-splitted", inView ? "st-inview" : "", className ?? ""].join(
        " "
      )}
      aria-label={text}
    >
      {tokens.map((tok, ti) => {
        const isSpace = /^\s+$/.test(tok);

        if (isSpace) {
          return (
            <span key={`sp-${ti}`} className="st-space">
              {tok.replace(/ /g, "\u00A0")}
            </span>
          );
        }

        const chars = Array.from(tok);

        return (
          <span key={`w-${ti}`} className="st-word">
            {chars.map((ch, i) => {
              const delay = baseDelay + charIndex * step;
              charIndex += 1;

              const isDot = ch === ".";
              const charClass = ["st-char", isDot ? "text-accent" : ""].join(" ");

              return (
                <span key={`${ch}-${ti}-${i}`} className="st-charWrap">
                  <span className={charClass} style={{ transitionDelay: `${delay}s` }}>
                    {ch}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

function GridMotionBg({ images }: { images: string[] }) {
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mouseXRef = useRef<number>(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  const rows = 4;
  const cols = isMobile ? 4 : 7;

  const items = useMemo(() => buildGridMinRepeats(images, rows, cols), [
    images,
    rows,
    cols,
  ]);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
    };

    const handleTouchMoveDesktop = (e: TouchEvent) => {
      const t = e.touches?.[0];
      if (!t) return;
      mouseXRef.current = t.clientX;
    };

    const updateMotion = () => {
      const w = window.innerWidth || 1;

      const maxMoveAmount = isMobile ? 220 : 300;
      const baseDuration = isMobile ? 0.9 : 0.8;
      const inertia = [0.6, 0.4, 0.3, 0.2];

      let xForCalc = mouseXRef.current;

      if (isMobile) {
        const tt = performance.now() / 1000;
        const wave = 0.5 + 0.5 * Math.sin(tt * 0.55);
        xForCalc = wave * w;
      }

      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const direction = index % 2 === 0 ? 1 : -1;
        const moveAmount =
          ((xForCalc / w) * maxMoveAmount - maxMoveAmount / 2) * direction;

        gsap.to(row, {
          x: moveAmount,
          duration: baseDuration + inertia[index % inertia.length],
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    };

    gsap.ticker.add(updateMotion);

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("touchmove", handleTouchMoveDesktop, { passive: true });
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("touchmove", handleTouchMoveDesktop);
      }
      gsap.ticker.remove(updateMotion);
    };
  }, [isMobile]);

  const gap = isMobile ? "0.75rem" : "1rem";
  const gridW = isMobile ? "210vw" : "150vw";
  const gridH = isMobile ? "210vh" : "150vh";

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: gridW,
          height: gridH,
          transform: "translate(-50%, -50%) rotate(-15deg)",
          transformOrigin: "center center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap,
          }}
        >
          {[...Array(rows)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              ref={(el) => (rowRefs.current[rowIndex] = el)}
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap,
                willChange: "transform",
              }}
            >
              {[...Array(cols)].map((_, itemIndex) => {
                const idx = rowIndex * cols + itemIndex;
                const img = items[idx];

                return (
                  <div key={itemIndex} style={{ position: "relative" }}>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        borderRadius: 14,
                        backgroundColor: "#111",
                        border: "1px solid rgba(255,255,255,0.06)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          backgroundImage: `url(${img})`,
                          backgroundSize: "cover",
                          backgroundPosition: "50% 50%",
                          filter: "saturate(1.05) contrast(1.05)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.55) 100%)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "180px 180px",
          opacity: 0.18,
        }}
      />
    </div>
  );
}

/* =========================
   ✅ ОРАНЖЕВЫЙ БЛОК — 1 В 1 как во 2-м скрине
   + добавили ТОЛЬКО одну кнопку "Стать счастливым" (scroll -> #programs)
   КРУГОВАЯ СТРЕЛКА ОСТАЁТСЯ ВНУТРИ БЛОКА
   ========================= */
function ScrollBadge() {
  const text = "узнать подробнее • узнать подробнее • ";

  return (
    <div className="relative h-[140px] w-[140px] sm:h-[160px] sm:w-[160px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <path
              id="circlePath"
              d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
            />
          </defs>
          <text fill="rgba(255,255,255,0.85)" fontSize="13" letterSpacing="2.5">
            <textPath href="#circlePath">{text.repeat(2)}</textPath>
          </text>
        </svg>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-12 w-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
          <ArrowDown className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}

function OrangeHeroBlock() {
  const goPrograms = () => {
    const el = document.getElementById("programs");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.hash = "#programs";
  };

  return (
    <div className="relative z-10 h-full w-full">
     
      <div className="h-full px-5 sm:px-10 lg:px-14 pt-[calc(1rem+88px)] pb-14 flex items-center justify-center">
        <div className="w-full">
        
          <div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden shadow-2xl">
            <div className="px-6 sm:px-10 lg:px-14 py-16 sm:py-20 lg:py-24">
              <div className="mx-auto max-w-5xl text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="font-sans font-extrabold tracking-tight text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]"
                >
                  Академия счастья H.A.P.P.Y.
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 }}
                  className="mt-8 text-white font-sans text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto"
                >
                  Это путь к устойчивому состоянию, ясным решениям и действиям,
                  которые дают реальные результаты — без мотивационных иллюзий и
                  бесконечных стартов с нуля.
                </motion.p>

              
                <div className="mt-10 flex justify-center">
                  <Button
                    size="xl"
                    onClick={goPrograms}
                    className="rounded-full px-10 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
                  >
                    Стать счастливым
                  </Button>
                </div>

                
                <div className="mt-10 sm:mt-12 flex justify-center">
                  <ScrollBadge />
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}

const Hero = () => {
  const bgImages = useMemo(
    () => [t1, t2, t3, t4, t5, t6, bg1, bg2, bg3, bg4, bg5],
    []
  );

  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) return;

    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches?.[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches?.[0]?.clientY ?? 0;
      const dy = y - startY;
      if (window.scrollY <= 0 && dy > 0) e.preventDefault();
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <section className="relative w-screen h-[100svh] overflow-hidden">
      
      <GridMotionBg images={bgImages} />

     
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/10" />
      </div>

    
      <OrangeHeroBlock />

      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10" />
    </section>
  );
};

export default Hero;