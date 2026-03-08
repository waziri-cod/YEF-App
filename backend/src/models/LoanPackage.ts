import mongoose, { Schema, Document } from "mongoose";

export interface ILoanPackage extends Document {
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  duration: number; // months
  disbursementDays?: number;
  category: string;
  features: string[];
  requirements: string[];
}

const LoanPackageSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    minAmount: { type: Number, required: true },
    maxAmount: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    duration: { type: Number, required: true },
    disbursementDays: { type: Number, default: 7 },
    category: { type: String, required: true },
    features: [String],
    requirements: [String]
  },
  { timestamps: true }
);

export default mongoose.model<ILoanPackage>("LoanPackage", LoanPackageSchema);
