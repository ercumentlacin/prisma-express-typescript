import { Controller } from '@/interfaces';
import { Router } from 'express';

export class TodoController implements Controller {
    public router = Router();
    public path = '/todos';

    public constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        throw new Error('Method not implemented.');
    }
}
