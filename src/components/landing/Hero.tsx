import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

import bg1 from '@/assets/bg1.png';
import bg3 from '@/assets/bg3.png';
import bg4 from '@/assets/bg4.png';
import bg5 from '@/assets/bg5.png';
import bg6 from '@/assets/bg6.png';
import bg7 from '@/assets/bg7.png';

const TELEGRAM_BOT_URL = 'https://t.me/happiness4people_bot';
const HEADER_H = 88;

/**
 * FULLSCREEN GRID MOTION BACKGROUND
 * - Desktop: mouse-driven
 * - Mobile: auto loop (smooth, infinite feel)
 * - Mobile tiles are wider (4 cols)
 * - Always loops through 28 items so it never feels like it ends
 */
function GridMotionBg({ images }: { images: string[] }) {
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mouseXRef = useRef<number>(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);

  const isMobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  const rows = 4;
  const cols = isMobile ? 4 : 7;

  const TOTAL_ITEMS = 28;

  const items = useMemo(() => {
    const arr: string[] = [];
    for (let i = 0; i < TOTAL_ITEMS; i++) arr.push(images[i % images.length]);
    return arr;
  }, [images]);

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

      // Mobile: autonomous smooth loop
      if (isMobile) {
        const t = performance.now() / 1000;
        const wave = 0.5 + 0.5 * Math.sin(t * 0.55);
        xForCalc = wave * w;
      }

      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const direction = index % 2 === 0 ? 1 : -1;

        const moveAmount = ((xForCalc / w) * maxMoveAmount - maxMoveAmount / 2) * direction;

        gsap.to(row, {
          x: moveAmount,
          duration: baseDuration + inertia[index % inertia.length],
          ease: 'power3.out',
          overwrite: 'auto',
        });
      });
    };

    gsap.ticker.add(updateMotion);

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('touchmove', handleTouchMoveDesktop, { passive: true });
    }

    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMoveDesktop);
      }
      gsap.ticker.remove(updateMotion);
    };
  }, [isMobile]);

  const gap = isMobile ? '0.75rem' : '1rem';
  const gridW = isMobile ? '210vw' : '150vw';
  const gridH = isMobile ? '210vh' : '150vh';

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* rotated grid */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: gridW,
          height: gridH,
          transform: 'translate(-50%, -50%) rotate(-15deg)',
          transformOrigin: 'center center',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap,
          }}
        >
          {[...Array(rows)].map((_, rowIndex) => (
            <div
              key={rowIndex}
              ref={(el) => (rowRefs.current[rowIndex] = el)}
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap,
                willChange: 'transform',
              }}
            >
              {[...Array(cols)].map((_, itemIndex) => {
                // desktop-like mapping for richer pattern, loop into 28
                const desktopLikeIndex = rowIndex * 7 + itemIndex;
                const img = items[desktopLikeIndex % items.length];

                return (
                  <div key={itemIndex} style={{ position: 'relative' }}>
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        borderRadius: 14,
                        backgroundColor: '#111',
                        border: '1px solid rgba(255,255,255,0.06)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url(${img})`,
                          backgroundSize: 'cover',
                          backgroundPosition: '50% 50%',
                          filter: 'saturate(1.05) contrast(1.05)',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background:
                            'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.55) 100%)',
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

      {/* tiny noise */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '180px 180px',
          opacity: 0.18,
        }}
      />
    </div>
  );
}

/**
 * Mobile-only: separate layout so buttons are perfectly centered
 */
function MobileContent() {
  return (
    <div className="lg:hidden relative z-10 h-full">
      <div className="h-full px-5 pt-[calc(1rem+88px)] pb-10 flex flex-col justify-end">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <h1 className="font-sans font-extrabold text-4xl text-white leading-[1.05] mb-5">
            Ты не застрял.
            <br />
            У твоей жизни просто нет архитектуры
            <span className="text-accent">.</span>
          </h1>

          <p className="font-sans text-base text-white/80 leading-relaxed mb-8 max-w-[46ch]">
            Система, которая помогает навести порядок в мышлении, решениях и действиях.
            <br />
            <span className="block mt-3 font-semibold text-white">Без мотивации.</span>
            <span className="block font-semibold text-white">Без иллюзий.</span>
            <span className="block font-semibold text-white">Только работающая структура.</span>
          </p>

          {/* ✅ Centered buttons on mobile */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-[360px] space-y-3">
              <Button
                size="xl"
                onClick={() => window.open(TELEGRAM_BOT_URL, '_blank')}
                className="w-full rounded-full px-10 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
              >
                Принять участие
              </Button>

              <Button
                size="xl"
                onClick={() => window.open(TELEGRAM_BOT_URL, '_blank')}
                className="w-full rounded-full px-10 bg-accent text-white hover:opacity-95 font-semibold"
              >
                Записаться FREE на вводный урок
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Desktop-only: keep your old positioning
 */
function DesktopContent() {
  return (
    <div className="hidden lg:block relative z-10 h-full">
      <div className="h-full px-14 pt-[calc(1rem+88px)] pb-14">
        <div className="h-full grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <h1 className="font-sans font-extrabold text-6xl xl:text-7xl text-white leading-[1.05] mb-6">
              Ты не застрял.
              <br />
              У твоей жизни просто нет архитектуры
              <span className="text-accent">.</span>
            </h1>

            <p className="font-sans text-lg text-white/80 max-w-[46ch] leading-relaxed [text-wrap:balance] mb-10">
              Система, которая помогает навести порядок в мышлении, решениях и действиях.
              <br />
              <span className="block mt-3 font-semibold text-white">Без мотивации.</span>
              <span className="block font-semibold text-white">Без иллюзий.</span>
              <span className="block font-semibold text-white">Только работающая структура.</span>
            </p>

            <div className="flex gap-4 items-center">
              <Button
                size="xl"
                onClick={() => window.open(TELEGRAM_BOT_URL, '_blank')}
                className="rounded-full px-10 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
              >
                Принять участие
              </Button>

              <Button
                size="xl"
                onClick={() => window.open(TELEGRAM_BOT_URL, '_blank')}
                className="rounded-full px-10 bg-accent text-white hover:opacity-95 font-semibold"
              >
                Записаться FREE на вводный урок
              </Button>
            </div>
          </motion.div>

          {/* keep empty right column to preserve composition */}
          <div />
        </div>
      </div>
    </div>
  );
}

const Hero = () => {
  const bgImages = useMemo(() => [bg4, bg5, bg7, bg1, bg3, bg6], []);

  // hard-block iOS pull-down bounce at top (prevents ugly reveal)
  useEffect(() => {
    const isMobile =
      typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) return;

    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches?.[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches?.[0]?.clientY ?? 0;
      const dy = y - startY;

      // block pull-down only when we're at top
      if (window.scrollY <= 0 && dy > 0) e.preventDefault();
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <section className="relative w-screen h-[100svh] overflow-hidden">
      {/* background grid */}
      <GridMotionBg images={bgImages} />

      {/* ✅ readability gradient (fullscreen, dark, soft) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/10" />
      </div>

      {/* content */}
      <MobileContent />
      <DesktopContent />

      {/* tiny border/noise optional */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10" />
    </section>
  );
};

export default Hero;