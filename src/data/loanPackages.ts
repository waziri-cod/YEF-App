/**
 * Loan Packages Data and Service
 * Defines different loan types and structures
 */

export type LoanType = 'education' | 'entrepreneur' | 'agriculture' | 'healthcare' | 'housing' | 'emergency';

export interface LoanPackage {
  id: string;
  type: LoanType;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number; // Percentage per annum
  duration: number; // In months
  disbursementTime: string; // e.g., "5-7 business days"
  requirements: string[];
  features: string[];
  documents: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientLoan {
  id: string;
  clientId: string;
  packageId: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed' | 'completed' | 'defaulted';
  requestDate: Date;
  approvalDate?: Date;
  disbursementDate?: Date;
  dueDate?: Date;
  interestRate: number;
  monthlyPayment: number;
  totalRepayment: number;
  amountPaid: number;
  remainingBalance: number;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentSchedule {
  id: string;
  loanId: string;
  dueDate: Date;
  amount: number;
  status: 'pending' | 'paid' | 'overdue';
  paidDate?: Date;
  paidAmount?: number;
}

export const loanPackages: LoanPackage[] = [
  {
    id: 'edu-001',
    type: 'education',
    name: 'Education Loan',
    description: 'Fund your education and skills development. Perfect for tuition, courses, and vocational training.',
    minAmount: 500000, // TZS
    maxAmount: 5000000,
    interestRate: 7,
    duration: 48,
    disbursementTime: '5-7 business days',
    requirements: [
      'Valid national ID',
      'Proof of enrollment or admission letter',
      'Co-signer for amounts > 2M',
      'Bank statement (3 months)',
    ],
    features: [
      'Grace period up to 6 months',
      'Flexible repayment terms',
      'Educational institution verification',
      'Zero penalty for early repayment',
    ],
    documents: [
      'Application form',
      'National ID copy',
      'Admission/enrollment letter',
      'Previous academic records',
      'Income verification',
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'ent-001',
    type: 'entrepreneur',
    name: 'Entrepreneur Startup Loan',
    description: 'Launch or expand your business. Ideal for small businesses, trading, and manufacturing.',
    minAmount: 1000000,
    maxAmount: 10000000,
    interestRate: 9,
    duration: 36,
    disbursementTime: '3-5 business days',
    requirements: [
      'Business registration certificate',
      'National ID',
      'Bank statement (6 months)',
      'Business plan',
      'Collateral (movable or immovable)',
    ],
    features: [
      'Business mentoring support',
      'Monthly check-ins with loan officer',
      'Flexible business-based repayment',
      'Access to YEF business network',
      'Insurance coverage included',
    ],
    documents: [
      'Application form',
      'Business registration',
      'National ID copy',
      'Bank statements',
      'Business plan and financial projections',
      'Tax identification number',
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'agr-001',
    type: 'agriculture',
    name: 'Agriculture & Farming Loan',
    description: 'Grow your agricultural business. For farming inputs, equipment, and land development.',
    minAmount: 500000,
    maxAmount: 8000000,
    interestRate: 8,
    duration: 24,
    disbursementTime: '7-10 business days',
    requirements: [
      'Land ownership/lease documents',
      'National ID',
      'Farming experience (minimum 1 year)',
      'Bank statement',
      'Harvest schedule',
    ],
    features: [
      'Seasonal disbursement options',
      'Agricultural extension officer support',
      'Post-harvest financing available',
      'Crop insurance included',
      'Market linkage assistance',
    ],
    documents: [
      'Application form',
      'Land documents (title deed/lease)',
      'National ID copy',
      'Farming records/certificates',
      'Bank statements',
      'Crop and harvest schedule',
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'hea-001',
    type: 'healthcare',
    name: 'Healthcare & Wellness Loan',
    description: 'Medical services and health-related investments. For medical bills, equipment, and health businesses.',
    minAmount: 500000,
    maxAmount: 5000000,
    interestRate: 6,
    duration: 24,
    disbursementTime: '2-3 business days',
    requirements: [
      'Medical quotation/invoice',
      'National ID',
      'Health professional recommendation',
      'Income verification',
    ],
    features: [
      'Express processing for emergencies',
      'Medical verification included',
      'Health insurance coordination',
      'Doctor consultation support',
    ],
    documents: [
      'Application form',
      'Medical quotation/prescription',
      'National ID copy',
      'Proof of employment/income',
      'Doctor recommendation letter',
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'hou-001',
    type: 'housing',
    name: 'Housing & Property Loan',
    description: 'Build or improve your home. For construction, renovation, and property development.',
    minAmount: 2000000,
    maxAmount: 20000000,
    interestRate: 10,
    duration: 60,
    disbursementTime: '10-14 business days',
    requirements: [
      'Land ownership documents',
      'Architect/engineer plans',
      'National ID',
      'Income proof (18+ months)',
      'Property valuation',
    ],
    features: [
      'Long-term repayment (up to 5 years)',
      'Construction milestones-based disbursement',
      'Property insurance included',
      'Free property valuation',
    ],
    documents: [
      'Application form',
      'Land title/ownership documents',
      'Building plans',
      'National ID copy',
      'Income verification documents',
      'Property valuation report',
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'emg-001',
    type: 'emergency',
    name: 'Emergency Relief Loan',
    description: 'Quick cash for unexpected emergencies. Fast approval and disbursement.',
    minAmount: 100000,
    maxAmount: 2000000,
    interestRate: 12,
    duration: 12,
    disbursementTime: '24 hours',
    requirements: [
      'National ID',
      'Valid phone number',
      'One character reference',
      'Income proof',
    ],
    features: [
      'Same-day approval possible',
      'Minimal documentation',
      'SMS and email updates',
      'Flexible payment options',
    ],
    documents: [
      'Application form',
      'National ID copy',
      'Income verification',
      'Character reference letter',
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/**
 * Calculate monthly payment using amortization formula
 */
export const calculateMonthlyPayment = (
  principal: number,
  annualRate: number,
  months: number
): number => {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  
  return Math.round(monthlyPayment);
};

/**
 * Calculate total interest for a loan
 */
export const calculateTotalInterest = (
  principal: number,
  annualRate: number,
  months: number
): number => {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, months);
  return monthlyPayment * months - principal;
};

/**
 * Generate payment schedule
 */
export const generatePaymentSchedule = (
  loanId: string,
  principal: number,
  annualRate: number,
  months: number,
  startDate: Date
): PaymentSchedule[] => {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, months);
  const schedule: PaymentSchedule[] = [];
  
  for (let i = 1; i <= months; i++) {
    const dueDate = new Date(startDate);
    dueDate.setMonth(dueDate.getMonth() + i);
    
    schedule.push({
      id: `${loanId}-payment-${i}`,
      loanId,
      dueDate,
      amount: monthlyPayment,
      status: 'pending',
    });
  }
  
  return schedule;
};

export default {
  loanPackages,
  calculateMonthlyPayment,
  calculateTotalInterest,
  generatePaymentSchedule,
};
