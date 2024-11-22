import { Router } from "express";

import { bookRoutes } from "./bookRoutes";
import { borrowRoutes } from "./borrowRoutes";

const router = Router();

const moduleRoutes = [
  {
    path: "/books",
    route: bookRoutes,
  },
  {
    path: "/borrow",
    route: borrowRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;