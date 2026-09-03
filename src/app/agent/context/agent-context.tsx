"use client";

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

import {
  agentReducer,
  initialAgentState,
} from "../../../features/agent/store/agent-reducer";

import type { AgentEvent } from "@/src/features/agent/types/event";
import type { AgentState } from "@/src/features/agent/types//state";

interface AgentContextValue {
  state: AgentState;

  dispatch: React.Dispatch<AgentEvent>;
}

const AgentContext =
  createContext<AgentContextValue | null>(null);

interface AgentProviderProps {
  children: ReactNode;
}

export function AgentProvider({
  children,
}: AgentProviderProps) {
  const [state, dispatch] = useReducer(
    agentReducer,
    initialAgentState
  );

  return (
    <AgentContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
}

export function useAgentContext() {
  const context = useContext(AgentContext);

  if (!context) {
    throw new Error(
      "useAgentContext must be used inside AgentProvider"
    );
  }

  return context;
}