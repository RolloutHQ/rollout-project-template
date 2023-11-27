import { defineTriggerInputParamsSchema } from "@rollout/framework";

export const inputParamsSchema = defineTriggerInputParamsSchema((t) => ({
  name: t.string(),
}));
