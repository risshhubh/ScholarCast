"use client";

import { useState } from "react";
import { useAllContent } from "@/hooks/useContent";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Search, ShieldCheck, Activity, Users, Clock, Filter, ChevronRight, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import * as ReactWindow from "react-window";

const statusColors = {
  pending: "bg-pal-yellow/20 text-pal-navy hover:bg-pal-yellow/30",
  approved: "bg-pal-sage/20 text-pal-navy hover:bg-pal-sage/30",
  rejected: "bg-red-100 text-red-800 hover:bg-red-200",
};

const Row = ({ index, style, items }) => {
  const item = items[index];
  if (!item) return null;
  return (
    <div style={style} className="flex items-center border-b-2 border-pal-navy/5 hover:bg-pal-navy/[0.02] transition-colors px-8 py-4">
      <div className="flex-1">
        <div className="font-black text-pal-navy uppercase text-base tracking-tight">{item.title}</div>
        <div className="text-[9px] text-pal-teal font-bold truncate max-w-[200px] uppercase opacity-60">{item.description}</div>
      </div>
      <div className="w-40">
        <Badge className="bg-pal-blue/10 text-pal-blue border-2 border-pal-blue/20 font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg">
            {item.subject || 'General'}
        </Badge>
      </div>
      <div className="w-48">
          <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pal-navy text-pal-beige flex items-center justify-center text-[10px] font-black">
                  {item.teacherId.slice(-1).toUpperCase()}
              </div>
              <span className="text-pal-teal font-black uppercase text-[10px] tracking-widest">ID: {item.teacherId.slice(-6)}</span>
          </div>
      </div>
      <div className="w-32">
        <Badge className={`${statusColors[item.status]} border-2 border-pal-navy/10 font-black text-[9px] uppercase tracking-[0.1em] px-3 py-1 rounded-lg`}>
          {item.status}
        </Badge>
      </div>
      <div className="w-40 text-pal-navy font-black text-xs whitespace-nowrap uppercase tracking-tighter">
        <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-pal-teal" />
            {format(new Date(item.startTime), "MMM d, HH:mm")}
        </div>
      </div>
    </div>
  );
};

