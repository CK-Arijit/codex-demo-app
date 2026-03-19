import { CenteredPageShell } from "@/components/layouts";
import { SurfaceCard } from "@/components/ui";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CenteredPageShell maxWidthClass="max-w-5xl" className="py-12">
      <SurfaceCard className="w-full p-8">{children}</SurfaceCard>
    </CenteredPageShell>
  );
}
