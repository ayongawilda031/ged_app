import { useState } from "react";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterAdmin({ onRegistered }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [organisationId, _setOrganisationId] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  // Vérifications mot de passe
  const validations = {
    length: motDePasse.length >= 8,
    uppercase: /[A-Z]/.test(motDePasse),
    lowercase: /[a-z]/.test(motDePasse),
    number: /\d/.test(motDePasse),
    special: /[\W_]/.test(motDePasse),
  };

  const isPasswordValid = Object.values(validations).every(Boolean);
  const isFormValid = nom && prenom && email && motDePasse && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      toast.error("Le mot de passe ne respecte pas toutes les restrictions.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register-admin", {
        nom,
        prenom,
        email,
        mot_de_passe: motDePasse, 
        organisation_id: organisationId || null, 
      });

      setMessage(res.data.message);
      toast.success(res.data.message);
      onRegistered(email);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Erreur lors de l'inscription.");
      toast.error(err.response?.data?.message || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Inscription Administrateur</h2>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-6 space-y-4">
          
          {/* Nom */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:ring-1 focus:ring-[#1E40AF] outline-none text-gray-900 placeholder-gray-400"
              required
            />
          </div>

          {/* Prénom */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:ring-1 focus:ring-[#1E40AF] outline-none text-gray-900 placeholder-gray-400"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:ring-1 focus:ring-[#1E40AF] outline-none text-gray-900 placeholder-gray-400"
              required
            />
          </div>

          {/* Mot de passe */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:ring-1 focus:ring-[#1E40AF] outline-none text-gray-900 placeholder-gray-400"
              required
              onFocus={() => setIsPasswordFocus(true)}
              onBlur={() => setIsPasswordFocus(false)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Liste des restrictions */}
          {isPasswordFocus && (
            <ul className="text-xs italic space-y-1 ml-3 mt-1">
              <li className={validations.length ? "text-green-600" : "text-gray-400"}>• Minimum 8 caractères</li>
              <li className={validations.uppercase ? "text-green-600" : "text-gray-400"}>• Au moins une majuscule</li>
              <li className={validations.lowercase ? "text-green-600" : "text-gray-400"}>• Au moins une minuscule</li>
              <li className={validations.number ? "text-green-600" : "text-gray-400"}>• Au moins un chiffre</li>
              <li className={validations.special ? "text-green-600" : "text-gray-400"}>• Au moins un caractère spécial</li>
            </ul>
          )}

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-2.5 rounded-lg font-semibold text-white mt-2 transition-all ${
              isFormValid ? "bg-[#1E40AF] hover:bg-blue-800" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {loading ? "Chargement..." : "S'inscrire"}
          </button>

          {message && <p className="text-center text-blue-600 mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
}
