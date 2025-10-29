import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import UploadArea from "../components/UploadArea";
import RecentFiles from "../components/Recentfiles/RecentFiles";
import RightSidebar from "../components/Home/RightSidebar";

const HomePage = () => {
  const [activeItem, setActiveItem] = useState("accueil");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userRole = "Admin";

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
            <DashboardHeader
            userName={userRole === "Admin" ? "Gestionnaire" : "Utilisateur"}
            onInfoClick={() => setIsSidebarOpen(prev => !prev)} // toggle
            />


            <div className="flex-1 flex flex-col gap-2">
              <UploadArea />
              <RecentFiles />
            </div>
          </main>

          {/* Sidebar droite */}
          <RightSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)} // uniquement via croix
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
