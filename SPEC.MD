# TinyNotes — Product & Technical Specification

## 1. Overview

TinyNotes is a simple demo note-taking web application built with **Bun + TypeScript + Next.js**. Authenticated users can create, view, edit, delete, and publicly share rich-text notes. Unauthenticated users can open a public share link and read the shared note without logging in.

This app is intentionally lightweight and uses:

- **TailwindCSS** for styling, with an elegant **acqua** visual theme
- **TipTap** for rich-text editing
- **better-auth** for email/password authentication only
- **SQLite** via **Bun’s built-in SQLite client**
- **raw SQL** plus a custom migrations script

No file uploads, no embedded images, no email sending, no password reset flow, and no email confirmation flow are included.

---

## 2. Goals

- Provide a minimal but complete authenticated notes app
- Support rich-text notes stored as JSON and rendered as HTML
- Allow public sharing via revocable links
- Keep architecture simple and easy for a team to build and review
- Demonstrate clear ownership, authorization, validation, migration, and error-handling patterns

## 3. Non-goals

- Realtime collaboration
- Folder/tag organization
- Search indexing
- Version history
- Password reset
- Email verification flow
- Attachments, images, or file storage
- Multiple auth providers / OAuth / SSO
- Granular sharing permissions beyond public read-only link sharing
- Offline sync
- Settings page (`/settings` must not exist)

---

## 4. Users & Roles

### Authenticated user

Can:

- sign up with email + password
- sign in / sign out
- create notes
- view own notes list
- open note editor
- edit own notes
- delete own notes
- enable public sharing for own notes
- disable public sharing for own notes
- copy a public share link for own notes

### Unauthenticated visitor

Can:

- open a valid public share link
- read the shared note in rendered HTML form

Cannot:

- edit notes
- create notes
- access private notes

---

## 5. Core Functional Requirements

### 5.1 Authentication

- App supports **email + password only** through better-auth.
- No email confirmation is required.
- No password reset flow is required.
- No social login / OAuth providers are enabled.
- Session-based authentication is used as supported by better-auth.
- Protected routes must redirect unauthenticated users to sign-in.

### 5.2 Notes

Each authenticated user can manage only their own notes.

A note consists of:

- metadata (id, owner, timestamps, title)
- rich-text content stored as **JSON**

Capabilities:

- create a note
- list own notes
- open a note
- edit a note
- auto-save changes while editing
- delete a note

Defaults:

- note title may be empty at creation but should be normalized in UI (example: “Untitled note”)
- newly created notes are private by default

### 5.3 Rich Text

- Rich text is edited with TipTap.
- Stored format is **JSON** and is the source of truth.
- HTML is generated/rendered from the stored JSON at read time.
- Only a limited safe formatting set is supported.
- No image upload, embedding, or file attachment support.

Supported formatting scope:

- paragraphs
- headings
- bold
- italic
- underline
- bullet lists
- ordered lists
- blockquotes
- code / code block
- horizontal rule
- hard break
- links

Not in scope:

- images
- tables
- mentions
- comments
- collaborative cursors
- embeds

### 5.4 Sharing

- A note owner can enable public sharing for a note.
- Enabling sharing creates an **unguessable public token**.
- Public share link format should be token-based and not expose internal note ownership details.
- Anyone with a valid active token can view the note without authentication.
- Public access is **read-only**.
- The owner can disable sharing at any time.
- Disabling a share link must immediately revoke public access.
- Re-enabling sharing may either reuse the existing token or generate a new token; this spec chooses: **generate a new token on every enable after disable**.

---

## 6. UX & Route Structure

## Public routes

- `/sign-in`
- `/sign-up`
- `/share/[token]`
- `/: catch-all not-found handling`

## Authenticated routes

- `/` → redirect to `/notes` when signed in, else landing or sign-in
- `/notes` → notes list page
- `/notes/new` → creates note then redirects to editor, or may render empty editor shell
- `/notes/[noteId]` → note editor/view for owner

## Required pages

### Sign in page

- email field
- password field
- submit button
- link to sign up
- generic auth error message on failure

### Sign up page

- name field
- email field
- password field
- submit button
- link to sign in
- generic auth error message on failure

### Notes list page

- list of current user’s notes
- create note action
- note title
- updated-at timestamp
- share status indicator
- delete action
- sign-out action

### Note editor page

