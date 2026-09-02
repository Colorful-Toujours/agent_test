"use client";

import { useReducer, useState } from "react";
import { mockAgent } from "@/src/app/agent/mock/mock-agent";

import {
  agentReducer,
  initialAgentState,
} from "@/src/features/agent/store/agent-reducer";
const assistantMessageId = "assistant-demo";
export default function AgentPage() {
  const [input, setInput] = useState("");
  const [state, dispatch] = useReducer(agentReducer, initialAgentState);

  function handleStart() {
    dispatch({
      type: "run.started",
      runId: crypto.randomUUID(),
    });
  }

  function handleToolStart() {
    if (!state.runId) return;

    dispatch({
      type: "tool.started",
      runId: state.runId,
      data: {
        toolCallId: crypto.randomUUID(),
        toolName: "inspect_image",
        input: {
          image: "demo.png",
        },
      },
    });
  }
  function handleToolComplete() {
    const runningTool = state.toolCalls.find(
      (tool) => tool.status === "running",
    );

    if (!runningTool || !state.runId) return;

    dispatch({
      type: "tool.completed",
      runId: state.runId,
      data: {
        toolCallId: runningTool.id,
        output: {
          width: 1440,
          height: 900,
          objects: 3,
        },
      },
    });
  }
  function handleMessageDelta() {
    if (!state.runId) return;

    dispatch({
      type: "message.delta",
      runId: state.runId,
      data: {
        messageId: assistantMessageId,
        delta: "我正在分析你的图片。 ",
      },
    });
  }
  async function handleRunAgent() {
    // for await (const event of mockAgent()) {
    //   dispatch(event);
    // }
    const message = input.trim();

    if (!message) return;

    for await (const event of mockAgent(message)) {
      dispatch(event);
    }
  }
  return (
    <main className="p-10">
      <div className="max-w-md space-y-6 rounded-xl border p-6">
        <div>
          当前状态：
          <strong className="ml-2">{state.status}</strong>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleStart}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            启动 Agent
          </button>

          <button
            onClick={handleToolStart}
            disabled={!state.runId}
            className="rounded-lg bg-zinc-700 px-4 py-2 text-white disabled:opacity-40"
          >
            模拟调用工具
          </button>
          <button
            onClick={handleToolComplete}
            disabled={
              !state.toolCalls.some((tool) => tool.status === "running")
            }
            className="rounded-lg bg-green-600 px-4 py-2 text-white disabled:opacity-40"
          >
            模拟工具完成
          </button>
          <button
            onClick={handleMessageDelta}
            disabled={!state.runId}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-40"
          >
            模拟消息流
          </button>
          <button
            onClick={handleRunAgent}
            disabled={state.status === "running"}
            className="rounded-lg bg-purple-600 px-4 py-2 text-white disabled:opacity-40"
          >
            自动运行 Agent
          </button>
        </div>

        <div className="space-y-2">
          <div className="font-medium">工具：</div>

          {state.toolCalls.length === 0 ? (
            <div className="text-sm text-zinc-400">暂无工具调用</div>
          ) : (
            state.toolCalls.map((tool) => (
              <div key={tool.id} className="rounded-lg border p-3">
                <div>{tool.name}</div>

                <div className="text-sm text-zinc-500">{tool.status}</div>
                {/* 👇 新增加的就是这一块 */}
                {tool.output !== undefined && (
                  <pre className="mt-3 rounded-lg bg-zinc-100 p-3 text-xs">
                    {JSON.stringify(tool.output, null, 2)}
                  </pre>
                )}
              </div>
            ))
          )}
        </div>
        <div className="space-y-2">
          <div className="font-medium">消息：</div>

          {state.messages.length === 0 ? (
            <div className="text-sm text-zinc-400">暂无消息</div>
          ) : (
            state.messages.map((message) => (
              <div
                key={message.id}
                className="rounded-lg bg-zinc-100 p-3 text-sm"
              >
                {message.content}
              </div>
            ))
          )}
        </div>
        <div className="font-medium">输入任务：</div>

        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="例如：分析这张图片"
          className="min-h-24 w-full rounded-lg border p-3 outline-none"
        />
      </div>
    </main>
  );
}
