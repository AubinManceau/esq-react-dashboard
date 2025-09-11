import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({ children }) {

  return (
    <div className="flex min-h-screen lg:max-h-screen min-w-screen max-w-screen overflow-hidden bg-[#F9F9F9]">
        <Sidebar />
        <main className="p-4 sm:p-8 lg:p-12 w-full flex-1 max-lg:mt-[72px]">
          {children}
        </main>
    </div>
  );
}
