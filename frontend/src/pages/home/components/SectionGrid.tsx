import SectionGridSkeleton from '@/pages/home/components/SectionGridSkeleton';
import { Button } from '@/components/ui/button';
import type { Song } from '@/types/index.types'
import PlayButton from './PlayButton';

type SectionGridProps = {
  title: string;
  songs: Song[];
  isLoading: boolean
};
const SectionGrid = ({title, songs, isLoading}: SectionGridProps) => {

  if(isLoading) return <SectionGridSkeleton />

  return (
    <div className='mb-8 p-2'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl sm:text-2xl font-bold'>{title}</h2>
        <Button className='text-sm sm:text-base font-medium text-zinc-400 hover:text-zinc-200 transition-colors
        cursor-pointer'
          variant={"ghost"}
        >
          View All
        </Button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {
          songs?.map((song) => (
            <div key={song._id}
              className='bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-400/40 transition-all group cursor-pointer'
            >
              <div className='relative mb-4'>
                <div className='aspect-square rounded-md shadow-lg overflow-hidden'>
                  <img src={song.imageUrl} alt={song.title}
                    className='w-full h-full object-cover transition-transform group-hover:scale-105 duration-500'
                  />
                  <PlayButton song={song}/>
                </div>

              </div>              
              <h3 className='text-sm lg:text-md font-medium mb-2 truncate text-white'>
                {song.title}
              </h3>
              <h4 className='text-xs lg:text-sm text-zinc-400 truncate'>
                {song.artist}
              </h4>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default SectionGrid