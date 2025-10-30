"use client";

import { useState, useEffect } from "react";
import { AuthUtils } from "@/utils/auth";

interface IUser {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface IUseAuth {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: IUser | null;
  login: (token: string, user: IUser, remember?: boolean) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

export default function useAuth(): IUseAuth {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = (): void => {
    try {
      const authenticated = AuthUtils.isAuthenticated();
      const userData = AuthUtils.getUser();
      
      setIsAuthenticated(authenticated);
      setUser(userData);
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (token: string, userData: IUser, remember: boolean = false): void => {
    AuthUtils.setToken(token, remember);
    AuthUtils.setUser(userData, remember);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = (): void => {
    AuthUtils.clearAuth();
    setIsAuthenticated(false);
    setUser(null);
  };

  const checkAuth = (): boolean => {
    return AuthUtils.isAuthenticated();
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    checkAuth,
  };
}
