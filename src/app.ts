import type { Application } from 'express';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';

import { Controllers } from '@/interfaces';
import { errorMiddleware } from './middleware';
import { connectDb } from './db';
import { notFound404 } from '@/utils/exceptions';

export class App {
    public app: Application;
    public port: number;

    public constructor(controllers: Controllers, port: number) {
        this.app = express();
        this.port = port;

        App.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private static initializeDatabaseConnection() {
        connectDb();
    }

    private initializeMiddleware(): void {
        this.app
            .use(helmet())
            .use(cors())
            .use(morgan('dev'))
            .use(express.json())
            .use(express.urlencoded({ extended: false }))
            .use(compression());
    }

    private initializeControllers(controllers: Controllers): void {
        controllers.forEach((controller) => {
            this.app.use('/api/v1', controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.app.use('*', notFound404);
        this.app.use(errorMiddleware);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
