import { CenteredPageShell } from "@/components/layouts";
import { SurfaceCard } from "@/components/ui";

export default function HomePage() {
  return (
    <CenteredPageShell>
      <SurfaceCard className="w-full p-8">
        <h1 className="text-3xl font-semibold tracking-tight text-aqua-700">TinyNotes</h1>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Root route scaffold only. In the real app, this route will decide whether to redirect
          signed-in users to <code className="rounded bg-aqua-100 px-1 py-0.5">/notes</code> or show
          a public landing/auth entry point.
        </p>
      </SurfaceCard>
    </CenteredPageShell>
  );
}
