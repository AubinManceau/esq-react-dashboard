"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import CustomAlert from "@/components/CustomAlert";
import { deleteTeam, createTeam, getTeams } from "@/lib/team";
import { getUsers } from "@/lib/user";

export default function Equipes() {
    const [teamName, setTeamName] = useState("");
    const [division, setDivision] = useState("");
    const [coachs, setCoachs] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [activeTab, setActiveTab] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await getTeams();
                if (!data) {
                    setCategories([]);
                    setError("Une erreur est survenue lors du chargement des équipes.");
                } else {
                    const sorted = [...data].sort((a, b) => a.id - b.id);
                    setCategories(sorted);
                    if (!activeTab) {
                        setActiveTab(String(sorted[0]?.id ?? ""));
                    }
                }
            } catch (error) {
                setError("Une erreur est survenue lors du chargement des équipes.");
            }
        };
        fetchTeams();
    }, []);

    useEffect(() => {
        const fetchCoachesByCategory = async () => {
            if (!activeCategory) return;
            try {
                const data = await getUsers({ roles: [2], categories: [activeCategory] });
                if (!data.data) {
                    setUsers([]);
                } else {
                    setUsers(data.data);
                }
            } catch (error) {
                setError("Une erreur est survenue lors du chargement des utilisateurs.");
            }
        };
        fetchCoachesByCategory();
    }, [activeCategory]);

    const handleDelete = async () => {
        setError(null);
        if (!teamToDelete) return;
        try {
            const res = await deleteTeam(teamToDelete);
            if (res?.status === "success") {
                setTeamToDelete(null);
                setDeleteModalOpen(false);
            } else {
                setError("Une erreur est survenue lors de la suppression.");
            }
        } catch (error) {
            setError("Une erreur est survenue lors de la suppression.");
        }
        setTeamToDelete(null);
        setDeleteModalOpen(false);
    }

    const cancelDelete = () => {
        setDeleteModalOpen(false);
    }

    const handleCreate = async () => {
        setError(null);
        try {
            const res = await createTeam({
                name: teamName,
                division: division,
                categoryId: activeCategory,
                userCoachIds: coachs,
            });
            if (res?.status === "success") {
                setCreateModalOpen(false);
                setActiveCategory(null);
            } else {
                setError("Une erreur est survenue lors de la création.");
            }
        } catch (error) {
            setError("Une erreur est survenue lors de la création.");
        }
        setCreateModalOpen(false);
        setActiveCategory(null);
    }

    const cancelCreate = () => {
        setCreateModalOpen(false);
        setActiveCategory(null);
    }

    const capitalize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

    return (
        <>
            {error && <CustomAlert type="error" title="Erreur" description={error} />}
            <div className="admin-teams">
                <div className="flex items-center lg:justify-between mb-10">
                    <div>
                        <h1 className="text-orange max-lg:hidden !font-default-bold">Équipes</h1>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="tabs">
                    <TabsList className="tablist">
                        {categories.map((category) => (
                            <TabsTrigger key={category.id} value={String(category.id)} className="tab">
                                {capitalize(category.name)}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {categories.map((category) => (
                        <TabsContent key={category.id} value={String(category.id)} className="tab-content">
                            <div className="flex justify-between items-center mx-2 mt-2 md:mx-8 md:mt-8">
                                <h3 className="text-orange !font-default-bold uppercase">Équipes {capitalize(category.name)}</h3>
                                <button onClick={() => { setCreateModalOpen(true); setActiveCategory(category.id); }} className="btn">Ajouter une équipe</button>
                            </div>

                            {category.Teams.length === 0 ? (
                                <div className="text-center my-20 text-black/50">
                                    Aucune équipe pour le moment.
                                </div>
                            ) : (
                                <Table className="my-2 md:my-8">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="cursor-pointer select-none w-2/8">
                                                Nom de l'équipe
                                            </TableHead>
                                            <TableHead className="cursor-pointer select-none w-2/8">
                                                Division
                                            </TableHead>
                                            <TableHead className="cursor-pointer select-none w-3/8">
                                                Dirigeant(s)
                                            </TableHead>
                                            <TableHead className="text-right w-1/8">
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {category.Teams.map((team) => (
                                            <TableRow key={team.id}>
                                                <TableCell className="font-medium w-2/8">{team.name}</TableCell>
                                                <TableCell className="w-2/8">{team.division}</TableCell>
                                                <TableCell className="w-3/8">
                                                    {team.Users.length === 0 ? (
                                                        <span className="text-black/50">Aucun dirigeant</span>
                                                    ) : (
                                                        team.Users.map((user, index) => (
                                                            <span key={user.id}>
                                                                {user.firstName} {user.lastName}{index < team.Users.length - 1 ? ', ' : ''}
                                                            </span>
                                                        ))
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right w-1/8">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <div className="inline-flex justify-end px-2 py-1 bg-bleu/5 rounded-md w-fit cursor-pointer">
                                                                <Ellipsis color="black" />
                                                            </div>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuItem>Modifier</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => { setDeleteModalOpen(true); setTeamToDelete(team.id); }}>Supprimer</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
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
                {createModalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                        onClick={cancelCreate}
                    >
                        <div
                            className="bg-white rounded-lg py-6 px-12 max-w-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2>Ajouter une équipe</h2>
                            <div className="mb-10 flex flex-col">
                                <input
                                    type="text"
                                    placeholder="Nom de l'équipe"
                                    className="input"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Division"
                                    className="input mt-4"
                                    value={division}
                                    onChange={(e) => setDivision(e.target.value)}
                                />
                                <select className="input mt-4" value={coachs} onChange={(e) => setCoachs(Array.from(e.target.selectedOptions, option => option.value))} multiple>
                                    <option value="" disabled>Coachs</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    className="btn !bg-gray-300 hover:!bg-gray-400 !text-black"
                                    onClick={cancelCreate}
                                >
                                    Annuler
                                </button>
                                <button className="btn" onClick={handleCreate}>
                                    Créer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
