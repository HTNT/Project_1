

import HttpException from '@core/exceptions/http.exception';
import { Logger } from '@core/utils';
import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';

const validationMiddleware = (type: any, skipMissingProperties = false): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        validate(plainToClass(type, req.body), { skipMissingProperties }).then((error: ValidationError[]) => {
            if (error.length > 0) {
                Logger.error('\n Error at validation.middleware: ' + error)
                const message = error.map((error: ValidationError) => {
                    return Object.values(error.constraints!)
                }).join(', ');
                next(new HttpException(400, message));
            } else {
                next();
            }

        })
    }
}

export default validationMiddleware;