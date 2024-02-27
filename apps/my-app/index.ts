import { defineApp } from "@rollout/framework";

import { actions } from "./actions";
import { triggers } from "./triggers";

export const app = defineApp({
  name: "My App",
  auth: false,
  triggers,
  actions,
});
