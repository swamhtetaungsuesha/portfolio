export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="page bg-site text-white bg-cover bg-no-repeat font-sora relative w-full">
      {children}
    </main>
  );
}
