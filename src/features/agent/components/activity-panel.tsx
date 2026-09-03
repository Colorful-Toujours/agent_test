"use client";

import { useAgentContext } from "../context/agent-context";

export function ActivityPanel() {
  const { state } = useAgentContext();
  return (
    <aside className="min-h-0 overflow-y-auto border-l">
      <header className="border-b px-5 py-4"><h2 className="font-semibold">Activity</h2><p className="mt-1 text-xs text-zinc-500">{state.status}</p></header>
      <div className="space-y-3 p-4">
        {state.toolCalls.length === 0 && <div className="text-sm text-zinc-400">No activity yet.</div>}
        {state.toolCalls.map((tool) => (
          <div key={tool.id} className="rounded-xl border p-3">
            <div className="flex items-center justify-between gap-4"><span className="text-sm font-medium">{tool.name}</span><span className="text-xs text-zinc-500">{tool.status}</span></div>
            {tool.input !== undefined && <pre className="mt-3 overflow-x-auto rounded-lg bg-zinc-100 p-2 text-xs">{JSON.stringify(tool.input, null, 2)}</pre>}
            {tool.output !== undefined && <pre className="mt-2 overflow-x-auto rounded-lg bg-zinc-100 p-2 text-xs">{JSON.stringify(tool.output, null, 2)}</pre>}
          </div>
        ))}
      </div>
    </aside>
  );
}
