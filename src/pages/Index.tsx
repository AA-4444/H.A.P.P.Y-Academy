import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Pillars from "@/components/landing/Pillars";
import Testimonials from "@/components/landing/Testimonials";
import About from "@/components/landing/About";
import Stats from "@/components/landing/Stats";
import Programs from "@/components/landing/Programs";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import HappyAcademySection from "@/components/landing/HappyAcademySection";
import TechnologySection from "@/components/landing/TechnologySection";

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <HappyAcademySection />
      <TechnologySection />
        <About />
          <Testimonials />
     
     
    
     
      <Programs />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
