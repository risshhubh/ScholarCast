"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, GraduationCap, ShieldCheck, ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import LoginTransition from "@/components/LoginTransition";

export default function UnifiedLogin() {
  const [activeTab, setActiveTab] = useState("teacher"); // "teacher" or "principal"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const user = await login(username, password);
      if (user.role !== activeTab) throw new Error("Unauthorized role");
      
      setLoggedInUser(user);
      setIsRedirecting(true);
      
      // Artificial delay for the transition effect
      setTimeout(() => {
        toast.success(`Welcome back, ${user.name}!`);
        router.push(activeTab === "teacher" ? "/teacher" : "/principal");
      }, 2500);
    } catch (err) {
      toast.error(`Access Denied: Invalid ${activeTab} credentials`);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isRedirecting && (
          <LoginTransition user={loggedInUser} role={activeTab} />
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
            <h1 className="text-4xl font-black text-pal-navy tracking-tight uppercase">Portal Access</h1>
            <p className="text-pal-teal font-bold text-sm uppercase tracking-widest mt-2">Choose your credentials to enter</p>
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
                    <GraduationCap className="h-6 w-6 text-pal-beige" />
                  ) : (
                    <ShieldCheck className="h-6 w-6 text-pal-beige" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-black text-pal-navy uppercase tracking-tight">
                    {activeTab === 'teacher' ? 'Educator Login' : 'Admin Login'}
                  </h2>
                  <p className="text-xs text-pal-teal font-bold uppercase tracking-widest">
                    {activeTab === 'teacher' ? 'Access Classroom Tools' : 'Institutional Oversight'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-pal-navy font-black text-xs uppercase tracking-widest">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    className="bg-background border-2 border-pal-navy/20 focus:border-pal-navy rounded-xl h-12 font-bold placeholder:text-pal-teal/40"
                    placeholder="Username or Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password" className="text-pal-navy font-black text-xs uppercase tracking-widest">Password</Label>
                    <Link href="#" className="text-[10px] font-black text-pal-blue uppercase tracking-widest hover:underline">Forgot?</Link>
                  </div>
                  <div className="relative group">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="bg-background border-2 border-pal-navy/20 focus:border-pal-navy rounded-xl h-12 font-bold pr-12 transition-all"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-pal-teal hover:text-pal-navy transition-colors focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button 
                    className="w-full h-14 bg-pal-navy hover:bg-pal-teal text-pal-beige text-sm font-black uppercase tracking-widest rounded-xl transition-all brutalist-shadow-sm hover:brutalist-shadow flex items-center justify-center gap-2" 
                    type="submit" 
                    disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Enter Dashboard <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 pt-8 border-t-2 border-pal-navy/5 text-center">
            <p className="text-[10px] text-pal-teal font-bold uppercase tracking-widest">
              {activeTab === 'teacher' ? "Don't have an account?" : "Need admin access?"}
            </p>
            <Link 
                href={activeTab === 'teacher' ? "/signup" : "/signup"} 
                className="text-xs font-black text-pal-blue uppercase tracking-widest hover:underline mt-1 inline-block"
            >
              {activeTab === 'teacher' ? "Register as Educator" : "Contact Institution IT"}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
