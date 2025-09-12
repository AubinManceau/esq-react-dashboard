"use client";

import { useState, useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Ellipsis, ArrowUpDown } from "lucide-react";
import Pagination from "@/components/Pagination";

const users = [
  { id: 1, name: "Alice Dupont", email: "alice@example.com", telephone: '0765763214', role: ['Admin', 'Joueur'] },
  { id: 2, name: "Bob Martin", email: "bob@example.com", telephone: '0765763215', role: ['Joueur'] },
  { id: 3, name: "Charlie Petit", email: "charlie@example.com", telephone: '0765763216', role: ['Membre'] },
  { id: 4, name: "David Moreau", email: "david@example.com", telephone: '0765763217', role: ['Joueur'] },
  { id: 5, name: "Emma Leblanc", email: "emma@example.com", telephone: '0765763218', role: ['Admin'] },
  { id: 6, name: "Franck Dupuis", email: "franck@example.com", telephone: '0765763219', role: ['Coach'] },
  { id: 7, name: "Alice Dupont", email: "alice@example.com", telephone: '0765763220', role: ['Admin'] },
  { id: 8, name: "Bob Martin", email: "bob@example.com", telephone: '0765763221', role: ['Joueur'] },
  { id: 9, name: "Charlie Petit", email: "charlie@example.com", telephone: '0765763222', role: ['Membre'] },
  { id: 10, name: "David Moreau", email: "david@example.com", telephone: '0765763223', role: ['Joueur'] },
  { id: 11, name: "Emma Leblanc", email: "emma@example.com", telephone: '0765763224', role: ['Admin'] },
  { id: 12, name: "Franck Dupuis", email: "franck@example.com", telephone: '0765763225', role: ['Coach'] },
];

export default function Utilisateurs() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);
  const itemsPerPage = 8;

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesName = user.name.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter ? user.role.includes(roleFilter) : true;
      return matchesName && matchesRole;
    });
  }, [search, roleFilter]);

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
      const valueA = a[key]?.toString().toLowerCase?.() ?? "";
      const valueB = b[key]?.toString().toLowerCase?.() ?? "";
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

  return (
    <div className="admin-users">
      <div className="flex items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-orange max-lg:hidden !font-default-bold">Utilisateurs</h1>
        </div>
        { filteredUsers.length > 0 && (
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
                setRoleFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Tous les rôles</option>
              <option value="Admin">Admin</option>
              <option value="Membre">Membre</option>
              <option value="Coach">Coach</option>
              <option value="Joueur">Joueur</option>
            </select>
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
                  <TableCell className="font-medium w-2/8">{user.name}</TableCell>
                  <TableCell className="text-gray-500 w-2/8">{user.email}</TableCell>
                  <TableCell className="w-2/8">{user.telephone}</TableCell>
                  <TableCell className="w-1/8">{user.role.join(", ")}</TableCell>
                  <TableCell className="text-right w-1/8">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <div className="inline-flex justify-end px-2 py-1 bg-bleu/5 rounded-md w-fit cursor-pointer">
                          <Ellipsis color="#000066" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Modifier</DropdownMenuItem>
                        <DropdownMenuItem>Supprimer</DropdownMenuItem>
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
    </div>
  );
}
