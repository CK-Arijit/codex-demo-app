type CenteredPageShellProps = Readonly<{
  children: React.ReactNode;
  maxWidthClass?: string;
  className?: string;
}>;

export function CenteredPageShell({
  children,
  maxWidthClass = "max-w-4xl",
  className,
}: CenteredPageShellProps) {
  const mergedClassName = className
    ? `mx-auto flex min-h-screen w-full ${maxWidthClass} items-center justify-center px-6 py-20 ${className}`
    : `mx-auto flex min-h-screen w-full ${maxWidthClass} items-center justify-center px-6 py-20`;

  return <main className={mergedClassName}>{children}</main>;
}
