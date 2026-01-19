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
    <section id="programs" className="bg-[#F7F3EE]">
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

        {/* =======================
            1) Segmented strip
           ======================= */}
        <div className="mt-12">
          <div className="rounded-[32px] border border-black/10 bg-white overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-4">
              {segmented.map((o, idx) => {
                const isLast = idx === segmented.length - 1;
                const isFirst = idx === 0;

                // маленькие отличия по фону сегмента
                const segmentBg =
                  o.tier === "high"
                    ? "bg-black text-white"
                    : o.tier === "mid"
                    ? "bg-black/[0.03]"
                    : "bg-white";

                const labelTone =
                  o.tier === "high" ? "text-white/70" : "text-black/50";
                const textTone =
                  o.tier === "high" ? "text-white" : "text-black";
                const mutedTone =
                  o.tier === "high" ? "text-white/80" : "text-black/70";

                const divider =
                  "border-black/10 md:border-r md:last:border-r-0";

                return (
                  <motion.article
                    key={o.id}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className={[
                      "p-7 sm:p-8 min-h-[380px] flex flex-col",
                      segmentBg,
                      divider,
                      isFirst ? "lg:rounded-l-[32px]" : "",
                      isLast ? "lg:rounded-r-[32px]" : "",
                    ].join(" ")}
                  >
                    {/* label */}
                    <div className={`text-[11px] tracking-[0.22em] font-sans uppercase ${labelTone}`}>
                      {o.label}
                    </div>

                    {/* title */}
                    <h3 className={`mt-3 font-sans font-extrabold tracking-tight text-2xl sm:text-3xl leading-tight ${textTone}`}>
                      {o.title}
                    </h3>

                    {/* PRICE - main accent */}
                    <div className="mt-6">
                      <div className={`text-xs uppercase tracking-[0.18em] font-sans ${labelTone}`}>
                        Цена
                      </div>

                      <div
                        className={[
                          "mt-2 font-sans font-extrabold tracking-tight",
                          o.tier === "high"
                            ? "text-4xl sm:text-5xl"
                            : "text-3xl sm:text-4xl",
                          textTone,
                        ].join(" ")}
                      >
                        {o.price}
                      </div>
                    </div>

                    {/* bullets */}
                    <ul className={`mt-6 space-y-3 font-sans text-base leading-relaxed ${mutedTone}`}>
                      {o.bullets.map((b, i) => (
                        <li key={i} className="flex gap-3">
                          <span
                            className={[
                              "mt-[9px] h-1.5 w-1.5 rounded-full shrink-0",
                              o.tier === "high" ? "bg-white/40" : "bg-black/35",
                            ].join(" ")}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-auto pt-8">
                      <button
                        type="button"
                        className={[
                          "w-full h-12 rounded-full font-sans font-semibold",
                          "flex items-center justify-center gap-2",
                          o.tier === "high"
                            ? "bg-white text-black hover:opacity-95"
                            : "bg-black text-white hover:opacity-90",
                          "transition shadow-[0_12px_30px_rgba(0,0,0,0.14)]",
                        ].join(" ")}
                      >
                        {o.cta}
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>

        {/* =======================
            2) Premium BIG card (always the biggest)
           ======================= */}
        <div className="mt-10">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="rounded-[32px] sm:rounded-[40px] border border-black/10 overflow-hidden bg-white"
          >
            <div className="grid lg:grid-cols-[420px_1fr] items-stretch">
              {/* LEFT — premium price block */}
              <div className="bg-accent px-8 sm:px-10 py-10 sm:py-12 text-white h-full flex flex-col">
                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-[11px] tracking-[0.22em] uppercase font-sans font-semibold">
                      PREMIUM
                    </span>
                  </div>

                  <div className="text-[11px] tracking-[0.22em] uppercase font-sans font-semibold text-white/80">
                    Самый полный пакет
                  </div>
                </div>

                <div className="mt-8 font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.05]">
                  «Наставник.
                  <br />
                  Быстрый старт»
                </div>

                {/* BIG PRICE */}
                <div className="mt-6 font-sans font-extrabold tracking-tight text-5xl sm:text-6xl">
                  1290 €
                </div>

             <div className="mt-5 font-sans text-white/85 text-base leading-relaxed max-w-[42ch]">
               Максимум поддержки + быстрый запуск. Если хочешь “сразу в результат” — это сюда.
             </div>
             
             {/* spacer, чтобы кнопка никогда не наезжала */}
             <div className="mt-8" />
             
             <button
               type="button"
               className={[
                 "mt-auto h-12 px-8 rounded-full",
                 "bg-yellow-400 text-black hover:bg-yellow-300",
                 "transition font-sans font-semibold",
                 "shadow-[0_12px_30px_rgba(0,0,0,0.18)]",
                 "flex items-center justify-center gap-2",
                 "whitespace-nowrap",
               ].join(" ")}
             >
               Принять участие
               <ArrowRight className="h-5 w-5" />
             </button>
              </div>

              {/* RIGHT — content */}
              <div className="bg-white px-8 sm:px-10 py-10 sm:py-12 h-full">
                <div className="font-sans font-extrabold text-2xl sm:text-3xl text-black tracking-tight">
                  Что входит
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-6 md:gap-10">
                  <ul className="space-y-3 font-sans text-black/75 text-base leading-relaxed">
                    <li>— курс «Мастер счастья»</li>
                    <li>— 5 бонусных курсов</li>
                    <li>— доход в процессе обучения: 50% с клиентов</li>
                    <li>— персональный маршрут внедрения</li>
                  </ul>

                  <ul className="space-y-3 font-sans text-black/75 text-base leading-relaxed">
                    <li>— поток заявок от Академии</li>
                    <li>— сопровождение: Ицхак, Анна Вовк, кураторы</li>
                    <li>— разборы + контроль прогресса</li>
                    <li>— доступ к материалам и записям</li>
                  </ul>
                </div>

                <div className="mt-10 rounded-2xl border border-black/10 bg-black/[0.03] p-6">
                  <div className="font-sans font-bold text-black">
                    Для кого этот пакет
                  </div>
                  <div className="mt-2 font-sans text-black/70 leading-relaxed">
                    Для тех, кто не хочет “пробовать”, а хочет собрать систему и получить результат
                    быстрее с поддержкой.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}