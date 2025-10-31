import TeamCrud from "@/components/TeamCrud";
import { useProtectedRoute } from "@/contexts/useProtectedRoute";

export default function Equipes() {
    useProtectedRoute();

    return (        
        <div className="admin-teams">
            <div className="flex items-center lg:justify-between mb-10">
                <div>
                    <h1 className="text-orange max-lg:hidden !font-default-bold">Équipes</h1>
                </div>
            </div>

            <TeamCrud />
        </div>
    );
}
