
import { DataStoredInToken, TokenData } from '@modules/auth';
import { LoginDto } from './index'
import { UserSchema } from '@modules/users';
import { isEmptyObject } from '@core/utils';
import HttpException from '@core/exceptions/http.exception';
import bcryptjs from 'bcryptjs';
import IUser from '@modules/users/user.interface';
import jwt from 'jsonwebtoken';



class AuthService {
    public userSchema = UserSchema;

    public async login(model: LoginDto): Promise<TokenData> {
        if (isEmptyObject(model.email) && isEmptyObject(model.password)) {
            throw new HttpException(400, 'Email and Password is empty');
        }
        if (isEmptyObject(model.email)) {
            throw new HttpException(400, 'Email is empty');
        }
        if (isEmptyObject(model.password)) {
            throw new HttpException(400, 'Password is empty');
        }
        const user = await this.userSchema.findOne({ email: model.email });
        if (!user) { throw new HttpException(409, 'Your email address is not exists'); }
        const isMatchPassword = await bcryptjs.compare(model.password, user.password);
        if (!isMatchPassword) { throw new HttpException(400, 'Your password is not correct'); }

        return this.createToken(user);
    }

    public async getCurrentLoginUser(userId: string): Promise<IUser> {
        const user = await this.userSchema.findById(userId).exec();
        if (!user) { throw new HttpException(404, 'User is not exists'); }

        return user;
    }

    private createToken(user: IUser): TokenData {
        const dataInToken: DataStoredInToken = { id: user._id };
        const secret: string = process.env.JWT_TOKEN_SECRET!;
        const expiresIn: number = 7 * 24 * 60 * 60 * 1000 * 10;
        return {
            token: jwt.sign(dataInToken, secret, { expiresIn: expiresIn })
        }
    }
}


export default AuthService;