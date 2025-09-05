export default function Login() {
  return (
    <div className="flex flex-col lg:flex-row justify-center gap-48 items-center min-h-screen max-h-screen bg-red-400">
        <h1 className="max-w-[18ch] text-white">Whatever happens here, <strong>stays</strong> here</h1>
        <div className="bg-white/20 rounded-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/40 px-10 pb-16 pt-8 h-[400px] max-lg:max-w-[300px]">
            <form className="flex flex-col justify-between h-full">
                <h2 className="text-white">Se connecter</h2>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col relative">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email"/>
                    </div>
                    <div className="flex flex-col relative">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" id="password"/>
                    </div>
                    <a href="#" className="flex justify-end text-white">Mot de passe oublié ?</a>
                </div>
                <button type="submit" className="btn">Se connecter</button>
            </form>
        </div>
    </div>
  );
}
