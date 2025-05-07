import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContent = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });

      if (data.success) {
        setUserData(data.user);
        setIsLoggedIn(true);
      } else {
        setUserData(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      setUserData(null);
      setIsLoggedIn(false);
      console.error("Error fetching user:", error);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    loadingUser
  };

  return (
    <AppContent.Provider value={value}>
      {!loadingUser && children}
    </AppContent.Provider>
  );
};