"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  LogOut,
  House,
  Users,
  Newspaper,
  Scroll,
  Shirt,
  ChevronDown,
  FileChartColumn,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Sidebar() {
  const { userInfos, clearUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [submenuUsersOpen, setSubmenuUsersOpen] = useState(false);
  const [submenuPresenceOpen, setSubmenuPresenceOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const accessMap = {
    "/admin/utilisateurs": [4],
    "/admin/articles": [3, 4],
    "/admin/convocations": [2, 4],
    "/admin/equipes": [3, 4],
    "/admin/presences": [2, 4],
  }

  useEffect(() => {
    if (pathname.startsWith("/admin/utilisateurs")) {
      setSubmenuUsersOpen(true);
    } else if (pathname.startsWith("/admin/presences")) {
      setSubmenuPresenceOpen(true);
    }
  }, [pathname]);

  const hasAccess = (path) => {
    if (!userInfos || userInfos?.user?.roles?.length === 0) return false;
    const allowedRoles = accessMap[path] || [];
    return userInfos.user.roles.some(r => allowedRoles.includes(r.roleId));
  };

  const userName = () => {
    const first = userInfos?.user?.firstName || "";
    const last = userInfos?.user?.lastName || "";
    return (first + " " + last).trim() || "Utilisateur";
  };


  const isActive = (href) => pathname === href;

  const getPageTitle = (path) => {
    if (path === "/admin") return "Tableau de bord";
    if (path.startsWith("/admin/utilisateurs")) return "Utilisateurs";
    if (path.startsWith("/admin/articles")) return "Articles";
    if (path.startsWith("/admin/presences")) return "Présences";
    if (path.startsWith("/admin/equipes")) return "Équipes";
    if (path.startsWith("/admin/convocations")) return "Convocations";
    return "";
  };

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const handleLogout = async () => {
    const res = await logout();
    if (res.status !== "success") return;
    clearUser();
    setLogoutModalOpen(false);
    router.push("/");
  };

  const cancelLogout = () => {
    setLogoutModalOpen(false);
  };

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 w-full flex items-center justify-between bg-white px-4 py-4 z-10 shadow">
        <button onClick={() => setOpen(true)} className="p-2 rounded-md bg-orange text-white">
          <Menu size={24} />
        </button>
        <span className="text-orange">{getPageTitle(pathname)}</span>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white flex flex-col justify-between transform transition-transform duration-300 z-50 lg:shadow-md rounded-r-[15px] ${
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
          <div className="bg-orange py-8 mb-2 lg:mb-10 rounded-tr-[15px]">
            <h2 className="!mb-0 pl-6 !font-default-extralight text-white cursor-default">
              Etoile Sportive
              <span className="font-default-medium"> Quelainaise</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4 px-3">
            <div>
              <Link
                href="/admin"
                className={`nav-link ${isActive("/admin") ? "active" : ""}`}
                onClick={() => {
                  setOpen(false);
                  setSubmenuUsersOpen(false);
                  setSubmenuPresenceOpen(false);
                }}
              >
                <House color="black" className="icon" />
                Tableau de bord
              </Link>
            </div>
            {hasAccess("/admin/utilisateurs") && (
            <div className="nav-link-container">
              <button
                className="nav-link w-full justify-between cursor-pointer"
                onClick={() => {
                  setSubmenuUsersOpen(!submenuUsersOpen);
                  setSubmenuPresenceOpen(false);
                }}
              >
                <div className="flex gap-4 items-center">
                  <Users color="black" className="icon" />
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

              <div className={`${submenuUsersOpen ? 'block' : 'hidden'} mt-2 mb-4 flex flex-col gap-2 ml-6 pl-4 border-l-2 border-gray-200`}>
                <Link
                  href="/admin/utilisateurs/inscription"
                  className={`sub-nav-link ${
                    isActive("/admin/utilisateurs/inscription") ? "active" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  Inscription
                </Link>
                <Link
                  href="/admin/utilisateurs"
                  className={`sub-nav-link ${
                    isActive("/admin/utilisateurs") ? "active" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  Gestion
                </Link>
              </div>
            </div>
            )}

            {hasAccess("/admin/articles") && (
            <div>
              <Link
                href="/admin/articles"
                className={`nav-link ${isActive("/admin/articles") ? "active" : ""}`}
                onClick={() => {
                  setOpen(false);
                  setSubmenuUsersOpen(false);
                  setSubmenuPresenceOpen(false);
                }}
              >
                <Newspaper color="black" className="icon" />
                Articles
              </Link>
            </div>
            )}

            {hasAccess("/admin/presences") && (
            <div className="nav-link-container">
              <button
                className="nav-link w-full justify-between cursor-pointer"
                onClick={() => {
                  setSubmenuUsersOpen(false);
                  setSubmenuPresenceOpen(!submenuPresenceOpen);
                }}
              >
                <div className="flex gap-4 items-center">
                  <FileChartColumn color="black" className="icon" />
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

              <div className={`${submenuPresenceOpen ? 'block' : 'hidden'} mt-2 mb-4 flex flex-col gap-2 ml-6 pl-4 border-l-2 border-gray-200`}>
                <Link
                  href="/admin/presences/graphique"
                  className={`sub-nav-link ${
                    isActive("/admin/presences/graphique") ? "active" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  Graphique
                </Link>
                <Link
                  href="/admin/presences"
                  className={`sub-nav-link ${
                    isActive("/admin/presences") ? "active" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  Gestion
                </Link>
              </div>
            </div>
            )}

            {hasAccess("/admin/equipes") && (
            <div>
              <Link
                href="/admin/equipes"
                className={`nav-link ${isActive("/admin/equipes") ? "active" : ""}`}
                onClick={() => {
                  setOpen(false);
                  setSubmenuUsersOpen(false);
                  setSubmenuPresenceOpen(false);
                }}
              >
                <Shirt color="black" className="icon" />
                Équipes
              </Link>
            </div>
            )}

            {hasAccess("/admin/convocations") && (
            <div>
              <Link
                href="/admin/convocations"
                className={`nav-link ${isActive("/admin/convocations") ? "active" : ""}`}
                onClick={() => {
                  setOpen(false);
                  setSubmenuUsersOpen(false);
                  setSubmenuPresenceOpen(false);
                }}
              >
                <Scroll color="black" className="icon" />
                Convocations
              </Link>
            </div>
            )}
          </div>
        </nav>

        <button className="flex items-center gap-6 rounded-md mb-8 py-3 px-6 cursor-pointer" onClick={openLogoutModal}>
          <div className="bg-orange p-3 rounded-full">
            <LogOut color="white" />
          </div>
          <div className="flex flex-col text-left">
            <p className="h4">{userName()}</p>
            <span className="logout">Se déconnecter</span>
          </div>
        </button>
      </aside>

      {logoutModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={cancelLogout}
        >
          <div
            className="bg-white rounded-lg py-6 px-12 max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Confirmer la déconnexion</h2>
            <p className="mb-10">
              Êtes-vous bien sûr de vouloir vous déconnecter ?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="btn !bg-gray-300 hover:!bg-gray-400 !text-black"
                onClick={cancelLogout}
              >
                Annuler
              </button>
              <button className="btn" onClick={handleLogout}>
                Déconnecter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
