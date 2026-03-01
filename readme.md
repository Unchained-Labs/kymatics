# Kymatics

**Kymatics** is a generative engine that treats the human voice as a physical force. It uses the resonance of spoken intent to organize digital chaos into structured form, allowing creators to literally sound their ideas into reality.

Kymatics is an intelligent synthesis engine that transforms spoken intent into immediate digital structures—letting creators manifest complex interfaces at the speed of conversation, directly from a smartphone.

## Repository structure

| Directory   | Description |
|------------|-------------|
| **otter**  | Rust backend: queue and orchestration. |
| **seal**   | React frontend: Builder Board UI for Otter (voice input, Kanban, job control). |
| **landing**| Marketing landing page (React + Tailwind) presenting Kymatics and its features. |

## Tech stack

- **otter**: Rust (stable).
- **seal** / **landing**: Node.js 22+, React 18, TypeScript, Vite, Tailwind CSS.

## Prerequisites

- **Node.js** 22+
- **Rust** (stable toolchain)
- **Python** 3.x (for pre-commit)

## Quick start

```bash
# Otter (backend)
cd otter && cargo run

# Seal (Builder Board)
cd seal && npm install && npm run dev

# Landing (marketing site)
cd landing && npm install && npm run dev
```

## Development

- Use the **root** [.pre-commit-config.yaml](.pre-commit-config.yaml): run `pre-commit run --all-files` before committing.
- Prefer **granular commits**; each commit should pass pre-commit checks.
