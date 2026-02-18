import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

/**
 * ✅ ВАЖНО:
 * Тут мы импортируем картинки через vite-imagetools:
 * - AVIF srcset (несколько ширин)
 * - WEBP srcset (несколько ширин)
 * - fallback (один нормальный размер)
 *
 * Можно менять набор ширин: 320;640;960 — норм для карточек.
 */

// ---------- t1..t6 ----------
import t1Avif from "@/assets/t1.jpg?w=320;640;960&format=avif&as=srcset";
import t1Webp from "@/assets/t1.jpg?w=320;640;960&format=webp&as=srcset";
import t1Fallback from "@/assets/t1.jpg?w=960&format=jpg&as=src";

import t2Avif from "@/assets/t2.png?w=320;640;960&format=avif&as=srcset";
import t2Webp from "@/assets/t2.png?w=320;640;960&format=webp&as=srcset";
import t2Fallback from "@/assets/t2.png?w=960&format=png&as=src";

import t3Avif from "@/assets/t3.jpg?w=320;640;960&format=avif&as=srcset";
import t3Webp from "@/assets/t3.jpg?w=320;640;960&format=webp&as=srcset";
import t3Fallback from "@/assets/t3.jpg?w=960&format=jpg&as=src";

import t4Avif from "@/assets/t4.png?w=320;640;960&format=avif&as=srcset";
import t4Webp from "@/assets/t4.png?w=320;640;960&format=webp&as=srcset";
import t4Fallback from "@/assets/t4.png?w=960&format=png&as=src";

import t5Avif from "@/assets/t5.jpg?w=320;640;960&format=avif&as=srcset";
import t5Webp from "@/assets/t5.jpg?w=320;640;960&format=webp&as=srcset";
import t5Fallback from "@/assets/t5.jpg?w=960&format=jpg&as=src";

import t6Avif from "@/assets/t6.png?w=320;640;960&format=avif&as=srcset";
import t6Webp from "@/assets/t6.png?w=320;640;960&format=webp&as=srcset";
import t6Fallback from "@/assets/t6.png?w=960&format=png&as=src";

// ---------- bg1..bg5 ----------
import bg1Avif from "@/assets/bg1.png?w=320;640;960&format=avif&as=srcset";
import bg1Webp from "@/assets/bg1.png?w=320;640;960&format=webp&as=srcset";
import bg1Fallback from "@/assets/bg1.png?w=960&format=png&as=src";

import bg2Avif from "@/assets/bg2.png?w=320;640;960&format=avif&as=srcset";
import bg2Webp from "@/assets/bg2.png?w=320;640;960&format=webp&as=srcset";
import bg2Fallback from "@/assets/bg2.png?w=960&format=png&as=src";

import bg3Avif from "@/assets/bg4.png?w=320;640;960&format=avif&as=srcset";
import bg3Webp from "@/assets/bg4.png?w=320;640;960&format=webp&as=srcset";
import bg3Fallback from "@/assets/bg4.png?w=960&format=png&as=src";

import bg4Avif from "@/assets/bg5.png?w=320;640;960&format=avif&as=srcset";
import bg4Webp from "@/assets/bg5.png?w=320;640;960&format=webp&as=srcset";
import bg4Fallback from "@/assets/bg5.png?w=960&format=png&as=src";

import bg5Avif from "@/assets/bg6.png?w=320;640;960&format=avif&as=srcset";
import bg5Webp from "@/assets/bg6.png?w=320;640;960&format=webp&as=srcset";
import bg5Fallback from "@/assets/bg6.png?w=960&format=png&as=src";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";
const HEADER_H = 88;
const VIDEO_URL = "https://youtu.be/VZhCbEQUD-A?si=akJc1rkK_nx2LxL4";

type ImgSet = {
  key: string;      // уникальный ключ для алгоритма
  avif: string;     // srcset avif
  webp: string;     // srcset webp
  fallback: string; // обычный src
};

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * ✅ Сохраняем твою логику минимальных повторов,
 * но работаем по keys, а потом возвращаем ImgSet.
 */
