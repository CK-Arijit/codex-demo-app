export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6 py-12">
      <section className="w-full rounded-2xl border border-aqua-200 bg-white p-8 shadow-sm">{children}</section>
    </main>
  );
}
