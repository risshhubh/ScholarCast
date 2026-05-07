"use client";

import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { User, Shield, Bell, Zap, Terminal, Save, Sliders, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user, isLoading } = useAuth();

  const handleSave = () => {
    toast.success("Node configuration updated successfully");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pal-navy border-t-pal-blue rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-pal-blue/30">
      <MarketingNavbar />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pal-navy text-pal-beige rounded-full text-[8px] font-black uppercase tracking-widest mb-6">
            <Sliders className="h-3 w-3" />
            Core Configuration // Node-01
          </div>
          <h1 className="text-7xl font-black text-pal-navy uppercase tracking-tighter leading-none mb-6">
            Node<br /><span className="text-pal-blue">Settings</span>
          </h1>
          <p className="text-pal-teal font-medium uppercase tracking-[0.4em] text-[10px]">Customize your institutional signal parameters</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { label: 'Profile Management', icon: User, active: true },
              { label: 'Security & Auth', icon: Shield },
              { label: 'Signal Quality', icon: Zap },
              { label: 'Notifications', icon: Bell },
              { label: 'Network Ops', icon: Globe }
            ].map((item, i) => (
              <button
                key={i}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl border-2 transition-all font-black uppercase tracking-widest text-[10px] ${item.active ? 'bg-pal-navy text-pal-beige border-pal-navy shadow-[6px_6px_0px_0px_rgba(59,130,246,0.2)]' : 'bg-white text-pal-navy border-pal-navy/5 hover:border-pal-blue/20'}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2 space-y-10">
            {/* Profile Section */}
            <section className="p-10 bg-white border-4 border-pal-navy rounded-[3rem] brutalist-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Terminal className="h-24 w-24" />
              </div>

              <h2 className="text-2xl font-black text-pal-navy uppercase tracking-tight mb-8 flex items-center gap-3">
                <User className="h-6 w-6 text-pal-blue" />
                Identity Protocol
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-pal-teal">Full Legal Name</Label>
                    <Input defaultValue={user?.name || ""} className="border-2 border-pal-navy/10 rounded-xl h-12 focus:border-pal-blue transition-all font-bold" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-pal-teal">Institutional Role</Label>
                    <Input value={user?.role?.toUpperCase() || ""} disabled className="border-2 border-pal-navy/5 bg-pal-navy/5 rounded-xl h-12 font-black text-pal-navy/40" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-pal-teal">Communications Uplink (Email)</Label>
                  <Input defaultValue={user?.email || ""} className="border-2 border-pal-navy/10 rounded-xl h-12 focus:border-pal-blue transition-all font-bold" />
                </div>
              </div>
            </section>

            {/* Signal Optimization */}
            <section className="p-10 bg-pal-navy rounded-[3rem] text-pal-beige border-4 border-pal-blue shadow-[15px_15px_0px_0px_rgba(59,130,246,0.1)]">
              <h2 className="text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                <Zap className="h-6 w-6 text-pal-blue" />
                Signal Propagation
              </h2>

              <div className="space-y-8">
                <div className="flex items-center justify-between p-6 bg-white/5 border-2 border-white/10 rounded-2xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest">Ultra-Low Latency Mode</span>
                    <span className="text-[8px] font-bold text-pal-teal uppercase">Prioritize speed over redundant signal checks</span>
                  </div>
                  <div className="w-12 h-6 bg-pal-blue rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-pal-navy rounded-full" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-white/5 border-2 border-white/10 rounded-2xl">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase tracking-widest">Global Mesh Discovery</span>
                    <span className="text-[8px] font-bold text-pal-teal uppercase">Allow other nodes to sync with your broadcast</span>
                  </div>
                  <div className="w-12 h-6 bg-pal-teal/20 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-pal-teal rounded-full shadow-[0_0_8px_rgba(20,184,166,0.5)]" />
                  </div>
                </div>
              </div>
            </section>

            <div className="flex justify-end gap-4">
              <Button variant="outline" className="h-14 px-8 border-2 border-pal-navy text-pal-navy font-black uppercase tracking-widest rounded-2xl hover:bg-pal-navy/5">
                Reset Protocol
              </Button>
              <Button onClick={handleSave} className="h-14 px-12 bg-pal-navy text-pal-beige font-black uppercase tracking-widest rounded-2xl brutalist-shadow hover:translate-y-[-2px] transition-all flex items-center gap-3">
                <Save className="h-5 w-5 text-pal-blue" />
                Commit Configuration
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
