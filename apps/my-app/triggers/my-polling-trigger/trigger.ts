import { definePollingTrigger } from "@rollout/framework";

import { MyAppCredential } from "../../auth";
import { inputParamsSchema } from "./input";
import { payloadSchema } from "./payload";

type State = Set<string>;

export const trigger = definePollingTrigger<MyAppCredential, State>()({
  name: "My polling trigger",
  inputParamsSchema,
  payloadSchema,
  async poll({ inputParams, prevState }) {
    // Fetch all items from your API
    const allItems = [
      { id: "1", name: "First" },
      { id: "2", name: "Second" },
    ]
      // Use `inputParams` to filter/query items
      .filter((i) => i.name === inputParams.name);

    // Compute new id snapshot and determine new items added since previous snapshot
    const newState = new Set(allItems.map((a) => a.id));
    const newItemIds = diffIdSnapshot(newState, prevState);

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

    return { newState, events };
  },
});

function diffIdSnapshot(
  newSnapshot: Set<string>,
  oldSnapshot: Set<string> | null
) {
  if (oldSnapshot == null) {
    return new Set(newSnapshot);
  }

  return new Set(
    Array.from(newSnapshot).filter((item) => oldSnapshot.has(item) === false)
  );
}
