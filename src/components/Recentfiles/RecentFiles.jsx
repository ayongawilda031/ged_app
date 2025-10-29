import { useState, useEffect, useRef } from 'react';
import { LayoutList, LayoutGrid } from 'lucide-react';
import FileListView from './FileListView';
import FileGridView from './FileGridView';
import FileContextMenu from '../Dropdown/FileContextMenu';

export default function RecentFiles() {
  const [viewMode, setViewMode] = useState('list');
  const [menuData, setMenuData] = useState({
    isOpen: false,
    file: null,
    coords: { top: 0, left: 0 }
  });
  const menuRef = useRef(null);

  const files = [
    {
      id: 1,
      name: 'Stage CME',
      subtitle: 'Cahier de charges application soutenance',
      type: 'document',
      folder: 'CME',
      modified: '07.10.2025',
      created: 'Créé le 12/09/2025',
      members: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400'
    },
    {
      id: 2,
      name: 'Prévisions Budget',
      subtitle: 'Cahier de charges application soutenance',
      type: 'image',
      folder: 'Science',
      modified: '07.10.2025',
      created: 'Créé le 12/09/2025',
      badge: 'PDF',
      badgeColor: 'bg-orange-500',
      members: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
      ],
      thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400'
    }
  ];

  // 🔹 Ouvre le menu contextuel à gauche et au-dessus du bouton
  const handleOpenMenu = (file, buttonRef) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const menuWidth = 220; // largeur estimée du menu
    const menuHeight = 220; // hauteur estimée du menu
    const padding = 14;

    const left = rect.left - menuWidth - padding;
    const top = rect.top + window.scrollY - menuHeight - padding; // 🔼 au-dessus du bouton

    setMenuData({
      isOpen: true,
      file,
      coords: { top, left }
    });
  };

  // 🔹 Ferme le menu contextuel
  const handleCloseMenu = () => {
    setMenuData({
      isOpen: false,
      file: null,
      coords: { top: 0, left: 0 }
    });
  };

  // 🔹 Fermer le menu si clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleCloseMenu();
      }
    };
    if (menuData.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuData.isOpen]);

  return (
    <div className="rounded-2xl p-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Fichiers Récents</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Fichiers */}
      {viewMode === 'list' ? (
        <FileListView files={files} onOpenMenu={handleOpenMenu} />
      ) : (
        <FileGridView files={files} onOpenMenu={handleOpenMenu} />
      )}

      {/* Menu contextuel fixé et au-dessus */}
      {menuData.isOpen && (
        <div
          ref={menuRef}
          className="fixed z-[9999]"
          style={{
            top: `${menuData.coords.top}px`,
            left: `${menuData.coords.left}px`
          }}
        >
          <FileContextMenu
            isOpen={menuData.isOpen}
            onClose={handleCloseMenu}
            coords={menuData.coords}
            file={menuData.file}
          />
        </div>
      )}
    </div>
  );
}
