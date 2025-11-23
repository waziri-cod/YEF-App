# 🗄️ MongoDB BACKEND SETUP GUIDE

## Overview

This guide helps you set up a Node.js/Express backend with MongoDB to manage loan packages, applications, and payments.

---

## ⚙️ Prerequisites

- Node.js 16+ installed
- MongoDB Atlas account (free tier available)
- npm or yarn package manager

---

## 📋 Step 1: Create MongoDB Atlas Database

### 1.1 Create Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create new organization and project

### 1.2 Create Cluster
1. Click "Create Deployment"
2. Choose "M0 Sandbox" (free tier)
3. Select cloud provider and region
4. Click "Create Deployment"

### 1.3 Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Drivers" (Node.js)
3. Copy connection string
4. Replace `<password>` with your password
5. Add database name: `/yef-bloom-funds`

**Example**:
```
mongodb+srv://username:password@cluster.mongodb.net/yef-bloom-funds?retryWrites=true&w=majority
```

---

## 🚀 Step 2: Set Up Backend Server

### 2.1 Create Backend Directory
```bash
mkdir yef-bloom-backend
cd yef-bloom-backend
npm init -y
```

### 2.2 Install Dependencies
```bash
npm install express mongodb mongoose cors dotenv axios
npm install -D nodemon typescript ts-node @types/express @types/node
```

### 2.3 Create Project Structure
```
yef-bloom-backend/
├── src/
│   ├── models/
│   │   ├── LoanPackage.ts
│   │   ├── LoanApplication.ts
│   │   └── Payment.ts
│   ├── routes/
│   │   ├── loanPackages.ts
│   │   ├── loanApplications.ts
│   │   ├── payments.ts
│   │   └── stats.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── controllers/
│   │   ├── loanController.ts
│   │   ├── applicationController.ts
│   │   └── paymentController.ts
│   ├── db.ts
│   └── server.ts
├── .env
├── tsconfig.json
└── package.json
```

### 2.4 Create .env File
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/yef-bloom-funds
PORT=3000
NODE_ENV=development
```

### 2.5 Create tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---

## 📝 Step 3: Create MongoDB Models

### 3.1 LoanPackage Model (`src/models/LoanPackage.ts`)
```typescript
import mongoose, { Schema, Document } from "mongoose";

export interface ILoanPackage extends Document {
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  duration: number;
  disbursementDays: number;
  category: string;
  features: string[];
  requirements: string[];
  createdAt: Date;
  updatedAt: Date;
}

const loanPackageSchema = new Schema<ILoanPackage>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    minAmount: { type: Number, required: true },
    maxAmount: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    duration: { type: Number, required: true },
    disbursementDays: { type: Number, required: true },
    category: { type: String, required: true },
    features: [String],
    requirements: [String],
  },
  { timestamps: true }
);

export default mongoose.model<ILoanPackage>("LoanPackage", loanPackageSchema);
```

### 3.2 LoanApplication Model (`src/models/LoanApplication.ts`)
```typescript
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
  status: "pending" | "approved" | "rejected" | "disbursed" | "active" | "completed";
  applicationDate: Date;
  approvalDate?: Date;
  disbursalDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const loanApplicationSchema = new Schema<ILoanApplication>(
  {
    userId: { type: String, required: true },
    packageId: { type: String, required: true },
    amount: { type: Number, required: true },
    purpose: { type: String, required: true },
    businessInfo: String,
    monthlyIncome: { type: Number, required: true },
    repaymentMonths: { type: Number, required: true },
    documents: [String],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "disbursed", "active", "completed"],
      default: "pending",
    },
    applicationDate: { type: Date, default: Date.now },
    approvalDate: Date,
    disbursalDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model<ILoanApplication>("LoanApplication", loanApplicationSchema);
```

### 3.3 Payment Model (`src/models/Payment.ts`)
```typescript
import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  loanId: string;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  status: "pending" | "completed" | "failed";
  transactionId?: string;
  createdAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    loanId: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    paymentMethod: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    transactionId: String,
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>("Payment", paymentSchema);
```

---

## 🔌 Step 4: Create Express Server

### 4.1 Database Connection (`src/db.ts`)
```typescript
import mongoose from "mongoose";

export async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI || "";
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("✅ MongoDB disconnected");
  } catch (error) {
    console.error("❌ MongoDB disconnect failed:", error);
  }
}
```

### 4.2 Server Setup (`src/server.ts`)
```typescript
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";

// Load environment variables
dotenv.config();

