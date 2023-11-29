import {
  defineWebhookTrigger,
  getPublicRolloutServiceUrl,
} from "@rollout/framework";
import { v4 as uuid } from "uuid";

import { MyAppCredential } from "../../auth";
import { inputParamsSchema } from "./input";
import { payloadSchema } from "./payload";

// Any data you want to pass in from http handler
type RequestPayload = {
  automationId: string;
  body: {
    id: string;
    name: string;
  };
};

export const trigger = defineWebhookTrigger<MyAppCredential, RequestPayload>()({
  name: "My polling trigger",
  inputParamsSchema,
  payloadSchema,

  async subscribe({ credential, inputParams }) {
    // Make the request to create the subscription
    const webhookUrlId = uuid();

    // Refer to http.ts to see how this endpoint is implemented.
    const targetUrl = `${getPublicRolloutServiceUrl()}/api/apps/my-app/webhooks/${webhookUrlId}`;

    const response = await fetch("https://example.com/subscriptions", {
      method: "POST",
      headers: {
        Authorization: `Api-Key ${credential.data.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetUrl,
        filter: { name: inputParams.name },
      }),
    }).then((res) => res.json());

    // Return whatever you need to store for the subscription
    return {
      subscriptionId: response.subscriptionId,
      webhookUrlId,
    };
  },

  async unsubscribe({ credential, subscription }) {
    await fetch(
      `https://example.com/subscriptions/${subscription.subscriptionId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Api-Key ${credential.data.apiKey}`,
        },
      }
    );
  },

  // See http.ts for usage
  async handleEvent({ requestPayload }) {
    // Execute any trigger-specific logic here
    return [
      {
        automationId: requestPayload.automationId,
        event: {
          payload: requestPayload.body,
        },
      },
    ];
  },
});
