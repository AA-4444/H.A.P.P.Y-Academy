import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/cta.png";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";
const HEADER_H = 0;

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={containerRef} className="bg-[#F7F3EE]">
      <motion.div style={{ scale, opacity }}>
        <div style={{ paddingTop: HEADER_H }} className="bg-[#F7F3EE]">
          <div className="mx-auto w-full px-3 sm:px-4 lg:px-6">
            <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-transparent shadow-[0_30px_100px_rgba(0,0,0,0.25)]">
              <div
                ref={ref}
                className="relative"
                style={{
                  height: `calc(100vh - ${HEADER_H}px - 24px)`,
                  minHeight: 520,
                }}
              >
                <img
                  src={heroImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/40" />

                <div className="relative z-10 h-full">
                  <div className="h-full px-6 sm:px-10 lg:px-14">
                    <div className="h-full flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center max-w-3xl"
                      >
                        <h2
                          className="font-sans font-extrabold tracking-tight text-white leading-[1.05]
                                     text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                        >
                          Сколько ещё жить без системы?
                        </h2>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                          <Button
                            size="xl"
                            onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                            className="rounded-full px-12 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
                          >
                            Принять участие
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>

                          <Button
                            size="xl"
                            onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                            className="rounded-full px-12 bg-accent text-white hover:opacity-95 font-semibold"
                          >
                            Записаться FREE на вводный урок
                          </Button>
                        </div>

                        <p className="mt-8 font-sans text-white/75 text-base sm:text-lg">
                          Минимальный вход —{" "}
                          <span className="font-semibold text-white">$1</span>. Риск — ноль.
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10" />
              </div>
            </div>
          </div>

          <div className="h-6 sm:h-8" />
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;