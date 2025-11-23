import mongoose, { Schema, Document } from "mongoose";

export interface ILoanApplication extends Document {
  userId: string;
  packageId: string;
  amount: number;
  purpose: string;
  businessInfo?: string;
  monthlyIncome: number;
  repaymentMonths: number;
  documents: string[];
  status: string;
  applicationDate: Date;
  approvalDate?: Date;
  disbursalDate?: Date;
}

const LoanApplicationSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    packageId: { type: Schema.Types.ObjectId, ref: "LoanPackage", required: true },
    amount: { type: Number, required: true },
    purpose: { type: String, required: true },
    businessInfo: String,
    monthlyIncome: { type: Number, required: true },
    repaymentMonths: { type: Number, required: true },
    documents: [String],
    status: { type: String, default: "pending" },
    applicationDate: { type: Date, default: Date.now },
    approvalDate: Date,
    disbursalDate: Date
  },
  { timestamps: true }
);

export default mongoose.model<ILoanApplication>("LoanApplication", LoanApplicationSchema);
