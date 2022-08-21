import { BookService } from '../books';
import { Order, OrderRepository } from '.';

export class OrderService {
    public constructor(
        private readonly bookService: BookService,
        private readonly orderRepository: OrderRepository
    ) {}

    public async putAnOrder(
        bookIdList: Array<string>,
        userName: string
    ): Promise<Order> {
        const bookList = await Promise.all(
            bookIdList.map((bookId) => {
                return this.bookService.findBookId(bookId);
            })
        );

        const nonNullableBookList = bookList
            .filter((book) => book !== null)
            .map((book) => book?.id);

        const totalPrice = bookList.reduce((acc, book) => acc + book!.price, 0);

        const createdOrder = this.orderRepository.save({
            userName,
            bookIdList: nonNullableBookList,
            totalPrice: String(totalPrice),
        });

        return createdOrder;
    }

    public async getOrders() {
        const orders = this.orderRepository.findMany();
        return orders;
    }
}
