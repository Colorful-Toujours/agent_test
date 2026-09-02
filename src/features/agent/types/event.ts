export type AgentEvent =
  | RunStartedEvent
  | MessageDeltaEvent
  | ToolStartedEvent
  | ToolCompletedEvent
  | ArtifactCreatedEvent
  | RunCompletedEvent
  | RunFailedEvent;

export interface RunStartedEvent {
  type: "run.started";
  runId: string;
}

export interface MessageDeltaEvent {
  type: "message.delta";
  runId: string;

  data: {
    messageId: string;
    delta: string;
  };
}

export interface ToolStartedEvent {
  type: "tool.started";
  runId: string;

  data: {
    toolCallId: string;
    toolName: string;
    input: unknown;
  };
}

export interface ToolCompletedEvent {
  type: "tool.completed";
  runId: string;

  data: {
    toolCallId: string;
    output: unknown;
  };
}

export interface ArtifactCreatedEvent {
  type: "artifact.created";
  runId: string;

  data: {
    artifactId: string;

    artifactType:
      | "code"
      | "json"
      | "image"
      | "text";

    title: string;

    content: unknown;
  };
}

export interface RunCompletedEvent {
  type: "run.completed";
  runId: string;
}

export interface RunFailedEvent {
  type: "run.failed";
  runId: string;

  data: {
    message: string;
  };
}