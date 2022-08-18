import { RequestHandler, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Controller } from '@/interfaces';
import { CreateUserDao, createUserValidator, UserRepositories } from '.';
import { HttpException } from '@/utils';

export class UserController implements Controller {
    public router = Router();
    public path = '/users';

    public constructor(private readonly userRepositories: UserRepositories) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // this.router.get('/', this.getAllUsers);
        // this.router.get('/:id', this.getUserById);
        this.router.post(this.path, createUserValidator, this.create);
        // this.router.put('/:id', this.updateUser);
        // this.router.delete('/:id', this.deleteUser);
    }

    private create: RequestHandler = async (req, res) => {
        try {
            const { body }: { body: CreateUserDao } = req;

            const result = await this.userRepositories.create({
                data: body,
            });

            res.status(StatusCodes.CREATED).json(result);
        } catch (error: unknown) {
            let message = 'An error occurred while creating the user';
            if (error instanceof Error) {
                message = error.message;
            }
            throw new HttpException(message, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    };
}
