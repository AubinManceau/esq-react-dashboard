"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getUserInformations, logout } from "@/lib/auth";
import Loader from "@/components/Loader";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [userInfos, setUserInfos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userInfo = await getUserInformations();
        setUserInfos(userInfo);
      } catch {
        setUserInfos(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const clearUser = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
    setUserInfos(null);
  };

  if (loading) {
    return <Loader className="w-full h-full" />;
  }

  return (
    <AuthContext.Provider value={{ userInfos, setUserInfos, clearUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
