import { WorkspaceShell } from "@/components/layouts";
import { SurfaceCard } from "@/components/ui";

export default function NotesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WorkspaceShell>
      <SurfaceCard className="p-5">
        <h1 className="text-xl font-semibold text-aqua-700">TinyNotes Workspace</h1>
        <p className="mt-1 text-sm text-slate-600">
          Authenticated route group scaffold. Real auth protection comes later.
        </p>
      </SurfaceCard>
      <SurfaceCard className="p-6">{children}</SurfaceCard>
    </WorkspaceShell>
  );
}
