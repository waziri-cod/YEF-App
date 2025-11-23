import express from "express";
import LoanPackage from "../models/LoanPackage";
import LoanApplication from "../models/LoanApplication";
import Payment from "../models/Payment";
import { requireAuth, requireAdmin } from "../middleware/auth";

const router = express.Router();

// GET /api/stats/overview - admin-only dashboard numbers
router.get("/overview", requireAuth, requireAdmin, async (req, res) => {
  try {
    const totalPackages = await LoanPackage.countDocuments();
    const totalApplications = await LoanApplication.countDocuments();
    const totalDisbursed = await LoanApplication.countDocuments({ status: "disbursed" });
    const totalPayments = await Payment.countDocuments();

    const totalLoaned = await LoanApplication.aggregate([
      { $match: { status: "disbursed" } },
      { $group: { _id: null, sum: { $sum: "$amount" } } },
    ]);

    res.json({
      totalPackages,
      totalApplications,
      totalDisbursed,
      totalPayments,
      totalLoaned: totalLoaned[0]?.sum || 0,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to compute stats" });
  }
});

export default router;
