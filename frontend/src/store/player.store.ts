import type { Song } from "@/types/index.types";
import { create } from "zustand";
import { useChatStore } from "./chat.store";

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

export const usePlayerStore = create<MusicPlayerStore>((set, get) => ({
  currentSong: null,
  currentIndex: -1,
  isPlaying: false,
  queue: [],

  initializeQueue: (songs) =>{
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: (() => {
        return get().currentIndex === -1 ? 0 : get().currentIndex;
      })(), // use one line arrow function
    });
  },

  // here, we will receive album songs
  playAlbum: (songs, startIndex = 0) =>{
    if (songs.length === 0) return;

    const song = songs[startIndex];

    const clientSocket = useChatStore.getState().clientSocket;
    if(clientSocket?.auth){
      clientSocket.emit("update_activity", {
        userId: clientSocket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`
      })
    }

    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },

  // someone clicked on a song
  setCurrentSong: (song) => {
    // if(!song) return;

    // it will return -1 if song is not found
    const songIndex = get().queue.findIndex(s => s._id === song._id);

    const clientSocket = useChatStore.getState().clientSocket;
    if(clientSocket?.auth){
      clientSocket.emit("update_activity", {
        userId: clientSocket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`
      })
    }

    set({
      currentSong: song,
      isPlaying: true,
      // currentIndex: songIndex === -1 ? 0 : get().currentIndex,
      currentIndex: songIndex === -1 ? 0 : songIndex
    });
  },

  togglePlay: () => {
    const willStartPlaying = !get().isPlaying;
    const currentSong = get().currentSong;

    const clientSocket = useChatStore.getState().clientSocket;
    if(clientSocket?.auth){
      clientSocket.emit("update_activity", {
        userId: clientSocket.auth.userId,
        activity: willStartPlaying && currentSong ? 
                `Playing ${currentSong.title} by ${currentSong.artist}` : 
                "Idle"
      })
    }

    set({ isPlaying: willStartPlaying });
  },

  playNext: () =>{
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;

    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];

      const clientSocket = useChatStore.getState().clientSocket;
      if(clientSocket?.auth){
        clientSocket.emit("update_activity", {
          userId: clientSocket.auth.userId,
          activity: `Playing ${nextSong.title} by ${nextSong.artist}`
        })
      }

      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true
      })
    }
    else {
      // * queue is over, stop the player
      set({ isPlaying: false });

      const clientSocket = useChatStore.getState().clientSocket;
      if(clientSocket?.auth){
        clientSocket.emit("update_activity", {
          userId: clientSocket.auth.userId,
          activity: "Idle"
        })
      }
    }
  },

  playPrevious: () =>{
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;

    if (currentIndex >= 0) {
      const prevSong = queue[prevIndex];

      const clientSocket = useChatStore.getState().clientSocket;
      if(clientSocket?.auth){
        clientSocket.emit("update_activity", {
          userId: clientSocket.auth.userId,
          activity: `Playing ${prevSong.title} by ${prevSong.artist}`
        })
      }

      set({
        currentSong: queue[prevIndex],
        currentIndex: prevIndex,
        isPlaying: true
      })
    }
    else {
      // no previous song to play, stop the player
      set({ isPlaying: false });

      const clientSocket = useChatStore.getState().clientSocket;
      if(clientSocket?.auth){
        clientSocket.emit("update_activity", {
          userId: clientSocket.auth.userId,
          activity: "Idle"
        })
      }
    }
  },
}));