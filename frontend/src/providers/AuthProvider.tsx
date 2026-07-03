import { axiosInstance } from '@/lib/axios';
import { useAuth } from '@clerk/react';
import React, { createContext, useEffect, useState } from 'react'
import {Loader} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useChatStore } from '@/store/chat.store';

const AuthContext = createContext({});

// null if user is unauthenticated
const updateApiToken = (token: string | null) => {
  // a common header for all requests
  if(token){
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  // delete the token if user is not authenticated(logged out or not signed in)
  else{
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
}

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const {getToken, userId} = useAuth();
  const {checkAdminStatus} = useAuthStore();
  const {initSocket, disconnectSocket} = useChatStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        const token = await getToken();
        
        // if token is present, user is authenticated, check for admin
        if(token){
          updateApiToken(token);
          await checkAdminStatus();
          
          // initialize socket
          if(userId)
            initSocket(userId);
        }
      } catch (error) {
        updateApiToken(null);
        // TODO : replace with toast later
        console.error(error);
      }
      finally{
        setLoading(false);
      }

      // when user closes browser
    }
    
    initAuth();
    return () => disconnectSocket();
  }, [userId]);

  if(loading){
    return (
      <div className='h-screen flex justify-center items-center w-full'>
        <Loader className='size-8 text-emerald-500 animate-spin'/>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider