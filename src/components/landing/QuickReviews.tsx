import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const reviews = [
  {
	name: "Мария К.",
	role: "Предприниматель",
	text: "За 3 недели я наконец-то перестала ходить по кругу. Ицхак даёт не мотивашки, а реальный план действий.",
	rating: 5,
  },
  {
	name: "Дмитрий П.",
	role: "IT-специалист",
	text: "Я скептически относился к подобным курсам, но здесь всё по-другому. Это действительно архитектура жизни.",
	rating: 5,
  },
  {
	name: "Елена С.",
	role: "Психолог",
	text: "Наконец-то нашла то, что искала годами. Мой уровень счастья вырос с 5 до 9 за 2 месяца.",
	rating: 5,
  },
  {
	name: "Алексей В.",
	role: "Руководитель",
	text: "Инвестиция окупилась уже в первый месяц — не деньгами, а качеством жизни.",
	rating: 5,
  },
  {
	name: "Анна М.",
	role: "Коуч",
	text: "Клуб стал моей точкой опоры. Zoom-сессии с Ицхаком — это мощно.",
	rating: 5,
  },
  {
	name: "Игорь Л.",
	role: "Маркетолог",
	text: "Это была лучшая инвестиция в себя за последние 5 лет. Рекомендую всем.",
	rating: 5,
  },
];

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
		  <div
			key={index}
			className="flex-shrink-0 w-[400px] p-8 rounded-3xl bg-white border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
		  >
			<div className="flex gap-1 mb-4">
			  {[...Array(review.rating)].map((_, i) => (
				<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
			  ))}
			</div>

			<p className="text-lg text-black/90 mb-6 leading-relaxed">
			  "{review.text}"
			</p>

			<div className="flex items-center gap-4">
			  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
				<span className="text-black font-bold">{review.name[0]}</span>
			  </div>

			  <div>
				<p className="font-semibold text-black">{review.name}</p>
				<p className="text-sm text-black/60">{review.role}</p>
			  </div>
			</div>
		  </div>
		))}
	  </motion.div>

	  <motion.div style={{ x: x2 }} className="flex gap-6 px-6 sm:px-8 lg:px-12 -ml-48">
		{[...reviews.slice(3, 6), ...reviews.slice(3, 6)].map((review, index) => (
		  <div
			key={index}
			className="flex-shrink-0 w-[400px] p-8 rounded-3xl bg-white border border-black/10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
		  >
			<div className="flex gap-1 mb-4">
			  {[...Array(review.rating)].map((_, i) => (
				<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
			  ))}
			</div>

			<p className="text-lg text-black/90 mb-6 leading-relaxed">
			  "{review.text}"
			</p>

			<div className="flex items-center gap-4">
			  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-500 flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
				<span className="text-black font-bold">{review.name[0]}</span>
			  </div>

			  <div>
				<p className="font-semibold text-black">{review.name}</p>
				<p className="text-sm text-black/60">{review.role}</p>
			  </div>
			</div>
		  </div>
		))}
	  </motion.div>
	</section>
  );
};

export default QuickReviews;