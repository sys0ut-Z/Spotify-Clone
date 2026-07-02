import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const AlbumsTableSkeleton = () => {
  // 5 rows
  const skeletonRows = Array.from({ length: 5 });

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-12.5"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Year</TableHead>
          <TableHead>Songs</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      
      <TableBody>
        {skeletonRows.map((_, index) => (
          <TableRow key={index} className="hover:bg-zinc-800/50">
            {/* Image */}
            <TableCell>
              <Skeleton className="w-10 h-10 rounded bg-zinc-800" />
            </TableCell>
            
            {/* Title */}
            <TableCell>
              <Skeleton className="h-4 w-3/4 rounded bg-zinc-800" />
            </TableCell>
            
            {/* Artist */}
            <TableCell>
              <Skeleton className="h-4 w-2/3 rounded bg-zinc-800" />
            </TableCell>
            
            {/* Release Year (Icon & Text) */}
            <TableCell>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded bg-zinc-800" />
                <Skeleton className="h-4 w-12 rounded bg-zinc-800" />
              </div>
            </TableCell>
            
            {/* Songs Count (Icon & Text) */}
            <TableCell>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded bg-zinc-800" />
                <Skeleton className="h-4 w-20 rounded bg-zinc-800" />
              </div>
            </TableCell>
            
            {/* Actions */}
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

export default AlbumsTableSkeleton;