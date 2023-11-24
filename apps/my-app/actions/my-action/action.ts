import { defineAction } from "@rollout/framework";

import { inputParamsSchema } from "./input";
import { MyAppCredential } from "../../auth";

export const action = defineAction<MyAppCredential>()({
  name: "My action",
  inputParamsSchema,
  async execute({ resolvedInputParams }) {
    // Execute the action
    console.log("Executing my-action", resolvedInputParams);
  },
});
