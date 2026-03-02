import { LogoIcon } from "./components/LogoIcon";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.46-1.17-1.11-1.48-1.11-1.48-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.9.82.09-.65.35-1.08.64-1.33-2.22-.25-4.56-1.1-4.56-4.9 0-1.09.4-1.98 1.03-2.67-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.7 9.7 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.69 1.02 1.58 1.02 2.67 0 3.8-2.34 4.65-4.57 4.89.36.3.68.9.68 1.82v2.7c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

function DocsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M6 3h8.5L19 7.5V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 1.5V8h3.5L14 4.5ZM8 11h8v1.5H8V11Zm0 3h8v1.5H8V14Zm0 3h6v1.5H8V17Z"
      />
    </svg>
  );
}

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
      docs: "https://seal-nine-sigma.vercel.app",
      accent: "mint"
    },
    {
      name: "otter",
      title: "Orchestration engine",
      description:
        "Rust service and library that queues jobs, runs Mistral Vibe in isolated workspaces, and streams runtime events.",
      repo: "https://github.com/Unchained-Labs/otter",
      docs: "https://otter-psi.vercel.app",
      accent: "lavender"
    },
    {
      name: "lavoix",
      title: "Speech services",
      description:
        "Python library + FastAPI service for STT/TTS workflows, Voxtral-first with provider abstractions and API clients.",
      repo: "https://github.com/Unchained-Labs/lavoix",
      docs: "https://lavoix.vercel.app",
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
              <div className="mt-5 flex items-center gap-4">
                <a
                  href={module.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-kymatics-lavender/30 px-3 py-1.5 text-sm text-kymatics-lavender transition-colors hover:border-kymatics-lavender hover:text-kymatics-cream"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={module.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-kymatics-mint/30 px-3 py-1.5 text-sm text-kymatics-mint transition-colors hover:border-kymatics-mint hover:text-kymatics-cream"
                >
                  <DocsIcon className="h-4 w-4" />
                  Docs
                </a>
              </div>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-12 max-w-3xl">
          <h3 className="font-display mb-3 text-center text-xl font-semibold text-kymatics-cream sm:text-2xl">
            Live demo
          </h3>
          <div className="overflow-hidden rounded-xl border border-kymatics-lavender/30 bg-kymatics-surface-elevated">
            <iframe
              className="aspect-video w-full"
              src="https://www.youtube.com/embed/u1Y2QUWuG6k"
              title="Kymatics demo video"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
