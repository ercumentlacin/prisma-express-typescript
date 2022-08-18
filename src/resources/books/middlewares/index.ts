import { z } from 'zod';
import { BookOrderRequestDTO } from '../dto/BookOrderRequest';
import * as e from 'express';
import { validator } from '@/utils';
import { BookInsertOneRequestDTO } from '@/resources/books';

export const BookOrderRequestSchema = z.object({
    bookIdList: z.array(z.string()),
    userName: z.string(),
});

const BookInsertRequestSchema = z.object({
    name: z.string(),
    author: z.string(),
    price: z.number(),
    stock: z.number(),
});

export const BookOrderRequestValidator = validator(BookOrderRequestSchema);
export const BookInsertValidator = validator(BookInsertRequestSchema);
