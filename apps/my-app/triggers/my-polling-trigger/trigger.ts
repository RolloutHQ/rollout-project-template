import { definePollingTrigger } from "@rollout/framework";

import { inputParamsSchema } from "./input";
import { payloadSchema } from "./payload";

export const trigger = definePollingTrigger()({
  name: "My polling trigger",
  inputParamsSchema,
  payloadSchema,
  async poll({ diffIdSnapshot, prevIdSnapshot, inputParams }) {
    // Fetch all items from your API
    const allItems = [
      { id: "1", name: "First" },
      { id: "2", name: "Second" },
    ]
      // Use `inputParams` to filter/query items
      .filter((i) => i.name === inputParams.name);

    // Compute new id snapshot and determine new items added since previous snapshot
    const newIdSnapshot = new Set(allItems.map((a) => a.id));
    const newItemIds = diffIdSnapshot(newIdSnapshot, prevIdSnapshot);

    const events = allItems
      .filter((a) => newItemIds.has(a.id.toString()))
      .map((a) => {
        return {
          id: a.id,
          name: a.name,
        };
      })
      // Make sure events are ordered from oldest to newest
      .reverse();

    return { newIdSnapshot, events };
  },
});
