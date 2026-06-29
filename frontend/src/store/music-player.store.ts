import type { Song } from "@/types/index.types";
import { create } from "zustand";

interface MusicPlayerStore{
  currentSong: Song | null;
  currentIndex: number;
  isPlaying: boolean;
  queue: Song[];

  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song) => void;
  togglePlay: () => void; // to toggle play/pause
  playNext: () => void;
  playPrevious: () => void;
};

export const useMusicPlayerStore = create<MusicPlayerStore>((set, get) => ({
  currentSong: null,
  currentIndex: -1,
  isPlaying: false,
  queue: [],

  initializeQueue: (songs) => {
    set({ 
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: (() => {
        return get().currentIndex === -1 ? 0 : get().currentIndex;
      })(), // use one line arrow function
    });
  },

  // here, we will receive album songs
  playAlbum: (songs, startIndex = 0) => {
    if(songs.length === 0) return;

    set({ 
      queue: songs,
      currentSong: songs[startIndex],
      currentIndex: startIndex,
      isPlaying: true,
    });
  },

  // someone clicked on a song
  setCurrentSong: (song) => {
    // if(!song) return;

    // it will return -1 if song is not found
    const songIndex = get().queue.findIndex(s => s._id === song._id);

    set({ 
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex === -1 ? 0 : get().currentIndex,
    });
  },

  togglePlay: () => {
    const willStartPlaying = !get().isPlaying;
    set({ isPlaying: willStartPlaying });
  },

  playNext: () => {
    const {currentIndex, queue} = get();
    const nextIndex = currentIndex + 1;

    if(nextIndex < queue.length){
      set({
        currentSong: queue[nextIndex],
        currentIndex: nextIndex,
        isPlaying: true
      })
    }
    else{
      // * queue is over, stop the player
      set({isPlaying: false});
    }

  },

  playPrevious: () => {
    const {currentIndex, queue} = get();
    const prevIndex = currentIndex - 1;

    if(currentIndex >= 0){
      set({
        currentSong: queue[prevIndex],
        currentIndex: prevIndex,
        isPlaying: true
      })
    }
    else{
      // no previous song to play, stop the player
      set({isPlaying: false});
    }
  },
}));