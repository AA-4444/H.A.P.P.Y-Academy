import { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";


type ImgSet = {
  key: string;
  avif: string;     // srcset
  webp: string;     // srcset
  fallback: string; // src
};

/* ===================== quote bg ===================== */
import quoteBgAvif from "@/assets/quote-bg.png?w=960;1280;1920&format=avif&as=srcset";
import quoteBgWebp from "@/assets/quote-bg.png?w=960;1280;1920&format=webp&as=srcset";
import quoteBgFallback from "@/assets/quote-bg.png?w=1920&format=png&as=src";

/* ===================== avatar ===================== */
import avatarAvif from "@/assets/avatar.png?w=80;120;160&format=avif&as=srcset";
import avatarWebp from "@/assets/avatar.png?w=80;120;160&format=webp&as=srcset";
import avatarFallback from "@/assets/avatar.png?w=160&format=png&as=src";

/* ===================== reels (t1..t6) ===================== */
import reel1Avif from "@/assets/t1.jpg?w=320;480;640;960&format=avif&as=srcset";
import reel1Webp from "@/assets/t1.jpg?w=320;480;640;960&format=webp&as=srcset";
import reel1Fallback from "@/assets/t1.jpg?w=960&format=jpg&as=src";

import reel2Avif from "@/assets/t2.png?w=320;480;640;960&format=avif&as=srcset";
import reel2Webp from "@/assets/t2.png?w=320;480;640;960&format=webp&as=srcset";
import reel2Fallback from "@/assets/t2.png?w=960&format=png&as=src";

import reel3Avif from "@/assets/t3.jpg?w=320;480;640;960&format=avif&as=srcset";
import reel3Webp from "@/assets/t3.jpg?w=320;480;640;960&format=webp&as=srcset";
import reel3Fallback from "@/assets/t3.jpg?w=960&format=jpg&as=src";

import reel4Avif from "@/assets/t4.png?w=320;480;640;960&format=avif&as=srcset";
import reel4Webp from "@/assets/t4.png?w=320;480;640;960&format=webp&as=srcset";
import reel4Fallback from "@/assets/t4.png?w=960&format=png&as=src";

import reel5Avif from "@/assets/t5.jpg?w=320;480;640;960&format=avif&as=srcset";
import reel5Webp from "@/assets/t5.jpg?w=320;480;640;960&format=webp&as=srcset";
import reel5Fallback from "@/assets/t5.jpg?w=960&format=jpg&as=src";

import reel6Avif from "@/assets/t6.png?w=320;480;640;960&format=avif&as=srcset";
import reel6Webp from "@/assets/t6.png?w=320;480;640;960&format=webp&as=srcset";
import reel6Fallback from "@/assets/t6.png?w=960&format=png&as=src";

const About = () => {
  const quoteBg: ImgSet = useMemo(
    () => ({
      key: "quoteBg",
      avif: quoteBgAvif,
      webp: quoteBgWebp,
      fallback: quoteBgFallback,
    }),
    []
  );

  const quoteAvatar: ImgSet = useMemo(
    () => ({
      key: "avatar",
      avif: avatarAvif,
      webp: avatarWebp,
      fallback: avatarFallback,
    }),
    []
  );

  const reels = useMemo<ImgSet[]>(
    () => [
      { key: "reel1", avif: reel1Avif, webp: reel1Webp, fallback: reel1Fallback },
      { key: "reel2", avif: reel2Avif, webp: reel2Webp, fallback: reel2Fallback },
      { key: "reel3", avif: reel3Avif, webp: reel3Webp, fallback: reel3Fallback },
      { key: "reel4", avif: reel4Avif, webp: reel4Webp, fallback: reel4Fallback },
      { key: "reel5", avif: reel5Avif, webp: reel5Webp, fallback: reel5Fallback },
      { key: "reel6", avif: reel6Avif, webp: reel6Webp, fallback: reel6Fallback },
    ],
    []
  );

  return (
    <section id="about" className="bg-white">
      <QuoteFullscreen
        bg={quoteBg}
        avatar={quoteAvatar}
        name="Ицхак Пинтосевич"
        quote="Архитектор Счастья"
        subline={`Психолог работает с прошлым.
Коуч - с целями.
Архитектор Счастья проектирует внутренний мир, в котором хорошо жить.

30+ лет практики
тысячи учеников
автор системного подхода к счастью
человек, который сначала построил свой дом, а потом начал помогать другим`}
        reels={reels}
      />

      {/* ✅ карусель как раньше, только НЕ на мобиле */}
      <div className="hidden sm:block">
        <ReelCarousel reels={reels} />
      </div>
    </section>
  );
};

export default About;

function goPrograms() {
  const el = document.getElementById("programs");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ===================== small helpers ===================== */

function CoverPicture({
  sources,
  alt = "",
  eager = false,
  className = "",
  imgClassName = "",
}: {
  sources: ImgSet;
  alt?: string;
  eager?: boolean;
  className?: string;
  imgClassName?: string;
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
        className={imgClassName}
        draggable={false}
      />
    </picture>
  );
}

/* ===================== FULLSCREEN QUOTE ===================== */

function QuoteFullscreen({
  bg,
  avatar,
  name,
  quote,
  subline,
  reels,
}: {
  bg: ImgSet;
  avatar: ImgSet;
  name: string;
  quote: string;
  subline?: string;
  reels: ImgSet[];
}) {
  const slides = useMemo(() => reels, [reels]);
  const track = useMemo(() => [...slides, ...slides], [slides]);

  const isTouch =
    typeof window !== "undefined" &&
    (navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* ✅ bg через picture + srcset */}
      <CoverPicture
        sources={bg}
        alt=""
        eager
        className="absolute inset-0"
        imgClassName="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/35" />

      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-16">
        {/* ===================== DESKTOP / TABLET ===================== */}
        <div className="hidden sm:block ml-auto max-w-[680px] text-right">
          <motion.blockquote
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className={[
              "font-sans font-extrabold text-white leading-[1.05] tracking-tight",
              "text-[30px] sm:text-4xl md:text-5xl lg:text-[56px]",
            ].join(" ")}
          >
            {quote}
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-6 sm:mt-7 flex items-center justify-end gap-3"
          >
            <div className="font-sans uppercase tracking-wide text-white/85 font-semibold text-[12px] sm:text-base">
              {name}
            </div>

            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full overflow-hidden ring-2 ring-white/30 relative">
              {/* ✅ avatar через picture */}
              <CoverPicture
                sources={avatar}
                alt={name}
                eager
                className="absolute inset-0"
                imgClassName="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {subline ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className={[
                "mt-7 sm:mt-8 ml-auto max-w-[520px] font-sans text-white/75 leading-relaxed whitespace-pre-line",
                "text-[13px] sm:text-lg",
              ].join(" ")}
            >
              {subline}
            </motion.p>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-8 sm:mt-10 flex justify-end"
          >
            <Button
              size="xl"
              variant="outline"
              onClick={goPrograms}
              className="rounded-full px-6 sm:px-10 border-white/40 text-white hover:bg-white/10"
            >
              Стать счастливым
            </Button>
          </motion.div>
        </div>

        {/* ===================== MOBILE ===================== */}
        <div className="sm:hidden w-full text-center">
          <motion.blockquote
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="font-sans font-extrabold text-white leading-[1.05] tracking-tight text-[28px]"
          >
            {quote}
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-5 flex items-center justify-center gap-3"
          >
            <div className="font-sans uppercase tracking-wide text-white/85 font-semibold text-[12px]">
              {name}
            </div>

            <div className="h-10 w-10 rounded-full overflow-hidden ring-2 ring-white/30 relative">
              <CoverPicture
                sources={avatar}
                alt={name}
                eager
                className="absolute inset-0"
                imgClassName="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </motion.div>

          {subline ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="mt-6 mx-auto max-w-[520px] font-sans text-white/75 leading-relaxed whitespace-pre-line text-[13px]"
            >
              {subline}
            </motion.p>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-7 flex justify-center"
          >
            <Button
              size="xl"
              variant="outline"
              onClick={goPrograms}
              className="rounded-full px-10 border-white/40 text-white hover:bg-white/10"
            >
              Стать счастливым
            </Button>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-7 mx-auto max-w-[330px] font-sans font-extrabold tracking-tight text-white text-[18px] leading-[1.15]"
          >
            Сейчас он автор бестселлеров и наставник, который изменил жизни миллионов.
          </motion.h3>

          {/* ✅ карусель */}
          <div className="mt-5 w-screen relative left-1/2 -translate-x-1/2 overflow-hidden">
            <motion.div
              className={[
                "flex gap-5 will-change-transform",
                isTouch ? "select-none" : "cursor-grab active:cursor-grabbing",
                "translate-z-0 px-4",
              ].join(" ")}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
              drag={isTouch ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.06}
            >
              {track.map((img, i) => (
                <div
                  key={`${img.key}-${i}`}
                  className={[
                    "relative shrink-0 overflow-hidden",
                    "rounded-[26px] ring-1 ring-white/10 bg-white/5",
                    "w-[300px] h-[210px]",
                  ].join(" ")}
                >
                  <CoverPicture
                    sources={img}
                    alt=""
                    className="absolute inset-0"
                    imgClassName="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== DESKTOP REEL CAROUSEL ===================== */

function ReelCarousel({ reels }: { reels: ImgSet[] }) {
  const slides = useMemo(() => reels, [reels]);
  const track = useMemo(() => [...slides, ...slides], [slides]);

  const isTouch =
    typeof window !== "undefined" &&
    (navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches);

  return (
    <section className="bg-black">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden relative">
        <h3 className="mx-auto max-w-5xl text-center font-sans font-extrabold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.08]">
          Сейчас он автор бестселлеров и наставник, который изменил жизни миллионов.
        </h3>

        <div className="mt-12 sm:mt-14">
          <motion.div
            className={[
              "flex gap-5 sm:gap-6 lg:gap-8 will-change-transform",
              isTouch ? "select-none" : "cursor-grab active:cursor-grabbing",
              "translate-z-0",
            ].join(" ")}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
            drag={isTouch ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.06}
          >
            {track.map((img, i) => (
              <div
                key={`${img.key}-${i}`}
                className={[
                  "relative shrink-0 overflow-hidden",
                  "rounded-[28px] sm:rounded-[34px] lg:rounded-[40px]",
                  "ring-1 ring-white/10 bg-white/5",
                  "w-[320px] sm:w-[420px] lg:w-[520px]",
                  "h-[250px] sm:h-[320px] lg:h-[380px]",
                ].join(" ")}
              >
                <CoverPicture
                  sources={img}
                  alt=""
                  className="absolute inset-0"
                  imgClassName="absolute inset-0 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="pointer-events-none absolute left-0 right-0 top-[calc(50%+120px)] h-[380px]">
          <div className="absolute inset-y-0 left-0 w-20 sm:w-28 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute inset-y-0 right-0 w-20 sm:w-28 bg-gradient-to-l from-black to-transparent" />
        </div>
      </div>
    </section>
  );
}