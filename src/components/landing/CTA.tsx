import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/cta.png";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";

const CTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background image */}
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/40" />

      {/* content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl"
        >
          {/* title */}
          <h2
            className="font-sans font-extrabold tracking-tight text-white leading-[1.05]
                       text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Сколько ещё жить без системы?
          </h2>

          {/* buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="hero"
              size="xl"
              onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
              className="px-10"
            >
              Принять участие
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              size="xl"
              variant="outline"
              onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
              className="px-10 border-white/40 text-white hover:bg-white/10"
            >
              Записаться FREE на вводный урок
            </Button>
          </div>

          {/* subline */}
          <p className="mt-8 font-sans text-white/75 text-base sm:text-lg">
            Минимальный вход —{" "}
            <span className="font-semibold text-white">$1</span>. Риск — ноль.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;