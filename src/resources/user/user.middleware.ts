import type { Request, Response, NextFunction } from 'express';
import { ZodIssue } from 'zod';
import { StatusCodes } from 'http-status-codes';

import { HttpException } from '@/utils';
import { UserSchema, CreateUserMapper } from '.';

export async function createUserValidator(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    const result = await UserSchema.create.safeParseAsync(req.body);

    if (!result.success) {
        const { fieldErrors } = result.error.flatten((issue: ZodIssue) => ({
            message: issue.message,
            errorCode: issue.code,
        }));

        const errors = Object.entries(fieldErrors).map(([field, error]) => {
            return {
                message: `${error[0].message} (${field})`,
            };
        });

        const message = errors[0]?.message as string;

        next(new HttpException(message, StatusCodes.BAD_REQUEST, fieldErrors));
    } else {
        req.body = new CreateUserMapper(result.data);

        next();
    }
}
