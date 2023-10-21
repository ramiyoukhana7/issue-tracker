import { z } from "zod";

export const issueSchema = z.object({
  // giving the title a type and setting the minimum and maximum title length
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
});

export const patchIssueSchema = z.object({
  // giving the title a type and setting the minimum and maximum title length
  title: z.string().min(1, "Title is required.").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "assignedToUserId is required.")
    .max(255)
    .optional()
    .nullable(),
});
