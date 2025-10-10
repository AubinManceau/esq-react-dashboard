"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { bulkSignup } from "@/lib/auth";
import Papa from "papaparse";
import CustomAlert from "@/components/CustomAlert";

export default function BulkUserForm() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const bulk = (file) => {
        return new Promise((resolve, reject) => {
            if (!file) {
                return reject({ status: "error", message: "Aucun fichier sélectionné." });
            }

            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: async (results) => {
                    if (!results || !results.data) {
                        return reject({ status: "error", message: "Fichier vide ou illisible." });
                    }
                    try {
                        const users = results.data.map((row, index) => {
                            let rolesCategories = [];
                            try {
                                const cleaned = row.rolesCategories.replace(/""/g, '"');
                                rolesCategories = JSON.parse(cleaned || "[]");
                            } catch (e) {
                                throw new Error(`Ligne ${index + 2} : rolesCategories invalide (${row.rolesCategories})`);
                            }

                            return {
                                firstName: row.firstName?.trim() || null,
                                lastName: row.lastName?.trim() || null,
                                email: row.email?.trim() || null,
                                phone: row.phone?.trim() || null,
                                licence: row.licence?.trim() || null,
                                rolesCategories
                            };
                        });

                        const res = await bulkSignup(users);
                        resolve(res);
                    } catch (error) {
                        reject({
                            status: "error",
                            message: `Erreur lors du traitement des données : ${error.message}`
                        });
                    }
                },
                error: () => {
                    reject({ status: "error", message: "Erreur lors de la lecture du fichier." });
                },
            });
        });
    };

    const addUsers = async (e) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        e.preventDefault();

        try {
            const res = await bulk(file);
            if (res.status === "success") {
                setFile(null);
                setSuccess("Utilisateurs inscrits avec succès.");
            } else {
                setError("Erreur lors de l’import : " + res.message);
            }
        } catch (error) {
            setError("Erreur bulk signup : " + error.message);
        }
        setLoading(false);
    };

    return (
        <>
            {error && <CustomAlert type="destructive" title="Erreur" description={error} />}
            {success && <CustomAlert type="success" title="Succès" description={success} />}
            <form className="register-form" onSubmit={addUsers}>
                <div className="relative h-[250px] flex flex-col items-center justify-center border-2 border-dashed border-orange rounded-xl cursor-pointer hover:bg-orange/10 transition">
                    <input
                        type="file"
                        id="file-upload"
                        accept=".csv"
                        className="opacity-0 absolute w-full h-full cursor-pointer"
                        onChange={handleFileChange}
                    />
                    { file ? (
                        <>
                            <p className="mb-2">{file.name}</p>
                            <p className="text-gray-500">OU</p>
                            <p className="btn mt-2 !px-4 !py-2">Changer de fichier</p>
                        </>
                    ) : (
                    <>
                        <Upload className="w-12 h-12 text-orange mb-2" />
                        <p className="text-gray-700 font-medium">Déposer le fichier ici</p>
                        <p className="text-gray-500">OU</p>
                        <p className="btn mt-2 !px-4 !py-2">Télécharger le fichier</p>
                        <p className="mt-2 text-xs text-gray-400">Format CSV uniquement</p>
                    </>
                    )}
                </div>
                <div className="flex flex-col items-center mt-6">
                    <button type="submit" className="btn flex items-center justify-center gap-2 w-full">
                        {loading ? (
                            <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            "Inscrire les utilisateurs"
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}