- editable title
- TipTap editor
- auto-save indicator (`Saving...`, `Saved`, `Error`)
- share toggle/action
- copy share link action when enabled
- delete action
- back to notes list action

### Shared note page

- rendered note content
- note title
- no edit controls
- no owner-only metadata beyond what is intentionally exposed

### 404 page

Custom not-found page required for:

- unknown routes
- missing note IDs for owner view
- invalid or revoked share tokens

For invalid/revoked share links, use a user-friendly not-found style response rather than revealing whether a note once existed.

---

## 7. Auto-save Behavior

- Editor changes are auto-saved after a short debounce (recommended: 500–1000 ms).
- Saves occur only for authenticated owners.
- Save requests update both title and content JSON.
- UI must indicate save state.
- Navigation away with unsaved local changes should be minimized by debounce + flush-on-unmount / route-leave where practical.
- Auto-save failures should not expose internal server details.
- Client should allow retry on the next change and may expose a generic “Could not save changes” message.

---

## 8. Authorization Rules

- Users can access only their own notes in authenticated note routes and APIs.
- Public share route can access only notes with an active share token.
- Public share route must not expose private notes.
- API responses must not reveal whether another user owns a given note.
- Unauthorized or non-existent owner note access should return a generic not-found style response where practical.

---

## 9. Data Model

The app uses SQLite.

Two schema groups exist:

1. **better-auth required tables**
2. **application-specific tables**

### 9.1 better-auth required schema

These tables must exist as required by better-auth.

#### `user`

| Column        | Type    | Constraints     | Notes                |
| ------------- | ------- | --------------- | -------------------- |
| id            | TEXT    | PRIMARY KEY     | unique user id       |
| name          | TEXT    | NOT NULL        | display name         |
| email         | TEXT    | NOT NULL UNIQUE | login email          |
| emailVerified | INTEGER | NOT NULL        | boolean as 0/1       |
| image         | TEXT    | NULL            | unused but supported |
| createdAt     | TEXT    | NOT NULL        | ISO datetime         |
| updatedAt     | TEXT    | NOT NULL        | ISO datetime         |

#### `session`

| Column    | Type | Constraints                                | Notes             |
| --------- | ---- | ------------------------------------------ | ----------------- |
| id        | TEXT | PRIMARY KEY                                | unique session id |
| userId    | TEXT | NOT NULL, FK -> user(id) ON DELETE CASCADE | owner             |
| token     | TEXT | NOT NULL UNIQUE                            | session token     |
| expiresAt | TEXT | NOT NULL                                   | ISO datetime      |
| ipAddress | TEXT | NULL                                       | optional          |
| userAgent | TEXT | NULL                                       | optional          |
| createdAt | TEXT | NOT NULL                                   | ISO datetime      |
| updatedAt | TEXT | NOT NULL                                   | ISO datetime      |

#### `account`

| Column                | Type | Constraints                                | Notes                                  |
| --------------------- | ---- | ------------------------------------------ | -------------------------------------- |
| id                    | TEXT | PRIMARY KEY                                | unique account id                      |
| userId                | TEXT | NOT NULL, FK -> user(id) ON DELETE CASCADE | owner                                  |
| accountId             | TEXT | NOT NULL                                   | credential account id                  |
| providerId            | TEXT | NOT NULL                                   | auth provider                          |
| accessToken           | TEXT | NULL                                       | optional                               |
| refreshToken          | TEXT | NULL                                       | optional                               |
| accessTokenExpiresAt  | TEXT | NULL                                       | ISO datetime                           |
| refreshTokenExpiresAt | TEXT | NULL                                       | ISO datetime                           |
| scope                 | TEXT | NULL                                       | optional                               |
| idToken               | TEXT | NULL                                       | optional                               |
| password              | TEXT | NULL                                       | hashed password field used by auth lib |
| createdAt             | TEXT | NOT NULL                                   | ISO datetime                           |
| updatedAt             | TEXT | NOT NULL                                   | ISO datetime                           |

Recommended index/constraint:

- unique index on `(providerId, accountId)`

#### `verification`

| Column     | Type | Constraints | Notes                  |
| ---------- | ---- | ----------- | ---------------------- |
| id         | TEXT | PRIMARY KEY | unique verification id |
| identifier | TEXT | NOT NULL    | target identifier      |
| value      | TEXT | NOT NULL    | value to verify        |
| expiresAt  | TEXT | NOT NULL    | ISO datetime           |
| createdAt  | TEXT | NOT NULL    | ISO datetime           |
| updatedAt  | TEXT | NOT NULL    | ISO datetime           |

