import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="space-y-3">
          <Skeleton className="h-10 w-64 bg-pal-navy/5" />
          <Skeleton className="h-4 w-96 bg-pal-navy/5" />
        </div>
        <Skeleton className="h-12 w-40 bg-pal-navy/5 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card border-2 border-pal-navy/10 rounded-3xl p-6 space-y-4">
            <Skeleton className="h-6 w-1/2 bg-pal-navy/5" />
            <Skeleton className="h-24 w-full bg-pal-navy/5" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-20 bg-pal-navy/5" />
              <Skeleton className="h-8 w-8 rounded-full bg-pal-navy/5" />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border-2 border-pal-navy/10 rounded-3xl p-8 space-y-6">
        <Skeleton className="h-8 w-48 bg-pal-navy/5" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-xl bg-pal-navy/5" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full bg-pal-navy/5" />
                <Skeleton className="h-3 w-2/3 bg-pal-navy/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
