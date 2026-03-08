import express from "express";
import Payment from "../models/Payment";
import LoanApplication from "../models/LoanApplication";
import { requireAuth, requireAdmin, AuthRequest } from "../middleware/auth";

const router = express.Router();

// POST /api/payments - create a payment (authenticated)
router.post("/", requireAuth, async (req: AuthRequest, res) => {
  try {
    const payload = req.body;
    if (req.user) payload.payerId = req.user.id;

    // optional: validate application exists
    if (payload.loanApplication) {
      const app = await LoanApplication.findById(payload.loanApplication);
      if (!app) return res.status(400).json({ error: "Invalid loan application" });
    }

    const created = await Payment.create(payload);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: "Failed to create payment", details: err });
  }
});

// GET /api/payments/loan/:loanAppId - list payments for a loan application (auth)
router.get("/loan/:loanAppId", requireAuth, async (req: AuthRequest, res) => {
  try {
    const payments = await Payment.find({ loanApplication: req.params.loanAppId }).lean();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

// GET /api/payments/:id - get payment by id (auth)
router.get("/:id", requireAuth, async (req: AuthRequest, res) => {
  try {
    const p = await Payment.findById(req.params.id).lean();
    if (!p) return res.status(404).json({ error: "Not found" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payment" });
  }
});

export default router;
