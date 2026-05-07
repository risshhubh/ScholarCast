import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="h-20 border-b border-pal-navy/10 px-8 flex items-center justify-between">
        <Skeleton className="h-8 w-32 bg-pal-navy/5" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-16 bg-pal-navy/5" />
          <Skeleton className="h-4 w-16 bg-pal-navy/5" />
        </div>
      </div>
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 pt-32 pb-24 space-y-12 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-20 w-full bg-pal-navy/5" />
          <Skeleton className="h-20 w-3/4 mx-auto bg-pal-navy/5" />
          <Skeleton className="h-6 w-1/2 mx-auto bg-pal-navy/5" />
        </div>
        
        <div className="flex justify-center gap-4">
          <Skeleton className="h-14 w-40 rounded-xl bg-pal-navy/5" />
          <Skeleton className="h-14 w-40 rounded-xl bg-pal-navy/5" />
        </div>

        <div className="pt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
                <Skeleton key={i} className="h-64 w-full rounded-[2rem] bg-pal-navy/5" />
            ))}
        </div>
      </div>
    </div>
  );
}
