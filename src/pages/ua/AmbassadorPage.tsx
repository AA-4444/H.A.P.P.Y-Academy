import { useState, useMemo } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import {
  OfferCard,
  LeadFormModal,
  BulletsModal,
} from "@/components/landing/Programs";

export default function AmbassadorPage() {
  const [leadOpen, setLeadOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const offer = useMemo(
    () => ({
      id: "ambassador",
      payType: "donation" as const,
      title: "Амбасадор щастя",
      description:
        "Ви стаєте частиною закритого кола людей, які не просто розвиваються самі — а створюють можливість відновлення для інших.\nВаш внесок фінансує безкоштовний доступ до системи «Архітектура щастя» для людей, які переживають хворобу, втрату та кризу.",
      mobileDescription:
        "Підтримайте ініціативу та створіть можливість відновлення для інших.\nВаш внесок фінансує безкоштовний доступ для людей у кризі.",
      price: "Будь-яка сума",
      bullets: [
        "Фінансування безкоштовного доступу до системи",
        "Підтримка людей у кризі",
        "Поглиблення власного відчуття сенсу та впливу",
      ],
      longDescription:
        "Це рівень вищий за звичайну участь. Це позиція.\n\nЛюди, які підтримують інших, посилюють власне відчуття сенсу, впливу та внутрішньої гідності.\nЩастя поглиблюється, коли ним діляться.",
      cta: "Стати Амбасадором",
      variant: "yellow" as const,
      badge: "Благодійність",
    }),
    []
  );

  return (
    <>
      <Header />

      <section className="bg-[#F6F1E7] min-h-screen flex items-center">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 w-full">
          <OfferCard
            offer={offer}
            index={0}
            isWide
            onOpenLead={() => setLeadOpen(true)}
            onOpenMore={() => setDetailsOpen(true)}
          />
        </div>
      </section>

      <BulletsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        offer={offer}
        onJoinClub={() => {}}
      />

      <LeadFormModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        offer={offer}
      />

      <Footer />
    </>
  );
}