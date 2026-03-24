import { useState } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

type FormData = {
  name: string;
  contact: string;
  review: string;
};

export default function ReviewPage() {
  const [data, setData] = useState<FormData>({
    name: "",
    contact: "",
    review: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const nameOk = data.name.trim().length >= 2;
  const contactOk = data.contact.trim().length >= 5;
  const reviewOk = data.review.trim().length >= 10;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setError(null);

    if (!nameOk || !contactOk || !reviewOk) {
      setError("Будь ласка, заповніть ім’я, контакт і відгук (мінімум 10 символів).");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        offerId: "review",
        offerTitle: "📝 Відгук",
        name: data.name.trim(),
        contact: data.contact.trim(),
        comment: data.review.trim(),
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text().catch(() => "");
      let json: any = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch {
        json = { raw: text };
      }

      if (!res.ok || json?.ok === false) {
        throw new Error(json?.error || `Lead API error: ${res.status}`);
      }

      setSent(true);
      setSubmitting(false);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Помилка. Спробуйте ще раз.");
      setSubmitting(false);
    }
  };

  const reset = () => {
    setData({ name: "", contact: "", review: "" });
    setSent(false);
    setSubmitting(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F6F1E7] flex flex-col">
      <Header />

      <main className="flex-1 pt-[88px] sm:pt-[96px]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
          <div className="rounded-[28px] sm:rounded-[32px] bg-white border border-black/10 shadow-[0_20px_70px_rgba(0,0,0,0.15)] overflow-hidden">
            <div className="p-6 sm:p-10">
              <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 font-semibold">
                відгуки
              </div>

              <h1 className="mt-3 font-sans font-extrabold tracking-tight text-black text-3xl sm:text-5xl leading-[1.05]">
                Залиште відгук
              </h1>

              <p className="mt-4 text-black/70 text-base sm:text-lg leading-relaxed max-w-[70ch]">
                Поділіться враженнями — ваш відгук надійде нам у Telegram, і ми зможемо покращувати продукт і підтримку.
              </p>

              <div className="mt-8 grid gap-6">
                {sent ? (
                  <div className="rounded-2xl bg-[#F6F1E7] border border-black/10 p-5 sm:p-6">
                    <div className="font-sans font-extrabold text-black text-xl sm:text-2xl">
                      Дякуємо! Відгук надіслано ✅
                    </div>
                    <div className="mt-2 text-black/70">
                      Ми отримали повідомлення й обов’язково прочитаємо його.
                    </div>

                    <div className="mt-5">
                      <Button
                        size="lg"
                        className="rounded-full h-12 px-8 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
                        onClick={reset}
                      >
                        Надіслати ще один відгук
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={submit} className="grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-black/55">
                          Ім’я
                        </label>
                        <input
                          value={data.name}
                          onChange={(e) => setData((p) => ({ ...p, name: e.target.value }))}
                          className="mt-2 w-full h-12 rounded-2xl px-4 bg-[#F6F1E7]/60 border border-black/10 outline-none focus:ring-2 focus:ring-black/20"
                          placeholder="Як до вас звертатися?"
                          autoComplete="name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-black/55">
                          Телефон або Telegram
                        </label>
                        <input
                          value={data.contact}
                          onChange={(e) => setData((p) => ({ ...p, contact: e.target.value }))}
                          className="mt-2 w-full h-12 rounded-2xl px-4 bg-[#F6F1E7]/60 border border-black/10 outline-none focus:ring-2 focus:ring-black/20"
                          placeholder="+49… або @username"
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-black/55">
                        Ваш відгук
                      </label>
                      <textarea
                        value={data.review}
                        onChange={(e) => setData((p) => ({ ...p, review: e.target.value }))}
                        className="mt-2 w-full min-h-[160px] rounded-2xl p-4 bg-[#F6F1E7]/60 border border-black/10 outline-none focus:ring-2 focus:ring-black/20 resize-none"
                        placeholder="Що вам сподобалося? Що можна покращити? Які результати ви отримали?"
                      />
                      <div className="mt-2 text-xs text-black/45">
                        Мінімум 10 символів.
                      </div>
                    </div>

                    {error ? (
                      <div className="rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 px-4 py-3 text-sm">
                        {error}
                      </div>
                    ) : null}

                    <Button
                      size="lg"
                      type="submit"
                      disabled={submitting}
                      className="w-full rounded-full h-12 font-semibold bg-[#E64B1E] text-white hover:opacity-95"
                    >
                      {submitting ? "Надсилаємо..." : "Надіслати відгук"}
                    </Button>

                    <div className="text-[12px] text-black/55 leading-snug">
                      Натискаючи «Надіслати відгук», ви погоджуєтеся на обробку даних для зв’язку з вами.
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}