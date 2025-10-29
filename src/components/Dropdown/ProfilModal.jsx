import React from 'react';
import { User, Settings, UsersRound, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const ProfileModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  if (!isOpen || !user) return null;

  // Génération des initiales
  const initials = user.nomUtilisateur
    ? user.nomUtilisateur
        .split(' ')
        .map(word => word[0]?.toUpperCase())
        .join('')
        .slice(0, 2)
    : '';

  const menuItems = [
    { icon: User, label: 'Mon profil', hasArrow: true },
    { icon: Settings, label: 'Paramètres', hasArrow: true },
    { icon: UsersRound, label: 'Afficher les équipes et leurs membres' },
    { icon: HelpCircle, label: 'Aide' },
    { icon: LogOut, label: 'Se déconnecter' },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-gray bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed right-4 top-20 z-50 w-80 bg-white rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* User Info */}
        <div className="p-4 border-b border-gray-200 flex items-start gap-3">
          <div className="relative">
            {user.avatar || user.logo ? (
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={user.avatar || user.logo}
                  alt={user.nomUtilisateur}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-500 text-white font-semibold text-lg border-2 border-gray-200">
                {initials}
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 border-2 border-white rounded-full"></div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{user.nomUtilisateur}</h3>
            <p className="text-sm text-gray-600 truncate">{user.email}</p>
            <p className="text-xs text-gray-500 mt-1">{user.role}</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                onClick={() => {
                  console.log(`Clicked: ${item.label}`);
                  if (item.label === 'Se déconnecter') alert('Déconnexion...');
                  onClose();
                }}
              >
                <Icon className="w-5 h-5 text-gray-600" />
                <span className="flex-1 text-left text-sm text-gray-900">{item.label}</span>
                {item.hasArrow && (
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
