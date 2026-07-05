import { Card, CardContent } from "@/components/ui/card"
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/react"
import { Loader } from "lucide-react"
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const {isLoaded, user} = useUser();
  // isLoaded checks whether the current authentication state is loaded or not

  // for production, to prevent it from rerun
  const syncAttempted = useRef(false);
  const navigate = useNavigate();

  console.log("AuthcallbackPage");

  useEffect(() => {
    const syncUser = async () => {
      console.log({
        user, isLoaded
      });
      if(!isLoaded || !user || syncAttempted.current) return;
      console.log("user", user);

      try {
        console.log({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl
        });

        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl // image url from clerk(google profile pic)
        });
        syncAttempted.current = true;
      } catch (error) {
        console.log("Error in auth callback", error);
      }
      
      /* 
        don't add navigate to finally block, it will redirectly early to home page before even making call to backend
      */
      navigate("/");
    }

    syncUser();
  }, [isLoaded, user, syncAttempted]);

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-emerald-500 animate-spin"/>
          <h3 className="text-zinc-400 text-xl">Logging you in</h3>
          <p className="text-zinc-400 text-sm">Redirecting</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthCallbackPage