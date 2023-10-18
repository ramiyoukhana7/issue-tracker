import { z } from "zod";

export const issueSchema = z.object({
  // giving the title a type and setting the minimum and maximum title length
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required."),
});
