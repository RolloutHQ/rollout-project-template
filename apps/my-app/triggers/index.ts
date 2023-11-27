import { trigger as myPollingTrigger } from "./my-polling-trigger/trigger";
import { trigger as myPushTrigger } from "./my-push-trigger/trigger";
import { trigger as myWebhookTrigger } from "./my-webhook-trigger/trigger";

export const triggers = {
  ["my-polling-trigger"]: myPollingTrigger,
  ["my-push-trigger"]: myPushTrigger,
  ["my-webhook-trigger"]: myWebhookTrigger,
};
