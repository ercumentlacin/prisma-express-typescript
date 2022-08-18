import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z, ZodIssue } from 'zod';
import { HttpException } from './exceptions';

export function validator(Schema: z.Schema) {
    return async (req: Request, _res: Response, next: NextFunction) => {
        const result = await Schema.safeParseAsync(req.body);

        if (!result.success) {
            const { fieldErrors } = result.error.flatten((issue: ZodIssue) => ({
                message: issue.message,
                errorCode: issue.code,
            }));

            const errors = Object.entries(fieldErrors).map(([field, error]) => {
                return {
                    message: `${error?.[0].message} (${field})`,
                };
            });

            const message = errors[0]?.message as string;

            next(
                new HttpException(message, StatusCodes.BAD_REQUEST, fieldErrors)
            );
        } else {
            req.body = result.data as z.infer<typeof Schema>;

            next();
        }
    };
}
