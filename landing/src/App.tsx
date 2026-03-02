import { LogoIcon } from "./components/LogoIcon";

export default function App() {
  return (
    <main className="min-h-screen bg-kymatics-bg text-kymatics-cream antialiased">
      <Hero />
      <Features />
      <Stack />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24">
      <div className="flex flex-col items-center gap-12 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <LogoIcon
              width={900}
              height={625}
              className="h-auto w-full max-w-[640px] sm:max-w-[760px] md:max-w-[900px]"
            />
            <a
              href={import.meta.env.VITE_START_NOW_URL ?? "http://localhost:3000/"}
              className="font-display inline-flex items-center justify-center rounded-lg border-2 border-kymatics-mint bg-kymatics-mint/10 px-8 py-3 text-lg font-semibold tracking-wide text-kymatics-mint transition-colors hover:bg-kymatics-mint/20"
            >
              START NOW
            </a>
          </div>
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
        <p className="font-display mt-10 text-center text-sm text-kymatics-muted">
          This app works best with Voxtral for voice-to-text and Mistral Vibe, based on Mistral Large 3, for code assistant, but any model can be plugged in.{" "}
          <a
            href="https://mistral.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-kymatics-mint underline decoration-kymatics-mint underline-offset-2 hover:text-kymatics-cream hover:decoration-kymatics-cream"
          >
            <img
              src="https://mistral.ai/favicon.ico"
              alt=""
              width={16}
              height={16}
              className="inline-block"
            />
            Mistral AI
          </a>
        </p>
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

function Stack() {
  const modules = [
    {
      name: "seal",
      title: "Voice-first frontend",
      description:
        "React + TypeScript UI for fast voice prompt capture, live execution feedback, and queue control.",
      repo: "https://github.com/Unchained-Labs/seal",
      accent: "mint"
    },
    {
      name: "otter",
      title: "Orchestration engine",
      description:
        "Rust service and library that queues jobs, runs Mistral Vibe in isolated workspaces, and streams runtime events.",
      repo: "https://github.com/Unchained-Labs/otter",
      accent: "lavender"
    },
    {
      name: "lavoix",
      title: "Speech services",
      description:
        "Python library + FastAPI service for STT/TTS workflows, Voxtral-first with provider abstractions and API clients.",
      repo: "https://github.com/Unchained-Labs/lavoix",
      accent: "mint"
    }
  ];

  return (
    <section className="border-t border-kymatics-lavender/20 bg-kymatics-bg px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display mb-4 text-center text-3xl font-semibold tracking-tight text-kymatics-cream sm:text-4xl">
          The stack
        </h2>
        <p className="font-display mx-auto mb-12 max-w-3xl text-center text-lg text-kymatics-muted">
          Kymatics is built as composable voice-native modules, each focused on one layer of the
          product pipeline.
        </p>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {modules.map((module) => (
            <li
              key={module.name}
              className={`rounded-2xl border bg-kymatics-surface-elevated p-6 transition-all duration-300 hover:shadow-lg ${
                module.accent === "mint"
                  ? "border-kymatics-mint/25 shadow-glow-mint hover:border-kymatics-mint/50 hover:shadow-glow-mint"
                  : "border-kymatics-lavender/25 shadow-glow-lavender hover:border-kymatics-lavender/50 hover:shadow-glow-lavender"
              }`}
            >
              <p
                className={`font-display text-xs font-semibold uppercase tracking-[0.2em] ${
                  module.accent === "mint" ? "text-kymatics-mint" : "text-kymatics-lavender"
                }`}
              >
                {module.name}
              </p>
              <h3 className="font-display mt-2 text-2xl font-semibold text-kymatics-cream">
                {module.title}
              </h3>
              <p className="font-display mt-3 min-h-24 text-base leading-relaxed text-kymatics-muted">
                {module.description}
              </p>
              <a
                href={module.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display mt-5 inline-flex items-center text-sm font-medium text-kymatics-mint underline decoration-kymatics-mint/60 underline-offset-4 hover:text-kymatics-cream hover:decoration-kymatics-cream"
              >
                GitHub repository
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
