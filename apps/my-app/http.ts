import {
  defineHTTPHandler,
  getAutomation,
  handleConsumerRequest,
  handleWebhookRequestJob,
} from "@rollout/framework";
import { Elysia, t, error } from "elysia";

import { triggers } from "./triggers";

// Using Elysia here, but you can use any Fetch-compatible router,
// like hono or itty-router.
const router = new Elysia()
  .get("/hello", async ({ request, set }) => {
    const requestValidation = await handleConsumerRequest({
      token: request.headers.get("authorization")?.replace("Bearer ", "") ?? "",
    });

    if (!requestValidation.ok) {
      set.status = 401;
      return requestValidation.error;
    }

    return `Hello from http to ${requestValidation.consumer.consumerKey}`;
  })

  .post(
    "/webhooks/:automationId",
    async ({ body, request, params }) => {
      if (request.headers.get("X-Webhook-Secret") !== "MY_SECRET") {
        throw error(401, "Invalid secret");
      }

      const automation = await getAutomation({
        where: { id: params.automationId },
      }).catch(() => {
        throw error(400, "Automation not found");
      });

      if (!automation.live) {
        throw error(400, "Automation is not live");
      }

      handleWebhookRequestJob({
        triggerDef: triggers["my-webhook-trigger"],
        requestPayload: {
          automationId: automation.id,
          body,
        },
      });

      return "OK";
    },
    {
      body: t.Object({
        id: t.String(),
        name: t.String(),
      }),
    }
  );

export const http = defineHTTPHandler(router.handle);
