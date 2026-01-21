import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
	name: "Мария К.",
	role: "Предприниматель",
	text: "За 3 недели я наконец-то перестала ходить по кругу. Ицхак даёт не мотивашки, а реальный план действий.",
	rating: 5,
	avatar:
	  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
	name: "Дмитрий П.",
	role: "IT-специалист",
	text: "Я скептически относился к подобным курсам, но здесь всё по-другому. Это действительно архитектура жизни.",
	rating: 5,
	avatar:
	  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
	name: "Елена С.",
	role: "Психолог",
	text: "Наконец-то нашла то, что искала годами. Мой уровень счастья вырос с 5 до 9 за 2 месяца.",
	rating: 5,
	avatar:
	  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
	name: "Алексей В.",
	role: "Руководитель",
	text: "Инвестиция окупилась уже в первый месяц — не деньгами, а качеством жизни.",
	rating: 5,
	avatar:
	  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
	name: "Анна М.",
	role: "Коуч",
	text: "Клуб стал моей точкой опоры. Zoom-сессии с Ицхаком — это мощно.",
	rating: 5,
	avatar:
	  "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
	name: "Игорь Л.",
	role: "Маркетолог",
	text: "Это была лучшая инвестиция в себя за последние 5 лет. Рекомендую всем.",
	rating: 5,
	avatar:
	  "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=200&h=200&q=80",
  },
];

const Card = ({ review }: { review: (typeof reviews)[number] }) => {
  return (
	<div className="flex-shrink-0 w-[400px] p-8 rounded-3xl bg-white border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] flex flex-col">
	  <div className="flex gap-1 mb-4">
		{[...Array(review.rating)].map((_, i) => (
		  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
		))}
	  </div>

	  {/* фиксируем место под текст, чтобы низ (аватар+имя) всегда был на одном уровне */}
	  <p className="text-lg text-black/90 leading-relaxed min-h-[132px] sm:min-h-[140px] mb-6">
		"{review.text}"
	  </p>

	  {/* всегда “прилипает” вниз карточки */}
	  <div className="mt-auto flex items-center gap-4">
		<div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-black/10 shadow-[0_12px_30px_rgba(0,0,0,0.12)] bg-white">
		  <img
			src={review.avatar}
			alt={review.name}
			className="h-full w-full object-cover"
			loading="lazy"
			decoding="async"
			referrerPolicy="no-referrer"
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
};

const QuickReviews = () => {
  const containerRef = useRef<HTMLDivElement>(null);
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
	  className="relative overflow-hidden bg-[#F6F1E7] text-black py-10 sm:py-12 lg:py-14"
	>
	  <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 mb-8 sm:mb-10">
		<motion.span
		  initial={{ opacity: 0, y: 10 }}
		  whileInView={{ opacity: 1, y: 0 }}
		  viewport={{ once: true }}
		  transition={{ duration: 0.6, ease: "easeOut" }}
		  className="text-xs sm:text-sm tracking-[0.22em] font-semibold text-black/60 mb-4 block text-center"
		>
		  Отзывы участников
		</motion.span>

		<motion.h2
		  initial={{ opacity: 0, y: 12 }}
		  whileInView={{ opacity: 1, y: 0 }}
		  viewport={{ once: true }}
		  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
		  className="mx-auto max-w-5xl text-center text-black leading-[1.05] font-sans font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
		>
		  Истории тех, кто уже{" "}
		  <span className="relative inline-block">
			<span className="relative z-[1]">построил свою систему</span>
			<span className="absolute -inset-x-2 bottom-[0.18em] h-[0.55em] rounded-full bg-yellow-300/70 -z-0" />
		  </span>
		</motion.h2>
	  </div>

	  <motion.div style={{ x: x1 }} className="flex gap-6 mb-6 px-6 sm:px-8 lg:px-12">
		{[...reviews.slice(0, 3), ...reviews.slice(0, 3)].map((review, index) => (
		  <Card key={`row1-${index}`} review={review} />
		))}
	  </motion.div>

	  <motion.div style={{ x: x2 }} className="flex gap-6 px-6 sm:px-8 lg:px-12 -ml-48">
		{[...reviews.slice(3, 6), ...reviews.slice(3, 6)].map((review, index) => (
		  <Card key={`row2-${index}`} review={review} />
		))}
	  </motion.div>
	</section>
  );
};

export default QuickReviews;