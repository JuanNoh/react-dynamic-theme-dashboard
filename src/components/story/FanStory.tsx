import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import BrandSearch from "@/components/story/BrandSearch";
import { usePalette } from "@/context/usePalette";
import { getTintedText } from "@/lib/contrast";
import { SHADE_KEYS } from "@/types/palette";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ease = (value: number) => value * value * (3 - 2 * value);

const SPREAD_START = -42;
const SPREAD_STEP = 8.4;

// El hero del sitio: la paleta como abanico de muestras. Al bajar, el abanico se
// cierra, se va al centro y se abre en fila hasta volverse la escala. La escena
// se queda fija mientras tanto; el scroll sólo mueve variables CSS (ver .historia
// en index.css), así que aquí no se repinta React en cada cuadro.
export default function FanStory() {
  const { palette, baseShade } = usePalette();
  const storyRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const story = storyRef.current;
    if (!story || reduceMotion) return;
    if (window.matchMedia("(max-height: 560px)").matches) return;

    const span = (from: number, to: number) =>
      ease(clamp((progress - from) / (to - from)));
    const set = (name: string, value: number) =>
      story.style.setProperty(name, value.toFixed(4));

    const text = 1 - span(0.04, 0.22);
    set("--texto", text);
    set("--cierre", span(0.06, 0.4));
    set("--mover", span(0.1, 0.4));
    set("--medio", span(0.36, 0.44) * (1 - span(0.56, 0.62)));
    set("--fila", span(0.6, 0.92));
    set("--titulo", span(0.74, 0.92));
    story.dataset.fase = text < 0.05 ? "fuera" : "dentro";
  });

  return (
    <section
      ref={storyRef}
      className="historia"
      aria-label="Tu paleta, del abanico a la escala"
    >
      <div className="escenario">
        <div className="guion">
          <p className="opcional text-soft text-[15px]">
            Generador de paletas de color · Gratis y sin cuenta
          </p>
          <h1 className="text-[clamp(2.6rem,5.6vw,5.1rem)] leading-[0.98] font-bold tracking-[-0.03em] text-balance">
            Describe tu marca. Te damos sus colores.
          </h1>
          <p className="opcional text-soft text-lg leading-normal text-pretty">
            O escoge un color tú. Abrimos el abanico completo, con su contraste
            medido y listo para tu código.
          </p>

          <BrandSearch />

          <a
            href="#sistema"
            className="opcional text-soft hover:text-ink flex min-h-11 items-center gap-2 self-start text-sm transition-colors"
          >
            Baja para ver cómo se arma
            <ArrowDown className="h-4 w-4" strokeWidth={1.75} />
          </a>
        </div>

        <p className="medio">Todo sale de un solo color.</p>

        <div className="titulo2">
          <h2 className="text-[clamp(2rem,4.4vw,3.6rem)] leading-none font-bold tracking-[-0.03em]">
            Tu sistema de color
          </h2>
          <p className="text-soft mt-2.5 text-lg">
            Once tonos, del 50 al 950. Tu color se queda intacto.
          </p>
        </div>

        <div className="aspas" aria-hidden="true">
          {SHADE_KEYS.map((key, index) => {
            const isBase = key === baseShade;
            const text = getTintedText(palette[key], palette);
            return (
              <div
                key={key}
                className="aspa"
                style={
                  {
                    "--a": SPREAD_START + index * SPREAD_STEP,
                    "--i": index - 5,
                    "--sale": isBase ? 1 : 0,
                    zIndex: isBase ? 20 : index + 1,
                    backgroundColor: palette[key],
                    color: text.color,
                    transition: `background-color .45s ease ${index * 28}ms, color .45s ease ${index * 28}ms`,
                  } as React.CSSProperties
                }
              >
                <div className="txt flex flex-col gap-0.5">
                  <span className="text-xl font-semibold tracking-tight">
                    {key}
                  </span>
                  <span className="font-mono text-xs uppercase">
                    {palette[key].slice(1)}
                  </span>
                  {isBase && (
                    <span className="mt-1.5 text-[13px] font-semibold">
                      Tu color
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          <span className="remache" />
        </div>
      </div>
    </section>
  );
}
