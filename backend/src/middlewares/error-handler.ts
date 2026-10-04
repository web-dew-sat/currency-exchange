import {NextFunction, Response, Request} from 'express';
import {AppError} from "../errors/app.error";


export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json(err.serializeError())
    }

    res.status(500).json({
        error: {
            code: 'SERVER_ERROR',
            message: 'Internal Server Error'
        }
    });
}