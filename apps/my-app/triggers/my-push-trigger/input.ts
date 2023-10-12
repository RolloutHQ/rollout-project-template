import { z } from "@rollout/framework";

export const inputParamsSchema = z.object({
  name: z.string(),
});
