"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User, Settings, LogOut, Mail, GraduationCap, Radio,
  ShieldCheck, Activity, Home, LayoutDashboard, Video, Menu, X, Sun, Moon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAllContent } from "@/hooks/useContent";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import { useState, useEffect } from "react";
// ...
export default function MarketingNavbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const { data: allContent } = useAllContent();
  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Live Portal', href: '/live', icon: Radio },
    ...(user?.role === 'teacher' ? [
      { name: 'Dashboard', href: '/teacher', icon: LayoutDashboard },
      { name: 'Broadcast', href: '/teacher/upload', icon: Video }
    ] : []),
    ...(user?.role === 'principal' ? [
      { name: 'Review Pool', href: '/principal/approval', icon: ShieldCheck }
    ] : [])
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b-4 border-pal-navy transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-pal-blue p-2.5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(13,23,54,1)] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
              <GraduationCap className="h-6 w-6 text-pal-navy" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-pal-navy uppercase leading-none">
                Scholar<span className="text-pal-blue">Cast</span>
              </span>
              <span className="text-[6px] font-black text-pal-teal uppercase tracking-[0.4em] mt-1">Institutional Signal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center bg-pal-navy/5 p-2 rounded-[2rem] border-2 border-pal-navy/10 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all relative group flex items-center gap-3 overflow-hidden active:scale-95 ${pathname === link.href ? 'text-pal-beige bg-pal-navy' : 'text-pal-navy hover:bg-pal-navy/5'}`}
              >
                <link.icon className={`h-4 w-4 shrink-0 transition-transform duration-300 ${pathname === link.href ? '' : 'group-hover:scale-110'}`} />
                <span className="whitespace-nowrap z-10">{link.name}</span>
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-pill-desktop"
                    className="absolute inset-0 bg-pal-navy rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.1, duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            {/* System Status Decal - Desktop Only */}
            <div className="hidden xl:flex flex-col items-end border-r-2 border-pal-navy/10 pr-6">
              <div className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-pal-blue" />
                <span className="text-[8px] font-black text-pal-navy uppercase tracking-widest">System Online</span>
              </div>
              <span className="text-[7px] font-bold text-pal-teal uppercase tracking-widest">Lat: 24ms // Node: NY-01</span>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger render={
                  <button className="bg-pal-navy text-pal-beige p-3 rounded-2xl shadow-lg border-2 border-pal-blue/20 active:scale-95 transition-all outline-none">
                    <Menu className="h-6 w-6" />
                  </button>
                } />
                <SheetContent side="right" className="bg-white border-l-4 border-pal-navy p-0 w-[300px]">
                  <SheetHeader className="p-8 border-b-4 border-pal-navy bg-pal-navy text-white text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-pal-blue p-2 rounded-xl">
                        <GraduationCap className="h-6 w-6 text-pal-navy" />
                      </div>
                      <SheetTitle className="text-white font-black uppercase tracking-tighter text-2xl">Terminal</SheetTitle>
                    </div>
                  </SheetHeader>
                  <div className="p-6 space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all font-black uppercase tracking-widest text-[10px] ${pathname === link.href ? 'bg-pal-navy text-pal-beige border-pal-navy' : 'bg-white text-pal-navy border-pal-navy/10'}`}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.name}
                      </Link>
                    ))}

                    {!user && (
                      <div className="grid grid-cols-1 gap-3 pt-6 mt-6 border-t-2 border-pal-navy/5">
                        <Link href="/login">
                          <button className="w-full h-14 border-2 border-pal-navy text-pal-navy font-black uppercase tracking-widest text-[10px] rounded-2xl">
                            Sign In
                          </button>
                        </Link>
                        <Link href="/signup">
                          <button className="w-full h-14 bg-pal-navy text-pal-beige font-black uppercase tracking-widest text-[10px] rounded-2xl brutalist-shadow-sm">
                            Register Node
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>

                  {user && (
                    <div className="absolute bottom-0 left-0 right-0 p-8 border-t-4 border-pal-navy bg-pal-navy/5">
                      <div className="flex items-center gap-4 mb-6">
                        <Avatar className="h-12 w-12 border-2 border-pal-navy">
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                          <AvatarFallback className="bg-pal-navy text-pal-beige">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-[10px] font-black text-pal-navy uppercase">{user.name}</p>
                          <p className="text-[8px] font-bold text-pal-teal uppercase tracking-widest">{user.role}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <Link href="/overview" className="w-full h-12 border-2 border-pal-navy text-pal-navy font-black uppercase tracking-widest text-[9px] rounded-xl flex items-center justify-center gap-2 hover:bg-pal-navy/5 active:scale-[0.98] transition-all">
                          <Activity className="h-4 w-4 text-pal-blue" />
                          System Overview
                        </Link>
                        <Link href="/settings" className="w-full h-12 border-2 border-pal-navy text-pal-navy font-black uppercase tracking-widest text-[9px] rounded-xl flex items-center justify-center gap-2 hover:bg-pal-navy/5 active:scale-[0.98] transition-all">
                          <Settings className="h-4 w-4 text-pal-blue" />
                          Node Settings
                        </Link>
                        <button onClick={logout} className="w-full h-12 bg-red-600 text-white font-black uppercase tracking-widest text-[9px] rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all">
                          <LogOut className="h-4 w-4" />
                          Terminate Session
                        </button>
                      </div>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>

            {user ? (
              <div className="hidden lg:block">
                <DropdownMenu>
                  <DropdownMenuTrigger className="relative h-12 w-12 rounded-2xl ring-4 ring-pal-navy/5 hover:ring-pal-blue/20 transition-all outline-none cursor-pointer overflow-hidden bg-white border-2 border-pal-navy p-0 group">
                    <Avatar className="h-full w-full rounded-none">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                      <AvatarFallback className="bg-pal-navy text-pal-beige font-black rounded-none">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-pal-blue/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-white border-4 border-pal-navy rounded-[2rem] p-4 shadow-[20px_20px_0px_0px_rgba(10,25,41,0.05)]" align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="p-4 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-pal-navy rounded-xl flex items-center justify-center">
                            <ShieldCheck className="h-5 w-5 text-pal-blue" />
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm font-black text-pal-navy uppercase leading-none">{user.name}</p>
                            <p className="text-[8px] font-black text-pal-teal uppercase tracking-widest mt-1">
                              {user.role} Authorization
                            </p>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-pal-navy/5 h-1 rounded-full mb-2" />
                    <DropdownMenuGroup className="space-y-1">
                      <DropdownMenuItem className="cursor-pointer focus:bg-pal-navy/5 rounded-xl p-0">
                        <Link href="/overview" className="flex items-center w-full px-4 py-3 text-[10px] font-black uppercase tracking-widest text-pal-navy">
                          <Activity className="mr-3 h-4 w-4 text-pal-blue" />
                          <span>System Overview</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer focus:bg-pal-navy/5 rounded-xl p-0">
                        <Link href="/settings" className="flex items-center w-full px-4 py-3 text-[10px] font-black uppercase tracking-widest text-pal-navy">
                          <Settings className="mr-3 h-4 w-4 text-pal-blue" />
                          <span>Node Settings</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-pal-navy/5 h-1 rounded-full my-2" />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer focus:bg-red-50 rounded-xl px-4 py-3 text-[10px] font-black uppercase tracking-widest text-red-600 flex items-center">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Terminate Session</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-4">
                <Link href="/login">
                  <button className="text-pal-navy font-black uppercase tracking-widest text-[10px] px-6 h-12 flex items-center transition-all hover:bg-pal-navy/5 rounded-xl border-2 border-transparent">
                    Sign In
                  </button>
                </Link>

                <Link href="/signup">
                  <button className="bg-pal-navy hover:bg-pal-blue text-pal-beige hover:text-pal-navy font-black uppercase tracking-widest text-[10px] px-8 h-12 rounded-2xl brutalist-shadow-sm hover:brutalist-shadow transition-all">
                    Register Node
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
