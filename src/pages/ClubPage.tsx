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
	  title: "Клуб\n«Архитектура счастья»",
	  description: "Полный проект вашего внутреннего дома.",
	  mobileDescription:
		"Полная система из 10 ключевых элементов.\nПолный проект вашего внутреннего дома.",
	  price: "49 €",
	  priceNote: "/ мес",
	  bullets: [
		"Видео-уроки и тренинги",
		"Полная система 10 элементов",
		"Еженедельные онлайн-встречи с Ицхаком",
		"Личный саппорт кураторов",
		"Сообщество осознанных людей",
	  ],
	  cta: "Войти в клуб",
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