// Import routes (will create next)
// import loanPackageRoutes from "./routes/loanPackages";
// import loanApplicationRoutes from "./routes/loanApplications";
// import paymentRoutes from "./routes/payments";
// import statsRoutes from "./routes/stats";

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "✅ Server is running" });
});

// API Routes (uncomment after creating route files)
// app.use("/api/loan-packages", loanPackageRoutes);
// app.use("/api/loan-applications", loanApplicationRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/stats", statsRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

---

## 🛣️ Step 5: Create API Routes

### 5.1 Loan Packages Route (`src/routes/loanPackages.ts`)
```typescript
import { Router, Request, Response } from "express";
import LoanPackage from "../models/LoanPackage";

const router = Router();

// Get all loan packages
router.get("/", async (req: Request, res: Response) => {
  try {
    const packages = await LoanPackage.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch packages" });
  }
});

// Get by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const pkg = await LoanPackage.findById(req.params.id);
    if (!pkg) return res.status(404).json({ error: "Package not found" });
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch package" });
  }
});

// Create package (admin)
router.post("/", async (req: Request, res: Response) => {
  try {
    const pkg = new LoanPackage(req.body);
    await pkg.save();
    res.status(201).json(pkg);
  } catch (error) {
    res.status(400).json({ error: "Failed to create package" });
  }
});

// Update package
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const pkg = await LoanPackage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(pkg);
  } catch (error) {
    res.status(400).json({ error: "Failed to update package" });
  }
});

// Delete package
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await LoanPackage.findByIdAndDelete(req.params.id);
    res.json({ message: "Package deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete package" });
  }
});

export default router;
```

---

## 🗄️ Step 6: Seed Initial Loan Packages

### Create `src/scripts/seedData.ts`
```typescript
import mongoose from "mongoose";
import dotenv from "dotenv";
import LoanPackage from "../models/LoanPackage";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");

    // Clear existing packages
    await LoanPackage.deleteMany({});

    // Create loan packages
    const packages = [
      {
        name: "Education Loan",
        description: "For school tuition and educational expenses",
        minAmount: 500000,
        maxAmount: 5000000,
        interestRate: 7,
        duration: 48,
        disbursementDays: 5,
        category: "education",
        features: ["Grace period", "Flexible repayment", "Educational verification"],
        requirements: ["ID", "School enrollment", "Income verification"],
      },
      {
        name: "Entrepreneur Loan",
        description: "For business startup and growth",
        minAmount: 1000000,
        maxAmount: 10000000,
        interestRate: 9,
        duration: 36,
        disbursementDays: 7,
        category: "entrepreneur",
        features: ["Business mentoring", "Check-ins", "Growth support"],
        requirements: ["Business plan", "Financial statements", "Collateral"],
      },
      // Add more packages...
    ];

    await LoanPackage.insertMany(packages);
    console.log("✅ Seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
};

seedData();
```

**Run seed**:
```bash
npx ts-node src/scripts/seedData.ts
```

---

## 🔧 Step 7: Update package.json

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "seed": "ts-node src/scripts/seedData.ts"
  }
}
```

---

## 🚀 Step 8: Run Backend Server

```bash
# Development
npm run dev

# Output should show:
# ✅ MongoDB connected
# 🚀 Server running on port 3000
```

---

## 📱 Step 9: Update Frontend Environment

Create `.env.local` in your frontend project:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/yef-bloom-funds
```

---

## ✅ Deployment

### Deploy Backend to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create yef-bloom-backend

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://...

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

---

## 📋 API Endpoints

```
GET  /api/loan-packages              - Get all packages
GET  /api/loan-packages/:id          - Get package by ID
POST /api/loan-packages              - Create package (admin)
PUT  /api/loan-packages/:id          - Update package (admin)
DELETE /api/loan-packages/:id        - Delete package (admin)

GET  /api/loan-applications          - Get all applications
POST /api/loan-applications          - Create application
GET  /api/loan-applications/:id      - Get application by ID
PATCH /api/loan-applications/:id     - Update application

GET  /api/payments                   - Get all payments
POST /api/payments                   - Record payment
GET  /api/payments/loan/:loanId      - Get loan payment history

GET  /api/stats/dashboard            - Get dashboard statistics
```

---

## 🎯 Next Steps

1. Set up MongoDB Atlas account
2. Get connection string
3. Create backend directory
4. Copy code from this guide
5. Run `npm run dev`
6. Test API endpoints with Postman
7. Update frontend to use MongoDB service
8. Deploy both frontend and backend

---

**Your MongoDB backend is ready!** 🚀
