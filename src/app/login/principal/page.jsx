"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, ShieldCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PrincipalLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const user = await login(username, password);
      if (user.role !== "principal") throw new Error("Unauthorized role");
      toast.success(`Welcome back, ${user.name}!`);
      router.push("/principal");
    } catch (err) {
      toast.error("Invalid principal credentials. Use principal/password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs removed */}
      
      <Link href="/" className="absolute top-8 left-8 text-pal-teal hover:text-pal-navy flex items-center gap-2 transition-colors z-10 font-bold">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-card border border-pal-navy/10 p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto bg-pal-navy w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-pal-navy/20">
              <ShieldCheck className="h-8 w-8 text-pal-beige" />
            </div>
            <h1 className="text-3xl font-bold text-pal-navy tracking-tight">Principal Portal</h1>
            <p className="text-pal-teal mt-2">Sign in to administer the institution</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-pal-navy font-bold">Username</Label>
              <Input
                id="username"
                type="text"
                className="bg-pal-navy/5 border-pal-teal/20 text-pal-navy focus:ring-pal-blue focus:border-pal-blue h-12"
                placeholder="Enter 'principal'"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="text-pal-navy font-bold">Password</Label>
                <Link href="#" className="text-sm text-pal-blue hover:text-pal-navy">Forgot password?</Link>
              </div>
              <Input
                id="password"
                type="password"
                className="bg-pal-navy/5 border-pal-teal/20 text-pal-navy focus:ring-pal-blue focus:border-pal-blue h-12"
                placeholder="Enter 'password'"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button className="w-full h-12 bg-pal-navy hover:bg-pal-teal text-pal-beige text-base font-semibold shadow-lg shadow-pal-navy/20 transition-all mt-4" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Sign In to Administration"}
            </Button>
          </form>

          <div className="mt-8 text-center text-pal-teal/60 text-sm">
            Need an administrator account? <Link href="/signup/principal" className="text-pal-blue hover:text-pal-navy font-bold underline">Contact IT</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
