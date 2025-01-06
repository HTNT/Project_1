
import { DataStoredInToken, TokenData } from '@modules/auth';
import { RegisterDto } from './dtos';
import UserSchema from './user.model';
import { isEmptyObject } from '@core/utils';
import HttpException from '@core/exceptions/http.exception';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import IUser from './user.interface';
import jwt from 'jsonwebtoken';
import { IPagintion } from '@core/interfaces';
import { IPost } from '@modules/posts/posts.interface';
import { PostSchema } from '@modules/posts';


class UserService {
    public userSchema = UserSchema;

    public async createUser(model: RegisterDto): Promise<TokenData> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, 'Model is empty');
        }

        const user = await this.userSchema.findOne({ email: model.email }).exec();
        if (user) {
            throw new HttpException(409, 'Your email address is already exists');
        }
        
        const avatar = gravatar.url(model.email!, { size: '200', rating: 'g', default: 'mm' });
        const cover_image = gravatar.url(model.email!, { size: '200', rating: 'g', default: 'mm' });
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(model.password!, salt);
        // console.log('\n====>Check model at user service: \n', model);

        const createdUser: IUser = await this.userSchema.create({
            ...model,
            password: hashedPassword,
            avatar: avatar,
            date: Date.now(),
            cover_image: cover_image,
        });
        // console.log('\n===>Check created user at userService: \n', createdUser);

        return this.createToken(createdUser);
    }

    public async updateUser(userId: string, model: RegisterDto): Promise<IUser> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, 'Model is empty');
        }

        const user = await this.userSchema.findById(userId).exec();
        if (!user) { throw new HttpException(400, 'User is not found') };
        // let avt = user.avatar;

        if (user.email === model.email) {
            throw new HttpException(400, 'You must using different email address!')
        } else {
            // const avatar = gravatar.url(model.email!, { size: '200', rating: 'g', default: 'mm' });
            const checkEmailExists = await this.userSchema.find({
                $and: [{ email: { $eq: model.email } }, { _id: { $ne: userId } }]
            }).exec();

            if (checkEmailExists.length) {
                throw new HttpException(400, 'Email already exists');
            }
        }
        let updateUserById;
        if (model.password) {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(model.password!, salt);
            updateUserById = await this.userSchema.findByIdAndUpdate(userId, {
                ...model,
                password: hashedPassword,
            }).exec();
        } else {
            updateUserById = await this.userSchema.findByIdAndUpdate(userId, {
                ...model,
            }, { new: true }).exec();
        }
        if (!updateUserById) { throw new HttpException(409, 'Are not User') };

        return updateUserById;
    }

    public async getAllUser(): Promise<IUser[]> {
        const user = await this.userSchema.find().exec();

        return user;
    }

    public async getAllPaging(keyword: string, page: number): Promise<IPagintion<IUser>> {
        const pageSize: number = Number(process.env.PAGE_SIZE || 10);
        let query = {};
        if (keyword) {
            query = { $or: [{ email: keyword }, { first_name: keyword }, { last_name: keyword }] };
        }
        const user = await this.userSchema.find(query).skip(((page - 1) * pageSize)).limit(pageSize).exec();
        // console.log('\n===> Check query in getAllPaging at user service: ', query, '\n\n');

        const rowCount = await this.userSchema.find(query).estimatedDocumentCount({}).exec();
        // const rowCount = await this.userSchema.find(query).estimatedDocumentCount({}).clone().exec();

        return {
            total: rowCount,
            page: page,
            pageSize: pageSize,
            item: user,

        } as IPagintion<IUser>;

    }

    public async getUserById(userId: string): Promise<IUser> {
        const user = await this.userSchema.findById(userId).exec();
        if (!user) { throw new HttpException(404, 'User is not exists'); }

        return user;
    }

    public async deleteUser(userId: string): Promise<IUser> {
        const deleteUser = await this.userSchema.findByIdAndDelete(userId).exec();
        if (!deleteUser) { throw new HttpException(409, 'User invalid'); }
        return deleteUser;
    }

    private createToken(user: IUser): TokenData {
        const dataInToken: DataStoredInToken = { id: user._id };
        const secret: string = process.env.JWT_TOKEN_SECRET!;
        const expiresIn: number = 7 * 24 * 60 * 60 * 1000 * 10;

        return {
            token: jwt.sign(dataInToken, secret, { expiresIn: expiresIn })
        }
    }
    public async searchUser(query: string): Promise<IUser[]> {
        const regex = new RegExp(query, 'i');
        const users = await UserSchema.find({
            $or: [
                {
                    first_name: { $regex: regex }
                },
                {
                    last_name: { $regex: regex }
                }
            ],
        }).exec();
        if (!users) {
            throw new HttpException(400, 'Can not find user');
        }
        return users;
    }
    public async searchAll(query: string): Promise<[IUser[], IPost[]]> {
        const regex = new RegExp(query, 'i');
        const users = await UserSchema.find({
            $or: [
                {
                    first_name: { $regex: regex }
                },
                {
                    last_name: { $regex: regex }
                }
            ],
        }).exec();
        const posts = await PostSchema.find({
            text: { $regex: regex }
        }).exec();
        return [users, posts];
    }

}


export default UserService;