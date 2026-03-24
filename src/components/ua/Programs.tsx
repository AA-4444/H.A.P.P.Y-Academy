import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { X, Check, Heart } from "lucide-react";
import countries from "i18n-iso-countries";
import uk from "i18n-iso-countries/langs/uk.json";

countries.registerLocale(uk);

const COUNTRY_LIST = Object.values(
  countries.getNames("uk", { select: "official" })
).sort((a, b) => a.localeCompare(b, "uk"));

/* ─── types ─── */
type Offer = {
  id: string;
  title: string;
  description: string;
  mobileDescription: string;
  price: string;
  priceNote?: string;
  priceAlt?: string;
  oldPrice?: string;
  oldPriceNote?: string;
  bullets: string[];
  cta: string;
  variant: "light" | "yellow";
  ctaNote?: string;
  longDescription?: string;
  payType?: "one_time" | "subscription" | "free" | "donation";
  badge?: string;
  longSubtitle?: string;
  highlightText?: string;
};

type LeadFormData = {
  name: string;
  phone: string;
  messenger: string;
  comment: string;
  amount: string;
  country: string;
};

const SUPPORT_HREF = "https://t.me/TataZakzheva/";

/* ─── hooks ─── */

function useStableAppHeight(setIsGSA: (v: boolean) => void) {
  useEffect(() => {
    const gsa = typeof navigator !== "undefined" && /GSA\//.test(navigator.userAgent);
    setIsGSA(gsa);

    if (gsa && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const setHeight = () => {
      const h = gsa
        ? window.innerHeight
        : (window.visualViewport?.height ?? window.innerHeight);
      document.documentElement.style.setProperty("--app-height", `${h}px`);
    };

    setHeight();

    if (gsa) {
      document.documentElement.classList.add("gsa-lock");
      document.body.classList.add("gsa-lock");
    }

    const onOrientationChange = () => { setTimeout(setHeight, 150); };
    window.addEventListener("orientationchange", onOrientationChange);
    window.addEventListener("pageshow", setHeight);

    return () => {
      window.removeEventListener("orientationchange", onOrientationChange);
      window.removeEventListener("pageshow", setHeight);
      if (gsa) {
        document.documentElement.classList.remove("gsa-lock");
        document.body.classList.remove("gsa-lock");
      }
    };
  }, []);
}

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const html = document.documentElement;

    if (document.body.classList.contains("gsa-lock")) {
      const prevOverflow = html.style.overflow;
      html.style.overflow = "hidden";
      return () => {
        html.style.overflow = prevOverflow;
      };
    }

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
function buildContact(phone: string, messenger: string) {
  const parts: string[] = [];

  if (phone.trim()) {
    parts.push(`Телефон: ${phone.trim()}`);
  }

  if (messenger.trim()) {
    parts.push(`Зв’язок: ${messenger.trim()}`);
  }

  return parts.join(" | ");
}

function isMessengerValid(value: string) {
  const v = value.trim();

  const isTg = /^@[a-zA-Z0-9_]{4,31}$/.test(v);
  const isPhone = /^\+?[0-9\s\-()]{7,}$/.test(v);

  return isTg || isPhone;
}

/* ─── CountdownBlock — isolated re-renders every second ─── */
const COUNTDOWN_TARGET = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);

function CountdownBlock({ target }: { target: Date }) {
  const cd = useCountdown(target);
  return (
    <div className="mt-4 flex flex-col items-start">
      <span className="text-[10px] uppercase tracking-widest text-black/40 font-semibold">
        Знижка закінчиться через
      </span>
      <span className="text-lg font-black text-[#E64B1E] tabular-nums mt-0.5">
        {cd.msLeft > 0
          ? `${cd.days}д ${cd.hours}:${cd.mins}:${cd.secs}`
          : "Продажі відкриті"}
      </span>
    </div>
  );
}

