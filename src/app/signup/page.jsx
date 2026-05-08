"use client";

import React, { useState } from "react";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, UserPlus, Building, ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import LoginTransition from "@/components/LoginTransition";

export default function UnifiedSignup() {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState("teacher"); // "teacher" or "principal"
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    schoolName: "",
    subject: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [signedUpUser, setSignedUpUser] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await authService.signup({
        ...formData,
        role: activeTab
      });
      // Auto-login after signup
      const user = await login(formData.username, formData.password);
      setSignedUpUser(user);
      setIsRedirecting(true);

      // Artificial delay for transition effect
      setTimeout(() => {
        toast.success("Welcome to ScholarCast!");
        router.push("/");
      }, 2500);
    } catch (error) {
      toast.error(error.message || "Signup failed");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isRedirecting && (
          <LoginTransition user={signedUpUser} role={activeTab} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <Link href="/" className="absolute top-8 left-8 text-pal-teal hover:text-pal-navy flex items-center gap-2 transition-colors z-10 font-bold uppercase tracking-widest text-xs">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-pal-navy tracking-tight uppercase">Join ScholarCast</h1>
            <p className="text-pal-teal font-bold text-sm uppercase tracking-widest mt-2">Apply for institutional access</p>
        </div>

        <div className="bg-card border-2 border-pal-navy p-1 rounded-2xl mb-6 flex brutalist-shadow">
            <button 
                onClick={() => setActiveTab("teacher")}
                className={`flex-1 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'teacher' ? 'bg-pal-navy text-pal-beige' : 'bg-transparent text-pal-navy hover:bg-pal-navy/5'}`}
            >
                Teacher
            </button>
            <button 
                onClick={() => setActiveTab("principal")}
                className={`flex-1 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${activeTab === 'principal' ? 'bg-pal-navy text-pal-beige' : 'bg-transparent text-pal-navy hover:bg-pal-navy/5'}`}
            >
                Principal
            </button>
        </div>

        <div className="bg-card border-2 border-pal-navy p-8 rounded-3xl brutalist-shadow-hover relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-pal-navy p-3 rounded-xl shadow-lg">
                  {activeTab === 'teacher' ? (
                    <UserPlus className="h-6 w-6 text-pal-beige" />
                  ) : (
                    <Building className="h-6 w-6 text-pal-beige" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-black text-pal-navy uppercase tracking-tight">
                    {activeTab === 'teacher' ? 'Educator Application' : 'Admin Request'}
                  </h2>
                  <p className="text-xs text-pal-teal font-bold uppercase tracking-widest">
                    {activeTab === 'teacher' ? 'Setup Your Classroom' : 'Onboard Your School'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-pal-navy font-black text-xs uppercase tracking-widest">Full Name</Label>
                  <Input
                    className="bg-background border-2 border-pal-navy/20 focus:border-pal-navy rounded-xl h-11 font-bold"
                    placeholder="John Doe"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-pal-navy font-black text-xs uppercase tracking-widest">Username / Email</Label>
                  <Input
                    className="bg-background border-2 border-pal-navy/20 focus:border-pal-navy rounded-xl h-11 font-bold"
                    placeholder="john_doe or john@school.edu"
                    value={formData.username || ""}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required
                  />
                </div>
                {activeTab === 'teacher' ? (
                  <div className="space-y-2">
                    <Label className="text-pal-navy font-black text-xs uppercase tracking-widest">Subject Expertise</Label>
                    <Input
                      className="bg-background border-2 border-pal-navy/20 focus:border-pal-navy rounded-xl h-11 font-bold"
                      placeholder="e.g. Physics, History"
                      value={formData.subject || ""}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label className="text-pal-navy font-black text-xs uppercase tracking-widest">School Name</Label>
                    <Input
                      className="bg-background border-2 border-pal-navy/20 focus:border-pal-navy rounded-xl h-11 font-bold"
                      placeholder="e.g. St. Peters High"
                      value={formData.schoolName || ""}
                      onChange={(e) => setFormData({...formData, schoolName: e.target.value})}
                      required
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label className="text-pal-navy font-black text-xs uppercase tracking-widest">Password</Label>
                  <div className="relative group">
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="bg-background border-2 border-pal-navy/20 focus:border-pal-navy rounded-xl h-11 font-bold pr-12 transition-all"
                      value={formData.password || ""}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-pal-teal hover:text-pal-navy transition-colors focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button 
                    className="w-full h-14 bg-pal-navy hover:bg-pal-teal text-pal-beige text-sm font-black uppercase tracking-widest rounded-xl transition-all brutalist-shadow-sm hover:brutalist-shadow flex items-center justify-center gap-2 mt-4" 
                    type="submit" 
                    disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Submit Application <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 pt-8 border-t-2 border-pal-navy/5 text-center">
            <p className="text-[10px] text-pal-teal font-bold uppercase tracking-widest">
              Already have an account?
            </p>
            <Link 
                href="/login" 
                className="text-xs font-black text-pal-blue uppercase tracking-widest hover:underline mt-1 inline-block"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
