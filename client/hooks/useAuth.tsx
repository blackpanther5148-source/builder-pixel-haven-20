import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getUser, clearAuth, type User } from "@/lib/auth";

export const useAuth = (requireAuth: boolean = false) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated()) {
        const userData = getUser();
        setUser(userData);
      } else {
        setUser(null);
        if (requireAuth) {
          navigate("/login");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [requireAuth, navigate]);

  const logout = () => {
    clearAuth();
    setUser(null);
    navigate("/");
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    logout,
  };
};
