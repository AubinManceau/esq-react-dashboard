import WelcomeCard from "../../components/adminCards/WelcomeCard";
import StatsCard from "../../components/adminCards/StatsCard";
import NotifsCard from "../../components/adminCards/NotifsCard";
import Loader from "@/components/Loader";
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <div className="admin-home">
      <div className="flex flex-col gap-8 w-full lg:w-6/10">
        <Suspense fallback={<Loader className="w-full lg:h-2/8 h-full" />}>
          <WelcomeCard />
        </Suspense>
        <Suspense fallback={<Loader className="w-full lg:h-6/8 h-full" />}>
          <StatsCard />
        </Suspense>
      </div>

      <div className="flex flex-col gap-8 w-full lg:w-4/10">
        <div className="test-card">
          <h2>??</h2>
        </div>
        <Suspense fallback={<Loader className="h-[200px] lg:h-3/8 w-full" />}>
          <NotifsCard />
        </Suspense>
      </div>
    </div>
  );
}
