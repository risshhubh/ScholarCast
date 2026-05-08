"use client";

import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, Activity, Cpu } from "lucide-react";

export default function LoginTransition({ user, role }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-pal-navy flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pal-blue rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pal-teal rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-pal-blue p-6 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,163,255,0.3)] mb-12 relative"
        >
          {role === 'teacher' ? (
            <GraduationCap className="h-16 w-16 text-pal-navy" />
          ) : (
            <ShieldCheck className="h-16 w-16 text-pal-navy" />
          )}
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 border-2 border-dashed border-pal-blue/30 rounded-full"
          />
        </motion.div>

        <div className="text-center space-y-6">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-black text-pal-beige uppercase tracking-tighter"
          >
            Logging into <span className="text-pal-blue">ScholarCast</span>
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
              <Activity className="h-4 w-4 text-pal-blue animate-pulse" />
              <span className="text-[10px] font-black text-pal-teal uppercase tracking-[0.3em]">
                Authenticating Node: {user?.name || "GUEST"}
              </span>
            </div>
            
            <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5 p-[1px]">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-pal-blue rounded-full"
              />
            </div>
            
            <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.5em] animate-pulse">
              Establishing Secure Institutional Handshake...
            </p>
          </motion.div>
        </div>
      </div>

      {/* Technical Decals */}
      <div className="absolute bottom-12 left-12 flex items-center gap-4 text-white/20">
          <Cpu className="h-5 w-5" />
          <div className="flex flex-col">
              <span className="text-[7px] font-black uppercase tracking-widest">Protocol: V3.4.1_SECURE</span>
              <span className="text-[7px] font-bold uppercase tracking-[0.4em]">Node Affinity: STABLE</span>
          </div>
      </div>
      
      <div className="absolute top-12 right-12 text-right">
          <span className="text-[10px] font-black text-pal-blue uppercase tracking-widest block mb-1">Status: HANDSHAKE</span>
          <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="h-full w-1/2 bg-pal-blue"
              />
          </div>
      </div>
    </motion.div>
  );
}
