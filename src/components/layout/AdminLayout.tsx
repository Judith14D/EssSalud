import SidebarAdmin from "../../components/admin/SidebarAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SidebarAdmin />

      <main className="ml-64 p-8 w-full bg-[#F7FBFF] min-h-screen">
        {children}
      </main>
    </div>
  );
}
