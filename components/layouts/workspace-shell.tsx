type WorkspaceShellProps = Readonly<{
  children: React.ReactNode;
}>;

export function WorkspaceShell({ children }: WorkspaceShellProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-10">
      {children}
    </main>
  );
}
