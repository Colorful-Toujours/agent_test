import type { AgentEvent } from "../types/event";
import type { AgentState } from "../types/state";

export const initialAgentState: AgentState = {
  runId: null,

  status: "idle",

  messages: [],

  toolCalls: [],

  artifacts: [],
};

export function agentReducer(state: AgentState, event: AgentEvent): AgentState {
  switch (event.type) {
    case "run.started":
      return {
        ...state,

        runId: event.runId,

        status: "running",
      };

    case "message.delta": {
      const message = state.messages.find(
        (item) => item.id === event.data.messageId,
      );

      if (!message) {
        return {
          ...state,

          messages: [
            ...state.messages,
            {
              id: event.data.messageId,

              role: "assistant",

              content: event.data.delta,
            },
          ],
        };
      }

      return {
        ...state,

        messages: state.messages.map((item) =>
          item.id === event.data.messageId
            ? {
                ...item,

                content: item.content + event.data.delta,
              }
            : item,
        ),
      };
    }

    case "tool.started":
      return {
        ...state,

        toolCalls: [
          ...state.toolCalls,

          {
            id: event.data.toolCallId,

            name: event.data.toolName,

            status: "running",

            input: event.data.input,
          },
        ],
      };

    case "tool.completed":
      return {
        ...state,

        toolCalls: state.toolCalls.map((tool) =>
          tool.id === event.data.toolCallId
            ? {
                ...tool,

                status: "completed",

                output: event.data.output,
              }
            : tool,
        ),
      };

    case "artifact.created":
      return {
        ...state,

        artifacts: [
          ...state.artifacts,

          {
            id: event.data.artifactId,

            type: event.data.artifactType,

            title: event.data.title,

            content: event.data.content,
          },
        ],
      };

    case "run.completed":
      return {
        ...state,

        status: "completed",
      };

    case "run.failed":
      return {
        ...state,

        status: "failed",
      };

    case "message.created":
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: event.data.messageId,
            role: event.data.role,
            content: event.data.content,
          },
        ],
      };
    default:
      return state;
  }
}
