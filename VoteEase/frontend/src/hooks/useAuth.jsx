import { useEffect, useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/secure", {
          withCredentials: true,
        });

        // Assuming a successful response indicates the user is authenticated
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(`Authentication Check Error: ${error}`);
        setIsAuthenticated(false); // Consider user as not authenticated on error
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await axios.get("http://localhost:3030/api/auth/logout", {
        withCredentials: true,
      });
      setIsAuthenticated(false);
    } catch (error) {
      console.error(`Logout failed: ${error}`);
    }
  };

  // If the authentication state is still being determined
  if (isAuthenticated === null) {
    return {
      isAuthenticated: false,
      logout,
    };
  }

  return {
    isAuthenticated,
    logout,
  };
};