export default function PrincipalDashboard() {
  const { data: allContent, isLoading, error } = useAllContent();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48 w-full rounded-3xl bg-pal-navy/5" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl bg-pal-navy/5" />
          ))}
        </div>
        <Skeleton className="h-[500px] w-full rounded-3xl bg-pal-navy/5" />
      </div>
    );
  }

  if (error) return <div className="text-red-600 font-bold p-8 bg-red-50 border-2 border-red-100 rounded-3xl text-center">System synchronization failure. Please verify administrative credentials.</div>;

  const stats = {
    total: allContent?.length || 0,
    approved: allContent?.filter((c) => c.status === "approved").length || 0,
    pending: allContent?.filter((c) => c.status === "pending").length || 0,
    rejected: allContent?.filter((c) => c.status === "rejected").length || 0,
  };

  const filteredContent = allContent?.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.teacherId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);
  const paginatedContent = filteredContent.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-10 pb-20">
      {/* System Governance Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-pal-blue p-8 md:p-12 rounded-[2.5rem] border-4 border-pal-navy shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-pal-navy p-2 rounded-xl">
                        <ShieldCheck className="h-6 w-6 text-pal-beige" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-pal-navy">Administrative Command Center</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-2 text-pal-navy">Institutional <span className="text-white stroke-pal-navy stroke-1">Oversight</span></h1>
                <p className="text-pal-navy/70 font-bold max-w-xl leading-relaxed">Global system health is optimal. Currently monitoring {stats.total} academic broadcasting streams across all departments.</p>
            </div>
            <div className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border-2 border-pal-navy/10 flex items-center gap-6 shadow-xl">
                <div className="text-center">
                    <div className="text-2xl font-black text-pal-navy uppercase">{stats.pending}</div>
                    <div className="text-[9px] font-black text-pal-teal uppercase tracking-widest">Pending Review</div>
                </div>
                <div className="w-px h-10 bg-pal-navy/10" />
                <div className="text-center">
                    <div className="text-2xl font-black text-pal-navy uppercase">99.9%</div>
                    <div className="text-[9px] font-black text-pal-teal uppercase tracking-widest">Sync Uptime</div>
                </div>
            </div>
        </div>
      </motion.div>

      {/* Analytics Briefing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard icon={<BarChart3 className="h-5 w-5 text-pal-navy" />} title="System Loads" value={stats.total} />
        <StatCard icon={<Activity className="h-5 w-5 text-pal-sage" />} title="Authorized" value={stats.approved} />
        <StatCard icon={<Clock className="h-5 w-5 text-pal-yellow" />} title="In Pipeline" value={stats.pending} />
        <StatCard icon={<Users className="h-5 w-5 text-pal-blue" />} title="Educators" value={new Set(allContent?.map(c => c.teacherId)).size} />
      </div>

      {/* Global Archive */}
      <Card className="shadow-2xl border-4 border-pal-navy bg-card rounded-[2rem] overflow-hidden">
        <CardHeader className="p-8 border-b-4 border-pal-navy bg-pal-navy/5">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
            <div>
              <CardTitle className="text-pal-navy font-black text-2xl uppercase tracking-tighter">Institutional Archive</CardTitle>
              <CardDescription className="text-pal-teal font-bold uppercase tracking-widest text-[10px] mt-1">Comprehensive historical logs of all system broadcasts.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-72 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-pal-teal transition-colors group-focus-within:text-pal-blue" />
                <Input
                  placeholder="Filter by title or educator..."
                  className="pl-12 h-12 bg-white border-2 border-pal-navy/10 focus:border-pal-navy rounded-xl font-bold text-sm transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 bg-white p-1 rounded-xl border-2 border-pal-navy/10 w-full sm:w-auto">
                <Filter className="h-4 w-4 ml-3 text-pal-teal" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[150px] border-0 bg-transparent shadow-none font-bold uppercase text-[10px] tracking-widest h-10 focus:ring-0">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-2 border-pal-navy/10 rounded-xl">
                        <SelectItem value="all">Global Feed</SelectItem>
                        <SelectItem value="approved">Authorized</SelectItem>
                        <SelectItem value="pending">In Pipeline</SelectItem>
                        <SelectItem value="rejected">Needs Revision</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {paginatedContent.length === 0 ? (
            <div className="text-center py-24 bg-pal-navy/5">
              <Search className="h-12 w-12 text-pal-teal/20 mx-auto mb-4" />
              <p className="text-pal-teal font-bold uppercase tracking-widest text-xs">No records found matching your criteria.</p>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex items-center px-8 py-5 text-[10px] text-pal-navy font-black uppercase bg-pal-navy/5 border-b-4 border-pal-navy tracking-[0.2em]">
                <div className="flex-1">Broadcast / Curriculum</div>
                <div className="w-40">Academic Area</div>
                <div className="w-48">Lead Educator</div>
                <div className="w-32">Review Status</div>
                <div className="w-40">Schedule</div>
              </div>
              <ReactWindow.List
                height={500}
                rowCount={paginatedContent.length}
                rowHeight={80}
                width="100%"
                rowComponent={Row}
                rowProps={{ items: paginatedContent }}
              />
            </div>
          )}
        </CardContent>
        {totalPages > 1 && (
          <div className="p-6 border-t-4 border-pal-navy bg-pal-navy/5 flex justify-between items-center">
            <span className="text-[10px] font-black text-pal-teal uppercase tracking-widest">Page {currentPage} of {totalPages}</span>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-2 border-pal-navy/20 font-black uppercase text-[10px] px-4"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-2 border-pal-navy/20 font-black uppercase text-[10px] px-4"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
        <Card className="bg-card border-4 border-pal-navy shadow-lg rounded-2xl overflow-hidden brutalist-shadow-sm h-full">
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
