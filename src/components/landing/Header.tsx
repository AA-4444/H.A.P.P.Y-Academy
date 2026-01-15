import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";

const navItems = [
  { label: "О нас", href: "#about" },
  { label: "Программы", href: "#programs" },
  { label: "Отзывы", href: "#reviews" },
];

const mobilePanel = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const mobileItem = {
  hidden: { opacity: 0, y: -6 },
  show: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

function lockBodyScroll(lock: boolean) {
  // ВАЖНО: не трогаем overflow-x/html/body (чтобы не ломать sticky секции)
  // Блокируем только вертикальный скролл на время открытого меню.
  if (lock) {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  } else {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  }
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    lockBodyScroll(isMobileMenuOpen);
    return () => lockBodyScroll(false);
  }, [isMobileMenuOpen]);

  // закрыть по клику вне хедера
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onDown = (e: PointerEvent) => {
      const el = headerRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setIsMobileMenuOpen(false);
    };

    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, [isMobileMenuOpen]);

  // закрыть по ESC
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-[#F6F1E7] overflow-x-clip"
    >
      {/* ВАЖНО:
          - overflow-x-clip на самом хедере (не на body!)
          - px меньше на мобиле
          - min-w-0 на контейнере, чтобы лого могло ужаться
      */}
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-3 min-w-0">
        {/* Logo (умеет ужаться) */}
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center min-w-0"
          aria-label="H.A.P.P.Y Academy"
        >
          <img
            src={logo}
            alt="H.A.P.P.Y Academy"
            draggable={false}
            className="
              h-9 sm:h-10 md:h-12 lg:h-14
              w-auto
              max-w-[160px] sm:max-w-[190px]
              object-contain
              shrink
            "
          />
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 shrink-0">
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-base font-semibold text-black/75 hover:text-black transition-colors whitespace-nowrap"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Desktop button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center shrink-0"
        >
          <Button
            size="default"
            onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
            className="bg-yellow-400 text-black hover:bg-yellow-300 font-semibold rounded-full px-6 whitespace-nowrap"
          >
            Начать сейчас
          </Button>
        </motion.div>

        {/* Mobile Menu Button (фиксированная ширина, чтобы всегда влезало) */}
        <button
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full bg-black/0 hover:bg-black/5 transition text-black shrink-0"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile"
            variants={mobilePanel}
            initial="hidden"
            animate="show"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="md:hidden bg-[#F6F1E7] border-t border-black/10 overflow-x-clip"
          >
            <div className="px-3 sm:px-4 py-5">
              <motion.nav
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex flex-col gap-2"
              >
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.href}
                    variants={mobileItem}
                    transition={{
                      duration: 0.18,
                      ease: "easeOut",
                      delay: idx * 0.03,
                    }}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[15px] font-semibold text-black/80 hover:text-black transition-colors py-2"
                  >
                    {item.label}
                  </motion.a>
                ))}

                <motion.div
                  variants={mobileItem}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                    delay: navItems.length * 0.03 + 0.05,
                  }}
                  className="pt-3"
                >
                  <Button
                    size="lg"
                    className="w-full bg-yellow-400 text-black hover:bg-yellow-300 font-semibold rounded-full"
                    onClick={() => window.open(TELEGRAM_BOT_URL, "_blank")}
                  >
                    Начать сейчас
                  </Button>
                </motion.div>
              </motion.nav>
            </div>

            <div className="pointer-events-none h-px bg-black/5" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;