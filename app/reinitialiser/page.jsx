'use client';

import { useSearchParams } from 'next/navigation';

export default function ReinitialiserPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <div>
      <h1>Réinitialiser le mot de passe</h1>
      <p>Token reçu : {token}</p>
    </div>
  );
}
