import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Lock, Eye, ScrollText, FileWarning } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data Signal Integrity",
      icon: ShieldCheck,
      content: "ScholarCast utilizes end-to-end encrypted signal propagation to ensure that educational broadcasts remain within institutional boundaries. We do not monetize student data."
    },
    {
      title: "Node Transparency",
      icon: Eye,
      content: "All metadata collected during broadcasting is used strictly for technical optimization and latency reduction across the Global Educational Mesh."
    },
    {
      title: "Institutional Control",
      icon: Lock,
      content: "School administrators maintain full sovereignty over their content. ScholarCast acts as the signal carrier, not the data owner."
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-pal-blue/30">
      <MarketingNavbar />
      
      <main className="max-w-4xl mx-auto px-4 py-24">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pal-navy text-pal-beige rounded-full text-[8px] font-black uppercase tracking-widest mb-6">
            <Lock className="h-3 w-3" />
            Security Protocol 442-A
          </div>
          <h1 className="text-6xl font-black text-pal-navy uppercase tracking-tighter leading-none mb-6">
            Privacy<br/><span className="text-pal-blue">Protocol</span>
          </h1>
          <p className="text-pal-teal font-medium uppercase tracking-widest text-[10px]">Last Updated: May 2026 // Institutional Version 1.0.4</p>
        </div>

        <div className="grid gap-12">
          {sections.map((section, i) => (
            <section key={i} className="group">
              <div className="flex items-start gap-6">
                <div className="bg-pal-navy/5 p-4 rounded-2xl group-hover:bg-pal-blue/10 transition-all border-2 border-transparent group-hover:border-pal-blue/20">
                  <section.icon className="h-6 w-6 text-pal-navy" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-pal-navy uppercase tracking-tight mb-3">{section.title}</h2>
                  <p className="text-pal-teal leading-relaxed text-sm font-medium">
                    {section.content}
                  </p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 p-8 bg-pal-navy rounded-[2.5rem] text-pal-beige border-4 border-pal-blue shadow-[15px_15px_0px_0px_rgba(59,130,246,0.2)]">
          <div className="flex items-center gap-4 mb-4">
            <FileWarning className="h-6 w-6 text-pal-blue" />
            <h3 className="font-black uppercase tracking-widest text-sm">Signal Termination Notice</h3>
          </div>
          <p className="text-xs text-pal-teal leading-relaxed uppercase tracking-wider font-bold">
            Users may request complete node erasure at any time. ScholarCast guarantees that 100% of institutional signals are purged from the mesh within 24 hours of a verified termination request.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
