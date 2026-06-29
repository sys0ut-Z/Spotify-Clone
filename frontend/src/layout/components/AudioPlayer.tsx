import { usePlayerStore } from '@/store/player.store';
import React, { useEffect, useRef } from 'react'

const AudioPlayer = () =>
{
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevSongRef = useRef<string | null>(null); // ^ this is just to verify for new song

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // handle toggle play 
  useEffect(() =>{
    if (isPlaying) audioRef.current?.play(); // play the media(audio, video etc)
    else audioRef.current?.pause(); // pause the media(audio, video etc)
  }, [isPlaying]);

  // handle song end
  useEffect(() => {
    const currentAudio = audioRef.current;
    const handleEnded = () => playNext();

    currentAudio?.addEventListener("ended", handleEnded);

    // clean up
    return () => currentAudio?.removeEventListener("ended", handleEnded);
  }, []);

  // handle song change OR resume from where it left off
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const currentAudio = audioRef.current;

    // check if this is a new song
    const isSongChange = currentSong?.audioUrl !== prevSongRef.current;
    if (isSongChange) {
      currentAudio.src = currentSong?.audioUrl; // change it to new song url
      currentAudio.currentTime = 0; // it is new song, start from the beginning

      /* 
        ? explanation : 
        if the song changes, currentSong will change and prevSong will remain the same, 
        then by comparing the two above, we can say that the song has changed
      */
      prevSongRef.current = currentSong?.audioUrl;

      // start the new song
      if (isPlaying) currentAudio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />
}

export default AudioPlayer