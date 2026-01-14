import { motion } from "framer-motion";

const TechnologySection = () => {
  return (
	<section className="bg-black">
	  <div className="mx-auto w-full px-3 sm:px-4 lg:px-6 py-10 sm:py-12 space-y-10 sm:space-y-12">
		{/* =========================
			БЛОК 1: "Технология, а не мотивация."
		   ========================= */}
		<div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden bg-white">
		  <div className="px-6 sm:px-10 lg:px-14 py-14 sm:py-16 lg:py-20">
			<div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
			  {/* Title */}
			  <motion.h2
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.35 }}
				transition={{ duration: 0.55 }}
				className="font-sans font-extrabold tracking-tight text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02]"
			  >
				Технология,
				<br />
				а не мотивация.
			  </motion.h2>

			  {/* Cards */}
			  <motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.35 }}
				transition={{ duration: 0.55, delay: 0.05 }}
				className="space-y-6"
			  >
				<div className="grid sm:grid-cols-3 gap-4">
				  <InfoCard>
					<span className="text-black/70 font-sans font-semibold text-lg leading-snug">
					  Научная позитивная психология Мартина Селигмана.
					</span>
				  </InfoCard>

				  <InfoCard>
					<span className="text-black/70 font-sans font-semibold text-lg leading-snug">
					  15 лет опыта коучинга и обучения наставников.
					</span>
				  </InfoCard>

				  <InfoCard>
					<span className="text-black/70 font-sans font-semibold text-lg leading-snug">
					  25 лет преподавания Торы.
					</span>
				  </InfoCard>
				</div>

				<div className="grid sm:grid-cols-[1.4fr_1fr] gap-4">
				  <InfoCard className="min-h-[112px] flex items-center">
					<span className="text-black/70 font-sans font-semibold text-lg leading-snug">
					  Внедрение навыков в жизнь, а не просто изучение теории.
					</span>
				  </InfoCard>

				  {/* dark emphasis card (как на скрине справа) */}
				  <div className="rounded-2xl sm:rounded-3xl bg-black/70 text-white border border-black/10 px-6 py-6 flex items-center justify-center text-center min-h-[112px]">
					<span className="font-sans font-semibold text-lg leading-snug">
					  Более 250 тысяч
					  <br />
					  учеников за 15 лет.
					</span>
				  </div>
				</div>
			  </motion.div>
			</div>
		  </div>
		</div>

		{/* =========================
			БЛОК 2: статистика (как на втором скрине)
		   ========================= */}
		<div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden bg-white">
		  <div className="px-6 sm:px-10 lg:px-14 py-12 sm:py-14 lg:py-16">
			<motion.p
			  initial={{ opacity: 0, y: 16 }}
			  whileInView={{ opacity: 1, y: 0 }}
			  viewport={{ once: true, amount: 0.35 }}
			  transition={{ duration: 0.55 }}
			  className="font-sans text-black/70 text-base sm:text-lg leading-relaxed max-w-5xl"
			>
			  Я создал проверенный алгоритм, который выводит из хаоса в устойчивое состояние
			  осознанности, энергии и наполненности. Рост постоянного ощущения счастья в 2 раза:
			  в среднем оценка состояния участников после обучения растет с{" "}
			  <span className="font-semibold text-black/80">5,8</span> до{" "}
			  <span className="font-semibold text-black/80">9,3</span> балла из 10.
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
					счастья на уровне 9-10 из 10
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

			{/* bottom big line */}
			<div className="mt-14 sm:mt-16 rounded-2xl sm:rounded-3xl bg-black/5 border border-black/10 px-6 sm:px-10 py-10 sm:py-12">
			  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
				<div className="font-sans font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl leading-[1.02]">
				  <span className="text-accent">94</span>{" "}
				  <span className="text-black/25">страны и</span>{" "}
				  <span className="text-accent">2774</span>{" "}
				  <span className="text-black/25">города</span>
				</div>

				<div className="font-sans text-black/60 text-sm sm:text-base">
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

export default TechnologySection;

/* ---------- UI helpers ---------- */

function InfoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
	<div
	  className={
		"rounded-2xl sm:rounded-3xl bg-black/5 border border-black/10 px-6 py-6 " +
		className
	  }
	>
	  {children}
	</div>
  );
}

function Stat({ value, desc }: { value: string; desc: React.ReactNode }) {
  return (
	<div>
	  <div className="font-sans font-extrabold tracking-tight text-accent text-5xl sm:text-6xl md:text-7xl leading-none">
		{value}
	  </div>
	  <div className="mt-4 font-sans text-black/60 text-sm sm:text-base leading-relaxed max-w-xs">
		{desc}
	  </div>
	</div>
  );
}