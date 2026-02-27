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
	  title: "Амбассадор счастья",
	  description:
		"Вы становитесь частью закрытого круга людей, которые не просто развиваются сами — а создают возможность восстановления для других.\nВаш вклад финансирует бесплатный доступ к системе «Архитектура счастья» для людей, переживающих болезнь, утрату и кризис.",
	  mobileDescription:
		"Поддержите инициативу и создайте возможность восстановления для других.\nВаш вклад финансирует бесплатный доступ для людей в кризисе.",
	  price: "Любая сумма",
	  bullets: [
		"Финансирование бесплатного доступа к системе",
		"Поддержка людей в кризисе",
		"Углубление собственного ощущения смысла и влияния",
	  ],
	  longDescription:
		"Это уровень выше обычного участия. Это позиция.\n\nЛюди, которые поддерживают других, усиливают собственное ощущение смысла, влияния и внутреннего достоинства.\nСчастье углубляется, когда им делятся.",
	  cta: "Стать Амбассадором",
	  variant: "yellow" as const,
	  badge: "Благотворительность",
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

	  {/* МОДАЛКА "Узнать больше" */}
	  <BulletsModal
		open={detailsOpen}
		onClose={() => setDetailsOpen(false)}
		offer={offer}
		onJoinClub={() => {}}
	  />

	  {/* МОДАЛКА ОПЛАТЫ */}
	  <LeadFormModal
		open={leadOpen}
		onClose={() => setLeadOpen(false)}
		offer={offer}
	  />

	  <Footer />
	</>
  );
}