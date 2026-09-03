"use client";

import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from "react";
import { agentReducer, initialAgentState } from "../store/agent-reducer";
import type { AgentEvent } from "../types/event";
import type { AgentState } from "../types/state";

interface AgentContextValue { state: AgentState; dispatch: Dispatch<AgentEvent>; }
const AgentContext = createContext<AgentContextValue | null>(null);

export function AgentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(agentReducer, initialAgentState);
  return <AgentContext.Provider value={{ state, dispatch }}>{children}</AgentContext.Provider>;
}

export function useAgentContext() {
  const context = useContext(AgentContext);
  if (!context) throw new Error("useAgentContext must be used inside AgentProvider");
  return context;
}
