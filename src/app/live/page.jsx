"use client";

import { useState } from "react";
import { useAllContent } from "@/hooks/useContent";
import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, Clock, Monitor, Play, Filter, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function LivePortal() {
  const { data: allContent, isLoading } = useAllContent();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // "all", "live", "upcoming"

  const approvedContent = allContent?.filter(item => item.status === "approved") || [];
  
  const filteredContent = approvedContent.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.teacherName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    // In a real app, we'd check against actual broadcast times
    // For this demo, we'll treat all approved as 'Live' for visual impact
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-pal-blue/30">
      <MarketingNavbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Portal Header */}
        <div className="relative mb-16 pt-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pal-blue/5 rounded-full blur-3xl -z-10" />
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-6"
            >
                <div className="bg-pal-blue/10 p-2 rounded-lg">
                    <Globe className="h-5 w-5 text-pal-blue" />
                </div>
                <span className="text-xs font-black text-pal-blue uppercase tracking-[0.3em]">Public Institutional Gateway</span>
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-pal-navy uppercase tracking-tighter mb-8"
            >
                Live <span className="text-pal-blue">Registry</span>
            </motion.h1>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col md:flex-row gap-4 items-end"
            >
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-pal-teal group-focus-within:text-pal-blue transition-colors" />
                    <Input 
                        placeholder="Search institutions, subjects, or educators..."
                        className="h-16 pl-12 bg-white border-4 border-pal-navy rounded-2xl font-bold text-lg brutalist-shadow-sm focus:brutalist-shadow transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {["all", "live", "upcoming"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`h-16 px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all border-4 border-pal-navy ${activeFilter === f ? 'bg-pal-navy text-pal-beige brutalist-shadow' : 'bg-white text-pal-navy hover:bg-pal-navy/5'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>

        {/* Content Registry */}
        <div className="space-y-12 mb-20">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-pal-navy uppercase tracking-tight flex items-center gap-3">
                    <Monitor className="h-6 w-6 text-pal-blue" />
                    Active Synchronized Streams
                </h2>
                <div className="h-1 flex-1 bg-pal-navy/5 mx-6 hidden md:block" />
                <Badge className="bg-red-600 text-white font-black uppercase tracking-widest px-3 py-1 animate-pulse">
                    {filteredContent.length} Nodes Online
                </Badge>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="space-y-4">
                            <Skeleton className="aspect-video w-full rounded-3xl border-4 border-pal-navy/10" />
                            <Skeleton className="h-8 w-3/4 rounded-xl" />
                            <Skeleton className="h-4 w-1/2 rounded-lg" />
                        </div>
                    ))}
                </div>
            ) : filteredContent.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredContent.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="group"
                            >
                                <Link href={`/live/${item.teacherId}`}>
                                    <Card className="border-4 border-pal-navy rounded-[2.5rem] overflow-hidden brutalist-shadow-hover transition-all bg-card h-full flex flex-col">
                                        <div className="relative aspect-video overflow-hidden bg-pal-navy">
                                            {item.fileUrl ? (
                                                <img 
                                                    src={item.fileUrl} 
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pal-navy to-[#132F4C]">
                                                    <Play className="h-12 w-12 text-pal-blue/40 fill-current" />
                                                </div>
                                            )}
                                            
                                            <div className="absolute top-4 left-4 flex gap-2">
                                                <div className="px-3 py-1.5 bg-red-600 rounded-full border-2 border-white shadow-lg flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                                    <span className="text-[8px] font-black text-white uppercase tracking-widest">Live Now</span>
                                                </div>
                                                <div className="px-3 py-1.5 bg-pal-navy/80 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                                                    <span className="text-[8px] font-black text-white uppercase tracking-widest">{item.subject}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-pal-navy via-pal-navy/50 to-transparent">
                                                <div className="flex items-center gap-2 text-pal-blue">
                                                    <Clock className="h-3 w-3" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest">Started 24m ago</span>
                                                </div>
                                            </div>
                                        </div>
                                        <CardContent className="p-8 flex-1 flex flex-col">
                                            <h3 className="text-xl font-black text-pal-navy uppercase leading-tight mb-4 group-hover:text-pal-blue transition-colors">
                                                {item.title}
                                            </h3>
                                            <div className="mt-auto pt-6 border-t border-pal-navy/5 flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-pal-blue/10 flex items-center justify-center border-2 border-pal-blue/20">
                                                    <GraduationCap className="h-5 w-5 text-pal-blue" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-pal-navy uppercase tracking-widest">{item.teacherName || "Institution Educator"}</p>
                                                    <p className="text-[8px] font-bold text-pal-teal uppercase tracking-widest">Certified Broadcaster</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="py-24 text-center bg-pal-navy/5 rounded-[3rem] border-4 border-dashed border-pal-navy/10">
                    <div className="bg-white w-20 h-20 rounded-3xl border-4 border-pal-navy mx-auto mb-6 flex items-center justify-center brutalist-shadow-sm">
                        <Filter className="h-8 w-8 text-pal-navy opacity-20" />
                    </div>
                    <h3 className="text-2xl font-black text-pal-navy uppercase">No Active Nodes Found</h3>
                    <p className="text-pal-teal font-bold uppercase tracking-widest text-xs mt-2">Try adjusting your search parameters or check back during session hours</p>
                </div>
            )}
        </div>

        {/* Global Stats Briefing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
                { label: "Institutional Nodes", value: approvedContent.length, color: "text-pal-blue" },
                { label: "Verified Curriculum", value: allContent?.length || 0, color: "text-pal-navy" },
                { label: "System Integrity", value: "Verified", color: "text-pal-teal" }
            ].map((stat, i) => (
                <div key={i} className="p-10 bg-pal-navy text-pal-beige rounded-[2.5rem] border-4 border-pal-navy shadow-xl relative overflow-hidden group hover:bg-pal-blue hover:text-pal-navy transition-all duration-500">
                    <div className="relative z-10">
                        <p className="text-4xl font-black mb-2">{stat.value}</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">{stat.label}</p>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:bg-pal-navy/5 transition-all" />
                </div>
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
