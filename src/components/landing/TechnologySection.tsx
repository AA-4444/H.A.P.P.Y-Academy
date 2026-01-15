import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";

/* ============================================================================
   ✅ MOBILE: ПОЛНОСТЬЮ НОВЫЙ КОНТЕЙНЕР (центрируется относительно viewport)
   - Секцию "прибиваем" к центру экрана через left-1/2 + -translate-x-1/2
   - Ширина w-screen, внутренний max-w + mx-auto
   - Не зависит от кривых родителей вообще
   ============================================================================ */
const MobileTechnologySection = () => {
  return (
	<section className="lg:hidden bg-[#F6F1E7] overflow-x-hidden">
	  {/* ВАЖНО: этот контейнер центрируется относительно viewport */}
	  <div className="relative left-1/2 -translate-x-1/2 w-screen px-4 py-10">
		<div className="mx-auto max-w-[560px] space-y-10">
		  {/* CARD 1 */}
		  <div className="rounded-[28px] overflow-hidden bg-white shadow-[0_30px_100px_rgba(0,0,0,0.10)]">
			<div className="px-5 py-8 text-center">
			  <div className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-black/60">
				<span className="h-2 w-2 rounded-full bg-accent" />
				система без мотивации
				<ArrowUpRight className="h-4 w-4 text-black/40" />
			  </div>

			  <h2 className="mt-6 font-sans font-extrabold tracking-tight text-black text-3xl leading-[1.05]">
				Кто построил
				<br />
				эту систему
			  </h2>

			  <p className="mt-6 font-sans text-black text-base leading-relaxed">
				Архитектор Счастья —{" "}
				<span className="relative inline-block font-semibold">
				  <span className="relative z-[1]">Ицхак Пинтосевич</span>
				  <span className="absolute -inset-x-2 bottom-[2px] h-[10px] bg-yellow-300/60 rounded-full -z-0" />
				</span>
			  </p>

			  <div className="mt-7 space-y-3 text-left">
				<MobileLine>Системный подход вместо мотивации</MobileLine>
				<MobileLine>Структура действий: что делать и в каком порядке</MobileLine>
				<MobileLine>Внедрение в жизнь, а не теория</MobileLine>
			  </div>

			  <div className="mt-8 space-y-4">
				<button
				  onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
				  className="w-full rounded-full bg-yellow-400 text-black py-4 font-semibold"
				>
				  Принять участие
				</button>

				<button
				  onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
				  className="w-full rounded-full bg-accent text-white py-4 font-semibold"
				>
				  Записаться FREE на вводный урок
				</button>
			  </div>

			  <div className="mt-10 space-y-6 text-left">
				<MobileMetric
				  value="15+"
				  title="лет трансформационной практики"
				  subtitle="практика, не мотивация"
				/>
				<MobileMetric
				  value="250k+"
				  title="учеников"
				  subtitle="проверено на реальных людях"
				/>
			  </div>

			  {/* ЧЁРНЫЙ БЛОК — тут он ФИЗИЧЕСКИ НЕ МОЖЕТ уехать вправо,
				  потому что вся секция уже выровнена по viewport */}
			  <div className="mt-8 bg-black text-white rounded-2xl px-6 py-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
				<div className="text-[11px] tracking-[0.22em] uppercase text-white/60 font-sans text-center">
				  ключевая идея
				</div>
				<div className="mt-4 font-sans font-semibold text-lg leading-snug text-center">
				  «Я не мотивирую. Я проектирую систему жизни.»
				</div>
			  </div>

			  <div className="mt-8 space-y-3 text-left">
				<MobileArrow>понятно, что делать дальше</MobileArrow>
				<MobileArrow>решения становятся проще</MobileArrow>
				<MobileArrow>результаты становятся стабильнее</MobileArrow>
			  </div>
			</div>
		  </div>

		  {/* CARD 2 */}
		  <div className="rounded-[28px] overflow-hidden bg-white shadow-[0_30px_100px_rgba(0,0,0,0.08)]">
			<div className="px-5 py-8">
			  <p className="font-sans text-black text-base leading-relaxed">
				Я создал проверенный алгоритм, который выводит из хаоса в устойчивое состояние
				осознанности, энергии и наполненности. Рост постоянного ощущения счастья в 2 раза:
				в среднем оценка состояния участников после обучения растет с{" "}
				<span className="font-semibold">5,8</span> до{" "}
				<span className="font-semibold">9,3</span> балла из 10.
			  </p>

			  <div className="mt-8 space-y-7">
				<div className="text-center">
				  <div className="font-sans font-extrabold tracking-tight text-accent text-5xl leading-none">
					77%
				  </div>
				  <div className="mt-3 font-sans text-black text-sm leading-relaxed">
					Участников после обучения
					<br />
					ощутили средний уровень
					<br />
					счастья на уровне 9–10 из 10
				  </div>
				</div>

				<div className="text-center">
				  <div className="font-sans font-extrabold tracking-tight text-accent text-5xl leading-none">
					64,7%
				  </div>
				  <div className="mt-3 font-sans text-black text-sm leading-relaxed">
					Улучшили отношения в семье
					<br />и с партнёром
				  </div>
				</div>

				<div className="text-center">
				  <div className="font-sans font-extrabold tracking-tight text-accent text-5xl leading-none">
					57,6%
				  </div>
				  <div className="mt-3 font-sans text-black text-sm leading-relaxed">
					Стали успешнее
					<br />в работе и бизнесе
				  </div>
				</div>
			  </div>

			  <div className="mt-10 rounded-2xl bg-black/5 border border-black/10 px-5 py-7 text-center">
				<div className="font-sans font-extrabold tracking-tight text-4xl leading-[1.02]">
				  <span className="text-accent">94</span>{" "}
				  <span className="text-black">страны и</span>{" "}
				  <span className="text-accent">2774</span>{" "}
				  <span className="text-black">города</span>
				</div>
				<div className="mt-3 font-sans text-black text-sm">
				  География наших
				  <br />
				  участников
				</div>
			  </div>
			</div>
		  </div>

		</div>
	  </div>
	</section>
  );
};

