"use client";

import { useState } from "react";
import { login } from "../../utils/auth";
import { redirect } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!forgotPassword) {
            const res = await login(email, password);
            if (res) {
                redirect("/admin");
            } else {
                setError("Email ou mot de passe incorrect.");
            }
            setLoading(false);
        } else {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col lg:flex-row justify-center gap-12 items-center min-h-screen px-4 bg-[url('../public/bg-login.jpg')] bg-cover bg-center relative">
            <div className="absolute top-0 left-0 bg-bleu/85 w-full h-full"></div>
            <h1 className="lg:max-w-[18ch] text-white z-1">Accès réservé, admins de l'<span>ESQ</span> seulement.</h1>
            <div className="bg-white/20 rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/40 px-4 lg:px-10 py-6 lg:py-16 lg:h-[500px] h-[350px] w-full max-w-[600px] z-1">
                <form className="flex flex-col justify-between h-full" onSubmit={handleSubmit}>
                    {!forgotPassword ? (
                        <>
                            <h2 className="text-white">Se connecter</h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col relative">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={(e) => e.target.parentNode.classList.add("focused")} onBlur={(e) => {if (!e.target.value) e.target.parentNode.classList.remove("focused")}} disabled={loading} />
                                </div>
                                <div className="flex flex-col relative">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={(e) => e.target.parentNode.classList.add("focused")} onBlur={(e) => {if (!e.target.value) e.target.parentNode.classList.remove("focused")}} disabled={loading} />
                                </div>
                                <p className="forgot-password" onClick={() => setForgotPassword(true)}>Mot de passe oublié ?</p>
                                {error && <p className="text-red-500">{error}</p>}
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-white">Réinitialiser son mot de passe</h2>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col relative">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={(e) => e.target.parentNode.classList.add("focused")} onBlur={(e) => {if (!e.target.value) e.target.parentNode.classList.remove("focused")}} disabled={loading} />
                                </div>
                                <p className="forgot-password" onClick={() => setForgotPassword(false)}>Se connecter</p>
                                {error && <p className="text-red-500">{error}</p>}
                            </div>
                        </>
                    )}
                    <button
                        type="submit"
                        className="btn flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading && (
                            <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        )}
                        {loading ? "" : (forgotPassword ? "Réinitialiser" : "Se connecter")}
                    </button>
                </form>
            </div>
        </div>
    );
}
