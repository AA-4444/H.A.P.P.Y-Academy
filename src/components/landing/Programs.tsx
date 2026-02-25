import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { X, Check, Heart } from "lucide-react";


/* ─── types ─── */
type Offer = {
  id: string;
  title: string;
  description: string;
  mobileDescription: string;
  price: string;
  priceNote?: string;
  oldPrice?: string;
  oldPriceNote?: string;
  bullets: string[];
  cta: string;
  variant: "light" | "yellow";
  ctaNote?: string;
  longDescription?: string;
  payType?: "one_time" | "subscription" | "free" | "donation";
  badge?: string;
};

type LeadFormData = {
  name: string;
  phone: string;
  telegram: string;
  comment: string;
  amount: string;
};

const SUPPORT_HREF = "https://t.me/TataZakzheva/";

/* ─── hooks ─── */
function useAppHeightVar() {
  useEffect(() => {
    const doc = document.documentElement;
    const setH = () => {
      doc.style.setProperty("--app-height", `${window.innerHeight}px`);
      if (window.visualViewport)
        doc.style.setProperty("--vv-height", `${window.visualViewport.height}px`);
    };
    setH();
    window.addEventListener("resize", setH);
    window.visualViewport?.addEventListener("resize", setH);
    window.visualViewport?.addEventListener("scroll", setH);
    return () => {
      window.removeEventListener("resize", setH);
      window.visualViewport?.removeEventListener("resize", setH);
      window.visualViewport?.removeEventListener("scroll", setH);
    };
  }, []);
}

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const body = document.body;
    const html = document.documentElement;
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

