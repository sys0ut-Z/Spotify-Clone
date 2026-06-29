import { usePlayerStore } from '@/store/player.store'
import { useRef, useState } from 'react'

const PlaybackControls = () => {
  const {currentSong} = usePlayerStore();

  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <div>PlaybackControls</div>
  )
}

export default PlaybackControls