function MobileLine({ children }: { children: React.ReactNode }) {
  return (
	<div className="flex items-start gap-3">
	  <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-black/60 shrink-0" />
	  <span className="font-sans text-black text-base leading-relaxed">{children}</span>
	</div>
  );
}

function MobileArrow({ children }: { children: React.ReactNode }) {
  return (
	<div className="flex items-start gap-3">
	  <span className="mt-[3px] text-black/70 font-semibold">→</span>
	  <span className="font-sans text-black text-base leading-relaxed">{children}</span>
	</div>
  );
}

function MobileMetric({
  value,
  title,
  subtitle,
}: {
  value: string;
  title: string;
  subtitle?: string;
}) {
  return (
	<div className="border-t border-black/10 pt-5">
	  <div className="font-sans font-extrabold tracking-tight text-black text-4xl leading-none">
		{value}
	  </div>
	  <div className="mt-2 font-sans font-semibold text-black text-base">{title}</div>
	  {subtitle ? <div className="mt-1 font-sans text-black/60 text-sm">{subtitle}</div> : null}
	</div>
  );
}

/* ============================================================================
   ✅ DESKTOP: ТВОЙ ОРИГИНАЛ 1-в-1, просто скрыт на телефоне
   ============================================================================ */
const DesktopTechnologySection = () => {
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

  return (
	<section className="hidden lg:block bg-[#F6F1E7]">
	  <div className="mx-auto w-full px-3 sm:px-4 lg:px-6 py-10 sm:py-12 space-y-10 sm:space-y-12">
		<motion.div
		  ref={rootRef}
		  onMouseMove={prefersReducedMotion ? undefined : onMove}
		  onMouseLeave={prefersReducedMotion ? undefined : onLeave}
		  className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden bg-white shadow-[0_30px_100px_rgba(0,0,0,0.10)]"
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

		  <div className="relative px-6 sm:px-10 lg:px-14 py-14 sm:py-16 lg:py-20">
			<div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start">
			  <div className="max-w-xl">
				<motion.div
				  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
				  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				  viewport={{ once: true, amount: 0.55 }}
				  transition={{ duration: 0.55, ease: "easeOut" }}
				  className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-black/60"
				>
				  <span className="h-2 w-2 rounded-full bg-accent" />
				  система без мотивации
				  <ArrowUpRight className="h-4 w-4 text-black/40" />
				</motion.div>

				<motion.h2
				  initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
				  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				  viewport={{ once: true, amount: 0.45 }}
				  transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
				  className="mt-6 font-sans font-extrabold tracking-tight text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02]"
				>
				  Кто построил
				  <br />
				  эту систему
				</motion.h2>

				<motion.p
				  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
				  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				  viewport={{ once: true, amount: 0.55 }}
				  transition={{ duration: 0.55, ease: "easeOut", delay: 0.12 }}
				  className="mt-8 font-sans text-black text-base sm:text-lg leading-relaxed"
				>
				  Архитектор Счастья —{" "}
				  <span className="relative inline-block font-semibold">
					<span className="relative z-[1]">Ицхак Пинтосевич</span>
					<span className="absolute -inset-x-2 bottom-[2px] h-[10px] bg-yellow-300/60 rounded-full -z-0" />
				  </span>
				</motion.p>

				<motion.div
				  initial="hidden"
				  whileInView="show"
				  viewport={{ once: true, amount: 0.55 }}
				  variants={{
					hidden: {},
					show: {
					  transition: { staggerChildren: 0.08, delayChildren: 0.18 },
					},
				  }}
				  className="mt-8 space-y-3"
				>
				  <MotionLine>Системный подход вместо мотивации</MotionLine>
				  <MotionLine>Структура действий: что делать и в каком порядке</MotionLine>
				  <MotionLine>Внедрение в жизнь, а не теория</MotionLine>
				</motion.div>

				<motion.div
				  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
				  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				  viewport={{ once: true, amount: 0.55 }}
				  transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 }}
				  className="mt-10 flex flex-col sm:flex-row gap-4"
				>
				  <Button
					size="xl"
					onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
					className="rounded-full px-10 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
				  >
					Принять участие
					<ArrowRight className="ml-2 h-5 w-5" />
				  </Button>

				  <Button
					size="xl"
					onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
					className="rounded-full px-10 bg-accent text-white hover:opacity-95 font-semibold"
				  >
					Записаться FREE на вводный урок
				  </Button>
				</motion.div>
			  </div>

			  <div className="space-y-8">
				<div className="grid sm:grid-cols-2 gap-8">
				  <Metric
					value={15}
					suffix="+"
					label="лет трансформационной практики"
					hint="практика, не мотивация"
				  />
				  <Metric
					value={250000}
					suffix="+"
					label="учеников"
					hint="проверено на реальных людях"
					compact
				  />
				</div>

				<motion.div
				  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
				  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				  viewport={{ once: true, amount: 0.55 }}
				  transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
				  whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.01 }}
				  className="rounded-2xl sm:rounded-3xl bg-black text-white px-7 sm:px-8 py-7 sm:py-8 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
				>
				  <div className="text-[11px] tracking-[0.22em] uppercase text-white/60 font-sans">
					ключевая идея
				  </div>
				  <div className="mt-4 font-sans font-semibold text-lg sm:text-xl leading-snug">
					«Я не мотивирую. Я проектирую систему жизни.»
				  </div>
				</motion.div>

				<motion.div
				  initial="hidden"
				  whileInView="show"
				  viewport={{ once: true, amount: 0.55 }}
				  variants={{
					hidden: {},
					show: {
					  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
					},
				  }}
				  className="pt-2 space-y-3"
				>
				  <MotionArrowRight>понятно, что делать дальше</MotionArrowRight>
				  <MotionArrowRight>решения становятся проще</MotionArrowRight>
				  <MotionArrowRight>результаты становятся стабильнее</MotionArrowRight>
				</motion.div>
			  </div>
			</div>
		  </div>
		</motion.div>

		<div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden bg-white shadow-[0_30px_100px_rgba(0,0,0,0.08)]">
		  <div className="px-6 sm:px-10 lg:px-14 py-12 sm:py-14 lg:py-16">
			<motion.p
			  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
			  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			  viewport={{ once: true, amount: 0.4 }}
			  transition={{ duration: 0.6, ease: "easeOut" }}
			  className="font-sans text-black text-base sm:text-lg leading-relaxed max-w-5xl"
			>
			  Я создал проверенный алгоритм, который выводит из хаоса в устойчивое состояние
			  осознанности, энергии и наполненности. Рост постоянного ощущения счастья в 2 раза:
			  в среднем оценка состояния участников после обучения растет с{" "}
			  <span className="font-semibold">5,8</span> до{" "}
			  <span className="font-semibold">9,3</span> балла из 10.
			</motion.p>

			<div className="mt-10 sm:mt-12 grid md:grid-cols-3 gap-8 md:gap-10">
			  <Stat
				value="77%"
				desc={
				  <>
					Участников после обучения
					<br />
					ощутили средний уровень
					<br />
					счастья на уровне 9–10 из 10
				  </>
				}
			  />

			  <Stat
				value="64,7%"
				desc={
				  <>
					Улучшили отношения в семье
					<br />и с партнёром
				  </>
				}
			  />

			  <Stat
				value="57,6%"
				desc={
				  <>
					Стали успешнее
					<br />в работе и бизнесе
				  </>
				}
			  />
			</div>

			<div className="mt-14 sm:mt-16 rounded-2xl sm:rounded-3xl bg-black/5 border border-black/10 px-6 sm:px-10 py-10 sm:py-12">
			  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
				<div className="font-sans font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl leading-[1.02]">
				  <span className="text-accent">94</span>{" "}
				  <span className="text-black">страны и</span>{" "}
				  <span className="text-accent">2774</span>{" "}
				  <span className="text-black">города</span>
				</div>

				<div className="font-sans text-black text-sm sm:text-base">
				  География наших
				  <br />
				  участников
				</div>
			  </div>
			</div>
		  </div>
		</div>

	  </div>
	</section>
  );
};

