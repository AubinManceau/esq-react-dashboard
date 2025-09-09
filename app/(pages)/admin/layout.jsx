import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout({ children }) {

  return (
    <div className="flex min-h-screen max-h-screen min-w-screen max-w-screen overflow-hidden">
        <Sidebar />
        <main className="w-full flex-1">
          {children}
        </main>
    </div>
  );
}
