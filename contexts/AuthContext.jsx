"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getUserInformations } from "@/lib/auth";

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

  const clearUser = () => setUserInfos(null);

  return (
    <AuthContext.Provider value={{ userInfos, setUserInfos, clearUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
