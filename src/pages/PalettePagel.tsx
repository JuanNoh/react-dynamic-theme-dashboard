import AppLayout from '@/components/layout/AppLayout';
import ColorPicker from '@/components/palette/ColorPicker';
import SwatchGrid from '@/components/palette/SwatchGrid';
import VariablesPreview from '@/components/palette/VariablesPreview';
import StatCard from '@/components/dashboard/StatCard';

export default function PalettePage() {
  return (
    <AppLayout>
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Generador de Paleta Dinámica
        </h1>
        <p className="mt-2 text-slate-600">Selecciona un color base.</p>
      </header>
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10 space-y-6">
        <ColorPicker />
        <SwatchGrid />
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-5">Ejemplos de UI</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard />
        </div>
      </section>
      <VariablesPreview />
    </AppLayout>
  );
}
