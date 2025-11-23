import express from "express";
import LoanPackage from "../models/LoanPackage";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = express.Router();

// GET /api/loan-packages - list all packages
router.get("/", async (req, res) => {
  try {
    const packs = await LoanPackage.find().sort({ category: 1, name: 1 }).lean();
    res.json(packs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch loan packages" });
  }
});

// GET /api/loan-packages/:id
router.get("/:id", async (req, res) => {
  try {
    const pack = await LoanPackage.findById(req.params.id).lean();
    if (!pack) return res.status(404).json({ error: "Not found" });
    res.json(pack);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch loan package" });
  }
});

// POST /api/loan-packages - create (admin)
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const created = await LoanPackage.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: "Invalid data", details: err });
  }
});

// PUT /api/loan-packages/:id - update (admin)
router.put("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const updated = await LoanPackage.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Invalid data", details: err });
  }
});

// DELETE /api/loan-packages/:id - delete (admin)
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const removed = await LoanPackage.findByIdAndDelete(req.params.id).lean();
    if (!removed) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

export default router;
