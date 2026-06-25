import mongoose, { Model, type HydratedDocument, type InferSchemaType } from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: String, // clerk user ID
    required: true,
  },
  receiver: {
    type: String, // clerk user ID
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export type MessageType = InferSchemaType<typeof messageSchema>;
export type MessageDocument = HydratedDocument<MessageType>;

const MessageModel: Model<MessageType> = mongoose.model<MessageType>("Message", messageSchema);

export default MessageModel;