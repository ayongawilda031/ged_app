import { useState } from "react";
import RegisterAdmin from './RegisterAdmin';
import VerifyOTP from "./VerifyOTP";

export default function AuthFlow() {
  const [step, setStep] = useState("register"); 
  const [email, setEmail] = useState(""); 

  const handleRegistered = (userEmail) => {
    setEmail(userEmail);
    setStep("verify");
  };

  const handleBack = () => {
    setStep("register"); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {step === "register" && <RegisterAdmin onRegistered={handleRegistered} />}
      {step === "verify" && <VerifyOTP email={email} onBack={handleBack} />}
    </div>
  );
}
