import { UserSchema } from "@modules/users";
import { IConversation, IMessage } from "./conversation.interface";
import conversationModel from "./conversation.model";
import SendMessageDto from "./dtos/send_message.dto";
import HttpException from "@core/exceptions/http.exception";
import ConversationSchema from "./conversation.model";
export default class ConversationService {
    public async sendMessage(
        userId: string,
        dto: SendMessageDto
    ): Promise<IConversation> {
        const user = await UserSchema.findById(userId).select("-password").exec();
        if (!user) {
            throw new HttpException(404, "User id not found");
        }
        const touser = await UserSchema.findById(dto.to).select("-password").exec();
        if (!user) {
            throw new HttpException(404, "User id not found.");
        }

        if (!dto.conversationId) {
            const newConversation = new ConversationSchema(
                {
                    user1: userId,
                    user2: dto.to,
                    messages: {
                        from: userId,
                        to: dto.to,
                        text: dto.text,
                    }
                }
            );
            await newConversation.save();
            return newConversation;
        } else {
            const conversation = await ConversationSchema.findById(dto.conversationId).exec();
            if (!conversation) {
                throw new HttpException(404, "Conversation id not found");
            }
            conversation.messages.unshift({
                from: userId,
                to: dto.to,
                text: dto.text,
            } as IMessage);
            await conversation.save();
            return conversation;
        }

    }
    public async getAllConversations(): Promise<IConversation[]>{
        const cv= await ConversationSchema.find().exec();
        if(!cv){
            throw new HttpException(404, "Conversation Id not found");
        }
        return cv;
    }
    public async getConversationsById(cId: string): Promise<IConversation> {
        const cv = await ConversationSchema.findById(cId).exec();
        if(!cv){
            throw new HttpException(404, "Conversation id not found");
        }
        return cv;
    }
    public async getConversationsByUserId(userId: string): Promise<IConversation[]> {
        const user= await UserSchema.findById(userId).exec();
        if(!user){
            throw new HttpException(404, "User id not found");
        }
        const listConversations = await ConversationSchema.find({
            $or: [
                { user1: userId },
                { user2: userId }
            ]
        }).exec();
        return listConversations;

    }
}