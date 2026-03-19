import { CenteredPageShell } from "@/components/layouts";
import { SurfaceCard } from "@/components/ui";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CenteredPageShell>
      <SurfaceCard className="w-full max-w-lg p-8">{children}</SurfaceCard>
    </CenteredPageShell>
  );
}
