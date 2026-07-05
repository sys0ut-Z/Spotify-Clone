import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatStore } from '@/store/chat.store';
import { useUser } from '@clerk/react';
import { Send } from 'lucide-react';
import { useState } from 'react'

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const {user} = useUser();
  const {selectedUser, sendMessage} = useChatStore();

  const handleSendMessage = () => {
    if(!newMessage.trim() || !user || !selectedUser) return;

    sendMessage(
      newMessage.trim(), 
      user.id, 
      selectedUser.clerkId
    );
  }

  return (
    <div className='p-3.5 mt-auto border-t border-zinc-800`'>
      <div className='flex gap-2'>
        <Input 
          placeholder='Type a message'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className='bg-zinc-800 border-none'
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} // on pressing enter key, message will be sent
        />

        <Button
          size="icon"
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <Send size="size-4"/>
        </Button>
      </div>

    </div>
  )
}

export default MessageInput