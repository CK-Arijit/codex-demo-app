export default function NewNotePage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-aqua-700">Create Note</h2>
      <p className="text-sm text-slate-600">
        Standalone placeholder for{" "}
        <code className="rounded bg-aqua-100 px-1 py-0.5">/notes/new</code>. No create logic or
        redirect behavior is implemented in this scaffold.
      </p>
      <div className="rounded-xl border border-aqua-200 bg-aqua-50 p-4 text-sm text-slate-700">
        Empty editor shell placeholder for future note creation flow.
      </div>
    </section>
  );
}
