import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMusicStore } from '@/store/music.store';
import { Clock, Pause, Play } from 'lucide-react';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import AlbumPageSkeleton from './components/AlbumPageSkeleton';
import { usePlayerStore } from '@/store/player.store';

export const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

const AlbumPage = () => {
  const { albumId } = useParams();
  const { isLoading, fetchAlbumById, currentAlbum } = useMusicStore();
  const {
    currentSong, isPlaying,
    playAlbum, togglePlay,
  } = usePlayerStore();

  const handlePlaySong = (index: number) => {
    if(!currentAlbum) return;
    playAlbum(currentAlbum.songs, index);
  }

  // on main green button click
  const handlePlayAlbumMainButton = () => {
    // ! don't put '!currentSong' condition, first time 'currentSong' would be null and it will return every time
    if(!currentAlbum) return;

    const isCurrentAlbumPlaying = currentAlbum?.songs.some((song) => song._id === currentSong?._id);
    if(isCurrentAlbumPlaying) {
      togglePlay();
    }
    else {
      // ^ start from where it left, that's why we are not passing index
      playAlbum(currentAlbum?.songs);
    }
  }
  useEffect(() => {
    if(albumId)
      fetchAlbumById(albumId);
  }, [albumId, fetchAlbumById]);

  if(isLoading) return <AlbumPageSkeleton />

  return (
    <div className='h-full'>
      <ScrollArea className='h-full rounded-md'>
        {/* Main Content */}
        <div className='relative min-h-full'>

          {/* Gradient background */}
          <div className='absolute left-0 top-0 inset-0 bg-linear-to-b from-[#503a80]/80 via-zinc-900/80 to-zinc-900 pointer-events-none'>

          </div>

          {/* Content */}
          <div className='relative z-10'>
            <div className='flex flex-col md:flex-row p-6 gap-6 pb-8'>
              <img
                src={currentAlbum?.imageUrl}
                alt="cover-image"
                className='w-35 h-35 sm:h-45 sm:w-45 lg:w-60 lg:h-60 shadow-xl rounded'
              />
              <div className='flex flex-col justify-end'>
                <h3 className='text-sm font-medium'>Album </h3>
                <h1 className='text-5xl lg:text-7xl font-bold my-4'>
                  {currentAlbum?.title}
                </h1>
                <div className='flex items-center gap-2 text-sm text-zinc-100'>
                  <span className='font-medium text-white'>{currentAlbum?.artist}</span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* Play/Pause button */}
            <div className='px-6 pb-4 flex items-center gap-6'>
              <Button
                size='icon'
                onClick={handlePlayAlbumMainButton}
                className='h-14 w-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all duration-300 cursor-pointer'
              >
                {
                  // check if any of the song is playing
                  isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id)
                    ? <Pause className='h-7 w-7 lg:w-8 lg:h-8 text-black' />
                    : <Play className='h-7 w-7 lg:w-8 lg:h-8 text-black' />
                }
                {/* <Play className='h-7 w-7 lg:w-8 lg:h-8 text-black'/> */}
              </Button>
            </div>
            <div className='bg-black/20 backdrop-blur-sm'>
              <div className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5'>
                <div className='text-center'>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className='h-4 w-4' />
                </div>
              </div>
              {/* Songs List */}
              <div className='space-y-2 py-4'>
                {
                  currentAlbum?.songs.map((song, i) => {
                    const isCurrentSong = song._id === currentSong?._id;
                    return (
                      <div key={song._id}
                        className='grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5 group cursor-pointer'
                        onClick={() => handlePlaySong(i)}
                      >
                        <div className='flex justify-center items-center text-start'>
                          {
                            isCurrentSong && isPlaying ? (
                              <div className='size-4 text-green-500'>♫</div>
                            ) : (
                              <span className='group-hover:hidden'>{i + 1}</span>
                            )
                          }
                          {
                            !isCurrentSong && (
                              <Play className='h-4 w-4 hidden group-hover:block' />
                            )
                          }
                          <Play className='h-4 w-4 hidden group-hover:block' />
                        </div>
                        <div className='flex items-center gap-3'>
                          <img src={song.imageUrl} alt="song-image"
                            className='size-10'
                          />
                          <div>
                            <div className='font-medium text-white'>
                              {song.title}
                            </div>
                            <div>{song.artist}</div>
                          </div>
                        </div>
                        <div>{song.createdAt.split("T")[0]}</div>
                        <div>{formatDuration(song.duration)}</div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

        </div>
      </ScrollArea>
    </div>
  )
}

export default AlbumPage