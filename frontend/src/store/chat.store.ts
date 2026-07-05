import { axiosInstance } from "@/lib/axios";
import type { Message, User } from "@/types/index.types";
import { create } from "zustand";
import { io } from "socket.io-client";
import {Socket as ClientSocket} from 'socket.io-client';

interface ChatStore{
  users: User[];
  isLoading: boolean;
  isMessagesLoading: boolean;
  error: string | null;
  clientSocket: ClientSocket | null;
  isConnected: boolean;
  onlineUsers: Set<string>;
  userActivities: Map<string, string>;
  messages: Message[];
  selectedUser: User | null; // current receiver
  fetchUsers: () => Promise<void>;
  initSocket: (userId: string) => void;
  disconnectSocket: () => void;
  sendMessage: (data: Message) => void;
  fetchMessages: (receiverId: string) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
};

const BASE_URL = import.meta.env.VITE_API_URL;
const socket = io(BASE_URL, {
  autoConnect: false, // only connect if user is authenticated
  withCredentials: true, // enables sending cookies & headers
})

export const useChatStore = create<ChatStore>((set, get) => ({
  users: [],
  isLoading: false,
  isMessagesLoading: false,
  error: null,
  clientSocket: null,
  isConnected: false,
  onlineUsers: new Set(),
  userActivities: new Map(),
  messages: [],
  selectedUser: null,

  initSocket: (userId) => {
    if(!get().isConnected){
      socket.auth = { userId }; // add userId in socket auth object
      socket.connect();
      socket.emit("user_connected", userId);

      // * use 'on' : listen to the emitted events from server
      socket.on("users_online", (users: string[]) => {
        set({ onlineUsers: new Set(users) });
      });

      socket.on("activities", (activities: [string, string][]) => {
        set({ userActivities: new Map(activities) });
      });

      // add in online users
      // ? 'user_connected'
      socket.on("online_users", (userId: string) => {
        console.log("user connected", userId);
        set(state => ({ 
          onlineUsers: new Set([...state.onlineUsers, userId]) 
        }));
      });

      // user disconnected
      socket.on("user_disconnected", (userId: string) => {
        set(state => {
          const newOnlineUsers = new Set(state.onlineUsers);
          newOnlineUsers.delete(userId);
          return { onlineUsers: newOnlineUsers }
        });
      });

      // receive message
      socket.on("receive_message", (message: Message) => {
        set(state => ({
          messages: [...state.messages, message]
        }));
      })

      // message sent
      socket.on("message_sent", (message: Message) => {
        set(state => ({
          messages: [...state.messages, message]
        }));
      });

      // update activity
      socket.on("activity_updated", (
        { userId, activity }: { userId: string, activity: string }
      ) => {
        set(state => {
          const newActivities = new Map(state.userActivities);
          newActivities.set(userId, activity);
          return { userActivities: newActivities }
        });
      });

      set({
        clientSocket: socket,
        isConnected: true
      });
    }
  },

  disconnectSocket: () => {
    if(get().isConnected){
      socket.disconnect();
      // set({ clientSocket: null, isConnected: false });
      set({ isConnected: false });
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),
  
  sendMessage: (data) => {
    const { isConnected, clientSocket } = get();
    if(!isConnected || !clientSocket) return;

    clientSocket.emit("send_message", data);
  },
  
  fetchMessages: async (receiverId) => {
    // only fetch messages if user is authenticated
    const {isConnected, clientSocket } = get();
    if(!clientSocket || !isConnected) return;

    set({ isMessagesLoading: true, messages: [], error: null });
    try {
      const res = await axiosInstance.get(`/user/messages/${receiverId}`);
      set({ messages: res.data.messages });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Something went wrong while fetching messages" });
    }
    finally{
      set({ isMessagesLoading: false });
    }
  },

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
  },

}));