/* ============================================================================
   ✅ EXPORT: mobile + desktop
   ============================================================================ */
const TechnologySection = () => {
  return (
	<>
	  <MobileTechnologySection />
	  <DesktopTechnologySection />
	</>
  );
};

export default TechnologySection;

/* ===================== helpers (ТВОИ, без изменений) ===================== */

function MotionLine({ children }: { children: React.ReactNode }) {
  return (
	<motion.div
	  variants={{
		hidden: { opacity: 0, y: 8, filter: "blur(8px)" },
		show: { opacity: 1, y: 0, filter: "blur(0px)" },
	  }}
	  transition={{ duration: 0.5, ease: "easeOut" }}
	  className="flex items-start gap-3"
	>
	  <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-black/60 shrink-0" />
	  <span className="font-sans text-black text-base sm:text-lg leading-relaxed">
		{children}
	  </span>
	</motion.div>
  );
}

function MotionArrowRight({ children }: { children: React.ReactNode }) {
  return (
	<motion.div
	  variants={{
		hidden: { opacity: 0, y: 8, filter: "blur(8px)" },
		show: { opacity: 1, y: 0, filter: "blur(0px)" },
	  }}
	  transition={{ duration: 0.5, ease: "easeOut" }}
	  className="flex items-start gap-3"
	>
	  <span className="mt-[3px] text-black/70 font-semibold">→</span>
	  <span className="font-sans text-black text-base sm:text-lg leading-relaxed">
		{children}
	  </span>
	</motion.div>
  );
}

