export default function BackgroundEffects() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0 hidden bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-20 mix-blend-overlay brightness-100 contrast-150 dark:block"></div>
      <div className="animate-pulse-slow pointer-events-none absolute top-[-10%] left-[-10%] hidden h-[40%] w-[40%] rounded-full bg-cyan-500/20 mix-blend-screen blur-[120px] dark:block"></div>
      <div className="pointer-events-none absolute top-[20%] right-[-5%] hidden h-[30%] w-[30%] rounded-full bg-violet-500/20 mix-blend-screen blur-[100px] dark:block"></div>
      <div className="pointer-events-none absolute bottom-[-10%] left-[20%] hidden h-[35%] w-[35%] rounded-full bg-fuchsia-500/10 mix-blend-screen blur-[120px] dark:block"></div>
    </>
  );
}
