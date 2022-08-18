import { PrismaDB } from '@/db';
import { Order } from '.';

export class OrderRepository {
    public constructor(private prismaService: PrismaDB) {}

    public async save(data: {
        totalPrice: string;
        userName: string;
        bookIdList: any;
    }): Promise<Order> {
        return this.prismaService.order.create({
            data: {
                totalPrice: data.totalPrice,
                userName: data.userName,
                bookIdList: data.bookIdList ?? [],
            },
        });
    }

    public async findMany() {
        const orders = await this.prismaService.order.findMany();
        return orders;
    }
}
