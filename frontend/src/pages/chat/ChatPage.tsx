import Topbar from '@/components/Topbar';
import { useChatStore } from '@/store/chat.store'
import { useUser } from '@clerk/react';
import { useEffect } from 'react'

const ChatPage = () => {
  const {user} = useUser();
  const {messages, selectedUser, fetchUsers, fetchMessages} = useChatStore();

  useEffect(() => {
    if(user)
      fetchUsers();
  }, [user]);

  // fetch messages only if user(receiver) is selected
  useEffect(() => {
    if(selectedUser)
      fetchMessages(selectedUser.clerkId);
  }, [selectedUser]);

  return (
    <main className='h-full rounded-lg bg-linear-to-b from-zinc-800 to-zinc-900 overflow-hidden'>
      <Topbar />
      <div className='grid grid-cols-[80px_1fr] lg:grid-cols-[300px_1fr] h-[calc(100vh-180px)]'>
        
      </div>
    </main>
  )
}

export default ChatPage