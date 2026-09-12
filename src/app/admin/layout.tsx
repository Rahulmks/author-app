export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[rgba(250,244,235,0.7)]">
      {children}
    </div>
  );
}
