import { defineTriggerPayloadSchema } from "@rollout/framework";

export const payloadSchema = defineTriggerPayloadSchema((t) => ({
  id: t.string({ label: "ID" }),
  name: t.string({ label: "Name" }),
}));
