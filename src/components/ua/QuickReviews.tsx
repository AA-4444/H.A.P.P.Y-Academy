import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import { Star } from "lucide-react";
import { useSpring } from "framer-motion";

const reviews = [
  {
    name: "Марія К.",
    role: "Підприємиця",
    text: "Я нарешті перестала ходити по колу. Іцхак дає не мотивацію, а чітку систему дій.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    name: "Дмитро П.",
    role: "IT-спеціаліст",
    text: "Я скептично ставився до подібних програм, але тут усе інакше. Це справді архітектура життя.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    name: "Олена С.",
    role: "Психологиня",
    text: "Я нарешті знайшла те, що шукала роками. Рівень внутрішнього стану та стійкості зріс кардинально.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    name: "Олексій В.",
    role: "Керівник",
    text: "Ця інвестиція повністю себе виправдала. Якість життя та ясність мислення вийшли на інший рівень.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    name: "Анна М.",
    role: "Коуч",
    text: "Клуб став моєю точкою опори. Зустрічі з Іцхаком — це глибока й сильна робота.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    name: "Ігор Л.",
    role: "Маркетолог",
    text: "Це одна з найсильніших інвестицій у себе. Я рекомендую цей формат усім, хто хоче системних змін.",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=200&h=200&q=80",
  },
];

function Card({ review }: { review: (typeof reviews)[number] }) {
  return (
    <div
      className={[
        "flex-shrink-0 flex flex-col rounded-3xl bg-white border border-black/10",
        "w-[280px] p-5",
        "h-[360px]",
        "sm:w-[360px] sm:p-6 sm:h-[400px]",
        "sm:shadow-[0_20px_60px_rgba(0,0,0,0.08)]",
      ].join(" ")}
    >
      <div className="flex gap-1 mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <p
        className={[
          "text-[15px] sm:text-base text-black/90 leading-relaxed mb-4",
          "overflow-hidden",
          "line-clamp-4 sm:line-clamp-5",
        ].join(" ")}
      >
        “{review.text}”
      </p>

      <div className="mt-auto flex items-center gap-3">
        <div className="w-9 h-9 rounded-full overflow-hidden ring-1 ring-black/10 bg-white">
          <img
            src={review.avatar}
            alt={review.name}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>

        <div className="min-w-0">
          <p className="font-semibold text-black text-sm truncate">
            {review.name}
          </p>
          <p className="text-xs text-black/60 truncate">
            {review.role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function QuickReviews() {
  const containerRef = useRef<HTMLDivElement>(null);

  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 768px)").matches;
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawX1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rawX2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const x1 = useSpring(rawX1, { stiffness: 60, damping: 20 });
  const x2 = useSpring(rawX2, { stiffness: 60, damping: 20 });

  return (
    <section
      ref={containerRef}
      id="reviews"
      className="relative bg-[#F6F1E7] text-black py-10 sm:py-12 lg:py-14 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-8 sm:mb-10">
        <h2 className="text-center font-sans font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
          Історії тих, хто вже побудував свою систему
        </h2>
      </div>

      {isMobile ? (
        <div className="flex gap-4 px-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
          {reviews.map((r, i) => (
            <div key={i} className="snap-start">
              <Card review={r} />
            </div>
          ))}
        </div>
      ) : (
        <>
          <motion.div style={{ x: x1, willChange: "transform" }} className="flex gap-6 mb-6 px-6 sm:px-8 lg:px-12">
            {[...reviews.slice(0, 3), ...reviews.slice(0, 3)].map((r, i) => (
              <Card key={`r1-${i}`} review={r} />
            ))}
          </motion.div>

          <motion.div style={{ x: x2 }} className="flex gap-6 px-6 sm:px-8 lg:px-12 -ml-48">
            {[...reviews.slice(3, 6), ...reviews.slice(3, 6)].map((r, i) => (
              <Card key={`r2-${i}`} review={r} />
            ))}
          </motion.div>
        </>
      )}
    </section>
  );
}