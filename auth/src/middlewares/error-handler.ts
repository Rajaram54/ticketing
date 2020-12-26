import { Request, Response, NextFunction } from 'express';
import { CustomError } from './../errors/custom-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Something went wrong', err);
    if (err instanceof CustomError) {
        console.log('Handling this error from request validation');
        return res.status(err.statusCode).send({ errors: err.serializeError() });
    }

    res.status(400).send({
        message: err.message
    });
};