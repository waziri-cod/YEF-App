import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";

import authRouter from "./routes/auth";
import loanPackagesRouter from "./routes/loanPackages";
import loanApplicationsRouter from "./routes/loanApplications";
import paymentsRouter from "./routes/payments";
import statsRouter from "./routes/stats";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/auth", authRouter);
app.use("/api/loan-packages", loanPackagesRouter);
app.use("/api/loan-applications", loanApplicationsRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api/stats", statsRouter);

const PORT = process.env.PORT || 5050;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Failed to start server", err);
    process.exit(1);
  });

export default app;
