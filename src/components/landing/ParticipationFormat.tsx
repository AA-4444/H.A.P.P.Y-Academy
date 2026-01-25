import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import f1 from "@/assets/bg2.png"; // ОДНА ФОТКА

const TELEGRAM_BOT_URL = "https://www.instagram.com/isaacpintosevich/";

export default function ParticipationFormat() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const goPrograms = () => {
	const el = document.getElementById("programs");
	if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleGift = () => window.open(TELEGRAM_BOT_URL, "_blank");

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
			  Получите подарок от Ицхака Пинтосевича
			</h2>

			{/* ОДИН ТЕКСТ */}
			<motion.p
			  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
			  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			  transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
			  className="mt-10 font-serif text-black text-2xl sm:text-3xl md:text-4xl leading-tight"
			>
			  Поделись рилсом в Инстаграм сторис
			</motion.p>

			<motion.p
			  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
			  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
			  transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
			  className="mt-8 font-sans text-black/65 text-sm sm:text-base leading-relaxed max-w-xl"
			>
			  После этого вы получите личный подарок от Ицхака Пинтосевича.
			</motion.p>

			{/* 2 КНОПКИ */}
			<div className="mt-10 flex flex-col sm:flex-row gap-4">
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

			  <Button
				size="lg"
				onClick={handleGift}
				className="
				  w-full sm:w-auto
				  rounded-full
				  px-8
				  bg-accent text-white hover:opacity-95
				  font-semibold
				"
			  >
				Получить подарок
			  </Button>
			</div>
		  </motion.div>

		  {/* RIGHT — ОДНА ФОТКА */}
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