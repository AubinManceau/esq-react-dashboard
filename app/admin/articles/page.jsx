"use client";
import { useProtectedRoute } from "@/contexts/useProtectedRoute";

export default function Articles() {
    useProtectedRoute();
    return (
        <div className="admin-articles">
            <div className="flex items-center lg:justify-between mb-6">
                <div>
                <h1 className="text-orange max-lg:hidden !font-default-bold">Articles</h1>
                </div>
            </div>
        </div>
    );
}
