import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
export function readmeAction() {
  // For more information on how to define custom actions, see
  //   https://backstage.io/docs/features/software-templates/writing-custom-actions

  return createTemplateAction({
    id: 'docs:readme',
    description: 'Action para normalizar informações de README',
    schema: {
      input: {
        projectName: z =>
          z.string({
            description:
              "Nome do projeto/repositório, usado para criar o README.md. Exemplo: 'my-awesome-project'",
          }),
        projectStack: z =>
          z
            .string({ description: "Stack do projeto" })
            .trim()
            .refine(v => ['Node.js', 'Python', 'Java', 'Rails', 'Go', '.net'].includes(v), {
              message: "projectStack precisa ser um de: Node.js, Python, Java, Rails, Go",
            }),
      },
    },
    async handler(ctx) {
      ctx.logger.info(
        `Running example template with parameters: ${ctx.input.projectName}`,
      );

      if (ctx.input.projectName === 'xpto') {
        throw new Error(`projectName cannot be 'xpto'`);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      ctx.output("name", ctx.input.projectName.toLowerCase());
      ctx.output("stack", ctx.input.projectStack);
    },
  });
}
