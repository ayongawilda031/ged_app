import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "./pages/authentification/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/authentification/LoginPage.jsx";
import OnboardingPage from "./pages/authentification/OnboardingPage.jsx";





const router = createBrowserRouter([

    {
    path: "/",
    element: <LoginPage />,
    
  },
     {
    path: "/register",
    element: <RegisterPage />,
    
  },
     {
    path: "/home",
    element: <HomePage />,
    
  },

  {
    path: "/onboarding",
    element: <OnboardingPage />,
 
  },

]);

export default router;

