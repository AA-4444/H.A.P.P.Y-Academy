import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";

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

type Pillar = { label: string; tone: "red" | "orange" | "yellow" };

function toneStyles(tone: Pillar["tone"]) {
  if (tone === "yellow") return { bg: "bg-yellow-400", text: "text-black" };
  if (tone === "orange") return { bg: "bg-[#F0623C]", text: "text-white" };
  return { bg: "bg-[#E4002B]", text: "text-white" };
}

function PillCircle({
  label,
  tone,
  size = "lg",
  disableHover,
}: {
  label: string;
  tone: Pillar["tone"];
  size?: "sm" | "md" | "lg";
  disableHover?: boolean;
}) {
  const styles = toneStyles(tone);

  const dim =
	size === "sm"
	  ? "h-[120px] w-[120px]"
	  : size === "md"
	  ? "h-[140px] w-[140px]"
	  : "h-[136px] w-[136px] sm:h-[150px] sm:w-[150px] lg:h-[160px] lg:w-[160px]";

  const text =
	size === "sm"
	  ? "text-[12px] leading-[1.05]"
	  : size === "md"
	  ? "text-[13px] leading-[1.05]"
	  : "text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.05]";

  return (
	<motion.div
	  whileHover={disableHover ? undefined : { y: -6, scale: 1.06 }}
	  transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.7 }}
	  className={[
		"rounded-full grid place-items-center select-none",
		dim,
		styles.bg,
		"shadow-[0_22px_65px_rgba(0,0,0,0.18)]",
		"ring-1 ring-inset ring-black/10",
	  ].join(" ")}
	>
	  <div
		className={[
		  "px-3 text-center font-sans font-extrabold tracking-tight",
		  styles.text,
		  text,
		].join(" ")}
	  >
		{label}
	  </div>
	</motion.div>
  );
}

export default function ArchitectureSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
	const mq = window.matchMedia("(max-width: 1023px)");
	const onChange = () => setIsMobile(!!mq.matches);
	onChange();

	if ("addEventListener" in mq) mq.addEventListener("change", onChange);
	else mq.addListener(onChange);

	return () => {
	  if ("removeEventListener" in mq) mq.removeEventListener("change", onChange);
	  else mq.removeListener(onChange);
	};
  }, []);

  const pillars = useMemo<Pillar[]>(
	() => [
	  { label: "Благодарность", tone: "yellow" },
	  { label: "Обучение", tone: "orange" },
	  { label: "Гибкость мышления", tone: "red" },
	  { label: "Комплименты", tone: "yellow" },
	  { label: "Осознанность", tone: "orange" },
	  { label: "Доброта", tone: "red" },
	  { label: "Смыслы и ценности", tone: "yellow" },
	  { label: "Убеждения и критерии успеха", tone: "orange" },
	  { label: "Планы и цели", tone: "red" },
	  { label: "Энергия", tone: "yellow" },
	],
	[]
  );

  const rootRef = useRef<HTMLDivElement | null>(null);
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
	  <div className="mx-auto w-full px-3 sm:px-4 lg:px-6 py-16 sm:py-20">
		<motion.div
		  ref={rootRef}
		  onMouseMove={isMobile || prefersReducedMotion ? undefined : onMove}
		  onMouseLeave={isMobile || prefersReducedMotion ? undefined : onLeave}
		  className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.10)]"
		>
		  {/* content */}
		  <div className="relative px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-14">
			<motion.h2 className="font-sans font-extrabold tracking-tight text-black text-3xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-5xl">
			  Архитектура Счастья - это система из 10 несущих элементов
			</motion.h2>

			<p className="mt-6 sm:mt-7 font-sans text-black/75 text-base sm:text-lg leading-relaxed max-w-3xl">
			  Это не советы и не мотивация.
			  <br />
			  Это конструкция, где каждый элемент усиливает другие - и счастье становится{" "}
			  <span className="font-semibold text-black">стабильным состоянием</span>.
			</p>

			<div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4">
			  <Button
				size="xl"
				onClick={goPrograms}
				className="rounded-full px-10 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
			  >
				Стать счастливым
				<ArrowRight className="ml-2 h-5 w-5" />
			  </Button>
			</div>

			{/* DESKTOP */}
			<div className="hidden lg:block mt-12">
			  <div className="grid grid-cols-5 gap-6">
				{pillars.map((p) => (
				  <PillCircle key={p.label} {...p} size="lg" />
				))}
			  </div>
			</div>

			{/* MOBILE: 2 x 5 */}
			<div className="lg:hidden mt-10">
			  <div className="grid grid-cols-2 gap-4 justify-items-center">
				{pillars.map((p) => (
				  <PillCircle
					key={p.label}
					{...p}
					size="sm"
					disableHover
				  />
				))}
			  </div>
			</div>

			<p className="mt-10 font-sans text-black/70 text-sm sm:text-base">
			  Если хотя бы один элемент не встроен - конструкция теряет устойчивость.
			</p>
		  </div>
		</motion.div>
	  </div>
	</section>
  );
}