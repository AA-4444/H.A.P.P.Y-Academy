import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

type Offer = {
  id: string;
  label: string;
  title: string;
  price: string;
  bullets: string[];
  cta: string;
  tier: "free" | "low" | "mid" | "high"; // для сегментации
};

export default function Programs() {
  const offers: Offer[] = useMemo(
    () => [
      {
        id: "free",
        label: "FREE",
        title: "Вводный урок",
        price: "бесплатно",
        bullets: [
          "1 вводный урок: счастье как технология",
          "логика программы и реальные результаты",
          "кому подходит / кому не подходит",
          "возможность начать сразу",
        ],
        cta: "FREE ",
        tier: "free",
      },
      {
        id: "tripwire",
        label: "1 €",
        title: "Минимальный пакет",
        price: "1 €",
        bullets: [
          "доступ к первому практическому модулю",
          "1 задание + чеклист внедрения",
          "доступ на 7 дней",
          "быстрый старт без подготовки",
        ],
        cta: "Принять участие за $1",
        tier: "low",
      },
      {
        id: "club",
        label: "CLUB",
        title: "Клуб «Энергия и Счастье»",
        price: "49 € / месяц",
        bullets: [
          "курсы: «10 шагов», «Победитель лени», «Полный контроль»",
          "совместное чтение книг",
          "сообщество + Telegram-чат",
          "архив Zoom-сессий «Мастер Счастья»",
        ],
        cta: "Принять участие",
        tier: "mid",
      },
      {
        id: "master",
        label: "PRO",
        title: "«Мастер Счастья и Обучения»",
        price: "790 €",
        bullets: [
          "эксклюзивные материалы",
          "сертификат IPACT и Happiness Academy",
          "персональный коуч-куратор",
          "20 разборов от Ицхака + 40 разборов от коуча",
        ],
        cta: "Принять участие",
        tier: "high",
      },
    ],
    []
  );

  // Сегментированный порядок (не по алфавиту, а по смыслу)
  const segmented = useMemo(() => {
    const order: Offer["tier"][] = ["free", "low", "mid", "high"];
    return [...offers].sort((a, b) => order.indexOf(a.tier) - order.indexOf(b.tier));
  }, [offers]);

  return (
    <section id="programs" className="bg-[#F6F1E7]">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="max-w-4xl">
          <h2 className="font-sans font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.05]">
            Исследуйте продукты и программы
          </h2>
          <p className="mt-6 font-sans text-black/70 text-base sm:text-lg leading-relaxed">
            Превратите любой час вашего дня в возможность для трансформации с ресурсами
            от программы личного развития №1 в мире.
          </p>
        </div>

       {/* two cards */}
       <div className="mt-12 grid gap-6 lg:gap-8 lg:grid-cols-2 items-stretch">
         {/* 1 € — WHITE */}
         <motion.article
           whileHover={{ y: -4 }}
           transition={{ duration: 0.22, ease: "easeOut" }}
           className={[
             "rounded-[32px] sm:rounded-[40px] overflow-hidden",
             "bg-white border border-black/10",
             "shadow-[0_18px_50px_rgba(0,0,0,0.10)]",
           ].join(" ")}
         >
           <div className="p-8 sm:p-10 h-full flex flex-col">
             {/* top meta (без ценников сверху) */}
             <div className="text-[11px] tracking-[0.22em] uppercase font-sans font-semibold text-black/45">
               Быстрый старт
             </div>
       
             <h3 className="mt-4 font-sans font-extrabold tracking-tight text-2xl sm:text-3xl leading-tight text-black">
               Минимальный пакет
             </h3>
       
             {/* price */}
             <div className="mt-7">
               <div className="text-xs uppercase tracking-[0.18em] font-sans text-black/45">
                 Цена
               </div>
               <div className="mt-2 font-sans font-extrabold tracking-tight text-5xl sm:text-6xl text-black">
                 1 €
               </div>
             </div>
       
             {/* bullets */}
             <ul className="mt-7 space-y-3 font-sans text-base leading-relaxed text-black/70">
               {[
                 "доступ к первому практическому модулю",
                 "1 задание + чеклист внедрения",
                 "доступ на 7 дней",
                 "быстрый старт без подготовки",
               ].map((b, i) => (
                 <li key={i} className="flex gap-3">
                   <span className="mt-[9px] h-1.5 w-1.5 rounded-full shrink-0 bg-black/25" />
                   <span>{b}</span>
                 </li>
               ))}
             </ul>
       
             {/* CTA */}
             <div className="mt-auto pt-9">
               <button
                 type="button"
                 className={[
                   "w-full h-12 rounded-full",
                   "font-sans font-semibold",
                   "flex items-center justify-center gap-2",
                   "bg-yellow-400 text-black hover:bg-yellow-300 transition",
                   "shadow-[0_12px_30px_rgba(0,0,0,0.14)]",
                 ].join(" ")}
               >
                 Принять участие за 1 €
                 <ArrowRight className="h-5 w-5" />
               </button>
       
               
             </div>
           </div>
         </motion.article>
       
         {/* 49 € — YELLOW */}
         <motion.article
           whileHover={{ y: -4 }}
           transition={{ duration: 0.22, ease: "easeOut" }}
           className={[
             "rounded-[32px] sm:rounded-[40px] overflow-hidden",
             "bg-yellow-400",
             "border border-black/15",
             "shadow-[0_22px_70px_rgba(0,0,0,0.14)]",
           ].join(" ")}
         >
           <div className="p-8 sm:p-10 h-full flex flex-col">
           
             <div className="flex items-start justify-between gap-4">
               <div className="text-[11px] tracking-[0.22em] uppercase font-sans font-semibold text-black/55">
                 Клуб
               </div>
               <div className="text-[11px] tracking-[0.22em] uppercase font-sans font-semibold text-black/55">
                 Лучший выбор
               </div>
             </div>
       
             <h3 className="mt-4 font-sans font-extrabold tracking-tight text-2xl sm:text-3xl leading-tight text-black">
               Клуб «Энергия и Счастье»
             </h3>
       
             {/* price */}
             <div className="mt-7">
               <div className="text-xs uppercase tracking-[0.18em] font-sans text-black/55">
                 Цена
               </div>
               <div className="mt-2 font-sans font-extrabold tracking-tight text-5xl sm:text-6xl text-black">
                 49 € / месяц
               </div>
             </div>
       
             {/* bullets */}
             <ul className="mt-7 space-y-3 font-sans text-base leading-relaxed text-black/75">
               {[
                 "курсы: «10 шагов», «Победитель лени», «Полный контроль»",
                 "совместное чтение книг",
                 "сообщество + Telegram-чат",
                 "архив Zoom-сессий «Мастер Счастья»",
               ].map((b, i) => (
                 <li key={i} className="flex gap-3">
                   <span className="mt-[9px] h-1.5 w-1.5 rounded-full shrink-0 bg-black/30" />
                   <span>{b}</span>
                 </li>
               ))}
             </ul>
       
             {/* CTA (оранжевая, в твоём стиле) */}
             <div className="mt-auto pt-9">
               <button
                 type="button"
                 className={[
                   "w-full h-12 rounded-full",
                   "font-sans font-semibold",
                   "flex items-center justify-center gap-2",
                   "bg-[#E64B1E] text-white hover:opacity-95 transition",
                   "shadow-[0_12px_30px_rgba(0,0,0,0.18)]",
                 ].join(" ")}
               >
                 Вступить в клуб
                 <ArrowRight className="h-5 w-5" />
               </button>
       
               
             </div>
           </div>
         </motion.article>
       </div>
      </div>
    </section>
  );
}