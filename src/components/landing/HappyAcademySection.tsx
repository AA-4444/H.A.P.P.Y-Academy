import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import slide1 from "@/assets/bg8.png";
import slide3 from "@/assets/bg5.png";
import slide4 from "@/assets/bg6.png";
import slide5 from "@/assets/bg7.png";

const HappyAcademySection = () => {
  const slides = useMemo(() => [slide1, slide3, slide4, slide5], []);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 26, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 180, damping: 26, mass: 0.7 });

  const glowX = useTransform(sx, (v) => `${v}px`);
  const glowY = useTransform(sy, (v) => `${v}px`);

  const onMove = (e: React.MouseEvent) => {
	if (!rootRef.current) return;
	const r = rootRef.current.getBoundingClientRect();
	mx.set(e.clientX - (r.left + r.width / 2));
	my.set(e.clientY - (r.top + r.height / 2));
  };

  const onLeave = () => {
	mx.set(0);
	my.set(0);
  };
  
  const goPrograms = () => {
	const el = document.getElementById("programs");
	if (!el) return;
  
	
	el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
	<section className="bg-[#F6F1E7]">
	  <div className="mx-auto w-full px-3 sm:px-4 lg:px-6 py-10 sm:py-12 space-y-10 sm:space-y-12">
		{/* FIRST WHITE BLOCK (PROBLEM) */}
		<motion.div
		  ref={rootRef}
		  onMouseMove={prefersReducedMotion ? undefined : onMove}
		  onMouseLeave={prefersReducedMotion ? undefined : onLeave}
		  className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-white overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.10)]"
		>
		  <div className="pointer-events-none absolute inset-0">
			<div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-black/5 blur-2xl" />
			<div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-black/5 blur-2xl" />
			<div className="absolute left-0 top-0 h-full w-px bg-black/10" />
			{!prefersReducedMotion ? (
			  <motion.div
				className="absolute h-[520px] w-[520px] rounded-full blur-3xl opacity-35"
				style={{
				  left: "50%",
				  top: "50%",
				  translateX: "-50%",
				  translateY: "-50%",
				  x: glowX,
				  y: glowY,
				  background:
					"radial-gradient(circle at 30% 30%, rgba(255, 214, 0, 0.55), rgba(230, 75, 30, 0.28), rgba(0,0,0,0))",
				}}
			  />
			) : null}
		  </div>

		  <div className="relative px-6 sm:px-10 lg:px-14 py-12 sm:py-14 lg:py-16">
			<div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
			  {/* LEFT */}
			  <div className="max-w-xl min-w-0">
				<motion.h2
				  initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
				  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				  viewport={{ once: true, amount: 0.45 }}
				  transition={{ duration: 0.65, ease: "easeOut" }}
				  className="font-sans font-extrabold tracking-tight text-[32px] leading-[1.08] sm:text-5xl md:text-6xl text-black break-words hyphens-auto"
				>
				  Почему большинство людей «иногда счастливы», но не устойчиво?
				</motion.h2>
			  </div>

			  {/* RIGHT */}
			  <div className="max-w-2xl min-w-0">
				<motion.div
				  initial="hidden"
				  whileInView="show"
				  viewport={{ once: true, amount: 0.55 }}
				  variants={{
					hidden: {},
					show: {
					  transition: { staggerChildren: 0.08, delayChildren: 0.12 },
					},
				  }}
				  className="space-y-4 font-sans text-black text-base sm:text-lg leading-relaxed break-words"
				>
				  <MotionFadeLine>Счастье путают с эмоцией.</MotionFadeLine>
				  <MotionFadeLine>Но эмоции - это погода.</MotionFadeLine>
				  <MotionFadeLine>А счастье - это архитектура состояния.</MotionFadeLine>
				  <MotionFadeLine>Без структуры любое благополучие временно.</MotionFadeLine>
				  <MotionFadeLine>Как «красивый ремонт без фундамента».</MotionFadeLine>

				  <div className="pt-2 space-y-2">
					<MotionArrowLine>нет системы</MotionArrowLine>
					<MotionArrowLine>нет внутренней архитектуры</MotionArrowLine>
					<MotionArrowLine>жизнь в реакции, а не в создании</MotionArrowLine>
				  </div>
				</motion.div>

				<motion.div
				  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
				  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				  viewport={{ once: true, amount: 0.55 }}
				  transition={{ duration: 0.55, ease: "easeOut", delay: 0.22 }}
				  className="mt-8"
				>
				  <Button
					size="lg"
					onClick={goPrograms}
					className="h-12 px-10 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 font-semibold w-full sm:w-auto whitespace-nowrap"
				  >
					Стать счатсливым 
				  </Button>
				</motion.div>
			  </div>
			</div>
		  </div>
		</motion.div>

		
	  </div>

	 
	  <div className="hidden lg:block">
		<FullScreenSlider slides={slides} />
	  </div>
	</section>
  );
};

