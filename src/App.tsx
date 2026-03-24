import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProgramsOnlyPage from "./pages/ProgramsOnlyPage";
import ClubPage from "./pages/ClubPage";
import ReviewPage from "./pages/ReviewPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import RefundPage from "./pages/RefundPage";
import AmbassadorPage from "./pages/AmbassadorPage";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PaymentSuccess from "./pages/payment/success";
import PaymentCancel from "./pages/payment/cancel";
import AmbassadorSuccess from "./pages/payment/AmbassadorSuccess";

// UA
import UaIndex from "./pages/ua/Index";
import UaProgramsOnlyPage from "./pages/ua/ProgramsOnlyPage";
import UaClubPage from "./pages/ua/ClubPage";
import UaReviewPage from "./pages/ua/ReviewPage";
import UaPrivacyPage from "./pages/ua/PrivacyPage";
import UaTermsPage from "./pages/ua/TermsPage";
import UaRefundPage from "./pages/ua/RefundPage";
import UaAmbassadorPage from "./pages/ua/AmbassadorPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* RU */}
          <Route path="/" element={<Index />} />
          <Route path="/programs" element={<ProgramsOnlyPage />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
          <Route path="/club" element={<ClubPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route path="/payment/ambassador-success" element={<AmbassadorSuccess />} />
          <Route path="/ambassador" element={<AmbassadorPage />} />

          {/* UA */}
          <Route path="/ua" element={<UaIndex />} />
          <Route path="/ua/programs" element={<UaProgramsOnlyPage />} />
          <Route path="/ua/club" element={<UaClubPage />} />
          <Route path="/ua/review" element={<UaReviewPage />} />
          <Route path="/ua/privacy" element={<UaPrivacyPage />} />
          <Route path="/ua/terms" element={<UaTermsPage />} />
          <Route path="/ua/refund" element={<UaRefundPage />} />
          <Route path="/ua/ambassador" element={<UaAmbassadorPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;