import { Route } from '@core/interfaces';
import { Router } from 'express';
import UserController from './user.controller';
import { authMiddleware, validationMiddleware } from '@core/middleware';
import { RegisterDto } from './dtos';

export default class UserRoute implements Route {
    public path: string = '/api/users';
    public router = Router();

    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path + '/register', validationMiddleware(RegisterDto, true), this.userController.register); // http://localhost:2206/api/users
        this.router.put(this.path + '/:id', authMiddleware, validationMiddleware(RegisterDto, true), this.userController.updateUser);
        this.router.get(this.path + '/:id', this.userController.getUserById);
        this.router.get(this.path, this.userController.getAll);
        this.router.get(this.path + '/paging/:page/', this.userController.getAllPaging);
        this.router.delete(this.path + '/:id', authMiddleware, this.userController.deleteUser);
        this.router.get(this.path +'/find/some/:id',this.userController.searchUser );
        this.router.get(this.path +'/find/all/:id', this.userController.searchAll);
    }
}