import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowRight,
  Instagram,
  ArrowDown,
  Youtube,
  Send,
  User,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import logo from "@/assets/newlogo.svg";

type SocialItem = {
  label: string;
  href: string;
  icon: any;
  followers?: string;
};

const socials: SocialItem[] = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@isaacpintosevich",
    icon: Youtube,
    followers: "765K",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/isaacpintosevich/",
    icon: Instagram,
    followers: "744K",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@isaacpintosevic?_r=1&_t=ZN-93pg8nboB1C",
    icon: FaTiktok,
    followers: "76.3K",
  },
  {
    label: "Telegram",
    href: "https://t.me/isaac_pintosevich",
    icon: Send,
    followers: "28K",
  },
];

function ScrollToTopBadge({ onClick }: { onClick: () => void }) {
  const text = "нагору • нагору • нагору • нагору • ";

  return (
    <button
      onClick={onClick}
      type="button"
      aria-label="Нагору"
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
                Залишилися питання? Напишіть нам у Telegram:
              </p>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <div className="flex flex-col items-center sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <span className="text-white/85 text-sm sm:text-base font-semibold">
                    натисни
                  </span>

                  <ArrowDown
                    className="block sm:hidden w-5 h-5 text-white/85"
                    aria-hidden="true"
                  />

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

              <div className="mt-10 text-white text-xl">Іцхак Пінтосевич</div>
            </div>

            <div className="mt-20 flex flex-wrap justify-center gap-4">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center justify-between
                      h-14 px-6 min-w-[220px]
                      rounded-full bg-white text-black
                      font-semibold text-sm
                      hover:bg-white/90 transition
                      gap-4
                    "
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{s.label}</span>
                    </span>

                    <span className="flex items-center gap-2 text-black/70">
                      <User className="w-4 h-4" aria-hidden="true" />
                      <span className="font-bold tabular-nums">
                        {s.followers ?? "—"}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="mt-20 pt-10 border-t border-white/30 flex flex-col md:flex-row items-center justify-between gap-6 text-white/85 text-sm">
              <img
                src={logo}
                alt="H.A.P.P.Y Academy"
                className="h-8"
                draggable={false}
              />

              <div className="flex flex-wrap items-center gap-4 justify-center">
                <a href="/ua/privacy" className="hover:text-white">
                  Політика конфіденційності
                </a>
                <span className="opacity-50">|</span>

                <a href="/ua/terms" className="hover:text-white">
                  Умови використання
                </a>
                <span className="opacity-50">|</span>

                <a href="/ua/refund" className="hover:text-white">
                  Повернення
                </a>
                <span className="opacity-50">|</span>

                <span>© 2026. Усі права захищені.</span>
                <span className="opacity-50">|</span>

                <a
                  href="https://trgtart.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white underline-offset-4 hover:underline"
                >
                  Made by TRGTART
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;