export default HappyAcademySection;

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
	  <motion.img
		key={slides[index]}
		src={slides[index]}
		alt=""
		className="absolute inset-0 h-full w-full object-cover"
		initial={{ opacity: 0, scale: 1.02 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.55, ease: "easeOut" }}
		draggable={false}
	  />

	  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15" />

	  <button
		onClick={prev}
		className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white/85 hover:bg-white text-black flex items-center justify-center shadow-md transition"
		aria-label="Предыдущий слайд"
	  >
		<ChevronLeft className="h-6 w-6" />
	  </button>

	  <button
		onClick={next}
		className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white/85 hover:bg-white text-black flex items-center justify-center shadow-md transition"
		aria-label="Следующий слайд"
	  >
		<ChevronRight className="h-6 w-6" />
	  </button>

	  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
		{slides.map((_, i) => (
		  <button
			key={i}
			onClick={() => setIndex(i)}
			className={`h-2.5 w-2.5 rounded-full transition ${
			  i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
			}`}
			aria-label={`Перейти к слайду ${i + 1}`}
		  />
		))}
	  </div>
	</section>
  );
}

function ScrollBadge() {
  const text = "узнать подробнее • узнать подробнее • ";

  return (
	<div className="relative h-[140px] w-[140px] sm:h-[160px] sm:w-[160px]">
	  <motion.div
		animate={{ rotate: 360 }}
		transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
		className="absolute inset-0"
	  >
		<svg viewBox="0 0 200 200" className="h-full w-full">
		  <defs>
			<path
			  id="circlePath"
			  d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
			/>
		  </defs>
		  <text fill="rgba(255,255,255,0.85)" fontSize="13" letterSpacing="2.5">
			<textPath href="#circlePath">{text.repeat(2)}</textPath>
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

function MotionArrowLine({ children }: { children: React.ReactNode }) {
  return (
	<motion.div
	  variants={{
		hidden: { opacity: 0, y: 8, filter: "blur(8px)" },
		show: { opacity: 1, y: 0, filter: "blur(0px)" },
	  }}
	  transition={{ duration: 0.5, ease: "easeOut" }}
	  className="flex items-start gap-3 min-w-0"
	>
	  <span className="mt-[3px] text-black/70 font-semibold">→</span>
	  <span className="text-black break-words">{children}</span>
	</motion.div>
  );
}

function MotionFadeLine({ children }: { children: React.ReactNode }) {
  return (
	<motion.div
	  variants={{
		hidden: { opacity: 0, y: 8, filter: "blur(8px)" },
		show: { opacity: 1, y: 0, filter: "blur(0px)" },
	  }}
	  transition={{ duration: 0.5, ease: "easeOut" }}
	  className="text-black break-words"
	>
	  {children}
	</motion.div>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
	const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
	const onChange = () => setReduced(!!mq.matches);
	onChange();
	if ("addEventListener" in mq) mq.addEventListener("change", onChange);
	else mq.addListener(onChange);
	return () => {
	  if ("removeEventListener" in mq) mq.removeEventListener("change", onChange);
	  else mq.removeListener(onChange);
	};
  }, []);

  return reduced;
}