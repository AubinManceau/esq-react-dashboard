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

const users = [
  { id: 1, name: "Alice Dupont", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Martin", email: "bob@example.com", role: "Utilisateur" },
  { id: 3, name: "Charlie Petit", email: "charlie@example.com", role: "Modérateur" },
  { id: 4, name: "David Moreau", email: "david@example.com", role: "Utilisateur" },
  { id: 5, name: "Emma Leblanc", email: "emma@example.com", role: "Admin" },
  { id: 6, name: "Franck Dupuis", email: "franck@example.com", role: "Modérateur" },
];

export default function Utilisateurs() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredUsers = users.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter ? user.role === roleFilter : true;
    return matchesName && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-users p-4">
      <h1 className="text-2xl font-bold mb-4">Utilisateurs</h1>

      <div className="flex mb-4 gap-4">
        <input
          type="text"
          className="input"
          placeholder="Rechercher par nom..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="input"
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

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rôle</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <button className="mr-2">Éditer</button>
                <button>Supprimer</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Précédent
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
