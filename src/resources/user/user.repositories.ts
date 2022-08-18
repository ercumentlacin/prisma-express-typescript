import { PrismaDB } from '@/db';
import { CrudRepositories } from '@/utils';
import { Prisma } from '@prisma/client';
import { UserMapType } from './user-map-type.class';

export class UserRepositories extends CrudRepositories<
    Prisma.UserDelegate<unknown>,
    UserMapType
> {
    public constructor(private readonly prisma: PrismaDB) {
        super(prisma.user);
    }
}
