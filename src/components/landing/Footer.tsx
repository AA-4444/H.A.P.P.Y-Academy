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
    <footer className="bg-black text-white">
      <div className="container max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-4">
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
                      className="text-sm text-white/60 hover:text-white transition-colors"
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
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              Поддержка
              <span className="text-white/50">→</span>
            </h4>
            <p className="text-sm text-white/60 mb-4">
              Свяжитесь с поддержкой по вопросам о программах, коучинге или
              событиях.
            </p>
            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white hover:text-white/80 transition-colors underline underline-offset-4"
            >
              Написать в Telegram
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <img
              src={logo}
              alt="H.A.P.P.Y Academy"
              className="h-8 brightness-0 invert"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/40 justify-center">
            <a href="#" className="hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">
              Условия использования
            </a>
            <span>|</span>
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
                className="text-white/60 hover:text-white transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
