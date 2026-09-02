export type RunStatus =
  | "idle"
  | "running"
  | "completed"
  | "failed";

export interface AgentMessage {
  id: string;

  role:
    | "user"
    | "assistant";

  content: string;
}

export interface ToolCall {
  id: string;

  name: string;

  status:
    | "running"
    | "completed"
    | "failed";

  input?: unknown;

  output?: unknown;
}

export interface Artifact {
  id: string;

  type:
    | "code"
    | "json"
    | "image"
    | "text";

  title: string;

  content: unknown;
}

export interface AgentState {
  runId: string | null;

  status: RunStatus;

  messages: AgentMessage[];

  toolCalls: ToolCall[];

  artifacts: Artifact[];
}