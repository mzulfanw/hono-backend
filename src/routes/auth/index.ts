import { createRouter } from "../../lib/router/index.js";
import * as controller from "./auth.handlers.js";
import * as route from "./auth.route.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const protectedRoute = ["/auth/register"];

const router = createRouter()


protectedRoute.forEach(path => {
  router.use(path, authMiddleware)
})

router.openapi(route.login, controller.login);
router.openapi(route.register, controller.register);

export default router;
