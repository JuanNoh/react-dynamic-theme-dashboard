import chroma from 'chroma-js';

export function textClassFor(bgHex: string | undefined) {
  if (!bgHex) return 'text-white';
  return chroma(bgHex).luminance() > 0.4 ? 'text-slate-900' : 'text-white';
}
