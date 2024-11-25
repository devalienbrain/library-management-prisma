"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookRoutes_1 = require("./bookRoutes");
const borrowRoutes_1 = require("./borrowRoutes");
const memberRoutes_1 = require("./memberRoutes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/books",
        route: bookRoutes_1.bookRoutes,
    },
    {
        path: "/members",
        route: memberRoutes_1.memberRoutes,
    },
    {
        path: "/",
        route: borrowRoutes_1.borrowRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
