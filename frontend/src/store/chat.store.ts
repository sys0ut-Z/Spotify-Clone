import { axiosInstance } from "@/lib/axios";
import type { User } from "@/types/index.types";
import { create } from "zustand";

interface ChatStore{
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  fetchUsers: async () => {
    set({ isLoading: true, users: [], error: null });
    try {
      const res = await axiosInstance.get("/user");
      set({ users: res.data.users });
      
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Something went wrong while fetching users" });
    }
    finally{
      set({ isLoading: false });
    }
  }
}));