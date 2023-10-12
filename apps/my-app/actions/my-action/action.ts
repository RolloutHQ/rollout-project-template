import { defineAction } from "@rollout/framework";

import { inputParamsSchema } from "./input";

export const action = defineAction()({
  name: "My action",
  inputParamsSchema,
  async execute({ resolvedInputParams }) {
    // Execute the action
    console.log("Executing my-action", resolvedInputParams);
  },
});
