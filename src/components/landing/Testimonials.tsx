import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* =========================
   АССЕТЫ (подставь свои)
   ========================= */
// круглые аватарки (как на скринах сверху)
import avaNatalya from "@/assets/v1.png";
import avaOlga from "@/assets/v2.png";
import avaGalina from "@/assets/v3.png";
import avaVera from "@/assets/v4.png";
import avaVer from "@/assets/v5.png";
import avaVe from "@/assets/v6.png";
import avaV from "@/assets/v7.png";

// нижние “карточки/фото” (как на скрине с ТЕХНОНИКОЛЬ / BIG MONEY / KUPIVIP.RU)
import reel1 from "@/assets/t1.jpg";
import reel2 from "@/assets/t2.png";
import reel3 from "@/assets/t3.jpg";
import reel4 from "@/assets/t4.png";
import reel5 from "@/assets/t5.jpg";
import reel6 from "@/assets/t6.png";

export default function Testimonials() {
  const testimonials = useMemo(
    () => [
      {
        id: "natalya",
        avatar: avaNatalya,
        name: "Наталья Себало",
        text: `Программа очень крутая. Вспоминаю себя до программы. Ни одно дело или сделку я не могла провести легко и с первого раза: то документа не хватает, то срок вышел, то ещё какая-то причина. Мне всё надо было идеально и я копала себе проблемы и, конечно, находила их. По той же причине всю работу взваливала на себя, так как другим не доверяла и как следствие не делегировала. В итоге уставала и ...`,
      },
      {
        id: "olga",
        avatar: avaOlga,
        name: "Ольга Антонова",
        text: `В 2017 году я столкнулась с серьезным заболеванием — системной красной волчанкой. Болезнь порядком меня шокировала. Но вся “красота процесса” раскрылась мне только на 5–7-й год болезни. На тот момент я уже перепробовала все диеты. Но не могу сказать, что прям увидела взаимосвязь с моим состоянием. Единственное, что я знала точно, что до болезни я испытывала состояние счастья. А с волчанкой потеряла его.`,
      },
      {
        id: "galina",
        avatar: avaGalina,
        name: "Галина Косенко",
        text: `Сегодня я закончила курс МАСТЕР СЧАСТЬЯ. Благодарю Господа, что он свел меня с Ицхаком! Благодарю Господа, что он наделил такой миссией Ицхака, делать людей счастливее, не смотря ни на что. Это большое счастье встретится и общаться с таким счастливым человеком, как Ицхак. Курс МАСТЕР СЧАСТЬЯ я зашла в самый тяжелый момент своей жизни, когда у меня обнаружили онкологию и мир потух, паника и ...`,
      },
      {
        id: "vera",
        avatar: avaVera,
        name: "Вера Воробьева",
        text: `До курса моя проблема была в том, что не было ощущения радости. Я воспитываю троих детей, являюсь руководителем агентства недвижимости — но радости в тот момент очень не хватало. Как только я начала проходить курс, с первых 4 дней бесплатно, моя жизнь начала меняться в лучшую сторону! Произошли большие изменения, и я теперь за все благодарю и делаю комплименты людям. С благодарностью принимаю все, что приносит мне радость и ...`,
      },
      {
        id: "vera",
        avatar: avaVer,
        name: "Вера Воробьева",
        text: `До курса моя проблема была в том, что не было ощущения радости. Я воспитываю троих детей, являюсь руководителем агентства недвижимости — но радости в тот момент очень не хватало. Как только я начала проходить курс, с первых 4 дней бесплатно, моя жизнь начала меняться в лучшую сторону! Произошли большие изменения, и я теперь за все благодарю и делаю комплименты людям. С благодарностью принимаю все, что приносит мне радость и ...`,
      },
      {
        id: "vera",
        avatar: avaVe,
        name: "Вера Воробьева",
        text: `До курса моя проблема была в том, что не было ощущения радости. Я воспитываю троих детей, являюсь руководителем агентства недвижимости — но радости в тот момент очень не хватало. Как только я начала проходить курс, с первых 4 дней бесплатно, моя жизнь начала меняться в лучшую сторону! Произошли большие изменения, и я теперь за все благодарю и делаю комплименты людям. С благодарностью принимаю все, что приносит мне радость и ...`,
      },
      {
        id: "vera",
        avatar: avaV,
        name: "Вера Воробьева",
        text: `До курса моя проблема была в том, что не было ощущения радости. Я воспитываю троих детей, являюсь руководителем агентства недвижимости — но радости в тот момент очень не хватало. Как только я начала проходить курс, с первых 4 дней бесплатно, моя жизнь начала меняться в лучшую сторону! Произошли большие изменения, и я теперь за все благодарю и делаю комплименты людям. С благодарностью принимаю все, что приносит мне радость и ...`,
      },



      // можно оставить “мужские” как отдельные цитаты — они будут в нижней ленте фото
    ],
    []
  );

  // нижняя лента фото — “как на референсе”, бесконечно и плавно
  const reel = useMemo(() => [reel1, reel2, reel3, reel4, reel5, reel6], []);

  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isHovering) return;

    intervalRef.current = window.setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, 5200);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isHovering, testimonials.length]);

  const t = testimonials[active];

  return (
    <section id="reviews" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
        {/* верхний маркер (как у Tony) */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-xs tracking-[0.22em] font-semibold text-black/60">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            ОТЗЫВЫ
          </div>
        </div>

        {/* центральный текст */}
        <div className="mt-10 sm:mt-12 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <h3 className="font-sans font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl text-black leading-[1.05]">
                {t.name}
              </h3>

              <p className="mt-6 mx-auto max-w-4xl font-sans text-black/80 text-base sm:text-lg md:text-xl leading-relaxed">
                {t.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ряд “людей” — hover меняет отзыв + автопереключение */}
        <div
          className="mt-10 sm:mt-12"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="mx-auto max-w-5xl overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-center gap-8 sm:gap-10 min-w-max px-2">
              {testimonials.map((p, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group flex flex-col items-center gap-3 focus:outline-none"
                    aria-label={`Показать отзыв: ${p.name}`}
                  >
                    <div
                      className={[
                        "h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden",
                        "ring-2 transition",
                        isActive ? "ring-accent" : "ring-black/10 group-hover:ring-black/25",
                      ].join(" ")}
                    >
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </div>

                    <div
                      className={[
                        "text-center font-sans font-semibold text-xs sm:text-sm leading-tight transition",
                        isActive ? "text-black" : "text-black/55 group-hover:text-black/75",
                      ].join(" ")}
                    >
                      {p.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

    
    </section>
  );
}
