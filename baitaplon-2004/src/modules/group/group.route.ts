import {authMiddleware} from "@core/middleware";
import { AuthRoute } from "@modules/auth";

import { RegisterDto } from "@modules/users/dtos";
import { Route } from "@core/interfaces";
import { Router } from "express";
import CreateGroupDto from "./dtos/create_group.dto";
import GroupController from "./group.controller";
import {validationMiddleware} from "@core/middleware";
import SetManagerDto from "./dtos/set_manager.dto"
export default class GroupRoute implements Route {

    public path = '/api/v1/groups';
    public router = Router();

    public groupController = new GroupController();
    constructor(){
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post(this.path,authMiddleware, validationMiddleware(CreateGroupDto, true), this.groupController.createGroup);
        this.router.get(this.path, this.groupController.getAll);
        this.router.put(this.path +'/:id',authMiddleware,validationMiddleware(CreateGroupDto, true), this.groupController.updateGroup);
        this.router.delete(this.path + '/:id', authMiddleware, this.groupController.deleteGroup);
        this.router.get(this.path +'/:id', authMiddleware, this.groupController.getGroupByGroupId);
        this.router.post(this.path +'/requests/:id', authMiddleware, this.groupController.requestUserGroup);
        this.router.put(this.path +'/requests/:groupid/:userid', this.groupController.accecptUserGroup);
        this.router.post(this.path +'/managers/:id', authMiddleware, validationMiddleware(SetManagerDto, true), this.groupController.addManager);
        this.router.delete(this.path +'/managers/:groupid/:userid', authMiddleware, this.groupController.removeManager);
        this.router.get(this.path + '/members/:id', this.groupController.getAllMembers);
        this.router.delete(this.path +'/members/:groupid/:memberid', this.groupController.deleteMember);
    }
}