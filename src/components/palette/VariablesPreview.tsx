import { useMemo } from 'react';
import { usePalette } from '@/context/usePalette';
import { toThemeBlock } from '@/lib/themeVars';

export default function VariablesPreview() {
  const { palette } = usePalette();
  const block = useMemo(() => toThemeBlock(palette), [palette]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-5">Variables CSS Generadas</h2>
      <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
        <pre className="text-sm text-slate-200">
          <code className="language-css">{block}</code>
        </pre>
      </div>
    </div>
  );
}
