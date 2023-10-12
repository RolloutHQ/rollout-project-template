import { definePushTrigger } from "@rollout/framework";

import { inputParamsSchema } from "./input";
import { payloadSchema } from "./payload";

// Push triggers can be triggered via HTTP POST request, e.g.:
// POST /api/trigger-push-event
// {
//   "appKey": "my-app",
//   "triggerKey": "my-push-trigger",
//   "payload": {
//     "name": "Bob"
//   }
// }
export const trigger = definePushTrigger()({
  name: "My push trigger",
  inputParamsSchema,
  payloadSchema,
});
