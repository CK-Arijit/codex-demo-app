export default function NotesListPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-aqua-700">Notes</h2>
        <p className="text-sm text-slate-600">Placeholder list page. Data loading and actions are intentionally not implemented.</p>
      </header>

      <div className="rounded-xl border border-aqua-200 bg-aqua-50 p-4 text-sm text-slate-700">
        <p className="font-medium">Notes list block (dummy)</p>
        <p>Future rows: note title, updated-at timestamp, share status indicator.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-aqua-200 p-4 text-sm text-slate-700">Create note action placeholder</div>
        <div className="rounded-xl border border-aqua-200 p-4 text-sm text-slate-700">Sign-out action placeholder</div>
        <div className="rounded-xl border border-aqua-200 p-4 text-sm text-slate-700">Delete action placeholder</div>
      </div>
    </section>
  );
}
