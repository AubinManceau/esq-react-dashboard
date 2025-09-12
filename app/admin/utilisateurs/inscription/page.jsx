"use client";
import { useState } from "react";

export default function UtilisateursInscriptions() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roles, setRoles] = useState([{ roleId: "", category: "" }]);

  const handleAddRole = () => {
    setRoles([...roles, { roleId: "", category: "" }]);
  };

  const handleRemoveRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  const handleChangeRole = (index, field, value) => {
    const updated = [...roles];
    updated[index][field] = value;
    if (field === "roleId" && value !== "3" && value !== "4") {
      updated[index].category = "";
    }
    setRoles(updated);
  };

  const handleChangeCategory = (index, value) => {
    const updated = [...roles];
    updated[index].category = value;
    setRoles(updated);
  };

  return (
    <div className="admin-users">
      <div className="flex items-center lg:justify-between">
        <div>
          <h1 className="text-orange max-lg:hidden !font-default-bold">Utilisateurs</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-full">
        <div className="lg:w-1/2 h-full lg:border-r border-red-300 lg:pr-8 lg:py-8">
          <form className="register-form">
            <div className="flex flex-col gap-4">
              {/* Infos utilisateur */}
              <div className="flex max-lg:flex-col gap-4 w-full">
                <div className="flex flex-col relative lg:w-1/2">
                  <label htmlFor="first-name">Prénom</label>
                  <input
                    type="text"
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={(e) => e.target.parentNode.classList.add("focused")}
                    onBlur={(e) => {if (!e.target.value) e.target.parentNode.classList.remove("focused")}}
                  />
                </div>
                <div className="flex flex-col relative lg:w-1/2">
                  <label htmlFor="last-name">Nom</label>
                  <input
                    type="text"
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={(e) => e.target.parentNode.classList.add("focused")}
                    onBlur={(e) => {if (!e.target.value) e.target.parentNode.classList.remove("focused")}}
                  />
                </div>
              </div>

              <div className="flex flex-col relative">
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={(e) => e.target.parentNode.classList.add("focused")}
                  onBlur={(e) => {if (!e.target.value) e.target.parentNode.classList.remove("focused")}}
                />
              </div>

              <div className="flex flex-col relative">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={(e) => e.target.parentNode.classList.add("focused")}
                  onBlur={(e) => {if (!e.target.value) e.target.parentNode.classList.remove("focused")}}
                />
              </div>

              {/* 🔹 Répétiteur des rôles */}
              <div className="flex flex-col gap-3 p-4 border rounded-[5px]">
                {roles.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {/* Select rôle */}
                    <select
                      value={item.roleId}
                      onChange={(e) =>
                        handleChangeRole(index, "roleId", e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="">Sélectionner un rôle</option>
                      <option value="1">Admin</option>
                      <option value="2">Membre</option>
                      <option value="3">Joueur</option>
                      <option value="4">Coach</option>
                    </select>

                    {/* Select catégorie si joueur (3) ou coach (4) */}
                    {(item.roleId === "3" || item.roleId === "4") && (
                      <select
                        value={item.category}
                        onChange={(e) =>
                          handleChangeCategory(index, e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="">Sélectionner une catégorie</option>
                        <option value="1">U7</option>
                        <option value="2">U9</option>
                        <option value="3">U11</option>
                        <option value="4">U13</option>
                        <option value="5">U15</option>
                        <option value="6">U18</option>
                        <option value="7">Seniors</option>
                        <option value="8">Vétérans</option>
                        <option value="9">Féminines</option>
                      </select>
                    )}

                    {/* Supprimer un rôle */}
                    {roles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRole(index)}
                        className="text-red-500 hover:underline"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                ))}

                {/* Ajouter un rôle */}
                <button
                  type="button"
                  onClick={handleAddRole}
                  className="text-blue-600 hover:underline self-start"
                >
                  + Ajouter un rôle
                </button>
              </div>
            </div>
            <button className="btn mt-6 w-full">
              Enregistrer l'utilisateur
            </button>
          </form>
        </div>

        <div className="lg:w-1/2 h-full lg:pl-8 lg:py-8">
            <form className="register-form">
                <div className="flex flex-col gap-4">
                <input
                    type="file"
                    id="csv-upload"
                    accept=".csv"
                    className="h-[150px]"
                    onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        console.log("Fichier sélectionné :", file.name);
                    }
                    }}
                />
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}
