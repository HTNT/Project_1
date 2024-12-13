import { Request } from 'express';
import { IUser, UserSchema } from '@modules/users';
import { IGroup, IManager, IMember } from './group.interface';
import CreateGroupDto from './dtos/create_group.dto';
import GroupSchema from './group.model';
import HttpException from '@core/exceptions/http.exception';
import SetMangerDto from './dtos/set_manager.dto';
import SetManagerDto from './dtos/set_manager.dto';
import { http } from 'winston';

export default class GroupService {
    public async createGroup(
        userId: string,
        groupDto: CreateGroupDto
    ): Promise<IGroup> {
        const user = await UserSchema.findById(userId).select("-password");
        if (!user) {
            throw new HttpException(404, "User is not exists");
        }
        const existingGroup = await UserSchema.find({
            $or: [{ name: groupDto.name }, { code: groupDto.code }],
        });
        const newGroup = new GroupSchema({
            ...groupDto,
            creator: userId,
            date: new Date(),
        });

        const post = await newGroup.save();
        return post;
    }

    public async getAllGroup(): Promise<IGroup[]> {
        const groups = GroupSchema.find().exec();
        return groups;
    }
    public async updateGroup(
        groupId: string,
        groupDto: CreateGroupDto
    ): Promise<IGroup> {
        const group = await GroupSchema.findById(groupId).exec();
        if (!group) {
            throw new HttpException(404, "Group ID is not found");
        }

        const existingGroup = await GroupSchema.find({
            $and: [
                {
                    $or: [{ name: groupDto.name }, { code: groupDto.code }],
                },
                { _id: { $ne: { _id: groupId } } },
            ],
        }).exec();
        if (!existingGroup) {
            throw new HttpException(404, "Group is not exist");
        }
        const groupFileds = { ...groupDto };
        const updatedGroup = await GroupSchema.findByIdAndUpdate(
            groupId,
            groupFileds,
            { new: true }
        ).exec();
        if (!updatedGroup) {
            throw new HttpException(400, "Group update is not success");
        }
        return updatedGroup;
    }

    public async getGroupByGroupId(groupId: string): Promise<IGroup> {
        const group = await GroupSchema.findById(groupId).exec();
        if (!group) throw new HttpException(404, "Group id not found");
        return group;
    }
    public async deleteGroup(groupId: string): Promise<IGroup> {
        const group = await GroupSchema.findById(groupId).exec();
        if (!group) throw new HttpException(404, "Group id not found");
        const deleteGroup = await GroupSchema.findByIdAndDelete({
            _id: groupId,
        }).exec();
        if (!deleteGroup)
            throw new HttpException(400, "Group delete is not success");
        return deleteGroup;
    }
    public async requestUserGroup(
        groupId: string,
        userId: string
    ): Promise<IGroup> {
        const group = await GroupSchema.findById(groupId).exec();
        if (!group) throw new HttpException(404, "Group id not found");
        const user = await UserSchema.findById(userId).exec();
        if (!user) throw new HttpException(404, "User id not found");

        if (
            group.member_requests &&
            group.member_requests.some(
                (item: IMember) => item.user.toString() === userId
            )
        ) {
            throw new HttpException(400, "User has been requested");
        }
        if (
            group.members &&
            group.members.some(
                (item: IMember) => item.user.toString() === userId
            )
        ) {
            throw new HttpException(400, "User has been member");
        }
        group.member_requests.unshift({
            user: userId,
        } as IMember);
        await group.save();
        return group;
    }
    public async acceptUserGroup(
        groupId: string,
        userId: string
    ): Promise<IGroup> {
        const group = await GroupSchema.findById(groupId).exec();
        const user = await UserSchema.findById(userId).select('-password').exec();
        if (!user) throw new HttpException(404, "User not found");
        if (!group) throw new HttpException(404, "Group not found");
        if (
            group.member_requests &&
            group.member_requests.some(
                (item: IMember) => item.user.toString() !== userId
            )
        ) {
            throw new HttpException(400, "User not yet requested");
        }
        
        group.member_requests = group.member_requests.filter(
            ({ user }) => user.toString() !== userId
        );
        group.members.unshift({
            user: userId,
        } as IMember);
        await group.save();
        return group;
    }
    public async addManager(
        groupId: string,
        request: SetManagerDto
    ): Promise<IGroup> {
        const group = await GroupSchema.findById(groupId).exec();
        if (!group) throw new HttpException(400, "Group Id not found");
        const user = await UserSchema.findById(request.user)
            .select("-password")
            .exec();
        if (!user) throw new HttpException(400, "User id not found");
        if (
            group.managers &&
            group.managers.some(
                (item: IManager) => item.user.toString() === request.user
            )
        ) {
            throw new HttpException(400, "User has been a manager");
        }
        group.managers.unshift({
            user: request.user,
            role: request.role,
        } as IManager);
        await group.save();
        return group;
    }
    public async removeManager(
        groupId: string,
            userId: string
    ): Promise<IGroup> {
        const group = await GroupSchema.findById(groupId).exec();
        if (!group) throw new HttpException(400, "Group Id not found");
        const user = await UserSchema.findById(userId)
            .select("-password")
            .exec();
        if (!user) throw new HttpException(400, "User id not found");
        if (
            group.managers &&
            group.managers.some(
                (item: IManager) => item.user.toString() !== userId
            )
        ) {
            throw new HttpException(400, "User has been a manager");
        }
        group.managers = group.managers.filter(
            ({ user }) => user.toString() !== userId
        );
        await group.save();
        return group;
    }
    public async getAllMembers(groupId: string): Promise<IUser[]> {
        const group = await GroupSchema.findById(groupId);
        if(!group){
            throw new HttpException(404, "Group id not found");
        }
        const userIds = group.members.map((member)=>{
            return member.user;
        });
        const users =UserSchema.find({
            _id: userIds
        }).select('-password').exec();
        return users;
    }
    public async deleteMember(groupId: string, memberId: string): Promise<IGroup> {
        const group = await GroupSchema.findById(groupId);
        const member = await UserSchema.findById(memberId).select('-password').exec();
        if(!member){
            throw new HttpException(404, "User id not found");
        }
        if(!group){
            throw new HttpException(404, "Group id not found");
        }
        if(
            group.members &&
            group.members.findIndex(
                (item: IMember) => item.user.toString() === memberId
            ) == -1
        ){
            throw new HttpException(400, "User is not member");
        }
        if(group.members.length == 1){
            throw new HttpException(
                400,
                "You are the last member of the group, unable to leave "
            );
        }
        group.members = group.members.filter(
            ({user}) => user.toString() !== memberId
        );
        await group.save();
        return group;
    }
}
