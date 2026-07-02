import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMusicStore } from '@/store/music.store'
import { Calendar, Trash2 } from 'lucide-react';
import SongsTableSkeleton from './skeletons/SongsTableTabSkeleton';

const SongsTable = () => {
  const {allSongs, isSongsLoading, error, deleteSong} = useMusicStore();

  const handleDeleteSong = (songId: string) => {
    deleteSong(songId);
  }

  if(isSongsLoading) return <SongsTableSkeleton />

  if(error) {
    return (
      <div className='flex justify-center items-center py-6'>
        <p className='text-red-500 text-lg sm:text-xl'>{error}</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className='text-base md:text-lg'>
          <TableHead className='w-12.5'>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {
          allSongs.map((song) => (
            <TableRow key={song._id} className='hover:bg-zinc-800/50'>
              <TableCell className='font-medium'>
                <img src={song.imageUrl} className='size-10 rounded object-cover' />
              </TableCell>
              <TableCell className='text-zinc-300/90'>{song.title}</TableCell>
              <TableCell className='text-zinc-300/90'>{song.artist}</TableCell>
              <TableCell className='flex items-center gap-2 text-zinc-400/80'>
                <Calendar className='h-4 w-4'/>
                <span>{song.createdAt.split('T')[0]}</span>
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex gap-2 justify-end'>
                  <Button 
                    variant={"ghost"}
                    size={"sm"}
                    className='text-red-400 hover:text-red-300 hover:bg-red-400/10'
                    onClick={() => handleDeleteSong(song._id)}
                  >
                    <Trash2 className='size-4 lg:size-4.5' />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  )
}

export default SongsTable