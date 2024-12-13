import { TokenData } from '@modules/auth';
import { Logger } from '@core/utils';
import { NextFunction, Request, Response } from 'express';
import { RegisterDto } from './dtos';
import UserService from './user.service';

export default class UserController {
    private userService = new UserService();

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: RegisterDto = req.body;
            // console.log('===>Check model at user controler: \n', model);
            const tokenData: TokenData = await this.userService.createUser(model);
            // console.log('===>Check tokenData at user controler: \n', tokenData);

            res.status(201).json({
                message: 'User created successfully',
                tokenData
            })
        } catch (error) {
            next(error);
            Logger.error('\n===>error in register at user.controller: \n', error, '\n\n');
        }
    }

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            // console.log('===>Check userID at user controler: \n', userId);
            const user = await this.userService.getUserById(userId);
            // console.log('===>Check user at user controler: \n', user);

            res.status(200).json({
                message: 'User get successfully',
                // tokenData
                user
            })
        } catch (error) {
            next(error);
            Logger.error('\n===>error in getuserbyId at user.controller: \n', error, '\n\n');
        }
    }

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.userService.getAllUser();
            // console.log('===>Check user in getAll func at user controler: \n', user);

            res.status(200).json({
                message: 'User get successfully',
                // tokenData
                user
            })
        } catch (error) {
            next(error);
            Logger.error('\n===>error in getAll at user.controller: \n', error, '\n\n');
        }
    }

    public getAllPaging = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page: number = Number(req.params.page);
            // console.log('===>Check userID at user controler: \n', userId);

            const keyword = req.query.keyword || '';
            const paginationResult = await this.userService.getAllPaging(keyword.toString(), page);
            // console.log('===>Check paginationResult at user controler: \n', user);

            res.status(200).json({
                status: 200,
                message: 'User get successfully',
                // tokenData
                paginationResult
            })
        } catch (error) {
            next(error);
            Logger.error('\n===>error at getAllPaging user.controller: \n', error, '\n\n');
        }
    }

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: RegisterDto = req.body;
            // console.log('===>Check model at user controler: \n', model);
            const values = await this.userService.updateUser(req.params.id, model);
            // const user = await this.userService.getUserById(req.params.id);
            // console.log('===>Check user at user controler: \n', user);

            res.status(200).json({
                status: '200',
                message: 'User update successfully',
                values
            })
        } catch (error) {
            next(error);
            Logger.error('\n===>error in updateUser at user.controller: \n', error, '\n\n');
        }
    }

    public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.id;
            // console.log('===>Check userID at user controler: \n', userId);
            const result = await this.userService.deleteUser(userId);
            // console.log('===>Check user at user controler: \n', user);
            res.status(200).json({
                status: '200',
                message: 'User delete successfully',
                result
            })
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in deleteUser at user.controller: \n', error, '\n\n');
        }
    }
    public searchUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query: string = req.params.id;
            // console.log('===>Check userID at user controler: \n', userId);
            const result = await this.userService.searchUser(query);
            // console.log('===>Check user at user controler: \n', user);
            res.status(200).json({
                status: '200',
                message: 'Some User find successfully',
                result
            })
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in deleteUser at user.controller: \n', error, '\n\n');
        }
    }
    public searchAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query: string = req.params.id;
            // console.log('===>Check userID at user controler: \n', userId);
            const result = await this.userService.searchAll(query);
            // console.log('===>Check user at user controler: \n', user);
            res.status(200).json({
                status: '200',
                message: 'All find successfully',
                result
            })
        } catch (error) {
            next(error);
            // Logger.error('\n===>error in deleteUser at user.controller: \n', error, '\n\n');
        }
    }
}