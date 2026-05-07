import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";
import { ScrollText, Gavel, Scale, FileText } from "lucide-react";

export default function TermsPage() {
  const terms = [
    {
        title: "Signal Transmission Rights",
        content: "By broadcasting on ScholarCast, you affirm that you have the institutional authority to propagate educational content across our mesh network."
    },
    {
        title: "Acceptable Use Protocol",
        content: "Our network is reserved strictly for academic and institutional communication. Malicious signal jamming or non-educational broadcasting will result in immediate node suspension."
    },
    {
        title: "Mesh Sovereignty",
        content: "ScholarCast provides the infrastructure. Each participating institution is responsible for the legal compliance of the content they inject into the mesh."
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-pal-blue/30">
      <MarketingNavbar />
      
      <main className="max-w-4xl mx-auto px-4 py-24">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pal-navy text-pal-beige rounded-full text-[8px] font-black uppercase tracking-widest mb-6">
            <Gavel className="h-3 w-3" />
            Legal Framework v.2.1
          </div>
          <h1 className="text-6xl font-black text-pal-navy uppercase tracking-tighter leading-none mb-6">
            Terms of<br/><span className="text-pal-blue">Service</span>
          </h1>
          <p className="text-pal-teal font-medium uppercase tracking-widest text-[10px]">Institutional Binding Agreement // ScholarCast Signal Mesh</p>
        </div>

        <div className="space-y-12">
          {terms.map((term, i) => (
            <div key={i} className="border-l-4 border-pal-navy pl-8 py-2">
                <h2 className="text-lg font-black text-pal-navy uppercase tracking-tight mb-3 flex items-center gap-3">
                    <span className="text-pal-blue text-xs">0{i+1}</span>
                    {term.title}
                </h2>
                <p className="text-pal-teal leading-relaxed text-sm font-medium">
                    {term.content}
                </p>
            </div>
          ))}
        </div>

        <div className="mt-20 border-4 border-dashed border-pal-navy/20 p-10 rounded-[3rem] text-center">
            <FileText className="h-12 w-12 text-pal-blue mx-auto mb-6" />
            <p className="text-pal-navy font-black uppercase tracking-widest text-sm mb-4">Complete Legal Repository</p>
            <p className="text-xs text-pal-teal font-medium max-w-md mx-auto leading-relaxed">
                For detailed institutional licensing and complex signal mesh agreements, please contact our legal department directly at legal@scholarcast.edu.
            </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
