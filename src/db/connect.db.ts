import { PrismaClient } from '@prisma/client';

export function connectDb() {
    return new PrismaClient();
}

export type PrismaDB = ReturnType<typeof connectDb>;
