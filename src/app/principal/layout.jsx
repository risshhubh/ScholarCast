import AuthGuard from "@/components/AuthGuard";
import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";

export default function PrincipalLayout({ children }) {
  return (
    <AuthGuard allowedRoles={["principal"]}>
      <div className="flex flex-col min-h-screen bg-background text-pal-navy selection:bg-pal-blue/30">
        <MarketingNavbar />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
}
