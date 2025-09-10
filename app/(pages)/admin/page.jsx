export default function Dashboard() {
  return (
    <div className="admin-home">
      <div className="flex flex-col gap-6 w-full lg:w-6/10">
        <div className="welcome-card lg:h-2/8 h-full">
          <h2>Bonjour Aubin Manceau</h2>
          <p>Bienvenue sur votre tableau de bord. Cet espace est dédié à la gestion des membres de l'Etoile Sportive Quelainaise. Vous y trouverez toutes les informations nécessaires pour gérer efficacement votre équipe, vos convocations, vos présences, et bien plus encore.</p>
        </div>

        <div className="grid grid-cols-2 s:flex s:flex-row gap-6 lg:h-1/5">
            <div className="number-card">test</div>
            <div className="number-card">test</div>
            <div className="number-card">test</div>
            <div className="number-card">test</div>
        </div>

        <div className="chart-card">
          <h2>Graphique</h2>
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full lg:w-4/10">
        <div className="test-card">
          <h2>??</h2>
        </div>

        <div className="notif-card">
          <h2>Notifications</h2>
        </div>
      </div>
    </div>
  );
}
