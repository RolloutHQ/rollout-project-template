import { defineHTTPHandler, handleConsumerRequest } from "@rollout/framework";

export const http = defineHTTPHandler(async (req, res) => {
  // req is standard node server IncomingMessage
  // res is standard node server ServerResponse
  console.log("Handle request", req.url);

  const requestValidation = await handleConsumerRequest({
    token:
      req.headersDistinct["authorization"]?.[0]?.replace("Bearer ", "") ?? "",
  });

  if (!requestValidation.ok) {
    res.statusCode = 401;
    return res.end(requestValidation.error);
  }

  return res.end(
    `Hello from http to ${requestValidation.consumer.consumerKey}`
  );
});
