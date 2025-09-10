import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout({ children }) {

  return (
    <div className="flex min-h-screen lg:max-h-screen min-w-screen max-w-screen overflow-hidden">
        <Sidebar />
        <main className="w-full flex-1 max-lg:mt-12">
          {children}
        </main>
    </div>
  );
}
