"use client";

import { useAgentContext } from "../context/agent-context";

export function ChatPanel() {
  const { state } = useAgentContext();

  return (
    <section className="flex min-h-0 flex-col border-r">
      <header className="border-b px-5 py-4"><h2 className="font-semibold">Chat</h2></header>
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {state.messages.length === 0 && <div className="text-sm text-zinc-400">Ask Agent Honey something.</div>}
        {state.messages.map((message) => (
          <div key={message.id} className={message.role === "user" ? "ml-auto max-w-[85%] rounded-2xl bg-zinc-900 px-4 py-3 text-sm text-white" : "mr-auto max-w-[85%] rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-900"}>
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
