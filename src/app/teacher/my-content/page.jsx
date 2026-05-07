"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTeacherContent } from "@/hooks/useContent";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, Calendar, MessageSquare, ExternalLink, PlusCircle, BookOpen, Layers, BarChart3, ChevronRight, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const statusColors = {
  pending: "bg-pal-yellow border-pal-navy text-pal-navy",
  approved: "bg-pal-sage border-pal-navy text-pal-navy",
  rejected: "bg-red-500 border-pal-navy text-white",
};

export default function MyContentPage() {
  const { user } = useAuth();
  const { data: contentList, isLoading, error } = useTeacherContent(user?.id);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredContent = contentList?.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
  const paginatedContent = filteredContent.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-32 w-full rounded-3xl bg-pal-navy/5" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-96 w-full rounded-[2.5rem] bg-pal-navy/5" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div className="text-red-600 font-bold p-8 bg-red-50 rounded-3xl border-4 border-red-100 text-center uppercase tracking-tighter">Academic record synchronization failed.</div>;

  const stats = {
    total: contentList?.length || 0,
    approved: contentList?.filter(c => c.status === 'approved').length || 0,
    subjects: new Set(contentList?.map(c => c.subject)).size || 0
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header & Stats Briefing */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="bg-pal-blue p-2 rounded-xl border-2 border-pal-navy">
                <BookOpen className="h-5 w-5 text-pal-navy" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pal-teal">Curriculum Portfolio</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-pal-navy uppercase tracking-tighter leading-none">My <span className="text-pal-blue stroke-pal-navy stroke-1">Archives</span></h1>
          <p className="text-pal-teal font-bold uppercase tracking-widest text-[10px] mt-4 max-w-xl leading-relaxed">Systematic overview of all educational broadcasts submitted for institutional verification.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="bg-white border-4 border-pal-navy p-6 rounded-3xl flex items-center gap-6 shadow-xl flex-1 lg:flex-none">
                <div className="text-center">
                    <div className="text-2xl font-black text-pal-navy">{stats.total}</div>
                    <div className="text-[8px] font-black text-pal-teal uppercase tracking-widest">Total Units</div>
                </div>
                <div className="w-px h-8 bg-pal-navy/10" />
                <div className="text-center">
                    <div className="text-2xl font-black text-pal-navy">{stats.approved}</div>
                    <div className="text-[8px] font-black text-pal-teal uppercase tracking-widest">Verified</div>
                </div>
                <div className="w-px h-8 bg-pal-navy/10" />
                <div className="text-center">
                    <div className="text-2xl font-black text-pal-navy">{stats.subjects}</div>
                    <div className="text-[8px] font-black text-pal-teal uppercase tracking-widest">Domains</div>
                </div>
            </div>
            <Link href="/teacher/upload" className="hidden sm:block">
                <button className="bg-pal-navy text-pal-beige h-[92px] px-8 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] brutalist-shadow transition-all hover:bg-pal-blue hover:text-pal-navy">
                    Initialize<br/>Module
                </button>
            </Link>
        </div>
      </div>

      {contentList?.length === 0 ? (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 bg-pal-navy/5 rounded-[4rem] border-4 border-dashed border-pal-navy/10"
        >
          <PlusCircle className="h-20 w-20 text-pal-teal/20 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-pal-navy uppercase tracking-tighter">Portfolio Empty</h2>
          <p className="text-pal-teal font-bold max-w-xs mx-auto mt-4 leading-relaxed">Begin building your curriculum by initializing your first educational broadcast module.</p>
          <Link href="/teacher/upload">
            <button className="mt-8 bg-pal-navy text-pal-beige px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] brutalist-shadow shadow-xl">
                Create First Module
            </button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {paginatedContent.map((item, idx) => {
             const now = new Date();
             const start = new Date(item.startTime);
             const end = new Date(item.endTime);
             let scheduleStatus = "Upcoming";
             let scheduleColor = "bg-pal-blue text-pal-navy";
             
             if (now >= start && now <= end) {
               scheduleStatus = "Live Now";
               scheduleColor = "bg-red-500 text-white animate-pulse";
             } else if (now > end) {
               scheduleStatus = "Concluded";
               scheduleColor = "bg-pal-navy text-pal-beige";
             }

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="bg-card border-4 border-pal-navy rounded-[2.5rem] overflow-hidden brutalist-shadow hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(10,25,41,1)] transition-all duration-300 flex flex-col h-full group">
                    <div className="relative h-56 overflow-hidden border-b-4 border-pal-navy bg-pal-navy">
                    <img src={item.fileUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-pal-navy/80 to-transparent" />
                    
                    <div className="absolute top-5 left-5 flex flex-col gap-2">
                        <Badge className={`${statusColors[item.status]} border-2 border-pal-navy font-black uppercase tracking-widest text-[8px] px-3 py-1 shadow-lg`}>
                        {item.status}
                        </Badge>
                        {item.status === 'approved' && (
                        <Badge className={`${scheduleColor} border-2 border-pal-navy font-black uppercase tracking-widest text-[8px] px-3 py-1 shadow-lg`}>
                            {scheduleStatus}
                        </Badge>
                        )}
                    </div>
                    
                    <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                        <div className="bg-white border-2 border-pal-navy text-pal-navy px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest">
                            {item.subject || 'General'}
                        </div>
                        <span className="text-[8px] font-black text-white/50 uppercase tracking-[0.2em]">REF: {item.id.slice(-6)}</span>
                    </div>
                    </div>

                    <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-2xl font-black text-pal-navy uppercase tracking-tight leading-none transition-colors group-hover:text-pal-blue">
                        {item.title}
                    </CardTitle>
                    </CardHeader>

                    <CardContent className="px-8 pb-8 space-y-6 flex-1">
                    <p className="text-xs text-pal-teal font-bold leading-relaxed line-clamp-2">
                        {item.description}
                    </p>
                    
                    <div className="bg-pal-navy/[0.03] p-4 rounded-2xl border-2 border-pal-navy/5 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-pal-navy font-black text-[10px] uppercase tracking-widest">
                                <Calendar className="h-3.5 w-3.5 text-pal-blue" />
                                <span>{format(start, "MMM d, yyyy")}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-pal-navy font-black text-[10px] uppercase tracking-widest">
                            <Clock className="h-3.5 w-3.5 text-pal-blue" />
                            <span>{format(start, "HH:mm")} — {format(end, "HH:mm")}</span>
                        </div>
                    </div>

                    {item.status === 'rejected' && (
                        <div className="p-5 bg-red-50 border-2 border-red-200 rounded-[1.5rem]">
                            <div className="flex items-center gap-2 mb-2 text-red-600">
                                <AlertTriangle className="h-4 w-4" />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Revision Feedback</span>
                            </div>
                            <p className="text-[11px] text-red-700 font-bold leading-relaxed italic">{item.rejectionReason || "Please verify curriculum alignment."}</p>
                        </div>
                    )}

                    <div className="pt-6 mt-auto border-t-2 border-pal-navy/5 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-pal-blue" />
                            <span className="text-[9px] font-black text-pal-teal uppercase tracking-widest">Sync Active</span>
                        </div>
                        {item.status === 'approved' && (
                            <Link href={`/live/${user.id}`}>
                                <button className="flex items-center gap-2 text-pal-blue font-black uppercase tracking-widest text-[9px] group/btn">
                                    Broadcast Stream
                                    <ChevronRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        )}
                    </div>
                    </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
