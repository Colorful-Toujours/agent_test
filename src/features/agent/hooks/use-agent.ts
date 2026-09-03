"use client";

import { useCallback } from "react";

import { useAgentContext } from "../context/agent-context";
import { mockAgent } from "../mock/mock-agent";

export function useAgent() {
  const {
    state,
    dispatch,
  } = useAgentContext();

  const run = useCallback(
    async (message: string) => {
      const text = message.trim();

      if (!text) {
        return;
      }

      if (state.status === "running") {
        return;
      }

      for await (
        const event of mockAgent(text)
      ) {
        dispatch(event);
      }
    },
    [
      dispatch,
      state.status,
    ]
  );

  return {
    state,

    run,
  };
}
