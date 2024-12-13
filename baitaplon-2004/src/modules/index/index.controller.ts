import { Logger } from '@core/utils';
import e, { NextFunction, Request, Response } from 'express';

export default class IndexController {
    public index = (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).send({
                message: 'Hello World!',
                data: 'api is available'
            })
        } catch (error) {
            next(error);
            Logger.error(error);
        }
    }
}