function buildGridMinRepeats(images: ImgSet[], rows: number, cols: number) {
  const total = rows * cols;
  if (!images.length) return [];

  const byKey = new Map<string, ImgSet>();
  for (const im of images) byKey.set(im.key, im);

  const uniqueKeys = Array.from(new Set(images.map((i) => i.key)));
  const uniqLen = uniqueKeys.length;

  const outKeys: string[] = new Array(total);
  const prevRow = new Array<string | null>(cols).fill(null);

  for (let r = 0; r < rows; r++) {
    let pool = shuffle(uniqueKeys);
    const usedInRow = new Set<string>();

    for (let c = 0; c < cols; c++) {
      let pickKey: string | null = null;

      for (let i = 0; i < pool.length; i++) {
        const k = pool[i];
        if (usedInRow.has(k)) continue;
        if (prevRow[c] && k === prevRow[c]) continue;
        pickKey = k;
        pool.splice(i, 1);
        break;
      }

      if (!pickKey) {
        for (let i = 0; i < pool.length; i++) {
          const k = pool[i];
          if (usedInRow.has(k)) continue;
          pickKey = k;
          pool.splice(i, 1);
          break;
        }
      }

      if (!pickKey) pickKey = uniqueKeys[(Math.random() * uniqLen) | 0];

      usedInRow.add(pickKey);
      outKeys[r * cols + c] = pickKey;
    }

    for (let c = 0; c < cols; c++) prevRow[c] = outKeys[r * cols + c];
  }

  return outKeys.map((k) => byKey.get(k)!).filter(Boolean);
}

/** ✅ Вместо backgroundImage: url(...) используем picture+img cover */
function CoverPicture({
  sources,
  alt = "",
  eager = false,
  className = "",
  imgStyle,
}: {
  sources: ImgSet;
  alt?: string;
  eager?: boolean;
  className?: string;
  imgStyle?: React.CSSProperties;
}) {
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={sources.avif} />
      <source type="image/webp" srcSet={sources.webp} />
      <img
        src={sources.fallback}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 50%",
          transform: "translateZ(0)",
          ...imgStyle,
        }}
      />
    </picture>
  );
}

/** SplitText — оставляю (не используется) */
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

