"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAllContent } from "@/hooks/useContent";
import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Play, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Lazy load non-critical sections as per technical guidelines
const StatsBureau = dynamic(() => Promise.resolve(({ label, value }) => (
  <div className="flex flex-col gap-2">
    <span className="text-4xl md:text-5xl font-black text-pal-beige">{value}</span>
    <span className="text-xs font-bold text-pal-blue uppercase tracking-widest">{label}</span>
  </div>
)), { ssr: true });

const StepCard = dynamic(() => Promise.resolve(({ num, title, desc }) => (
  <div className="relative group">
    <div className="text-8xl font-black text-pal-navy/5 absolute -top-12 -left-4 -z-10">{num}</div>
    <h3 className="text-2xl font-black text-pal-navy uppercase mb-4">{title}</h3>
    <p className="text-pal-teal leading-relaxed font-medium">{desc}</p>
  </div>
)), { ssr: true });

const FeatureCard = dynamic(() => Promise.resolve(({ icon, title, desc }) => (
  <div className="bg-card p-8 rounded-2xl border border-pal-navy/10 hover:bg-background transition-all shadow-sm">
    <div className="bg-background w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-pal-navy/10">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-pal-navy mb-3">{title}</h3>
    <p className="text-pal-teal leading-relaxed">{desc}</p>
  </div>
)), { ssr: true });

