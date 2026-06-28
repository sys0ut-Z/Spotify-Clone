import Topbar from '@/components/Topbar'
import { useMusicStore } from '@/store/music.store'
import { useEffect } from 'react';
import FeaturedSongs from './components/FeaturedSongs';

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
    <div className='rounded-md overflow-hidden'>
      <Topbar />
      <FeaturedSongs />
    </div>
  )
}

export default HomePage