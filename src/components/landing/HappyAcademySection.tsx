import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";


// new1..new5
import slide1Avif from "@/assets/new1.png?w=640;960;1280;1920&format=avif&as=srcset";
import slide1Webp from "@/assets/new1.png?w=640;960;1280;1920&format=webp&as=srcset";
import slide1Fallback from "@/assets/new1.png?w=1920&format=png&as=src";

import slide2Avif from "@/assets/new2.png?w=640;960;1280;1920&format=avif&as=srcset";
import slide2Webp from "@/assets/new2.png?w=640;960;1280;1920&format=webp&as=srcset";
import slide2Fallback from "@/assets/new2.png?w=1920&format=png&as=src";

import slide3Avif from "@/assets/new3.png?w=640;960;1280;1920&format=avif&as=srcset";
import slide3Webp from "@/assets/new3.png?w=640;960;1280;1920&format=webp&as=srcset";
import slide3Fallback from "@/assets/new3.png?w=1920&format=png&as=src";

import slide4Avif from "@/assets/new4.png?w=640;960;1280;1920&format=avif&as=srcset";
import slide4Webp from "@/assets/new4.png?w=640;960;1280;1920&format=webp&as=srcset";
import slide4Fallback from "@/assets/new4.png?w=1920&format=png&as=src";

import slide5Avif from "@/assets/new5.png?w=640;960;1280;1920&format=avif&as=srcset";
import slide5Webp from "@/assets/new5.png?w=640;960;1280;1920&format=webp&as=srcset";
import slide5Fallback from "@/assets/new5.png?w=1920&format=png&as=src";

type ImgSet = {
  key: string;
  avif: string;     // srcset
  webp: string;     // srcset
  fallback: string; // src
};

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
  const slides = useMemo<ImgSet[]>(
	() => [
	  { key: "s1", avif: slide1Avif, webp: slide1Webp, fallback: slide1Fallback },
	  { key: "s2", avif: slide2Avif, webp: slide2Webp, fallback: slide2Fallback },
	  { key: "s3", avif: slide3Avif, webp: slide3Webp, fallback: slide3Fallback },
	  { key: "s4", avif: slide4Avif, webp: slide4Webp, fallback: slide4Fallback },
	  { key: "s5", avif: slide5Avif, webp: slide5Webp, fallback: slide5Fallback },
	],
	[]
  );

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

/**
 * ✅ Слайдер теперь принимает ImgSet[]
 * И рендерит картинку через <picture> (avif/webp/srcset)
 */
function FullScreenSlider({ slides }: { slides: ImgSet[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
	const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
	return () => clearInterval(t);
  }, [slides.length]);

  const current = slides[index];

  return (
	<section className="relative w-full h-[100vh] overflow-hidden">
	  {/* motion-обертка, чтобы сохранить анимацию как у motion.img */}
	  <motion.div
		key={current.key}
		className="absolute inset-0"
		initial={{ opacity: 0, scale: 1.02 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.55, ease: "easeOut" }}
	  >
		<picture className="block h-full w-full">
		  <source type="image/avif" srcSet={current.avif} />
		  <source type="image/webp" srcSet={current.webp} />
		  <img
			src={current.fallback}
			alt=""
			loading="eager"
			decoding="async"
			className="h-full w-full object-cover"
		  />
		</picture>
	  </motion.div>
	</section>
  );
}