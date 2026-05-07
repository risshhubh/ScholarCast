"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { LogOut, Home, Upload, CheckSquare } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar({ links }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <nav className="bg-background border-b border-pal-navy/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className="font-bold text-xl text-pal-navy">
                Broadcaster
              </span>
            </div>
            <div className="hidden sm:flex sm:space-x-4">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-pal-blue text-pal-navy"
                        : "border-transparent text-pal-teal hover:border-pal-teal/40 hover:text-pal-navy"
                    }`}
                  >
                    {link.icon && <span className="mr-2 h-4 w-4">{link.icon}</span>}
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-pal-teal hidden md:block">
              Welcome, {user?.name}
            </span>
            <Button variant="outline" size="sm" onClick={logout} className="gap-2 border-pal-teal/20 text-pal-navy hover:bg-pal-navy/5">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
