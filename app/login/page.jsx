"use client";

import { useState } from "react";
import { login } from "../../lib/auth";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [globalError, setGlobalError] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        setGlobalError("");
        setLoading(true);

        if (forgotPassword) {
            if (!email) {
                setEmailError("Le champ email est requis.");
                setLoading(false);
                return;
            }

            setGlobalError("Si l'adresse existe, un email de réinitialisation a été envoyé.");
            setLoading(false);
            return;
        }

        let hasError = false;
        if (!email) {
            setEmailError("Le champ email est requis.");
            hasError = true;
        }
        if (!password) {
            setPasswordError("Le champ mot de passe est requis.");
            hasError = true;
        }
        if (hasError) {
            setLoading(false);
            return;
        }

        const res = await login(email, password);
        if (res?.status === "success") {
            router.push("/admin");
        } else {
            setGlobalError("Email ou mot de passe incorrect.");
        }
        setLoading(false);
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
                                <div>
                                    <div className="flex flex-col relative">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onFocus={(e) => e.target.parentNode.classList.add("focused")}
                                            onBlur={(e) => {if (!e.target.value) e.target.parentNode.classList.remove("focused")}}
                                            disabled={loading}
                                        />
                                    </div>
                                    {emailError && <p className="error-message mt-1">{emailError}</p>}
                                </div>
                                <div>
                                    <div className="flex flex-col relative">
                                        <label htmlFor="password">Mot de passe</label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onFocus={(e) => e.target.parentNode.classList.add("focused")}
                                            onBlur={(e) => {if (!e.target.value) e.target.parentNode.classList.remove("focused")}}
                                            autoComplete="off"
                                            disabled={loading}
                                        />
                                    </div>
                                    {passwordError && <p className="error-message mt-1">{passwordError}</p>}
                                </div>
                                <p className="forgot-password" onClick={() => {setForgotPassword(true); setEmailError(""); setPasswordError(""); setGlobalError("");}}>Mot de passe oublié ?</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className="text-white">Réinitialiser son mot de passe</h2>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <div className="flex flex-col relative">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onFocus={(e) => e.target.parentNode.classList.add("focused")}
                                            onBlur={(e) => {if (!e.target.value) e.target.parentNode.classList.remove("focused")}}
                                            disabled={loading}
                                        />
                                    </div>
                                    {emailError && <p className="error-message mt-1">{emailError}</p>}
                                </div>
                                <p className="forgot-password" onClick={() => {setForgotPassword(false); setEmailError(""); setPasswordError(""); setGlobalError("");}}>Se connecter</p>
                            </div>
                        </>
                    )}
                    <div className="flex flex-col items-center">
                        {globalError && <p className="error-message mb-4 text-center">{globalError}</p>}
                        <button
                            type="submit"
                            className="btn flex items-center justify-center gap-2 w-full"
                            disabled={loading}
                        >
                            {loading && (
                                <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            )}
                            {loading ? "" : (forgotPassword ? "Réinitialiser" : "Se connecter")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
