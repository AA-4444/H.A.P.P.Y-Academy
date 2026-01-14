import { motion } from "framer-motion";

const TechnologySection = () => {
  return (
	<section className="bg-[#F6F1E7]">
	  <div className="mx-auto w-full px-3 sm:px-4 lg:px-6 py-10 sm:py-12 space-y-10 sm:space-y-12">
		{/* =========================
			БЛОК 1: МИКРО-БЛОК ЭКСПЕРТА (как hero-карточка)
		   ========================= */}
		<div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden bg-white shadow-[0_30px_100px_rgba(0,0,0,0.08)]">
		  <div className="px-6 sm:px-10 lg:px-14 py-14 sm:py-16 lg:py-20">
			<div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-start">
			  {/* LEFT */}
			  <motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.35 }}
				transition={{ duration: 0.55 }}
			  >
				<h2 className="font-sans font-extrabold tracking-tight text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
				  Кто выстроил
				  <br />
				  эту систему
				</h2>

				<p className="mt-7 font-sans text-black/70 text-base sm:text-lg leading-relaxed max-w-xl">
				  Архитектор Счастья —{" "}
				  <span className="font-semibold text-black/80">
					Ицхак Пинтосевич
				  </span>
				</p>
			  </motion.div>

			  {/* RIGHT: cards */}
			  <motion.div
				initial={{ opacity: 0, y: 16 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.35 }}
				transition={{ duration: 0.55, delay: 0.05 }}
				className="space-y-4"
			  >
				<div className="grid sm:grid-cols-2 gap-4">
				  <InfoCard>
					<div className="font-sans font-semibold text-black/80 text-lg leading-snug">
					  15+ лет практики
					</div>
				  </InfoCard>

				  <InfoCard>
					<div className="font-sans font-semibold text-black/80 text-lg leading-snug">
					  250 000+ учеников
					</div>
				  </InfoCard>
				</div>

				<InfoCard className="min-h-[96px] flex items-center">
				  <div className="font-sans font-semibold text-black/75 text-lg leading-snug">
					Системный подход вместо мотивации
				  </div>
				</InfoCard>

				{/* dark emphasis (как "next event" по ощущению) */}
				<div className="rounded-2xl sm:rounded-3xl bg-black text-white border border-black/10 px-6 sm:px-7 py-6 sm:py-7">
				  <div className="font-sans font-semibold text-lg sm:text-xl leading-snug">
					«Я не мотивирую. Я проектирую систему жизни.»
				  </div>
				</div>
			  </motion.div>
			</div>
		  </div>
		</div>

		{/* =========================
			БЛОК 2: статистика (оставил твою структуру)
		   ========================= */}
		<div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden bg-white shadow-[0_30px_100px_rgba(0,0,0,0.08)]">
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
	  className={[
		"rounded-2xl sm:rounded-3xl bg-black/5 border border-black/10 px-6 py-6",
		className,
	  ].join(" ")}
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