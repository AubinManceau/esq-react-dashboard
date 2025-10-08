export default function InscriptionPage({ searchParams }) {
  const token = searchParams?.token || null;

  return (
    <div>
      <h1>Inscription</h1>
      <p>Token reçu : {token}</p>
    </div>
  );
}