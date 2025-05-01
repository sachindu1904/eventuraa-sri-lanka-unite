
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import EventPage from "./pages/EventPage";
import NightlifePage from "./pages/NightlifePage";
import NightlifeDetail from "./pages/NightlifeDetail";
import HotelListPage from "./pages/HotelListPage";
import HotelDetailPage from "./pages/HotelDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/nightlife" element={<NightlifePage />} />
          <Route path="/nightlife/:venueId" element={<NightlifeDetail />} />
          <Route path="/hotels" element={<HotelListPage />} />
          <Route path="/hotels/:hotelId" element={<HotelDetailPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
