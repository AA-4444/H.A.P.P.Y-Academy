import { Instagram, Youtube, Send } from "lucide-react";
import logo from "@/assets/logo.svg";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";

const footerLinks = [
  {
    title: "Программы",
    links: [
      { label: "О нас", href: "#about" },
      { label: "События", href: "#programs" },
      { label: "Программы", href: "#programs" },
      { label: "Начать сейчас", href: TELEGRAM_BOT_URL },
    ],
  },
  {
    title: "Ресурсы",
    links: [
      { label: "Блог", href: TELEGRAM_BOT_URL },
      { label: "Бесплатные материалы", href: TELEGRAM_BOT_URL },
      { label: "Магазин", href: TELEGRAM_BOT_URL },
    ],
  },
  {
    title: "Сообщество",
    links: [
      { label: "Отзывы", href: "#reviews" },
      { label: "Карьера", href: TELEGRAM_BOT_URL },
    ],
  },
];

const socialLinks = [
  {
    icon: Instagram,
    href: "https://instagram.com/isaacpintosevich",
    label: "Instagram",
  },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Send, href: TELEGRAM_BOT_URL, label: "Telegram" },
];

const Footer = () => {
  return (
    // ✅ кремовый фон страницы (как у Hero/CTA)
    <footer className="bg-[#F7F3EE]">
      {/* ✅ небольшие отступы по краям как у фото в CTA */}
      <div className="mx-auto w-full px-3 sm:px-4 lg:px-6 pb-6 sm:pb-8">
        {/* ✅ белая скруглённая “карточка” */}
        <div className="rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.10)] overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-14 sm:py-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-14">
              {/* Links */}
              {footerLinks.map((section) => (
                <div key={section.title}>
                  <h4 className="font-semibold text-black mb-4">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={
                            link.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-sm text-black/60 hover:text-black transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Support */}
              <div className="lg:col-span-2">
                <h4 className="font-semibold text-black mb-4 flex items-center gap-2">
                  Поддержка
                  <span className="text-black/40">→</span>
                </h4>
                <p className="text-sm text-black/60 mb-4">
                  Свяжитесь с поддержкой по вопросам о программах, коучинге или
                  событиях.
                </p>
                <a
                  href={TELEGRAM_BOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-black hover:text-black/70 transition-colors underline underline-offset-4"
                >
                  Написать в Telegram
                </a>
              </div>
            </div>

            {/* Bottom row */}
            <div className="pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-6">
              {/* small logo */}
              <div className="flex items-center gap-6">
                <img src={logo} alt="H.A.P.P.Y Academy" className="h-8" />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-black/45 justify-center">
                <a href="#" className="hover:text-black transition-colors">
                  Политика конфиденциальности
                </a>
                <span className="text-black/25">|</span>
                <a href="#" className="hover:text-black transition-colors">
                  Условия использования
                </a>
                <span className="text-black/25">|</span>
                <span>© {new Date().getFullYear()}. Все права защищены.</span>
              </div>

              {/* Social */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/55 hover:text-black transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-black/10 bg-white">
            <div className="px-6 sm:px-8 lg:px-12 py-10 sm:py-12">
              <img
                src={logo}
                alt="H.A.P.P.Y Academy"
                className="w-full h-auto opacity-[0.92]"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;