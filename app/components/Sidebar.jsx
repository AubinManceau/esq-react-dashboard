"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, LogOut, House, Users, Newspaper, Scroll, Shirt, ChevronDown, FileChartColumn } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [submenuUsersOpen, setSubmenuUsersOpen] = useState(false);
  const [submenuPresenceOpen, setSubmenuPresenceOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin/utilisateurs")) {
      setSubmenuUsersOpen(true);
    } else if (pathname.startsWith("/admin/presences")) {
      setSubmenuPresenceOpen(true);
    }
  }, [pathname]);

  const isActive = (href) => pathname === href;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-orange text-white rounded-md"
      >
        <Menu size={24} />
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white flex flex-col justify-between transform transition-transform duration-300 z-50 lg:shadow-md ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden absolute top-4 right-4"
        >
          <X size={24} color="white" />
        </button>
        <nav>
          <div className="bg-orange py-8 mb-10">
            <h2 className="!mb-0 pl-6 !font-default-extralight text-white cursor-default">
              Etoile Sportive <span className="font-default-medium">Quelainaise</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 px-3">
            <div>
              <Link
                href="/admin"
                className={`nav-link ${isActive("/admin") ? "active" : ""}`}
                onClick={() => { setOpen(false); setSubmenuUsersOpen(false); setSubmenuPresenceOpen(false); }}
              >
                <House color="#FC6E11" />
                Tableau de bord
              </Link>
            </div>
            <div>
              <button
                className="nav-link w-full justify-between cursor-pointer"
                onClick={() => { setSubmenuUsersOpen(!submenuUsersOpen); setSubmenuPresenceOpen(false); }}
              >
                <div className="flex gap-4 items-center">
                  <Users color="#FC6E11" />
                  Utilisateurs
                </div>
                <ChevronDown
                  color="black"
                  strokeWidth={1}
                  className={`transition-transform duration-200 ${
                    submenuUsersOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {submenuUsersOpen && (
                <div className="mt-2 mb-4 flex flex-col gap-2 ml-6 pl-4 border-l-2 border-gray-200">
                  <Link
                    href="/admin/utilisateurs/inscription"
                    className={`sub-nav-link ${isActive("/admin/utilisateurs/inscription") ? "active" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    Inscription
                  </Link>
                  <Link
                    href="/admin/utilisateurs"
                    className={`sub-nav-link ${isActive("/admin/utilisateurs") ? "active" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    Gestion
                  </Link>
                </div>
              )}
            </div>

            <div>
              <Link
                href="/admin/articles"
                className={`nav-link ${isActive("/admin/articles") ? "active" : ""}`}
                onClick={() => { setOpen(false); setSubmenuUsersOpen(false); setSubmenuPresenceOpen(false); }}
              >
                <Newspaper color="#FC6E11" />
                Articles
              </Link>
            </div>
            <div>
              <button
                className={'nav-link w-full justify-between cursor-pointer'}
                onClick={() => { setSubmenuUsersOpen(false); setSubmenuPresenceOpen(!submenuPresenceOpen); }}
              >
                <div className="flex gap-4 items-center">
                  <FileChartColumn color="#FC6E11" />
                  Présences
                </div>
                <ChevronDown
                  color="black"
                  strokeWidth={1}
                  className={`transition-transform duration-200 ${
                    submenuPresenceOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {submenuPresenceOpen && (
                <div className="mt-2 mb-4 flex flex-col gap-2 ml-6 pl-4 border-l-2 border-gray-200">
                  <Link
                    href="/admin/presences/graphique"
                    className={`sub-nav-link ${isActive("/admin/presences/graphique") ? "active" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    Graphique
                  </Link>
                  <Link
                    href="/admin/presences"
                    className={`sub-nav-link ${isActive("/admin/presences") ? "active" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    Gestion
                  </Link>
                </div>
              )}
            </div>
            <div>
              <Link
                href="/admin/equipes"
                className={`nav-link ${isActive("/admin/equipes") ? "active" : ""}`}
                onClick={() => { setOpen(false); setSubmenuUsersOpen(false); setSubmenuPresenceOpen(false); }}
              >
                <Shirt color="#FC6E11" />
                Équipes
              </Link>
            </div>
            <div>
              <Link
                href="/admin/convocations"
                className={`nav-link ${isActive("/admin/convocations") ? "active" : ""}`}
                onClick={() => { setOpen(false); setSubmenuUsersOpen(false); setSubmenuPresenceOpen(false); }}
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
