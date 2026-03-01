import { KymaticsLogo } from "./components/KymaticsLogo";

export default function App() {
  return (
    <main className="min-h-screen bg-kymatics-dark text-kymatics-cream antialiased">
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}

function Hero() {
  return (
    <header className="relative flex min-h-[90vh] flex-col items-center justify-center px-6 py-20">
      <div className="flex flex-col items-center gap-8 text-center">
        <KymaticsLogo
          width={280}
          height={200}
          className="h-auto w-full max-w-[280px] shrink-0"
        />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight text-kymatics-cream sm:text-4xl md:text-5xl">
            Voice as a physical force
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-kymatics-muted sm:text-xl">
            Sound your ideas into reality. Kymatics turns spoken intent into
            immediate digital structures—manifest complex interfaces at the
            speed of conversation, directly from your smartphone.
          </p>
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
        "The human voice drives the engine. Speak your intent; the system responds with structure, not just transcription."
    },
    {
      title: "Resonance & structure",
      description:
        "Spoken intent organizes digital chaos. Resonance shapes raw input into clear, usable form."
    },
    {
      title: "Speed of conversation",
      description:
        "No lag between thought and output. Create and refine interfaces in real time, as you talk."
    },
    {
      title: "From your smartphone",
      description:
        "Full power in your pocket. Capture and manifest ideas wherever you are, without a desktop setup."
    }
  ];

  return (
    <section className="border-t border-kymatics-rose/20 bg-kymatics-dark/80 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight text-kymatics-cream sm:text-3xl">
          How it works
        </h2>
        <ul className="grid gap-8 sm:grid-cols-2">
          {features.map((f) => (
            <li
              key={f.title}
              className="rounded-2xl border border-kymatics-rose/30 bg-kymatics-dark p-6 transition-colors hover:border-kymatics-purple/40"
            >
              <h3 className="text-lg font-semibold text-kymatics-mint">
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
    <footer className="border-t border-kymatics-rose/20 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="font-semibold tracking-wide text-kymatics-cream">
          Kymatics
        </span>
        <p className="text-sm text-kymatics-muted">
          Generative engine for voice-driven creation.
        </p>
      </div>
    </footer>
  );
}
