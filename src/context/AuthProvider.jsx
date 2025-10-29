import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [utilisateur, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });
      console.log("✅ Utilisateur /me :", res.data);
      setUser(res.data.utilisateur || null);
    } catch (err) {
      if (err.response?.status === 401) {
        console.warn("⚠️ Aucun utilisateur connecté");
        setUser(null);
      } else {
        console.error("❌ Erreur récupération utilisateur :", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email, mot_de_passe) => {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, mot_de_passe },
      { withCredentials: true }
    );
    setUser(res.data.utilisateur);
  };

  const logout = async () => {
    await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ utilisateur, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
