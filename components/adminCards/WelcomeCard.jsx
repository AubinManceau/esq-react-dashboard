"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function WelcomeCard() {
  const { userInfos } = useAuth();
  
  const userName = () => {
    const first = userInfos?.user?.firstName || "";
    const last = userInfos?.user?.lastName || "";
    return (first + " " + last).trim() || "Utilisateur";
  };

  return (
    <div className="welcome-card lg:h-2/8 h-full">
        <h2 className="!mb-6">
            <span>Bonjour,</span> {userName()} !
        </h2>
        <p>Bienvenue sur votre tableau de bord.</p>
        <p>Cet espace est dédié à la gestion des membres de l'Etoile Sportive Quelainaise.</p>
    </div>
  );
}