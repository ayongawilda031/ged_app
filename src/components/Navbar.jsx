import { useState, useRef } from 'react';
import { Search, SlidersHorizontal, Bell, Plus, UserRoundPlus } from 'lucide-react';
import ProfileModal from './Dropdown/ProfilModal';
import NewCardModal from './Dropdown/NewCardModal';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user } = useAuth(); // 🔹 récupération de l'utilisateur connecté
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNewCardOpen, setIsNewCardOpen] = useState(false);

  const newButtonRef = useRef();
  const profileButtonRef = useRef();

  // 🔹 Génération des initiales si pas d'avatar
  const initials = user?.nomUtilisateur
    ? user.nomUtilisateur
        .split(' ')
        .map(word => word[0]?.toUpperCase())
        .join('')
        .slice(0, 2)
    : '';

  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 relative">
      {/* Left Section - Logo & Search */}
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="font-semibold text-gray-900">Nom Application</span>
        </div>

        <div className="flex-1 max-w-md ml-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher"
              className="w-full pl-10 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
            <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 relative">
        {/* Invite Button */}
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
          <UserRoundPlus className="w-4 h-4" />
          <span>Inviter des membres</span>
        </button>

        {/* Nouveau Button */}
        <button
          ref={newButtonRef}
          onClick={() => setIsNewCardOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau</span>
        </button>

        {/* Ligne verticale */}
        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar */}
        <div
          ref={profileButtonRef}
          className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
          onClick={() => setIsProfileOpen(true)}
        >
          {user?.avatar || user?.logo ? (
            <img
              src={user.avatar || user.logo}
              alt={user.nomUtilisateur}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-500 text-white font-semibold">
              {initials}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <NewCardModal
        isOpen={isNewCardOpen}
        onClose={() => setIsNewCardOpen(false)}
        buttonRef={newButtonRef}
      />
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        buttonRef={profileButtonRef}
      />
    </nav>
  );
};

export default Navbar;