function GridMotionBg({ images }: { images: ImgSet[] }) {
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

                // ✅ Первые несколько делаем eager (чтобы герой не был пустым)
                const eager = idx < (isMobile ? 4 : 8);

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
                      <CoverPicture
                        sources={img}
                        eager={eager}
                        className="absolute inset-0"
                        imgStyle={{
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

function ScrollBadge() {
  const text = "узнать подробнее • узнать подробнее • ";

  return (
    <div className="relative h-[112px] w-[112px] sm:h-[160px] sm:w-[160px]">
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
        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
      </div>
    </div>
  );
}

/** ✅ ПК: аккуратные чипы в "стекле" (не огромные панели) */
function DesktopPainChips({
  title,
  items,
  align,
}: {
  title: string;
  items: string[];
  align: "left" | "right";
}) {
  const right = align === "right";

  return (
    <div
      className={[
        "w-[320px] lg:w-[360px]",
        "rounded-[22px]",
        "bg-black/18 backdrop-blur-md border border-white/14",
        "shadow-[0_18px_45px_rgba(0,0,0,0.22)]",
        "px-4 lg:px-5 py-4 lg:py-5",
      ].join(" ")}
      style={{ textAlign: right ? "right" : "left" }}
    >
      <div className="text-white/55 uppercase tracking-[0.22em] text-[11px] font-semibold">
        {title}
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {items.map((t) => (
          <div
            key={t}
            className={[
              "rounded-full",
              "px-4 py-2.5",
              "flex items-center gap-3",
              right ? "justify-end" : "justify-start",
            ].join(" ")}
          >
            {!right ? <span className="h-2 w-2 rounded-full bg-yellow-400" /> : null}
            <span className="text-yellow-300 font-extrabold tracking-tight text-[16px] lg:text-[17px] leading-none">
              {t}
            </span>
            {right ? <span className="h-2 w-2 rounded-full bg-yellow-400" /> : null}
          </div>
        ))}
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

  const painLeftMobile = ["Тревога", "Хаос в голове", "Выгорание"];
  const painRightMobile = [
    "Проблемы с деньгами",
    "Сложные отношения",
    "Стресс и здоровье",
    "Нет ясности",
  ];

  const painLeftDesktop = [
    "Тревога",
    "Хаос в голове",
    "Выгорание",
    "Прокрастинация",
    "Внутренний критик",
    "Постоянные сомнения",
  ];
  const painRightDesktop = [
    "Проблемы с деньгами",
    "Сложные отношения",
    "Стресс и здоровье",
    "Нет ясности",
    "Нет энергии",
    "Нет сил действовать",
  ];

  return (
    <div className="relative z-10 h-full w-full">
      <div
        className={[
          "h-full flex items-center justify-center",
          "px-3 sm:px-6 lg:px-8 xl:px-10",
          "pt-[calc(0.25rem+88px)] pb-6",
          "sm:pt-[calc(0.75rem+88px)] sm:pb-10",
          "lg:pt-[calc(0.75rem+88px)] lg:pb-10",
        ].join(" ")}
      >
        <div className="w-full">
          <div className="mx-auto w-full max-w-[1280px]">
            <div className="relative rounded-[26px] sm:rounded-[36px] lg:rounded-[44px] bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden shadow-2xl">
              <div className="px-5 sm:px-10 lg:px-12 py-10 sm:pt-14 sm:pb-24 lg:pt-14 lg:pb-28">
                <div className="mx-auto max-w-6xl text-center">
                  <motion.h2
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-sans font-extrabold tracking-tight text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]"
                  >
                    Академия счастья HAPPI10
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.08 }}
                    className="mt-4 sm:mt-8 text-white font-sans text-[14px] sm:text-lg md:text-xl leading-relaxed max-w-5xl mx-auto"
                  >
                    Если ты устал жить в тревоге и внутреннем хаосе — вот система из 10 элементов,
                    которая возвращает устойчивость и ясность.
                  </motion.p>

                  <div className="mt-7 sm:mt-10 flex justify-center">
                    <Button
                      size="xl"
                      onClick={goPrograms}
                      className="rounded-full px-10 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
                    >
                      О программе
                    </Button>
                  </div>

                  <div className="mt-7 sm:mt-12 flex justify-center">
                    <ScrollBadge />
                  </div>

                  <div className="sm:hidden pointer-events-none mt-6">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                      {[...painLeftMobile, ...painRightMobile].map((t) => (
                        <div
                          key={t}
                          className="text-yellow-300/95 font-semibold text-[12px] leading-tight drop-shadow"
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block pointer-events-none">
                <div className="absolute left-8 lg:left-10 bottom-8 lg:bottom-10">
                  <DesktopPainChips
                    title="что мешает жить"
                    items={painLeftDesktop}
                    align="left"
                  />
                </div>

                <div className="absolute right-8 lg:right-10 bottom-8 lg:bottom-10">
                  <DesktopPainChips
                    title="что забирает силы"
                    items={painRightDesktop}
                    align="right"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* /max-width wrapper */}
        </div>
      </div>
    </div>
  );
}

const Hero = () => {
  const bgImages = useMemo<ImgSet[]>(
    () => [
      { key: "t1", avif: t1Avif, webp: t1Webp, fallback: t1Fallback },
      { key: "t2", avif: t2Avif, webp: t2Webp, fallback: t2Fallback },
      { key: "t3", avif: t3Avif, webp: t3Webp, fallback: t3Fallback },
      { key: "t4", avif: t4Avif, webp: t4Webp, fallback: t4Fallback },
      { key: "t5", avif: t5Avif, webp: t5Webp, fallback: t5Fallback },
      { key: "t6", avif: t6Avif, webp: t6Webp, fallback: t6Fallback },

      { key: "bg1", avif: bg1Avif, webp: bg1Webp, fallback: bg1Fallback },
      { key: "bg2", avif: bg2Avif, webp: bg2Webp, fallback: bg2Fallback },
      { key: "bg3", avif: bg3Avif, webp: bg3Webp, fallback: bg3Fallback },
      { key: "bg4", avif: bg4Avif, webp: bg4Webp, fallback: bg4Fallback },
      { key: "bg5", avif: bg5Avif, webp: bg5Webp, fallback: bg5Fallback },
    ],
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