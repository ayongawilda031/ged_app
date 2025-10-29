import React from "react";
import { X } from "lucide-react";

export default function RightSidebar({ isOpen, onClose }) {
  return (
    <div
      className={`bg-white shadow-lg border-l border-gray-200 transition-all duration-300 ease-in-out
        ${isOpen ? "w-80 opacity-100" : "w-0 opacity-0 overflow-hidden"}
        flex-shrink-0 flex flex-col`}
    >
      {isOpen && (
        <>
          {/* Header de la sidebar */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Détails</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Contenu de la sidebar */}
          <div className="p-4 flex-1 overflow-y-auto">
            <p className="text-gray-600 text-sm">
              Ici sont affichées les informations détaillées. Le contenu principal reste visible à gauche.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
