import { usePalette } from '@/context/usePalette';
import { textClassFor } from '@/hooks/useContrastClass';
import { AnalyticsIcon } from '@/components/icons';

export default function Sidebar() {
  const { palette } = usePalette();
  const sidebarText = textClassFor(palette['950']);

  return (
    <aside
      className={`hidden md:flex flex-col w-64 transition-all duration-300 bg-primary-950 ${sidebarText}`}
    >
      <div className="flex items-center justify-center h-20 border-b border-primary-900">
        <h1 className="ml-3 text-2xl font-bold">Dynamic Dashboard</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <a
          className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 bg-primary-800 ${sidebarText}`}
        >
          <AnalyticsIcon />
          <span className="ml-4 font-medium">Dashboard</span>
        </a>
      </nav>
    </aside>
  );
}
