import UserForm from "@/components/UserForm";
import BulkUserForm from "@/components/BulkUserForm";

export default function UtilisateursInscriptions() {
    return (
        <div className="admin-users">
            <div className="lg:mb-8">
                <h1 className="text-orange max-lg:hidden !font-default-bold">Utilisateurs</h1>
            </div>

            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 px-2 py-2 md:px-8 md:py-8 bg-white border-1 border-black/5 rounded-[10px] shadow-sm mb-8 md:mb-0 md:mr-4">
                    <UserForm />
                </div>

                <div className="md:w-1/2 px-2 py-2 md:px-8 md:py-8 bg-white border-1 border-black/5 rounded-[10px] shadow-sm md:ml-4">
                    <BulkUserForm />
                </div>
            </div>    
        </div>
    );
}
