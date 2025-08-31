import { createRoute, z } from "@hono/zod-openapi";
import {
  AuthRegistRequestSchema,
  AuthRegistResponseSchema,
  AuthRequestSchema,
  AuthResponseSchema,
} from "./auth.schema.js";
import status from "http-status";
import {
  createErrorSchema,
  createMessageObjectSchema,
  createResponseSchema,
} from "../../lib/zod/index.js";

const TAGS = ["AUTH"];
const BASEPATH = "/auth";

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
          schema: createResponseSchema(AuthResponseSchema),
        },
      },
      description: "Successfully logged in",
    },
    [status.UNAUTHORIZED]: {
      content: {
        "application/json": {
          schema: createMessageObjectSchema("Unauthorized"),
        },
      },
      description: "Unauthorized",
    },
    [status.BAD_REQUEST]: {
      content: {
        "application/json": {
          schema: createErrorSchema(AuthRequestSchema),
        },
      },
      description: "Validation errors",
    },
  },
});

export const register = createRoute({
  path: `${BASEPATH}/register`,
  method: "post",
  tags: TAGS,
  request: {
    body: {
      content: {
        "application/json": {
          schema: AuthRegistRequestSchema,
        },
      },
      description: "Authentication Register",
      required: true,
    },
  },
  responses: {
    [status.CREATED]: {
      content: {
        "application/json": {
          schema: createResponseSchema(AuthRegistResponseSchema),
        },
      },
      description: "Successfully created user",
    },
    [status.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: createErrorSchema(AuthRequestSchema),
        },
      },
      description: "Validation errors",
    },
    [status.CONFLICT]: {
      content: {
        "application/json": {
          schema: createMessageObjectSchema("Email already exist")
        }
      },
      description: "Email already exist"
    }
  },
});

export type LoginRoute = typeof login;
export type RegisterRoute = typeof register;
