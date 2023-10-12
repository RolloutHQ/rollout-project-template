import React, { useEffect } from "react";

import {
  defineUIComponent,
  RichTextInput,
  useApiBaseUrl,
  useConsumerToken,
} from "@rollout/framework/ui";

import type { inputParamsSchema } from "./input";

export const UI = defineUIComponent<typeof inputParamsSchema>((props) => {
  const { b } = props;

  const { apiBaseUrl } = useApiBaseUrl();
  const { getToken } = useConsumerToken();

  useEffect(() => {
    async function getMessage() {
      const message = await fetch(`${apiBaseUrl}/apps/my-app`, {
        headers: { authorization: `Bearer ${await getToken()}` },
      }).then((resp) => resp.text());

      console.log("message is", message);
    }

    getMessage();
  }, []);

  return (
    <>
      <RichTextInput bind={b.name} />
    </>
  );
});
