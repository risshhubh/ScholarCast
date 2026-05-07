"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Building, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PrincipalSignup() {
  const [name, setName] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      toast.success("Request sent successfully! Our team will contact you shortly.");
      setIsSubmitting(false);
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs removed */}
      
      <Link href="/" className="absolute top-8 left-8 text-pal-teal hover:text-pal-navy flex items-center gap-2 transition-colors z-10 font-bold">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-card border border-pal-navy/10 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto bg-pal-navy w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-pal-navy/20">
              <Building className="h-8 w-8 text-pal-beige" />
            </div>
            <h1 className="text-3xl font-bold text-pal-navy tracking-tight">Institution Setup</h1>
            <p className="text-pal-teal mt-2">Request a ScholarCast enterprise account</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-pal-navy font-bold">Administrator Name</Label>
              <Input
                id="name"
                type="text"
                className="bg-pal-navy/5 border-pal-teal/20 text-pal-navy focus:ring-pal-blue focus:border-pal-blue h-12"
                placeholder="Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institution" className="text-pal-navy font-bold">Institution Name</Label>
              <Input
                id="institution"
                type="text"
                className="bg-pal-navy/5 border-pal-teal/20 text-pal-navy focus:ring-pal-blue focus:border-pal-blue h-12"
                placeholder="Global University"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-pal-navy font-bold">Work Email</Label>
              <Input
                id="email"
                type="email"
                className="bg-pal-navy/5 border-pal-teal/20 text-pal-navy focus:ring-pal-blue focus:border-pal-blue h-12"
                placeholder="admin@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <Button className="w-full h-12 bg-pal-navy hover:bg-pal-teal text-pal-beige text-base font-semibold shadow-lg shadow-pal-navy/20 transition-all mt-4" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Request Access"}
            </Button>
          </form>

          <div className="mt-8 text-center text-pal-teal/60 text-sm">
            Already have an account? <Link href="/login/principal" className="text-pal-blue hover:text-pal-navy font-bold underline">Sign in</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
