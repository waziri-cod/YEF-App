import express from "express";
import LoanApplication from "../models/LoanApplication";
import LoanPackage from "../models/LoanPackage";
import { requireAuth, requireAdmin, AuthRequest } from "../middleware/auth";

const router = express.Router();

// POST /api/loan-applications - submit application (authenticated)
router.post("/", requireAuth, async (req: AuthRequest, res) => {
  try {
    const payload = req.body;
    // attach user id from auth
    if (req.user) payload.applicantId = req.user.id;

    // optional: validate package exists
    if (payload.loanPackage) {
      const pkg = await LoanPackage.findById(payload.loanPackage);
      if (!pkg) return res.status(400).json({ error: "Invalid loan package" });
    }

    const created = await LoanApplication.create(payload);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: "Failed to create application", details: err });
  }
});

// GET /api/loan-applications/:id - get application (auth)
router.get("/:id", requireAuth, async (req: AuthRequest, res) => {
  try {
    const app = await LoanApplication.findById(req.params.id).populate("loanPackage").lean();
    if (!app) return res.status(404).json({ error: "Not found" });

    // allow owner or admin
    if (req.user?.role !== "admin" && req.user?.id !== String(app.applicantId)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch application" });
  }
});

// GET /api/loan-applications/user/:userId - list user's applications (auth)
router.get("/user/:userId", requireAuth, async (req: AuthRequest, res) => {
  try {
    // allow user to see their own apps or admin
    if (req.user?.role !== "admin" && req.user?.id !== req.params.userId) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const apps = await LoanApplication.find({ applicantId: req.params.userId }).populate("loanPackage").lean();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// PATCH /api/loan-applications/:id/status - update status (admin)
router.patch("/:id/status", requireAuth, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { status } = req.body;
    const updated = await LoanApplication.findByIdAndUpdate(req.params.id, { status }, { new: true }).lean();
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Invalid request", details: err });
  }
});

// POST /api/loan-applications/:id/disburse - mark disbursed (admin)
router.post("/:id/disburse", requireAuth, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const updated = await LoanApplication.findByIdAndUpdate(req.params.id, { status: "disbursed", disbursedAt: new Date() }, { new: true }).lean();
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to disburse", details: err });
  }
});

export default router;
