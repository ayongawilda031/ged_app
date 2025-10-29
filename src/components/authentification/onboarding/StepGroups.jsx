import  { useState } from "react";
import { Plus, Tag, Trash2, ArrowRight, ArrowLeft } from "lucide-react";

export default function StepGroups({ groups, setGroups, onNext, onBack }) {
  const [groupName, setGroupName] = useState("");
  const [hasParent, setHasParent] = useState(false);
  const [parentGroup, setParentGroup] = useState("");

  const addGroup = () => {
    if (groupName.trim()) {
      const newGroup = {
        id: Date.now(),
        name: groupName.trim(),
        parent: hasParent ? parentGroup : null,
      };
      setGroups([...groups, newGroup]);
      setGroupName("");
      setHasParent(false);
      setParentGroup("");
    }
  };

  const removeGroup = (id) => setGroups(groups.filter((g) => g.id !== id));

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Créer les groupes de votre structure
        </h1>
        <p className="text-gray-600 mb-8">
          Les groupes permettent d’organiser les membres par service, département, etc.
        </p>

        {/* Formulaire */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 mb-8">
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Nom du groupe"
            className="w-full px-4 py-2.5 mb-4 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
          />

          <label className="flex items-center gap-2 mb-3 cursor-pointer">
            <input
              type="checkbox"
              checked={hasParent}
              onChange={(e) => setHasParent(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <span className="text-sm text-gray-700">Ce groupe dépend d’un autre</span>
          </label>

          {hasParent && (
            <select
              value={parentGroup}
              onChange={(e) => setParentGroup(e.target.value)}
              className="w-full px-4 py-2.5 mb-4 rounded-lg border border-gray-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
            >
              <option value="">Sélectionner un groupe parent</option>
              {groups.map((g) => (
                <option key={g.id} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={addGroup}
            disabled={!groupName.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition disabled:opacity-50"
          >
            <Plus className="w-5 h-5 inline-block mr-2" />
            Ajouter un groupe
          </button>
        </div>

        {/* Liste des groupes */}
        <div className="space-y-3 mb-8">
          {groups.map((group) => (
            <div
              key={group.id}
              className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow transition"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Tag className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{group.name}</p>
                <p className="text-sm text-gray-500">
                  Parent : {group.parent || "Aucun"}
                </p>
              </div>
              <button
                onClick={() => removeGroup(group.id)}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-red-50 transition"
              >
                <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" />
              </button>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-5 h-5" /> Retour
          </button>
          <button
            onClick={onNext}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
          >
            Continuer <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
