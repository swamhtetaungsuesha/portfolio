export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="page text-white bg-cover bg-no-repeat font-sora relative w-full overflow-y-auto">
      {children}
    </main>
  );
}
