import React, { useRef, useEffect } from "react";
import {
  Eye,
  Download,
  Edit3,
  Send,
  FolderOpen,
  Trash2,
  Info,
  Activity,
  Users,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; // 🔹 récupération du user

export default function FileContextMenu({ isOpen, onClose, buttonRef, file }) {
  const { user } = useAuth();
  const userRole = user?.role || "Tilisateur";

  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    }

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, buttonRef]);

  if (!isOpen || !file) return null;

  const menuItems = [
    {
      section: "actions",
      items: [
        {
          icon: Eye,
          label: "Aperçu",
          action: () => {
            onClose();
            navigate("/viewer", { state: { file } });
          },
        },
        { icon: Download, label: "Télécharger", action: () => console.log("Télécharger", file.name) },
        { icon: Edit3, label: "Renommer", action: () => console.log("Renommer", file.name) },
      ],
    },
    {
      section: "organize",
      items: [
        { icon: Send, label: "Partager", hasArrow: true, action: () => console.log("Partager", file.name) },
        { icon: FolderOpen, label: "Organiser", hasArrow: true, action: () => console.log("Organiser", file.name) },
        { icon: Trash2, label: "Placer dans la corbeille", action: () => console.log("Corbeille", file.name) },
      ],
    },
    {
      section: "info",
      items: [
        { icon: Info, label: "Informations", action: () => console.log("Informations", file.name) },
        { icon: Activity, label: "Activités", action: () => console.log("Activités", file.name) },
        { 
          icon: Users, 
          label: "Gérer les autorisations", 
          adminOnly: true, 
          action: () => console.log("Autorisations", file.name) 
        },
      ],
    },
  ];

  // 🔹 filtrage des items selon rôle
  const filteredMenuItems = menuItems.map(section => ({
    ...section,
    items: section.items.filter(item => {
      if (item.adminOnly && !["Admin", "Gestionnaire"].includes(userRole)) return false;
      return true;
    })
  }));

  const buttonRect = buttonRef?.current?.getBoundingClientRect();
  const style = buttonRect
    ? { top: buttonRect.top + window.scrollY, left: buttonRect.left - 200 }
    : {};

  return (
    <div
      ref={menuRef}
      className="absolute z-50 w-48 bg-white rounded-lg shadow-xl border border-gray-200"
      style={style}
    >
      {filteredMenuItems.map((section, idx) => (
        <div key={idx}>
          {section.items.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                onClick={() => item.action(file)}
                className="w-full px-4 py-2 flex items-center justify-between text-left hover:bg-gray-50 transition-colors text-sm"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-700" />
                  <span className="text-gray-900">{item.label}</span>
                </div>
                {item.hasArrow && <ChevronRight className="w-4 h-4 text-gray-400" />}
              </button>
            );
          })}
          {idx < filteredMenuItems.length - 1 && <div className="border-t border-gray-200 my-1"></div>}
        </div>
      ))}
    </div>
  );
}
