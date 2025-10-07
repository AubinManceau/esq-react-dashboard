"use client";
import { useState } from "react";
import { Upload, Plus, Trash2 } from "lucide-react";
import { bulkSignup, signup } from "../../../../lib/auth";
import Papa from "papaparse";
import rolesList from "@/lib/roles";
import categoriesList from "@/lib/categories";

export default function UtilisateursInscriptions() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [globalError, setGlobalError] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [licence, setLicence] = useState("");
    const [licenceError, setLicenceError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [roles, setRoles] = useState([{ roleId: null, categoryId: null }]);
    const [rolesError, setRolesError] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAddRole = () => {
        setRoles([...roles, { roleId: null, categoryId: null }]);
    };

    const handleRemoveRole = (index) => {
        setRoles(roles.filter((_, i) => i !== index));
    };

    const handleChangeRole = (index, field, value) => {
        const updated = [...roles];
        updated[index][field] = value;
        if (field === "roleId" && value !== 1 && value !== 2) {
            updated[index].categoryId = null;
        }
        setRoles(updated);
    };

    const handleChangeCategory = (index, value) => {
        const updated = [...roles];
        updated[index].categoryId = value;
        setRoles(updated);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const addUser = async (e) => {
        e.preventDefault();

        setLoading(true);

        setEmailError("");
        setPhoneError("");
        setFirstNameError("");
        setLastNameError("");
        setRolesError("");
        setLicenceError("");
        setGlobalError("");

        let hasError = false;
        if (!email) {
            setEmailError("Le champ email est requis.");
            hasError = true;
        }
        if (!firstName) {
            setFirstNameError("Le champ prénom est requis.");
            hasError = true;
        }
        if (!lastName) {
            setLastNameError("Le champ nom est requis.");
            hasError = true;
        }
        if (roles.length === 0 || roles.some(role => !role.roleId || ((role.roleId === 1 || role.roleId === 2) && !role.categoryId))) {
            setRolesError("Au moins un rôle valide est requis.");
            hasError = true;
        }
        if (hasError) {
            setLoading(false);
            return;
        }

        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            licence: licence,
            rolesCategories: roles,
        };

        const res = await signup(data);
        if (res?.status === "success") {
            setEmail("");
            setPhone("");
            setFirstName("");
            setLastName("");
            setLicence("");
            setRoles([{ roleId: null, categoryId: null }]);
        } else {
            setGlobalError("Erreur lors de l'ajout de l'utilisateur.");
        }
        setLoading(false);
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
        e.preventDefault();
        console.log("Adding users...");

        try {
            const res = await bulk(file);
            if (res.status === "success") {
                setFile(null);
                console.log("Import réussi !");
            } else {
                console.warn("Erreur lors de l’import :", res);
            }
        } catch (error) {
            console.error("Erreur bulk signup :", error);
        }
    };

    return (
        <div className="admin-users">
            <div className="lg:mb-8">
                <h1 className="text-orange max-lg:hidden !font-default-bold">Utilisateurs</h1>
            </div>

            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 px-2 py-2 md:px-8 md:py-8 bg-white border-1 border-black/5 rounded-[10px] shadow-sm mb-8 md:mb-0 md:mr-4">
                    <form className="register-form">
                        <div className="flex flex-col gap-4">
                            <div className="flex max-md:flex-col gap-4 w-full">
                                <div className="md:w-[calc(50%-0.5rem)]">
                                    <div className={`flex flex-col relative ${firstName ? "focused" : ""}`}>
                                        <label htmlFor="first-name">Prénom <span className="text-orange">*</span></label>
                                        <input
                                            type="text"
                                            id="first-name"
                                            required
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    {firstNameError && <p className="error-message mt-1">{firstNameError}</p>}
                                </div>
                                <div className="md:w-[calc(50%-0.5rem)]">
                                    <div className={`flex flex-col relative ${lastName ? "focused" : ""}`}>
                                        <label htmlFor="last-name">Nom <span className="text-orange">*</span></label>
                                        <input
                                            type="text"
                                            id="last-name"
                                            required
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    {lastNameError && <p className="error-message mt-1">{lastNameError}</p>}
                                </div>
                            </div>

                            <div>
                                <div className={`flex flex-col relative ${email ? "focused" : ""}`}>
                                    <label htmlFor="email">Email <span className="text-orange">*</span></label>
                                    <input
                                    type="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                {emailError && <p className="error-message mt-1">{emailError}</p>}
                            </div>

                            <div>
                                <div className={`flex flex-col relative ${phone ? "focused" : ""}`}>
                                    <label htmlFor="phone">Téléphone</label>
                                    <input
                                    type="tel"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                {phoneError && <p className="error-message mt-1">{phoneError}</p>}
                            </div>

                            <div>
                                <div className={`flex flex-col relative ${licence ? "focused" : ""}`}>
                                    <label htmlFor="licence">N° de licence</label>
                                    <input
                                    type="text"
                                    id="licence"
                                    value={licence}
                                    onChange={(e) => setLicence(e.target.value)}
                                    />
                                </div>
                                {licenceError && <p className="error-message mt-1">{licenceError}</p>}
                            </div>
                            <div>
                                <div className="flex flex-col gap-3 p-4 border rounded-[5px]">
                                    {roles.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center gap-3 bg-orange/5 p-2 rounded-[5px]">
                                        <select
                                        value={item.roleId || ""}
                                        onChange={(e) =>
                                            handleChangeRole(index, "roleId", Number(e.target.value))
                                        }
                                        className="border rounded px-2 py-1 w-1/2"
                                        >
                                            <option value={null}>Sélectionner un rôle</option>
                                            {rolesList.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                            ))}
                                        </select>

                                        {(item.roleId === 1 || item.roleId === 2) && (
                                        <select
                                            value={item.categoryId || ""}
                                            onChange={(e) =>
                                            handleChangeCategory(index, Number(e.target.value))
                                            }
                                            className="border rounded px-2 py-1 w-1/2"
                                        >
                                            <option value={null}>Sélectionner une catégorie</option>
                                            {categoriesList.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                            ))}
                                        </select>
                                        )}

                                        <button type="button" onClick={() => handleRemoveRole(index)} className="w-[35px] flex items-center justify-center cursor-pointer">
                                            <Trash2 className="text-orange" />
                                        </button>
                                    </div>
                                    ))}

                                    <button
                                    type="button"
                                    onClick={handleAddRole}
                                    className="text-orange flex items-center gap-1 cursor-pointer hover:underline"
                                    >
                                    <Plus />
                                    Ajouter un rôle
                                    </button>
                                </div>
                                {rolesError && <p className="error-message mt-1">{rolesError}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col items-center mt-6">
                            {globalError && <p className="error-message text-center mb-2">{globalError}</p>}
                            <button type="button" className="btn flex items-center justify-center gap-2 w-full" onClick={addUser}>
                                {loading && (
                                    <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                )}
                                {loading ? "" : "Inscrire l'utilisateur"}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="md:w-1/2 px-2 py-2 md:px-8 md:py-8 bg-white border-1 border-black/5 rounded-[10px] shadow-sm md:ml-4">
                    <form className="register-form">
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
                        <button type="button" className="btn mt-6 w-full" onClick={addUsers}>
                            Inscrire les utilisateurs
                        </button>
                    </form>
                </div>
            </div>    
        </div>
    );
}
