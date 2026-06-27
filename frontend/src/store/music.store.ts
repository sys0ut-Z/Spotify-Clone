import axios from "axios";
import { axiosInstance } from "@/lib/axios";
import {create} from "zustand";
import type { Album, Song } from "@/types/musicStore.types";

// interface ResponseType{
//   success: boolean
//   message: string
// }

interface MusicStore{
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (albumId: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
  songs: [],
  albums: [],
  isLoading: false,
  error: null,
  currentAlbum: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/album");
      if (res.data.success) {
        set({ albums: res.data.albums });
      } else {
        set({ error: res.data.message });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Something went wrong while fetching albums" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumById: async (albumId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/album/${albumId}`);
      if (res.data.success) {
        set({ currentAlbum: res.data.album });
      } else {
        set({ error: res.data.message });
      }
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Something went wrong while fetching album" });
    } finally {
      set({ isLoading: false });
    }
  },
}));