import { defineActionInputParamsSchema } from "@rollout/framework";

export const inputParamsSchema = defineActionInputParamsSchema((t) => ({
  name: t.string(),
}));
