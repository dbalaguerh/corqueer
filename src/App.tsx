import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Calendari from "./pages/Calendari";
import Repertori from "./pages/Repertori";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";
import Onboarding from "./components/Onboarding";
import { useProfile } from "./hooks/useProfile";

const queryClient = new QueryClient();

const AppContent = () => {
  const { needsOnboarding, saveProfile } = useProfile();

  return (
    <>
      {needsOnboarding && (
        <Onboarding onComplete={(data) => saveProfile(data)} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendari" element={<Calendari />} />
        <Route path="/repertori" element={<Repertori />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
