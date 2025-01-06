import { str } from 'envalid';
import { IEducation, IExperience, IFollow, IFriend, IProfile } from './profile.interface';
import { ISocial } from './profile.interface';
import { IUser, UserSchema } from '@modules/users';
import ProfileSchema from './profile.model'
import HttpException from '@core/exceptions/http.exception';
import CreateProfileDto from './dtos/create-profile.dto';
import normalize from 'normalize-url';
import AddExperienceDto from '@modules/profile/dtos/add-experience.dto';
import AddEducationDto from './dtos/add-education.dto';
import { profile } from 'winston';
// const normalizeUrl = require('normalize-url');



class ProfileService {
    public async getCurrentProfile(userId: string): Promise<Partial<IUser>> {
        console.log({ user: userId });
        
        const user = await ProfileSchema.findOne({ user: userId })
            .populate("user", ["name", "avatar"])
            .exec();
        if (!user) {
            throw new HttpException(404, "User is not has profile!");
        }
        return user;
    }

    public async createprofile(
        userId: string,
        profileDto: CreateProfileDto
    ): Promise<IProfile> {
        const {
            company,
            location,
            website,
            bio,
            skills,
            status,
            youtube,
            twitter,
            instagram,
            linkedin,
            facebook,
        } = profileDto;

        const profileFields: Partial<IProfile> = {
            user: userId,
            company,
            location,
            website:
                website && website !== ""
                    ? normalize(website.toString(), { forceHttps: true })
                    : "",
            bio,
            skills: Array.isArray(skills)
                ? skills
                : skills.split(",").map((skill: string) => " " + skill.trim()),
            status,
            // social,
        };

        const socialFields: ISocial = {
            youtube,
            twitter,
            facebook,
            linkedin,
            instagram,
        };

        for (const [key, value] of Object.entries(socialFields)) {
            if (value && value.length > 0) {
                socialFields[key] = normalize(value, { forceHttps: true });
            }
        }

        profileFields.social = socialFields;

        const profile = await ProfileSchema.findOneAndUpdate(
            { user: userId },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).exec();
        return profile;
    }

    public async deleteProfile(userId: string): Promise<IProfile> {
        const deleteProfile = await ProfileSchema.findOneAndDelete({
            user: userId,
        }).exec();
        // const deleteUser = await UserSchema.findOneAndDelete({ user: userId }).exec();
        if (!deleteProfile) {
            throw new HttpException(409, "Profile invalid");
        }
        return deleteProfile;
    }

    public async getAllProfiles(): Promise<Partial<IUser>[]> {
        const profiles = await ProfileSchema.find()
            .populate("user", ["name", "avatar"])
            .exec();
        return profiles;
    }

    public addExperience = async (
        userId: string,
        experienc: AddExperienceDto
    ) => {
        const newExp = { ...experienc };
        const profile = await ProfileSchema.findOne({ user: userId }).exec();
        if (!profile) {
            throw new HttpException(400, "There is not profile for this user");
        }

        profile.experience.unshift(newExp as IExperience);
        await profile.save();
        return profile;
    };

    public deleteExperience = async (userId: string, experiencId: string) => {
        const profile = await ProfileSchema.findOne({ user: userId }).exec();
        if (!profile) {
            throw new HttpException(400, "There is not profile for this user");
        }

        profile.experience = profile.experience.filter((epr) => {
            epr._id.toString() !== experiencId;
        });
        await profile.save();
        return profile;
    };

    public addEducation = async (
        userId: string,
        education: AddEducationDto
    ) => {
        const newEdu = { ...education };
        const profile = await ProfileSchema.findOne({ user: userId }).exec();
        if (!profile) {
            throw new HttpException(400, "There is not profile for this user");
        }

        profile.education.unshift(newEdu as IEducation);
        await profile.save();
        return profile;
    };

    public deleteEducation = async (userId: string, educationId: string) => {
        const profile = await ProfileSchema.findOne({ user: userId }).exec();
        if (!profile) {
            throw new HttpException(400, "There is not profile for this user");
        }

        profile.education = profile.education.filter((edu) => {
            edu._id.toString() !== educationId;
        });
        await profile.save();
        return profile;
    };

