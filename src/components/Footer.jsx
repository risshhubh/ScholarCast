"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap, Heart, Globe, Mail, MessageCircle, Radio, ShieldCheck, LayoutDashboard, Cpu, Layers, Share2 } from "lucide-react";

export default function Footer() {
  const [nodeId, setNodeId] = useState("");

  useEffect(() => {
    setNodeId(Math.random().toString(36).substring(7).toUpperCase());
  }, []);

  return (
    <footer className="bg-pal-navy pt-24 pb-12 border-t-8 border-pal-blue relative overflow-hidden">
      {/* Decorative Technical Elements */}
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Radio className="h-64 w-64 text-pal-beige animate-pulse" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-8 group">
              <div className="bg-pal-blue p-2.5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(245,245,245,0.2)]">
                <GraduationCap className="h-6 w-6 text-pal-navy" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter text-pal-beige uppercase">
                    Scholar<span className="text-pal-blue">Cast</span>
                </span>
                <span className="text-[6px] font-black text-pal-teal uppercase tracking-[0.5em]">Global Educational Mesh</span>
              </div>
            </Link>
            <p className="text-pal-teal text-xs mb-8 leading-loose font-medium uppercase tracking-wider">
              The premier institutional broadcasting framework for modern education. Synchronizing global knowledge through state-of-the-art signal propagation.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Cpu, href: "#" },
                { icon: Layers, href: "#" },
                { icon: Share2, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 w-12 rounded-2xl bg-white/5 border-2 border-pal-beige/10 flex items-center justify-center text-pal-teal hover:text-pal-blue hover:border-pal-blue transition-all brutalist-shadow-sm hover:brutalist-shadow active:translate-x-1 active:translate-y-1"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-[10px] font-black text-pal-beige uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4 text-pal-blue" />
                Platform Access
            </h3>
            <ul className="space-y-4">
              <li><Link href="/live" className="text-pal-teal hover:text-pal-beige text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-pal-blue group-hover:scale-150 transition-transform" />Live Portal</Link></li>
              <li><Link href="/teacher" className="text-pal-teal hover:text-pal-beige text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-pal-blue group-hover:scale-150 transition-transform" />Dashboard</Link></li>
              <li><Link href="/principal/approval" className="text-pal-teal hover:text-pal-beige text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-pal-blue group-hover:scale-150 transition-transform" />Principal Review Pool</Link></li>
              <li><Link href="/signup" className="text-pal-teal hover:text-pal-beige text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-pal-blue group-hover:scale-150 transition-transform" />Register New Node</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[10px] font-black text-pal-beige uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                <Radio className="h-4 w-4 text-pal-blue" />
                Connectivity
            </h3>
            <ul className="space-y-4">
              <li><Link href="/support" className="text-pal-teal hover:text-pal-beige text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-pal-blue group-hover:scale-150 transition-transform" />Support Uplink</Link></li>
              <li><Link href="/overview" className="text-pal-teal hover:text-pal-beige text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-pal-blue group-hover:scale-150 transition-transform" />System Overview</Link></li>
              <li><Link href="/support" className="text-pal-teal hover:text-pal-beige text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-pal-blue group-hover:scale-150 transition-transform" />Documentation</Link></li>
              <li><Link href="mailto:contact@scholarcast.edu" className="text-pal-teal hover:text-pal-beige text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-pal-blue group-hover:scale-150 transition-transform" />Contact HQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[10px] font-black text-pal-beige uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-pal-blue" />
                Compliance
            </h3>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-pal-teal hover:text-pal-beige text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-pal-blue group-hover:scale-150 transition-transform" />Privacy Protocol</Link></li>
              <li><Link href="/terms" className="text-pal-teal hover:text-pal-beige text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-pal-blue group-hover:scale-150 transition-transform" />Terms of Service</Link></li>
              <li><Link href="/ethics" className="text-pal-teal hover:text-pal-beige text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-pal-blue group-hover:scale-150 transition-transform" />Ethics & Standards</Link></li>
              <li><Link href="/live" className="text-pal-teal hover:text-pal-beige text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 group"><div className="w-1.5 h-1.5 rounded-full bg-pal-blue group-hover:scale-150 transition-transform" />Institutional Licenses</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t-2 border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:items-start items-center gap-2">
            <p className="text-pal-teal/40 text-[9px] font-black uppercase tracking-[0.2em]">
                © {new Date().getFullYear()} ScholarCast Institutional. All Signal Rights Reserved.
            </p>
            <p className="text-pal-teal/20 text-[7px] font-black uppercase tracking-[0.4em]">
                Verified Node: {nodeId || "SYNCING..."} // LATENCY: 12ms
            </p>
          </div>
          
          <div className="px-6 py-3 bg-white/5 border-2 border-white/10 rounded-2xl flex items-center gap-4">
            <p className="text-pal-beige text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                Engineered with <Heart className="h-3 w-3 text-red-500 fill-current animate-pulse" /> for Education
            </p>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span className="text-[7px] font-black text-pal-teal uppercase tracking-widest">Global Ops Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
