import { CrudMapType } from '@/interfaces';
import { Prisma } from '@prisma/client';

export class UserMapType implements CrudMapType {
    aggregate!: Prisma.UserAggregateArgs;
    count!: Prisma.UserCountArgs;
    create!: Prisma.UserCreateArgs;
    delete!: Prisma.UserDeleteArgs;
    deleteMany!: Prisma.UserDeleteManyArgs;
    findFirst!: Prisma.UserFindFirstArgs;
    findMany!: Prisma.UserFindManyArgs;
    findUnique!: Prisma.UserFindUniqueArgs;
    update!: Prisma.UserUpdateArgs;
    updateMany!: Prisma.UserUpdateManyArgs;
    upsert!: Prisma.UserUpsertArgs;
}
