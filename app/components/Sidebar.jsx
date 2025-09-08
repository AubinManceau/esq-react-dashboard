"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogOut, House, Users, Newspaper, Scroll, Shirt } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md">
        <Menu size={24} />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-screen w-64 bg-white py-8 px-2 flex flex-col justify-between transform transition-transform duration-300 z-50 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}>
        <button onClick={() => setOpen(false)} className="lg:hidden absolute top-4 right-4">
          <X size={24} />
        </button>
        <nav>
          <h2 className="text-2xl font-bold !mb-8 text-center">ESQ</h2>
          <ul className="space-y-4">
            <li>
              <Link
                href="/admin"
                className="flex gap-2 items-center py-2 px-2 rounded hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <House />
                Tableau de bord
              </Link>
            </li>
            <li>
              <Link
                href="/admin/utilisateurs"
                className="flex gap-2 items-center py-2 px-2 rounded hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <Users />
                Utilisateurs
              </Link>
            </li>
            <li>
              <Link
                href="/admin/articles"
                className="flex gap-2 items-center py-2 px-2 rounded hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <Newspaper />
                Articles
              </Link>
            </li>
            <li>
              <Link
                href="/admin/equipes"
                className="flex gap-2 items-center py-2 px-2 rounded hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <Shirt />
                Équipes
              </Link>
            </li>
            <li>
              <Link
                href="/admin/convocations"
                className="flex gap-2 items-center py-2 px-2 rounded hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <Scroll />
                Convocations
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <button className="flex items-center gap-6 bg-gray-100 rounded-md py-2 px-6 w-full cursor-pointer">
            <LogOut />
            <div className="flex flex-col text-left">
              <p>Aubin Manceau</p>
              <span className="text-sm">Se déconnecter</span>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
