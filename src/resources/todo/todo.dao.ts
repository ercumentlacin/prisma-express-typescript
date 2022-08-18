import { z } from 'zod';
import { TodoSchema } from '.';

export type CreateTodoDao = z.infer<typeof TodoSchema.create>;
