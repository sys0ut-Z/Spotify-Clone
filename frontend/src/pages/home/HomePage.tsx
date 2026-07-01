import Topbar from '@/components/Topbar'
import { useMusicStore } from '@/store/music.store'
import { useEffect } from 'react';
import FeaturedSongs from './components/FeaturedSongs';
import { ScrollArea } from '@/components/ui/scroll-area';
import SectionGrid from './components/SectionGrid';
import { usePlayerStore } from '@/store/player.store';

const HomePage = () => {
  const {
    isLoading,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,
    fetchMadeForYouSongs,
    fetchFeaturedSongs,
    fetchTrendingSongs
  } = useMusicStore();

  const {initializeQueue} = usePlayerStore();

  useEffect(() => {
    // & run all the fuction concurrently
    fetchMadeForYouSongs();
    fetchFeaturedSongs();
    fetchTrendingSongs();
  }, []);

  // initialize queue for home page
  useEffect(() => {
    if(featuredSongs.length > 0 && madeForYouSongs.length > 0 && trendingSongs.length > 0) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [featuredSongs, madeForYouSongs, trendingSongs]);

  return (
    <main className='rounded-md overflow-hidden bg-linear-to-b from-zinc-800/55 via-zinc-800/30 to-zinc-900'>
      <Topbar />
      <ScrollArea className='h-[calc(100vh-175px)] xl:h-[calc(100vh-165px)]'>
        <div className='p-4 sm:p-6'>
          <h1 className='text-2xl sm:text-3xl font-bold mb-6'>Good Afternoon</h1>
          <FeaturedSongs />
        </div>
        <div className='space-y-5 sm:space-y-6 p-4 sm:p-6'>
          <SectionGrid title='Made for You' songs={madeForYouSongs} isLoading={isLoading} />
          <SectionGrid title='Trending' songs={trendingSongs} isLoading={isLoading}/>
        </div>
      </ScrollArea>
    </main>
  )
}

export default HomePage