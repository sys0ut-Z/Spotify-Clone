import { axiosInstance } from "@/lib/axios";
import type { Message, User } from "@/types/index.types";
import { create } from "zustand";

interface ChatStore{
  users: User[];
  isLoading: boolean;
  error: string | null;
  socket: any;
  isConnected: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;
  messages: Message[];
  fetchUsers: () => Promise<void>;
  initSocket: () => void;
  disconnectSocket: () => void;
  sendMessage: (data: Message) => void;
};

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  isLoading: false,
  error: null,
  socket: null,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],

  initSocket: () => {},
  disconnectSocket: () => {},
  sendMessage: (data) => {},
  
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