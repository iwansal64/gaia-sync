import { z } from "zod";

export const AccessedModelUser = z.object({
  created_at: z.string(),
  id: z.string(),
  username: z.string().nullable(),
  email: z.string(),
});

export type AccessedModelUserType = z.infer<typeof AccessedModelUser>;

export const AccessedModelDevice = z.object({
  created_at: z.string(),
  id: z.string(),
  device_name: z.string(),
  description: z.string().nullable(),
  status: z.boolean(),
  last_online: z.string().nullable()
});

export type AccessedModelDeviceType = z.infer<typeof AccessedModelDevice>;

export const AccessedModelAIReport = z.object({
  created_at: z.string(),
  id: z.string(),
  title: z.string(),
  suggestions: z.string(),
  fact: z.string(),
  device_id: z.string(),
});

export type AccessedModelAIReportType = z.infer<typeof AccessedModelAIReport>;

export const AccessedModelChatHistory = z.object({
  created_at: z.string(),
  id: z.string(),
  message: z.string(),
  from_user: z.boolean()
});

export type AccessedModelChatHistoryType = z.infer<typeof AccessedModelChatHistory>;