import { z } from "zod";

export const ModelUser = z.object({
  created_at: z.date(),
  id: z.string(),
  username: z.string().nullable(),
  password: z.string().nullable(),
  email: z.string(),
  verification_token: z.string().nullable(),
  access_token: z.string().nullable(),
  access_token_expire: z.string().nullable()
});