import { LogoIcon } from "./components/LogoIcon";

export default function App() {
  return (
    <main className="min-h-screen bg-[var(--kymatics-bg)] text-kymatics-cream antialiased bg-mesh">
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <header className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Subtle gradient orbs */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-kymatics-mint/10 blur-3xl" />
        <div className="absolute right-1/4 top-1/2 h-80 w-80 rounded-full bg-kymatics-purple/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center gap-6">
          <LogoIcon
            width={320}
            height={220}
            className="h-auto w-full max-w-[280px] drop-shadow-[0_0_40px_rgba(200,247,193,0.15)] sm:max-w-[320px]"
          />
          <h1 className="font-display text-3xl font-semibold tracking-tight text-kymatics-cream sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-kymatics-mint glow-text-mint">Voice</span>
            {" "}
            as a physical force
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-kymatics-muted sm:text-xl">
            Sound your ideas into reality. Kymatics turns spoken intent into
            immediate digital structures—manifest complex interfaces at the
            speed of conversation, directly from your smartphone.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full border border-kymatics-mint/30 bg-kymatics-mint/5 px-4 py-2 text-sm font-medium text-kymatics-mint">
            Voice-first
          </span>
          <span className="rounded-full border border-kymatics-purple/30 bg-kymatics-purple/5 px-4 py-2 text-sm font-medium text-kymatics-purple">
            Real-time
          </span>
        </div>
      </div>
    </header>
  );
}

function Features() {
  const features = [
    {
      title: "Voice as force",
      description:
        "The human voice drives the engine. Speak your intent; the system responds with structure, not just transcription.",
      accent: "mint"
    },
    {
      title: "Resonance & structure",
      description:
        "Spoken intent organizes digital chaos. Resonance shapes raw input into clear, usable form.",
      accent: "purple"
    },
    {
      title: "Speed of conversation",
      description:
        "No lag between thought and output. Create and refine interfaces in real time, as you talk.",
      accent: "mint"
    },
    {
      title: "From your smartphone",
      description:
        "Full power in your pocket. Capture and manifest ideas wherever you are, without a desktop setup.",
      accent: "purple"
    }
  ];

  return (
    <section className="relative border-t border-kymatics-purple/20 bg-[var(--kymatics-surface)]/80 px-6 py-24 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display mb-14 text-center text-2xl font-semibold tracking-tight text-kymatics-cream sm:text-3xl">
          How it works
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <li
              key={f.title}
              className={`rounded-2xl border bg-[var(--kymatics-surface-elevated)] p-6 transition-all duration-300 hover:shadow-lg ${
                f.accent === "mint"
                  ? "border-kymatics-mint/25 shadow-glow-mint hover:border-kymatics-mint/50 hover:shadow-glow-mint"
                  : "border-kymatics-purple/25 shadow-glow-purple hover:border-kymatics-purple/50 hover:shadow-glow-purple"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  f.accent === "mint"
                    ? "text-kymatics-mint"
                    : "text-kymatics-purple"
                }`}
              >
                {f.title}
              </h3>
              <p className="mt-3 text-kymatics-muted">{f.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-kymatics-purple/20 bg-[var(--kymatics-surface)] px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="font-display font-semibold tracking-wide text-kymatics-mint">
          Kymatics
        </span>
        <p className="text-sm text-kymatics-muted">
          Generative engine for voice-driven creation.
        </p>
      </div>
    </footer>
  );
}
