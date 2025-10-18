import PalettePage from '@/pages/PalettePagel.tsx';
import { PaletteProvider } from '@/context/PaletteProvider.tsx';

export default function PaletteGenerator() {
  return (
    <PaletteProvider>
      <PalettePage />
    </PaletteProvider>
  );
}
