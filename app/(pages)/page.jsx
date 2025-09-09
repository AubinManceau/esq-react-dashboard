import NavBar from "../components/NavBar";

export const metadata = {
  title: 'Accueil | Etoile Sportive Quelainaise',
  description: 'Bienvenue sur le site officiel de l\'Etoile Sportive Quelainaise',
}

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex flex-col items-center justify-center bg-gray-100 p-4">
        <h2 className="text-3xl font-bold mb-4">Bienvenue à l'Etoile Sportive Quelainaise</h2>
        <p className="text-lg text-center max-w-2xl">
          Nous sommes ravis de vous accueillir sur le site officiel de notre club. Découvrez nos équipes, nos événements et rejoignez-nous pour partager la passion du sport !
        </p>
      </main>
    </>
  );
}
