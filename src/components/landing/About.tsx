import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import author1 from "@/assets/1.jpg";
import author2 from "@/assets/2.png";
import author3 from "@/assets/3.png";

import quoteBg from "@/assets/quote-bg.png";
import quoteAvatar from "@/assets/avatar.png";

import reel1 from "@/assets/t1.jpg";
import reel2 from "@/assets/t2.png";
import reel3 from "@/assets/t3.jpg";
import reel4 from "@/assets/t4.png";
import reel5 from "@/assets/t5.jpg";
import reel6 from "@/assets/t6.png";

import { Button } from "@/components/ui/button";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";

const About = () => {
  return (
    <section id="about" className="bg-white">
      {/* ===================== FULL SCREEN QUOTE (100vh) ===================== */}
      <QuoteFullscreen
        bg={quoteBg}
        avatar={quoteAvatar}
        name="7) Эксперт"
        quote="Архитектор Счастья"
        subline={`Ицхак Пинтосевич — практик, который работает с мышлением, смыслами и внедрением.
15 лет трансформационной практики
25 лет преподавания Торы
позитивная психология + практическое внедрение
создатель системы «10 шагов к счастью»`}
      />

      <ReelCarousel />
    </section>
  );
};

export default About;

/* ===================== FULLSCREEN QUOTE ===================== */

function QuoteFullscreen({
  bg,
  avatar,
  name,
  quote,
  subline,
}: {
  bg: string;
  avatar: string;
  name: string;
  quote: string;
  subline?: string;
}) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* bg image */}
      <img
        src={bg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* overlay gradients like Tony */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/35" />

      {/* content */}
      <div className="relative z-10 h-full flex flex-col justify-center pr-6 sm:pr-10 lg:pr-16">
        {/* RIGHT STACK */}
        <div className="ml-auto max-w-[680px] text-right">
          <motion.blockquote
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="font-sans font-extrabold text-white leading-[1.05] tracking-tight
                       text-3xl sm:text-4xl md:text-5xl lg:text-[56px]"
          >
            {quote}
          </motion.blockquote>

          {/* avatar + name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-7 flex items-center justify-end gap-3"
          >
            <div className="font-sans uppercase tracking-wide text-white/85 font-semibold text-sm sm:text-base">
              {name}
            </div>
            <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full overflow-hidden ring-2 ring-white/30">
              <img
                src={avatar}
                alt={name}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
          </motion.div>

          {/* subline */}
          {subline ? (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="mt-8 ml-auto max-w-[520px] font-sans text-white/75 text-base sm:text-lg leading-relaxed whitespace-pre-line"
            >
              {subline}
            </motion.p>
          ) : null}

          {/* ✅ КНОПКА ИЗ ТЗ (добавил, структуру не менял) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-10 flex justify-end"
          >
            <Button
              size="xl"
              variant="outline"
              onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
              className="rounded-full px-10 border-white/40 text-white hover:bg-white/10"
            >
              Записаться FREE на вводный урок
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// --------- ReelCarousel без изменений ---------

function ReelCarousel() {
  const slides = useMemo(() => [reel1, reel2, reel3, reel4, reel5, reel6], []);
  const track = useMemo(() => [...slides, ...slides], [slides]);

  return (
    <section className="bg-black">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden">
        <h3 className="mx-auto max-w-5xl text-center font-sans font-extrabold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.08]">
          Сейчас он автор бестселлеров и наставник, который изменил жизни миллионов.
        </h3>

        <div className="mt-12 sm:mt-14">
          <motion.div
            className="flex gap-5 sm:gap-6 lg:gap-8 will-change-transform cursor-grab active:cursor-grabbing"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 28,
              ease: "linear",
              repeat: Infinity,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.06}
          >
            {track.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className={[
                  "relative shrink-0 overflow-hidden",
                  "rounded-[28px] sm:rounded-[34px] lg:rounded-[40px]",
                  "ring-1 ring-white/10 bg-white/5",
                  "w-[320px] sm:w-[420px] lg:w-[520px]",
                  "h-[220px] sm:h-[280px] lg:h-[340px]",
                ].join(" ")}
              >
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="pointer-events-none absolute left-0 right-0 -mt-[340px] h-[340px]">
          <div className="absolute inset-y-0 left-0 w-20 sm:w-28 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute inset-y-0 right-0 w-20 sm:w-28 bg-gradient-to-l from-black to-transparent" />
        </div>
      </div>
    </section>
  );
}