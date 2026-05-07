"use client";

import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Activity, Shield, Zap, Globe, Cpu, Database, Server, Signal, Users, Radio, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAllContent } from "@/hooks/useContent";

export default function OverviewPage() {
  const { user } = useAuth();
  const { data: allContent } = useAllContent();

  const stats = [
    { label: "Global Uptime", value: "99.98%", icon: Activity, color: "text-pal-sage" },
    { label: "Network Latency", value: "24ms", icon: Zap, color: "text-pal-blue" },
    { label: "Active Nodes", value: "124", icon: Globe, color: "text-pal-teal" },
    { label: "Database Load", value: "12%", icon: Database, color: "text-pal-navy" },
  ];

  const systemEvents = [
    { time: "02:14:55", event: "Node-01 uplink established", type: "success" },
    { time: "02:10:12", event: "Administrative review: Physics-101 approved", type: "info" },
    { time: "01:55:03", event: "Signal propagation optimization complete", type: "success" },
    { time: "01:42:22", event: "New educator registration: Node-45", type: "info" },
    { time: "01:30:00", event: "Scheduled system backup started", type: "warning" },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-pal-blue/30">
      <MarketingNavbar />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pal-navy text-pal-beige rounded-full text-[8px] font-black uppercase tracking-widest mb-6">
            <Activity className="h-3 w-3" />
            Live System Pulse // Admin View
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-pal-navy uppercase tracking-tighter leading-none mb-6">
            System<br/><span className="text-pal-blue">Overview</span>
          </h1>
          <p className="text-pal-teal font-medium uppercase tracking-[0.4em] text-[10px]">Real-time monitoring of institutional signal infrastructure</p>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
            >
              <Card className="border-4 border-pal-navy rounded-3xl brutalist-shadow-sm h-full hover:translate-y-[-4px] transition-all">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-pal-navy/5 rounded-2xl">
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-pal-navy/20" />
                  </div>
                  <p className="text-[10px] font-black text-pal-teal uppercase tracking-widest mb-2">{stat.label}</p>
                  <h3 className="text-4xl font-black text-pal-navy tracking-tighter">{stat.value}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Infrastructure Health */}
          <Card className="lg:col-span-2 border-4 border-pal-navy rounded-[3rem] brutalist-shadow overflow-hidden">
            <CardHeader className="bg-pal-navy p-8 border-b-4 border-pal-navy">
              <CardTitle className="text-pal-beige font-black uppercase tracking-tighter text-2xl flex items-center gap-3">
                <Server className="h-6 w-6 text-pal-blue" />
                Infrastructure Health
              </CardTitle>
            </CardHeader>
            <CardContent className="p-10 space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <HealthGauge label="Signal Stability" value={98} />
                <HealthGauge label="Storage Capacity" value={45} />
                <HealthGauge label="Processor Load" value={22} />
              </div>

              <div className="space-y-6">
                <h4 className="text-sm font-black text-pal-navy uppercase tracking-widest border-b-2 border-pal-navy/5 pb-2">Institutional Nodes</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(node => (
                        <div key={node} className="flex items-center gap-3 p-4 bg-pal-navy/5 rounded-2xl border-2 border-transparent hover:border-pal-blue/20 transition-all cursor-crosshair">
                            <div className={`w-2 h-2 rounded-full ${node === 5 ? 'bg-pal-yellow animate-pulse' : 'bg-pal-sage'}`} />
                            <span className="text-[9px] font-black text-pal-navy uppercase tracking-widest">Node-{node.toString().padStart(2, '0')}</span>
                        </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Event Log */}
          <Card className="border-4 border-pal-navy rounded-[3rem] bg-pal-navy text-pal-beige shadow-[20px_20px_0px_0px_rgba(10,25,41,0.05)]">
            <CardHeader className="p-8 border-b-2 border-white/10">
              <CardTitle className="font-black uppercase tracking-tighter text-xl flex items-center gap-3">
                <Signal className="h-5 w-5 text-pal-blue" />
                Live Event Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {systemEvents.map((event, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${event.type === 'success' ? 'bg-pal-sage shadow-[0_0_8px_rgba(20,184,166,0.5)]' : event.type === 'warning' ? 'bg-pal-yellow' : 'bg-pal-blue'}`} />
                        {i !== systemEvents.length - 1 && <div className="w-px h-full bg-white/10 mt-2" />}
                    </div>
                    <div>
                        <p className="text-[9px] font-bold text-pal-teal uppercase tracking-widest mb-1">{event.time}</p>
                        <p className="text-[10px] font-black uppercase leading-tight group-hover:text-pal-blue transition-colors">{event.event}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-4 border-2 border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
                Export System Logs
              </button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function HealthGauge({ label, value }) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <span className="text-[9px] font-black text-pal-teal uppercase tracking-widest">{label}</span>
                <span className="text-xl font-black text-pal-navy">{value}%</span>
            </div>
            <div className="h-3 bg-pal-navy/5 rounded-full overflow-hidden border-2 border-pal-navy/10">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full ${value > 80 ? 'bg-pal-sage' : value > 50 ? 'bg-pal-blue' : 'bg-pal-yellow'}`}
                />
            </div>
        </div>
    );
}
