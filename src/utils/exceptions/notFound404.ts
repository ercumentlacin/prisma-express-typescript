import { Request, Response } from 'express';
import { HttpException } from '@/utils';
import { StatusCodes } from 'http-status-codes';

export const notFound404 = (req: Request, res: Response) => {
    throw new HttpException('Route is not found', StatusCodes.NOT_FOUND);
};
