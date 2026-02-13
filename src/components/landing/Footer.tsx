import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, ArrowRight, Instagram, ArrowDown, Youtube, Send } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import logo from "@/assets/logo.svg";

const socials = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@isaacpintosevich",
    icon: Youtube,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/isaacpintosevich/",
    icon: Instagram,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@isaacpintosevic",
    icon: FaTiktok,
  },
  {
    label: "Telegram",
    href: "https://t.me/isaac_pintosevich",
    icon: Send,
  },
];

function ScrollToTopBadge({ onClick }: { onClick: () => void }) {
  const text = "наверх • наверх • наверх • наверх • ";

  return (
    <button
      onClick={onClick}
      type="button"
      aria-label="Наверх"
      className="relative h-24 w-24 sm:h-32 sm:w-32 transition-transform hover:scale-105 active:scale-95"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <path
              id="footerCirclePath"
              d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
          </defs>
          <text
            fill="rgba(255,255,255,0.85)"
            fontSize="18"
            className="font-bold uppercase tracking-[2px]"
          >
            <textPath href="#footerCirclePath">{text}</textPath>
          </text>
        </svg>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full bg-white/10 border border-white/30 flex items-center justify-center">
          <ArrowUp className="h-5 w-5 text-white" />
        </div>
      </div>
    </button>
  );
}

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#F6F1E7]">
      <div className="mx-auto w-full px-3 sm:px-4 lg:px-6 pb-8">
        <div className="rounded-[32px] sm:rounded-[40px] bg-[#F6B800] overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 py-24">
            <div className="relative">
              <div className="flex justify-end sm:absolute sm:-top-12 sm:right-0 mb-8 sm:mb-0">
                <ScrollToTopBadge onClick={scrollToTop} />
              </div>

              <p className="text-white/80 text-xl mb-4">
                Остались вопросы? Напишите нам в Telegram:
              </p>

     
          
          {/* TELEGRAM CTA */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
           
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-white/85 text-sm sm:text-base font-semibold">
                нажми
              </span>
          
              {/* mobile  */}
              <ArrowDown
                className="block sm:hidden w-5 h-5 text-white/85"
                aria-hidden="true"
              />
          
              {/* desktop  */}
              <ArrowRight
                className="hidden sm:block w-5 h-5 text-white/85"
                aria-hidden="true"
              />
            </div>
          
         
            <a
              href="https://t.me/TataZakzheva"
              target="_blank"
              rel="noopener noreferrer"
              className="
                font-sans font-extrabold text-white
                text-3xl sm:text-5xl md:text-6xl lg:text-8xl
                leading-tight sm:leading-[0.95]
                break-words
                hover:underline
              "
            >
              @happiness_support
            </a>
          </div>

              <div className="mt-10 text-white text-xl">Ицхак Пинтосевич</div>
            </div>

            {/* SOCIALS */}
            <div className="mt-20 flex flex-wrap justify-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center justify-center gap-3
                    h-14 px-8 min-w-[180px]
                    rounded-full bg-white text-black
                    font-semibold text-sm
                    hover:bg-white/90 transition
                  "
                >
                  <s.icon className="w-5 h-5" />
                  {s.label}
                </a>
              ))}
            </div>

          {/* BOTTOM BAR */}
          <div className="mt-20 pt-10 border-t border-white/30 flex flex-col md:flex-row items-center justify-between gap-6 text-white/85 text-sm">
            <img src={logo} alt="H.A.P.P.Y Academy" className="h-8" draggable={false} />
          
            <div className="flex flex-wrap items-center gap-4 justify-center">
              <a href="/privacy" className="hover:text-white">
                Политика конфиденциальности
              </a>
              <span className="opacity-50">|</span>
          
              <a href="/terms" className="hover:text-white">
                Условия использования
              </a>
              <span className="opacity-50">|</span>
          
              <a href="/refund" className="hover:text-white">
                Возврат
              </a>
              <span className="opacity-50">|</span>
          
              <span>© 2026. Все права защищены.</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;