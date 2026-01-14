import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";


import slide1 from "@/assets/bg3.png";
import slide2 from "@/assets/bg4.png";
import slide3 from "@/assets/bg5.png";
import slide4 from "@/assets/bg6.png";
import slide5 from "@/assets/bg7.png";

const HappyAcademySection = () => {
  const slides = useMemo(() => [slide1, slide2, slide3, slide4, slide5], []);

  return (
	<section className="bg-black">
	  <div className="mx-auto w-full px-3 sm:px-4 lg:px-6 py-10 sm:py-12 space-y-10 sm:space-y-12">
		{/* =========================
			1) ВЕРХНИЙ БЕЛЫЙ БЛОК (ТОЛЬКО ТЕКСТ)
		   ========================= */}
		<div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-white overflow-hidden">
		  <div className="px-6 sm:px-10 lg:px-14 py-12 sm:py-14 lg:py-16">
			<div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
			  {/* LEFT BIG TITLE */}
			  <div className="max-w-xl">
				<h2 className="font-sans font-extrabold tracking-tight text-[44px] leading-[1.02] sm:text-6xl md:text-7xl text-black">
				  10 шагов
				  <br />
				  к счастью
				  <span className="align-super text-2xl md:text-3xl ml-2">©</span>
				</h2>
			  </div>

			  {/* RIGHT TEXT + BUTTON */}
			  <div className="max-w-2xl">
				<p className="font-sans text-black/70 text-base sm:text-lg leading-relaxed">
				  «10 Шагов к Счастью» — это технология Ицхака Пинтосевича, которая дает
				  контроль над жизнью и состоянием, независимо от внешних обстоятельств.
				</p>

				<div className="mt-8">
				  <Button
					size="lg"
					className="h-12 px-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
				  >
					Узнать подробнее
				  </Button>
				</div>
			  </div>
			</div>
		  </div>
		</div>

		{/* =========================
			2) ОРАНЖЕВЫЙ БЛОК (как было)
		   ========================= */}
		<div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-accent overflow-hidden">
		  <div className="px-6 sm:px-10 lg:px-14 py-16 sm:py-20 lg:py-24">
			<div className="mx-auto max-w-5xl text-center">
			  <motion.h2
				initial={{ opacity: 0, y: 18 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.35 }}
				transition={{ duration: 0.6 }}
				className="font-sans font-extrabold tracking-tight text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]"
			  >
				Академия счастья H.A.P.P.Y.
			  </motion.h2>

			  <motion.p
				initial={{ opacity: 0, y: 18 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.35 }}
				transition={{ duration: 0.6, delay: 0.08 }}
				className="mt-8 text-white/90 font-sans text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto"
			  >
				Идеально подходит для тех, кто хочет не просто мечтать, а действительно привлечь
				в свою жизнь богатство, любовь, процветание, признание и здоровье. Это путь
				к глубокому, устойчивому счастью, которое не зависит от внешних обстоятельств.
			  </motion.p>

			  <div className="mt-14 sm:mt-16 flex justify-center">
				<ScrollBadge />
			  </div>
			</div>
		  </div>
		</div>
	  </div>

	  {/* =========================
		  3) СЛАЙДЕР ОТДЕЛЬНО! (под оранжевым)
		  ВО ВСЮ ШИРИНУ И ВЫСОТУ ЭКРАНА
		 ========================= */}
	  <FullScreenSlider slides={slides} />
	</section>
  );
};

export default HappyAcademySection;

/* =========================
   FULLSCREEN СЛАЙДЕР (100vh)
   ========================= */
function FullScreenSlider({ slides }: { slides: string[] }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  useEffect(() => {
	const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
	return () => clearInterval(t);
  }, [slides.length]);

  return (
	<section className="relative w-full h-[100vh] overflow-hidden">
	  {/* картинка на весь экран */}
	  <motion.img
		key={slides[index]}
		src={slides[index]}
		alt={`Slide ${index + 1}`}
		className="absolute inset-0 h-full w-full object-cover"
		initial={{ opacity: 0, scale: 1.02 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.55, ease: "easeOut" }}
		draggable={false}
	  />

	  {/* легкая виньетка */}
	  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15" />

	  {/* Кнопки по бокам (круглые) */}
	  <button
		onClick={prev}
		aria-label="Previous"
		className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white/85 hover:bg-white text-black flex items-center justify-center shadow-md transition"
	  >
		<ChevronLeft className="h-6 w-6" />
	  </button>

	  <button
		onClick={next}
		aria-label="Next"
		className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white/85 hover:bg-white text-black flex items-center justify-center shadow-md transition"
	  >
		<ChevronRight className="h-6 w-6" />
	  </button>

	  {/* точки снизу */}
	  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
		{slides.map((_, i) => (
		  <button
			key={i}
			onClick={() => setIndex(i)}
			aria-label={`Go to slide ${i + 1}`}
			className={`h-2.5 w-2.5 rounded-full transition ${
			  i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
			}`}
		  />
		))}
	  </div>
	</section>
  );
}

/** Круговая подпись + стрелка */
function ScrollBadge() {
  const text = "узнать подробнее • узнать подробнее • ";

  return (
	<div className="relative h-[140px] w-[140px] sm:h-[160px] sm:w-[160px]">
	  <motion.div
		aria-hidden
		className="absolute inset-0"
		animate={{ rotate: 360 }}
		transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
	  >
		<svg viewBox="0 0 200 200" className="h-full w-full">
		  <defs>
			<path
			  id="circlePath"
			  d="M 100, 100
				 m -78, 0
				 a 78,78 0 1,1 156,0
				 a 78,78 0 1,1 -156,0"
			/>
		  </defs>

		  <text
			fill="rgba(255,255,255,0.85)"
			fontSize="13"
			fontFamily="Inter, system-ui, sans-serif"
			letterSpacing="2.5"
		  >
			<textPath href="#circlePath" startOffset="0%">
			  {text.repeat(2)}
			</textPath>
		  </text>
		</svg>
	  </motion.div>

	  <div className="absolute inset-0 flex items-center justify-center">
		<div className="h-12 w-12 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
		  <ArrowDown className="h-6 w-6 text-white" />
		</div>
	  </div>
	</div>
  );
}