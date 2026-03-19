# Repository Guidelines

## General Instructions

- Always run `bun run lint` after making any changes => fix any linting errors you get
- Always check for type errors via `bun tsc --noEmit`
- Always run `bun run format` AFTER you are done with your task and you edited all files that needed editing

## Project Structure & Module Organization

- App code lives in `app/` using Next.js App Router route groups.
- Route groups are organized by concern:
  - `app/(auth)/` for sign-in/sign-up pages.
  - `app/(notes)/` for note flows (`/notes`, `/notes/new`, `/notes/[noteId]`).
  - `app/(public)/` for shared/public routes (`/share/[token]`).
- Global shell files are `app/layout.tsx`, `app/not-found.tsx`, and `app/globals.css`.
- Static assets belong in `public/`.
- Product and scope context is documented in `SPEC.MD`.

## Build, Test, and Development Commands

- `bun dev`: Start local dev server at `http://localhost:3000`.
- `bun run build`: Build production bundle.
- `bun run start`: Run the production build locally.
- `bun run lint`: Run `oxlint` for fast lint checks.
- `bun run format`: Run `oxfmt` to format code.

## Coding Style & Naming Conventions

- Language stack: TypeScript + React function components.
- Use 2-space indentation and double quotes (as used across `app/*.tsx`).
- Name route files per Next.js conventions: `page.tsx`, `layout.tsx`, `not-found.tsx`.
- Use PascalCase for component names (example: `HomePage`, `RootLayout`).
- Keep styles in Tailwind utility classes; define design tokens in `app/globals.css` when global reuse is needed.
- Run `bun run format && bun run lint` before opening a PR.

## Commit & Pull Request Guidelines

- Current commit history uses short, imperative summaries (example: `SPEC.MD is modified`).
- Prefer format: `<area>: <imperative change>` (example: `notes: add note detail scaffold`).
- Keep commits focused to a single concern.
- PRs should include:
  - Clear description of behavior changes.
  - Linked issue/spec section when applicable.
  - Screenshots for UI updates across desktop/mobile.
  - Verification notes listing commands run.

## Agent-Specific Instructions

- Prioritize clean architecture over quick patches.
- Evaluate at least one alternative approach before implementing larger refactors.
- Avoid rushed changes; keep modules cohesive and easy to extend.
