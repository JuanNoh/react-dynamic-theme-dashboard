import { usePalette } from '@/context/usePalette';
import { textClassFor } from '@/hooks/useContrastClass';

export default function Header() {
  const { palette } = usePalette();
  const avatarText = textClassFor(palette['500']);

  return (
    <header className="h-20 bg-white flex items-center justify-between px-6 border-b border-slate-200">
      <div className="md:hidden" />
      <div className="text-xl font-semibold text-slate-700">Dashboard</div>
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-primary-500 ${avatarText}`}
      >
        JN
      </div>
    </header>
  );
}
