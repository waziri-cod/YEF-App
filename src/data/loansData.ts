export interface Loan {
  id: string;
  name: string;
  maxAmount: number;
  minAmount: number;
  interestRate: number;
  duration: string;
  description: string;
  requirements: string[];
  features: string[];
  category: "startup" | "growth" | "emergency";
}

export const loans: Loan[] = [
  {
    id: "1",
    name: "Startup Boost",
    maxAmount: 2000000,
    minAmount: 500000,
    interestRate: 8,
    duration: "6-12 months",
    description: "Perfect for launching your first business venture. Get the capital you need to start strong.",
    requirements: [
      "Age 18-35 years",
      "Valid national ID",
      "Business plan or idea",
      "Mobile money transaction history (3+ months)",
    ],
    features: [
      "No collateral required",
      "Flexible repayment schedule",
      "Business mentorship included",
      "Free financial literacy course",
    ],
    category: "startup",
  },
  {
    id: "2",
    name: "Growth Accelerator",
    maxAmount: 5000000,
    minAmount: 2000000,
    interestRate: 10,
    duration: "12-24 months",
    description: "Scale your existing business to the next level with substantial capital and expert guidance.",
    requirements: [
      "Age 18-35 years",
      "Valid national ID",
      "Active business (6+ months)",
      "Proof of business registration",
      "Financial statements",
    ],
    features: [
      "Larger loan amounts",
      "Extended repayment period",
      "Business consulting support",
      "Networking opportunities",
    ],
    category: "growth",
  },
  {
    id: "3",
    name: "Emergency Fund",
    maxAmount: 1000000,
    minAmount: 200000,
    interestRate: 12,
    duration: "3-6 months",
    description: "Quick access to funds for urgent business needs or unexpected opportunities.",
    requirements: [
      "Age 18-35 years",
      "Valid national ID",
      "Mobile money account",
      "Previous YEF loan history (preferred)",
    ],
    features: [
      "24-hour approval",
      "Instant disbursement",
      "Minimal documentation",
      "Quick repayment options",
    ],
    category: "emergency",
  },
  {
    id: "4",
    name: "Agricultural Venture",
    maxAmount: 3000000,
    minAmount: 1000000,
    interestRate: 9,
    duration: "12-18 months",
    description: "Specialized loan for agricultural businesses and farming projects.",
    requirements: [
      "Age 18-35 years",
      "Valid national ID",
      "Agricultural project proposal",
      "Land access documentation",
    ],
    features: [
      "Seasonal repayment structure",
      "Agricultural training",
      "Expert advisory services",
      "Insurance options",
    ],
    category: "startup",
  },
  {
    id: "5",
    name: "Tech Innovation",
    maxAmount: 4000000,
    minAmount: 1500000,
    interestRate: 8.5,
    duration: "12-18 months",
    description: "Funding for technology-based startups and digital businesses.",
    requirements: [
      "Age 18-35 years",
      "Valid national ID",
      "Technology business plan",
      "Prototype or MVP (preferred)",
    ],
    features: [
      "Tech mentorship network",
      "Co-working space access",
      "Investor pitch preparation",
      "Marketing support",
    ],
    category: "startup",
  },
  {
    id: "6",
    name: "Women Empowerment",
    maxAmount: 2500000,
    minAmount: 500000,
    interestRate: 7.5,
    duration: "6-18 months",
    description: "Special loan program designed to support women entrepreneurs.",
    requirements: [
      "Female entrepreneur (18-35 years)",
      "Valid national ID",
      "Business idea or existing business",
      "Community recommendation",
    ],
    features: [
      "Lower interest rates",
      "Women-focused mentorship",
      "Networking events",
      "Childcare support resources",
    ],
    category: "startup",
  },
];

export const loanPolicies = [
  {
    title: "Eligibility Criteria",
    content: "All applicants must be Tanzanian citizens aged 18-35 years with a valid national ID. You must have an active mobile money account with at least 3 months of transaction history.",
  },
  {
    title: "Credit Assessment",
    content: "Our AI-powered system evaluates your creditworthiness based on mobile money transactions, business viability, and personal financial behavior. No traditional credit score required.",
  },
  {
    title: "Repayment Terms",
    content: "Flexible repayment schedules are available based on your business cash flow. Early repayment is encouraged and may result in interest discounts.",
  },
  {
    title: "Default Policy",
    content: "Missed payments will incur late fees. Consistent default may affect future loan eligibility. We work with borrowers to restructure loans when facing genuine difficulties.",
  },
  {
    title: "Use of Funds",
    content: "Loan funds must be used for business purposes as outlined in your application. Regular progress check-ins ensure proper fund utilization.",
  },
];

export const applicationProcess = [
  {
    step: 1,
    title: "Create Your Profile",
    description: "Register with your phone number and complete your personal information. Upload your national ID for verification.",
  },
  {
    step: 2,
    title: "Choose a Loan",
    description: "Browse available loan options and select the one that best fits your needs and business stage.",
  },
  {
    step: 3,
    title: "Submit Application",
    description: "Fill out the application form with your business details, loan amount, and purpose. Provide any required documentation.",
  },
  {
    step: 4,
    title: "AI Credit Check",
    description: "Our AI system analyzes your mobile money history and business viability. This usually takes less than 1 hour.",
  },
  {
    step: 5,
    title: "Approval & Training",
    description: "Once approved, complete a mandatory financial literacy module before fund disbursement.",
  },
  {
    step: 6,
    title: "Receive Funds",
    description: "Funds are disbursed directly to your mobile money wallet. Start building your business!",
  },
];
