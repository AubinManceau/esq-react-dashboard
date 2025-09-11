import WelcomeCard from "../../components/adminCards/WelcomeCard";
import StatsCard from "../../components/adminCards/StatsCard";
import NotifsCard from "../../components/adminCards/NotifsCard";

export default function Dashboard() {
  return (
    <div className="admin-home">
      <div className="flex flex-col gap-8 w-full lg:w-6/10">
        <WelcomeCard />
        <StatsCard />
      </div>

      <div className="flex flex-col gap-8 w-full lg:w-4/10">
        <div className="test-card">
          <h2>??</h2>
        </div>
        <NotifsCard />
      </div>
    </div>
  );
}
