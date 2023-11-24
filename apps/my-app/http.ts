import { defineHTTPHandler, handleConsumerRequest } from "@rollout/framework";

export const http = defineHTTPHandler(async (request) => {
  // request is standard web fetch-compilant Request instance
  console.log("Handle request", request.url);

  const requestValidation = await handleConsumerRequest({
    token: request.headers.get("authorization")?.replace("Bearer ", "") ?? "",
  });

  if (!requestValidation.ok) {
    return Response.json(requestValidation.error, { status: 401 });
  }

  return Response.json(
    `Hello from http to ${requestValidation.consumer.consumerKey}`
  );
});
