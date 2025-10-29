import { useState, useContext } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    await login(formData.email, formData.password); // appel du login du contexte
    toast.success("Connecté avec succès !");
    navigate("/home");
  } catch (err) {
    toast.error(err.response?.data?.message || "Erreur lors de la connexion");
  } finally {
    setLoading(false);
  }
};


  const isFormValid = formData.email && formData.password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-6 space-y-3">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Adresse email"
              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Mot de passe */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Mot de passe"
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-100 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none text-gray-900 placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-2.5 rounded-lg font-semibold text-white mt-2 transition-all ${
              isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-3">
            Pas de compte ?{" "}
            <a href="/register" className="text-blue-600 font-semibold hover:underline">
              S'inscrire
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
