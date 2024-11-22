"use strict";
// src/routes/bookRoutes.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Create a new book
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, genre, publishedYear, totalCopies, availableCopies } = req.body;
        const newBook = yield prisma.book.create({
            data: { title, genre, publishedYear, totalCopies, availableCopies },
        });
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: newBook,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Failed to create book" });
    }
}));
// Get all books
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield prisma.book.findMany();
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
    });
}));
// Get a book by ID
router.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const book = yield prisma.book.findUnique({ where: { bookId } });
    book
        ? res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        })
        : res.status(404).json({ success: false, message: "Book not found" });
}));
// Update a book by ID
router.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const { title, genre, publishedYear, totalCopies, availableCopies } = req.body;
    try {
        const updatedBook = yield prisma.book.update({
            where: { bookId },
            data: { title, genre, publishedYear, totalCopies, availableCopies },
        });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook,
        });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Failed to update book" });
    }
}));
// Delete a book by ID
router.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    try {
        yield prisma.book.delete({ where: { bookId } });
        res
            .status(200)
            .json({ success: true, message: "Book deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Failed to delete book" });
    }
}));
exports.bookRoutes = router;
