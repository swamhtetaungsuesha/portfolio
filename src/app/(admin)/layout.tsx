export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="bg-primary h-screen w-full">{children}</main>;
}
