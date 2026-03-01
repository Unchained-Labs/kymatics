import { LogoIcon } from "./components/LogoIcon";

export default function App() {
  return (
    <main className="min-h-screen bg-kymatics-bg text-kymatics-cream antialiased">
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24">
      <div className="flex flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center gap-6">
          <LogoIcon
            width={900}
            height={625}
            className="h-auto w-full max-w-[640px] sm:max-w-[760px] md:max-w-[900px]"
          />
          <h1 className="font-display text-3xl font-semibold tracking-tight text-kymatics-cream sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-kymatics-mint glow-text-mint">Voice</span>
            {" "}
            as a physical force
          </h1>
          <p className="font-display mx-auto max-w-2xl text-xl leading-relaxed text-kymatics-muted sm:text-2xl">
            Sound your ideas into reality.
            <br />
            Kymatics turns spoken intent into immediate digital
            structures. Manifest complex interfaces at the speed of conversation,
            directly from your smartphone.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 font-display">
          <span className="rounded-full border border-kymatics-mint/30 bg-kymatics-mint/5 px-6 py-3 text-lg font-medium text-kymatics-mint">
            Voice-first
          </span>
          <span className="rounded-full border border-kymatics-lavender/30 bg-kymatics-lavender/5 px-6 py-3 text-lg font-medium text-kymatics-lavender">
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
        "The human voice drives the engine.\n Speak your intent: the system responds with structure, not just transcription.",
      accent: "mint"
    },
    {
      title: "Resonance & structure",
      description:
        "Spoken intent organizes digital chaos.\n Resonance shapes raw input into clear, usable form.",
      accent: "lavender"
    },
    {
      title: "Speed of conversation",
      description:
        "No lag between thought and output.\n Create and refine interfaces in real time, as you talk.",
      accent: "lavender"
    },
    {
      title: "From your smartphone",
      description:
        "Full power in your pocket.\n Capture and manifest ideas wherever you are, without a desktop setup.",
      accent: "mint"
    }
  ];

  return (
    <section className="relative border-t border-kymatics-lavender/20 bg-kymatics-surface/90 px-6 py-24 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display mb-14 text-center text-3xl font-semibold tracking-tight text-kymatics-cream sm:text-4xl">
          How it works
        </h2>
        <ul className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <li
              key={f.title}
              className={`rounded-2xl border bg-kymatics-surface-elevated p-6 text-center transition-all duration-300 hover:shadow-lg ${
                f.accent === "mint"
                  ? "border-kymatics-mint/25 shadow-glow-mint hover:border-kymatics-mint/50 hover:shadow-glow-mint"
                  : f.accent === "lavender"
                    ? "border-kymatics-lavender/25 shadow-glow-lavender hover:border-kymatics-lavender/50 hover:shadow-glow-lavender"
                    : "border-kymatics-purple/25 shadow-glow-purple hover:border-kymatics-purple/50 hover:shadow-glow-purple"
              }`}
            >
              <h3
                className={`font-display text-xl font-semibold sm:text-2xl ${
                  f.accent === "mint"
                    ? "text-kymatics-mint"
                    : f.accent === "lavender"
                      ? "text-kymatics-lavender"
                      : "text-kymatics-purple"
                }`}
              >
                {f.title}
              </h3>
              <p className="font-display mt-3 text-lg text-kymatics-muted">{f.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-kymatics-lavender/20 bg-kymatics-surface px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row sm:flex-wrap">
        <span className="font-display text-lg font-semibold tracking-wide text-kymatics-mint">
          Kymatics
        </span>
        <p className="font-display text-base text-kymatics-muted">
          Generative engine for voice-driven creation. A project of{" "}
          <a
            href="https://www.unchainlabs.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-kymatics-mint underline decoration-kymatics-mint/50 underline-offset-2 hover:decoration-kymatics-mint"
          >
            Unchained Labs
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
