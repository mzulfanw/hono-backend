import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { OpenAPIHono } from "@hono/zod-openapi";
import type { Context } from "hono";
import status from "http-status";

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R>;

export const defaultValidationHook = (result: any, c: Context) => {
  if (!result.success) {
    return c.json({
      success: false,
      code: status.UNPROCESSABLE_ENTITY,
      message: "Validation failed",
      error: {
        name: "ZodError",
        issues: result.error.issues.map((issue: any) => ({
          code: issue.code,
          path: issue.path,
          message: issue.message
        }))
      }
    }, status.UNPROCESSABLE_ENTITY);
  }
};

export const createRouter = () => new OpenAPIHono({ strict: false, defaultHook: defaultValidationHook })

export const createApp = () => {
  const app = createRouter().basePath("/api")

  return app
}