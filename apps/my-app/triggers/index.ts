import { trigger as myPollingTrigger } from "./my-polling-trigger/trigger";
import { trigger as myPushTrigger } from "./my-push-trigger/trigger";

export const triggers = {
  ["my-polling-trigger"]: myPollingTrigger,
  ["my-push-trigger"]: myPushTrigger,
};
