import { Button } from '@/components/ui/button';
import { usePlayerStore } from '@/store/player.store'
import type { Song } from '@/types/index.types'
import { Pause, Play } from 'lucide-react';
import { useEffect } from 'react';

// ~ simple understanding : this is not queue, if the song ends then we stop, no moving to next song
const PlayButton = ({song}: {song: Song}) => {
  const {currentSong, isPlaying, setCurrentSong, togglePlay} = usePlayerStore();
  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if(isCurrentSong) togglePlay();
    else setCurrentSong(song);
  }

  return (
    <Button
      size={"icon"}
      className={`absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all
        duration-300 cursor-pointer ${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      onClick={handlePlay}
    >
      {
        isCurrentSong && isPlaying ? (
          <Pause className='size-3 text-black'/>
        ) : (
          <Play className='size-3 text-black'/>
        )
      }
    </Button>
  );
}

export default PlayButton