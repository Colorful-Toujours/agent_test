export interface AgentTool<
  TInput = unknown,
  TOutput = unknown
> {
  name: string;

  description: string;

  execute: (
    input: TInput
  ) => Promise<TOutput>;
}