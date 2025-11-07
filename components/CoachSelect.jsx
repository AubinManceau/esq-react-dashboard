import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

export default function CoachSelect({ users, coachs, setCoachs }) {
  const [open, setOpen] = useState(false);

  const toggleOption = (id) => {
    if (coachs.includes(id)) {
      setCoachs(coachs.filter((c) => c !== id));
    } else {
      setCoachs([...coachs, id]);
    }
  };

  return (
    <div className="relative w-full mt-4">
      {/* Zone affichée */}
      <div
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 border border-black rounded-md bg-white cursor-pointer flex flex-wrap items-center gap-2 transition-all duration-200"
      >
        {coachs.length === 0 ? (
          <span className="text-gray-400">Sélectionner des coachs...</span>
        ) : (
          coachs.map((id) => {
            const user = users.find((u) => u.id === id);
            return (
              <span
                key={id}
                className="flex items-center bg-orange/10 text-orange text-sm px-2 py-1 rounded-full"
              >
                {user?.firstName} {user?.lastName}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(id);
                  }}
                  className="ml-1 hover:text-blue-900"
                >
                  <X size={14} />
                </button>
              </span>
            );
          })
        )}
        <ChevronDown
          className={`ml-auto transition-transform ${open ? "rotate-180" : ""}`}
          size={18}
        />
      </div>

      {/* Menu déroulant */}
      {open && (
        <div className="absolute z-10 w-full bg-white border border-black/20 rounded-md max-h-56 overflow-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => toggleOption(user.id)}
              className={`px-4 py-2 cursor-pointer hover:bg-orange/5 ${
                coachs.includes(user.id) ? "bg-orange/10 text-orange" : ""
              }`}
            >
              {user.firstName} {user.lastName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
