import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const SongsTableSkeleton = () => {
  const skeletonRows = Array.from({ length: 10 });

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-base md:text-lg">
          <TableHead className="w-12.5">ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {skeletonRows.map((_, index) => (
          <TableRow key={index} className="hover:bg-zinc-800/50">
            {/* ID / Image Skeleton */}
            <TableCell className="font-medium">
              <Skeleton className="size-10 rounded bg-zinc-800" />
            </TableCell>
            
            {/* Title Skeleton */}
            <TableCell>
              <Skeleton className="h-4 w-3/4 rounded bg-zinc-800" />
            </TableCell>
            
            {/* Artist Skeleton */}
            <TableCell>
              <Skeleton className="h-4 w-1/2 rounded bg-zinc-800" />
            </TableCell>
            
            {/* Release Date Skeleton (Icon & Text) */}
            <TableCell>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded bg-zinc-800" />
                <Skeleton className="h-4 w-24 rounded bg-zinc-800" />
              </div>
            </TableCell>
            
            {/* Actions Skeleton */}
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <Skeleton className="h-8 w-8 rounded bg-zinc-800" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SongsTableSkeleton;