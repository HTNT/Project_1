import { NextFunction, Request, Response } from 'express';
import ProfileService from './profile.service';
import { IProfile } from './profile.interface';
import CreateProfileDto from './dtos/create-profile.dto';
import AddExperienceDto from '@modules/profile/dtos/add-experience.dto';
import AddEducationDto from './dtos/add-education.dto';

class ProfileController {
    private profileSevices = new ProfileService();

    public getCurrentProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId = req.user.id;
            const resultObj: Partial<IProfile> =
                await this.profileSevices.getCurrentProfile(userId);
            // console.log(
            //     "===>Check resultObj at profile controler: \n",
            //     resultObj
            // );

            res.status(200).json({
                status: 200,
                message: "GET Current Profile successful",
                resultObj,
            });
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in getuserbyId at user.controller: \n', error, '\n\n');
        }
    };

    public getAllProfiles = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const resultObj: Partial<IProfile>[] =
                await this.profileSevices.getAllProfiles();
            // console.log('===>Check resultObj at auth profile controler: \n', resultObj);

            res.status(200).json({
                status: 200,
                message: "Get all profile successful",
                resultObj,
            });
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in getAll at profile.controller: \n', error, '\n\n');
        }
    };

    public getProfileById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId = req.params.id;
            const resultObj: Partial<IProfile> =
                await this.profileSevices.getCurrentProfile(userId);
            // console.log('===>Check resultObj at auth profile controler: \n', resultObj);

            res.status(200).json({
                status: 200,
                message: "Get profile successful",
                resultObj,
            });
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in getAll at profile.controller: \n', error, '\n\n');
        }
    };

    public createProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const userId = req.user.id;
        const userData: CreateProfileDto = req.body;
        try {
            const createProfile: IProfile =
                await this.profileSevices.createprofile(userId, userData);
            res.status(200).json({
                status: 200,
                message: "Create profile successful",
                createProfile,
            });
            // console.log('===>Check tokenData at controler: \n', tokenData);
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in createprofile at profile.controller: \n', error, '\n\n');
        }
    };

    public deleteProfile = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId = req.user.id;
            const resultObj: Partial<IProfile> =
                await this.profileSevices.deleteProfile(userId);
            // console.log('===>Check resultObj at profile controler: \n', resultObj);
            res.status(200).json({
                status: 200,
                message: "Delete profile successful",
                resultObj,
            });
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in getAll at profile.controller: \n', error, '\n\n');
        }
    };

    public createExperiece = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const userData: AddExperienceDto = req.body;
        const userId = req.user.id;
        try {
            const createExperiece: IProfile =
                await this.profileSevices.addExperience(userId, userData);
            res.status(200).json({
                status: 200,
                message: "Create experience successful",
                createExperiece,
            });
            // console.log('===>Check tokenData at controler: \n', tokenData);
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in createprofile at profile.controller: \n', error, '\n\n');
        }
    };

    public deleteExperience = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const eprId: string = req.params.exp_id;
        try {
            const resultObj: Partial<IProfile> =
                await this.profileSevices.deleteExperience(req.user.id, eprId);
            // console.log('===>Check resultObj at profile controler: \n', resultObj);
            res.status(200).json({
                status: 200,
                message: "Delete experience successful",
                resultObj,
            });
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in getAll at profile.controller: \n', error, '\n\n');
        }
    };

    public createEducation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const userData: AddEducationDto = req.body;
        const userId = req.user.id;
        try {
            const createEducation: IProfile =
                await this.profileSevices.addEducation(userId, userData);
            res.status(200).json({
                status: 200,
                message: "Create education successful",
                createEducation,
            });
            // console.log('===>Check tokenData at controler: \n', tokenData);
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in createprofile at profile.controller: \n', error, '\n\n');
        }
    };

    public deleteEducation = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const eduId: string = req.params.edu_id;
        try {
            const resultObj: Partial<IProfile> =
                await this.profileSevices.deleteEducation(req.user.id, eduId);
            // console.log('===>Check resultObj at profile controler: \n', resultObj);
            res.status(200).json({
                status: 200,
                message: "Delete education successful",
                resultObj,
            });
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in getAll at profile.controller: \n', error, '\n\n');
        }
    };

    public follow = async (req: Request, res: Response, next: NextFunction) => {
        const formUserId = req.user.id;
        const toUserId = req.params.to_id;
        try {
            const result = await this.profileSevices.follow(
                formUserId,
                toUserId
            );
            // console.log('===>Check result at profile controler: \n', result);
            res.status(200).json({
                status: 200,
                message: "Follow successful",
                result,
            });
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in getAll at profile.controller: \n', error, '\n\n');
        }
    };
    public unfollow = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const formUserId = req.user.id;
        const toUserId = req.params.to_id;
        try {
            const result = await this.profileSevices.unfollow(
                formUserId,
                toUserId
            );
            // console.log('===>Check result at profile controler: \n', result);
            res.status(200).json({
                status: 200,
                message: "Unfollow successful",
                result,
            });
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in getAll at profile.controller: \n', error, '\n\n');
        }
    };

    public addFriend = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const fromUserId = req.user.id;
        const toUserId = req.params.id;
        try {
            const result = await this.profileSevices.addFriend(
                fromUserId,
                toUserId
            );
            // console.log('===>Check result at profile controler: \n', result);
            res.status(200).json({
                status: 200,
                message: "AddFriend successful",
                result,
            });
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in getAll at profile.controller: \n', error, '\n\n');
        }
    };
    public getAllRequest = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const userId = req.params.id;
        try {
            const result = await this.profileSevices.getFriendRequest(userId);
            res.status(200).json({
                status: 200,
                message: "get req successful",
                result,
            })
        } catch (error) {
            next(error);
        }
    }
    public getAllFriend = async (req: Request, res: Response, next: NextFunction) =>{
        const userId = req.user.id;
        try {
            const result = await this.profileSevices.getAllFriend(userId);
            res.status(200).json({
                status: 200,
                message: "get friend successful",
                result,
            })
        } catch (error) {
            next(error);
        }
    }
    public acceptFriend = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const currentUser = req.user.id;
        const RequestUser = req.params.id;
        try {
            const result = await this.profileSevices.acceptFriend(
                currentUser,
                RequestUser
            );
            // console.log('===>Check result at profile controler: \n', result);
            res.status(200).json({
                status: 200,
                message: "AddFriend successful",
                result,
            });
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in getAll at profile.controller: \n', error, '\n\n');
        }
    };
    public unFriend = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const fromUserId = req.user.id;
        const toUserId = req.params.to_id;
        try {
            const result = await this.profileSevices.unFriend(
                fromUserId,
                toUserId
            );
            // console.log('===>Check result at profile controler: \n', result);
            res.status(200).json({
                status: 200,
                message: "UnFriend successful",
                result,
            });
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in getAll at profile.controller: \n', error, '\n\n');
        }
    };
}

export default ProfileController;
