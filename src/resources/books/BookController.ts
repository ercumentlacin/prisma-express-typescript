import { Controller } from '@/interfaces';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BookInsertOneRequestDTO, BookOrderRequest, BookService } from '.';
import { OrderService } from '../orders';
import asyncHandler from 'express-async-handler';
import { responseBody } from '@/utils/responseBody';
import { BookInsertValidator, BookOrderRequestValidator } from './middlewares';

export class BookController implements Controller {
    public router = Router();
    public path = '/book-store';

    public constructor(
        private readonly orderService: OrderService,
        private readonly bookService: BookService
    ) {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/books`, this.getBooks);
        this.router.get(`${this.path}/orders`, this.getOrders);
        // this.router.get('/:id', this.getUserById);
        this.router.post(this.path, BookOrderRequestValidator, this.putAnOrder);
        this.router.post(
            `${this.path}/create-book`,
            BookInsertValidator,
            this.createBook
        );
        // this.router.put('/:id', this.updateUser);
        // this.router.delete('/:id', this.deleteUser);
    }

    public putAnOrder = asyncHandler(async (req: Request, res: Response) => {
        const data = responseBody<BookOrderRequest>(req.body);

        const result = await this.orderService.putAnOrder(
            data.bookIdList,
            data.userName
        );

        res.status(StatusCodes.CREATED).json(result);
    });

    public getOrders = asyncHandler(async (req: Request, res: Response) => {
        const result = this.orderService.getOrders();

        res.status(StatusCodes.OK).json(result);
    });

    public createBook = asyncHandler(async (req: Request, res: Response) => {
        const data = responseBody<BookInsertOneRequestDTO>(req.body);

        const result = await this.bookService.insertOne(data);

        res.status(StatusCodes.CREATED).json(result);
    });

    public getBooks = asyncHandler(async (req: Request, res: Response) => {
        const result = await this.bookService.getAll();
        res.status(StatusCodes.OK).json(result);
    });
}
