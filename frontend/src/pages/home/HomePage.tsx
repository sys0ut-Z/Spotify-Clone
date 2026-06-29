import Topbar from '@/components/Topbar'
import { useMusicStore } from '@/store/music.store'
import { useEffect } from 'react';
import FeaturedSongs from './components/FeaturedSongs';
import { ScrollArea } from '@/components/ui/scroll-area';
import SectionGrid from './components/SectionGrid';

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

  useEffect(() => {
    // & run all the fuction concurrently
    fetchMadeForYouSongs();
    fetchFeaturedSongs();
    fetchTrendingSongs();
  }, []);

  return (
    <main className='rounded-md overflow-hidden bg-linear-to-b from-zinc-800/55 via-zinc-800/30 to-zinc-900'>
      <Topbar />
      <ScrollArea className='h-[calc(100vh-180px)]'>
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