"use client";
import { useState } from "react";
import { Upload, Plus, Trash2 } from "lucide-react";
import { signup } from "../../../../lib/auth";

export default function UtilisateursInscriptions() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [globalError, setGlobalError] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [roles, setRoles] = useState([{ roleId: null, categoryId: null }]);
    const [rolesError, setRolesError] = useState("");
    const [fileName, setFileName] = useState(null);
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
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            console.log("Fichier sélectionné :", file.name);
        }
    };

    const addUser = async (e) => {
        e.preventDefault();

        setLoading(true);

        setEmailError("");
        setPhoneError("");
        setFirstNameError("");
        setLastNameError("");
        setRolesError("");
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
            rolesCategories: roles,
        };

        const res = await signup(data);
        if (res?.status === "success") {
            setEmail("");
            setPhone("");
            setFirstName("");
            setLastName("");
            setRoles([{ roleId: null, categoryId: null }]);
        } else {
            setGlobalError("Erreur lors de l'ajout de l'utilisateur.");
        }
        setLoading(false);
    };

    const addUsers = (e) => {
        e.preventDefault();
        console.log("Ajouter plusieurs utilisateurs via fichier CSV");
    }

    return (
        <div className="admin-users">
            <div className="mb-8">
                <h1 className="text-orange max-lg:hidden !font-default-bold">Utilisateurs</h1>
            </div>

            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 px-2 py-2 md:px-8 md:py-8 bg-white border-1 border-black/5 rounded-[10px] shadow-sm mb-8 md:mb-0 md:mr-4">
                    <form className="register-form">
                        <div className="flex flex-col gap-4">
                            <div className="flex max-md:flex-col gap-4 w-full">
                                <div className="md:w-[calc(50%-0.5rem)]">
                                    <div className={`flex flex-col relative ${firstName ? "focused" : ""}`}>
                                        <label htmlFor="first-name">Prénom</label>
                                        <input
                                            type="text"
                                            id="first-name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    {firstNameError && <p className="error-message mt-1">{firstNameError}</p>}
                                </div>
                                <div className="md:w-[calc(50%-0.5rem)]">
                                    <div className={`flex flex-col relative ${lastName ? "focused" : ""}`}>
                                        <label htmlFor="last-name">Nom</label>
                                        <input
                                            type="text"
                                            id="last-name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    {lastNameError && <p className="error-message mt-1">{lastNameError}</p>}
                                </div>
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
                                <div className={`flex flex-col relative ${email ? "focused" : ""}`}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                {emailError && <p className="error-message mt-1">{emailError}</p>}
                            </div>
                            <div>
                                <div className="flex flex-col gap-3 p-4 border rounded-[5px]">
                                    {roles.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center gap-3 bg-orange/5 p-2 rounded-[5px]">
                                        <select
                                        value={item.roleId}
                                        onChange={(e) =>
                                            handleChangeRole(index, "roleId", Number(e.target.value))
                                        }
                                        className="border rounded px-2 py-1 w-1/2"
                                        >
                                        <option value={null}>Sélectionner un rôle</option>
                                        <option value={1}>Joueur</option>
                                        <option value={2}>Coach</option>
                                        <option value={3}>Membre</option>
                                        <option value={4}>Admin</option>
                                        </select>

                                        {(item.roleId === 1 || item.roleId === 2) && (
                                        <select
                                            value={item.categoryId}
                                            onChange={(e) =>
                                            handleChangeCategory(index, Number(e.target.value))
                                            }
                                            className="border rounded px-2 py-1 w-1/2"
                                        >
                                            <option value={null}>Sélectionner une catégorie</option>
                                            <option value={1}>U7</option>
                                            <option value={2}>U9</option>
                                            <option value={3}>U11</option>
                                            <option value={4}>U13</option>
                                            <option value={5}>U15</option>
                                            <option value={6}>U18</option>
                                            <option value={7}>Seniors</option>
                                            <option value={8}>Vétérans</option>
                                            <option value={9}>Futsal</option>
                                            <option value={10}>Féminines</option>
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
                            <button className="btn flex items-center justify-center gap-2 w-full" onClick={addUser}>
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
                            { fileName ? (
                                <>
                                    <p className="mb-2">{fileName}</p>
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
                        <button className="btn mt-6 w-full" onClick={addUsers}>
                            Inscrire les utilisateurs
                        </button>
                    </form>
                </div>
            </div>    
        </div>
    );
}
