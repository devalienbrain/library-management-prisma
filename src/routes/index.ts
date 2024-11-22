import { Router } from "express";

import { bookRoutes } from "./bookRoutes";
import { borrowRoutes } from "./borrowRoutes";
import { memberRoutes } from "./memberRoutes";

const router = Router();

const moduleRoutes = [
  {
    path: "/books",
    route: bookRoutes,
  },
  {
    path: "/members",
    route: memberRoutes,
  },
  {
    path: "/",
    route: borrowRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
