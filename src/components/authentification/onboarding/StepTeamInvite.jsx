import { X, Plus, Send, ArrowLeft } from "lucide-react";

export default function StepTeamInvite({ members, setMembers, onBack, onFinish }) {
  const roles = ["Administrateur", "Gestionnaire de groupe", "Utilisateur"];

  const addMember = () => {
    setMembers([...members, { id: Date.now(), email: "", role: "Utilisateur", verified: false }]);
  };

  const removeMember = (id) => setMembers(members.filter((m) => m.id !== id));

  const updateEmail = (id, email) => {
    setMembers(
      members.map((m) =>
        m.id === id ? { ...m, email, verified: email.includes("@") } : m
      )
    );
  };

  const updateRole = (id, role) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, role } : m)));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Inviter de nouveaux membres
        </h1>

        <div className="space-y-4 mb-6">
          {members.map((member) => (
            <div key={member.id} className="flex gap-3 items-center">
              <input
                type="email"
                value={member.email}
                onChange={(e) => updateEmail(member.id, e.target.value)}
                placeholder="email@example.com"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none"
              />
              <select
                value={member.role}
                onChange={(e) => updateRole(member.id, e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              >
                {roles.map((role) => (
                  <option key={role}>{role}</option>
                ))}
              </select>
              <button
                onClick={() => removeMember(member.id)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={addMember}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-600"
          >
            <Plus className="w-5 h-5" /> Ajouter un membre
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="w-5 h-5" /> Retour
            </button>

            <button
              onClick={onFinish}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <span className="font-medium">Terminer</span>
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
