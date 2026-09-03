import type { AgentEvent } from "../types/event";

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function* mockAgent(message: string): AsyncGenerator<AgentEvent> {
  const runId = crypto.randomUUID();
  const assistantMessageId = crypto.randomUUID();
  yield { type: "run.started", runId };
  yield { type: "message.created", runId, data: { messageId: crypto.randomUUID(), role: "user", content: message } };
  await sleep(500);
  yield { type: "message.delta", runId, data: { messageId: assistantMessageId, delta: "我先理解一下你的任务。" } };
  await sleep(600);
  const toolCallId = crypto.randomUUID();
  yield { type: "tool.started", runId, data: { toolCallId, toolName: "inspect_workspace", input: { query: message } } };
  await sleep(1200);
  yield { type: "tool.completed", runId, data: { toolCallId, output: { files: 1, type: "image" } } };
  await sleep(500);
  yield { type: "message.delta", runId, data: { messageId: assistantMessageId, delta: "\n\nWorkspace 分析完成，我发现当前任务可以生成一个结构化结果。" } };
  await sleep(700);
  yield {
    type: "artifact.created",
    runId,
    data: {
      artifactId: crypto.randomUUID(),
      artifactType: "json",
      title: "analysis.json",
      content: {
        task: message,
        status: "success",
        result: [{ label: "example", confidence: 0.96 }],
      },
    },
  };
  await sleep(500);
  yield { type: "run.completed", runId };
}
