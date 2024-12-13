import { Logger } from '@core/utils';
import HttpException from '@core/exceptions/http.exception';
import { NextFunction, Request, Response } from 'express';




const errorMiddelware = (error: HttpException, req: Request, res: Response, next: NextFunction)=>{
    const status: number = error.status || 500;
    const message: string = error.message || 'Some thing went wrong';

    Logger.error(`[ERROR] - Status: ${status} - message: ${message}`);
    res.status(status).json({message: message});
}

export default errorMiddelware;