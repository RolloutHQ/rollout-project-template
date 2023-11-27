import {
  defineHTTPHandler,
  getLiveAutomations,
  handleConsumerRequest,
  handleWebhookRequestJob,
} from "@rollout/framework";
import Elysia, { t } from "elysia";

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
    "/webhooks/:webhookUrlId",
    async ({ body, request, params, set }) => {
      if (request.headers.get("X-Webhook-Secret") !== "MY_SECRET") {
        set.status = 401;
        return "Invalid secret";
      }

      const automations = await getLiveAutomations({
        where: { trigger: { appKey: "my-app" } },
      });

      const automation = automations.find(
        (a) => a.trigger.subscription?.data?.webookUrlId === params.webhookUrlId
      );

      if (automation == null) {
        set.status = 400;
        return "Automation not found";
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
