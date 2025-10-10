"use client";

import { use, useEffect, useState } from "react";
import UserPhotos from "@/components/adminCards/UserPhotos";
import UserForm from "@/components/UserForm";
import DeactivateOrResend from "@/components/DeactivateOrResend";
import { getUserById } from "@/lib/user";

export default function DetailsUtilisateur({ params }) {
    const { id } = use(params);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [licence, setLicence] = useState("");
    const [roles, setRoles] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [photoCelebration, setPhotoCelebration] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserById(id);
                if (user?.status === "success") {
                    setFirstName(user.data.user.firstName || "");
                    setLastName(user.data.user.lastName || "");
                    setEmail(user.data.user.email || "");
                    setPhone(user.data.user.phone || "");
                    setLicence(user.data.user.licence || "");
                    setRoles(user.data.user.UserRolesCategories || []);
                    setIsActive(user.data.user.isActive || false);
                    setPhoto(user.data.user.photo || null);
                    setPhotoCelebration(user.data.user.photo_celebration || null);
                } else {
                    console.error("Erreur lors de la récupération de l'utilisateur.");
                }
            } catch (err) {
                console.error("Erreur lors de la récupération de l'utilisateur.");
            }
        };
        fetchUser();
    }, [id]);

    return (
        <div className="admin-users">
            <div className="flex items-center lg:justify-between lg:mb-8">
                <h1 className="text-orange max-lg:hidden !font-default-bold">Utilisateurs</h1>
                <DeactivateOrResend id={id} isActive={isActive} />
            </div>
            <div className="flex flex-col lg:flex-row gap-6 w-full h-full">
                <div className="lg:w-7/10 md:p-6 p-2 shadow-md rounded-[10px] lg:rounded-[15px] border-1 border-black/5">
                {firstName !== "" && lastName !== "" && email !== "" && roles.length > 0 &&
                    <UserForm id={id} initialFirstName={firstName} initialLastName={lastName} initialEmail={email} initialPhone={phone} initialLicence={licence} initialRoles={roles} />
                }
                </div>
                <UserPhotos id={id} photo={photo} photoCelebration={photoCelebration} />
            </div>
        </div>
    );
}
