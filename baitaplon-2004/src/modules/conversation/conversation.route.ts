import { Route } from "@core/interfaces";
import {validationMiddleware} from "@core/middleware";
import { Router } from "express";
import ConversationController from "./conversation.controller";
import { authMiddleware } from "@core/middleware";
import SendMessageDto from "./dtos/send_message.dto";

export default class Conversation implements Route{
    public path: string = '/api/v1/conversations';
    public router = Router();
    public conversationController = new ConversationController();
    constructor(){
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(this.path+'/:uid1/:uid2',authMiddleware, this.conversationController.createConversation);
        this.router.get(this.path+'/find/:uid1/:uid2',authMiddleware, this.conversationController.getMessageby2User);
        this.router.post(this.path+'/:id', authMiddleware, validationMiddleware(SendMessageDto, true), this.conversationController.sendMessage);
        this.router.get(this.path, this.conversationController.getAllConversations);
        this.router.get(this.path+'/conver/:id', authMiddleware, this.conversationController.getConversationsById);
        this.router.get(this.path + '/user/:id', authMiddleware, this.conversationController.getConversationsByUserId);
        
    }
}
