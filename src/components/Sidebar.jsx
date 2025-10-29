import { useState, useRef, useEffect } from 'react';
import { Home, Forward, Star, Trash2, ChevronDown, FolderOpen, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth'; 
import AdminMenu from './Dropdown/AdminMenu';

export default function Sidebar({ activeItem, setActiveItem }) {
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState(new Set());
  const [loadingGroups, setLoadingGroups] = useState(true);
  const adminMenuRef = useRef(null);

  const { user } = useAuth();
  const userRole = user?.role?.toLowerCase() || "utilisateur";
  const structureName = user?.structure?.nom || "Structure inconnue";
  const logo = user?.structure?.logo || "";
  const initials = structureName
    .split(" ")
    .map((word) => word[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  // 🔹 Main menu items
  const mainMenuItems = [
    { id: 'accueil', icon: Home, label: 'Accueil' },
    { id: 'dossiers', icon: FolderOpen, label: 'Mes dossiers', hasSubmenu: true },
    { id: 'partages', icon: Forward, label: 'Partagés avec moi' },
    { id: 'favoris', icon: Star, label: 'Favoris' },
    { id: 'supprimes', icon: Trash2, label: 'Supprimés' },
  ];

  // 🔹 Fetch user groups from backend
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/groups/user", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setGroups(data);
      } catch (err) {
        console.error("Erreur récupération groupes :", err);
      } finally {
        setLoadingGroups(false);
      }
    };

    fetchGroups();
  }, []);

  // 🔹 Expand / collapse
  const toggleExpand = (groupId) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) newExpanded.delete(groupId);
    else newExpanded.add(groupId);
    setExpandedGroups(newExpanded);
  };

  // 🔹 Build tree recursively
  const buildGroupTree = (parentId = null, level = 0) => {
    return groups
      .filter((g) => (g.parent_group_id?._id || null) === parentId)
      .map((group) => {
        const hasChildren = groups.some((g) => g.parent_group_id?._id === group._id);
        const isExpanded = expandedGroups.has(group._id);

        return (
          <div key={group._id}>
            <div
              className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
              style={{ marginLeft: `${level * 16}px` }}
              onClick={() => toggleExpand(group._id)}
            >
              <div className="flex items-center gap-2">
                {hasChildren && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                )}
                {!hasChildren && <div className="w-4 h-4" />}
                <Users className="text-blue-600" size={18} />
                <span>{group.nom}</span>
              </div>
            </div>
            {hasChildren && isExpanded && buildGroupTree(group._id, level + 1)}
          </div>
        );
      });
  };

  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col h-screen relative">
      {/* ----------- USER PROFILE ----------- */}
      <div className="p-3 border-b border-gray-200 relative" ref={adminMenuRef}>
        <button
          onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
          className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-sm"
        >
          {logo ? (
            <img
              src={logo}
              alt="Logo structure"
              className="w-9 h-9 rounded-lg object-cover border border-gray-200"
            />
          ) : (
            <div className="w-9 h-9 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">{initials}</span>
            </div>
          )}
          <div className="flex-1 text-left">
            <div className="font-semibold text-sm text-gray-900">{structureName}</div>
            {userRole && userRole !== "utilisateur" && (
              <div className="text-xs text-gray-500 capitalize">{userRole}</div>
            )}
          </div>
          {userRole === 'admin' && (
            <ChevronDown
              className={`w-4 h-4 text-gray-600 transition-transform ${isAdminMenuOpen ? 'rotate-180' : ''}`}
            />
          )}
        </button>

        <AdminMenu
          isOpen={isAdminMenuOpen && userRole === 'admin'}
          onClose={() => setIsAdminMenuOpen(false)}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </div>

      {/* ----------- MAIN MENU ----------- */}
      <div className="flex-1 flex flex-col overflow-y-auto py-3">
        <nav className="px-2 space-y-1 flex-1">
          {mainMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    setActiveItem(item.id);
                    if (item.hasSubmenu) setIsDocsOpen(!isDocsOpen);
                  }}
                  className={`w-full flex items-center gap-2 px-2 py-2 rounded-md transition-colors text-sm ${
                    isActive ? 'bg-[#1E40AF] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.hasSubmenu && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${isDocsOpen ? 'rotate-180' : ''}`}
                    />
                  )}
                </button>

                {/* Sous-menu dossiers : groupes */}
                {item.hasSubmenu && isDocsOpen && (
                  <div className="ml-6 mt-1 space-y-1">
                    {loadingGroups ? (
                      <p className="text-gray-500 text-xs">Chargement...</p>
                    ) : groups.length === 0 ? (
                      <p className="text-gray-500 text-xs">
                        Aucun groupe disponible.
                      </p>
                    ) : (
                      buildGroupTree()
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
