// src/routes/borrowRoutes.ts

import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Borrow a book
router.post("/borrow", async (req: Request, res: Response) => {
  const { bookId, memberId } = req.body;
  try {
    const borrowRecord = await prisma.borrowRecord.create({
      data: { bookId, memberId },
    });
    await prisma.book.update({
      where: { bookId },
      data: { availableCopies: { decrement: 1 } },
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Book borrowed successfully",
        data: borrowRecord,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to borrow book" });
  }
});

// Return a book
router.post("/return", async (req: Request, res: Response) => {
  const { borrowId } = req.body;
  try {
    const borrowRecord = await prisma.borrowRecord.update({
      where: { borrowId },
      data: { returnDate: new Date() },
    });
    await prisma.book.update({
      where: { bookId: borrowRecord.bookId },
      data: { availableCopies: { increment: 1 } },
    });
    res
      .status(200)
      .json({ success: true, message: "Book returned successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to return book" });
  }
});

export default router;
