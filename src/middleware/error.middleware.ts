import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { HttpException } from '@/utils';
import { config } from '@/constants';

export function errorMiddleware(
    error: HttpException,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
): void {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Something went wrong';
    const details = error.details || {};

    const data = {
        status,
        message,
        ...(config.isProduction ? {} : { details }),
    };

    res.status(status).json(data);
}
