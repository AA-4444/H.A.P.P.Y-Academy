import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

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
 * SplitText without ugly letter breaks:
 * words are wrapped with white-space: nowrap, so перенос только между словами.
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

  // tokens: words + spaces (spaces kept as separate tokens)
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
          // keep spaces as real spaces, allow wrap after them
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
              const charClass = ["st-char", isDot ? "text-accent" : ""].join(
                " "
              );

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

function SlideLine({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.span>
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

function SharedSplitCSS() {
  return (
    <style>{`
      .st-splitted{ display:inline; }
      .st-word{ display:inline-block; white-space:nowrap; }
      .st-space{ white-space:pre; }

      
      .st-charWrap{
        display:inline-block;
        overflow:hidden;
        vertical-align:baseline;
        padding-bottom: 0.22em; 
      }

      .st-char{
        display:inline-block;
        transform: translate3d(0,120%,0);
        will-change: transform;
        transition: transform 0.9s cubic-bezier(0.86,0,0.31,1);
      }
      .st-inview .st-char{ transform: translate3d(0,0,0); }
    `}</style>
  );
}

function MobileContent() {
  return (
    <div className="lg:hidden relative z-10 h-full">
      <SharedSplitCSS />

      <div className="h-full px-5 pt-[calc(1rem+88px)] pb-10 flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="w-full"
        >
         
          <h1 className="font-sans font-extrabold text-[34px] sm:text-4xl text-white leading-[1.05] tracking-tight mb-5">
            <SplitText text={"Счастье не ищут."} baseDelay={0.0} step={0.04} />
            <span className="block whitespace-nowrap">
              <SplitText text={"Его проектируют."} baseDelay={0.22} step={0.04} />
            </span>
          </h1>

          <p className="font-sans text-base text-white/80 leading-relaxed mb-8 max-w-[46ch]">
            <span className="block font-semibold text-white">
              <SplitText
                text={"Архитектура Счастья — система построения внутреннего дома"}
                baseDelay={0.18}
                step={0.010}
              />
            </span>

            <span className="block mt-3">
              <SplitText
                text={"Как у любого дома, у счастья есть фундамент, несущие конструкции и баланс."}
                baseDelay={0.32}
                step={0.010}
              />
            </span>

            <span className="block mt-2">
              <SplitText
                text={"Без архитектуры оно разваливается при первой нагрузке."}
                baseDelay={0.44}
                step={0.010}
              />
            </span>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full flex justify-center"
          >
            <div className="w-full max-w-[360px] space-y-3">
              <Button
                size="xl"
                onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                className="w-full rounded-full px-10 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
              >
                Начать строить дом счастья
              </Button>

              <Button
                size="xl"
                onClick={() => window.open(VIDEO_URL, "_blank")}
                className="w-full rounded-full px-10 bg-accent text-white hover:opacity-95 font-semibold"
              >
                Смотреть видео Ицхака
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function DesktopContent() {
  return (
    <div className="hidden lg:block relative z-10 h-full">
      <SharedSplitCSS />

      <div className="h-full px-14 pt-[calc(1rem+88px)] pb-14">
        <div className="h-full grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="max-w-3xl"
          >
            {/* ✅ FIX 2: new line WITHOUT indent, keep whole second line in one row */}
            <h1 className="font-sans font-extrabold text-6xl xl:text-7xl text-white leading-[1.05] mb-6">
              <SplitText text={"Счастье не ищут."} baseDelay={0.0} step={0.028} />
              <span className="block whitespace-nowrap">
                <SplitText text={"Его проектируют."} baseDelay={0.22} step={0.028} />
              </span>
            </h1>

            <p className="font-sans text-lg text-white/80 max-w-[46ch] leading-relaxed [text-wrap:balance] mb-10">
              <span className="block font-semibold text-white">
                <SplitText
                  text={"Архитектура Счастья — система построения внутреннего дома"}
                  baseDelay={0.18}
                  step={0.008}
                />
              </span>

              <span className="block mt-3">
                <SplitText
                  text={"Как у любого дома, у счастья есть фундамент, несущие конструкции и баланс."}
                  baseDelay={0.32}
                  step={0.008}
                />
              </span>

              <span className="block mt-2">
                <SplitText
                  text={"Без архитектуры оно разваливается при первой нагрузке."}
                  baseDelay={0.44}
                  step={0.008}
                />
              </span>
            </p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex gap-4 items-center"
            >
              <Button
                size="xl"
                onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                className="rounded-full px-10 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
              >
                Начать строить дом счастья
              </Button>

              <Button
                size="xl"
                onClick={() => window.open(VIDEO_URL, "_blank")}
                className="rounded-full px-10 bg-accent text-white hover:opacity-95 font-semibold"
              >
                Смотреть видео Ицхака
              </Button>
            </motion.div>
          </motion.div>

          <div />
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

      <MobileContent />
      <DesktopContent />

      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10" />
    </section>
  );
};

export default Hero;