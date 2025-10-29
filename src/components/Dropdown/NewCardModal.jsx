import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { Users, FolderOpen, FileUp, FolderUp } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const NewCardModal = ({ isOpen, onClose, buttonRef, onOpenGroupModal }) => {
  const { user } = useAuth();
  const userRole = user?.role || "user";

  const modalRef = useRef();
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Calcul de la position
  useLayoutEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const modalWidth = 256;

      let left = rect.left + window.scrollX - 10;
      if (left + modalWidth > window.innerWidth - 10) {
        left = window.innerWidth - modalWidth - 10;
      }
      if (left < 10) left = 10;

      const top = rect.bottom + window.scrollY + 4;
      setPosition({ top, left });
    }
  }, [isOpen, buttonRef]);

  // Fermer lorsqu’on clique à l’extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        onClose();
      }
    }

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, buttonRef]);

  if (!isOpen) return null;

  const menuItems = [
    { icon: Users, label: 'Groupe', color: 'bg-purple-500', allowedRoles: ['Admin'] },
    { icon: Users, label: 'Sous-groupe', color: 'bg-indigo-500', allowedRoles: ['Admin', 'Gestionnaire'] },
    { icon: FolderOpen, label: 'Dossier', color: 'bg-pink-500' },
    { icon: FileUp, label: 'Importer un fichier', color: 'bg-blue-500' },
    { icon: FolderUp, label: 'Importer un dossier', color: 'bg-green-700' },
  ];

  // Filtrage selon le rôle
  const filteredMenuItems = menuItems.filter(item => {
    if (item.allowedRoles) return item.allowedRoles.includes(userRole);
    if (item.adminOnly) return userRole === 'admin';
    return true;
  });

  const handleClick = (label) => {
    // 🔹 Si c'est Groupe ou Sous-groupe, on ouvre GroupModal via callback parent
    if (label === "Groupe") {
      onOpenGroupModal("create", null); // création d'un groupe racine
    } else if (label === "Sous-groupe") {
      // Ici tu peux passer un parentGroup réel depuis le parent si nécessaire
      onOpenGroupModal("subgroup", { id: "123", name: "Direction" });
    }

    onClose();
  };

  return (
    <div
      ref={modalRef}
      className="absolute z-50 w-64 bg-white rounded-xl shadow-2xl"
      style={{ top: position.top, left: position.left }}
    >
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Nouveau</h3>
      </div>
      <div className="py-2">
        {filteredMenuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              onClick={() => handleClick(item.label)}
            >
              <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-900">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NewCardModal;
