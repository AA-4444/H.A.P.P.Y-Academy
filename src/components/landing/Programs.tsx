import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Category = "All" | "Books" | "Digital" | "Journals" | "Supplements";

type Offer = {
  id: string;
  category: Exclude<Category, "All">;
  label: string; // маленький верхний бейдж как "DIGITAL"
  title: string;
  price: string;
  bullets: string[]; // держим одинаковое кол-во пунктов для одинаковой высоты
  cta: string;
};

export default function Programs() {
  const [tab, setTab] = useState<Category>("All");

  const offers: Offer[] = useMemo(
    () => [
      {
        id: "free-practicum",
        category: "Digital",
        label: "DIGITAL",
        title: "Бесплатный практикум",
        price: "FREE",
        bullets: [
          "10 доказанных элементов счастья",
          "4 видеоурока с заданиями",
          "Обратная связь по прогрессу",
          "Старт сразу после регистрации",
        ],
        cta: "Получить бесплатно",
      },
      {
        id: "club",
        category: "Digital",
        label: "DIGITAL",
        title: "Клуб «Энергия и Счастье»",
        price: "от 30 € / месяц",
        bullets: [
          "1 Zoom-сессия в месяц с Ицхаком",
          "Архив Zoom-сессий «Мастер Счастья»",
          "Три курса: «10 шагов», «Победитель», «Контроль»",
          "Комьюнити и Telegram-чат поддержки",
        ],
        cta: "Вступить",
      },
      {
        id: "master",
        category: "Digital",
        label: "DIGITAL",
        title: "Мастер Счастья и Обучения",
        price: "790 €",
        bullets: [
          "10 недель обучения и внедрения",
          "Разборы от Ицхака + разборы от коуча",
          "Доступ к эксклюзивным материалам",
          "Сертификат IPACT и Happiness Academy",
        ],
        cta: "Присоединиться",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (tab === "All") return offers;
    return offers.filter((o) => o.category === tab);
  }, [offers, tab]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        {/* ✅ ДОБАВИЛ ЗАГОЛОВОК (перевод) */}
        <div className="max-w-4xl">
          <h2 className="font-sans font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.05]">
            Исследуйте продукты и программы
          </h2>
          <p className="mt-6 font-sans text-black/70 text-base sm:text-lg leading-relaxed">
            Превратите любой час вашего дня в возможность для трансформации с ресурсами
            от программы личного развития №1 в мире.
          </p>
        </div>

        {/* ✅ УБРАЛ ФИЛЬТРЫ (табы) */}
        {/* Карточки как на референсе */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((o) => (
            <motion.article
              key={o.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={[
                "rounded-3xl bg-black/[0.03] border border-black/10",
                "p-7 sm:p-8",
                "flex flex-col min-h-[420px]", // одинаковая высота
              ].join(" ")}
            >
              {/* label */}
              <div className="text-[11px] tracking-[0.22em] font-sans uppercase text-black/50">
                {o.label}
              </div>

              {/* title */}
              <h3 className="mt-3 font-sans font-extrabold tracking-tight text-2xl sm:text-3xl text-black leading-tight">
                {o.title}
              </h3>

              {/* desc */}
              <ul className="mt-6 space-y-3 text-black/70 font-sans text-base leading-relaxed">
                {o.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-black/35 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* footer */}
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
        </div>

        {/* Большой блок “Наставник” как у тебя на скрине (ниже) */}
        <div className="mt-10 rounded-[28px] sm:rounded-[36px] border border-black/10 overflow-hidden">
          <div className="grid lg:grid-cols-[360px_1fr]">
            {/* left orange */}
            <div className="bg-accent px-8 sm:px-10 py-10 sm:py-12 text-white">
              <div className="font-sans font-extrabold text-3xl sm:text-4xl tracking-tight">
                Наставник
              </div>
              <div className="mt-4 font-sans font-semibold text-2xl sm:text-3xl">
                1290 €
              </div>

              <button
                type="button"
                className="mt-10 h-12 px-8 rounded-full bg-[#E64B1E] hover:opacity-95 transition font-sans font-semibold text-white"
              >
                Оставить заявку
              </button>
            </div>

            {/* right white */}
            <div className="bg-white px-8 sm:px-10 py-10 sm:py-12">
              <div className="font-sans font-bold text-lg sm:text-xl text-black">
                Быстрый старт
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-6 md:gap-10">
                <ul className="space-y-3 font-sans text-black/75 text-base leading-relaxed">
                  <li>— Курс «Мастер счастья» — основа методики «10 шагов к счастью»</li>
                  <li>— 5 бонусных курсов по продажам, влиянию и эффективности</li>
                  <li>— Доход уже в обучении: 50% с оплат клиентов и комиссия</li>
                  <li>— Готовый поток заявок от Академии (без рекламы и запусков)</li>
                </ul>

                <ul className="space-y-3 font-sans text-black/75 text-base leading-relaxed">
                  <li>— Пошаговая система помощи по готовому алгоритму</li>
                  <li>— Прокачка экспертности: навыки влияния, продаж, продвижения</li>
                  <li>— Гибкий онлайн-доход: совмещай с основной работой</li>
                  <li>— Работа по ценностям: экологично, без давления и шаблонов</li>
                </ul>
              </div>

              <div className="mt-8 text-black/55 font-sans text-sm">
                *Текст сокращён так, чтобы блоки выглядели ровно и аккуратно, как в референсе.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}