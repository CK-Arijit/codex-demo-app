import { CenteredPageShell } from "@/components/layouts";
import { SurfaceCard } from "@/components/ui";

export default function NotFoundPage() {
  return (
    <CenteredPageShell maxWidthClass="max-w-3xl" className="py-16">
      <SurfaceCard className="w-full p-8 text-center">
        <h1 className="text-3xl font-semibold text-aqua-700">Page not found</h1>
        <p className="mt-3 text-sm text-slate-600">
          This placeholder 404 is used for unknown routes and will also back invalid note/share
          lookups in future server logic.
        </p>
      </SurfaceCard>
    </CenteredPageShell>
  );
}
