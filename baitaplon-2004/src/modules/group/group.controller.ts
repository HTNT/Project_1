import { NextFunction, Request, Response } from "express";
import GroupService from "./group.service";
import CreateGroupDto from "./dtos/create_group.dto";
import { TokenData } from "@modules/auth";
import { Model } from "mongoose";
import SetManagerDto from "./dtos/set_manager.dto";
import SetMangerDto from "./dtos/set_manager.dto";
export default class GroupController{
    private groupService = new GroupService();
    public createGroup = async (req: Request, res: Response, next: NextFunction) => {
        try {
             const model: CreateGroupDto = req.body;
            const result = await this.groupService.createGroup(req.user.id, model);
            res.status(201).json({
                status: 201,
                message: 'Create group successful',
                result
            });
        }catch (err) {
            next(err);
        }
    };        
    public getAll = async (req: Request, res: Response, next: NextFunction) =>{
        try {
            const groups = await this.groupService.getAllGroup();
            res.status(200).json({
                status: 200,
                message: 'Get all group successful',
                groups
            });
        }catch (err) {
            next(err);
        }
    }  ;
    public getGroupByGroupId = async (req: Request, res: Response, next: NextFunction) =>{
        try {
            const groupId = req.params.id;
            const group = await this.groupService.getGroupByGroupId(groupId);
            res.status(200).json({
                status: 200,
                message: 'Get group successful',
                group
            });
        }catch (err) {
            next(err);
        }
    }
    public updateGroup = async (req: Request, res: Response, next: NextFunction) =>{
        try {
                
                const model : CreateGroupDto = req.body;
                const groupId = req.params.id;
                const group = await this.groupService.updateGroup(groupId, model);
                res.status(200).json({
                    status: 200,
                    message: 'Update group successful',
                    group
                });
        }catch (err) {
            next(err);
        }
    }
    public deleteGroup = async(req: Request, res: Response, next: NextFunction) =>{
        try{
            const groupId = req.params.id;
            const group = await this.groupService.deleteGroup(groupId);
            res.status(200).json({
                status: 200,
                message: 'Delete group successful',
                group
            })
        }catch (err) {
            next(err);
        }
    
    }
    public requestUserGroup = async(req: Request, res: Response, next: NextFunction) =>{
        try{
            const groupId = req.params.id;
            const userId = req.user.id;
            const result = await this.groupService.requestUserGroup(
                groupId,
                userId
                
            );
            res.status(200).json({
                status: 200,
                message: "Request Successful",
                result
            });
        }catch(err){
            next(err);
        }
    }
    public accecptUserGroup= async(req: Request, res: Response, next: NextFunction) =>{
        try{
            const userId = req.params.userid;
            const groupId = req.params.groupid;
            
            const result = await this.groupService.acceptUserGroup(
                groupId,
                userId

            );
            res.status(200).json({
                status: 200,
                message: "Accecpt user successful",
                result
            })
        }catch(err){
            next(err);
        }
    }
    public addManager = async(req: Request, res: Response, next: NextFunction) =>{
        try{
            const groupId = req.params.id;
            const model: SetMangerDto = req.body;
            const group = await this.groupService.addManager(groupId, model);
            res.status(200).json({
                status: 200,
                message: "Add manager successful",
                group
            })
        }catch(err){
            next(err);
        }
    }
    public removeManager = async(req: Request, res: Response, next: NextFunction) =>{
        try{
            const groupId = req.params.groupid;
            const userId = req.params.userid;
            const group = await this.groupService.removeManager(groupId, userId);
            res.status(200).json({
                status: 200,
                message: "Remove manager successful",
                group
            })
        }catch(err){
            next(err);
        }
    }
    public getAllMembers = async(req: Request, res: Response, next: NextFunction) =>{
        try{
            const groupId = req.params.id;
            const members= await this.groupService.getAllMembers(groupId);
            res.status(200).json({
                status: 200,
                message: "Get all Members successed.",
                members
            })
        }catch(err){
            next(err);
        }
    }
    public deleteMember = async(req: Request, res: Response, next: NextFunction) =>{
        try{
            const groupId = req.params.groupid;
            const memId = req.params.memberid;
            const result = await this.groupService.deleteMember(groupId, memId);
            res.status(200).json({
                status: 200,
                message: "Delete successful",
                result
            })
        }catch(err){
            next(err);
        }
    }
}