import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/bg1.png";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";

// подстрой под свой header (72/80/88/96)
const HEADER_H = 88;

const Hero = () => {
  return (
    <section className="bg-black">
      {/* сдвиг под header */}
      <div style={{ paddingTop: HEADER_H }} className="bg-black">
        {/* ШИРОКО как реф: почти во всю ширину */}
        <div className="mx-auto w-full px-3 sm:px-4 lg:px-6">
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-black shadow-[0_30px_100px_rgba(0,0,0,0.65)]">
            {/* 1 экран: высота = viewport - header - внешний отступ */}
            <div
              className="relative"
              style={{
                height: `calc(100vh - ${HEADER_H}px - 24px)`,
                minHeight: 520,
              }}
            >
              {/* фон */}
              <img
                src={heroImage}
                alt="Ицхак Пинтосевич"
                className="absolute inset-0 h-full w-full object-cover object-[center_18%] opacity-95"
              />

             

              {/* синие “полосы/лучи” */}
              <div className="pointer-events-none absolute -top-16 left-[6%] h-[120%] w-[900px] -skew-x-12 bg-gradient-to-b from-sky-400/28 via-blue-500/12 to-transparent blur-2xl" />
              <div className="pointer-events-none absolute -top-16 left-[42%] h-[120%] w-[650px] -skew-x-12 bg-gradient-to-b from-cyan-300/18 via-cyan-500/6 to-transparent blur-2xl" />

              {/* КОНТЕНТ: как на рефе — ПРИЖАТ К НИЗУ */}
              <div className="relative z-10 h-full">
                <div className="h-full px-6 sm:px-10 lg:px-14">
                  {/* ВАЖНО: items-end => всё внизу */}
                  <div className="h-full grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-end">
                    {/* LEFT TEXT — внизу слева */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      className="max-w-3xl pb-10 sm:pb-12 lg:pb-14"
                    >
                      <h1 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.02] mb-6">
                        <span>Счастье,</span>{" "}
                        <span className="italic">которое меняет всё</span>
                        <span className="text-accent">!</span>
                      </h1>

                      <p className="text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed">
                        Присоединяйся к бесплатному практикуму от Ицхака Пинтосевича
                        и открой алгоритм устойчивого счастья.
                      </p>

                      <Button
                        variant="hero"
                        size="xl"
                        onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                        className="rounded-full px-10"
                      >
                        ПОЛУЧИТЬ БЕСПЛАТНЫЙ ДОСТУП
                      </Button>
                    </motion.div>

                    {/* RIGHT CARD — внизу справа */}
                    <motion.div
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.12, duration: 0.65 }}
                      className="hidden lg:flex justify-end pb-10 sm:pb-12 lg:pb-14"
                    >
                      <div className="w-full max-w-[460px]">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-semibold tracking-widest text-white/70">
                            NEXT EVENT
                          </span>
                        </div>

                        <div className="bg-black/25 backdrop-blur-md rounded-2xl overflow-hidden border border-white/15">
                          <div className="aspect-video relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent" />

                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white font-serif text-2xl text-center px-6">
                                МАСТЕР<br />СЧАСТЬЯ
                              </span>
                            </div>

                            <button
                              className="absolute bottom-4 right-4 bg-black/45 backdrop-blur-sm rounded-full px-5 py-2.5 text-white text-sm font-medium flex items-center gap-2 hover:bg-black/60 transition-colors border border-white/15"
                              onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                            >
                              <Play className="w-4 h-4 fill-current" />
                              Смотреть
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* тонкая рамка */}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10" />
            </div>
          </div>
        </div>

        {/* маленький чёрный низ как на рефе */}
        <div className="h-6 sm:h-8" />
      </div>
    </section>
  );
};

export default Hero;