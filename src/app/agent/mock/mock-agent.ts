import type { AgentEvent } from "@/src/features/agent/types/event";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function* mockAgent(message: string): AsyncGenerator<AgentEvent> {
  const runId = crypto.randomUUID();
  const messageId = crypto.randomUUID();
  const toolCallId = crypto.randomUUID();

  yield {
    type: "run.started",
    runId,
  };

  await sleep(500);

  yield {
    type: "message.delta",
    runId,
    data: {
      messageId,
      delta: "我",
    },
  };

  await sleep(300);

  yield {
    type: "message.delta",
    runId,
    data: {
      messageId,
      delta: "正在",
    },
  };

  await sleep(300);

  yield {
    type: "message.delta",
    runId,
    data: {
      messageId,
      delta: "分析",
    },
  };

  await sleep(300);

  yield {
    type: "message.delta",
    runId,
    data: {
      messageId,
      delta: "你的图片。",
    },
  };

  await sleep(500);

  yield {
    type: "tool.started",
    runId,
    data: {
      toolCallId,
      toolName: "inspect_image",
      input: {
        // image: "demo.png",
        prompt: message,
      },
    },
  };

  await sleep(1200);

  yield {
    type: "tool.completed",
    runId,
    data: {
      toolCallId,
      output: {
        width: 1440,
        height: 900,
        objects: 3,
      },
    },
  };

  await sleep(500);

  yield {
    type: "message.delta",
    runId,
    data: {
      messageId,
      //   delta: "\n分析完成，共发现 3 个目标。",
      delta: `\n你的任务是：${message}`,
    },
  };

  await sleep(500);

  yield {
    type: "run.completed",
    runId,
  };
}
