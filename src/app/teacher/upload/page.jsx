"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUploadContent } from "@/hooks/useContent";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, UploadCloud, X, Monitor, FileText, ShieldCheck, Clock, GraduationCap } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MarketingNavbar from "@/components/MarketingNavbar";
import Footer from "@/components/Footer";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

const uploadSchema = z.object({
  title: z.string().min(3, "Title is required (min 3 characters)"),
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(10, "Description is required (min 10 characters)"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  rotationDuration: z.string().optional(),
  file: z
    .any()
    .optional()
    .refine((file) => !file || file?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .gif formats are supported."
    )
}).refine((data) => new Date(data.endTime) > new Date(data.startTime), {
  message: "End time must be after start time",
  path: ["endTime"],
});

export default function UploadPage() {
  const { user } = useAuth();
  const router = useRouter();
  const uploadMutation = useUploadContent();
  const [previewUrl, setPreviewUrl] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(uploadSchema),
  });

  const selectedFile = watch("file");

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data) => {
    try {
      let fileUrl = "";
      if (data.file) {
        fileUrl = await fileToBase64(data.file);
      } else {
        // Fetch default image and convert to base64
        const response = await fetch("/default-broadcast.png");
        const blob = await response.blob();
        fileUrl = await fileToBase64(blob);
      }
      
      await uploadMutation.mutateAsync({
        teacherId: user.id,
        title: data.title,
        subject: data.subject,
        description: data.description,
        startTime: new Date(data.startTime).toISOString(),
        endTime: new Date(data.endTime).toISOString(),
        fileUrl,
      });
      
      router.push("/teacher");
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("file", file, { shouldValidate: true });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeFile = () => {
    setValue("file", null, { shouldValidate: true });
    setPreviewUrl(null);
  };

  return (
    <div className="w-full space-y-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Ignition Form */}
          <div className="flex-1 w-full space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-2 mb-10"
            >
              <div className="flex items-center gap-3 text-pal-blue mb-2">
                <div className="w-1 h-1 rounded-full bg-pal-blue animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Broadcast Ignition Sequence</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-pal-navy uppercase tracking-tighter">Initiate <span className="text-pal-blue">Session</span></h1>
            </motion.div>

            <Card className="border-8 border-pal-navy rounded-[3rem] overflow-hidden shadow-[20px_20px_0px_0px_rgba(10,25,41,1)] bg-card">
              <div className="bg-pal-navy p-6 border-b-4 border-white/10 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.4em]">Node-Config: V2.4.0</span>
              </div>
              
              <CardContent className="p-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                  {/* Primary Metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label htmlFor="title" className="text-[10px] font-black text-pal-navy uppercase tracking-[0.2em] flex items-center gap-2">
                        <Monitor className="h-3 w-3 text-pal-blue" />
                        Lesson Identifier
                      </Label>
                      <Input 
                        id="title" 
                        className="h-14 bg-pal-navy/5 border-4 border-pal-navy/10 rounded-2xl font-bold text-lg focus:border-pal-blue focus:ring-0 transition-all px-6" 
                        placeholder="e.g. Quantum Dynamics 101" 
                        {...register("title")} 
                      />
                      {errors.title && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="subject" className="text-[10px] font-black text-pal-navy uppercase tracking-[0.2em] flex items-center gap-2">
                        <GraduationCap className="h-3 w-3 text-pal-blue" />
                        Academic Domain
                      </Label>
                      <select 
                        id="subject" 
                        className="w-full h-14 bg-pal-navy/5 border-4 border-pal-navy/10 rounded-2xl font-bold text-lg focus:border-pal-blue focus:ring-0 transition-all px-6 outline-none appearance-none"
                        {...register("subject")}
                      >
                        <option value="">Select Domain</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="Physics">Physics</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Arts">Arts</option>
                      </select>
                      {errors.subject && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">{errors.subject.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label htmlFor="description" className="text-[10px] font-black text-pal-navy uppercase tracking-[0.2em] flex items-center gap-2">
                      <FileText className="h-3 w-3 text-pal-blue" />
                      Session Briefing
                    </Label>
                    <Textarea 
                      id="description" 
                      className="bg-pal-navy/5 border-4 border-pal-navy/10 rounded-2xl font-bold text-lg focus:border-pal-blue focus:ring-0 transition-all px-6 py-4 min-h-[120px]"
                      placeholder="Detail the curriculum objectives..." 
                      {...register("description")} 
                    />
                    {errors.description && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">{errors.description.message}</p>}
                  </div>

                  {/* Temporal Constraints */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label htmlFor="startTime" className="text-[10px] font-black text-pal-navy uppercase tracking-[0.2em] flex items-center gap-2">
                        <Clock className="h-3 w-3 text-pal-blue" />
                        Ignition Time
                      </Label>
                      <Input id="startTime" className="h-14 bg-pal-navy/5 border-4 border-pal-navy/10 rounded-2xl font-bold text-lg focus:border-pal-blue focus:ring-0 transition-all px-6" type="datetime-local" {...register("startTime")} />
                      {errors.startTime && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">{errors.startTime.message}</p>}
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="endTime" className="text-[10px] font-black text-pal-navy uppercase tracking-[0.2em] flex items-center gap-2">
                        <Clock className="h-3 w-3 text-red-500" />
                        Terminus Time
                      </Label>
                      <Input id="endTime" className="h-14 bg-pal-navy/5 border-4 border-pal-navy/10 rounded-2xl font-bold text-lg focus:border-pal-blue focus:ring-0 transition-all px-6" type="datetime-local" {...register("endTime")} />
                      {errors.endTime && <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">{errors.endTime.message}</p>}
                    </div>
                  </div>

                  {/* Signal Submission & Photo Input */}
                  <div className="space-y-6 pt-10 border-t-4 border-pal-navy/5">
                    <div className="flex flex-col gap-4">
                      <Label className="text-[10px] font-black text-pal-navy dark:text-pal-beige uppercase tracking-[0.2em] flex items-center gap-2">
                        <UploadCloud className="h-3 w-3 text-pal-blue" />
                        Signal Input (Session Cover)
                      </Label>
                      <div 
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.add('border-pal-blue', 'bg-pal-blue/5');
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove('border-pal-blue', 'bg-pal-blue/5');
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove('border-pal-blue', 'bg-pal-blue/5');
                          const file = e.dataTransfer.files?.[0];
                          if (file) handleFileChange({ target: { files: [file] } });
                        }}
                        className="flex flex-col items-center justify-center p-8 border-4 border-dashed border-pal-navy/10 dark:border-white/10 rounded-[2rem] transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <Button 
                            type="button"
                            onClick={() => document.getElementById('file-upload').click()}
                            className="h-14 px-8 bg-white dark:bg-pal-navy border-4 border-pal-navy dark:border-pal-blue text-pal-navy dark:text-pal-beige font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-pal-navy hover:text-white transition-all flex items-center gap-3 brutalist-shadow-sm hover:brutalist-shadow-none"
                          >
                            {selectedFile ? 'Change Signal' : 'Select Source'}
                          </Button>
                          <Input 
                            id="file-upload"
                            type="file" 
                            accept="image/jpeg, image/png, image/gif"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <span className="text-[10px] font-bold text-pal-teal uppercase tracking-widest text-center">
                            {selectedFile ? selectedFile.name : 'or drag and drop signal file here'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting || uploadMutation.isPending} 
                        className="flex-1 h-20 bg-pal-navy hover:bg-pal-blue text-pal-beige font-black uppercase tracking-[0.3em] text-sm rounded-[2rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[14px_14px_0px_0px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center gap-4"
                      >
                        {(isSubmitting || uploadMutation.isPending) ? (
                          <>
                            <Loader2 className="h-6 w-6 animate-spin" />
                            Calibrating Signal...
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="h-6 w-6" />
                            Authorize Broadcast
                          </>
                        )}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="h-20 px-10 border-4 border-pal-navy rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-pal-navy/5" 
                        onClick={() => router.push("/teacher")}
                      >
                        Abort Sequence
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Signal Diagnostics & Preview */}
          <div className="w-full lg:w-[400px] space-y-8">
            <div className="bg-pal-navy text-pal-beige p-8 rounded-[2.5rem] border-8 border-pal-navy shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-8 text-pal-blue">Signal Preview</h3>
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border-4 border-white/10 group mb-8">
                <img 
                  src={previewUrl || "/default-broadcast.png"} 
                  alt="Preview" 
                  className={`w-full h-full object-cover transition-opacity duration-500 ${previewUrl ? 'opacity-80' : 'opacity-40'}`} 
                />
                
                {/* HUD Overlay */}
                <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${previewUrl ? 'bg-green-500 animate-pulse' : 'bg-red-600 animate-pulse'}`} />
                        <span className="text-[6px] font-black text-white uppercase tracking-widest">
                            {previewUrl ? 'Custom Signal' : 'Standard Feed'}
                        </span>
                    </div>
                    <span className="text-[6px] font-black text-white/40 uppercase tracking-widest">CAM_01</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex gap-0.5">
                      {[1,2,3,4].map(i => <div key={i} className="w-0.5 h-2 bg-pal-blue/40" />)}
                    </div>
                    <span className="text-[6px] font-black text-white/40 uppercase tracking-widest">1080p // institutional</span>
                  </div>
                </div>

                <Input 
                  type="file" 
                  accept="image/jpeg, image/png, image/gif"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  onChange={handleFileChange}
                />
              </div>

              {previewUrl && (
                <Button 
                  onClick={removeFile}
                  className="w-full h-12 bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white border-2 border-red-600/20 rounded-xl font-black uppercase tracking-widest text-[10px] mb-8"
                >
                  Reset Signal
                </Button>
              )}

              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-[8px] font-black text-white/40 uppercase tracking-widest block mb-2">Diagnostic Integrity</span>
                  <div className="flex gap-1 items-end h-6">
                    {[selectedFile ? 90 : 20, 70, 50, 80, 40].map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        className="flex-1 bg-pal-blue/30 rounded-t-sm" 
                      />
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center">
                  <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Handshake Status</span>
                  <span className={`text-[9px] font-black uppercase ${selectedFile ? 'text-pal-blue' : 'text-white/20'}`}>
                    {selectedFile ? 'Ready' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-pal-blue/5 border-4 border-dashed border-pal-navy/10 rounded-[2.5rem]">
              <h4 className="text-[10px] font-black text-pal-navy uppercase tracking-[0.3em] mb-4">Institutional Safety</h4>
              <p className="text-xs text-pal-teal font-medium leading-relaxed mb-6">
                All broadcasts are routed through administrative review to ensure academic integrity and synchronized delivery.
              </p>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-pal-blue" />
                <span className="text-[8px] font-black text-pal-navy uppercase tracking-widest">System Authenticated</span>
              </div>
            </div>
          </div>
        </div>
    </div>

  );
}
