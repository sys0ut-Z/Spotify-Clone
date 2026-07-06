import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/react";
import { useEffect, useRef } from "react";

const AuthSync = () => {
  const { isLoaded, user } = useUser();

  const syncedUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    // prevent duplicate sync
    if (syncedUserId.current === user.id) return;

    syncedUserId.current = user.id;

    const syncUser = async () => {
      try {
        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });

      } catch (error) {
        console.log("Sync failed : ", error);
      }
    };

    syncUser();
  }, [isLoaded, user]);

  return null;
};

export default AuthSync;