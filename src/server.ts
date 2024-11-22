// src/server.ts

import express, { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import httpStatus from "http-status"

import router from "./routes";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Health Check
app.get("/", (req: Request, res: Response) => {
  res.send("Library Management Prisma API is running");
});

app.use("/api", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Library Management Prisma Server is running on port ${PORT}`);
});
