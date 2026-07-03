import { Server as SocketServer } from "socket.io";
import type {Server as HttpServer} from 'http';
import MessageModel from "../models/message.model";
import { FRONTEND_URL } from "../server";

interface Message {
  senderId: string;
  receiverId: string;
  content: string;
};

export const initializeSocket = (httpServer: HttpServer) => {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: FRONTEND_URL,
      credentials: true
    },
  });

  // online users
  const userSockets = new Map<string, string>(); // {userId: socketId}
  const userActivities = new Map<string, string>(); // {userId: activity}

  // 'on' is event listener
  io.on("connection", (socket) => {

    // once user gets connected, add it in onlineUsers socket
    socket.on("user_connected", (userId: string) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "idle");
      // initially then will not be listening to anyting, so "idle"(doing nothing)

      // broadcast to all connected users(sockets)
      // let everyone know that user has come online
      io.emit("user_connected", userId);

      // let current user know which users are online
      socket.emit("online_users", Array.from(userSockets.keys()));

      // let everyone know of current user activities
      io.emit("user_activities", Array.from(userActivities));
    });

    // update user's activity
    socket.on("update_activity", (
      {userId, activity}: {userId: string, activity: string}
    ) => {
      userActivities.set(userId, activity);

      // everyone will know of user's latest activity
      io.emit("activity_updated", {userId, activity});
    });

    // send message
    socket.on("send_message", async (data: Message) => {
      try {
        const {senderId, receiverId, content} = data;
  
        const message = await MessageModel.create({
          sender: senderId,
          receiver: receiverId,
          content
        });
  
        // send the message to receiver in realtime if they are online
        const receiverSocketId = userSockets.get(receiverId);
  
        if(receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
        }
  
        // let current user know that the message is sent
        socket.emit("message_sent", message);

      } catch (error: any) {
        console.error(error);
        socket.emit("message_error", error.message || "Something went wrong while sending message");
      }
    });

    // user offline
    socket.on("user_disconnected", () => {
      let disconnectedUserId = "";
      for(const [userId, socketId] of userSockets){ 
        if(socketId === socket.id){
          userSockets.delete(userId); // remove user from online users
          userActivities.delete(userId); // remove user's activity
          disconnectedUserId = userId;
          break;
        }
      }

      if(disconnectedUserId){
        io.emit("user_disconnected", disconnectedUserId);
      }
    });
  });
}