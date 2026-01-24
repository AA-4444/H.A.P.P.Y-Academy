import { useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import f1 from "@/assets/bg2.png";
import f2 from "@/assets/bg3.png";
import f3 from "@/assets/bg4.png";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";
const INSTAGRAM_URL = "https://www.instagram.com/isaacpintosevich/";
const VIDEO_URL = "https://www.instagram.com/reel/";

export default function ParticipationFormat() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const items = useMemo(
	() => [
	  { label: "Подпишитесь на Instagram Ицхака", image: f1 },
	  { label: "Поделитесь этим видео в сторис", image: f2 },
	  { label: "Напишите фразу: «Счастье — это …»", image: f3 },
	],
	[]
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const handleMainCTA = () => window.open(TELEGRAM_BOT_URL, "_blank");
  const handleInstagram = () => window.open(INSTAGRAM_URL, "_blank");
  const handleVideo = () => window.open(VIDEO_URL, "_blank");

  return (
	<section id="viral-offer" ref={ref} className="bg-[#F6F1E7] py-20 md:py-24">
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
			  ВИРУСНЫЙ ОФФЕР
			</div>

			<h2 className="mt-5 font-sans font-extrabold tracking-tight text-black text-3xl sm:text-4xl md:text-5xl leading-[1.05]">
			  Получите подарок от Ицхака
			</h2>

			{/* LIST */}
			<div className="mt-10 space-y-3">
			  {items.map((it, index) => {
				const active = index === activeIndex;
				const click =
				  index === 0 ? handleInstagram : index === 1 ? handleVideo : undefined;

				return (
				  <motion.button
					key={it.label}
					type="button"
					initial={{ opacity: 0, x: -14 }}
					animate={isInView ? { opacity: 1, x: 0 } : {}}
					transition={{ duration: 0.45, delay: index * 0.08 }}
					onMouseEnter={() => setActiveIndex(index)}
					onFocus={() => setActiveIndex(index)}
					onClick={click}
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

					  <span
						className={[
						  "font-serif leading-tight transition-colors duration-300",
						  "text-2xl sm:text-3xl md:text-4xl",
						  active ? "text-black" : "text-black/35",
						].join(" ")}
					  >
						{it.label}
					  </span>
					</div>

					<div className="mt-3 h-px w-full bg-black/10" />
				  </motion.button>
				);
			  })}
			</div>

			{/* подпись */}
			<motion.p
			  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
			  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			  transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
			  className="mt-8 font-sans text-black/65 text-sm sm:text-base leading-relaxed max-w-xl"
			>
			  После этого вы получите личный подарок от Ицхака.
			</motion.p>

			{/* CTA */}
			<div className="mt-10 flex flex-col sm:flex-row gap-4">
			  <Button
				size="lg"
				onClick={handleMainCTA}
				className="
				  w-full sm:w-auto
				  rounded-full
				  px-8
				  bg-yellow-400 text-black hover:bg-yellow-300
				  font-semibold
				"
			  >
				Получить подарок
				<ArrowRight className="ml-2 h-5 w-5" />
			  </Button>

			  <Button
				size="lg"
				onClick={handleInstagram}
				className="
				  w-full sm:w-auto
				  rounded-full
				  px-8
				  bg-accent text-white hover:opacity-95
				  font-semibold
				"
			  >
				Instagram Ицхака
			  </Button>

			  <Button
				size="lg"
				onClick={handleVideo}
				className="
				  w-full sm:w-auto
				  rounded-full
				  px-8
				  bg-[#E4002B] text-white hover:opacity-95
				  font-semibold
				"
			  >
				Смотреть видео
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
			<div className="rounded-[32px] overflow-hidden bg-black shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
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
			  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
			</div>

			<div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-black/10" />
		  </motion.div>
		</div>
	  </div>
	</section>
  );
}