    public follow = async (fromFollowerId: string, toFolloweeId: string) => {
        const profileFromFollower = await ProfileSchema.findOne({
            user: fromFollowerId,
        }).exec();
        const profileToFollowee = await ProfileSchema.findOne({
            user: toFolloweeId,
        }).exec();

        if (!profileFromFollower) {
            throw new HttpException(404, "worng");
        }
        if (!profileToFollowee) {
            throw new HttpException(404, "worng");
        }

        if (
            profileFromFollower.followings.some(
                (f: IFollow) => f.user.toString() === toFolloweeId.toString()
            )
        ) {
            throw new HttpException(404, "You has been followed this user");
        }
        if (
            profileToFollowee.followers.some(
                (f: IFollow) => f.user.toString() === fromFollowerId.toString()
            )
        ) {
            throw new HttpException(404, "You has been followed this user");
        }

        const newFollowing: IFollow = {
            user: toFolloweeId.toString(),
            date: new Date(),
        };

        const newFollower: IFollow = {
            user: fromFollowerId.toString(),
            date: new Date(),
        };

        if (!profileFromFollower.followings) {
            profileFromFollower.followings = [];
        }
        profileFromFollower.followings.unshift(newFollowing);

        if (!profileToFollowee.followers) {
            profileToFollowee.followers = [];
        }
        profileToFollowee.followers.unshift(newFollower);

        await profileFromFollower.save();
        await profileToFollowee.save();

        return profileFromFollower;
    };

    public unfollow = async (fromFollowerId: string, toFolloweeId: string) => {
        const profileFromFollower = await ProfileSchema.findOne({
            user: fromFollowerId,
        }).exec();
        const profileToFollowee = await ProfileSchema.findOne({
            user: toFolloweeId,
        }).exec();

        if (!profileFromFollower) {
            throw new HttpException(404, "Not found this user id");
        }
        if (!profileToFollowee) {
            throw new HttpException(404, "Not found this target user id");
        }

        if (
            profileFromFollower.followers.some(
                (f: IFriend) => f.user.toString() !== toFolloweeId.toString()
            )
        ) {
            throw new HttpException(
                400,
                "You has not being followed this user"
            );
        }
        if (
            profileToFollowee.followings.some(
                (f: IFollow) => f.user.toString() !== fromFollowerId.toString()
            )
        ) {
            throw new HttpException(
                400,
                "You has not been yet followed this user "
            );
        }

        if (!profileFromFollower.followings) {
            profileFromFollower.followings = [];
        }
        profileFromFollower.followings = profileFromFollower.followings.filter(
            ({ user }) => user.toString() !== toFolloweeId.toString()
        );

        if (!profileToFollowee.followers) {
            profileToFollowee.followers = [];
        }
        profileToFollowee.followers = profileToFollowee.followers.filter(
            ({ user }) => user.toString() !== fromFollowerId.toString()
        );

        await profileFromFollower.save();
        await profileToFollowee.save();

        return profileFromFollower;
    };

