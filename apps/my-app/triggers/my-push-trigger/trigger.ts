import { definePushTrigger } from "@rollout/framework";

import { inputParamsSchema } from "./input";
import { payloadSchema } from "./payload";
import { MyAppCredential } from "../../auth";

// Push triggers can be triggered via HTTP POST request, e.g.:
// POST /api/trigger-push-event
// {
//   "appKey": "my-app",
//   "triggerKey": "my-push-trigger",
//   "payload": {
//     "name": "Bob"
//   }
// }
export const trigger = definePushTrigger<MyAppCredential>()({
  name: "My push trigger",
  inputParamsSchema,
  payloadSchema,
});
