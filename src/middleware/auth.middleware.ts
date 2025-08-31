import type { Context, Next } from "hono";
import type { JWTPayload } from "../lib/jwt/index.js";
import { verifyAccessToken } from "../lib/jwt/index.js";
import status from "http-status";

declare module "hono" {
  interface ContextVariableMap {
    user: JWTPayload;
  }
}

export async function authMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.json(
      {
        success: false,
        code: status.UNAUTHORIZED,
        message: "Authorization header missing",
      },
      status.UNAUTHORIZED
    );
  }

  // extract token from bearer
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  if (!token) {
    return c.json(
      {
        success: false,
        code: status.UNAUTHORIZED,
        message: "Token missing",
      },
      status.UNAUTHORIZED
    );
  }

  // verify token
  const payload = await verifyAccessToken(token);

  if (!payload) {
    return c.json(
      {
        success: false,
        code: status.UNAUTHORIZED,
        message: "Invalid or expired token",
      },
      status.UNAUTHORIZED
    );
  }

  c.set("user", payload);

  await next();
}
