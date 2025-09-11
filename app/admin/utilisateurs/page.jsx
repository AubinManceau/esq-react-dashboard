"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis, ArrowUpDown } from "lucide-react";

const users = [
  { id: 1, name: "Alice Dupont", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Martin", email: "bob@example.com", role: "Utilisateur" },
  { id: 3, name: "Charlie Petit", email: "charlie@example.com", role: "Modérateur" },
  { id: 4, name: "David Moreau", email: "david@example.com", role: "Utilisateur" },
  { id: 5, name: "Emma Leblanc", email: "emma@example.com", role: "Admin" },
  { id: 6, name: "Franck Dupuis", email: "franck@example.com", role: "Modérateur" },
  { id: 7, name: "Alice Dupont", email: "alice@example.com", role: "Admin" },
  { id: 8, name: "Bob Martin", email: "bob@example.com", role: "Utilisateur" },
  { id: 9, name: "Charlie Petit", email: "charlie@example.com", role: "Modérateur" },
  { id: 10, name: "David Moreau", email: "david@example.com", role: "Utilisateur" },
  { id: 11, name: "Emma Leblanc", email: "emma@example.com", role: "Admin" },
  { id: 12, name: "Franck Dupuis", email: "franck@example.com", role: "Modérateur" },
];

export default function Utilisateurs() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);
  const itemsPerPage = 8;

  const filteredUsers = users.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesName && matchesRole;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (!prev || prev.key !== key) {
        return { key, direction: "asc" };
      }
      if (prev.direction === "asc") {
        return { key, direction: "desc" };
      }
      return null;
    });
  };

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const valueA = a[key]?.toLowerCase?.() ?? "";
    const valueB = b[key]?.toLowerCase?.() ?? "";
    if (valueA < valueB) return direction === "asc" ? -1 : 1;
    if (valueA > valueB) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-users">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-orange max-lg:hidden">Utilisateurs</h1>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Rechercher par nom..."
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Tous les rôles</option>
            <option value="Admin">Admin</option>
            <option value="Modérateur">Modérateur</option>
            <option value="Utilisateur">Utilisateur</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-2">
        Affiche {paginatedUsers.length} sur {filteredUsers.length} utilisateurs
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
              className="cursor-pointer select-none w-3/8"
              onClick={() => handleSort("email")}
            >
              Email{" "}
              <ArrowUpDown
                className={`inline-block w-4 h-4 ml-1 ${
                  sortConfig?.key === "email" ? "text-black" : "text-gray-400"
                }`}
              />
            </TableHead>
            <TableHead className="w-2/8">Rôle</TableHead>
            <TableHead className="text-right w-1/8">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium w-2/8">{user.name}</TableCell>
              <TableCell className="text-gray-500 w-3/8">{user.email}</TableCell>
              <TableCell className="w-2/8">{user.role}</TableCell>
              <TableCell className="text-right w-1/8">
                <div className="inline-flex justify-end w-full">
                  <Ellipsis className="cursor-pointer" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end mt-2 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="pagination-previous"
        >
          Précédent
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-[34px] aspect-square border-bleu border rounded-md ${
              currentPage === i + 1
                ? "bg-bleu text-white"
                : "hover:bg-bleu/10 cursor-pointer"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="pagination-next"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
