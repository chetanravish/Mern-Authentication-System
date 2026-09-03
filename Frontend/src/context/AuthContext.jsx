import { createContext, useEffect, useState } from "react";
import { refreshAccessToken } from "../api/devvault.api";
import { setCurrentAccessToken } from "./TokenStore";
import { AuthContext } from "./auth_context.js";


export const AuthProvider = ({ children }) => {

  
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    setCurrentAccessToken(accessToken);
  }, [accessToken]);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await refreshAccessToken();
        setAccessToken(data.accessToken);
        setUser(data.user);
      } catch {
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const value = {
    accessToken,
    setAccessToken,
    user,
    setUser,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};