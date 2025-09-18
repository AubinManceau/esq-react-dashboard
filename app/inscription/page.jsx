'use client';

import { useSearchParams } from 'next/navigation';

export default function InscriptionPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return (
    <div>
      <h1>Inscription</h1>
      <p>Token reçu : {token}</p>
    </div>
  );
}
