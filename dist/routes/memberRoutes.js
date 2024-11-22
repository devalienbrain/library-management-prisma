"use strict";
// src/routes/memberRoutes.ts
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
exports.memberRoutes = void 0;
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Create a new member
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, address } = req.body;
        const newMember = yield prisma.member.create({
            data: { name, email, phone, address },
        });
        res.status(201).json({
            success: true,
            message: "Member created successfully",
            data: newMember,
        });
    }
    catch (error) {
        res
            .status(400)
            .json({ success: false, message: "Failed to create member" });
    }
}));
// Get all members
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const members = yield prisma.member.findMany();
        res.status(200).json({
            success: true,
            message: "Members retrieved successfully",
            data: members,
        });
    }
    catch (error) {
        res
            .status(400)
            .json({ success: false, message: "Failed to retrieve members" });
    }
}));
// Get a member by ID
router.get("/:memberId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId } = req.params;
    try {
        const member = yield prisma.member.findUnique({ where: { memberId } });
        member
            ? res.status(200).json({
                success: true,
                message: "Member retrieved successfully",
                data: member,
            })
            : res.status(404).json({ success: false, message: "Member not found" });
    }
    catch (error) {
        res
            .status(400)
            .json({ success: false, message: "Failed to retrieve member" });
    }
}));
// Update a member by ID
router.put("/:memberId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId } = req.params;
    const { name, email, phone, address } = req.body;
    try {
        const updatedMember = yield prisma.member.update({
            where: { memberId },
            data: { name, email, phone, address },
        });
        res.status(200).json({
            success: true,
            message: "Member updated successfully",
            data: updatedMember,
        });
    }
    catch (error) {
        res
            .status(400)
            .json({ success: false, message: "Failed to update member" });
    }
}));
// Delete a member by ID
router.delete("/:memberId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId } = req.params;
    try {
        yield prisma.member.delete({ where: { memberId } });
        res
            .status(200)
            .json({ success: true, message: "Member deleted successfully" });
    }
    catch (error) {
        res
            .status(400)
            .json({ success: false, message: "Failed to delete member" });
    }
}));
exports.memberRoutes = router;