### 9.2 application schema

#### `notes`

Stores the note itself.

| Column      | Type | Constraints                                | Notes                  |
| ----------- | ---- | ------------------------------------------ | ---------------------- |
| id          | TEXT | PRIMARY KEY                                | note id                |
| userId      | TEXT | NOT NULL, FK -> user(id) ON DELETE CASCADE | owner                  |
| title       | TEXT | NOT NULL DEFAULT ''                        | note title             |
| contentJson | TEXT | NOT NULL                                   | serialized TipTap JSON |
| createdAt   | TEXT | NOT NULL                                   | ISO datetime           |
| updatedAt   | TEXT | NOT NULL                                   | ISO datetime           |

Indexes:

- index on `userId`
- index on `(userId, updatedAt DESC)`

#### `note_shares`

Stores revocable public-share state separately from notes.

| Column      | Type    | Constraints                                         | Notes                     |
| ----------- | ------- | --------------------------------------------------- | ------------------------- |
| id          | TEXT    | PRIMARY KEY                                         | share row id              |
| noteId      | TEXT    | NOT NULL, UNIQUE, FK -> notes(id) ON DELETE CASCADE | one share config per note |
| publicToken | TEXT    | NOT NULL UNIQUE                                     | unguessable token         |
| isEnabled   | INTEGER | NOT NULL DEFAULT 0                                  | boolean as 0/1            |
| createdAt   | TEXT    | NOT NULL                                            | ISO datetime              |
| updatedAt   | TEXT    | NOT NULL                                            | ISO datetime              |
| disabledAt  | TEXT    | NULL                                                | ISO datetime when revoked |

Behavior:

- private note may have no `note_shares` row until first enable, or always have one. This spec chooses: **create row on first enable**.
- when share is disabled and later re-enabled, generate a **new** `publicToken`, clear `disabledAt`, set `isEnabled = 1`

Indexes:

- unique index on `publicToken`
- unique index on `noteId`
- index on `(publicToken, isEnabled)`

---

## 10. SQL Schema Reference

Representative SQLite DDL:

```sql
CREATE TABLE user (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  emailVerified INTEGER NOT NULL,
  image TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE TABLE session (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expiresAt TEXT NOT NULL,
  ipAddress TEXT,
  userAgent TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE account (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  accountId TEXT NOT NULL,
  providerId TEXT NOT NULL,
  accessToken TEXT,
  refreshToken TEXT,
  accessTokenExpiresAt TEXT,
  refreshTokenExpiresAt TEXT,
  scope TEXT,
  idToken TEXT,
  password TEXT,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX account_provider_account_idx
  ON account(providerId, accountId);

CREATE TABLE verification (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  expiresAt TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE TABLE notes (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  contentJson TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

CREATE INDEX notes_user_idx ON notes(userId);
CREATE INDEX notes_user_updated_idx ON notes(userId, updatedAt DESC);

CREATE TABLE note_shares (
  id TEXT PRIMARY KEY,
  noteId TEXT NOT NULL UNIQUE,
  publicToken TEXT NOT NULL UNIQUE,
  isEnabled INTEGER NOT NULL DEFAULT 0,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  disabledAt TEXT,
  FOREIGN KEY (noteId) REFERENCES notes(id) ON DELETE CASCADE
);

CREATE INDEX note_shares_token_enabled_idx
  ON note_shares(publicToken, isEnabled);
```

---

## 11. API / Server Actions Requirements

Implementation may use Next.js route handlers and/or server actions, but behavior must follow this contract.

### Auth

- sign up
- sign in
- sign out

Handled primarily through better-auth integration.

### Notes

#### `GET /api/notes`

- returns current user’s notes only

#### `POST /api/notes`

- creates a new blank note for current user
- returns created note id

#### `GET /api/notes/:noteId`

- returns note only if owned by current user
- otherwise return not-found style response

#### `PATCH /api/notes/:noteId`

- updates title and/or contentJson
- owner only
- used by auto-save

#### `DELETE /api/notes/:noteId`

- owner only
- deletes note and cascades share row

### Sharing

#### `POST /api/notes/:noteId/share/enable`

- owner only
- creates or re-enables public share
- returns share URL/token

#### `POST /api/notes/:noteId/share/disable`

- owner only
- disables public share immediately

#### `GET /api/share/:token`