    public addFriend = async (fromUserId: string, toUserId: string) => {
        const profileFromUser = await ProfileSchema.findOne({
            user: fromUserId,
        }).exec();
        const profileToUser = await ProfileSchema.findOne({
            user: toUserId,
        }).exec();

        if (!profileFromUser) {
            throw new HttpException(400, "Wrong user id");
        }
        if (!profileToUser) {
            throw new HttpException(400, "Wrong target user id");
        }

        if (
            profileFromUser.friends.some(
                (f: IFriend) => f.user.toString() === toUserId.toString()
            )
        ) {
            throw new HttpException(400, "You has been added this user");
        }
        if (
            profileToUser.friend_requests.some(
                (f: IFriend) => f.user.toString() === fromUserId.toString()
            )
        ) {
            throw new HttpException(400, "You has been added this user");
        }

        // const newFollowing: IFollow = {
        //     user: toFolloweeId.toString(),
        //     date: new Date(),
        // };

        // const newFollower: IFollow = {
        //     user: fromFollowerId.toString(),
        //     date: new Date(),
        // };

        if (!profileToUser.friend_requests) {
            profileToUser.friend_requests = [];
        }
        if(!profileFromUser.friend_wait_reponse) {
            profileFromUser.friend_wait_reponse = [];
        }
        profileToUser.friend_requests.unshift({ user: fromUserId } as IFriend);
        profileFromUser.friend_wait_reponse.unshift({ user: fromUserId } as IFriend);
        // if (!profileToFollowee.followers) {
        //     profileToFollowee.followers = [];
        // }
        // profileToFollowee.followers.unshift(newFollower);
        await profileFromUser.save();
        await profileToUser.save();
        // await profileToFollowee.save();

        return profileToUser;
    };
    public getAllFriend = async (userId: string): Promise<IFriend[]> => {
        const user = await UserSchema.findOne({
            _id: userId,
        }).exec();
        if(!user){
            throw new HttpException(400, "Wrong user id");
        }
        const friend = await ProfileSchema.findOne({
            user : userId,
        }).exec();
        if(!friend){
            throw new HttpException(400, "User Profile not exist");
        }
        const list = friend.friends;
        return list;
    }
    public acceptFriend = async (currentUser: string, requestUser: string) => {
        const profileCurrent = await ProfileSchema.findOne({
            user: currentUser,
        }).exec();
        const profileRequest = await ProfileSchema.findOne({
            user: requestUser,
        }).exec();

        if (!profileCurrent) {
            throw new HttpException(400, "Wrong current user id");
        }
        if (!profileRequest) {
            throw new HttpException(400, "Wrong request user id");
        }

        if (
            profileCurrent.friends.some(
                (f: IFriend) => f.user.toString() === requestUser.toString()
            )
        ) {
            throw new HttpException(400, "You has been already be friend this user");
        }
        if(
            profileCurrent.friend_requests.some(
                (f: IFriend) => f.user.toString() !== requestUser.toString()
            )
        ){
            throw new HttpException(400, "You not have friend request from this user");
        }
       
        if (!profileCurrent.friends) {
            profileCurrent.friends = [];
        }
        profileCurrent.friends.unshift({
            user: requestUser,
        } as IFriend);

        if (!profileCurrent.friend_requests) {
             profileCurrent.friend_requests = [];
         }
         profileCurrent.friend_requests=  profileCurrent.friend_requests.filter(
             ({ user }) => user.toString() !== requestUser.toString()
         );

         if(!profileRequest.friends) {
            profileRequest.friends = [];
         }
         profileRequest.friends.unshift({
             user: currentUser,
         } as IFriend);
       
        await profileRequest.save();
        await profileCurrent.save();
        return profileRequest;
    };
    public async getFriendRequest(userId: string) : Promise<IFriend[]>{
        const user = await UserSchema.findOne({_id: userId}).exec();
        if(!user) {
            throw new HttpException(404, "User id not found");
        }
        const friendRequest = await ProfileSchema.findOne({ user: userId }).exec();
        
        if(!friendRequest){
            throw new HttpException(404, "Profile User id not found");
        }
        return friendRequest.friend_requests;
    }
    public async getFriendResponse(userId: string) : Promise<IFriend[]>{
        const user = await UserSchema.findOne({_id: userId}).exec();
        if(!user) {
            throw new HttpException(404, "User id not found");
        }
        const friendResponse = await ProfileSchema.findOne({ user: userId }).exec();
        
        if(!friendResponse){
            throw new HttpException(404, "Profile User id not found");
        }
        return friendResponse.friend_wait_reponse;
    }
    public unFriend = async (fromUserId: string, toUserId: string) => {
        const profileFromUser = await ProfileSchema.findOne({
            user: fromUserId,
        }).exec();
        const profileToUser = await ProfileSchema.findOne({
            user: toUserId,
        }).exec();

        if (!profileFromUser) {
            throw new HttpException(404, "Not found this user id");
        }
        if (!profileToUser) {
            throw new HttpException(404, "Not found this target user id");
        }

        if (
            profileFromUser.friends.some(
                (f: IFriend) => f.user.toString() !== toUserId.toString()
            )
        ) {
            throw new HttpException(400, "You has not yet be friend this user");
        }
        // if (
        //     profileToFollowee.followings.some(
        //         (f: IFollow) => f.user.toString() !== fromFollowerId.toString()
        //     )
        // ) {
        //     throw new HttpException(
        //         400,
        //         "You has not been yet followed this user "
        //     );
        // }

        if (!profileFromUser.friends) {
            profileFromUser.friends = [];
        }
        profileFromUser.friends = profileFromUser.friends.filter(
            ({ user }) => user.toString() !== toUserId.toString()
        );

        if (!profileToUser.friends) {
            profileToUser.friends = [];
        }
        profileToUser.friends = profileToUser.friends.filter(
            ({ user }) => user.toString() !== fromUserId.toString()
        );

        await profileFromUser.save();
        await profileToUser.save();

        return profileFromUser;
    };
}

export default ProfileService;
