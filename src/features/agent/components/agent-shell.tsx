import { ActivityPanel } from "./activity-panel";
import { ChatPanel } from "./chat-panel";
import { Composer } from "./composer";
import { WorkspacePanel } from "./workspace-panel";

export function AgentShell() {
  return (
    <div className="grid h-dvh min-w-[960px] grid-rows-[1fr_auto] bg-white">
      <div className="grid min-h-0 grid-cols-[320px_1fr_320px]">
        <ChatPanel />
        <WorkspacePanel />
        <ActivityPanel />
      </div>
      <Composer />
    </div>
  );
}
