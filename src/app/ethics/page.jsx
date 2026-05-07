import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";
import { Heart, Scale, Globe, Shield } from "lucide-react";

export default function EthicsPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-pal-blue/30">
      <MarketingNavbar />
      
      <main className="max-w-4xl mx-auto px-4 py-24">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pal-navy text-pal-beige rounded-full text-[8px] font-black uppercase tracking-widest mb-6">
            <Heart className="h-3 w-3" />
            Social Impact Node
          </div>
          <h1 className="text-6xl font-black text-pal-navy uppercase tracking-tighter leading-none mb-6">
            Ethics &<br/><span className="text-pal-blue">Standards</span>
          </h1>
          <p className="text-pal-teal font-medium uppercase tracking-widest text-[10px]">Academic Integrity Charter // ScholarCast Global Mesh</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="bg-pal-navy p-8 rounded-[2rem] text-pal-beige">
                <Scale className="h-8 w-8 text-pal-blue mb-6" />
                <h2 className="text-xl font-black uppercase tracking-tight mb-4">Academic Integrity</h2>
                <p className="text-xs text-pal-teal leading-relaxed font-bold uppercase tracking-wider">
                    We maintain rigorous standards for content quality. Every broadcast is a verified educational signal designed to promote genuine knowledge transfer and student growth.
                </p>
            </div>
            <div className="bg-pal-navy/5 border-4 border-pal-navy p-8 rounded-[2rem]">
                <Globe className="h-8 w-8 text-pal-navy mb-6" />
                <h2 className="text-xl font-black text-pal-navy uppercase tracking-tight mb-4">Global Accessibility</h2>
                <p className="text-sm text-pal-teal leading-relaxed font-medium">
                    ScholarCast is committed to low-latency signal delivery in underserved regions. Our mesh network is optimized for resilience in low-bandwidth educational environments.
                </p>
            </div>
        </div>

        <div className="prose prose-sm max-w-none text-pal-teal font-medium">
            <p className="text-lg text-pal-navy font-bold mb-6">Our Commitment to the Future</p>
            <p className="leading-relaxed mb-4">
                The ScholarCast Ethics Committee oversees all network operations to ensure that our technology is never used for misinformation or exploitation. We believe that a high-fidelity educational signal is a fundamental human right.
            </p>
            <p className="leading-relaxed">
                By participating in the mesh, institutions agree to uphold the highest standards of pedagogical excellence and inclusivity.
            </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
