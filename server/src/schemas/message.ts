import { z } from 'zod';

export const createMessageBodySchema = z.object({
  value: z.string(),
  sender: z.number(),
  receiver: z.number(),
});
