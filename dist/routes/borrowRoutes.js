"use strict";
// src/routes/borrowRoutes.ts
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
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Borrow a book
router.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, memberId } = req.body;
    try {
        const borrowRecord = yield prisma.borrowRecord.create({
            data: { bookId, memberId },
        });
        yield prisma.book.update({
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
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Failed to borrow book" });
    }
}));
// Return a book
router.post("/return", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { borrowId } = req.body;
    try {
        const borrowRecord = yield prisma.borrowRecord.update({
            where: { borrowId },
            data: { returnDate: new Date() },
        });
        yield prisma.book.update({
            where: { bookId: borrowRecord.bookId },
            data: { availableCopies: { increment: 1 } },
        });
        res
            .status(200)
            .json({ success: true, message: "Book returned successfully" });
    }
    catch (error) {
        res.status(400).json({ success: false, message: "Failed to return book" });
    }
}));
exports.default = router;
