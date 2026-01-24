// src/components/landing/ArchitectureSection.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";

/* =========================
   shared: reduced motion
   ========================= */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
	const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
	const onChange = () => setReduced(!!mq.matches);
	onChange();

	if ("addEventListener" in mq) mq.addEventListener("change", onChange);
	// @ts-expect-error legacy safari
	else mq.addListener(onChange);

	return () => {
	  if ("removeEventListener" in mq) mq.removeEventListener("change", onChange);
	  // @ts-expect-error legacy safari
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
	  ? "h-[168px] w-[168px]"
	  : size === "md"
	  ? "h-[190px] w-[190px]"
	  : "h-[136px] w-[136px] sm:h-[150px] sm:w-[150px] lg:h-[160px] lg:w-[160px]";

  const text =
	size === "sm"
	  ? "text-[15px] leading-[1.05]"
	  : size === "md"
	  ? "text-[16px] leading-[1.05]"
	  : "text-[13px] sm:text-[14px] lg:text-[15px] leading-[1.05]";

  return (
	<motion.div
	  whileHover={disableHover ? undefined : { y: -6, scale: 1.06 }}
	  transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.7 }}
	  className={[
		"select-none rounded-full",
		dim,
		"grid place-items-center",
		styles.bg,
		"shadow-[0_22px_65px_rgba(0,0,0,0.18)]",
		"ring-1 ring-inset ring-black/10",
	  ].join(" ")}
	  aria-label={label}
	  title={label}
	>
	  <div
		className={[
		  "px-4 text-center font-sans font-extrabold tracking-tight",
		  styles.text,
		  text,
		].join(" ")}
		style={{
		  textWrap: "balance" as any,
		  hyphens: "auto",
		}}
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
	// @ts-expect-error legacy
	else mq.addListener(onChange);
	return () => {
	  if ("removeEventListener" in mq) mq.removeEventListener("change", onChange);
	  // @ts-expect-error legacy
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

  // hover-glow like other blocks
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

  return (
	<section className="bg-[#F6F1E7]">
	  {/* ✅ ширина теперь как у нижнего блока (без max-w-7xl) */}
	  <div className="mx-auto w-full px-3 sm:px-4 lg:px-6 py-16 sm:py-20">
		<motion.div
		  ref={rootRef}
		  onMouseMove={isMobile || prefersReducedMotion ? undefined : onMove}
		  onMouseLeave={isMobile || prefersReducedMotion ? undefined : onLeave}
		  className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.10)]"
		>
		  {/* background decor */}
		  <div className="pointer-events-none absolute inset-0">
			<div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-black/5 blur-2xl" />
			<div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-black/5 blur-2xl" />

			{/* mobile: static glow */}
			<div
			  className="absolute -right-36 -bottom-40 h-[560px] w-[560px] rounded-full blur-3xl opacity-35 lg:hidden"
			  style={{
				background:
				  "radial-gradient(circle at 30% 30%, rgba(255,214,0,0.55), rgba(240,98,60,0.26), rgba(228,0,43,0.22), rgba(0,0,0,0))",
			  }}
			/>

			{/* desktop: hover-follow glow */}
			{!prefersReducedMotion ? (
			  <motion.div
				className="hidden lg:block absolute h-[680px] w-[680px] rounded-full blur-3xl opacity-40"
				style={{
				  left: "50%",
				  top: "50%",
				  translateX: "-50%",
				  translateY: "-50%",
				  x: glowX,
				  y: glowY,
				  background:
					"radial-gradient(circle at 30% 30%, rgba(255,214,0,0.58), rgba(240,98,60,0.26), rgba(228,0,43,0.22), rgba(0,0,0,0))",
				}}
			  />
			) : null}

			<div className="absolute inset-0 ring-1 ring-black/10" />
		  </div>

		  {/* content */}
		  <div className="relative px-6 sm:px-10 lg:px-14 py-10 sm:py-12 lg:py-14">
			<motion.h2
			  initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
			  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			  viewport={{ once: true, amount: 0.35 }}
			  transition={{ duration: 0.65, ease: "easeOut" }}
			  className="font-sans font-extrabold tracking-tight text-black text-3xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-5xl"
			>
			  Архитектура Счастья — это система из 10 несущих элементов
			</motion.h2>

			<motion.p
			  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
			  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			  viewport={{ once: true, amount: 0.35 }}
			  transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
			  className="mt-6 sm:mt-7 font-sans text-black/75 text-base sm:text-lg leading-relaxed max-w-3xl"
			>
			  Это не советы и не мотивация.
			  <br />
			  Это конструкция, где каждый элемент усиливает другие — и счастье становится{" "}
			  <span className="font-semibold text-black">стабильным состоянием</span>.
			</motion.p>

			<div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:items-center">
			  <Button
				size="xl"
				onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
				className="w-full sm:w-auto rounded-full px-8 sm:px-10 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold whitespace-normal leading-tight h-auto py-4"
			  >
				Начать внедрение
				<ArrowRight className="ml-2 h-5 w-5" />
			  </Button>

			  <Button
				size="xl"
				onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
				className="w-full sm:w-auto rounded-full px-8 sm:px-10 bg-accent text-white hover:opacity-95 font-semibold whitespace-normal leading-tight h-auto py-4"
			  >
				Записаться FREE на вводный урок
			  </Button>
			</div>

			<div className="mt-10 sm:mt-12 border-t border-black/10" />

			<motion.h3
			  initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
			  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			  viewport={{ once: true, amount: 0.35 }}
			  transition={{ duration: 0.65, ease: "easeOut" }}
			  className="mt-10 sm:mt-12 font-sans font-extrabold tracking-tight text-black text-2xl sm:text-4xl leading-[1.08]"
			>
			  10 несущих конструкций вашего внутреннего дома
			</motion.h3>

			{/* DESKTOP */}
			<div className="hidden lg:block">
			  <motion.div
				initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
				whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				viewport={{ once: true, amount: 0.35 }}
				transition={{ duration: 0.6, ease: "easeOut", delay: 0.04 }}
				className="mt-10"
			  >
				<div className="grid grid-cols-5 gap-x-6 gap-y-6 items-end">
				  {pillars.map((p, i) => (
					<motion.div
					  key={p.label}
					  className="will-change-transform justify-self-start"
					  style={{
						transform: `translateY(${(i % 5) * 6}px) rotate(${
						  (i % 2 ? 1 : -1) * 1.2
						}deg)`,
					  }}
					>
					  <PillCircle label={p.label} tone={p.tone} size="lg" />
					</motion.div>
				  ))}
				</div>

				<div className="pointer-events-none mt-8 h-12 w-full rounded-[999px] bg-black/[0.03] blur-xl" />
			  </motion.div>
			</div>

			{/* MOBILE/TABLET */}
			<div className="lg:hidden">
			  <motion.div
				initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
				whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				viewport={{ once: true, amount: 0.35 }}
				transition={{ duration: 0.6, ease: "easeOut", delay: 0.04 }}
				className="mt-8 space-y-6 flex flex-col items-center"
			  >
				{pillars.map((p) => (
				  <PillCircle
					key={p.label}
					label={p.label}
					tone={p.tone}
					size="md"
					disableHover
				  />
				))}
			  </motion.div>
			</div>

			<motion.p
			  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
			  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			  viewport={{ once: true, amount: 0.35 }}
			  transition={{ duration: 0.55, ease: "easeOut", delay: 0.06 }}
			  className="mt-10 font-sans text-black/70 text-sm sm:text-base"
			>
			  Если хотя бы один элемент не встроен — конструкция теряет устойчивость.
			</motion.p>
		  </div>
		</motion.div>
	  </div>
	</section>
  );
}