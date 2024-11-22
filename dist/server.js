"use strict";
// src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
// Health Check
app.get("/", (req, res) => {
    res.send("Library Management Prisma API is running");
});
app.use("/api", routes_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Library Management Prisma Server is running on port ${PORT}`);
});
