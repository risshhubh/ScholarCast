"use client";

import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { authService } from '../services/auth.service';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loadUser = () => {
      const currentUser = authService.getCurrentUser();
      setUser(currentUser);
      setIsLoading(false);
    };
    loadUser();
  }, []);

  // Use useMemo to avoid re-calculating public paths on every render
  const publicPaths = useMemo(() => ['/', '/login', '/signup', '/live'], []);

  useEffect(() => {
    if (!isLoading) {
      const isPublicPath = publicPaths.some(path => 
        pathname === path || (path !== '/' && pathname.startsWith(path))
      );
      const isAuthPage = pathname === '/login' || pathname === '/signup';

      if (!user && !isPublicPath) {
        // Redirect to login if not authenticated and trying to access a private page
        router.push('/login');
      } else if (user && isAuthPage) {
        // Redirect to appropriate dashboard if already authenticated and trying to access login/signup
        const targetPath = user.role === 'teacher' ? '/teacher' : '/principal';
        router.push(targetPath);
      }
    }
  }, [user, isLoading, pathname, router, publicPaths]);

  const login = async (username, password) => {
    const loggedInUser = await authService.login(username, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    router.push('/login');
  };

  // Prevent content flash while checking auth
  const shouldShowContent = useMemo(() => {
    if (isLoading) return false;
    const isPublicPath = publicPaths.some(path => 
      pathname === path || (path !== '/' && pathname.startsWith(path))
    );
    const isAuthPage = pathname === '/login' || pathname === '/signup';
    
    if (!user && !isPublicPath) return false;
    if (user && isAuthPage) return false;
    return true;
  }, [user, isLoading, pathname, publicPaths]);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {shouldShowContent ? children : (
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pal-blue"></div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
