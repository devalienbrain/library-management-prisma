// src/routes/bookRoutes.ts

import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Create a new book
router.post("/create", async (req: Request, res: Response) => {
  try {
    const { title, genre, publishedYear, totalCopies, availableCopies } =
      req.body;
    const newBook = await prisma.book.create({
      data: { title, genre, publishedYear, totalCopies, availableCopies },
    });
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to create book" });
  }
});

// Get all books
router.get("/", async (req: Request, res: Response) => {
  const books = await prisma.book.findMany();
  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});

// Get a book by ID
router.get("/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const book = await prisma.book.findUnique({ where: { bookId } });
  book
    ? res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      })
    : res.status(404).json({ success: false, message: "Book not found" });
});

// Update a book by ID
router.put("/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const { title, genre, publishedYear, totalCopies, availableCopies } =
    req.body;
  try {
    const updatedBook = await prisma.book.update({
      where: { bookId },
      data: { title, genre, publishedYear, totalCopies, availableCopies },
    });
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to update book" });
  }
});

// Delete a book by ID
router.delete("/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  try {
    await prisma.book.delete({ where: { bookId } });
    res
      .status(200)
      .json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Failed to delete book" });
  }
});

export const bookRoutes = router;
