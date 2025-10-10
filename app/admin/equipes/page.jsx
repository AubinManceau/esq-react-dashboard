"use client";

import categoriesList from "@/lib/categories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CustomAlert from "@/components/CustomAlert";
import { deleteTeam, createTeam, getTeams } from "@/lib/team";

export default function Equipes() {
    const [error, setError] = useState(null);
    const [teams, setTeams] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState(null);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await getTeams();
                if (!data) {
                    setTeams([]);
                    setError("Une erreur est survenue lors du chargement des équipes.");
                } else {
                    setTeams(data);
                }
            } catch (error) {
                setError("Une erreur est survenue lors du chargement des équipes.");
            }
        };
        fetchTeams();
    }, []);

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
            const res = await createTeam();
            if (res?.status === "success") {
                setCreateModalOpen(false);
            } else {
                setError("Une erreur est survenue lors de la création.");
            }
        } catch (error) {
            setError("Une erreur est survenue lors de la création.");
        }
        setCreateModalOpen(false);
    }
    
    const cancelCreate = () => {
        setCreateModalOpen(false);
    }

    return (
        <>
            {error && <CustomAlert type="error" title="Erreur" description={error} />}
            <div className="admin-teams">
                <div className="flex items-center lg:justify-between mb-10">
                    <div>
                    <h1 className="text-orange max-lg:hidden !font-default-bold">Équipes</h1>
                    </div>
                </div>

                <Tabs defaultValue={categoriesList[0]?.id} className="tabs">
                    <TabsList className="tablist">
                        {categoriesList.map((category) => (
                            <TabsTrigger key={category.id} value={category.id} className="tab">{category.name}</TabsTrigger>
                        ))}
                    </TabsList>
                    {categoriesList.map((category) => (
                        <TabsContent key={category.id} value={category.id} className="tab-content">
                            <div className="flex justify-between items-center mx-2 mt-2 md:mx-8 md:mt-8">
                                <h3 className="text-orange !font-default-bold uppercase">Équipes {category.name}</h3>
                                <button onClick={() => setCreateModalOpen(true)} className="btn">Ajouter une équipe</button>
                            </div>
                            {teams.length === 0 ? (
                                <div className="text-center my-20 text-black/50">
                                    Aucune équipe pour le moment.
                                </div>
                            ) : (
                                <Table className="my-2 md:my-8">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead
                                            className="cursor-pointer select-none w-2/8"
                                            >
                                            Nom de l'équipe
                                            </TableHead>
                                            <TableHead
                                            className="cursor-pointer select-none w-2/8"
                                            >
                                            Division
                                            </TableHead>
                                            <TableHead
                                            className="cursor-pointer select-none w-3/8"
                                            >
                                            Dirigeants
                                            </TableHead>
                                            <TableHead className="text-right w-1/8"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {teams.map((team) => (
                                            <TableRow key={team.id}>
                                                <TableCell className="font-medium w-2/8">{team.name}</TableCell>
                                                <TableCell className="w-2/8">{team.division}</TableCell>
                                                <TableCell className="w-3/8">test</TableCell>
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
                            />
                            <input
                                type="text"
                                placeholder="Division"
                                className="input mt-4"
                            />
                            <select className="input mt-4">
                                <option value="" disabled>Coachs</option>
                                <option value="1">Coach 1</option>
                                <option value="2">Coach 2</option>
                                <option value="3">Coach 3</option>
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
                            Supprimer
                        </button>
                        </div>
                    </div>
                    </div>
                )}
            </div>
        </>
    );
}
