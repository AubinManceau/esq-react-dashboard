"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Ellipsis, ArrowUpDown } from "lucide-react";
import Pagination from "@/components/Pagination";
import { getUsers, deleteUser } from "@/lib/user";
import Link from "next/link";
import Loader from "@/components/Loader";
import rolesList from "@/lib/roles";
import categoriesList from "@/lib/categories";

export default function Utilisateurs() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUsers();
      setUsers(users?.data);
    };
    fetchData();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesName = fullName.includes(search.toLowerCase());

      const userRoleIds = user.UserRolesCategories?.map((r) => r.roleId) ?? [];
      const userRolesNames = userRoleIds.map(
        (id) => rolesList.find((r) => r.id === id)?.name ?? ""
      );

      const matchesRole = roleFilter
        ? userRoleIds.map(Number).includes(Number(roleFilter))
        : true;

      user.role = userRolesNames;

      let matchesCategory = true;
      if (roleFilter && categoryFilter) {
        matchesCategory =
          user.UserRolesCategories?.some((r) => {
            if (r.roleId !== Number(roleFilter)) return false;
            if (!r.categoryId) return true;
            return r.categoryId === Number(categoryFilter);
          }) ?? false;
      }


      return matchesName && matchesRole && matchesCategory;
    });
  }, [users, search, roleFilter, categoryFilter]);


  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return prev.direction === "asc"
          ? { key, direction: "desc" }
          : null;
      }
      return { key, direction: "asc" };
    });
  };

  const sortedUsers = useMemo(() => {
    if (!sortConfig) return filteredUsers;
    const { key, direction } = sortConfig;

    return [...filteredUsers].sort((a, b) => {
      let valueA = "";
      let valueB = "";

      if (key === "name") {
        valueA = `${a.firstName} ${a.lastName}`.toLowerCase();
        valueB = `${b.firstName} ${b.lastName}`.toLowerCase();
      } else {
        valueA = a[key]?.toString().toLowerCase() ?? "";
        valueB = b[key]?.toString().toLowerCase() ?? "";
      }

      if (valueA < valueB) return direction === "asc" ? -1 : 1;
      if (valueA > valueB) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredUsers, sortConfig]);

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    return sortedUsers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [sortedUsers, currentPage, itemsPerPage]);

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      const res = await deleteUser(userToDelete);
      if (res?.status === "success") {
        setUsers((prev) => prev.filter((user) => user.id !== userToDelete));
        setUserToDelete(null);
        setDeleteModalOpen(false);
      } else {
        console.error("Erreur lors de la suppression de l'utilisateur");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
    }
    setUserToDelete(null);
    setDeleteModalOpen(false);
  }

  const cancelDelete = () => {
    setDeleteModalOpen(false);
  }

  return (
    <Suspense fallback={<Loader className="w-full h-full" />}>
    <div className="admin-users">
      <div className="flex items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-orange max-lg:hidden !font-default-bold">Utilisateurs</h1>
        </div>
        { users.length > 0 && (
          <div className="flex max-lg:flex-col gap-2 max-lg:w-full">
            <input
              type="text"
              placeholder="Rechercher par nom..."
              className="px-3 py-2 focus:outline-none w-full bg-white shadow-sm rounded-[5px] border-1 border-black/2"
              value={search}
              name="search"
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <select
              className="px-3 py-2 focus:outline-none bg-white shadow-sm rounded-[5px] border-1 border-black/2"
              value={roleFilter}
              name="role"
              onChange={(e) => {
                setRoleFilter(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="">Tous les rôles</option>
              {rolesList.map((role) => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>

            {(roleFilter === 1 || roleFilter === 2) && (
              <select
                className="px-3 py-2 focus:outline-none bg-white shadow-sm rounded-[5px] border-1 border-black/2"
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="">Toutes les catégories</option>
                {categoriesList.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            )}
          </div>
        )}
      </div>

      {filteredUsers.length === 0 ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p className="opacity-60">Aucun utilisateur trouvé.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-2">
            Affichage de {paginatedUsers.length} sur {filteredUsers.length} utilisateurs
          </p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer select-none w-2/8"
                  onClick={() => handleSort("name")}
                >
                  Nom{" "}
                  <ArrowUpDown
                    className={`inline-block w-4 h-4 ml-1 ${
                      sortConfig?.key === "name" ? "text-black" : "text-gray-400"
                    }`}
                  />
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none w-2/8"
                  onClick={() => handleSort("email")}
                >
                  Email{" "}
                  <ArrowUpDown
                    className={`inline-block w-4 h-4 ml-1 ${
                      sortConfig?.key === "email" ? "text-black" : "text-gray-400"
                    }`}
                  />
                </TableHead>
                <TableHead className="w-2/8">Téléphone</TableHead>
                <TableHead className="w-1/8">Rôles</TableHead>
                <TableHead className="text-right w-1/8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium w-2/8">{user.firstName} {user.lastName}</TableCell>
                  <TableCell className="text-gray-500 w-2/8">{user.email}</TableCell>
                  <TableCell className="w-2/8">{user.phone}</TableCell>
                  <TableCell className="w-1/8">{user.role.join(", ")}</TableCell>
                  <TableCell className="text-right w-1/8">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div className="inline-flex justify-end px-2 py-1 bg-bleu/5 rounded-md w-fit cursor-pointer">
                          <Ellipsis color="black" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem><Link href={`/admin/utilisateurs/${user.id}`}>Modifier</Link></DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setDeleteModalOpen(true); setUserToDelete(user.id); }}>Supprimer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length < itemsPerPage ? (
            <></>
          ) : (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </>
      )}
      {deleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={cancelDelete}
        >
          <div
            className="bg-white rounded-lg py-6 px-12 max-w-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Confirmer la suppression</h2>
            <p className="mb-10">
              Êtes-vous bien sûr de vouloir supprimer cet utilisateur ?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="btn !bg-gray-300 hover:!bg-gray-400 !text-black"
                onClick={cancelDelete}
              >
                Annuler
              </button>
              <button className="btn" onClick={handleDelete}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </Suspense>
  );
}
