import Header from "@/components/ua/Header";
import Hero from "@/components/ua/Hero";
import Pillars from "@/components/ua/Pillars";
import Testimonials from "@/components/ua/Testimonials";
import About from "@/components/ua/About";
import Stats from "@/components/ua/Stats";
import Programs from "@/components/ua/Programs";
import CTA from "@/components/ua/CTA";
import Footer from "@/components/ua/Footer";
import HappyAcademySection from "@/components/ua/HappyAcademySection";
import TechnologySection from "@/components/ua/TechnologySection";
import InsideSystem from "@/components/ua/InsideSystem";
import ParticipationFormat from "@/components/ua/ParticipationFormat";
import QuickReviews from "@/components/ua/QuickReviews";
import MillionImpactSection from "@/components/ua/MillionImpactSection";
import ArchitectureSection from "@/components/ua/ArchitectureSection";
import QuizSection from "@/components/ua/QuizSection";

const Index = () => {
  return (
    <main>
      <Header />
      <Hero />
      <QuizSection />
      <HappyAcademySection />
      <ArchitectureSection />

      {/* <TechnologySection /> */}
      <About />
      <Pillars />
      <MillionImpactSection />
      <QuickReviews />
      <ParticipationFormat />

      <Programs />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;