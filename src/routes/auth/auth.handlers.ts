import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { usersTable } from "../../db/schema.js";
import status from "http-status";
import type { AppRouteHandler } from "../../lib/router/index.js";
import type { LoginRoute } from "./auth.route.js";

export const login: AppRouteHandler<LoginRoute> = async (c) => {
  const body = c.req.valid("json");
  const findUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, body.email));
  if (findUser.length === 0) {
    return c.json(
      { message: "Unauthorized", code: status.UNAUTHORIZED },
      status.UNAUTHORIZED
    );
  }
  return c.json(
    { access_token: "ok", refresh_token: "ok", message: "success" },
    status.OK
  );
};
