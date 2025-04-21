
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";

const Auth = () => {
  const { isAuthenticated } = useAuth();
  const [showSignIn, setShowSignIn] = useState(true);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const toggleForm = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center starry-bg p-4">
      <div className="w-full max-w-md mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2 text-cosmic-500">Plug and Play</h1>
        <p className="text-cosmic-700 dark:text-cosmic-300">Not Just Games. It's a Feeling.</p>
      </div>
      
      {/* Floating stars - purely decorative */}
      <div className="absolute top-20 left-1/4 w-2 h-2 bg-cosmic-300 rounded-full animate-pulse"></div>
      <div className="absolute top-40 right-1/3 w-3 h-3 bg-cosmic-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/4 left-1/5 w-2 h-2 bg-cosmic-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-cosmic-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Form Container with Animation */}
      <div className="w-full max-w-md animate-float">
        {showSignIn ? (
          <SignInForm onToggleForm={toggleForm} />
        ) : (
          <SignUpForm onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default Auth;
