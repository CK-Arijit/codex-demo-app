import Link from "next/link";

type EmailPasswordAuthFormProps = Readonly<{
  mode: "sign-in" | "sign-up";
}>;

const formCopy = {
  "sign-in": {
    title: "Sign in",
    description: "Use your email and password to access your TinyNotes account.",
    submitLabel: "Sign in",
    switchLabel: "Don't have an account?",
    switchHref: "/sign-up",
    switchCta: "Create one",
  },
  "sign-up": {
    title: "Create account",
    description: "Create your TinyNotes account with an email and password.",
    submitLabel: "Create account",
    switchLabel: "Already have an account?",
    switchHref: "/sign-in",
    switchCta: "Sign in",
  },
} as const;

export function EmailPasswordAuthForm({ mode }: EmailPasswordAuthFormProps) {
  const copy = formCopy[mode];

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-aqua-700">{copy.title}</h1>
        <p className="text-sm text-slate-600">{copy.description}</p>
      </header>

      <form className="space-y-4" method="post" noValidate>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-slate-800">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-lg border border-aqua-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-aqua-400"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-slate-800">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
            required
            minLength={8}
            className="w-full rounded-lg border border-aqua-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-aqua-400"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-aqua-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-aqua-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua-400"
        >
          {copy.submitLabel}
        </button>
      </form>

      <p className="text-sm text-slate-700">
        {copy.switchLabel}{" "}
        <Link
          href={copy.switchHref}
          className="font-medium text-aqua-700 underline-offset-2 hover:underline"
        >
          {copy.switchCta}
        </Link>
      </p>
    </section>
  );
}
