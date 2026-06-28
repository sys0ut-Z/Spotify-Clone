import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
  isAdmin: boolean;
  error: string | null;
  isLoading: boolean;

  checkAdminStatus: () => Promise<void>;
  reset: () => void // to reset states
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  isAdmin: false,
  error: null,
  isLoading: false,

  reset: () => set({ isAdmin: false, error: null, isLoading: false }),

  checkAdminStatus: async () => {
    set({ isLoading: true, isAdmin: false, error: null });
    try {
      const res = await axiosInstance.get("/admin/check");

      if(res.data.admin) set({ isAdmin: true });
      
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Something went wrong while checking admin status" });
    }
    finally{
      set({ isLoading: false });
    }
  }
}));