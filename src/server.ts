// src/server.ts

import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bookRoutes from "./routes/bookRoutes";
import borrowRoutes from "./routes/borrowRoutes";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Health Check
app.get("/", (req: Request, res: Response) => {
  res.send("Library Management API is running");
});

// Connect book routes
app.use("/api/books", bookRoutes);
// Connect borrow routes
app.use("/api/borrow", borrowRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Library Management Prisma Server is running on port ${PORT}`);
});
