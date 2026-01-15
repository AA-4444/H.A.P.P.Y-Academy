import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/bg1.png";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";
const HEADER_H = 88;

/**
 * ✅ MOBILE HERO (50% фото сверху + контент снизу)
 * - верхний блок: 50vh (но не меньше), чисто фон+лучи
 * - нижний блок: текст+кнопки (скроллится если не влезает)
 */
const MobileHero = () => {
   return (
     <section className="lg:hidden bg-[#F7F3EE]">
       <div style={{ paddingTop: HEADER_H }} className="bg-[#F7F3EE]">
         <div className="mx-auto w-full px-3 sm:px-4">
           <div className="relative overflow-hidden rounded-[28px] bg-transparent shadow-[0_30px_100px_rgba(0,0,0,0.25)]">
             <div
               className="relative grid grid-rows-[1fr_1fr]"
               style={{
                 height: `calc(100vh - ${HEADER_H}px - 24px)`,
                 minHeight: 520,
               }}
             >
               {/* ===================== TOP (PHOTO 50%) ===================== */}
               <div className="relative overflow-hidden">
                 <img
                   src={heroImage}
                   alt=""
                   className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
                   draggable={false}
                 />
 
                 {/* лучи */}
                 <div className="pointer-events-none absolute -top-16 left-[6%] h-[140%] w-[900px] -skew-x-12 bg-gradient-to-b from-sky-400/28 via-blue-500/12 to-transparent blur-2xl" />
                 <div className="pointer-events-none absolute -top-16 left-[42%] h-[140%] w-[650px] -skew-x-12 bg-gradient-to-b from-cyan-300/18 via-cyan-500/6 to-transparent blur-2xl" />
 
                 {/* мягкий затемняющий градиент ВНУТРИ фото (не лезет в низ) */}
                 <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-black/30" />
               </div>
 
               {/* ===================== BOTTOM (CONTENT 50%) ===================== */}
               <div className="relative bg-white">
                 {/* разделитель, который НЕ сдвигает контент */}
                 <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-black/10" />
 
                 {/* контент: если места мало — скролл внутри нижней половины (ничего не “съедается”) */}
                 <div className="h-full overflow-y-auto px-5 pt-6 pb-8">
                   <motion.div
                     initial={{ opacity: 0, y: 18 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6 }}
                     className="w-full"
                   >
                     <h1 className="font-sans font-extrabold text-3xl text-black leading-[1.08] mb-4">
                       Ты не застрял.
                       <br />
                       У твоей жизни просто нет архитектуры
                       <span className="text-accent">.</span>
                     </h1>
 
                     <p className="font-sans text-sm text-black/70 leading-relaxed mb-5 max-w-[46ch]">
                       Система, которая помогает навести порядок в мышлении, решениях и действиях.
                       <br />
                       <span className="block mt-3 font-semibold text-black">Без мотивации.</span>
                       <span className="block font-semibold text-black">Без иллюзий.</span>
                       <span className="block font-semibold text-black">
                         Только работающая структура.
                       </span>
                     </p>
 
                     {/* кнопки */}
                     <div className="w-full">
                       <div className="mx-auto w-full max-w-[520px] space-y-3 pb-2">
                         <Button
                           size="xl"
                           onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                           className="mx-auto block w-full rounded-full px-10 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
                         >
                           Принять участие
                         </Button>
 
                         <Button
                           size="xl"
                           onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                           className="mx-auto block w-full rounded-full px-10 bg-accent text-white hover:opacity-95 font-semibold"
                         >
                           Записаться FREE на вводный урок
                         </Button>
                       </div>
                     </div>
                   </motion.div>
                 </div>
               </div>
 
               <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10" />
             </div>
           </div>
         </div>
 
         <div className="h-6 sm:h-8" />
       </div>
     </section>
   );
 };

/**
 * ✅ DESKTOP HERO (твоя старая секция)
 * Показывается только на lg+
 */
const DesktopHero = () => {
  return (
    <section className="hidden lg:block bg-[#F7F3EE]">
      <div style={{ paddingTop: HEADER_H }} className="bg-[#F7F3EE]">
        <div className="mx-auto w-full px-3 sm:px-4 lg:px-6">
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-transparent shadow-[0_30px_100px_rgba(0,0,0,0.25)]">
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
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
                draggable={false}
              />

              {/* лучи */}
              <div className="pointer-events-none absolute -top-16 left-[6%] h-[120%] w-[900px] -skew-x-12 bg-gradient-to-b from-sky-400/28 via-blue-500/12 to-transparent blur-2xl" />
              <div className="pointer-events-none absolute -top-16 left-[42%] h-[120%] w-[650px] -skew-x-12 bg-gradient-to-b from-cyan-300/18 via-cyan-500/6 to-transparent blur-2xl" />

              {/* контент */}
              <div className="relative z-10 h-full">
                <div className="h-full px-6 sm:px-10 lg:px-14">
                  <div className="h-full grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-end">
                    {/* LEFT */}
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      className="max-w-3xl pb-10 sm:pb-12 lg:pb-14"
                    >
                      <h1 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.05] mb-6">
                        Ты не застрял.
                        <br />
                        У твоей жизни просто нет архитектуры
                        <span className="text-accent">.</span>
                      </h1>

                      <p
                        className="
                          font-sans
                          text-base md:text-lg
                          text-white/80
                          max-w-[46ch]
                          leading-relaxed
                          [text-wrap:balance]
                          mb-10
                        "
                      >
                        Система, которая помогает навести порядок в мышлении, решениях и действиях.
                        <br />
                        <span className="block mt-3 font-semibold text-white">Без мотивации.</span>
                        <span className="block font-semibold text-white">Без иллюзий.</span>
                        <span className="block font-semibold text-white">Только работающая структура.</span>
                      </p>

                      {/* Кнопки (как у тебя было) */}
                      <div className="w-full">
                        <div className="flex flex-col sm:flex-row gap-4 w-full mx-auto items-center sm:items-start justify-center lg:justify-start">
                          <Button
                            size="xl"
                            onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                            className="rounded-full px-10 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold w-full sm:w-auto"
                          >
                            Принять участие
                          </Button>

                          <Button
                            size="xl"
                            onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                            className="rounded-full px-10 bg-accent text-white hover:opacity-95 font-semibold w-full sm:w-auto"
                          >
                            Записаться FREE на вводный урок
                          </Button>
                        </div>
                      </div>
                    </motion.div>

                    {/* RIGHT */}
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

              <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10" />
            </div>
          </div>
        </div>

        <div className="h-6 sm:h-8" />
      </div>
    </section>
  );
};

const Hero = () => {
  return (
    <>
      <MobileHero />
      <DesktopHero />
    </>
  );
};

export default Hero;