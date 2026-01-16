import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const TELEGRAM_BOT_URL = "https://t.me/happiness4people_bot";

const navItems = [
  { label: "О нас", href: "#about" },
  { label: "Программы", href: "#programs" },
  { label: "Отзывы", href: "#reviews" },
];

function lockBodyScroll(lock: boolean) {
  // не трогаем overflow-x/html/body — только вертикальный
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
    <LayoutGroup>
      <header
        ref={headerRef}
        className="
          fixed top-0 left-0 right-0 z-50
          overflow-x-clip
          bg-transparent md:bg-[#F6F1E7]
        "
      >
        {/* TOP BAR */}
        <div className="mx-auto max-w-7xl px-4 md:px-6 h-16 md:h-20 flex items-center justify-between gap-3 min-w-0">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="flex items-center min-w-0"
            aria-label="H.A.P.P.Y Academy"
          >
            <img
              src={logo}
              alt="H.A.P.P.Y Academy"
              draggable={false}
              className="
                h-10 sm:h-11 md:h-12 lg:h-14
                w-auto
                max-w-[180px] sm:max-w-[200px]
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
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="text-base font-semibold text-black/75 hover:text-black transition-colors whitespace-nowrap"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Desktop button */}
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
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

          {/* MOBILE: круглая кнопка (без тени), которая морфится в панель */}
          <motion.button
            layoutId="mobileMenu"
            onClick={() => setIsMobileMenuOpen(true)}
            className="
              md:hidden
              inline-flex items-center justify-center
              h-12 w-12 rounded-full
              bg-white
              border border-black/10
              text-black
              relative z-[60]
            "
            aria-label="Open menu"
            transition={{ type: "spring", stiffness: 520, damping: 38 }}
          >
            <Menu size={24} />
          </motion.button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence initial={false}>
          {isMobileMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="md:hidden fixed inset-0 bg-black/30 z-[55]"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Panel morphs from the circle */}
              <motion.div
                layoutId="mobileMenu"
                key="panel"
                transition={{ type: "spring", stiffness: 520, damping: 38 }}
                className="
                  md:hidden
                  fixed right-4 top-4 z-[60]
                  w-[calc(100vw-32px)]
                  max-w-[520px]
                  rounded-3xl
                  bg-white
                  border border-black/10
                  overflow-hidden
                "
              >
                {/* Header row inside panel */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-black/10">
                  <div className="text-sm font-semibold text-black/70">Меню</div>

                  <button
                    className="
                      h-11 w-11 rounded-full
                      bg-black/5 hover:bg-black/10 transition
                      flex items-center justify-center
                    "
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* Items */}
                <div className="px-5 py-5">
                  <motion.nav
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={{
                      hidden: {},
                      show: {
                        transition: { staggerChildren: 0.06, delayChildren: 0.06 },
                      },
                    }}
                    className="flex flex-col gap-2"
                  >
                    {navItems.map((item) => (
                      <motion.a
                        key={item.href}
                        variants={{
                          hidden: { opacity: 0, y: -8 },
                          show: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[16px] font-semibold text-black/80 hover:text-black transition-colors py-2"
                      >
                        {item.label}
                      </motion.a>
                    ))}

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: -8 },
                        show: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.24, ease: "easeOut" }}
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
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </LayoutGroup>
  );
};

export default Header;