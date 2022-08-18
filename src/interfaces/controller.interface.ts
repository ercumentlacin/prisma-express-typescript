import { Router } from 'express';

export interface Controller {
    router: Router;
    path: string;
}

export type Controllers = Controller[];
