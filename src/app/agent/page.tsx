import { AgentShell } from "@/src/features/agent/components/agent-shell";
import { AgentProvider } from "@/src/features/agent/context/agent-context";

export default function AgentPage() {
  return <AgentProvider><AgentShell /></AgentProvider>;
}
