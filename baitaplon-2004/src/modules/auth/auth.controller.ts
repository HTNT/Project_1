import { LoginDto, TokenData } from '@modules/auth';
import { Logger } from '@core/utils';
import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';


export default class AuthController {
    private authService = new AuthService();

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: LoginDto = req.body;
            // console.log('===>Check model at auth controler: \n', model);
            const tokenData: TokenData = await this.authService.login(model);
            // console.log('===>Check tokenData at auth controler: \n', tokenData);

            res.status(200).json({
                message: 'Login successfully',
                tokenData
            })
        } catch (error) {
            Logger.error('\n===>error at auth.controller: \n', error);
            next(error);
        }
    }

    public getCurrentLoginUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await this.authService.getCurrentLoginUser(req.user.id);
            // console.log('===>Check tokenData at auth controler: \n', tokenData);

            res.status(200).json({
                status: 200,
                message: 'Login successful',
                user,
            })
        } catch (error) {
            Logger.error('\n===>error at auth.controller: \n', error);
            next(error);
        }
    }
}