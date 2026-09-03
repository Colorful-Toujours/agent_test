"use client";

import { useAgentContext } from "../context/agent-context";

export function WorkspacePanel() {
  const { state } = useAgentContext();
  const artifact = state.artifacts.at(-1);
  return (
    <main className="min-h-0 overflow-auto bg-zinc-50 p-6">
      {!artifact ? (
        <div className="flex h-full items-center justify-center rounded-2xl border border-dashed bg-white text-sm text-zinc-400">Artifacts will appear here.</div>
      ) : (
        <div className="mx-auto max-w-4xl rounded-2xl border bg-white">
          <div className="border-b px-5 py-4"><h2 className="font-medium">{artifact.title}</h2><div className="mt-1 text-xs text-zinc-500">{artifact.type}</div></div>
          <pre className="overflow-auto p-5 text-sm">{typeof artifact.content === "string" ? artifact.content : JSON.stringify(artifact.content, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
