"use client";

import { useState } from "react";
import rolesList from "@/lib/roles";
import categoriesList from "@/lib/categories";
import { Plus, Trash2 } from "lucide-react";
import { signup } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { updateUserByAdmin } from "@/lib/user";
import CustomAlert from "./CustomAlert";

export default function UserForm({ id = null, initialFirstName = "", initialLastName = "", initialEmail = "", initialPhone = "", initialLicence = "", initialRoles = [] }) {
    const router = useRouter();
    const isEditMode = Boolean(id);

    const [email, setEmail] = useState(initialEmail);
    const [emailError, setEmailError] = useState("");
    const [globalError, setGlobalError] = useState("");
    const [success, setSuccess] = useState("");
    const [phone, setPhone] = useState(initialPhone);
    const [phoneError, setPhoneError] = useState("");
    const [licence, setLicence] = useState(initialLicence);
    const [licenceError, setLicenceError] = useState("");
    const [firstName, setFirstName] = useState(initialFirstName);
    const [firstNameError, setFirstNameError] = useState("");
    const [lastName, setLastName] = useState(initialLastName);
    const [lastNameError, setLastNameError] = useState("");
    const [roles, setRoles] = useState(initialRoles.length ? initialRoles : [{ roleId: null, categoryId: null }]);
    const [rolesError, setRolesError] = useState("");
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");
        setPhoneError("");
        setFirstNameError("");
        setLastNameError("");
        setRolesError("");
        setLicenceError("");
        setGlobalError("");
        setLoading(true);
        setSuccess("");

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

        try {
            let res;
            if (isEditMode) {
                const formData = new FormData();
                formData.append("firstName", firstName);
                formData.append("lastName", lastName);
                formData.append("email", email);
                if (phone) formData.append("phone", phone);
                if (licence) formData.append("licence", licence);

                roles.forEach((role, i) => {
                    formData.append(`rolesCategories[${i}][roleId]`, Number(role.roleId));
                    if (role.categoryId) {
                        formData.append(`rolesCategories[${i}][categoryId]`, Number(role.categoryId));
                    }
                });
                res = await updateUserByAdmin(id, formData);
            } else {
                const data = { firstName, lastName, email, phone, licence, rolesCategories: roles };
                res = await signup(data);
            }
            if (res?.status === "success") {
                setLoading(false);
                setSuccess(isEditMode ? "Utilisateur mis à jour avec succès." : "Utilisateur inscrit avec succès.");
                if (!isEditMode) {
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setPhone("");
                    setLicence("");
                    setRoles([{ roleId: null, categoryId: null }]);
                }
            } else {
                setGlobalError("Vous n'êtes pas autorisé à effectuer cette action.");
            }
        } catch (err) {
            console.error(err);
            setGlobalError("Une erreur est survenue.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            {globalError && <CustomAlert type="error" title="Erreur" description={globalError} />}
            {success && <CustomAlert type="success" title="Succès" description={success} />}
            <form className="register-form" onSubmit={handleSubmit}>
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
                                    onFocus={(e) => e.target.parentNode.classList.add("focused")}
                                    onBlur={(e) => {if (!e.target.value) e.target.parentNode.classList.remove("focused")}}
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
                                    onFocus={(e) => e.target.parentNode.classList.add("focused")}
                                    onBlur={(e) => {if (!e.target.value) e.target.parentNode.classList.remove("focused")}}
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
                            onFocus={(e) => e.target.parentNode.classList.add("focused")}
                            onBlur={(e) => {if (!e.target.value) e.target.parentNode.classList.remove("focused")}}
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
                            onFocus={(e) => e.target.parentNode.classList.add("focused")}
                            onBlur={(e) => {if (!e.target.value) e.target.parentNode.classList.remove("focused")}}
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
                            onFocus={(e) => e.target.parentNode.classList.add("focused")}
                            onBlur={(e) => {if (!e.target.value) e.target.parentNode.classList.remove("focused")}}
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
                                    <option value="">Sélectionner un rôle</option>
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
                                    <option value="">Sélectionner une catégorie</option>
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
                    <button type="submit" className="btn flex items-center justify-center gap-2 w-full">
                        {loading ? (
                            <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            isEditMode ? "Mettre à jour l'utilisateur" : "Inscrire l'utilisateur"
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}