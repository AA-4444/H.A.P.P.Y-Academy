import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { X, Check, Instagram, Send, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import countries from "i18n-iso-countries";
import ru from "i18n-iso-countries/langs/ru.json";

import trainerPhoto from "@/assets/trainer-photo.png";
import microphoneImg from "@/assets/microphone.png";
import calendarIcon from "@/assets/calendar-icon.svg";
import chatBubbles from "@/assets/chat-bubbles.png";
import sunIcon from "@/assets/sun-icon.png";
import sadWoman from "@/assets/sad-woman.jpg";
import tiredWoman from "@/assets/tired-woman.jpg";
import neckPain from "@/assets/neck-pain.jpg";

countries.registerLocale(ru);

const COUNTRY_LIST = Object.values(
  countries.getNames("ru", { select: "official" })
).sort((a, b) => a.localeCompare(b, "ru"));

type LeadFormData = {
  name: string;
  email: string;
  telegramUsername: string;
  phone: string;
  country: string;
  comment: string;
};

type SocialItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  followers: string;
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

const SUPPORT_HREF = "https://t.me/TataZakzheva/";

const problemTags = [
  { text: "НИЗКАЯ ЭНЕРГИЯ?", img: tiredWoman },
  { text: "НИЧЕГО НЕ ХОЧЕТСЯ?", img: sadWoman },
  { text: "АПАТИЯ?", img: null },
  { text: "НЕТ КОНЦЕНТРАЦИИ", img: null },
  { text: "МЫСЛИ СКАЧУТ", img: null },
  { text: "ТЫ ПОСТОЯННО УСТАЁШЬ", img: null },
  { text: "ТЕЛО «ДЕРЕВЯННОЕ»", img: neckPain },
];

const results = [
  "ТЕЛО ГИБКОЕ И ЖИВОЕ, КАК В 20 ЛЕТ",
  "ЯСНАЯ ГОЛОВА И ФОКУС",
  "МОЩНЫЙ ЗАРЯД ЭНЕРГИИ",
];

const cssVars = `
  :root {
    --background: 45 33% 96%;
    --foreground: 0 0% 10%;
    --card: 40 30% 93%;
    --card-foreground: 0 0% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 10%;
    --primary: 40 95% 55%;
    --primary-foreground: 0 0% 10%;
    --secondary: 40 30% 90%;
    --secondary-foreground: 0 0% 10%;
    --muted: 40 20% 92%;
    --muted-foreground: 0 0% 45%;
    --accent: 15 90% 50%;
    --accent-foreground: 0 0% 100%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 40 20% 85%;
    --input: 40 20% 85%;
    --ring: 40 95% 55%;
    --radius: 1rem;
    --hero-yellow: 43 96% 56%;
    --tag-bg: 40 30% 91%;
    --tag-border: 40 25% 82%;
    --cta-yellow: 43 96% 56%;
    --dot-color: 40 15% 80%;
  }
  * { border-color: hsl(var(--border)); }
  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    font-family: 'Inter', sans-serif;
  }
  .dotted-bg {
    background-image: radial-gradient(circle, hsl(var(--dot-color)) 1px, transparent 1px);
    background-size: 20px 20px;
  }
`;

function useStableAppHeight() {
  useEffect(() => {
    const setHeight = () => {
      const h = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${h}px`);
    };

    setHeight();

    const onResize = () => setHeight();
    const onOrientationChange = () => setTimeout(setHeight, 150);

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onOrientationChange);
    window.addEventListener("pageshow", setHeight);
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientationChange);
      window.removeEventListener("pageshow", setHeight);
      window.visualViewport?.removeEventListener("resize", onResize);
    };
  }, []);
}

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY || window.pageYOffset;
    const prevBodyStyle = body.getAttribute("style") || "";
    const prevHtmlStyle = html.getAttribute("style") || "";

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    html.style.overflow = "hidden";

    return () => {
      body.setAttribute("style", prevBodyStyle);
      html.setAttribute("style", prevHtmlStyle);
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
}

function createLeadId() {
  try {
    const c: any = typeof crypto !== "undefined" ? crypto : null;
    if (c?.randomUUID) return c.randomUUID();
  } catch {}
  return `lead_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function normalizeTelegramUsername(value: string) {
  const v = String(value || "").trim().replace(/^@+/, "");
  return v ? `@${v}` : "";
}

function isValidTelegramUsername(value: string) {
  return /^@[a-zA-Z0-9_]{4,31}$/.test(value.trim());
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function setModalUrl() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.set("m", "marathon");
  window.history.pushState({ kind: "lead", offerId: "marathon" }, "", url.toString());
}

function clearModalUrl() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.delete("m");
  window.history.replaceState({}, "", url.toString());
}

function LeadFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useLockBodyScroll(open);

  const [data, setData] = useState<LeadFormData>({
    name: "",
    email: "",
    telegramUsername: "",
    phone: "",
    country: "",
    comment: "",
  });

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const resetAndClose = () => {
    setData({
      name: "",
      email: "",
      telegramUsername: "",
      phone: "",
      country: "",
      comment: "",
    });
    setSent(false);
    setSubmitting(false);
    onClose();
  };

  const isDisabled =
    submitting ||
    data.name.trim().length < 2 ||
    !isValidEmail(data.email) ||
    !isValidTelegramUsername(normalizeTelegramUsername(data.telegramUsername)) ||
    data.phone.trim().length < 5 ||
    data.country.trim().length === 0;

  const inputCls =
    "mt-2 w-full h-12 rounded-2xl px-4 bg-white/80 border border-black/10 outline-none focus:ring-2 focus:ring-black/10 text-foreground";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const name = data.name.trim();
    const email = data.email.trim();
    const telegramUsername = normalizeTelegramUsername(data.telegramUsername);
    const phone = data.phone.trim();
    const country = data.country.trim();
    const comment = data.comment.trim();

    if (
      name.length < 2 ||
      !isValidEmail(email) ||
      !isValidTelegramUsername(telegramUsername) ||
      phone.length < 5 ||
      country.length === 0
    ) {
      alert("Пожалуйста, заполните все обязательные поля корректно.");
      return;
    }

    setSubmitting(true);

    try {
      const leadId = createLeadId();

      const leadRes = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: "marathon",
          offerTitle: "© Марафон\n«Гибкость и ментальный фокус»",
          name,
          email,
          telegramUsername,
          phone,
          country,
          comment,
          pageUrl: window.location.href,
          price: "9 €",
        }),
      });

      const leadJson = await leadRes.json().catch(() => ({}));

      if (!leadRes.ok || !leadJson?.ok) {
        throw new Error(`Marathon lead error: ${leadRes.status}`);
      }

      const checkoutRes = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          stage: "pre_payment",
          offerId: "marathon",
          offerTitle: "© Марафон\n«Гибкость и ментальный фокус»",
          name,
          email,
          telegramUsername,
          phone,
          country,
          comment,
          pageUrl: window.location.href,
        }),
      });

      const checkoutJson = await checkoutRes.json().catch(() => ({}));

      if (!checkoutRes.ok || !checkoutJson?.url) {
        throw new Error(`Marathon checkout error: ${checkoutRes.status}`);
      }

      setSent(true);
      window.location.href = checkoutJson.url;
    } catch (err) {
      console.error(err);
      alert("Ошибка. Попробуйте ещё раз.");
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={resetAndClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-6"
          >
            <div
              className="relative w-full max-w-lg overflow-y-auto rounded-t-[28px] sm:rounded-[28px] bg-[#F6F1E7] shadow-2xl"
              style={{ maxHeight: "calc(var(--app-height, 100vh) - 16px)" }}
            >
              <div className="sticky top-0 z-10 flex items-start justify-between p-5 sm:p-6 pb-3 bg-[#F6F1E7] rounded-t-[28px] border-b border-black/5">
                <div className="pr-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-black/50 mb-1">
                    Заявка на марафон
                  </p>
                  <p className="text-base font-bold text-foreground leading-tight whitespace-pre-line">
                    © Марафон{"\n"}«Гибкость и ментальный фокус»
                  </p>
                  <p className="text-sm text-black/60 mt-1">
                    Оставьте данные — заявка сохранится, затем откроется страница оплаты, а после оплаты станет доступна Telegram-группа марафона.
                  </p>
                </div>
                <button
                  onClick={resetAndClose}
                  className="shrink-0 rounded-full p-2 hover:bg-black/5 transition"
                  aria-label="Закрыть"
                >
                  <X className="h-5 w-5 text-black/60" />
                </button>
              </div>

              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                {sent ? (
                  <div className="flex flex-col items-center text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-emerald-600" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Перенаправляем
                    </h3>
                    <p className="text-sm text-black/60 leading-relaxed">
                      Сейчас откроется страница оплаты.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Имя</label>
                      <input
                        type="text"
                        value={data.name}
                        onChange={(e) =>
                          setData((p) => ({ ...p, name: e.target.value }))
                        }
                        className={inputCls}
                        placeholder="Как к вам обращаться?"
                        autoComplete="name"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <input
                        type="email"
                        value={data.email}
                        onChange={(e) =>
                          setData((p) => ({ ...p, email: e.target.value }))
                        }
                        className={inputCls}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Telegram username
                      </label>
                      <input
                        type="text"
                        value={data.telegramUsername}
                        onChange={(e) =>
                          setData((p) => ({
                            ...p,
                            telegramUsername: e.target.value,
                          }))
                        }
                        className={inputCls}
                        placeholder="@username"
                        autoComplete="off"
                      />
                      <p className="text-xs text-black/50 mt-1">
                        Введите username в Telegram, например @alex
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Телефон</label>
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) =>
                          setData((p) => ({ ...p, phone: e.target.value }))
                        }
                        className={inputCls}
                        placeholder="+49..."
                        autoComplete="tel"
                        inputMode="tel"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Страна</label>
                      <div className="relative mt-2">
                        <select
                          value={data.country}
                          onChange={(e) =>
                            setData((p) => ({ ...p, country: e.target.value }))
                          }
                          required
                          className="w-full h-12 rounded-2xl px-4 pr-10 bg-white/80 border border-black/10 text-foreground outline-none appearance-none"
                        >
                          <option value="" disabled>
                            Выберите страну
                          </option>
                          {COUNTRY_LIST.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                        <svg
                          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-black/50"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Комментарий</label>
                      <textarea
                        value={data.comment}
                        onChange={(e) =>
                          setData((p) => ({ ...p, comment: e.target.value }))
                        }
                        className="mt-2 w-full min-h-[88px] rounded-2xl p-4 bg-white/80 border border-black/10 outline-none focus:ring-2 focus:ring-black/10 resize-none text-foreground"
                        placeholder="Если хотите, оставьте комментарий…"
                      />
                    </div>

                    <div className="sticky bottom-0 bg-[#F6F1E7] pt-2 pb-1">
                      <button
                        type="submit"
                        disabled={isDisabled}
                        className="w-full rounded-full h-12 font-sans font-bold transition disabled:opacity-50 bg-[hsl(var(--cta-yellow))] text-foreground hover:opacity-90"
                      >
                        {submitting ? "Отправляем..." : "Вступить в марафон"}
                      </button>

                      <button
                        type="button"
                        onClick={resetAndClose}
                        className="w-full mt-2 rounded-full h-11 font-sans font-semibold text-black/70 hover:bg-black/5 transition"
                      >
                        Закрыть
                      </button>

                      <p className="text-xs text-black/50 leading-snug mt-3">
                        Нажимая кнопку, вы соглашаетесь на обработку данных для связи с вами.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function Maraphon() {
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  useStableAppHeight();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const applyFromUrl = () => {
      const sp = new URLSearchParams(window.location.search);
      const modal = sp.get("m");
      setLeadModalOpen(modal === "marathon");
    };

    applyFromUrl();
    window.addEventListener("popstate", applyFromUrl);
    return () => window.removeEventListener("popstate", applyFromUrl);
  }, []);

  const openLead = () => {
    setLeadModalOpen(true);
    setModalUrl();
  };

  return (
    <main className="min-h-screen">
      <style>{cssVars}</style>

      <section className="relative dotted-bg overflow-hidden">
        <div className="max-w-lg mx-auto flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-5 pt-6 pb-3 text-center"
          >
            <h1 className="text-4xl font-black leading-[0.95] text-foreground uppercase">
              Гибкость
              <br />
              и ментальный фокус
            </h1>
          </motion.div>

          <div className="flex items-end">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-[55%] shrink-0 self-end"
            >
              <img
                src={trainerPhoto}
                alt="Ицхак Пинтосевич"
                className="w-full h-auto object-cover"
              />
            </motion.div>

            <div className="flex-1 flex flex-col items-center justify-center pb-16 px-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mb-2"
              >
                <img
                  src={microphoneImg}
                  alt="Микрофон"
                  className="w-14 h-14 object-contain"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mb-3"
              >
                <h2 className="text-sm font-bold leading-tight text-foreground text-center">
                  За одну сессию я отдам тебе практики, которые работают.
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-[hsl(var(--hero-yellow))] text-3xl"
              >
                ⟶
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="w-full px-4 py-5"
          >
            <div className="flex items-center gap-3">
              <div className="bg-[hsl(var(--cta-yellow))] rounded-2xl px-4 py-3 shadow-lg flex-1 text-left">
                <p className="text-foreground font-extrabold text-base leading-tight">
                  Четверг, 19:00 (Израиль)
                </p>
                <p className="text-foreground/70 text-sm mt-1 italic">
                  Запись доступна сразу после эфира
                </p>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <img
                  src={calendarIcon}
                  alt="Календарь"
                  className="w-16 h-16 object-contain"
                />
                <p className="text-[hsl(var(--accent))] font-medium text-sm italic mt-1">
                  каждый четверг
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[hsl(var(--hero-yellow))] py-14 px-5 overflow-hidden relative">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-4"
          >
            <h1 className="text-4xl font-black leading-[0.95] text-foreground uppercase">
              Гибкость
              <br />
              и ментальный фокус
            </h1>
            <div className="flex justify-between mt-3">
              <p className="text-[hsl(var(--accent))] font-medium text-sm">
                 каждый четверг
              </p>
              <p className="text-foreground/60 text-sm">система Вим Хофа</p>
            </div>
          </motion.div>

          <div className="flex flex-wrap gap-2.5 mt-8">
            {problemTags.map((tag, i) => (
              <motion.div
                key={tag.text}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                className="flex items-center gap-2 bg-[hsl(var(--tag-bg))]/90 border border-[hsl(var(--tag-border))] rounded-xl px-4 py-2.5 shadow-sm"
              >
                {tag.img && (
                  <img
                    src={tag.img}
                    alt={tag.text}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                    loading="lazy"
                    width={40}
                    height={40}
                  />
                )}
                <span className="font-bold text-sm uppercase tracking-wide text-foreground">
                  {tag.text}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <h2 className="text-3xl font-black uppercase text-foreground leading-tight">
              Живой тренинг
              <br />+ ответы на вопросы
            </h2>
          </motion.div>
        </div>

        <svg
          className="absolute top-1/4 right-0 w-48 h-48 opacity-15 pointer-events-none"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="hsl(40, 30%, 75%)"
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="100"
            r="55"
            fill="none"
            stroke="hsl(40, 30%, 75%)"
            strokeWidth="1.5"
          />
        </svg>
      </section>

      <section className="dotted-bg py-14 px-5">
        <div className="max-w-lg mx-auto">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl font-extrabold text-foreground uppercase mb-4"
          >
            Результат:
          </motion.p>

          <div className="flex flex-col gap-3 relative pl-6 border-l-2 border-foreground/15">
            {results.map((result, i) => (
              <motion.div
                key={result}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.4 }}
                className="bg-[hsl(var(--tag-bg))] border border-[hsl(var(--tag-border))] rounded-xl px-5 py-3.5"
              >
                <span className="font-bold text-sm uppercase tracking-wide text-foreground">
                  {result}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex items-start gap-4 mt-10">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="shrink-0 mt-2"
            >
              <img
                src={sunIcon}
                alt="Солнце"
                className="w-20 h-20 object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-[hsl(var(--cta-yellow))]/30 rounded-2xl px-6 py-5 flex-1"
            >
              <p className="font-bold text-base text-foreground mb-2">Будет:</p>
              <ul className="space-y-1.5">
                <li className="font-bold text-sm text-foreground">• дыхательные практики</li>
                <li className="font-bold text-sm text-foreground">• упражнения на гибкость</li>
                <li className="font-bold text-sm text-foreground">• техника концентрации</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="dotted-bg py-14 px-5">
        <div className="max-w-lg mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[hsl(var(--muted-foreground))] italic mb-3 text-base"
          >
             каждый четверг
          </motion.p>

          <motion.button
            type="button"
            onClick={openLead}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-[hsl(var(--cta-yellow))] rounded-2xl px-8 py-5 shadow-lg cursor-pointer"
          >
            <p className="text-foreground font-black text-2xl leading-tight">
              Вступить в марафон
            </p>
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-[hsl(var(--muted-foreground))] mt-3 italic text-sm"
          >
            (количество мест ограниченно)
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-3 flex justify-center"
          >
            <img src={chatBubbles} alt="Чат" className="w-20 h-20 object-contain" />
          </motion.div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8 px-5">
        <div className="max-w-lg mx-auto flex flex-col items-center text-center gap-5">
          <p className="text-2xl font-black uppercase tracking-wide">Pintosevich</p>

          <div className="flex items-center gap-5">
            {socials.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="text-[hsl(var(--cta-yellow))] hover:opacity-80 transition-opacity"
                >
                  <Icon className="w-6 h-6" />
                </a>
              );
            })}
          </div>

          <a
            href={SUPPORT_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[hsl(var(--cta-yellow))] text-foreground font-bold px-8 py-3 rounded-full hover:opacity-90 transition-opacity text-base"
          >
            Задать вопрос
          </a>
        </div>
      </footer>

      <LeadFormModal
        open={leadModalOpen}
        onClose={() => {
          setLeadModalOpen(false);
          clearModalUrl();
        }}
      />
    </main>
  );
}

export default Maraphon;