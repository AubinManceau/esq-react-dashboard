import { useProtectedRoute } from "@/contexts/useProtectedRoute";

export default function Convocations() {
    useProtectedRoute();
    
    return (
        <div className="admin-convocations">
            <div className="flex items-center lg:justify-between mb-6">
                <div>
                <h1 className="text-orange max-lg:hidden !font-default-bold">Convocations</h1>
                </div>
            </div>
        </div>
    );
}
