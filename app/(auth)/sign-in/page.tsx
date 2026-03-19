export default function SignInPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-aqua-700">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Placeholder page: email/password auth form will be added later.
        </p>
      </header>

      <div className="space-y-3 rounded-xl border border-aqua-200 bg-aqua-50 p-4">
        <p className="text-sm font-medium text-slate-700">Auth form block (dummy)</p>
        <p className="text-sm text-slate-600">Email field</p>
        <p className="text-sm text-slate-600">Password field</p>
        <p className="text-sm text-slate-600">Submit button</p>
        <p className="text-sm text-slate-600">Generic auth error message area</p>
      </div>

      <p className="text-sm text-slate-700">
        Link placeholder: create account at{" "}
        <code className="rounded bg-aqua-100 px-1 py-0.5">/sign-up</code>
      </p>
    </section>
  );
}