/* ─── BulletsModal ─── */
export function BulletsModal({
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }} className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-6">
            <div className="relative w-full max-w-lg overflow-y-auto rounded-t-[28px] sm:rounded-[28px] bg-background shadow-2xl" style={{ maxHeight: "calc(var(--app-height, 100vh) - 32px)" }}>
              <div className="sticky top-0 z-10 flex items-start justify-between p-6 pb-3 bg-background rounded-t-[28px]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    {offer.id === "gift" ? "Кому підходить" : "Що всередині"}
                  </p>
                  <h3 className="text-xl font-black text-foreground leading-tight whitespace-pre-line">{offer.title}</h3>
                </div>
                <button onClick={onClose} className="ml-4 mt-1 rounded-full p-2 hover:bg-muted transition" aria-label="Закрити">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <div className="px-6 pb-2">
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{offer.description}</p>
              </div>
              {offer.id === "gift" ? (
                <ul className="px-6 pb-4 space-y-2">
                  {offer.bullets.map((b, i) => (
                    <li key={i} className="text-sm text-foreground leading-relaxed">— {b}</li>
                  ))}
                </ul>
              ) : (
                <ul className="px-6 pb-4 space-y-2.5">
                  {offer.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-foreground leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
              {offer.longDescription && (
                <div className="px-6 pb-4">
                  <h4 className="text-sm font-bold text-foreground mb-1">Детальніше</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{offer.longDescription}</p>
                </div>
              )}
              <div className="sticky bottom-0 bg-background px-6 py-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Ціна</span>
                  <div className="flex items-baseline gap-2">
                    {offer.oldPrice && (
                      <span className="text-sm line-through text-muted-foreground">
                        {offer.oldPrice}
                        {offer.oldPriceNote && <span className="text-xs ml-0.5">{offer.oldPriceNote}</span>}
                      </span>
                    )}
                    <span className="text-2xl font-black text-foreground">
                      {offer.price}
                      {offer.priceNote && <span className="text-sm font-semibold opacity-70 ml-1">{offer.priceNote}</span>}
                    </span>
                  </div>
                </div>
                {offer.id === "club" ? (
                  <a href={SUPPORT_HREF} target="_blank" rel="noopener noreferrer" className="block w-full rounded-full h-12 font-sans font-bold transition bg-[#FACC15] text-[#1a1a1a] hover:bg-[#e5b800] flex items-center justify-center">
                    Виникли запитання?
                  </a>
                ) : (
                  <button onClick={onClose} className="w-full rounded-full h-12 font-sans font-bold transition bg-[#FACC15] text-[#1a1a1a] hover:bg-[#e5b800]">
                    Зрозуміло
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
export function LeadFormModal({
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
    messenger: "",
    country: "",
    comment: "",
    amount: "",
  });

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isLeadOnly = offer?.id === "gift";
  const isAmbassador = offer?.id === "ambassador";

  const title =
    isAmbassador
      ? "Підтримати донатом"
      : offer?.id === "club"
      ? "Заявка на клуб"
      : offer?.payType === "one_time"
      ? "Заявка на програму"
      : "Заявка";

  const subtitle = isLeadOnly
    ? "Залиште контакти — ми зв’яжемося з вами."
    : isAmbassador
    ? "Залиште контакти та суму — ви перейдете до оплати донату."
    : "Залиште контакти — ви перейдете до оплати.";

  const submitLabel =
    isLeadOnly
      ? "Залишити заявку"
      : isAmbassador
      ? "Перейти до оплати донату"
      : "Перейти до оплати";

  const resetAndClose = () => {
    setData({
      name: "",
      phone: "",
      messenger: "",
      country: "",
      comment: "",
      amount: "",
    });
    setSent(false);
    setSubmitting(false);
    onClose();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !offer) return;

    const name = data.name.trim();
    const phone = data.phone.trim();
    const comment = data.comment.trim();
    if (!isMessengerValid(data.messenger)) return;
    if (name.length < 2 || phone.length < 5) return;

    setSubmitting(true);

    try {
      if (offer.id === "ambassador") {
        const donation = Number(String(data.amount).replace(",", "."));
        if (!Number.isFinite(donation) || donation < 5 || donation > 50000) {
          alert("Введіть суму донату від 5 до 50 000 €");
          setSubmitting(false);
          return;
        }
      }

      if (offer.id === "gift") {
        const r = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            offerId: offer.id,
            offerTitle: offer.title,
            name,
            contact: buildContact(phone, data.messenger),
            comment,
            country: data.country,
            pageUrl: window.location.href,
          }),
        });

        if (!r.ok) throw new Error(`Lead error: ${r.status}`);

        setSent(true);
        setSubmitting(false);
        return;
      }

      if (offer.id === "club") {
        const r = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            offerId: offer.id,
            offerTitle: offer.title,
            name,
            contact: buildContact(phone, data.messenger),
            comment,
            country: data.country,
            pageUrl: window.location.href,
          }),
        });

        if (!r.ok) throw new Error(`Lead error: ${r.status}`);

        window.location.href = "https://t.me/tribute/app?startapp=ssF9";
        return;
      }

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: createLeadId(),
          stage: "pre_payment",
          offerId: offer.id,
          offerTitle: offer.title,
          name,
          contact: buildContact(phone, data.messenger),
          country: data.country,
          comment,
          pageUrl: window.location.href,
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
      alert("Помилка. Спробуйте ще раз.");
      setSubmitting(false);
    }
  };

  const inputCls =
    "mt-2 w-full h-12 rounded-2xl px-4 bg-card/70 border border-border outline-none focus:ring-2 focus:ring-ring/20 text-foreground";

  const isDisabled =
    submitting ||
    data.name.trim().length < 2 ||
    data.phone.trim().length < 5 ||
    data.country.trim().length === 0 ||
    !isMessengerValid(data.messenger) ||
    (isAmbassador && String(data.amount).trim().length === 0) ||
    (offer?.id === "gift" && data.comment.trim().length < 20);

  return (
    <AnimatePresence>
      {open && offer ? (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm" onClick={resetAndClose} />
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }} className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-6">
            <div className="relative w-full max-w-lg overflow-y-auto rounded-t-[28px] sm:rounded-[28px] bg-background shadow-2xl" style={{ maxHeight: "calc(var(--app-height, 100vh) - 32px)" }}>
              <div className="sticky top-0 z-10 flex items-start justify-between p-6 pb-3 bg-background rounded-t-[28px]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    {title}
                  </p>
                  <p className="text-base font-bold text-foreground leading-tight whitespace-pre-line">
                    {offer.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
                </div>
                <button onClick={resetAndClose} className="ml-4 mt-1 rounded-full p-2 hover:bg-muted transition" aria-label="Закрити">
                  <X className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              <div className="px-6 pb-6">
                {sent ? (
                  <div className="flex flex-col items-center text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-emerald-600" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {isLeadOnly ? "Заявку надіслано" : "Перенаправляємо на оплату"}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {isLeadOnly
                        ? "Ми уважно розглянемо вашу заявку та зв’яжемося з вами найближчим часом."
                        : "Зараз відкриється захищена сторінка оплати."}
                    </p>
                    {isLeadOnly && (
                      <button onClick={resetAndClose} className="mt-6 rounded-full px-8 h-12 font-sans font-bold transition bg-[#FACC15] text-[#1a1a1a] hover:bg-[#e5b800]">
                        Закрити
                      </button>
                    )}
                  </div>
                ) : (
                  <form onSubmit={submit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Ім’я</label>
                      <input type="text" value={data.name} onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))} className={inputCls} placeholder="Як до вас звертатися?" autoComplete="name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Телефон</label>
                      <input type="tel" value={data.phone} onChange={(e) => setData((p) => ({ ...p, phone: e.target.value }))} className={inputCls} placeholder="+49…" autoComplete="tel" inputMode="tel" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        Telegram або WhatsApp
                      </label>

                      <input
                        type="text"
                        value={data.messenger}
                        onChange={(e) =>
                          setData((p) => ({ ...p, messenger: e.target.value }))
                        }
                        className={inputCls}
                        placeholder="@username або +49..."
                        autoComplete="off"
                      />

                      <p className="text-xs text-muted-foreground mt-1">
                        Введіть @username або номер у міжнародному форматі
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Країна</label>
                      <div className="relative mt-2">
                        <select
                          value={data.country}
                          onChange={(e) => setData((p) => ({ ...p, country: e.target.value }))}
                          required
                          className="w-full h-12 rounded-2xl px-4 pr-10 bg-card/70 border border-border text-foreground outline-none appearance-none"
                        >
                          <option value="" disabled>Оберіть країну</option>
                          {COUNTRY_LIST.map((country) => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                        <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    {isAmbassador && (
                      <div>
                        <label className="text-sm font-medium text-foreground">Сума донату (EUR)</label>
                        <input type="text" value={data.amount} onChange={(e) => setData((p) => ({ ...p, amount: e.target.value.replace(/[^\d.,]/g, "") }))} className={inputCls} placeholder="Наприклад: 25" inputMode="decimal" autoComplete="off" />
                        <p className="text-xs text-muted-foreground mt-1">Мінімум 5 €, максимум 50 000 €.</p>
                      </div>
                    )}

                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {offer?.id === "gift"
                          ? "Опишіть, чому ви можете претендувати на право безкоштовного проходження курсу"
                          : isAmbassador
                          ? "Опишіть свою ситуацію"
                          : "Коментар"}
                      </label>

                      <textarea
                        value={data.comment}
                        onChange={(e) => setData((p) => ({ ...p, comment: e.target.value }))}
                        className="mt-2 w-full min-h-[80px] rounded-2xl p-4 bg-card/70 border border-border outline-none focus:ring-2 focus:ring-ring/20 resize-none text-foreground"
                        placeholder={
                          offer?.id === "gift"
                            ? "Опишіть вашу ситуацію детально…"
                            : isAmbassador
                            ? "Напишіть кілька слів про вашу ситуацію…"
                            : "Зручний час / запитання"
                        } />
                    </div>

                    <button type="submit" disabled={isDisabled} className="w-full rounded-full h-12 font-sans font-bold transition shadow-[0_4px_20px_-4px_rgba(250,204,21,0.5)] disabled:opacity-50 bg-[#FACC15] text-[#1a1a1a] hover:bg-[#e5b800]">
                      {submitting ? "Надсилаємо..." : submitLabel}
                    </button>

                    <p className="text-xs text-muted-foreground leading-snug">
                      {isLeadOnly
                        ? "Натискаючи «Залишити заявку», ви погоджуєтеся на обробку даних для зв’язку з вами."
                        : "Натискаючи «Перейти до оплати», ви погоджуєтеся на обробку даних для зв’язку з вами."}
                    </p>
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

const GIFT_REVIEWS = [
  {
    text: "Я вже відчуваю, що всередині стало спокійніше. З’явилася надія і відчуття опори.",
    author: "Анна",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    text: "Після курсу стало легше дихати, зник хаос у голові й повернулася енергія.",
    author: "Марія",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    text: "Дуже вчасно. Цей доступ допоміг мені знову відчути радість життя.",
    author: "Олена",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

function GiftMiniReviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % GIFT_REVIEWS.length);
    }, 3500);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mt-5 sm:mt-6">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/40 mb-2">
        Відгуки
      </div>

      <div className="relative overflow-hidden rounded-[20px] bg-[#FFF7E5] border border-[#E64B1E]/15 px-4 py-4 h-[150px] sm:h-[138px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 px-4 py-4 flex flex-col justify-between"
          >
            <p className="text-[14px] leading-relaxed text-black/75">
              “{GIFT_REVIEWS[index].text}”
            </p>

            <div className="mt-3 flex items-center gap-3">
              <img
                src={GIFT_REVIEWS[index].avatar}
                alt={GIFT_REVIEWS[index].author}
                className="h-10 w-10 rounded-full object-cover border border-[#E64B1E]/15 shrink-0"
                loading="lazy"
              />

              <div className="text-sm font-bold text-[#E64B1E]">
                {GIFT_REVIEWS[index].author}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {GIFT_REVIEWS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={[
              "h-2.5 rounded-full transition-all",
              i === index ? "w-6 bg-[#E64B1E]" : "w-2.5 bg-black/15 hover:bg-black/25",
            ].join(" ")}
            aria-label={`Перейти до відгуку ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
export function OfferCard({
  offer,
  index,
  isWide,
  onOpenMore,
  onOpenLead,
  freeUsers,
}: {
  offer: Offer;
  index: number;
  isWide: boolean;
  onOpenMore: (id: string) => void;
  onOpenLead: (id: string) => void;
  freeUsers: number;
}) {
  const isGift = offer.id === "gift";
  const hidePrimaryCta = offer.id === "club";
  const t = CARD_THEMES[offer.id] ?? DEFAULT_THEME;

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }}
      className={[
        "group relative flex flex-col overflow-hidden h-full",
        "rounded-[28px] sm:rounded-[36px]",
        isWide ? "lg:flex-row lg:min-h-[340px]" : "",
        t.bg,
        t.shadow,
        t.hoverShadow,
        "border-0",
        "transition-shadow duration-500",
      ].join(" ")}
    >
      {/* ── Header / price section ── */}
      <div className={[
        "flex flex-col relative",
        isWide ? "p-8 sm:p-10 lg:p-12 lg:flex-1 lg:justify-center" : "p-5 pb-3 sm:p-9",
      ].join(" ")}>
        {offer.badge && (
          <div className={`mb-3 sm:mb-4 ${isWide ? "lg:mb-5" : ""}`}>
            <span className={[
              "inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full",
              offer.id === "club" ? "bg-[#1a1a1a] text-[#FACC15]" : "bg-[#E64B1E] text-white",
            ].join(" ")}>
              {offer.badge}
              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
            </span>
          </div>
        )}

        <div className="mt-1">
          <span className={[
            "inline-block rounded-2xl px-4 py-2 sm:px-5 sm:py-2.5 font-black tracking-tight leading-[1.1]",
            t.titleBg,
            t.titleColor,
            isWide ? "text-2xl sm:text-3xl lg:text-4xl" : "text-lg sm:text-2xl",
          ].join(" ")}>
            <TitleWithBreaks text={offer.title} />
          </span>
        </div>

        <div className="mt-3 sm:mt-5 flex items-center gap-3 flex-wrap">
          {offer.oldPrice && (
            <span className="relative inline-block text-[#1a1a1a] font-extrabold text-xl sm:text-3xl">
              {offer.oldPrice}
              <span
                aria-hidden
                className="pointer-events-none absolute left-[-6%] top-1/2 h-[3px] w-[112%] bg-[#E64B1E] rotate-[-12deg] rounded-full"
              />
            </span>
          )}
          <span className={[
            "inline-flex items-baseline gap-2 rounded-2xl px-4 py-2 sm:px-5 sm:py-2.5 font-black leading-none",
            t.priceBg,
            t.priceColor,
            isGift ? "text-3xl sm:text-5xl" : "text-2xl sm:text-4xl lg:text-5xl",
          ].join(" ")}>
            {offer.price}
            {offer.priceNote && (
              <span className="text-xs sm:text-sm font-semibold opacity-70">{offer.priceNote}</span>
            )}
          </span>
          {offer.id === "club" && offer.priceAlt && (
            <div className="mt-2 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#E64B1E]">
              {offer.priceAlt}
            </div>
          )}
        </div>

        {/* Description & subtitle: hidden on mobile (<sm), visible on sm+ */}
        {offer.id === "system" ? (
          <div className="mt-5 hidden sm:block">
            <div className="relative pl-4">
              <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-emerald-500 rounded-full" />
              <div className="space-y-1">
                <p className="text-[14px] font-semibold text-emerald-600">
                  {offer.longSubtitle}
                </p>
                <p className="text-[14px] font-medium text-emerald-700">
                  {offer.highlightText}
                </p>
              </div>
            </div>
          </div>
        ) : offer.id === "club" ? (
          <div className="mt-4">
            <div className="bg-[#16A34A] text-white px-4 py-3 rounded-xl text-sm font-semibold">
              {offer.highlightText}
            </div>
          </div>
        ) : (
          <p
            className={[
              "mt-4 text-[14px] leading-relaxed whitespace-pre-line hidden sm:block",
              t.descColor,
              isWide ? "max-w-md" : "",
            ].join(" ")}
          >
            {offer.mobileDescription}
          </p>
        )}

        {offer.id === "gift" && (
          <p className="mt-4 text-sm sm:text-[14px] leading-relaxed font-semibold text-[#E64B1E]">
            Право на безкоштовне проходження курсу надається особам,
            які документально підтвердили свій статус інвалідності.
          </p>
        )}
      </div>

      {/* ── Divider: hidden on mobile ── */}
      {isWide ? (
        <div className="hidden lg:block w-px my-8 bg-black/10" />
      ) : (
        <div className="mx-7 sm:mx-9 h-px bg-black/[0.07] hidden sm:block" />
      )}

      {/* ── Bullets (hidden on mobile) + CTA (always visible) ── */}
      <div className={[
        "flex flex-col h-full",
        isWide ? "p-8 sm:p-10 lg:p-12 lg:flex-1" : "px-5 pb-5 pt-0 sm:p-9 sm:pt-5",
      ].join(" ")}>
        {/* Bullets: hidden on mobile */}
        <ul className={[
          "space-y-2.5 mb-8 hidden sm:block",
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
        {offer.id === "gift" && (
          <div className="mt-6">
            <div className="text-center">
              <p className="text-sm text-black/60">
                Зараз на безкоштовній основі проходять курс
              </p>

              <div className="text-3xl font-black text-[#E64B1E]">
                {freeUsers} осіб
              </div>
            </div>

            <GiftMiniReviews />

            <button
              onClick={() =>
                document
                  .getElementById("ambassador")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-5 mb-3 w-full rounded-full bg-[#16A34A] text-white py-3 text-sm font-bold hover:bg-[#15803D] transition"
            >
              Стати спонсором
            </button>
          </div>
        )}

        {/* CTA buttons: always visible */}
        <div className={["flex gap-2.5 sm:gap-3 mt-auto flex-col", isWide ? "lg:flex-row" : ""].join(" ")}>
          {/* PRIMARY CTA */}
          <button
            type="button"
            onClick={() => onOpenLead(offer.id)}
            className={[
              "rounded-full font-sans font-bold flex items-center justify-center",
              "text-[13px] sm:text-sm",
              "leading-tight text-center",
              "px-4 py-2.5 sm:py-3",
              "min-h-[42px] sm:min-h-[48px]",
              "whitespace-normal",
              isWide ? "flex-1" : "w-full",
              offer.id === "ambassador"
                ? "bg-white text-[#1a1a1a] hover:bg-white/90 shadow-md"
                : offer.id === "club"
                ? "bg-white text-[#1a1a1a] hover:bg-white/90 shadow-md"
                : t.ctaPrimary
            ].join(" ")}
          >
            {offer.cta}
          </button>

          {/* CLUB CTA */}

          {/* SECONDARY CTA */}
          <button
            type="button"
            onClick={() => onOpenMore(offer.id)}
            className={[
              "rounded-full font-sans font-semibold",
              "text-[13px] sm:text-sm",
              "leading-tight text-center",
              "px-4 py-2.5 sm:py-3",
              "min-h-[42px] sm:min-h-[48px]",
              isWide ? "lg:flex-1 w-full" : "w-full",
              t.ctaSecondary,
            ].join(" ")}
          >
            Дізнатися більше
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Main ─── */
export default function Programs() {
  const [isGSA, setIsGSA] = useState(false);

  const START_USERS = 120;
  const START_DATE = new Date("2026-03-01");

  const calcUsers = () => {
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24)
    );

    return START_USERS + diffDays * 10;
  };

  const [freeUsers, setFreeUsers] = useState(calcUsers());

  useEffect(() => {
    const id = setInterval(() => {
      setFreeUsers(calcUsers());
    }, 60000);

    return () => clearInterval(id);
  }, []);

  useStableAppHeight(setIsGSA);

  const offers = useMemo<Offer[]>(() => [
    {
      id: "system",
      payType: "one_time",
      ctaNote: "countdown",
      title: "© Система\n«Архітектура щастя»",
      longSubtitle: "Фундаментальний курс від Іцхака Пінтосевича.",
      highlightText: "Плід 20-річного вивчення природи щастя.",
      description:
        "Ви починаєте керувати своїм станом, цілями та енергією.\nЩастя перестає бути випадковістю — стає архітектурою.",
      mobileDescription:
        "Ви починаєте керувати своїм станом, цілями та енергією.\nЩастя перестає бути випадковістю — стає архітектурою.",
      oldPrice: "499 €",
      price: "49 €",
      bullets: [
        "10 елементів системи щастя",
        "Щоденні практики (10–15 хвилин)",
        "Архітектура цілей без вигорання",
        "Управління енергією",
        "Гнучкість мислення",
        "Стратегія стосунків",
        "Жива зустріч з Іцхаком (Q&A)",
        "Робочі інструменти та чек-листи",
        "Доступ до матеріалів на 30 днів",
        "20 відеоуроків, сесія з Іцхаком",
      ],
      cta: "Купити зараз",
      variant: "light",
      longDescription: "Разовий платіж. Після оплати ви отримаєте доступ до матеріалів на 1 рік.",
      badge: "Знижка 90%",
    },
    {
      id: "club",
      payType: "subscription",
      title: "© Клуб\n«Архітектура щастя»",
      highlightText: "Доступ до всіх курсів Іцхака Пінтосевича",
      priceAlt: "або 250 € / рік (вигідніше)",
      description: "Повний проєкт вашого внутрішнього дому.",
      mobileDescription: "Повна система з 10 ключових елементів.\nПовний проєкт вашого внутрішнього дому.",
      price: "49 €",
      priceNote: "/ міс",
      bullets: [
        "Відеоуроки та тренінги",
        "Аватар Іцхака відповідає 24/7",
        "Доступ до курсів Іцхака Пінтосевича",
        "Відповіді на хвилюючі запитання",
        "Повний спектр життєвого балансу",
        "Здоровий ендорфін і енергія",
        "Ясність мислення",
        "Розуміння призначення",
        "Щасливі стосунки",
        "Спільнота усвідомлених людей",
      ],
      cta: "Купити зараз",
      variant: "yellow",
    },
    {
      id: "gift",
      payType: "free",
      title: "© Даруємо тобі курс",
      description:
        "Ми віримо, що система щастя має бути доступною тим, кому зараз особливо важко.\nЯкщо ви перебуваєте у складній життєвій ситуації, ви можете подати заявку на можливість отримати доступ до системи «Архітектура щастя» безкоштовно.",
      mobileDescription: "Якщо ви відповідаєте таким критеріям:",
      price: "0 €",
      bullets: [
        "Особи з підтвердженим статусом інвалідності",
      ],
      longDescription: "Як це працює:\n\n1. Заповніть форму заявки\n2. Коротко опишіть ситуацію\n3. Додайте підтверджувальний документ\n\nПісля розгляду заявки ви отримаєте відповідь на вказані контакти.",
      cta: "Подати заявку",
      variant: "light",
      badge: "Безкоштовно",
    },
    {
      id: "ambassador",
      payType: "donation",
      title: "© Амбасадор щастя",
      description:
        "Ви стаєте частиною закритого кола людей, які не просто розвиваються самі — а створюють можливість відновлення для інших.\nВаш внесок фінансує безкоштовний доступ до системи «Архітектура щастя» для людей, які переживають хворобу, втрату та кризу.",
      mobileDescription: "Підтримайте ініціативу та створіть можливість відновлення для інших. Ваш внесок фінансує безкоштовний доступ для людей у кризі.",
      price: "Будь-яка сума",
      bullets: [
        "Фінансування безкоштовного доступу до системи",
        "Підтримка людей у кризі",
        "Поглиблення власного відчуття сенсу та впливу",
      ],
      longDescription: "Це рівень вищий за звичайну участь. Це позиція.\n\nЛюди, які підтримують інших, посилюють власне відчуття сенсу, впливу та внутрішньої гідності.\nЩастя поглиблюється, коли ним діляться.",
      cta: "Стати Амбасадором",
      variant: "yellow",
      badge: "Благодійність",
    },
  ], []);

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

  const sectionContent = (
    <section id="programs" className="bg-[#F6F1E7]">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-14 sm:py-20">
        <motion.div
          className="max-w-4xl mb-12 sm:mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-[12px] font-semibold tracking-[0.2em] text-black/45 uppercase mb-6 sm:mb-7">
            <span className="w-2 h-2 rounded-full bg-[#E64B1E]" />
            Програми та продукти
          </span>
          <h2 className="font-sans font-black tracking-tight text-black text-3xl sm:text-5xl lg:text-6xl leading-[1.05]">
            Оберіть формат участі
          </h2>
          <p className="mt-5 text-black/70 text-base sm:text-lg leading-relaxed">
            Почніть із фундаменту — або заходьте в повний проєкт і будуйте стійкий стан системно.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid gap-5 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {topRow.map((o, i) => (
            <OfferCard
              key={o.id}
              offer={o}
              index={i}
              isWide={false}
              onOpenMore={openMore}
              onOpenLead={openLead}
              freeUsers={freeUsers}
            />
          ))}
        </motion.div>

        {bottomCard && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="mt-5 lg:mt-6"
          >
            <div id="ambassador">
              <OfferCard
                offer={bottomCard}
                index={3}
                isWide
                onOpenMore={openMore}
                onOpenLead={openLead}
                freeUsers={freeUsers}
              />
            </div>
          </motion.div>
        )}
      </div>

      <BulletsModal open={bulletsModalOpen} onClose={() => { setBulletsModalOpen(false); clearModalUrl(); }} offer={activeOffer} onJoinClub={() => {}} />
      <LeadFormModal open={leadModalOpen} onClose={() => { setLeadModalOpen(false); clearModalUrl(); }} offer={activeOffer} />
    </section>
  );

  return sectionContent;
}