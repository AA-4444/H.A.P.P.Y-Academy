import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import slide1 from "@/assets/new1.png";
import slide3 from "@/assets/new2.png";
import slide4 from "@/assets/new3.png";
import slide5 from "@/assets/new4.png";
import slide6 from "@/assets/new5.png";

/* =========================
   reduced motion
========================= */
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

const HappyAcademySection = () => {
  const slides = useMemo(() => [slide1, slide3, slide4, slide5, slide6], []);

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
		<motion.div
		  ref={rootRef}
		  onMouseMove={prefersReducedMotion ? undefined : onMove}
		  onMouseLeave={prefersReducedMotion ? undefined : onLeave}
		  className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-white overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.10)]"
		>
		  {/* background */}
		  <div className="pointer-events-none absolute inset-0">
			<div
			  className="absolute inset-0 opacity-[0.10]"
			  style={{
				backgroundImage:
				  "radial-gradient(rgba(0,0,0,0.10) 1px, transparent 1px)",
				backgroundSize: "150px 150px",
			  }}
			/>

			<div className="absolute -top-28 -left-28 h-[420px] w-[420px] rounded-full bg-black/5 blur-3xl" />
			<div
			  className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-35"
			  style={{
				background:
				  "radial-gradient(circle at 30% 30%, rgba(255,214,0,0.55), rgba(230,75,30,0.22), rgba(0,0,0,0))",
			  }}
			/>

			{!prefersReducedMotion && (
			  <motion.div
				className="absolute h-[560px] w-[560px] rounded-full blur-3xl opacity-30"
				style={{
				  left: "50%",
				  top: "50%",
				  translateX: "-50%",
				  translateY: "-50%",
				  x: glowX,
				  y: glowY,
				  background:
					"radial-gradient(circle at 30% 30%, rgba(255,214,0,0.55), rgba(230,75,30,0.20), rgba(0,0,0,0))",
				}}
			  />
			)}

			<div className="absolute inset-0 ring-1 ring-black/10" />
		  </div>

		  {/* content */}
		  <div className="relative px-6 sm:px-10 lg:px-14 py-12 sm:py-14 lg:py-16">
			<div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
			  {/* LEFT */}
			  <div className="max-w-xl min-w-0">
				<motion.h2
				  initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
				  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				  viewport={{ once: true, amount: 0.45 }}
				  transition={{ duration: 0.65, ease: "easeOut" }}
				  className="font-sans font-extrabold tracking-tight text-[32px] leading-[1.08] sm:text-5xl md:text-6xl text-black break-normal hyphens-none"
				>
				  Почему большинство людей «иногда»
				  <br className="sm:hidden" /> счастливы», но не устойчиво?
				</motion.h2>

				<motion.p
				  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
				  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				  viewport={{ once: true, amount: 0.45 }}
				  transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
				  className="mt-6 font-sans text-black/65 text-sm sm:text-base leading-relaxed max-w-[52ch]"
				>
				  Потому что люди строят настроение, а не систему. Здесь начинается
				  переход от реакции к созданию.
				</motion.p>
			  </div>

			  {/* RIGHT */}
			  <div className="max-w-2xl min-w-0 space-y-4">
				<MotionChip>Счастье путают с эмоцией.</MotionChip>
				<MotionChip>Но эмоции - это погода.</MotionChip>
				<MotionChip>А счастье - архитектура состояния.</MotionChip>
				<MotionChip>Без структуры любое благополучие временно.</MotionChip>
				<MotionChip>Как «красивый ремонт без фундамента».</MotionChip>

				<div className="pt-3 grid gap-2 sm:gap-3">
				  <MotionPoint>нет системы</MotionPoint>
				  <MotionPoint>нет внутренней архитектуры</MotionPoint>
				  <MotionPoint>жизнь в реакции, а не в создании</MotionPoint>
				</div>

				<div className="pt-6">
				  <Button
					size="lg"
					onClick={goPrograms}
					className="h-12 px-10 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 font-semibold w-full sm:w-auto"
				  >
					Стать счастливым
				  </Button>
				</div>
			  </div>
			</div>
		  </div>
		</motion.div>
	  </div>

	  {/* slider only desktop */}
	  <div className="hidden lg:block">
		<FullScreenSlider slides={slides} />
	  </div>
	</section>
  );
};

export default HappyAcademySection;

/* ===================== helpers ===================== */

function MotionChip({ children }: { children: React.ReactNode }) {
  return (
	<motion.div
	  initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
	  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
	  viewport={{ once: true }}
	  transition={{ duration: 0.5, ease: "easeOut" }}
	  className="inline-flex w-fit max-w-full rounded-full px-4 py-2 bg-black/[0.04] ring-1 ring-black/10 text-black"
	>
	  {children}
	</motion.div>
  );
}

function MotionPoint({ children }: { children: React.ReactNode }) {
  return (
	<motion.div
	  initial={{ opacity: 0, y: 8, filter: "blur(8px)" }}
	  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
	  viewport={{ once: true }}
	  transition={{ duration: 0.5, ease: "easeOut" }}
	  className="flex items-start gap-3"
	>
	  <span className="mt-[2px] h-6 w-6 shrink-0 rounded-full bg-yellow-400 text-black grid place-items-center ring-1 ring-black/10">
		✓
	  </span>
	  <span className="text-black/85 font-sans">{children}</span>
	</motion.div>
  );
}

function FullScreenSlider({ slides }: { slides: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
	const t = setInterval(
	  () => setIndex((i) => (i + 1) % slides.length),
	  6000
	);
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
	  />
	</section>
  );
}