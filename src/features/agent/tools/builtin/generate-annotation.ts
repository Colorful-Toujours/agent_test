import type { AgentTool } from "../types";

interface GenerateAnnotationInput {
  target: string;
}

interface GenerateAnnotationOutput {
  annotations: number;
}

export const generateAnnotationTool: AgentTool<
  GenerateAnnotationInput,
  GenerateAnnotationOutput
> = {
  name: "generate_annotation",

  description:
    "Generate annotations for the current workspace.",

  async execute(input) {
    console.log(
      "generate_annotation input:",
      input
    );

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    return {
      annotations: 3,
    };
  },
};