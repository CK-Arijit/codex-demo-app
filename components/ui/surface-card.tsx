type SurfaceCardProps = Readonly<{
  children: React.ReactNode;
  className?: string;
}>;

export function SurfaceCard({ children, className }: SurfaceCardProps) {
  const mergedClassName = className
    ? `rounded-2xl border border-aqua-200 bg-white shadow-sm ${className}`
    : "rounded-2xl border border-aqua-200 bg-white shadow-sm";

  return <section className={mergedClassName}>{children}</section>;
}
