import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { usersTable } from "../../db/schema.js";
import status from "http-status";
import type { AppRouteHandler } from "../../lib/router/index.js";
import type { LoginRoute, RegisterRoute } from "./auth.route.js";
import { compare, genSaltSync, hashSync } from "bcrypt-ts";
import { generateTokenPair } from "../../lib/jwt/index.js";

export const login: AppRouteHandler<LoginRoute> = async (c) => {
  const body = c.req.valid("json");
  const findUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, body.email));
  const user = findUser[0];
  if (!user) {
    return c.json(
      { message: "Unauthorized", code: status.UNAUTHORIZED },
      status.UNAUTHORIZED
    );
  }
  const isValidPassword = await compare(body.password, user.password);
  if (!isValidPassword) {
    return c.json(
      {
        code: status.UNAUTHORIZED,
        message: "Invalid credentials",
      },
      status.UNAUTHORIZED
    );
  }
  const tokens = await generateTokenPair(user.id.toString(), user.email);
  return c.json(
    {
      code: status.OK,
      message: "success",
      data: {
        ...tokens
      }
    },
    status.OK
  );
};

export const register: AppRouteHandler<RegisterRoute> = async (c) => {
  const body = c.req.valid("json");
  const findUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, body.email));
  const user = findUser[0];
  console.log(user)
  if (user) {
    return c.json(
      {
        message: "Email already exist",
        code: status.CONFLICT,
      },
      status.CONFLICT
    );
  }
  const salt = genSaltSync(10);
  const [result] = await db
    .insert(usersTable)
    .values({ ...body, password: hashSync(body.password, salt) })
    .returning({
      name: usersTable.name,
      email: usersTable.password,
    });
  return c.json(
    {
      message: "Successfully created user",
      code: status.CREATED,
      data: { ...result },
    },
    status.CREATED
  );
};
