import { defineTriggerPayloadSchema } from "@rollout/framework";

export const payloadSchema = defineTriggerPayloadSchema((t) => ({
  id: t.string({ title: "ID" }),
  name: t.string(),
}));
