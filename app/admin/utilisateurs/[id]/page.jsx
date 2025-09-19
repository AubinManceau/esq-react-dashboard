"use client";

import { useEffect, useState, use } from "react";
import { getUserById, updateUserByAdmin } from "@/lib/user";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import PhotosCard from "@/components/adminCards/PhotosCard";
import { resendConfirmationEmail } from "@/lib/auth";

export default function DetailsUtilisateur({ params }) {
    const { id } = use(params);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [roles, setRoles] = useState([]);
    const [licence, setLicence] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoCelebration, setPhotoCelebration] = useState(null);
    const [licenceError, setLicenceError] = useState("");
    const [loading, setLoading] = useState(false);
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [rolesError, setRolesError] = useState("");
    const [globalError, setGlobalError] = useState(null);
    const [isActive, setIsActive] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const user = await getUserById(id);
                if (user?.status === "success") {
                    setFirstName(user.data.user.firstName || "");
                    setLastName(user.data.user.lastName || "");
                    setEmail(user.data.user.email || "");
                    setPhone(user.data.user.phone || "");
                    setPhoto(user.data.user.photo || null);
                    setPhotoCelebration(user.data.user.photo_celebration || null);
                    setLicence(user.data.user.licence || "");
                    setRoles(user.data.user.UserRolesCategories || []);
                    setIsActive(user.data.user.isActive || false);
                } else {
                    setGlobalError("Impossible de charger l'utilisateur.");
                }
            } catch (err) {
                setGlobalError("Erreur lors de la récupération de l'utilisateur.");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleAddRole = () => {
        setRoles([...roles, { roleId: null, categoryId: null }]);
    };

    const handleRemoveRole = (index) => {
        setRoles(roles.filter((_, i) => i !== index));
    };

    const handleChangeRole = (index, field, value) => {
        const updated = [...roles];
        updated[index][field] = Number(value);
        if (field === "roleId" && value !== 1 && value !== 2) {
            updated[index].categoryId = null;
        }
        setRoles(updated);
    };

    const handleChangeCategory = (index, value) => {
        const updated = [...roles];
        updated[index].categoryId = Number(value);
        setRoles(updated);
    };

    const updateUser = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        if (phone) formData.append("phone", phone);
        if (licence) formData.append("licence", licence);
        formData.append("isActive", isActive);
        roles.forEach((role, index) => {
            formData.append(`rolesCategories[${index}][roleId]`, Number(role.roleId));
            if (role.categoryId) {
                formData.append(`rolesCategories[${index}][categoryId]`, Number(role.categoryId));
            }
        });

        const res = await updateUserByAdmin(id, formData);
        if (res?.status === "success") {
            router.push("/admin/utilisateurs");
        } else {
            setGlobalError("Erreur lors de la mise à jour de l'utilisateur.");
        }
        setLoading(false);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const desactiverUser = async () => {
        const formData = new FormData();
        formData.append("isActive", false);

        const res = await updateUserByAdmin(id, formData);
        if (res?.status === "success") {
            router.push("/admin/utilisateurs");
        }
        handleModalClose();
    };

    const sendActivationEmail = async () => {
        setLoading(true);
        const res = await resendConfirmationEmail(id);
        if (res?.status === "success") {
            router.push("/admin/utilisateurs");
        }
        handleModalClose();
        setLoading(false);
    };


    return (
        <>
        {openModal && (
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                onClick={handleModalClose}
            >
                <div
                    className="bg-white rounded-lg py-6 px-12 max-w-xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2>{isActive ? "Désactiver l'utilisateur" : "Envoyer un email d'activation"}</h2>
                    <p className="mb-10">
                    Êtes-vous bien sûr de vouloir {isActive ? "désactiver" : "envoyer un email d'activation"} cet utilisateur ?
                    </p>
                    <div className="flex justify-end gap-4">
                    <button
                        className="btn !bg-gray-300 hover:!bg-gray-400 !text-black"
                        onClick={handleModalClose}
                    >
                        Annuler
                    </button>
                    <button className="btn" onClick={isActive ? desactiverUser : sendActivationEmail}>
                        {isActive ? "Désactiver" : "Envoyer l'email"}
                    </button>
                    </div>
                </div>
            </div>
        )}
        <div className="admin-users">
            <div className="flex items-center lg:justify-between lg:mb-8">
                <h1 className="text-orange max-lg:hidden !font-default-bold">Utilisateurs</h1>
                <div className="flex max-lg:flex-col gap-2 max-lg:w-full">
                    {isActive ? (
                        <button className="btn" onClick={() => setOpenModal(true)}>
                            Désactiver l'utilisateur
                        </button>
                    ) : (
                        <button className="btn" onClick={() => setOpenModal(true)}>
                            Envoyer un email d'activation
                        </button>
                    )}
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 w-full h-full">
                <div className="lg:w-7/10 md:p-6 p-2 shadow-md rounded-[10px] lg:rounded-[15px] border-1 border-black/5">
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
                                    value={phone || ""}
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
                                    value={licence || ""}
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
                            <button className="btn flex items-center justify-center gap-2 w-full" onClick={updateUser}>
                                {loading && (
                                    <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                )}
                                {loading ? "" : "Modifier l'utilisateur"}
                            </button>
                        </div>
                    </form>
                </div>
                <PhotosCard user={{ id, photo, photoCelebration }} />
            </div>
        </div>
        </>
    );
}
