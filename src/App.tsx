import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "motion/react";
import PalettePage from "@/pages/PalettePage.tsx";
import PrivacyPage from "@/pages/PrivacyPage.tsx";
import TermsPage from "@/pages/TermsPage.tsx";
import { PaletteProvider } from "@/context/PaletteProvider.tsx";
import ScrollToTop from "./components/layout/ScrollToTop";
import AppToaster from "@/components/ui/AppToaster";

export default function PaletteGenerator() {
  return (
    // reducedMotion "user": si el sistema pide reducir movimiento, Motion apaga
    // los desplazamientos y deja sólo los cambios de color/opacidad
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <PaletteProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<PalettePage />} />
            <Route path="/privacidad" element={<PrivacyPage />} />
            <Route path="/terminos" element={<TermsPage />} />
          </Routes>
        </PaletteProvider>
      </BrowserRouter>
      <AppToaster />
    </MotionConfig>
  );
}
