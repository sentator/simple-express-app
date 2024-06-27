import { z } from 'zod';

export const registrationBodySchema = z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