function useCountdown(target: Date) {
  const [msLeft, setMsLeft] = useState(() => Math.max(0, target.getTime() - Date.now()));
  useEffect(() => {
    const id = window.setInterval(() => {
      setMsLeft(Math.max(0, target.getTime() - Date.now()));
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);
  const totalSec = Math.floor(msLeft / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  const pad2 = (n: number) => String(n).padStart(2, "0");
  return { msLeft, days, hours: pad2(hours), mins: pad2(mins), secs: pad2(secs) };
}

/* ─── helpers ─── */
function TitleWithBreaks({ text }: { text: string }) {
  const lines = String(text ?? "").split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </>
  );
}

function setModalUrl(kind: "lead" | "details", offerId: string) {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.delete("lead");
  url.searchParams.delete("details");
  url.searchParams.delete("offerId");
  url.searchParams.set(kind, "1");
  url.searchParams.set("offerId", offerId);
  window.history.pushState({ kind, offerId }, "", url.toString());
}

function clearModalUrl() {
  if (typeof window === "undefined") return;
  const url = new URL(window.location.href);
  url.searchParams.delete("lead");
  url.searchParams.delete("details");
  url.searchParams.delete("offerId");
  window.history.replaceState({}, "", url.toString());
}

function normalizeTelegram(raw: string) {
  const t = String(raw ?? "").trim();
  if (!t) return "";
  const noAt = t.replace(/^@+/, "");
  const cleaned = noAt.replace(/\s+/g, "");
  return cleaned ? `@${cleaned}` : "";
}
function isTelegramValid(tg: string) {
  return /^@[a-zA-Z0-9_]{4,31}$/.test(tg);
}
function createLeadId() {
  try {
    const c: any = typeof crypto !== "undefined" ? crypto : null;
    if (c?.randomUUID) return c.randomUUID();
  } catch {}
  return `lead_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}
function buildContact(phone: string, telegram: string) {
  const parts: string[] = [];
  const p = phone.trim();
  const tg = normalizeTelegram(telegram);
  if (p) parts.push(`Телефон: ${p}`);
  if (tg && isTelegramValid(tg)) parts.push(`Telegram: ${tg}`);
  return parts.join(" | ");
}

/* ─── BulletsModal ─── */
function BulletsModal({
  open,
  onClose,
  offer,
}: {
  open: boolean;
  onClose: () => void;
  offer: Offer | null;
  onJoinClub: () => void;
}) {
  useLockBodyScroll(open);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);



  return (
    <AnimatePresence>
      {open && offer ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 m-auto w-[calc(100%-2rem)] max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-card shadow-2xl font-sans"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    {offer.id === "gift" ? "Кому подходит" : "Что внутри"}
                  </p>
                  <h3 className="text-xl font-extrabold text-foreground">{offer.title}</h3>
                </div>
                <button onClick={onClose} className="flex h-8 w-8 shrink-0 aspect-square items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line mb-6">
                {offer.description}
              </p>
              {offer.id === "gift" ? (
                <ul className="space-y-2 mb-6">
                  {offer.bullets.map((b, i) => (
                    <li key={i} className="text-sm text-foreground/70">— {b}</li>
                  ))}
                </ul>
              ) : (
                <ul className="space-y-3 mb-6">
                  {offer.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground/70">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {offer.longDescription && (
                <div className="mb-6 rounded-2xl bg-muted/50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Подробнее</p>
                  <p className="text-sm text-foreground/70 whitespace-pre-line leading-relaxed">{offer.longDescription}</p>
                </div>
              )}
              <div className="border-t border-border pt-4">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Цена</p>
                  <div className="mt-1 flex items-end gap-2">
                    {offer.oldPrice && (
                      <span className="text-lg font-bold text-destructive line-through">
                        {offer.oldPrice}
                        {offer.oldPriceNote && <span className="ml-1 text-sm font-medium">{offer.oldPriceNote}</span>}
                      </span>
                    )}
                    <span className="text-2xl font-black text-foreground">
                      {offer.price}
                      {offer.priceNote && <span className="ml-1 text-base font-semibold text-muted-foreground">{offer.priceNote}</span>}
                    </span>
                  </div>
                </div>
                {offer.id === "club" ? (
                  <a href={SUPPORT_HREF} target="_blank" rel="noopener noreferrer" className="mt-4 block w-full rounded-full h-11 leading-[2.75rem] text-center bg-[#E64B1E] text-white font-sans font-semibold hover:bg-[#d4441a] transition">
                    Возникли вопросы?
                  </a>
                ) : (
                  <button onClick={onClose} className="mt-4 w-full rounded-full h-11 bg-[#FACC15] text-[#1a1a1a] font-semibold hover:bg-[#e5b800] transition shadow-[0_4px_20px_-4px_rgba(250,204,21,0.5)]">
                    Понятно
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

/* ─── LeadFormModal ─── */
/* ─── LeadFormModal ─── */
function LeadFormModal({
  open,
  onClose,
  offer,
}: {
  open: boolean;
  onClose: () => void;
  offer: Offer | null;
}) {
  useLockBodyScroll(open);

  const [data, setData] = useState<LeadFormData>({
    name: "",
    phone: "",
    telegram: "",
    comment: "",
    amount: "", // ✅ donation amount for ambassador
  });

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

 const isLeadOnly =
   offer?.id === "system" || offer?.id === "gift";
 
 const isAmbassador = offer?.id === "ambassador";

  const title =
    isAmbassador
      ? "Поддержать донатом"
      : offer?.id === "club"
      ? "Заявка на клуб"
      : offer?.payType === "one_time"
      ? "Заявка на программу"
      : "Заявка";

  const subtitle = isLeadOnly
  ? "Оставьте контакты — мы свяжемся с вами."
  : isAmbassador
  ? "Оставьте контакты и сумму — вы перейдёте к оплате доната."
  : "Оставьте контакты — вы перейдёте к оплате.";

  const submitLabel = isLeadOnly
  ? "Оставить заявку"
  : isAmbassador
  ? "Перейти к оплате доната"
  : "Перейти к оплате";

  const resetAndClose = () => {
    setData({ name: "", phone: "", telegram: "", comment: "", amount: "" });
    setSent(false);
    setSubmitting(false);
    onClose();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !offer) return;

    const name = data.name.trim();
    const phone = data.phone.trim();
    const tgNorm = normalizeTelegram(data.telegram);
    const comment = data.comment.trim();

    if (name.length < 2 || phone.length < 5) return;
    if (tgNorm && !isTelegramValid(tgNorm)) return;

    setSubmitting(true);

    try {
      //  ambassador: validate donation amount
      if (offer.id === "ambassador") {
        const donation = Number(String(data.amount).replace(",", "."));
        if (!Number.isFinite(donation) || donation < 5 || donation > 50000) {
          alert("Введите сумму доната от 5 до 50 000 €");
          setSubmitting(false);
          return;
        }
      }


      // system + gift: lead only (no payment)
      if (offer.id === "system" || offer.id === "gift") {
        const r = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            offerId: offer.id,
            offerTitle: offer.title,
            name,
            contact: buildContact(phone, data.telegram),
            comment,
            pageUrl: window.location.href,
          }),
        });

        if (!r.ok) throw new Error(`Lead error: ${r.status}`);

        setSent(true);
        setSubmitting(false);
        return;
      }

      // ✅ others: Stripe Checkout
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: createLeadId(),
          stage: "pre_payment",
          offerId: offer.id,
          offerTitle: offer.title,
          name,
          contact: buildContact(phone, data.telegram),
          comment,
          pageUrl: window.location.href,

          // ✅ only ambassador sends amount (string)
          ...(offer.id === "ambassador" ? { amount: data.amount } : {}),
        }),
      });

      if (!res.ok) throw new Error(`Stripe checkout error: ${res.status}`);
      const json = (await res.json()) as { url?: string };

      if (!json?.url) throw new Error("No checkout url");

      setSent(true);
      window.location.href = json.url;
    } catch (err) {
      console.error(err);
      alert("Ошибка. Попробуйте ещё раз.");
      setSubmitting(false);
    }
  };

  const tgPreview = normalizeTelegram(data.telegram);
  const tgValid = tgPreview ? isTelegramValid(tgPreview) : true;

  const inputCls =
    "mt-2 w-full h-12 rounded-2xl px-4 bg-card/70 border border-border outline-none focus:ring-2 focus:ring-ring/20 text-foreground";

  const isDisabled =
    submitting ||
    data.name.trim().length < 2 ||
    data.phone.trim().length < 5 ||
    (!!normalizeTelegram(data.telegram) &&
      !isTelegramValid(normalizeTelegram(data.telegram))) ||
    (isAmbassador && String(data.amount).trim().length === 0);

  return (
    <AnimatePresence>
      {open && offer ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={resetAndClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.97 }}
            transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 m-auto w-[calc(100%-2rem)] max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl bg-card shadow-2xl font-sans"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    {title}
                  </p>
                  <h3 className="text-lg font-extrabold text-foreground">
                    {offer.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
                </div>
                <button
                  onClick={resetAndClose}
                  className="flex h-8 w-8 shrink-0 aspect-square items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              
                {sent ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-6">
                
                    <div className="w-16 h-16 rounded-full bg-[#FACC15] flex items-center justify-center shadow-md">
                      <Check className="w-8 h-8 text-[#1a1a1a]" strokeWidth={3} />
                    </div>
                
                    <h3 className="text-xl font-bold text-foreground">
                      {isLeadOnly
                        ? "Заявка отправлена"
                        : "Перенаправляем на оплату"}
                    </h3>
                
                    <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                      {isLeadOnly
                        ? "Мы внимательно рассмотрим вашу заявку и свяжемся с вами в ближайшее время."
                        : "Сейчас откроется защищённая страница оплаты."}
                    </p>
                
                    {isLeadOnly && (
                      <button
                        onClick={resetAndClose}
                        className="mt-4 rounded-full px-6 h-11 bg-[#FACC15] text-[#1a1a1a] font-semibold hover:bg-[#e5b800] transition shadow-md"
                      >
                        Закрыть
                      </button>
                    )}
                  </div>
                ) : (
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground">Имя</label>
                    <input
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
                    <label className="text-sm font-semibold text-foreground">
                      Телефон
                    </label>
                    <input
                      value={data.phone}
                      onChange={(e) =>
                        setData((p) => ({ ...p, phone: e.target.value }))
                      }
                      className={inputCls}
                      placeholder="+49…"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-foreground">
                      Telegram (необязательно)
                    </label>
                    <input
                      value={data.telegram}
                      onChange={(e) =>
                        setData((p) => ({ ...p, telegram: e.target.value }))
                      }
                      onBlur={() =>
                        setData((p) => ({ ...p, telegram: normalizeTelegram(p.telegram) }))
                      }
                      className={`${inputCls} ${
                        data.telegram.trim().length > 0 && !tgValid
                          ? "border-destructive/40"
                          : ""
                      }`}
                      placeholder="@username"
                      autoComplete="off"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {data.telegram.trim().length > 0 && !tgValid
                        ? "Формат: @username (латиница/цифры/underscore)"
                        : "Можно оставить пустым"}
                    </p>
                  </div>

                  {/* ✅ Ambassador donation amount */}
                  {isAmbassador && (
                    <div>
                      <label className="text-sm font-semibold text-foreground">
                        Сумма доната (EUR)
                      </label>
                      <input
                        value={data.amount}
                        onChange={(e) =>
                          setData((p) => ({
                            ...p,
                            amount: e.target.value.replace(/[^\d.,]/g, ""),
                          }))
                        }
                        className={inputCls}
                        placeholder="Например: 25"
                        inputMode="decimal"
                        autoComplete="off"
                      />
                      <p className="mt-1 text-xs text-muted-foreground">
                        Минимум 5 €, максимум 50 000 €.
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-semibold text-foreground">
                      Комментарий (необязательно)
                    </label>
                    <textarea
                      value={data.comment}
                      onChange={(e) =>
                        setData((p) => ({ ...p, comment: e.target.value }))
                      }
                      className="mt-2 w-full min-h-[80px] rounded-2xl p-4 bg-card/70 border border-border outline-none focus:ring-2 focus:ring-ring/20 resize-none text-foreground"
                      placeholder="Удобное время / вопрос / город…"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isDisabled}
                    className="w-full rounded-full h-12 font-sans font-bold transition shadow-[0_4px_20px_-4px_rgba(250,204,21,0.5)] disabled:opacity-50 bg-[#FACC15] text-[#1a1a1a] hover:bg-[#e5b800]"
                  >
                    {submitting ? "Отправляем..." : submitLabel}
                  </button>

                  <p className="text-xs text-muted-foreground leading-snug">
                    {isLeadOnly
                    ? "Нажимая «Оставить заявку», вы соглашаетесь на обработку данных для связи с вами."
                    : "Нажимая «Перейти к оплате», вы соглашаетесь на обработку данных для связи с вами."}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   CARD THEMES — each card has a unique visual identity
   ───────────────────────────────────────────── */
const CARD_THEMES: Record<string, {
  bg: string;
  border: string;
  shadow: string;
  hoverShadow: string;
  titleColor: string;
  titleBg: string;
  priceColor: string;
  priceBg: string;
  bulletIcon: string;
  bulletIconText: string;
  ctaPrimary: string;
  ctaSecondary: string;
  descColor: string;
}> = {
  system: {
    bg: "bg-white",
    border: "border-[#E64B1E]/25",
    shadow: "shadow-[0_8px_40px_-8px_rgba(0,0,0,0.08)]",
    hoverShadow: "hover:shadow-[0_20px_60px_-12px_rgba(230,75,30,0.18)]",
    titleColor: "text-[#1a1a1a]",
    titleBg: "bg-[#FACC15]",
    priceColor: "text-[#1a1a1a]",
    priceBg: "bg-[#FACC15]",
    bulletIcon: "bg-[#E64B1E]",
    bulletIconText: "text-white",
    ctaPrimary: "bg-[#FACC15] text-[#1a1a1a] hover:bg-[#e5b800] shadow-[0_4px_20px_-4px_rgba(250,204,21,0.5)]",
    ctaSecondary: "bg-[#E64B1E] text-white hover:bg-[#d4441a]",
    descColor: "text-black/55",
  },
  club: {
    bg: "bg-[#FACC15]",
    border: "border-[#E64B1E]/30",
    shadow: "shadow-[0_8px_40px_-8px_rgba(250,204,21,0.45)]",
    hoverShadow: "hover:shadow-[0_20px_60px_-12px_rgba(250,204,21,0.5)]",
    titleColor: "text-white",
    titleBg: "bg-[#E64B1E]",
    priceColor: "text-white",
    priceBg: "bg-[#E64B1E]",
    bulletIcon: "bg-[#E64B1E]",
    bulletIconText: "text-white",
    ctaPrimary: "bg-[#FACC15] text-[#1a1a1a] hover:bg-[#e5b800] shadow-[0_4px_20px_-4px_rgba(250,204,21,0.5)]",
    ctaSecondary: "bg-[#E64B1E] text-white hover:bg-[#d4441a]",
    descColor: "text-black/50",
  },
  gift: {
    bg: "bg-white",
    border: "border-[#E64B1E]/25",
    shadow: "shadow-[0_8px_40px_-8px_rgba(230,75,30,0.08)]",
    hoverShadow: "hover:shadow-[0_20px_60px_-12px_rgba(230,75,30,0.18)]",
    titleColor: "text-[#1a1a1a]",
    titleBg: "bg-[#FACC15]",
    priceColor: "text-[#1a1a1a]",
    priceBg: "bg-[#FACC15]",
    bulletIcon: "bg-[#E64B1E]",
    bulletIconText: "text-white",
    ctaPrimary: "bg-[#FACC15] text-[#1a1a1a] hover:bg-[#e5b800] shadow-[0_4px_20px_-4px_rgba(250,204,21,0.5)]",
    ctaSecondary: "bg-[#E64B1E] text-white hover:bg-[#d4441a]",
    descColor: "text-black/55",
  },
  ambassador: {
    bg: "bg-[#FACC15]",
    border: "border-[#E64B1E]/30",
    shadow: "shadow-[0_8px_40px_-8px_rgba(230,75,30,0.15)]",
    hoverShadow: "hover:shadow-[0_20px_60px_-12px_rgba(230,75,30,0.25)]",
    titleColor: "text-white",
    titleBg: "bg-[#E64B1E]",
    priceColor: "text-white",
    priceBg: "bg-[#E64B1E]",
    bulletIcon: "bg-[#E64B1E]",
    bulletIconText: "text-white",
    ctaPrimary: "bg-[#FACC15] text-[#1a1a1a] hover:bg-[#e5b800] shadow-[0_4px_20px_-4px_rgba(250,204,21,0.5)]",
    ctaSecondary: "bg-[#E64B1E] text-white hover:bg-[#d4441a]",
    descColor: "text-black/50",
  },
};

const DEFAULT_THEME = CARD_THEMES.system;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function OfferCard({
  offer,
  index,
  isWide,
  onOpenMore,
  onOpenLead,
  cd,
}: {
  offer: Offer;
  index: number;
  isWide: boolean;
  onOpenMore: (id: string) => void;
  onOpenLead: (id: string) => void;
  cd?: ReturnType<typeof useCountdown>;
}) {
  const isGift = offer.id === "gift";
  const hidePrimaryCta = offer.id === "club";
  const t = CARD_THEMES[offer.id] ?? DEFAULT_THEME;

  return (
   <motion.article
     variants={cardVariants}
     initial="hidden"
     whileInView="visible"
     viewport={{ once: true, amount: 0.25 }}
     style={{ willChange: "transform, opacity" }}
     className={[
       "group relative flex flex-col overflow-hidden h-full",
       "rounded-[28px] sm:rounded-[36px]",
       isWide ? "lg:flex-row lg:min-h-[340px]" : "",
       t.bg,
       t.shadow,
       t.hoverShadow,
       "border-0",
       // ВАЖНО: больше НЕ transition-all
       "transition-shadow duration-500",
     ].join(" ")}
   >

      {/* ── Header / price section ── */}
      <div className={[
      "flex flex-col relative",
        isWide ? "p-8 sm:p-10 lg:p-12 lg:flex-1 lg:justify-center" : "p-7 sm:p-9",
      ].join(" ")}>
        {/* Badge */}
        {offer.badge && (
          <div className={`mb-4 ${isWide ? "lg:mb-5" : ""}`}>
            <span className={[
              "inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full",
              offer.id === "club" ? "bg-[#1a1a1a] text-[#FACC15]" : "bg-[#E64B1E] text-white",
            ].join(" ")}>
              {offer.badge}
              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
            </span>
          </div>
        )}

        {/* Title — on colored badge */}
        <div className="mt-1">
          <span className={[
            "inline-block rounded-2xl px-5 py-2.5 font-black tracking-tight leading-[1.1]",
            t.titleBg,
            t.titleColor,
            isWide
              ? "text-2xl sm:text-3xl lg:text-4xl"
              : "text-xl sm:text-2xl",
          ].join(" ")}>
            <TitleWithBreaks text={offer.title} />
          </span>
        </div>

        {/* Price block — on colored pill */}
        <div className="mt-5 flex items-center gap-3 flex-wrap">
          {offer.oldPrice && (
            <span className="text-[#1a1a1a] font-extrabold text-2xl sm:text-3xl line-through decoration-[#E64B1E] decoration-[3px]">
              {offer.oldPrice}
            </span>
          )}
          <span className={[
            "inline-flex items-baseline gap-2 rounded-2xl px-5 py-2.5 font-black leading-none",
            t.priceBg,
            t.priceColor,
            isGift ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl lg:text-5xl",
          ].join(" ")}>
            {offer.price}
            {offer.priceNote && (
              <span className="text-sm font-semibold opacity-70">
                {offer.priceNote}
              </span>
            )}
          </span>
        </div>

        {/* Description */}
        <p className={[
          "mt-4 text-[14px] leading-relaxed whitespace-pre-line",
          t.descColor,
          isWide ? "max-w-md" : "",
        ].join(" ")}>
          {offer.mobileDescription}
        </p>

        {offer.ctaNote === "countdown" && cd && (
          <div className="mt-4 inline-flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-black/40">
              Открытие продаж через
            </span>
            <span className="font-black text-[#E64B1E] text-sm tabular-nums bg-[#E64B1E]/10 px-2.5 py-1 rounded-lg">
              {cd.msLeft > 0
                ? `${cd.days}д ${cd.hours}:${cd.mins}:${cd.secs}`
                : "Продажи открыты"}
            </span>
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      {isWide ? (
        <div className="hidden lg:block w-px my-8 bg-black/10" />
      ) : (
        <div className="mx-7 sm:mx-9 h-px bg-black/[0.07]" />
      )}

      {/* ── Bullets + CTA ── */}
      <div className={[
       "flex flex-col h-full",
        isWide ? "p-8 sm:p-10 lg:p-12 lg:flex-1" : "p-7 sm:p-9 pt-5",
      ].join(" ")}>
        <ul className={[
          "space-y-2.5 mb-8",
          isWide ? "columns-1 sm:columns-2 gap-x-10" : "",
        ].join(" ")}>
          {offer.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 break-inside-avoid mb-2.5">
              <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${t.bulletIcon} ${t.bulletIconText}`}>
                {isGift ? (
                  <Heart className="h-3 w-3" strokeWidth={2.5} fill="currentColor" />
                ) : (
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                )}
              </span>
              <span className="text-[13px] leading-relaxed text-black/70">{b}</span>
            </li>
          ))}
        </ul>

        {/* CTA buttons */}
       <div
         className={[
           "flex gap-3 mt-auto flex-col",
           isWide ? "lg:flex-row" : "",
         ].join(" ")}
       >
          {!hidePrimaryCta && (
            <button
              type="button"
              onClick={() => onOpenLead(offer.id)}
             className={[
              "rounded-full font-sans font-bold flex items-center justify-center transition-all",
               "text-[13px] sm:text-sm",
               "leading-tight text-center",
               "px-4 py-3",
               "min-h-[48px]",
               "whitespace-normal",
               isWide ? "flex-1" : "w-full",
               offer.id === "ambassador"
                 ? "bg-white text-[#1a1a1a] hover:bg-white/90 shadow-md"
                 : t.ctaPrimary,
             ].join(" ")}
            >
              {offer.cta}
            
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenMore(offer.id)}
           className={[
            "rounded-full font-sans font-semibold transition-all",
             "text-[13px] sm:text-sm",
             "leading-tight text-center",
             "px-4 py-3",
             "min-h-[48px]",
             isWide ? "lg:flex-1 w-full" : "w-full",
             t.ctaSecondary,
           ].join(" ")}
          >
            Узнать больше
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Main ─── */
export default function Programs() {
  useAppHeightVar();
  const salesOpenDate = useMemo(() => new Date(2026, 1, 27, 0, 0, 0), []);
  const cd = useCountdown(salesOpenDate);

  const offers = useMemo<Offer[]>(() => [
    {
      id: "system",
      payType: "one_time",
      title: "Система\n«Архитектура счастья»",
      description:
        "Вы начинаете управлять своим состоянием, целями и энергией.\nСчастье перестаёт быть случайностью — становится архитектурой.",
      mobileDescription:
        "Вы начинаете управлять своим состоянием, целями и энергией.\nСчастье перестаёт быть случайностью — становится архитектурой.",
      oldPrice: "499 €",
      price: "49 €",
      ctaNote: "countdown", // ← ВАЖНО
      bullets: [
        "10 элементов системы счастья",
        "Ежедневные практики (10–15 минут)",
        "Архитектура целей без выгорания",
        "Управление энергией",
        "Гибкость мышления",
        "Стратегия отношений",
        "Живая встреча с Ицхаком (Q&A)",
        "Рабочие инструменты и чек-листы",
        "Доступ к материалам 1 год",
      ],
      cta: "Оставить заявку",
      variant: "light",
      longDescription:
        "Разовый платёж. После оплаты вы получите доступ к материалам на 1 год.",
      badge: "Скидка 90%",
    },
    {
      id: "club",
      payType: "subscription",
      title: "Клуб\n«Архитектура счастья»",
      description: "Полный проект вашего внутреннего дома.",
      mobileDescription:
        "Полная система из 10 ключевых элементов.\nПолный проект вашего внутреннего дома.",
      price: "49 €",
      priceNote: "/ мес",
      ctaNote: "countdown", // ← ВАЖНО
      bullets: [
        "Видео-уроки и тренинги",
        "Полная система 10 элементов",
        "Еженедельные онлайн-встречи с Ицхаком",
        "Личный саппорт кураторов",
        "Сообщество осознанных людей",
        "7 элементов системы «Архитектура счастья»",
      ],
      cta: "Войти в клуб",
      variant: "yellow",
    },
    {
      id: "gift",
      payType: "free",
      title: "Дарю тебе курс",
      description:
        "Мы верим, что система счастья должна быть доступна тем, кому сейчас особенно трудно.\nЕсли вы находитесь в сложной жизненной ситуации, вы можете подать заявку на возможность получения доступа к системе «Архитектура счастья» бесплатно.",
      mobileDescription:
        "Если вы сейчас в тяжёлой жизненной ситуации — подайте заявку на бесплатный доступ.",
      price: "0 €",
      bullets: [
        "Люди с подтвержденной инвалидностью",
        "Люди с тяжелым заболеванием",
        "Те, кто пережил потерю близкого",
        "Люди в серьёзном психологическом кризисе",
        "Другие социально уязвимые категории",
      ],
      longDescription:
        "Как это работает:\n\n1. Заполните форму заявки\n2. Кратко опишите ситуацию\n3. Приложите подтверждающий документ\n\nПосле рассмотрения заявки вы получите ответ на указанные контакты.",
      cta: "Подать заявку",
      variant: "light",
      badge: "Бесплатно",
    },
    {
      id: "ambassador",
      payType: "donation",
      title: "Амбассадор счастья",
      description:
        "Вы становитесь частью закрытого круга людей, которые не просто развиваются сами — а создают возможность восстановления для других.\nВаш вклад финансирует бесплатный доступ к системе «Архитектура счастья» для людей, переживающих болезнь, утрату и кризис.",
      mobileDescription:
        "Поддержите инициативу и создайте возможность восстановления для других. Ваш вклад финансирует бесплатный доступ для людей в кризисе.",
      price: "Любая сумма",
      bullets: [
        "Финансирование бесплатного доступа к системе",
        "Поддержка людей в кризисе",
        "Углубление собственного ощущения смысла и влияния",
      ],
      longDescription:
        "Это уровень выше обычного участия. Это позиция.\n\nЛюди, которые поддерживают других, усиливают собственное ощущение смысла, влияния и внутреннего достоинства.\nСчастье углубляется, когда им делятся.",
      cta: "Стать Амбассадором",
      variant: "yellow",
      badge: "Благотворительность",
    },
  ], []); // ← ЗАВИСИМОСТИ ПУСТЫЕ

  const topRow = offers.slice(0, 3);
  const bottomCard = offers[3];

  const [bulletsModalOpen, setBulletsModalOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  const activeOffer = useMemo(() => offers.find((o) => o.id === activeOfferId) ?? null, [offers, activeOfferId]);

  const openMore = (id: string) => { setActiveOfferId(id); setBulletsModalOpen(true); setLeadModalOpen(false); setModalUrl("details", id); };
  const openLead = (id: string) => { setActiveOfferId(id); setLeadModalOpen(true); setBulletsModalOpen(false); setModalUrl("lead", id); };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const applyFromUrl = () => {
      const sp = new URLSearchParams(window.location.search);
      const lead = sp.get("lead");
      const details = sp.get("details");
      const offerId = sp.get("offerId");
      if (lead === "1" && offerId) { setActiveOfferId(offerId); setLeadModalOpen(true); setBulletsModalOpen(false); return; }
      if (details === "1" && offerId) { setActiveOfferId(offerId); setBulletsModalOpen(true); setLeadModalOpen(false); return; }
      setLeadModalOpen(false); setBulletsModalOpen(false); setActiveOfferId(null);
    };
    applyFromUrl();
    window.addEventListener("popstate", applyFromUrl);
    return () => window.removeEventListener("popstate", applyFromUrl);
  }, []);
  
  

  return (
    <section id="programs" className="bg-[#F6F1E7]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-14 sm:py-20">
        {/* Header */}
        <motion.div
          className="max-w-4xl mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-[12px] font-semibold tracking-[0.2em] text-black/45 uppercase mb-6 sm:mb-7">
            <span className="w-2 h-2 rounded-full bg-[#E64B1E]" />
            Программы и продукты
          </span>
      <h2 className="font-sans font-black tracking-tight text-black text-3xl sm:text-5xl lg:text-6xl leading-[1.05]">
            Выберите формат участия
          </h2>
          <p className="mt-5 text-black/70 text-base sm:text-lg leading-relaxed">
            Начните с фундамента — или заходите в полный проект и стройте устойчивое состояние системно.
          </p>
        </motion.div>

        {/* 3 cards top row */}
      <div className="grid gap-5 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {topRow.map((o, i) => (
          <OfferCard
            key={o.id}
            offer={o}
            index={i}
            isWide={false}
            onOpenMore={openMore}
            onOpenLead={openLead}
            cd={cd}
          />
        ))}
      </div>
         

        {/* 4th card full width — prominent */}
        {bottomCard && (
        <div className="mt-5 lg:mt-6">
          <OfferCard
            offer={bottomCard}
            index={3}
            isWide
            onOpenMore={openMore}
            onOpenLead={openLead}
          />
        </div>
        )}
      </div>

      <BulletsModal open={bulletsModalOpen} onClose={() => { setBulletsModalOpen(false); clearModalUrl(); }} offer={activeOffer} onJoinClub={() => {}} />
      <LeadFormModal open={leadModalOpen} onClose={() => { setLeadModalOpen(false); clearModalUrl(); }} offer={activeOffer} />
    </section>
  );
}

