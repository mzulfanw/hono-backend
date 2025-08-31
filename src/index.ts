import configureOpenAPI from "./lib/open-api/index.js";
import { serve } from "@hono/node-server";
import { createApp } from "./lib/router/index.js";
import { showRoutes } from "hono/dev";
import { ALL_ROUTES } from "./routes/index.js";

const app = createApp()

// Setup OpenAPI docs
configureOpenAPI(app);

// Mount all routes
// buildRoute(app);
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
