import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import f1 from "@/assets/bg2.png"; // ОДНА ФОТКА

export default function ParticipationFormat() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const goPrograms = () => {
	const el = document.getElementById("programs");
	if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
	<section id="avtor" ref={ref} className="bg-[#F6F1E7] py-20 md:py-24">
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
			  ОБ АВТОРЕ
			</div>

			<h2 className="mt-5 font-sans font-extrabold tracking-tight text-black text-3xl sm:text-4xl md:text-5xl leading-[1.05]">
			  Ицхак Пинтосевич
			</h2>

			{/* ОСНОВНОЙ ТЕКСТ */}
			<motion.p
			  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
			  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			  transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
			  className="mt-10 font-serif text-black text-xl sm:text-2xl md:text-3xl leading-tight"
			>
			  12 книг • 2+ млн аудитории • 20&nbsp;000+ выпускников авторских марафонов
			</motion.p>

			<motion.p
			  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
			  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			  transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
			  className="mt-6 font-sans text-black/70 text-sm sm:text-base leading-relaxed max-w-xl"
			>
			  Цель — сделать 1&nbsp;000&nbsp;000 людей на планете счастливыми!
			</motion.p>

			{/* КНОПКА */}
			<div className="mt-10">
			  <Button
				size="lg"
				onClick={goPrograms}
				className="
				  w-full sm:w-auto
				  rounded-full
				  px-8
				  bg-yellow-400 text-black hover:bg-yellow-300
				  font-semibold
				"
			  >
				Стать счастливым
				<ArrowRight className="ml-2 h-5 w-5" />
			  </Button>
			</div>
		  </motion.div>

		  {/* RIGHT — ОДНА ФОТКА */}
		  <motion.div
			initial={{ opacity: 0, x: 28 }}
			animate={isInView ? { opacity: 1, x: 0 } : {}}
			transition={{ duration: 0.7, ease: "easeOut" }}
			className="relative"
		  >
			<div className="rounded-[32px] overflow-hidden bg-white shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
			  <img
				src={f1}
				alt="Ицхак Пинтосевич"
				className="block w-full h-[520px] md:h-[600px] object-cover"
				draggable={false}
			  />
			</div>
		  </motion.div>
		</div>
	  </div>
	</section>
  );
}