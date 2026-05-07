"use client";

import { useState } from "react";
import { usePendingContent, useApproveContent, useRejectContent } from "@/hooks/useContent";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Loader2, Check, X, Eye, AlertTriangle, Calendar, Clock, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ApprovalPage() {
  const { data: pendingContent, isLoading, error } = usePendingContent();
  const approveMutation = useApproveContent();
  const rejectMutation = useRejectContent();

  const [rejectItem, setRejectItem] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const handleApprove = async (id) => {
    await approveMutation.mutateAsync(id);
  };

  const openRejectDialog = (item) => {
    setRejectItem(item);
    setRejectReason("");
    setIsRejectDialogOpen(true);
  };

  const handleReject = async () => {
    if (!rejectReason.trim() || !rejectItem) return;
    await rejectMutation.mutateAsync({ id: rejectItem.id, reason: rejectReason });
    setIsRejectDialogOpen(false);
    setRejectItem(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-64 bg-pal-navy/5" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-96 w-full rounded-[2.5rem] bg-pal-navy/5" />
          ))}
        </div>
      </div>
    );
  }

  if (error) return <div className="text-red-600 font-bold p-8 bg-red-50 border-2 border-red-100 rounded-3xl text-center">System failure in review synchronization.</div>;

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-pal-navy uppercase">Approval Pool</h1>
            <div className="text-pal-teal font-bold uppercase tracking-widest text-[10px] mt-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-pal-yellow animate-pulse" />
                Administrative review required for {pendingContent?.length || 0} curriculum modules
            </div>
        </div>
      </div>

      {pendingContent?.length === 0 ? (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 bg-pal-navy/5 rounded-[4rem] border-4 border-dashed border-pal-navy/10"
        >
          <div className="bg-pal-sage/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-pal-sage/20">
            <Check className="h-12 w-12 text-pal-sage" />
          </div>
          <h2 className="text-3xl font-black text-pal-navy uppercase tracking-tighter">Queue Synchronized</h2>
          <p className="text-pal-teal font-bold max-w-sm mx-auto mt-4 leading-relaxed">The curriculum approval queue is empty. All current broadcasts have been verified.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {pendingContent.map((item, idx) => (
                <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    transition={{ delay: idx * 0.1 }}
                >
                    <Card className="bg-card border-4 border-pal-navy rounded-[3rem] overflow-hidden brutalist-shadow hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(10,25,41,1)] transition-all duration-300 flex flex-col h-full">
                    <div className="h-64 w-full bg-pal-navy relative group overflow-hidden">
                        <img 
                            src={item.fileUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-pal-navy to-transparent opacity-60" />
                        
                        <div className="absolute top-6 left-6">
                            <Badge className="bg-pal-blue text-pal-navy border-2 border-pal-navy font-black text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 shadow-lg">
                                Pending Authorization
                            </Badge>
                        </div>
                        
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                    <GraduationCap className="h-6 w-6 text-pal-blue" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none">{item.title}</h3>
                                    <p className="text-pal-blue font-bold uppercase tracking-widest text-[9px] mt-1">Educator Ref: #{item.teacherId.slice(-6)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <CardContent className="p-8 pb-4 flex-1">
                        <p className="text-pal-teal font-bold text-sm mb-8 leading-relaxed line-clamp-3">
                            {item.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-pal-navy/[0.03] p-4 rounded-2xl border-2 border-pal-navy/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="h-3 w-3 text-pal-blue" />
                                    <span className="text-[9px] font-black text-pal-teal uppercase tracking-widest">Broadcast Date</span>
                                </div>
                                <span className="text-xs font-black text-pal-navy uppercase">{format(new Date(item.startTime), "MMMM d, yyyy")}</span>
                            </div>
                            <div className="bg-pal-navy/[0.03] p-4 rounded-2xl border-2 border-pal-navy/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="h-3 w-3 text-pal-blue" />
                                    <span className="text-[9px] font-black text-pal-teal uppercase tracking-widest">Time Window</span>
                                </div>
                                <span className="text-xs font-black text-pal-navy uppercase">{format(new Date(item.startTime), "HH:mm")} — {format(new Date(item.endTime), "HH:mm")}</span>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="p-8 pt-4 flex gap-4">
                        <Button 
                            variant="outline" 
                            className="flex-1 h-14 border-4 border-pal-navy text-red-600 font-black uppercase tracking-widest text-[11px] rounded-[1.25rem] hover:bg-red-50 hover:text-red-700 transition-all group"
                            onClick={() => openRejectDialog(item)}
                            disabled={approveMutation.isPending || rejectMutation.isPending}
                        >
                            <X className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" /> Deny Access
                        </Button>
                        <Button 
                            className="flex-1 h-14 bg-pal-navy hover:bg-pal-teal text-pal-beige font-black uppercase tracking-widest text-[11px] rounded-[1.25rem] brutalist-shadow-sm transition-all group"
                            onClick={() => handleApprove(item.id)}
                            disabled={approveMutation.isPending || rejectMutation.isPending}
                        >
                            {approveMutation.isPending && approveMutation.variables === item.id ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <Check className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform" />
                            )}
                            Grant Authorization
                        </Button>
                    </CardFooter>
                    </Card>
                </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="bg-white border-4 border-pal-navy rounded-[3rem] p-10 max-w-lg">
          <DialogHeader className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4 border-2 border-red-200">
                <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <DialogTitle className="text-3xl font-black text-pal-navy uppercase tracking-tighter">Decline Authorization</DialogTitle>
            <DialogDescription className="text-pal-teal font-bold text-sm leading-relaxed mt-2">
              Please provide formal feedback for <span className="text-pal-navy font-black">"{rejectItem?.title}"</span>. This reasoning will be transmitted to the educator for curriculum revision.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Textarea
              placeholder="Detailed administrative feedback..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={5}
              className="w-full bg-pal-navy/5 border-2 border-pal-navy/20 rounded-2xl p-4 font-bold text-sm focus:border-pal-navy transition-all"
            />
          </div>
          
          <DialogFooter className="mt-8 flex gap-4">
            <Button variant="outline" className="h-12 flex-1 border-2 border-pal-navy/10 font-black uppercase text-[10px]" onClick={() => setIsRejectDialogOpen(false)}>Cancel</Button>
            <Button 
              className="h-12 flex-1 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg"
              onClick={handleReject}
              disabled={!rejectReason.trim() || rejectMutation.isPending}
            >
              {rejectMutation.isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Confirm Decline"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
