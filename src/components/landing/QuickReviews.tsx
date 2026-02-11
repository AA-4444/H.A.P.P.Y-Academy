import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
	name: "Мария К.",
	role: "Предприниматель",
	text: "Я наконец-то перестала ходить по кругу. Ицхак даёт не мотивацию, а чёткую систему действий.",
	rating: 5,
	avatar:
	  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
	name: "Дмитрий П.",
	role: "IT-специалист",
	text: "Я скептически относился к подобным программам, но здесь всё по-другому. Это действительно архитектура жизни.",
	rating: 5,
	avatar:
	  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
	name: "Елена С.",
	role: "Психолог",
	text: "Я наконец-то нашла то, что искала годами. Уровень внутреннего состояния и устойчивости вырос кардинально.",
	rating: 5,
	avatar:
	  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
	name: "Алексей В.",
	role: "Руководитель",
	text: "Эта инвестиция полностью себя оправдала. Качество жизни и ясность мышления вышли на другой уровень.",
	rating: 5,
	avatar:
	  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
	name: "Анна М.",
	role: "Коуч",
	text: "Клуб стал моей точкой опоры. Встречи с Ицхаком — это глубокая и сильная работа.",
	rating: 5,
	avatar:
	  "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
	name: "Игорь Л.",
	role: "Маркетолог",
	text: "Это одна из самых сильных инвестиций в себя. Я рекомендую этот формат всем, кто хочет системных изменений.",
	rating: 5,
	avatar:
	  "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=200&h=200&q=80",
  },
];

function Card({ review }: { review: (typeof reviews)[number] }) {
  return (
	<div
	  className="
		flex-shrink-0 flex flex-col rounded-3xl bg-white border border-black/10
		w-[320px] p-6
		sm:w-[400px] sm:p-8
		sm:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
	  "
	>
	  <div className="flex gap-1 mb-4">
		{Array.from({ length: review.rating }).map((_, i) => (
		  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
		))}
	  </div>

	  <p className="text-base sm:text-lg text-black/90 leading-relaxed min-h-[120px] sm:min-h-[140px] mb-6">
		“{review.text}”
	  </p>

	  <div className="mt-auto flex items-center gap-4">
		<div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-black/10 bg-white">
		  <img
			src={review.avatar}
			alt={review.name}
			className="h-full w-full object-cover"
			loading="lazy"
			decoding="async"
			draggable={false}
		  />
		</div>

		<div>
		  <p className="font-semibold text-black">{review.name}</p>
		  <p className="text-sm text-black/60">{review.role}</p>
		</div>
	  </div>
	</div>
  );
}

export default function QuickReviews() {
  const containerRef = useRef<HTMLDivElement>(null);

  const isMobile =
	typeof window !== "undefined" &&
	window.matchMedia("(max-width: 768px)").matches;

  const { scrollYProgress } = useScroll({
	target: containerRef,
	offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
	<section
	  ref={containerRef}
	  id="reviews"
	  className="relative bg-[#F6F1E7] text-black py-10 sm:py-12 lg:py-14 overflow-hidden"
	>
	  <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-8 sm:mb-10">
		<h2 className="text-center font-sans font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
		  Истории тех, кто уже построил свою систему
		</h2>
	  </div>

	  {isMobile && (
		<div className="flex gap-4 px-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
		  {reviews.map((r, i) => (
			<div key={i} className="snap-start">
			  <Card review={r} />
			</div>
		  ))}
		</div>
	  )}

	  {!isMobile && (
		<>
		  <motion.div
			style={{ x: x1 }}
			className="flex gap-6 mb-6 px-6 sm:px-8 lg:px-12"
		  >
			{[...reviews.slice(0, 3), ...reviews.slice(0, 3)].map((r, i) => (
			  <Card key={`r1-${i}`} review={r} />
			))}
		  </motion.div>

		  <motion.div
			style={{ x: x2 }}
			className="flex gap-6 px-6 sm:px-8 lg:px-12 -ml-48"
		  >
			{[...reviews.slice(3, 6), ...reviews.slice(3, 6)].map((r, i) => (
			  <Card key={`r2-${i}`} review={r} />
			))}
		  </motion.div>
		</>
	  )}
	</section>
  );
}