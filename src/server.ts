// src/server.ts

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import router from "./routes";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Health Check
app.get("/", (req: Request, res: Response) => {
  res.send("Library Management Prisma API is running");
});

app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Library Management Prisma Server is running on port ${PORT}`);
});
