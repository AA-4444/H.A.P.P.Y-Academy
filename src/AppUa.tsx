import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UaIndex from "./pages/ua/Index";
import UaProgramsOnlyPage from "./pages/ua/ProgramsOnlyPage";
import UaClubPage from "./pages/ua/ClubPage";
import UaReviewPage from "./pages/ua/ReviewPage";
import UaPrivacyPage from "./pages/ua/PrivacyPage";
import UaTermsPage from "./pages/ua/TermsPage";
import UaRefundPage from "./pages/ua/RefundPage";
import UaAmbassadorPage from "./pages/ua/AmbassadorPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppUa = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/ua">
        <Routes>
          <Route path="/" element={<UaIndex />} />
          <Route path="/programs" element={<UaProgramsOnlyPage />} />
          <Route path="/club" element={<UaClubPage />} />
          <Route path="/review" element={<UaReviewPage />} />
          <Route path="/privacy" element={<UaPrivacyPage />} />
          <Route path="/terms" element={<UaTermsPage />} />
          <Route path="/refund" element={<UaRefundPage />} />
          <Route path="/ambassador" element={<UaAmbassadorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default AppUa;