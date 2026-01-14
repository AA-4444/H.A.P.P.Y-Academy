import { useMemo, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ замени на свои картинки под пункты (или оставь одну и ту же)
import f1 from "@/assets/bg2.png";
import f2 from "@/assets/bg3.png";
import f3 from "@/assets/bg4.png";
import f4 from "@/assets/bg5.png";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";

export default function ParticipationFormat() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = useMemo(
	() => [
	  { label: "онлайн формат", image: f1 },
	  { label: "доступ с любого устройства", image: f2 },
	  { label: "можно начать без подготовки", image: f3 },
	  { label: "вводный FREE-урок", image: f4 },
	],
	[]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  return (
	<section id="format" ref={ref} className="bg-[#F6F1E7] py-20 md:py-24">
	  <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
		<div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 lg:gap-16 items-center">
		  {/* LEFT */}
		  <motion.div
			initial={{ opacity: 0, x: -28 }}
			animate={isInView ? { opacity: 1, x: 0 } : {}}
			transition={{ duration: 0.7, ease: "easeOut" }}
		  >
			<div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest uppercase text-black/45">
			  <span className="h-2 w-2 rounded-full bg-accent" />
			  6) ФОРМАТ УЧАСТИЯ
			</div>

			<h2 className="mt-5 font-sans font-extrabold tracking-tight text-black text-3xl sm:text-4xl md:text-5xl leading-[1.05]">
			  Как проходит обучение
			</h2>

			{/* LIST */}
			<div className="mt-10 space-y-3">
			  {items.map((it, index) => {
				const active = index === activeIndex;
				return (
				  <motion.button
					key={it.label}
					type="button"
					initial={{ opacity: 0, x: -14 }}
					animate={isInView ? { opacity: 1, x: 0 } : {}}
					transition={{ duration: 0.45, delay: index * 0.08 }}
					onMouseEnter={() => setActiveIndex(index)}
					onFocus={() => setActiveIndex(index)}
					className="w-full text-left group"
				  >
					<div className="flex items-baseline gap-4">
					  <span
						className={[
						  "font-sans text-xs tracking-widest",
						  active ? "text-black/70" : "text-black/30",
						].join(" ")}
					  >
						{String(index + 1).padStart(2, "0")}
					  </span>

					  <div className="flex items-center gap-3">
						<span
						  className={[
							"font-serif leading-tight transition-colors duration-300",
							"text-3xl sm:text-4xl md:text-5xl",
							active ? "text-black" : "text-black/35",
						  ].join(" ")}
						>
						  {it.label}
						</span>

						{active && (
						  <motion.span
							initial={{ opacity: 0, x: -8 }}
							animate={{ opacity: 1, x: 0 }}
							className="hidden sm:inline-flex"
						  >
							<span className="h-2 w-2 rounded-full bg-accent" />
						  </motion.span>
						)}
					  </div>
					</div>

					{/* subtle separator */}
					<div className="mt-3 h-px w-full bg-black/10" />
				  </motion.button>
				);
			  })}
			</div>

			{/* CTA (в стиле твоего сайта: жёлтая + оранжевая) */}
			<div className="mt-10 flex flex-col sm:flex-row gap-4">
			  <Button
				size="lg"
				onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
				className="rounded-full px-8 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
			  >
				Принять участие
				<ArrowRight className="ml-2 h-5 w-5" />
			  </Button>

			  <Button
				size="lg"
				onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
				className="rounded-full px-8 bg-accent text-white hover:opacity-95 font-semibold"
			  >
				Записаться FREE на вводный урок
			  </Button>
			</div>
		  </motion.div>

		  {/* RIGHT */}
		  <motion.div
			initial={{ opacity: 0, x: 28 }}
			animate={isInView ? { opacity: 1, x: 0 } : {}}
			transition={{ duration: 0.7, ease: "easeOut" }}
			className="relative"
		  >
			{/* card shell like Tony */}
			<div className="rounded-[32px] overflow-hidden bg-black shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
			  <div className="relative">
				<motion.img
				  key={items[activeIndex].image}
				  src={items[activeIndex].image}
				  alt={items[activeIndex].label}
				  className="w-full h-[520px] md:h-[600px] object-cover opacity-95"
				  initial={{ opacity: 0, scale: 1.02 }}
				  animate={{ opacity: 1, scale: 1 }}
				  transition={{ duration: 0.45, ease: "easeOut" }}
				  draggable={false}
				/>

				{/* subtle overlay for premium feel */}
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />

				{/* small label bottom-left */}
				<div className="absolute bottom-5 left-5">
				  <div className="rounded-full bg-white/12 backdrop-blur-md border border-white/20 px-4 py-2">
					<span className="font-sans text-xs tracking-widest uppercase text-white/85">
					  {items[activeIndex].label}
					</span>
				  </div>
				</div>
			  </div>
			</div>

			{/* thin ring like your hero cards */}
			<div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-black/10" />
		  </motion.div>
		</div>
	  </div>
	</section>
  );
}