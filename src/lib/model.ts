import { z } from "zod";

export const AccessedModelUser = z.object({
  created_at: z.string(),
  id: z.string(),
  username: z.string().nullable(),
  email: z.string(),
});

export type AccessedModelUserType = z.infer<typeof AccessedModelUser>;

export const  AccessedModelDevice = z.object({
  created_at: z.string(),
  id: z.string(),
  device_name: z.string(),
  description: z.string().optional(),
  status: z.boolean(),
  last_login: z.string().optional()
});

export type AccessedModelDeviceType = z.infer<typeof AccessedModelDevice>;