export default function NotesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <header className="rounded-2xl border border-aqua-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-semibold text-aqua-700">TinyNotes Workspace</h1>
        <p className="mt-1 text-sm text-slate-600">Authenticated route group scaffold. Real auth protection comes later.</p>
      </header>
      <section className="rounded-2xl border border-aqua-200 bg-white p-6 shadow-sm">{children}</section>
    </main>
  );
}
