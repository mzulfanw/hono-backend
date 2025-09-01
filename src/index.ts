import configureOpenAPI from "./lib/open-api/index.js";
import { serve } from "@hono/node-server";
import { createApp } from "./lib/router/index.js";
import { showRoutes } from "hono/dev";
import { ALL_ROUTES } from "./routes/index.js";
import { customLogger } from "./middleware/logger.middleware.js";

const app = createApp()

// Setup OpenAPI docs
configureOpenAPI(app);

// Logger
app.use('*', async (c, next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;
  console.log({ c })
  customLogger(`HTTP ${c.req.method} ${c.req.path}`, {
    status: c.res.status,
    duration: `${duration}ms`,
  });
})


// Mount all routes
ALL_ROUTES.forEach(route => {
  app.route("/", route)
})

// show routes
showRoutes(app)

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
