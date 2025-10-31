"use client";
import { useProtectedRoute } from "@/contexts/useProtectedRoute";

export default function Presences() {
    useProtectedRoute();

    return (
        <div className="admin-presences">
            <div className="flex items-center lg:justify-between mb-6">
                <div>
                <h1 className="text-orange max-lg:hidden !font-default-bold">Présences</h1>
                </div>
            </div>
        </div>
    );
}