- public endpoint
- if token is valid and enabled, returns rendered shared note payload
- otherwise return not-found style response

---

## 12. Validation Rules

### Auth

- email must be syntactically valid
- password must meet minimum length required by implementation (recommended: 8)
- duplicate email must not expose sensitive implementation details

### Notes

- title max length recommended: 200 chars
- contentJson must be valid JSON matching supported TipTap schema
- empty note content is allowed

### Share token

- token must be cryptographically random
- token length should be sufficient to be unguessable (recommended: 32+ bytes entropy encoded safely)

---

## 13. Security & Privacy Requirements

- Use parameterized SQL statements only; never interpolate user input into SQL.
- Perform auth and ownership checks server-side only.
- Do not trust client-provided user IDs.
- Shared notes are read-only.
- Public share routes must never expose internal IDs unless intentionally harmless.
- Sanitize/render rich text only through trusted TipTap-compatible rendering pipeline.
- No internal stack traces, SQL errors, auth reasons, or sensitive diagnostics may be returned to the client.
- Server logs may contain detailed error context, but client-facing messages must remain generic.
- Cookies/session handling must follow better-auth defaults and secure production settings.

---

## 14. Error Handling Requirements

### Client-facing principles

- Show generic, user-safe errors.
- Never leak SQL statements, stack traces, token details, user existence details, or auth internals.
- Use friendly messages such as:
  - “Something went wrong.”
  - “Unable to save changes.”
  - “Unable to sign in.”
  - “Page not found.”

### Server-side principles

- Log detailed technical errors on the server.
- Map internal failures to safe status codes and generic response bodies.
- Avoid revealing whether a note exists but belongs to another user.

### Suggested response patterns

- `400` for validation failures with safe generic message
- `401` for unauthenticated access
- `404` for missing or unauthorized note/share resources where hiding existence is preferable
- `500` for unexpected server errors with generic message

---

## 15. Styling Requirements

- Use TailwindCSS.
- Visual style should feel clean, elegant, calm, and modern.
- Primary palette direction: **acqua / aqua-inspired tones**.
- Suggested usage:
  - soft aqua backgrounds
  - deeper teal/acqua accents for primary actions
  - subtle borders and muted neutral text
  - generous spacing and rounded corners
  - readable contrast and accessible focus states

The styling should remain minimal and product-like rather than decorative.

---

## 16. Migrations & Initialization

- Use a custom migrations system built with Bun + raw SQL.
- Migrations must be idempotent by tracking applied migrations in a migrations table.

Required table:

#### `migrations`

| Column    | Type | Constraints     |
| --------- | ---- | --------------- |
| id        | TEXT | PRIMARY KEY     |
| name      | TEXT | NOT NULL UNIQUE |
| appliedAt | TEXT | NOT NULL        |

Requirements:

- migrations run in order
- each migration is applied once
- app startup should not silently mutate schema unless explicitly configured to run migrations
- provide a command/script for migration execution

---

## 17. Suggested Project Structure

```text
src/
  app/
    sign-in/
    sign-up/
    notes/
      page.tsx
      new/
      [noteId]/
    share/
      [token]/
    not-found.tsx
    api/
      notes/
      share/
      auth/
  components/
    editor/
    notes/
    ui/
  lib/
    auth/
    db/
    notes/
    shares/
    validation/
    errors/
  server/
    queries/
    services/
  styles/
```

---

## 18. Acceptance Criteria

- User can sign up and sign in with email/password.
- User can sign out.
- Authenticated user can create a note.
- Authenticated user can see only their own notes.
- Authenticated user can edit title/content of their own note.
- Note changes auto-save successfully.
- Authenticated user can delete their own note.
- Authenticated user can enable public sharing for a note.
- Public share URL works without authentication.
- Public shared note is read-only.
- Disabling share link immediately makes link inaccessible.
- Invalid or revoked share links show not-found behavior.
- Unknown routes show custom 404 page.
- Errors shown to users do not leak internal details.
- Database schema includes better-auth required tables plus app tables.
- Migrations run via custom raw SQL migration script.

---

## 19. Final Implementation Notes

- `contentJson` is the canonical persisted representation.
- HTML should be derived when rendering, not stored as source of truth.
- `/settings` route must not be implemented.
- Simplicity is preferred over abstraction-heavy architecture.
- This is a demo app, but auth, authorization, share-token security, and error handling must still be implemented correctly.
