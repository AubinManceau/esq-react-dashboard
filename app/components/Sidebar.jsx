"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogOut, House, Users, Newspaper, Scroll, Shirt } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-orange text-white rounded-md">
        <Menu size={24} />
      </button>

      {open && (
        <div className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-screen w-64 bg-white flex flex-col justify-between transform transition-transform duration-300 z-50 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static`}>
        <button onClick={() => setOpen(false)} className="lg:hidden absolute top-4 right-4">
          <X size={24} color="white" />
        </button>
        <nav>
          <div className="bg-orange py-8 mb-10">
            <h2 className="!mb-0 pl-6 !font-default-extralight text-white">Etoile Sportive <span className="font-default-medium">Quelainaise</span></h2>
          </div>
          <div className="flex flex-col gap-4 px-3">
            <div>
              <Link
                href="/admin"
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                <House color="#FC6E11" />
                Tableau de bord
              </Link>
            </div>
            <div>
              <Link
                href="/admin/utilisateurs"
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                <Users color="#FC6E11" />
                Utilisateurs
              </Link>
            </div>
            <div>
              <Link
                href="/admin/articles"
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                <Newspaper color="#FC6E11" />
                Articles
              </Link>
            </div>
            <div>
              <Link
                href="/admin/equipes"
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                <Shirt color="#FC6E11" />
                Équipes
              </Link>
            </div>
            <div>
              <Link
                href="/admin/convocations"
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                <Scroll color="#FC6E11" />
                Convocations
              </Link>
            </div>
          </div>
        </nav>

        <button className="flex items-center gap-6 rounded-md mb-8 py-3 px-6 cursor-pointer">
          <div className="bg-orange p-3 rounded-full">
            <LogOut color="white" />
          </div>
          <div className="flex flex-col text-left">
            <p className="h4">Aubin Manceau</p>
            <span className="logout">Se déconnecter</span>
          </div>
        </button>
      </aside>
    </>
  );
}
