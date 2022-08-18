import { z } from 'zod';
import { UserSchema } from '.';

export type CreateUserDao = z.infer<typeof UserSchema.create>;
