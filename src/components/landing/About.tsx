import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import author1 from "@/assets/1.jpg"; // фото с книгами (слева сверху)
import author2 from "@/assets/2.png"; // фото со сцены (справа большой блок)
import author3 from "@/assets/3.png"; // фото на беговой дорожке (слева снизу)


// 👇 добавь свои ассеты
import quoteBg from "@/assets/quote-bg.png"; // фоновое фото для цитаты (широкое)
import quoteAvatar from "@/assets/avatar.png"; // круглая аватарка

import reel1 from "@/assets/t1.jpg";
import reel2 from "@/assets/t2.png";
import reel3 from "@/assets/t3.jpg";
import reel4 from "@/assets/t4.png";
import reel5 from "@/assets/t5.jpg";
import reel6 from "@/assets/t6.png";

const About = () => {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-14 sm:py-16 lg:py-20">
        {/* ===================== TOP GRID ===================== */}
        <div className="grid lg:grid-cols-[460px_1fr] gap-10 lg:gap-14 items-start">
          {/* LEFT: photo card */}
          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={author1}
                alt="Ицхак Пинтосевич"
                className="w-full h-auto object-cover"
                draggable={false}
              />
            </div>
          </div>

          {/* RIGHT: title + rows */}
          <div>
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="font-sans font-extrabold tracking-tight text-5xl sm:text-6xl lg:text-7xl text-accent leading-[1.02]"
            >
              Ицхак Пинтосевич
            </motion.h2>

            {/* divider */}
            <div className="mt-8 h-px w-full bg-black/15" />

            {/* Row 1 */}
            <div className="py-8 grid sm:grid-cols-2 gap-6 sm:gap-10 items-start">
              <div className="font-sans font-bold text-2xl sm:text-3xl text-accent leading-snug">
                Международный
                <br />
                эксперт
              </div>
              <div className="font-sans text-black/70 text-base sm:text-lg leading-relaxed max-w-md">
                Эксперт в системном развитии личности и бизнеса
              </div>
            </div>
            <div className="h-px w-full bg-black/15" />

            {/* Row 2 */}
            <div className="py-8 grid sm:grid-cols-2 gap-6 sm:gap-10 items-start">
              <div className="font-sans font-bold text-2xl sm:text-3xl text-accent leading-snug">
                Более 2 миллионов
              </div>
              <div className="font-sans text-black/70 text-base sm:text-lg leading-relaxed max-w-md">
                Подписчиков в социальных сетях
              </div>
            </div>
            <div className="h-px w-full bg-black/15" />

            {/* Row 3 */}
            <div className="py-8 grid sm:grid-cols-2 gap-6 sm:gap-10 items-start">
              <div className="font-sans font-bold text-2xl sm:text-3xl text-accent leading-snug">
                Автор 15 книг-
                <br />
                бестселлеров
              </div>
              <div className="font-sans text-black/70 text-base sm:text-lg leading-relaxed max-w-md">
                Общий тираж более 1 млн экземпляров
              </div>
            </div>

            {/* Accent box */}
            <div className="mt-6 rounded-2xl bg-accent text-white px-7 sm:px-9 py-7 sm:py-8 font-sans font-semibold text-xl sm:text-2xl leading-snug">
              Основатель первой в мире Академии Счастья H.A.P.P.Y. с Гарвардской системой
              обучения
            </div>
          </div>
        </div>

        {/* ===================== SECOND GRID (как второй скрин) ===================== */}
        <div className="mt-14 sm:mt-16 grid lg:grid-cols-[460px_1fr] gap-10 lg:gap-14 items-start">
          {/* LEFT COLUMN: headings + text + bottom photo */}
          <div className="space-y-12">
            <div>
              <h3 className="font-sans font-extrabold text-3xl sm:text-4xl text-accent">
                Профессиональный коуч:
              </h3>

              <div className="mt-6 space-y-5 font-sans text-black/75 text-base sm:text-lg leading-relaxed">
                <p>Выпускник Международного Эриксоновского университета</p>
                <p>Президент самой масштабной ассоциации коучей в мире IPACT</p>
                <p>
                  Обучил <span className="text-accent font-semibold">5000+</span> коучей
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-sans font-extrabold text-3xl sm:text-4xl text-accent">
                Духовный лидер:
              </h3>
              <p className="mt-5 font-sans text-black/75 text-base sm:text-lg leading-relaxed">
                Более 20 лет изучает Тору и Каббалу в Иерусалиме
              </p>
            </div>

            <div>
              <h3 className="font-sans font-extrabold text-3xl sm:text-4xl text-accent">
                Успешный предприниматель:
              </h3>
              <p className="mt-5 font-sans text-black/75 text-base sm:text-lg leading-relaxed">
                С 26 лет управляет предприятиями с оборотом в миллионы долларов
              </p>
            </div>

            {/* bottom left photo */}
            <div className="overflow-hidden rounded-2xl">
              <img
                src={author3}
                alt="Ицхак Пинтосевич"
                className="w-full h-auto object-cover"
                draggable={false}
              />
            </div>
          </div>

          {/* RIGHT COLUMN: big image + story lines */}
          <div className="space-y-10">
            {/* big right image */}
            <div className="overflow-hidden rounded-2xl">
              <img
                src={author2}
                alt="Выступление"
                className="w-full h-auto object-cover"
                draggable={false}
              />
            </div>

            {/* story list (линии-разделители как на скрине) */}
            <div className="space-y-0">
              <StoryRow>
                До 47 лет гнался за сверхдостижениями, но понял, что счастья в ПОГОНЕ нет.
              </StoryRow>
              <StoryRow>
                Я был в ловушке, всё время гнался за чем-то, чтобы стать счастливым. И я не
                знал что может быть по-другому.
              </StoryRow>
              <StoryRow strong>С 16 лет я стал достигатором.</StoryRow>
              <StoryRow>
                В 19 лет я занял 3-е место НА ЧЕМПИОНАТЕ МИРА ПО БЕГУ среди юниоров.
              </StoryRow>
              <StoryRow>
                10 лет подряд собирал Мегатренинг — самый большой тренинг в Украине: 7000
                человек во Дворце спорта
              </StoryRow>
              <StoryRow>
                Я общался с самыми великими умами современности Арнольд Шварценеггер, Ник
                Вуйчич, Ричард Брэнсон, Евгений Черняк.
              </StoryRow>
              <StoryRow>
                В 2020 году я поступил на обучение в Йельский университет на курс который
                назывался “Наука благополучия”.
              </StoryRow>
              <StoryRow>
                В 2024 году основал первую в мире Академию Счастья H.A.P.P.Y. с Гарвардской
                системой обучения.
              </StoryRow>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== FULL SCREEN QUOTE (100vh) ===================== */}
      <QuoteFullscreen
        bg={quoteBg}
        avatar={quoteAvatar}
        name="Ицхак Пинтосевич"
        quote="“Я решил, что найду способ — как-нибудь, когда-нибудь — вернуть добро и передать его дальше.”"
       
      />
      
      <ReelCarousel />
    </section>
  );
};

