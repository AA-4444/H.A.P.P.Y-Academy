import { useState, useMemo } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import {
  OfferCard,
  LeadFormModal,
  BulletsModal,
} from "@/components/landing/Programs";

export default function ClubPage() {
  const [leadOpen, setLeadOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const offer = useMemo(
    () => ({
      id: "club",
      payType: "subscription" as const,
      title: "Клуб\n«Архітектура щастя»",
      description: "Повний проєкт вашого внутрішнього дому.",
      mobileDescription:
        "Повна система з 10 ключових елементів.\nПовний проєкт вашого внутрішнього дому.",
      price: "49 €",
      priceNote: "/ міс",
      bullets: [
        "Відеоуроки та тренінги",
        "Повна система 10 елементів",
        "Щотижневі онлайн-зустрічі з Іцхаком",
        "Особистий супровід кураторів",
        "Спільнота усвідомлених людей",
      ],
      cta: "Увійти в клуб",
      variant: "yellow" as const,
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