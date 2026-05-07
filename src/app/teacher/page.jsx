"use client";

import { useAuth } from "@/context/AuthContext";
import { useTeacherContent } from "@/hooks/useContent";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { PlusCircle, Calendar, Play, CheckCircle, AlertCircle, Clock, GraduationCap, ChevronRight } from "lucide-react";
import Link from "next/link";

const statusColors = {
  pending: "bg-pal-yellow/20 text-pal-navy hover:bg-pal-yellow/30",
  approved: "bg-pal-sage/20 text-pal-navy hover:bg-pal-sage/30",
  rejected: "bg-red-100 text-red-800 hover:bg-red-200",
};

export default function TeacherDashboard() {
  const { user } = useAuth();
  const { data: contentList, isLoading, error } = useTeacherContent(user?.id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full rounded-3xl bg-pal-navy/5" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl bg-pal-navy/5" />
          ))}
        </div>
        <Skeleton className="h-[400px] w-full rounded-3xl bg-pal-navy/5" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 font-bold p-8 bg-red-50 border-2 border-red-100 rounded-3xl text-center flex flex-col items-center gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <div>
          <h3 className="text-xl font-black uppercase tracking-tight mb-2">Synchronization Error</h3>
          <p className="max-w-md mx-auto text-sm opacity-80">{error.message}</p>
        </div>
        {error.message.includes('IP address') && (
          <a 
            href="https://www.mongodb.com/docs/atlas/security-whitelist/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-widest bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors"
          >
            How to fix whitelist
          </a>
        )}
      </div>
    );
  }

  const stats = {
    total: contentList?.length || 0,
    approved: contentList?.filter((c) => c.status === "approved").length || 0,
    pending: contentList?.filter((c) => c.status === "pending").length || 0,
    rejected: contentList?.filter((c) => c.status === "rejected").length || 0,
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-pal-navy p-8 md:p-12 rounded-[2.5rem] text-pal-beige relative overflow-hidden border-4 border-pal-blue shadow-2xl"
      >
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-pal-blue p-2 rounded-xl">
                    <GraduationCap className="h-6 w-6 text-pal-navy" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pal-blue">Institutional Educator Portal</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-2">Welcome Back, <span className="text-pal-blue">{user?.name.split(' ')[0]}</span></h1>
            <p className="text-pal-teal font-bold max-w-xl leading-relaxed">Your curriculum is synchronized. You have {stats.pending} lessons awaiting administrative review.</p>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-pal-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] w-32 h-32 bg-pal-teal/5 rounded-full blur-2xl" />
      </motion.div>

      {/* Stats Bureau */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard icon={<Calendar className="h-5 w-5 text-pal-navy" />} title="Total Lessons" value={stats.total} />
        <StatCard icon={<CheckCircle className="h-5 w-5 text-pal-sage" />} title="Verified" value={stats.approved} />
        <StatCard icon={<Clock className="h-5 w-5 text-pal-yellow" />} title="In Review" value={stats.pending} />
        <StatCard icon={<AlertCircle className="h-5 w-5 text-red-500" />} title="Needs Action" value={stats.rejected} />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard 
            href="/teacher/upload" 
            title="Create Lesson" 
            desc="Broadcast new material to students" 
            icon={<PlusCircle className="h-6 w-6" />}
            className="bg-pal-blue text-pal-navy"
          />
          <ActionCard 
            href="/teacher/my-content" 
            title="My Curriculum" 
            desc="Manage and track all lessons" 
            icon={<Play className="h-6 w-6" />}
            className="bg-white border-4 border-pal-navy"
          />
          <ActionCard 
            href="/teacher" 
            title="Live Analytics" 
            desc="Monitor student engagement" 
            icon={<ChevronRight className="h-6 w-6" />}
            className="bg-pal-navy text-pal-beige"
          />
      </div>

      {/* Curriculum Pipeline */}
      <Card className="bg-card border-4 border-pal-navy shadow-xl rounded-[2rem] overflow-hidden">
        <CardHeader className="bg-pal-navy p-8 border-b-4 border-pal-navy flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-pal-beige font-black text-2xl uppercase tracking-tighter">Curriculum Pipeline</CardTitle>
            <CardDescription className="text-pal-teal font-bold uppercase tracking-widest text-[10px] mt-1">Real-time status of your academic broadcasts.</CardDescription>
          </div>
          <Link href="/teacher/my-content">
            <Button variant="outline" className="bg-transparent border-2 border-pal-teal/30 text-pal-teal hover:bg-pal-blue hover:text-pal-navy font-black uppercase tracking-widest text-[10px] px-6">View All</Button>
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {contentList?.length === 0 ? (
            <div className="text-center py-24 bg-pal-navy/5">
              <PlusCircle className="h-12 w-12 text-pal-teal/20 mx-auto mb-4" />
              <p className="text-pal-teal font-bold uppercase tracking-widest text-xs">No lessons found in pipeline</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] text-pal-navy font-black uppercase bg-pal-navy/5 border-b-4 border-pal-navy tracking-[0.2em]">
                  <tr>
                    <th className="px-8 py-5">Lesson / Subject</th>
                    <th className="px-8 py-5">Review Status</th>
                    <th className="px-8 py-5">Broadcast Window</th>
                    <th className="px-8 py-5">Administrative Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-pal-navy/5">
                  {contentList.slice(0, 5).map((item, idx) => {
                    const now = new Date();
                    const start = new Date(item.startTime);
                    const end = new Date(item.endTime);
                    let scheduleStatus = "Scheduled";
                    let scheduleColor = "bg-pal-blue/10 text-pal-blue border-pal-blue/20";
                    
                    if (now >= start && now <= end) {
                      scheduleStatus = "Live";
                      scheduleColor = "bg-red-500 text-white animate-pulse";
                    } else if (now > end) {
                      scheduleStatus = "Expired";
                      scheduleColor = "bg-pal-navy/10 text-pal-teal";
                    }

                    return (
                      <motion.tr 
                        key={item.id} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-pal-navy/[0.02] transition-colors"
                      >
                        <td className="px-8 py-6">
                          <div className="font-black text-pal-navy uppercase text-base">{item.title}</div>
                          <div className="text-[10px] text-pal-teal font-black uppercase tracking-[0.2em]">{item.subject}</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col gap-2">
                            <Badge className={`${statusColors[item.status]} border-2 border-pal-navy/10 font-black px-3 py-1 rounded-lg capitalize text-[10px] w-fit`}>
                              {item.status}
                            </Badge>
                            {item.status === 'approved' && (
                              <div className={`flex items-center gap-1.5 ${scheduleColor} px-2 py-1 rounded-md text-[9px] font-black w-fit uppercase tracking-tighter`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${scheduleStatus === 'Live' ? 'bg-white' : 'bg-current'}`} />
                                {scheduleStatus}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-pal-navy font-black text-sm">{format(start, "MMM d, HH:mm")}</div>
                          <div className="text-[10px] text-pal-teal font-black uppercase tracking-widest mt-0.5">Duration: {format(end, "HH:mm")}</div>
                        </td>
                        <td className="px-8 py-6 max-w-xs">
                          {item.status === 'rejected' ? (
                            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-2xl border-2 border-red-100 text-[10px] font-bold leading-relaxed">
                               <span className="block uppercase tracking-widest mb-1 opacity-60">Rejection Reason</span>
                               {item.rejectionReason}
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-pal-navy/5 flex items-center justify-center shrink-0">
                                    <CheckCircle className={`h-5 w-5 ${item.status === 'approved' ? 'text-pal-sage' : 'text-pal-teal/30'}`} />
                                </div>
                                <span className="text-[11px] text-pal-teal font-bold">{item.status === 'pending' ? 'Reviewing alignment with curriculum standards...' : 'Content verified and cleared for broadcast.'}</span>
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
        <Card className="bg-card border-4 border-pal-navy shadow-lg rounded-2xl overflow-hidden brutalist-shadow-sm">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="bg-pal-navy/5 p-2 rounded-xl border border-pal-navy/10">{icon}</div>
                    <ChevronRight className="h-4 w-4 text-pal-teal/30" />
                </div>
                <p className="text-[10px] font-black text-pal-teal uppercase tracking-widest mb-1">{title}</p>
                <h3 className="text-4xl font-black tracking-tighter text-pal-navy">{value}</h3>
            </CardContent>
        </Card>
    </motion.div>
  );
}

function ActionCard({ href, title, desc, icon, className }) {
    return (
        <Link href={href}>
            <motion.div whileHover={{ scale: 1.02 }} whileActive={{ scale: 0.98 }}>
                <Card className={`p-6 rounded-3xl cursor-pointer brutalist-shadow shadow-xl h-full flex items-center gap-6 ${className}`}>
                    <div className="bg-current opacity-10 absolute inset-0 -z-10" />
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20">{icon}</div>
                    <div>
                        <h4 className="font-black uppercase tracking-tight text-xl">{title}</h4>
                        <p className="text-xs font-medium opacity-70 mt-1">{desc}</p>
                    </div>
                </Card>
            </motion.div>
        </Link>
    );
}
