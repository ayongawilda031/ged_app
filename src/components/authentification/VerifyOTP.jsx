import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function VerifyOTP({ email, onBack }) {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  // Timer pour expiration OTP
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0)
      inputRefs.current[index - 1].focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) newCode[i] = pastedData[i];
    }
    setCode(newCode);
    const lastFilledIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastFilledIndex].focus();
  };

  const handleVerify = async () => {
    const fullCode = code.join("");
    setLoading(true);
    setMessage("");

    try {
 
      const _res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp: fullCode },
        { withCredentials: true } 
      );

      toast.success("Vérification réussie !");
      navigate("/onboarding");

    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur lors de la vérification OTP.");
      toast.error(err.response?.data?.message || "Erreur lors de la vérification OTP.");
    } finally {
      setLoading(false);
    }

  };



  const handleResend = async () => {
    setCanResend(false);
    setTimeLeft(120);
    setCode(["", "", "", "", "", ""]);
    inputRefs.current[0].focus();
    try {
      await axios.post("http://localhost:5000/api/auth/resend-otp", { email });
      setMessage("OTP renvoyé !");
      toast.success("OTP renvoyé !");
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur lors du renvoi OTP.");
      toast.error(err.response?.data?.message || "Erreur lors du renvoi OTP.");
      setCanResend(true);
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-3">
          Entrez le code de vérification
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Nous avons envoyé un code à <span className="font-semibold">{email}</span>
        </p>

        <div className="text-center mb-4">
          <p className="text-sm text-gray-500">
            Code expire dans{" "}
            <span className={`font-semibold ${timeLeft < 30 ? "text-red-500" : "text-[#1E40AF]"}`}>
              {formatTime(timeLeft)}
            </span>
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#1E40AF] focus:outline-none transition-colors"
            />
          ))}
        </div>

        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">
            Vous n'avez pas reçu de code ?{" "}
            <button
              onClick={handleResend}
              disabled={!canResend}
              className={`font-semibold ${
                canResend ? "text-[#1E40AF] hover:underline" : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Cliquez pour renvoyer
            </button>
          </p>
        </div>

        {message && <p className="text-center text-blue-600 mb-4">{message}</p>}

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleVerify}
            disabled={!isCodeComplete || loading}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              isCodeComplete
                ? "bg-[#1E40AF] text-white hover:bg-blue-800 hover:shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Vérification..." : "Vérifier"}
          </button>
        </div>
      </div>
    </div>
  );
}
