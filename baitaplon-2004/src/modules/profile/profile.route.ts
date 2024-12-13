import { Route } from '@core/interfaces';
import { Router } from 'express';
import ProfileController from './profile.controler';
import { authMiddleware, validationMiddleware } from '@core/middleware';
import CreateProfileDto from './dtos/create-profile.dto';
import AddExperienceDto from '@modules/profile/dtos/add-experience.dto';
import AddEducationDto from './dtos/add-education.dto';




class ProfileRoute implements Route {
    public path: string = '/api/v1/profile';
    public router = Router();
    public profileController = new ProfileController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.profileController.getAllProfiles);
        this.router.get(this.path + '/user/:id', this.profileController.getProfileById);
        this.router.get(this.path + '/me', authMiddleware, this.profileController.getCurrentProfile);
        this.router.post(this.path, authMiddleware, validationMiddleware(CreateProfileDto), this.profileController.createProfile);
        this.router.delete(this.path + '/:id', authMiddleware, this.profileController.deleteProfile);
        this.router.put(this.path + '/experience', authMiddleware, validationMiddleware(AddExperienceDto), this.profileController.createExperiece);
        this.router.delete(this.path + '/experience/:exp_id', authMiddleware, this.profileController.deleteExperience);
        this.router.put(this.path + '/education', authMiddleware, validationMiddleware(AddEducationDto), this.profileController.createEducation);
        this.router.delete(this.path + '/education/:edu_id', authMiddleware, this.profileController.deleteEducation);
        this.router.post(this.path + '/following/:id', authMiddleware, this.profileController.follow);
        this.router.delete(this.path + '/following/:id', authMiddleware, this.profileController.unfollow);
        this.router.post(this.path + '/friends/:id', authMiddleware, this.profileController.addFriend);
        this.router.get(this.path + '/friends/:id', authMiddleware, this.profileController.getAllRequest);
        this.router.delete(this.path + '/friends/:id', authMiddleware, this.profileController.unFriend);
        this.router.put(this.path + "/friends/:id", authMiddleware, this.profileController.acceptFriend);
        this.router.get(this.path + "/friends", authMiddleware, this.profileController.getAllFriend);
    }
}


export default ProfileRoute;