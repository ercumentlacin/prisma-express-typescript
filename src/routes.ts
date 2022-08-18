import { connectDb, PrismaDB } from './db';
import { Controller } from './interfaces';
import { BookController, BookRepository, BookService } from './resources/books';
import { OrderRepository, OrderService } from './resources/orders';
import { UserController, UserRepositories } from './resources/user';

export class Routes {
    private static instance: PrismaDB;
    public routes = [] as Array<Controller>;

    public constructor() {
        this.initializeRoutes(Routes.getPrismaService());
    }

    private initializeRoutes(prismaService: PrismaDB) {
        this.routes = [
            new BookController(
                new OrderService(
                    new BookService(new BookRepository(prismaService)),
                    new OrderRepository(prismaService)
                ),
                new BookService(new BookRepository(prismaService))
            ),
            new UserController(new UserRepositories(prismaService)),
        ];

        return this.routes;
    }

    private static getPrismaService(): PrismaDB {
        if (!Routes.instance) {
            Routes.instance = connectDb();
        }
        return Routes.instance;
    }
}
