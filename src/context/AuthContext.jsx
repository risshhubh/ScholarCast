"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/auth.service';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = () => {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const login = async (username, password) => {
    const loggedInUser = await authService.login(username, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
