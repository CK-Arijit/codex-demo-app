export default function SignUpPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-aqua-700">Sign up</h1>
        <p className="mt-2 text-sm text-slate-600">
          Placeholder page: registration flow will be added later.
        </p>
      </header>

      <div className="space-y-3 rounded-xl border border-aqua-200 bg-aqua-50 p-4">
        <p className="text-sm font-medium text-slate-700">Registration form block (dummy)</p>
        <p className="text-sm text-slate-600">Name field</p>
        <p className="text-sm text-slate-600">Email field</p>
        <p className="text-sm text-slate-600">Password field</p>
        <p className="text-sm text-slate-600">Submit button</p>
        <p className="text-sm text-slate-600">Generic auth error message area</p>
      </div>

      <p className="text-sm text-slate-700">
        Link placeholder: sign in at{" "}
        <code className="rounded bg-aqua-100 px-1 py-0.5">/sign-in</code>
      </p>
    </section>
  );
}
