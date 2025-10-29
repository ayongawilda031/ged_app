import  { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import GroupManagement from "../components/group/GroupManagement.jsx";

export default function GroupPage() {
  const [activeItem, setActiveItem] = useState("groupes"); // tu peux mettre "groupes" par défaut
  const userRole = "Admin"; // ou récupéré via ton auth

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar gauche */}
        <Sidebar
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          userRole={userRole}
        />

        {/* Contenu principal + sidebar droite */}
        <div className="flex flex-1 overflow-hidden">
          {/* Contenu principal */}
          <main className="flex-1 flex flex-col overflow-y-auto p-4 lg:p-6">

            {/* Contenu spécifique à la page */}
            <div className="flex-1 flex flex-col gap-4">
              <GroupManagement />
            </div>
          </main>

    
        </div>
      </div>
    </div>
  );
}
