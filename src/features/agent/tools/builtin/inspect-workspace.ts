import type { AgentTool } from "../types";

interface InspectWorkspaceInput {
  query: string;
}

interface InspectWorkspaceOutput {
  files: number;
  type: string;
}

export const inspectWorkspaceTool: AgentTool<
  InspectWorkspaceInput,
  InspectWorkspaceOutput
> = {
  name: "inspect_workspace",

  description:
    "Inspect the current workspace and return information about its contents.",

  async execute(input) {
    console.log(
      "inspect_workspace input:",
      input
    );

    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    return {
      files: 1,
      type: "image",
    };
  },
};