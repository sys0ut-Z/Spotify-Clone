import FeaturedGridSkeleton from '@/components/skeletons/FeaturedGridSkeleton';
import { useMusicStore } from '@/store/music.store';
import PlayButton from './PlayButton';

const FeaturedSongs = () => {
  const {error, isLoading, featuredSongs} = useMusicStore();

  if(isLoading) return <FeaturedGridSkeleton />

  if(error) return <p className='text-red-500 text-xl p-2 mb-4'>{error}</p>
  
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3 mb-6 lg:mb-8 mt-2 lg:mt-2.5'>
      {
        featuredSongs?.map((song) => (
          <div key={song._id}
            className='group flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors cursor-pointer relative'
          >
            <img src={song.imageUrl} alt={song.title}
              className='size-16 sm:size-20 object-cover shrink-0'
            />
            <div className='flex-1 p-4'>
              <h3 className='font-medium truncate'>{song.title}</h3>
              <p className='text-sm text-zinc-400 truncate'>{song.artist}</p>
            </div>
            <PlayButton song={song}/>
          </div>
        ))
      }
    </div>
  )
}

export default FeaturedSongs