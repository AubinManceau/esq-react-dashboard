import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout({ children }) {

  return (
    <div className="flex max-h-screen max-w-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-100">
          {children}
        </main>
    </div>
  );
}
