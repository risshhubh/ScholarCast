"use client";

import { useLiveContent } from "@/hooks/useContent";
import { GraduationCap, Play, Clock, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { use } from "react";
import Link from "next/link";
import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";

export default function PublicLivePage({ params }) {
  const { teacherId } = use(params);
  const { data: content, isLoading, isError } = useLiveContent(teacherId);

  // Filter for currently active content based on time
  const now = new Date();
  const activeContent = content?.filter(item => {
    const start = new Date(item.startTime);
    const end = new Date(item.endTime);
    return now >= start && now <= end;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-pal-navy border-t-pal-blue rounded-full animate-spin mb-4" />
        <p className="text-pal-navy font-black uppercase tracking-widest text-sm">Initializing Broadcast...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-200 brutalist-shadow mb-6">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-pal-navy uppercase mb-2">Broadcast Error</h2>
            <p className="text-pal-teal font-bold max-w-xs mx-auto">Unable to reach the broadcasting server. Please check the Teacher ID.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-pal-blue/30">
      <MarketingNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        <AnimatePresence mode="wait">
          {activeContent.length > 0 ? (
            <motion.div 
              key="active-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-4 gap-8"
            >
              {/* Main Broadcast Module */}
              <div className="lg:col-span-3 space-y-8">
                <div className="relative aspect-video w-full bg-black rounded-[2.5rem] overflow-hidden border-8 border-pal-navy shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group">
                  <img 
                      src={activeContent[0].fileUrl} 
                      alt={activeContent[0].title}
                      className="w-full h-full object-cover opacity-80"
                  />
                  
                  {/* Technical Overlay HUD */}
                  <div className="absolute inset-0 pointer-events-none">
                      {/* Scanning Line */}
                      <motion.div 
                          animate={{ y: ["-100%", "200%"] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-x-0 h-px bg-pal-blue/20 z-20"
                      />
                      
                      {/* Corner Tags */}
                      <div className="absolute top-8 left-8 flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-600/90 backdrop-blur-md rounded-full border border-red-400/50 shadow-lg animate-pulse">
                            <div className="w-2 h-2 rounded-full bg-white" />
                            <span className="text-[9px] font-black text-white uppercase tracking-widest">Live Stream</span>
                        </div>
                        <div className="px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                            <span className="text-[9px] font-black text-white/80 uppercase tracking-widest">Node ID: {teacherId.slice(-6)}</span>
                        </div>
                      </div>

                      <div className="absolute top-8 right-8 text-right">
                        <div className="flex items-center gap-2 text-pal-blue mb-1">
                            <div className="w-1 h-1 rounded-full bg-pal-blue" />
                            <span className="text-[7px] font-black uppercase tracking-[0.3em]">Institutional Sync</span>
                        </div>
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Uptime: 00:24:12:05</span>
                      </div>

                      {/* Bottom Controls Overlay */}
                      <div className="absolute bottom-0 inset-x-0 p-10 bg-gradient-to-t from-black via-black/40 to-transparent">
                          <div className="flex items-center gap-6">
                              <div className="w-16 h-16 rounded-2xl bg-pal-blue flex items-center justify-center border-2 border-pal-navy shadow-xl">
                                  <Play className="h-8 w-8 text-pal-navy fill-current" />
                              </div>
                              <div>
                                  <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-2">
                                      {activeContent[0].title}
                                  </h1>
                                  <div className="flex items-center gap-4 text-pal-blue/80 font-bold uppercase tracking-widest text-[10px]">
                                      <span className="flex items-center gap-1.5">
                                          <Clock className="h-4 w-4" /> 
                                          Active Session
                                      </span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>

                <div className="bg-card border-4 border-pal-navy p-10 rounded-[3rem] brutalist-shadow">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-1 w-12 bg-pal-blue" />
                    <h3 className="text-xs font-black text-pal-blue uppercase tracking-[0.3em]">Broadcast Intelligence</h3>
                  </div>
                  <p className="text-2xl text-pal-navy font-black leading-tight uppercase mb-8">
                      {activeContent[0].description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                      <div className="bg-pal-navy/5 px-6 py-3 rounded-2xl border-2 border-pal-navy/10">
                          <span className="text-[10px] font-black text-pal-teal uppercase block tracking-widest mb-1 opacity-60">Domain</span>
                          <span className="text-sm font-black text-pal-navy uppercase">{activeContent[0].subject || 'General Academic'}</span>
                      </div>
                      <div className="bg-pal-navy/5 px-6 py-3 rounded-2xl border-2 border-pal-navy/10">
                          <span className="text-[10px] font-black text-pal-teal uppercase block tracking-widest mb-1 opacity-60">Status</span>
                          <span className="text-sm font-black text-pal-navy uppercase">Verified & Accredited</span>
                      </div>
                  </div>
                </div>
              </div>

              {/* Technical Sidebar */}
              <div className="space-y-8">
                <div className="bg-pal-navy p-8 rounded-[2.5rem] text-pal-beige border-4 border-pal-navy brutalist-shadow">
                    <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-8 text-pal-blue">Broadcaster</h4>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-pal-blue/10 border-2 border-pal-blue/30 flex items-center justify-center">
                            <GraduationCap className="h-8 w-8 text-pal-blue" />
                        </div>
                        <div>
                            <p className="text-lg font-black uppercase tracking-tight leading-none mb-1">
                                {activeContent[0].teacherName || "Institution Educator"}
                            </p>
                            <p className="text-[9px] font-bold text-pal-blue uppercase tracking-widest">Certified Administrator</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Global Sync</span>
                            <span className="text-[9px] font-black text-pal-blue uppercase">Stable</span>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-pal-blue/5 border-4 border-dashed border-pal-navy/10 rounded-[2.5rem]">
                    <h4 className="text-[10px] font-black text-pal-navy uppercase tracking-[0.3em] mb-4">Integrity</h4>
                    <div className="text-4xl font-black text-pal-navy mb-1 tracking-tighter">Verified</div>
                    <p className="text-[9px] font-bold text-pal-teal uppercase tracking-widest">Institutional Broadcaster</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <div className="bg-pal-navy/5 p-16 rounded-[4rem] border-4 border-dashed border-pal-navy/10 mb-10 group hover:border-pal-blue transition-all">
                <div className="bg-white w-24 h-24 rounded-[2rem] border-4 border-pal-navy mx-auto mb-8 flex items-center justify-center brutalist-shadow-sm group-hover:brutalist-shadow transition-all">
                    <AlertCircle className="h-10 w-10 text-pal-navy/20" />
                </div>
                <h2 className="text-5xl font-black text-pal-navy uppercase tracking-tighter mb-4">Node Standby</h2>
                <p className="text-xl text-pal-teal font-bold max-w-sm mx-auto uppercase tracking-wide">No active broadcasts detected on this channel.</p>
              </div>
              <Link href="/live">
                <button className="h-16 px-10 bg-pal-navy text-pal-beige rounded-2xl font-black uppercase tracking-widest text-sm brutalist-shadow-hover transition-all">
                    Return to Live Registry
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
