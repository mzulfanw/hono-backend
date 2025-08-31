import { createRoute, z } from "@hono/zod-openapi";
import { AuthRequestSchema, AuthResponseSchema } from "./auth.schema.js";
import status from "http-status";
import { createErrorSchema, createMessageObjectSchema } from "../../lib/zod/index.js";

const TAGS = ["AUTH"]
const BASEPATH = "/auth"

export const login = createRoute({
  path: `${BASEPATH}/login`,
  method: "post",
  tags: TAGS,
  request: {
    body: {
      content: {
        "application/json": {
          schema: AuthRequestSchema,
        },
      },
      description: "Authentication Login",
      required: true,
    },
  },
  responses: {
    [status.OK]: {
      content: {
        "application/json": {
          schema: AuthResponseSchema,
        },
      },
      description: "Successfully logged in",
    },
    [status.UNAUTHORIZED]: {
      content: {
        "application/json": {
          schema: createMessageObjectSchema("Unauthorized")
        }
      },
      description: "Unauthorized"
    },
    [status.BAD_REQUEST]: {
      content: {
        "application/json": {
          schema: createErrorSchema(AuthRequestSchema)
        }
      },
      description: "Validation errors"
    }
  },
});

export type LoginRoute = typeof login