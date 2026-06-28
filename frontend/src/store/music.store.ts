import axios from "axios";
import { axiosInstance } from "@/lib/axios";
import {create} from "zustand";
import type { Album, Song } from "@/types/index.types";

// interface ResponseType{
//   success: boolean
//   message: string
// }

interface MusicStore{
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  madeForYouSongs: Song[];
  featuredSongs: Song[];
  trendingSongs: Song[];
  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (albumId: string) => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  featuredSongs: [],
  trendingSongs: [],

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/album");
      set({ albums: res.data.albums });

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
      set({ currentAlbum: res.data.album });

    } catch (error: any) {
      set({ error: error.response?.data?.message || "Something went wrong while fetching album" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, madeForYouSongs: [], error: null });
    try {
      const res = await axiosInstance.get("/song/made-for-you");

      // & axios will throw 4xx & 5xx errors to catch block
      set({ madeForYouSongs: res.data.songs });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Something went wrong while fetching made for you songs" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, featuredSongs: [], error: null });
    try {
      const res = await axiosInstance.get("/song/featured");

      set({ featuredSongs: res.data.songs });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Something went wrong while fetching featured songs" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, trendingSongs: [], error: null });
    try {
      const res = await axiosInstance.get("/song/trending");

      set({ trendingSongs: res.data.songs });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Something went wrong while fetching trending songs" });
    } finally {
      set({ isLoading: false });
    }
  }
}));