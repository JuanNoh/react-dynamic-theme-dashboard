import { BrowserRouter, Routes, Route } from "react-router-dom";
import PalettePage from "@/pages/PalettePage.tsx";
import PrivacyPage from "@/pages/PrivacyPage.tsx";
import TermsPage from "@/pages/TermsPage.tsx";
import { PaletteProvider } from "@/context/PaletteProvider.tsx";
import ScrollToTop from "./components/layout/ScrollToTop";

export default function PaletteGenerator() {
  return (
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
  );
}
