import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";
import { MessageCircle, Mail, Book, HelpCircle, Terminal } from "lucide-react";

export default function SupportPage() {
  const channels = [
    {
        title: "Technical Uplink",
        desc: "Direct communication for signal issues and node deployment assistance.",
        icon: Terminal,
        link: "mailto:tech@scholarcast.edu"
    },
    {
        title: "Knowledge Base",
        desc: "Comprehensive documentation for the Global Educational Mesh protocol.",
        icon: Book,
        link: "#"
    },
    {
        title: "Institutional Help",
        desc: "Dedicated support for school administrators and principals.",
        icon: HelpCircle,
        link: "mailto:admin@scholarcast.edu"
    }
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-pal-blue/30">
      <MarketingNavbar />
      
      <main className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-pal-navy text-pal-beige rounded-full text-[8px] font-black uppercase tracking-widest mb-6">
            <MessageCircle className="h-3 w-3" />
            Support Node NY-01 Active
          </div>
          <h1 className="text-7xl font-black text-pal-navy uppercase tracking-tighter leading-none mb-8">
            Support<br/><span className="text-pal-blue">Uplink</span>
          </h1>
          <p className="text-pal-teal font-medium uppercase tracking-[0.4em] text-[10px] max-w-lg mx-auto">
            Establishing direct communication channels for global educational signal maintenance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {channels.map((channel, i) => (
                <div key={i} className="group p-10 bg-white border-4 border-pal-navy rounded-[3rem] hover:bg-pal-navy hover:text-pal-beige transition-all brutalist-shadow hover:translate-y-[-8px]">
                    <div className="bg-pal-blue/10 p-4 rounded-2xl w-fit mb-8 group-hover:bg-pal-blue/20 transition-all">
                        <channel.icon className="h-8 w-8 text-pal-navy group-hover:text-pal-blue" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-4">{channel.title}</h2>
                    <p className="text-sm font-medium opacity-70 leading-relaxed mb-8">
                        {channel.desc}
                    </p>
                    <a href={channel.link} className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-widest px-6 py-3 border-2 border-current rounded-xl hover:bg-pal-blue hover:text-pal-navy hover:border-pal-blue transition-all">
                        Establish Connection
                    </a>
                </div>
            ))}
        </div>

        <div className="mt-32 p-16 bg-pal-navy rounded-[4rem] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pal-blue to-transparent animate-pulse" />
            <Mail className="h-12 w-12 text-pal-blue mx-auto mb-8" />
            <h2 className="text-4xl font-black text-pal-beige uppercase tracking-tighter mb-6">Global Response Unit</h2>
            <p className="text-pal-teal font-bold uppercase tracking-widest text-[10px] mb-10 max-w-xl mx-auto leading-loose">
                Our support team is distributed across multiple global nodes to ensure 24/7 coverage. Average signal response time: 2.4 hours.
            </p>
            <a href="mailto:support@scholarcast.edu" className="inline-flex h-16 px-12 items-center bg-pal-blue text-pal-navy font-black uppercase tracking-widest text-xs rounded-2xl brutalist-shadow-sm hover:brutalist-shadow transition-all">
                Send Direct Signal
            </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
