"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // icônes hamburger et close

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

      <aside className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white py-8 px-2 flex flex-col justify-between transform transition-transform duration-300 z-50 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:block`}>
        <button onClick={() => setOpen(false)} className="lg:hidden absolute top-4 right-4 text-white">
          <X size={24} />
        </button>
        <nav>
          <h2 className="text-2xl font-bold mb-10 text-center">ESQ</h2>
          <ul className="space-y-4">
            <li>
              <Link
                href="/admin"
                className="block py-2 px-2 rounded hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                Tableau de bord
              </Link>
            </li>
            <li>
              <Link
                href="/admin/utilisateurs"
                className="block py-2 px-2 rounded hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                Utilisateurs
              </Link>
            </li>
            <li>
              <Link
                href="/admin/articles"
                className="block py-2 px-2 rounded hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                Articles
              </Link>
            </li>
            <li>
              <Link
                href="/admin/equipes"
                className="block py-2 px-2 rounded hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                Équipes
              </Link>
            </li>
            <li>
              <Link
                href="/admin/convocations"
                className="block py-2 px-2 rounded hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                Convocations
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <button className="mt-10 w-full py-2 px-4 bg-red-600 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
