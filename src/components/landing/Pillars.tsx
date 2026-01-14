import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-main.jpg";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";

const pillars = [
  { label: "Осознанность", isActive: false },
  { label: "Энергия", isActive: false },
  { label: "Здоровье", isActive: false },
  { label: "Отношения", isActive: false },
  { label: "Успех", isActive: false },
  { label: "Лидерство", isActive: false },
  { label: "Счастье", isActive: true },
];

const Pillars = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(6);

  return (
    <section className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Pillars List */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Основы счастливой жизни
            </span>

            <div className="space-y-2">
              {pillars.map((pillar, index) => (
                <motion.button
                  key={pillar.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`block text-left w-full group ${
                    activeIndex === index ? "text-foreground" : "text-muted-foreground/60"
                  }`}
                >
                  <span className="font-serif text-5xl md:text-6xl lg:text-7xl transition-colors duration-300 hover:text-foreground flex items-center gap-4">
                    {pillar.label}
                    {activeIndex === index && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-full text-sm font-sans"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(TELEGRAM_BOT_URL, "_blank");
                          }}
                        >
                          Узнать
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </motion.span>
                    )}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={heroImage}
                alt="Счастье"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pillars;
