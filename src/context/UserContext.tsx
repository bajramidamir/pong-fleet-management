"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  userId: number;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const isLoginPage = window.location.pathname === "/login";

      if (isLoginPage) {
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching user data...");
        const response = await fetch("/api/auth/verify-token", {
          method: "GET",
          credentials: "include",
        });

        console.log("Response status:", response.status);

        if (response.status === 401) {
          console.log("User is not authenticated.");
          setUser(null);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        console.log("User data:", data);
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
