type SharedNotePageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function SharedNotePage({ params }: SharedNotePageProps) {
  const { token } = await params;

  return (
    <article className="space-y-5">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-aqua-700">Shared Note</h1>
        <p className="text-sm text-slate-600">
          Public read-only placeholder for token{" "}
          <code className="rounded bg-aqua-100 px-1 py-0.5">{token}</code>.
        </p>
      </header>

      <div className="rounded-xl border border-aqua-200 bg-aqua-50 p-5 text-sm text-slate-700">
        <p className="font-medium">Note title placeholder</p>
        <p className="mt-3">Rendered note content placeholder (read-only)</p>
      </div>
    </article>
  );
}
