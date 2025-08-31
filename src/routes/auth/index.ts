import { createRouter } from "../../lib/router/index.js";
import * as controller from "./auth.handlers.js";
import * as route from "./auth.route.js";

const router = createRouter().openapi(route.login, controller.login);

export default router