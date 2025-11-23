import dotenv from "dotenv";
import { connectDB, disconnectDB } from "../db";
import LoanPackage from "../models/LoanPackage";
import User from "../models/User";

dotenv.config();

const sampleLoanPackages = [
  {
    name: "Startup Launcher",
    description: "Perfect for new entrepreneurs starting their first business",
    minAmount: 500000,
    maxAmount: 5000000,
    interestRate: 8,
    duration: 12,
    category: "startup",
    features: ["Quick approval", "Flexible repayment", "Business mentoring"],
    requirements: [
      "Valid ID",
      "Business plan",
      "Mobile money transaction history",
    ],
  },
  {
    name: "Business Growth",
    description: "Scale your existing business with competitive rates",
    minAmount: 2000000,
    maxAmount: 20000000,
    interestRate: 6.5,
    duration: 24,
    category: "growth",
    features: [
      "Longer repayment period",
      "Larger loan amounts",
      "Growth planning support",
    ],
    requirements: [
      "Business registration",
      "12 months bank statements",
      "Tax compliance",
    ],
  },
  {
    name: "Emergency Fund",
    description: "Quick cash for unexpected business emergencies",
    minAmount: 100000,
    maxAmount: 2000000,
    interestRate: 10,
    duration: 6,
    category: "emergency",
    features: [
      "Ultra-fast approval (1 hour)",
      "Minimal documentation",
      "Immediate disbursement",
    ],
    requirements: ["Valid ID", "Phone number verification"],
  },
  {
    name: "Education & Skills",
    description: "Invest in your business knowledge and skills",
    minAmount: 300000,
    maxAmount: 3000000,
    interestRate: 5.5,
    duration: 12,
    category: "education",
    features: [
      "Flexible payment",
      "Free course access",
      "Career guidance",
    ],
    requirements: ["Valid ID", "Course enrollment proof (optional)"],
  },
  {
    name: "Entrepreneur Plus",
    description: "Comprehensive support for growing your enterprise",
    minAmount: 1000000,
    maxAmount: 15000000,
    interestRate: 7,
    duration: 18,
    category: "entrepreneur",
    features: [
      "Business advisor",
      "Market research support",
      "Networking events",
    ],
    requirements: ["Business plan", "2 years operation history", "Tax records"],
  },
  {
    name: "Agricultural Boost",
    description: "Grow your agricultural business with farming-focused terms",
    minAmount: 500000,
    maxAmount: 10000000,
    interestRate: 5,
    duration: 24,
    category: "agriculture",
    features: [
      "Seasonal repayment",
      "Farm consultation",
      "Input support",
    ],
    requirements: ["Land ownership proof", "Farming experience", "Business plan"],
  },
  {
    name: "Healthcare Services",
    description: "Support healthcare professionals and medical businesses",
    minAmount: 1000000,
    maxAmount: 25000000,
    interestRate: 6,
    duration: 24,
    category: "healthcare",
    features: [
      "Professional rates",
      "Equipment financing",
      "Compliance support",
    ],
    requirements: [
      "Professional credentials",
      "License verification",
      "Business registration",
    ],
  },
  {
    name: "Housing & Property",
    description: "Invest in property and real estate ventures",
    minAmount: 5000000,
    maxAmount: 100000000,
    interestRate: 7.5,
    duration: 36,
    category: "housing",
    features: [
      "Long-term financing",
      "Property insurance",
      "Flexible terms",
    ],
    requirements: [
      "Property valuation",
      "Land title",
      "Proof of funds for down payment",
    ],
  },
];

const sampleUsers = [
  {
    email: "admin@yef.local",
    password: "admin123", // Will be hashed
    name: "Admin User",
    phone: "+255700000001",
    role: "admin",
  },
  {
    email: "user@yef.local",
    password: "user123", // Will be hashed
    name: "Test User",
    phone: "+255700000002",
    role: "user",
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seed...");
    await connectDB();

    // Clear existing data
    console.log("🗑️  Clearing existing loan packages...");
    await LoanPackage.deleteMany({});

    console.log("🗑️  Clearing existing users...");
    await User.deleteMany({});

    // Seed loan packages
    console.log("📦 Seeding loan packages...");
    const createdPackages = await LoanPackage.insertMany(sampleLoanPackages);
    console.log(`✅ Created ${createdPackages.length} loan packages`);

    // Seed users
    console.log("👤 Seeding users...");
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`✅ Created ${createdUsers.length} users`);
    console.log("\n📋 Created Users:");
    createdUsers.forEach((u) => {
      console.log(`   - Email: ${u.email}, Role: ${u.role}`);
    });

    console.log("\n✨ Database seeding completed successfully!");
    console.log("\n📌 Test Credentials:");
    console.log(`   Admin: admin@yef.local / admin123`);
    console.log(`   User:  user@yef.local / user123`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
}

seedDatabase();
