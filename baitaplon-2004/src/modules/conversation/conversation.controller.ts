
import ConversationService from "./conversation.service";
import SendMessageDto from "./dtos/send_message.dto";
import { NextFunction, Request, Response } from "express";
export default class ConversationController{
    private conversationService = new ConversationService();
    public createConversation = async(req: Request, res: Response, next: NextFunction)=>{
        try{
            const userId1 = req.params.uid1;
            const userId2 = req.params.uid2;
            const result = await this.conversationService.createConversation(userId1, userId2);
            res.status(200).json({
                status: 200,
                message: "Send successful",
                result
            });

        }catch(err){
            next(err);
        }
    }
    public getMessageby2User = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const userId1 = req.params.uid1;
            const userId2 = req.params.uid2;
            const result = await this.conversationService.getMessageby2User(userId1, userId2);
            res.status(200).json({
                status: 200,
                message: "Get successful",
                result
            });
        } catch (error) {
            next(error);
        }
    }
    public sendMessage = async(req: Request, res: Response, next: NextFunction)=>{
        try{
            const model: SendMessageDto= req.body;
            const userId = req.params.id;
            const result = await this.conversationService.sendMessage(userId, model);
            res.status(200).json({
                status: 200,
                message: "Send successful",
                result
            });

        }catch(err){
            next(err);
        }
    }
    public getAllConversations = async(req: Request, res: Response, next: NextFunction)=>{
        try{
            
            const result = await this.conversationService.getAllConversations();
            res.status(200).json({
                status: 200,
                message: "get all conversation successful",
                result
            })
        }catch(err){
            next(err);
        }
    }
    public getConversationsById = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const cId = req.params.id;
            const result = await this.conversationService.getConversationsById(cId);
            res.status(200).json({
                status: 200,
                message: "get conversation successful",
                result
            })
        } catch (err) {
            next(err);
        }
    }
    public getConversationsByUserId = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const uId = req.params.id;
            const result = await this.conversationService.getConversationsByUserId(uId);
            res.status(200).json({
                status: 200,
                message: "get conversation by user id successful",
                result
            })
        } catch (err) {
            next(err);
        }
    }
}