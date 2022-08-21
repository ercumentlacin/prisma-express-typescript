import { BookRepository } from '@/resources/books';
import { MockContext, Context, createMockContext } from '@/utils/context';

import request from 'supertest';
import { App } from '@/app';
import { Routes } from '@/routes';
import { config } from '@/constants';

describe('BookRepository', () => {
    let bookRepository: BookRepository;
    let mockCtx: MockContext;
    let ctx: Context;
    let app: App;

    const path = '/book-store';

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;

        app = new App(new Routes().routes, config.port);

        bookRepository = new BookRepository(ctx.prisma);
    });

    test('should be defined', () => {
        expect(BookRepository).toBeDefined();
    });

    describe('getAll()', () => {
        test('should return all books', async () => {
            const books = [
                {
                    id: 'cl6x5zpf80000ebgcad0motnc',
                    name: '11.22.63',
                    author: 'Stephen King',
                    price: 7.15,
                    stock: 10,
                },
            ];
            mockCtx.prisma.book.findMany.mockResolvedValue(books);
            await expect(bookRepository.getAll()).resolves.toEqual(books);
        });
    });

    describe('createOne()', () => {
        test('should return book when payload is valid', async () => {
            const payload = {
                name: 'Charlie and the Chocolate Factory',
                author: 'Roald Dahl',
                price: 34.6,
                stock: 10,
            };
            const resultValue = {
                id: '1',
                ...payload,
            };
            const payload2 = {
                name: expect.any(String),
                author: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
            };
            const resultValue2 = {
                id: expect.any(String),
                ...payload,
            };
            mockCtx.prisma.book.create.mockResolvedValue(resultValue);
            await expect(bookRepository.createOne(payload)).resolves.toEqual(
                resultValue
            );
            mockCtx.prisma.book.create.mockResolvedValue(resultValue2);
            await expect(
                bookRepository.createOne(payload2)
            ).resolves.toMatchObject(resultValue2);
        });

        test('should be error when invalid payload', async () => {
            const res = await request(app.app)
                .post('/api/v1/book-store/create-book/')
                .send({});

            console.log(res.body);

            expect(res.body.status).toEqual(400);
            expect(res.status).toEqual(400);
        });
    });

    describe('findById(id)', () => {
        test('should return a selected ids book', async () => {
            const id = expect.any(String);
            const expectedData = {
                id,
                name: expect.any(String),
                author: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
            };
            mockCtx.prisma.book.findUniqueOrThrow.mockResolvedValue(
                expectedData
            );
            await expect(bookRepository.findById(id)).resolves.toEqual(
                expectedData
            );
        });

        test('should return a error when ids not founded', async () => {
            const id = expect.any(String);
            const expectedData = {
                id,
                name: expect.any(String),
                author: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
            };
            mockCtx.prisma.book.findUniqueOrThrow.mockResolvedValue(
                expectedData
            );
            await expect(bookRepository.findById(id)).resolves.toEqual(
                expectedData
            );
        });
    });
});