export default function Home() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const { data: allContent } = useAllContent();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-pal-navy flex flex-col font-sans overflow-x-hidden selection:bg-pal-blue/30">
      <MarketingNavbar />

      <main className="flex-1 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-pal-blue/10 border-2 border-pal-blue/20 mb-6"
              >
                <Sparkles className="h-4 w-4 text-pal-blue" />
                <span className="text-[10px] font-black text-pal-blue uppercase tracking-[0.2em]">Accredited Academic Infrastructure</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-pal-navy uppercase"
              >
                The Future of <br />
                <span className="text-pal-blue stroke-pal-navy stroke-2">Broadcasting</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-pal-teal mb-12 max-w-xl font-bold leading-relaxed border-l-4 border-pal-blue pl-6"
              >
                Empowering world-class institutions with secure, synchronized, and scalable content delivery. Built for educators, verified by administrators.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                {user ? (
                  <Link href={user.role === 'teacher' ? "/teacher" : "/principal"}>
                    <button className="h-16 px-10 bg-pal-navy text-pal-beige rounded-2xl font-black uppercase tracking-widest text-sm brutalist-shadow-hover transition-all">
                      Access Dashboard
                    </button>
                  </Link>
                ) : (
                  <>
                    <Link href="/signup">
                      <button className="h-16 px-10 bg-pal-navy text-pal-beige rounded-2xl font-black uppercase tracking-widest text-sm brutalist-shadow-hover transition-all">
                        Institutional Signup
                      </button>
                    </Link>
                    <Link href="/live">
                      <button className="h-16 px-10 bg-white border-4 border-pal-navy text-pal-navy rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-pal-navy/5 transition-all flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        Watch Live Portal
                      </button>
                    </Link>
                  </>
                )}
              </motion.div>
            </div>

            <div className="flex-1 w-full lg:w-auto relative group perspective-1000">
              <motion.div
                initial={{ opacity: 0, rotateX: 5, rotateY: -15, scale: 0.9 }}
                animate={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 bg-pal-navy border-8 border-pal-navy rounded-[2rem] overflow-hidden shadow-[20px_20px_0px_0px_rgba(10,25,41,1),0_40px_100px_-20px_rgba(0,0,0,0.5)] group-hover:translate-x-[-10px] group-hover:translate-y-[-10px] group-hover:shadow-[30px_30px_0px_0px_rgba(10,25,41,1)] transition-all duration-500"
              >
                {/* Header Bar */}
                <div className="bg-pal-navy p-4 flex items-center justify-between border-b-4 border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-12 bg-pal-blue/30 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="h-full w-1/2 bg-pal-blue"
                      />
                    </div>
                    <span className="text-[7px] font-black text-white/40 uppercase tracking-[0.5em]">System.Global.Sync</span>
                  </div>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <img
                    src="/broadcast-grid.png"
                    alt="Global Broadcast Grid"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  />

                  {/* Scanning Line Effect */}
                  <motion.div
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-px bg-pal-blue/30 z-20 pointer-events-none"
                  />

                  {/* Data HUD Overlays */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
                    <div className="flex justify-between items-start">
                      <div className="bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1 h-1 rounded-full bg-pal-blue" />
                          <span className="text-[6px] font-black text-pal-blue uppercase tracking-widest">Signal Strength</span>
                        </div>
                        <div className="flex gap-0.5 h-2 items-end">
                          {[40, 70, 50, 90, 60, 80].map((h, i) => (
                            <motion.div
                              key={i}
                              animate={{ height: [`${h}%`, `${h - 20}%`, `${h}%`] }}
                              transition={{ duration: 0.5 + (i * 0.1), repeat: Infinity }}
                              className="w-1 bg-pal-blue"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-[8px] font-black text-white uppercase tracking-tighter">Node: GLOBAL_SYNC_01</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="bg-pal-blue p-3 rounded-xl border-2 border-pal-navy shadow-lg">
                        <div className="text-[7px] font-black text-pal-navy uppercase tracking-widest mb-0.5">Packet Velocity</div>
                        <div className="text-xl font-black text-pal-navy tracking-tighter">Syncing...</div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="h-8 w-32 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden flex items-center justify-center">
                          <span className="text-[6px] font-black text-white/40 uppercase tracking-[0.3em] animate-pulse">Encryption Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Status Feed */}
                <div className="bg-[#050B14] p-3 border-t-4 border-pal-navy flex items-center gap-4">
                  <div className="flex items-center gap-2 px-2 py-1 bg-pal-blue/10 rounded-md">
                    <div className="w-1 h-1 rounded-full bg-pal-blue animate-ping" />
                    <span className="text-[6px] font-black text-pal-blue uppercase tracking-widest">Live Feed</span>
                  </div>
                  <div className="flex-1 overflow-hidden h-4 relative">
                    <motion.div
                      animate={{ x: ["100%", "-100%"] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute whitespace-nowrap text-[6px] font-bold text-white/30 uppercase tracking-[0.2em]"
                    >
                      SYSTEM CONNECTED // ESTABLISHING HANDSHAKE // ENCRYPTING BROADCAST STREAM // GLOBAL UPTIME 99.99% //
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Technical Decals - Precision Aligned */}
              <div className="absolute -top-12 -left-12 w-20 h-20 border-t-4 border-l-4 border-pal-navy/10 z-0 pointer-events-none" />
              <div className="absolute bottom-[-48px] right-[-48px] w-20 h-20 border-b-4 border-r-4 border-pal-navy/10 z-0 pointer-events-none rounded-br-[3rem]" />
            </div>
          </div>
        </div>

        {/* Stats Bureau */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-pal-navy py-16 border-y-8 border-pal-blue"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <StatsBureau label="Verified Content" value={allContent?.length || 0} />
              <StatsBureau label="Approved Streams" value={allContent?.filter(c => c.status === 'approved').length || 0} />
              <StatsBureau label="Network Status" value="Online" />
              <StatsBureau label="System Integrity" value="Verified" />
            </div>
          </div>
        </motion.div>

        {/* Live Portal Spotlight */}
        <div className="py-32 bg-white border-b-4 border-pal-navy relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0A1929 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border-2 border-red-200 rounded-full mb-6">
                        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                        <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Live Registry Active</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-pal-navy uppercase tracking-tighter mb-8">Access the Institutional <br /> <span className="text-pal-blue">Live Portal</span></h2>
                    <p className="text-xl text-pal-teal font-bold max-w-2xl mx-auto mb-12">
                        The public gateway for students to witness world-class curriculum in real-time. Transparent, synchronized, and secure.
                    </p>
                    <Link href="/live">
                        <button className="h-20 px-16 bg-pal-navy text-pal-beige rounded-[2.5rem] font-black uppercase tracking-widest text-lg brutalist-shadow-hover transition-all hover:bg-pal-blue">
                            Enter Live Environment
                        </button>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Public Channels", desc: "Open-access educational streams for global student participation.", icon: <Globe className="h-6 w-6" /> },
                        { title: "Real-time Sync", desc: "Zero-latency broadcasting across all institutional nodes.", icon: <Zap className="h-6 w-6" /> },
                        { title: "Verified Feeds", desc: "All broadcasts undergo administrative quality assurance.", icon: <ShieldCheck className="h-6 w-6" /> }
                    ].map((item, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 bg-background border-2 border-pal-navy rounded-3xl text-left hover:rotate-1 transition-transform"
                        >
                            <div className="text-pal-blue mb-4">{item.icon}</div>
                            <h4 className="text-xl font-black text-pal-navy uppercase mb-2">{item.title}</h4>
                            <p className="text-sm text-pal-teal font-medium leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

        {/* Workflow Section */}
        <div className="py-32 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <h2 className="text-4xl md:text-6xl font-black text-pal-navy uppercase tracking-tighter mb-4">The Curriculum Lifecycle</h2>
              <p className="text-pal-teal font-bold uppercase tracking-widest text-xs">How ScholarCast synchronizes your entire institution</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <StepCard num="01" title="Unified Access" desc="Teachers apply for institutional credentials, which are verified by the school principal for maximum security." />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <StepCard num="02" title="Curriculum Sync" desc="Educators upload lesson content and schedule broadcasts. Principals review materials to ensure academic quality." />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                <StepCard num="03" title="Public Broadcast" desc="Approved content goes live automatically on the school's public channel, accessible to students worldwide." />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="bg-pal-navy/5 py-32 border-t-4 border-pal-navy">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center mb-24"
            >
              <h2 className="text-4xl md:text-6xl font-black text-pal-navy uppercase tracking-tighter mb-6">Institutional Integrity</h2>
              <div className="h-2 w-24 bg-pal-blue mx-auto" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                <FeatureCard icon={<Zap className="h-8 w-8 text-pal-blue" />} title="Synchronized Delivery" desc="Global low-latency streaming ensures every student receives content at the same millisecond." />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <FeatureCard icon={<ShieldCheck className="h-8 w-8 text-pal-blue" />} title="Administrative Control" desc="A multi-tier approval system ensures no content is broadcast without institutional oversight." />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                <FeatureCard icon={<Globe className="h-8 w-8 text-pal-blue" />} title="Public Transparency" desc="Open-access live channels allow for community-wide learning and institutional transparency." />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Commitment Section */}
        <div className="py-32 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <div className="bg-pal-navy text-pal-beige p-12 rounded-[3rem] brutalist-shadow">
                  <h3 className="text-3xl font-black uppercase mb-6">Our Commitment to Excellence</h3>
                  <p className="text-lg leading-relaxed mb-8 opacity-80">
                    ScholarCast is built on the principle that knowledge should be accessible, secure, and verifiable. We partner with the world's leading schools to provide a platform that respects the sanctity of the classroom while embracing the potential of the digital age.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-1 w-12 bg-pal-blue" />
                    <span className="text-xs font-black uppercase tracking-widest">ScholarCast Governance Board</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 space-y-8"
              >
                <h2 className="text-4xl font-black text-pal-navy uppercase leading-tight">Trusted by the World's Premier Learning Institutions</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-20 bg-pal-navy/5 rounded-2xl border-2 border-pal-navy/10 flex items-center justify-center grayscale opacity-50">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pal-navy">INSTITUTE {i}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-pal-blue py-32 text-center border-y-8 border-pal-navy"
        >
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-5xl md:text-7xl font-black text-pal-navy uppercase tracking-tighter mb-8">{user ? "Access Your Institution" : "Ready to Onboard Your School?"}</h2>
            <Link href={user ? (user.role === 'teacher' ? "/teacher" : "/principal") : "/signup"}>
              <button className="h-20 px-12 bg-pal-navy text-pal-beige rounded-[2rem] font-black uppercase tracking-widest text-lg brutalist-shadow-hover transition-all">
                {user ? "Go to Dashboard" : "Initiate Application"}
              </button>
            </Link>
            {!user && <p className="mt-8 text-pal-navy font-bold uppercase tracking-widest text-xs">Standard review period: 24-48 business hours</p>}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
