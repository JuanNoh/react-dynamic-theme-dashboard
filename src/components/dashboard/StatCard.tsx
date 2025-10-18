import { AnalyticsIcon } from '@/components/icons';

export default function StatCard() {
  return (
    <div className="rounded-2xl p-8 transition-all duration-300 bg-primary-100 text-primary-800">
      <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center transition-all duration-300 bg-primary-200">
        <AnalyticsIcon />
      </div>
      <h3 className="text-2xl font-bold mb-2 text-primary-900">Analiza tus Datos</h3>
      <p className="text-sm text-primary-700">
        Visualiza el rendimiento y toma mejores decisiones.
      </p>
    </div>
  );
}
