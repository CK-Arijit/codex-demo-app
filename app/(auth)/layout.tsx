export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg rounded-2xl border border-aqua-200 bg-white p-8 shadow-sm">{children}</div>
    </main>
  );
}
