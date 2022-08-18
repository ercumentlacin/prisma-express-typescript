import { Prisma } from '@prisma/client';

export interface Order {
    id?: string;
    userName: string;
    totalPrice: string;
    bookIdList: Prisma.JsonValue;
}
