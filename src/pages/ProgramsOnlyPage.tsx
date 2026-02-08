import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import Programs from "@/components/landing/Programs";

export default function ProgramsOnlyPage() {
  return (
	<div className="min-h-screen bg-[#F6F1E7] flex flex-col">
	  <Header />
	  <main className="flex-1">
		<Programs />
	  </main>
	  <Footer />
	</div>
  );
}