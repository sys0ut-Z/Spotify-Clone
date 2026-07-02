import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const StatsSkeleton = () => {
  // 4 placeholder cards for 4 stats
  const skeletonCards = Array.from({ length: 4 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {skeletonCards.map((_, index) => (
        <Card key={index} className="bg-zinc-800/50 border border-zinc-700/50">
          <CardContent className="p-4 lg:p-5">
            <div className="flex items-center gap-4">
        
              {/* Icon Box  */}
              <Skeleton className="h-12 w-12 rounded-lg bg-zinc-700/50 mr-1" />
              
              <div className="flex flex-col gap-2">
                {/* Label */}
                <Skeleton className="h-3 w-16 bg-zinc-700/50" />
                
                {/* Value*/}
                <Skeleton className="h-6 w-20 bg-zinc-700/50" />
              </div>
              
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsSkeleton;