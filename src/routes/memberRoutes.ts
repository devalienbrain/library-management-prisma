// src/routes/memberRoutes.ts

import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Create a new member
router.post("/", async (req: Request, res: Response) => {
    try {
      const { name, email, phone, address, membershipDate } = req.body;
  
      // Use the provided membershipDate or default to the current date
      const newMember = await prisma.member.create({
        data: {
          name,
          email,
          phone,
          address,
          membershipDate: membershipDate || new Date(),
        },
      });
  
      res.status(201).json({
        success: true,
        message: "Member created successfully",
        data: newMember,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
  
      res.status(400).json({
        success: false,
        message: "Failed to create member",
        error: errorMessage,
      });
    }
  });
  

// Get all members
router.get("/", async (req: Request, res: Response) => {
  try {
    const members = await prisma.member.findMany();
    res.status(200).json({
      success: true,
      message: "Members retrieved successfully",
      data: members,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to retrieve members" });
  }
});

// Get a member by ID
router.get("/:memberId", async (req: Request, res: Response) => {
  const { memberId } = req.params;
  try {
    const member = await prisma.member.findUnique({ where: { memberId } });
    member
      ? res.status(200).json({
          success: true,
          message: "Member retrieved successfully",
          data: member,
        })
      : res.status(404).json({ success: false, message: "Member not found" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to retrieve member" });
  }
});

// Update a member by ID
router.put("/:memberId", async (req: Request, res: Response) => {
  const { memberId } = req.params;
  const { name, email, phone, address } = req.body;
  try {
    const updatedMember = await prisma.member.update({
      where: { memberId },
      data: { name, email, phone, address },
    });

    res.status(200).json({
      success: true,
      message: "Member updated successfully",
      data: updatedMember,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to update member" });
  }
});

// Delete a member by ID
router.delete("/:memberId", async (req: Request, res: Response) => {
  const { memberId } = req.params;
  try {
    await prisma.member.delete({ where: { memberId } });
    res
      .status(200)
      .json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Failed to delete member" });
  }
});

export const memberRoutes = router;
