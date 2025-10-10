"use client";

import { useState } from "react";
import { updateUserByAdmin } from "@/lib/user";
import { useRouter } from "next/navigation";
import { resendConfirmationEmail } from "@/lib/auth";
import CustomAlert from "./CustomAlert";

export default function DeactivateOrResend({ id, isActive }) {
    const [openModal, setOpenModal] = useState(false);
    const [globalError, setGlobalError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleModalClose = () => {
        setOpenModal(false);
    };

    const desactiverUser = async () => {
        setGlobalError("");
        setSuccess("");

        const formData = new FormData();
        formData.append("isActive", false);

        const res = await updateUserByAdmin(id, formData);
        if (res?.status === "success") {
            setSuccess("Utilisateur désactivé avec succès.");
        } else {
            setGlobalError("Une erreur est survenue. Veuillez réessayer.");
        }
        handleModalClose();
    };

    const sendActivationEmail = async () => {
        setGlobalError("");
        setSuccess("");
        
        const res = await resendConfirmationEmail(id);
        if (res?.status === "success") {
            setSuccess("Email de confirmation renvoyé avec succès.");
        } else {
            setGlobalError("Une erreur est survenue. Veuillez réessayer.");
        }
        handleModalClose();
    };

    return (
        <>
        {globalError && <CustomAlert type="error" title="Erreur" description={globalError} />}
        {success && <CustomAlert type="success" title="Succès" description={success} />}
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
        </>
    );
}