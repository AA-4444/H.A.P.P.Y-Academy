import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import img1 from "@/assets/bg2.png";
import img2 from "@/assets/bg3.png";
import img3 from "@/assets/bg4.png";
import img4 from "@/assets/bg5.png";
import img5 from "@/assets/bg6.png";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";

const items = [
  { label: "архитектуру мышления", image: img1 },
  { label: "понимание истинных целей", image: img2 },
  { label: "порядок в решениях", image: img3 },
  { label: "инструменты внедрения в реальной жизни", image: img4 },
  { label: "логику: что делать, зачем и в каком порядке", image: img5 },
];

const Pillars = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 md:py-24 bg-[#F6F1E7]" ref={ref}>
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.25fr] gap-16 items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-widest text-black/45 uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-accent" />
              4) Что внутри системы
            </span>

            <h2 className="font-sans font-extrabold tracking-tight text-black text-3xl sm:text-4xl md:text-5xl leading-[1.05] mb-8">
              Что ты получаешь
            </h2>

            {/* ✅ отступ + нумерация */}
            <div className="space-y-3">
              {items.map((it, index) => (
                <motion.button
                  key={it.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className="block text-left w-full group"
                >
                  <div className="flex items-baseline gap-4">
                    {/* номер */}
                    <span
                      className={`font-sans text-xs tracking-widest ${
                        activeIndex === index
                          ? "text-black/70"
                          : "text-black/30"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* текст */}
                    <span
                      className={`font-serif text-3xl sm:text-4xl md:text-5xl leading-tight transition-colors duration-300 ${
                        activeIndex === index
                          ? "text-black"
                          : "text-black/35"
                      }`}
                    >
                      {it.label}
                    </span>

                    {/* кнопка */}
                    {activeIndex === index && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex ml-2"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full text-xs font-sans"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(TELEGRAM_BOT_URL, "_blank");
                          }}
                        >
                          Узнать
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </motion.span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                className="rounded-full px-8 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
              >
                Принять участие
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
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-[28px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
              <motion.img
                key={items[activeIndex].image}
                src={items[activeIndex].image}
                alt={items[activeIndex].label}
                className="w-full h-[520px] md:h-[600px] object-cover"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                draggable={false}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pillars;