import React, { useEffect, useRef } from "react";
import { Grid, Users, UsersRound, Activity, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom"; // <-- import

export default function AdminMenu({ isOpen, onClose, setActiveItem, activeItem }) {
  const menuRef = useRef(null);
  const navigate = useNavigate(); // <-- hook pour naviguer

  const adminMenuItems = [
    { id: "tableau", icon: Grid, label: "Tableau de bord" },
    { id: "membres", icon: Users, label: "Membres" },
    { id: "groupe", icon: UsersRound, label: "Groupe" },
    { id: "activites", icon: Activity, label: "Activités" },
    { id: "parametres", icon: Settings, label: "Paramètres" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute top-16 left-3 w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-2 z-50"
    >
      {adminMenuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeItem === item.id;

        return (
          <button
            key={item.id}
            onClick={() => {
              setActiveItem(item.id);
              onClose();

             
              if (item.id === "groupe") {
                navigate("/group");
              }
            }}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
              isActive ? "bg-[#1E40AF] text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
