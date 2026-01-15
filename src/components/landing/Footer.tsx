import { Instagram, Youtube, Send, Linkedin, ArrowUp } from "lucide-react";
import logo from "@/assets/logo.svg";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/isaacpintosevich",
    icon: Instagram,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: Youtube,
  },
  {
    label: "Telegram",
    href: TELEGRAM_BOT_URL,
    icon: Send,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
  },
];

const Footer = () => {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#F7F3EE]">
      <div className="mx-auto w-full px-3 sm:px-4 lg:px-6 pb-8">
        <div className="rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] bg-[#F6B800] overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 py-24">

            {/* TOP */}
            <div className="relative">
              <button
                onClick={scrollToTop}
                className="absolute right-0 top-0 h-14 w-14 rounded-full border border-white/70
                           flex items-center justify-center text-white
                           hover:bg-white/10 transition"
                aria-label="Наверх"
              >
                <ArrowUp className="w-6 h-6" />
              </button>

              <p className="text-white/80 text-xl mb-6">
                Напиши нам
              </p>

           <a
             href={TELEGRAM_BOT_URL}
             target="_blank"
             rel="noopener noreferrer"
             className="
               block font-sans font-extrabold text-white
               text-3xl sm:text-5xl md:text-6xl lg:text-8xl
               leading-tight sm:leading-[0.95]
               break-words
               max-w-full
             "
           >
             @HappyacademyTeam
           </a>
              <div className="mt-10 grid sm:grid-cols-2 gap-10">
                <div className="text-white text-xl">
                  Isaac Pintosevich
                </div>

                <div className="text-white/85">
                  <div className="font-semibold">
                    Остались вопросы?
                  </div>
                  <div className="mt-2 text-sm sm:text-base">
                    Напиши их в личные сообщения Ицхаку.
                  </div>
                </div>
              </div>
            </div>

            {/* SOCIALS — СНИЗУ, В РЯД, БЕЛЫЕ */}
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
                    rounded-full
                    bg-white text-black
                    font-semibold text-sm
                    hover:bg-white/90 transition
                  "
                >
                  <s.icon className="w-5 h-5" />
                  {s.label}
                </a>
              ))}
            </div>

            {/* BOTTOM */}
            <div className="mt-20 pt-10 border-t border-white/30
                            flex flex-col md:flex-row items-center
                            justify-between gap-6 text-white/85 text-sm">
              <img
                src={logo}
                alt="H.A.P.P.Y Academy"
                className="h-8"
                draggable={false}
              />

              <div className="flex flex-wrap items-center gap-4 justify-center">
                <a href="#" className="hover:text-white">
                  Политика конфиденциальности
                </a>
                <span className="opacity-50">|</span>
                <a href="#" className="hover:text-white">
                  Условия использования
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