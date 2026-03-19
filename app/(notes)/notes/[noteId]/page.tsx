type NoteEditorPageProps = {
  params: Promise<{
    noteId: string;
  }>;
};

export default async function NoteEditorPage({ params }: NoteEditorPageProps) {
  const { noteId } = await params;

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-aqua-700">Note Editor</h2>
        <p className="text-sm text-slate-600">
          Placeholder for note id <code className="rounded bg-aqua-100 px-1 py-0.5">{noteId}</code>.
          Ownership checks and data fetch are not implemented.
        </p>
      </header>

      <div className="space-y-3 rounded-xl border border-aqua-200 bg-aqua-50 p-4 text-sm text-slate-700">
        <p>Editable title area (dummy)</p>
        <p>TipTap editor area (dummy)</p>
        <p>Auto-save status: Saving... / Saved / Error (dummy)</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-aqua-200 p-4 text-sm text-slate-700">
          Share toggle/action placeholder
        </div>
        <div className="rounded-xl border border-aqua-200 p-4 text-sm text-slate-700">
          Copy share link action placeholder
        </div>
        <div className="rounded-xl border border-aqua-200 p-4 text-sm text-slate-700">
          Delete action placeholder
        </div>
        <div className="rounded-xl border border-aqua-200 p-4 text-sm text-slate-700">
          Back to notes list action placeholder
        </div>
      </div>
    </section>
  );
}
