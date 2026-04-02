# Changelog

All notable changes to the Kymatics stack release will be documented in this file.

## [Unreleased]

### Added
- Persistent runtime app registry (workspace + job runtime instances) and shutdown-all endpoint for clean runtime shutdown.
- Self-contained project guardrails for runtime `working_directory` and job `project_path`; workspace root marker file for safe cleanup defaults.

## [1.0.0] - 2026-04-01

### Added
- Stack-wide voice-to-app workflow spanning Seal (frontend), Otter (orchestration), and Lavoix (speech).
- Release branch + version bump automation scaffolding for coordinated releases.

### Changed
- Formalized initial release process and changelog conventions across repositories.
