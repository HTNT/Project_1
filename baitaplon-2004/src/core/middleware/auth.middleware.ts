import jwt from 'jsonwebtoken';
import HttpException from '@core/exceptions/http.exception';
import { DataStoredInToken, TokenData } from '@modules/auth';
import { NextFunction, Request, Response } from 'express';



const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers['x-auth-token'] as string;
    if (!token) {
        // throw new HttpException(401, 'Unauthorized');
        return res.status(401).json({ status: 401, message: 'Invalid token, authorization denied!' });
    }
    try {
        const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET!) as DataStoredInToken;
        if (!req.user) { req.user = { id: '' } };
        req.user.id = user.id;
        next();
    } catch (error) {
        res.status(400).json({ message: 'token is not valid' });
    }
}


export default authMiddleware;
