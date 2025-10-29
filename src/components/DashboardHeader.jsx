import React from "react";
import { Info } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useLocation } from "react-router-dom"; // 🔹

const DashboardHeader = ({ onInfoClick }) => {
  const { user } = useAuth();
  const userName = user?.nomUtilisateur || "Utilisateur";

  const location = useLocation(); // 🔹 récupère l'URL actuelle

  return (
    <div className="mb-4 flex items-center justify-between">
      {/* 🔹 Affiche le Bonjour uniquement si la page est /home */}
      {location.pathname === "/home" && (
        <h1 className="text-xl font-bold text-gray-900">
          Bienvenue {userName}👋
        </h1>
      )}

      {/* Icône Détails */}
      <button
        onClick={onInfoClick}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        title="Détails"
      >
        <Info className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default DashboardHeader;
