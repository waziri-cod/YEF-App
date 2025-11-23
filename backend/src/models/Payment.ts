import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  loanId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  status: string;
  transactionId?: string;
}

const PaymentSchema: Schema = new Schema(
  {
    loanId: { type: Schema.Types.ObjectId, ref: "LoanApplication", required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    transactionId: String
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>("Payment", PaymentSchema);
