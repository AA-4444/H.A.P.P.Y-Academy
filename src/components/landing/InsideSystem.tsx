import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import insideImage from "@/assets/bg4.png"; // ⬅️ подставь своё фото/картинку

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";

const InsideSystem = () => {
  const items = [
	"архитектуру мышления",
	"понимание истинных целей",
	"порядок в решениях",
	"инструменты внедрения в реальной жизни",
	"логику: что делать, зачем и в каком порядке",
  ];

  return (
	<section id="inside" className="bg-[#F6F1E7]">
	  <div className="mx-auto w-full px-3 sm:px-4 lg:px-6 py-10 sm:py-12">
		<div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-white overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.08)]">
		  <div className="px-6 sm:px-10 lg:px-14 py-14 sm:py-16 lg:py-20">
			<div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
			  {/* LEFT: text */}
			  <motion.div
				initial={{ opacity: 0, y: 18 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.35 }}
				transition={{ duration: 0.6 }}
			  >
				<h2 className="font-sans font-extrabold tracking-tight text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
				  Что ты получаешь
				</h2>

				<div className="mt-10 grid gap-4">
				  {items.map((t, i) => (
					<motion.div
					  key={t}
					  initial={{ opacity: 0, y: 10 }}
					  whileInView={{ opacity: 1, y: 0 }}
					  viewport={{ once: true, amount: 0.35 }}
					  transition={{ duration: 0.45, delay: 0.05 + i * 0.04 }}
					  className="rounded-2xl sm:rounded-3xl bg-black/5 border border-black/10 px-6 py-5"
					>
					  <div className="flex items-start gap-4">
						<span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent shrink-0" />
						<p className="font-sans text-black/75 text-base sm:text-lg leading-relaxed">
						  {t}
						</p>
					  </div>
					</motion.div>
				  ))}
				</div>

				{/* CTA buttons */}
				<div className="mt-10 flex flex-col sm:flex-row gap-4">
				  <Button
					size="xl"
					onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
					className="rounded-full px-10 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
				  >
					Принять участие
				  </Button>

				  <Button
					size="xl"
					onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
					className="rounded-full px-10 bg-accent text-white hover:opacity-95 font-semibold"
				  >
					Записаться FREE на вводный урок
				  </Button>
				</div>
			  </motion.div>

			  {/* RIGHT: image */}
			  <motion.div
				initial={{ opacity: 0, y: 18 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.35 }}
				transition={{ duration: 0.6, delay: 0.08 }}
				className="relative"
			  >
				<div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
				  <img
					src={insideImage}
					alt=""
					className="w-full h-[360px] sm:h-[420px] lg:h-[520px] object-cover"
					draggable={false}
				  />
				  {/* лёгкая виньетка, чтобы было “дороже” */}
				  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
				  {/* тонкая рамка как в hero */}
				  <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10" />
				</div>
			  </motion.div>
			</div>
		  </div>
		</div>

		{/* как в hero — маленький нижний отступ */}
		<div className="h-6 sm:h-8" />
	  </div>
	</section>
  );
};

export default InsideSystem;