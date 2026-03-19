export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-6 py-16">
      <section className="w-full rounded-2xl border border-aqua-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-aqua-700">Page not found</h1>
        <p className="mt-3 text-sm text-slate-600">
          This placeholder 404 is used for unknown routes and will also back invalid note/share lookups in future server
          logic.
        </p>
      </section>
    </main>
  );
}
