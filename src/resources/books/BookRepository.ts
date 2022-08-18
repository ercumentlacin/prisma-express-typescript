import { PrismaDB } from '@/db';
import { Book, BookInsertOneRequestDTO } from '.';

export class BookRepository {
    public constructor(private prismaService: PrismaDB) {}

    public async findById(id: string): Promise<Book> {
        return this.prismaService.book.findUniqueOrThrow({ where: { id } });
    }

    public async createOne(data: BookInsertOneRequestDTO) {
        return this.prismaService.book.create({
            data,
        });
    }

    public async getAll() {
        return this.prismaService.book.findMany();
    }
}
