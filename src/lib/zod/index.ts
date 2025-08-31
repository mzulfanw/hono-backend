import { z } from "@hono/zod-openapi";

export const idParamsSchema = z.object({
  id: z.string().min(3),
});

export function createMessageObjectSchema(message: string, code: number = 200) {
  return z.object({
    message: z.string().describe("Human readable message").default(message),
    code: z.number().optional().describe("Optional code for message type").default(code),
  });
}

export const createMessageResponseSchema = (
  exampleMessage: string = "Operation completed successfully"
) => {
  return z.object({
    message: z.string().describe("Human readable message"),
    code: z.string().optional().describe("Optional code for message type"),
  });
};


export function createErrorSchema<T extends z.ZodTypeAny>(schema: T) {
  const result = schema.safeParse({});
  const issues = !result.success ? result.error.issues : [];
  return z.object({
    success: z.boolean(),
    code: z.number(),
    message: z.string(),
    error: z.object({
      name: z.string().default("ZodError"),
      issues: z.array(
        z.object({
          code: z.string(),
          path: z.array(z.union([z.string(), z.number()])),
          message: z.string(),
        })
      )
    }),
  });
}