function Metric({
  value,
  suffix,
  label,
  hint,
  compact,
}: {
  value: number;
  suffix?: string;
  label: string;
  hint?: string;
  compact?: boolean;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const formatted = (n: number) => {
	if (compact && n >= 1000) {
	  const k = n / 1000;
	  if (k >= 1000) return `${(k / 1000).toFixed(0)}M`;
	  return `${Math.round(k)}k`;
	}
	return new Intl.NumberFormat("ru-RU").format(Math.round(n));
  };

  useEffect(() => {
	if (!ref.current) return;
	const el = ref.current;
	const io = new IntersectionObserver(
	  (entries) => {
		for (const entry of entries) {
		  if (entry.isIntersecting) {
			setIsInView(true);
			io.disconnect();
			break;
		  }
		}
	  },
	  { threshold: 0.35 }
	);
	io.observe(el);
	return () => io.disconnect();
  }, []);

  return (
	<div ref={ref} className="border-t border-black/10 pt-6">
	  <div className="relative">
		<motion.div
		  initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
		  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
		  viewport={{ once: true, amount: 0.6 }}
		  transition={{ duration: 0.55, ease: "easeOut" }}
		  className="font-sans font-extrabold tracking-tight text-black text-4xl sm:text-5xl leading-none"
		>
		  <CountUp
			to={value}
			active={isInView}
			duration={prefersReducedMotion ? 0 : 900}
			format={formatted}
		  />
		  {suffix ? <span>{suffix}</span> : null}
		</motion.div>

		<div className="mt-2 font-sans font-semibold text-black text-base sm:text-lg">
		  {label}
		</div>
		{hint ? (
		  <div className="mt-2 font-sans text-black/60 text-sm sm:text-base">
			{hint}
		  </div>
		) : null}
	  </div>
	</div>
  );
}

function CountUp({
  to,
  active,
  duration,
  format,
}: {
  to: number;
  active: boolean;
  duration: number;
  format: (n: number) => string;
}) {
  const mv = useMotionValue(0);
  const sp = useSpring(mv, { stiffness: 120, damping: 20, mass: 0.8 });
  const [txt, setTxt] = useState("0");

  useEffect(() => {
	const unsub = sp.on("change", (v) => setTxt(format(v)));
	return () => unsub();
  }, [sp, format]);

  useEffect(() => {
	if (!active) return;
	if (duration === 0) {
	  mv.set(to);
	  return;
	}
	const start = performance.now();
	const from = mv.get();
	const delta = to - from;

	let raf = 0;
	const tick = (t: number) => {
	  const p = Math.min(1, (t - start) / duration);
	  const eased = 1 - Math.pow(1 - p, 3);
	  mv.set(from + delta * eased);
	  if (p < 1) raf = requestAnimationFrame(tick);
	};
	raf = requestAnimationFrame(tick);
	return () => cancelAnimationFrame(raf);
  }, [active, duration, to, mv]);

  return <span>{txt}</span>;
}

function Stat({ value, desc }: { value: string; desc: React.ReactNode }) {
  return (
	<motion.div
	  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
	  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
	  viewport={{ once: true, amount: 0.45 }}
	  transition={{ duration: 0.55, ease: "easeOut" }}
	>
	  <div className="font-sans font-extrabold tracking-tight text-accent text-5xl sm:text-6xl md:text-7xl leading-none">
		{value}
	  </div>
	  <div className="mt-4 font-sans text-black text-sm sm:text-base leading-relaxed max-w-xs">
		{desc}
	  </div>
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