import { BookRepository, Book, BookInsertOneRequestDTO } from '.';

export class BookService {
    public constructor(private readonly bookRepository: BookRepository) {}

    public async findBookId(bookId: string): Promise<Book> {
        return this.bookRepository.findById(bookId);
    }

    public async insertOne(
        book: BookInsertOneRequestDTO
    ): Promise<BookInsertOneRequestDTO> {
        return this.bookRepository.createOne(book);
    }

    public async getAll(): Promise<Array<Book>> {
        return this.bookRepository.getAll();
    }
}
