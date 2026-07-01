import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";
import type { Album, Song, Stats } from "@/types/index.types";
import toast from "react-hot-toast";

interface MusicStore
{
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  madeForYouSongs: Song[];
  featuredSongs: Song[];
  trendingSongs: Song[];
  stats: Stats;
  allSongs: Song[];
  isSongsLoading: boolean;
  isStatsLoading: boolean;
  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (albumId: string) => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  deleteSong: (songId: string) => Promise<void>;
  deleteAlbum(albumId: string): Promise<void>;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
  albums: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  featuredSongs: [],
  trendingSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalArtists: 0,
    totalUsers: 0
  },
  allSongs: [],
  isSongsLoading: false,
  isStatsLoading: false,

  fetchAlbums: async () =>
  {
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

  fetchAlbumById: async (albumId) =>
  {
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

  fetchMadeForYouSongs: async () =>
  {
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

  fetchFeaturedSongs: async () =>
  {
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

  fetchTrendingSongs: async () =>
  {
    set({ isLoading: true, trendingSongs: [], error: null });
    try {
      const res = await axiosInstance.get("/song/trending");

      set({ trendingSongs: res.data.songs });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Something went wrong while fetching trending songs" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchStats: async () =>
  {
    set({
      isStatsLoading: true,
      stats: { totalSongs: 0, totalAlbums: 0, totalArtists: 0, totalUsers: 0 },
      error: null
    });
    try {
      const res = await axiosInstance.get("/stats");

      set({ stats: res.data.stats });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Something went wrong while fetching stats" });
    } finally {
      set({ isStatsLoading: false });
    }
  },

  fetchSongs: async () =>
  {
    set({ isSongsLoading: true, allSongs: [], error: null });
    try {
      const res = await axiosInstance.get("/song");
      set({ allSongs: res.data.songs });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Something went wrong while fetching songs" });
    }
    finally {
      set({ isSongsLoading: false });
    }
  },

  deleteSong: async (songId) =>
  {
    set({ isSongsLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/delete-song/${songId}`);

      set(state => ({
        allSongs: state.allSongs.filter(song => song._id !== songId)
      }));
      toast.success("Song deleted successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong while deleting song");
    }
    finally {
      set({ isSongsLoading: false });
    }
  },

  deleteAlbum: async (albumId) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/admin/delete-album/${albumId}`);
      set(state => ({
        albums: state.albums.filter(album => album._id !== albumId),
        allSongs: state.allSongs.map((song) => { // remove albumId from songs
          if (song.albumId === albumId) {
            return { ...song, albumId: null };
          }
          return song;
        })
      }));
      toast.success("Album deleted successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong while deleting album");
    }
    finally {
      set({ isLoading: false });
    }
  }
}));