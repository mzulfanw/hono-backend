import { Scalar } from "@scalar/hono-api-reference";
import type { OpenAPIHono } from "@hono/zod-openapi";

export const openAPIObjectConfig = {
  openapi: "3.1.0",
  externalDocs: {
    description: "Find out more about Boilerplate API",
    url: "www.example.com",
  },
  info: {
    version: "1",
    title: "Users API",
  },
};

export default function configureOpenAPI(app: OpenAPIHono) {
  app.doc31("/doc", openAPIObjectConfig),
    app.get(
      "/ui",
      Scalar({ url: "doc", pageTitle: "Hono Backend Boilerplate" })
    );
}
