"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardFooter } from "../ui/Card";
import { Alert, AlertDescription } from "../ui/Alert";
import { LogIn, UserPlus } from "lucide-react";
import LoginForm from "./login/Loginform";
import RegisterForm from "./login/RegistrationForm";
import { useAuth } from "../../hooks/useAuth"; // Correct import statement
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // Navigate to user-dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/user-dashboard");
    }
  }, [isAuthenticated, navigate]); 

  const toggleForm = () => {
    setIsLogin(!isLogin); 
    setError("");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/voting-background.jpg')" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center text-blue-800">
              {isLogin ? (
                <LogIn className="mr-2" />
              ) : (
                <UserPlus className="mr-2" />
              )}
              {isLogin ? "Login to Vote" : "Create Account"}
            </CardTitle>
          </CardHeader>

          {isLogin ? (
            <LoginForm setError={setError} setIsLogin={setIsLogin} />
          ) : (
            <RegisterForm setError={setError} setIsLogin={setIsLogin} />
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <CardFooter className="justify-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleForm}
                className="p-0 text-blue-600 hover:underline"
              >
                {isLogin ? "Register here" : "Login here"}
              </button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
