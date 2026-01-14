import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Offer = {
  id: string;
  label: string; // маленький верхний бейдж
  title: string;
  price: string;
  bullets: string[]; // одинаковая высота карточек
  cta: string;
};

export default function Programs() {
  const offers: Offer[] = useMemo(
    () => [
      {
        id: "free",
        label: "FREE",
        title: "FREE — Вводный урок",
        price: "бесплатно",
        bullets: [
          "1 вводный урок: счастье как технология",
          "логика программы и реальные результаты",
          "кому подходит / кому не подходит",
          "возможность начать сразу",
        ],
        cta: "Записаться FREE на вводный урок",
      },
      {
        id: "tripwire",
        label: "$1",
        title: "$1 — Минимальный пакет",
        price: "$1",
        bullets: [
          "доступ к первому практическому модулю",
          "1 задание + чеклист внедрения",
          "доступ на 7 дней",
          "быстрый старт без подготовки",
        ],
        cta: "Принять участие за $1",
      },
      {
        id: "club",
        label: "CLUB",
        title: "Клуб «Энергия и Счастье»",
        price: "от 30 € / месяц",
        bullets: [
          "курсы: «10 шагов», «Победитель лени», «Полный контроль»",
          "совместное чтение книг",
          "сообщество + Telegram-чат",
          "архив Zoom-сессий «Мастер Счастья»",
        ],
        cta: "Принять участие",
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
      },
    ],
    []
  );

  return (
    <section className="bg-[#F7F3EE]">
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

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((o) => (
            <motion.article
              key={o.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={[
                "rounded-3xl bg-black/[0.03] border border-black/10",
                "p-7 sm:p-8",
                "flex flex-col min-h-[420px]",
              ].join(" ")}
            >
              <div className="text-[11px] tracking-[0.22em] font-sans uppercase text-black/50">
                {o.label}
              </div>

              <h3 className="mt-3 font-sans font-extrabold tracking-tight text-2xl sm:text-3xl text-black leading-tight">
                {o.title}
              </h3>

              <ul className="mt-6 space-y-3 text-black/70 font-sans text-base leading-relaxed">
                {o.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-black/35 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8 flex items-end justify-between gap-4">
                <div>
                  <div className="text-black/50 font-sans text-xs uppercase tracking-[0.18em]">
                    Цена
                  </div>
                  <div className="mt-1 font-sans font-bold text-lg sm:text-xl text-black">
                    {o.price}
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className={[
                    "h-11 w-11 rounded-full",
                    "bg-black text-white",
                    "flex items-center justify-center",
                    "shadow-[0_12px_30px_rgba(0,0,0,0.18)]",
                    "transition hover:opacity-90",
                  ].join(" ")}
                  aria-label={o.cta}
                  title={o.cta}
                  type="button"
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.article>
          ))}

          {/* Большая карточка — ТОЛЬКО фикс растяжения оранжевого блока */}
          <div className="md:col-span-2 lg:col-span-2 rounded-[28px] sm:rounded-[36px] border border-black/10 overflow-hidden">
            {/* ✅ было: items-stretch; добавил h-full */}
            <div className="grid lg:grid-cols-[360px_1fr] items-stretch h-full">
              {/* ✅ было: просто h-full; добавил flex flex-col чтобы растягивалось корректно */}
              <div className="bg-accent px-8 sm:px-10 py-10 sm:py-12 text-white h-full flex flex-col">
                <div className="font-sans font-extrabold text-3xl sm:text-4xl tracking-tight">
                  «Наставник. Быстрый старт»
                </div>

                <div className="mt-4 font-sans font-semibold text-2xl sm:text-3xl">
                  1290 €
                </div>

                {/* ✅ чтобы низ не “гулял”, можно прижать кнопку вниз */}
                <button
                  type="button"
                  className="mt-auto h-12 px-8 rounded-full bg-[#E64B1E] hover:opacity-95 transition font-sans font-semibold text-white"
                >
                  Принять участие / Оставить заявку
                </button>
              </div>

              {/* ✅ тоже h-full (на всякий) */}
              <div className="bg-white px-8 sm:px-10 py-10 sm:py-12 h-full">
                <div className="font-sans font-bold text-lg sm:text-xl text-black">
                  Что входит
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-6 md:gap-10">
                  <ul className="space-y-3 font-sans text-black/75 text-base leading-relaxed">
                    <li>— курс «Мастер счастья»</li>
                    <li>— 5 бонусных курсов</li>
                    <li>— доход в процессе обучения: 50% с клиентов</li>
                  </ul>

                  <ul className="space-y-3 font-sans text-black/75 text-base leading-relaxed">
                    <li>— поток заявок от Академии</li>
                    <li>— сопровождение: Ицхак, Анна Вовк, кураторы</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* конец большой карточки */}
        </div>
      </div>
    </section>
  );
}