export default About;

/* ===================== helpers ===================== */

function StoryRow({
  children,
  strong = false,
}: {
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="border-t border-black/15 py-5">
      <p
        className={[
          "font-sans leading-relaxed",
          strong ? "font-semibold text-black" : "text-black/80",
          "text-base sm:text-lg",
        ].join(" ")}
      >
        {children}
      </p>
    </div>
  );
}

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
     {/* content — ЕЩЁ ПРАВЕЕ (почти к краю, как на рефе Tony Robbins) */}
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
             className="mt-8 ml-auto max-w-[520px] font-sans text-white/75 text-base sm:text-lg leading-relaxed"
           >
             {subline}
           </motion.p>
         ) : null}
       </div>
     </div>
    </section>
  );
}


// ✅ ЗАМЕНИ ReelCarousel() НА ЭТОТ ВАРИАНТ
// - текст по центру
// - лента фоток шире (карточки больше по ширине)
// - плавный автоскролл (marquee) как в рефе, без “переключения”
// - циклично, бесконечно, можно перетаскивать мышкой/тачем

function ReelCarousel() {
  const slides = useMemo(
    () => [reel1, reel2, reel3, reel4, reel5, reel6],
    []
  );

  // дублируем список для бесконечной ленты
  const track = useMemo(() => [...slides, ...slides], [slides]);

  return (
    <section className="bg-black">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 overflow-hidden">
        {/* CENTER TEXT */}
        <h3 className="mx-auto max-w-5xl text-center font-sans font-extrabold tracking-tight text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.08]">
          Сейчас он автор бестселлеров и наставник, который изменил жизни миллионов.
        </h3>

        {/* MARQUEE */}
        <div className="mt-12 sm:mt-14">
          <motion.div
            className="flex gap-5 sm:gap-6 lg:gap-8 will-change-transform cursor-grab active:cursor-grabbing"
            // плавно “едем” влево на 50% (потому что список продублирован)
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 28, // скорость (меньше = быстрее)
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
                  // ✅ чуть больше по ширине как в рефе
                  "w-[320px] sm:w-[420px] lg:w-[520px]",
                  // “киношная” высота
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

        {/* optional fade edges like ref */}
        <div className="pointer-events-none absolute left-0 right-0 -mt-[340px] h-[340px]">
          <div className="absolute inset-y-0 left-0 w-20 sm:w-28 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute inset-y-0 right-0 w-20 sm:w-28 bg-gradient-to-l from-black to-transparent" />
        </div>
      </div>
    </section>
  );
}