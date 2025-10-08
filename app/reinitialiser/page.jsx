export default function ReinitialiserPage({ searchParams }) {
  const token = searchParams?.token || null;

  return (
    <div>
      <h1>Réinitialiser le mot de passe</h1>
      <p>Token reçu : {token}</p>
    </div>
  );
}
