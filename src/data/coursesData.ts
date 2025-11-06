export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  completed: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: "finance" | "business" | "marketing" | "tech";
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  lessons: Lesson[];
  enrolledCount: number;
  rating: number;
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Financial Literacy Basics",
    description: "Master the fundamentals of personal and business finance. Learn budgeting, saving, and basic accounting.",
    category: "finance",
    level: "beginner",
    duration: "2 hours",
    enrolledCount: 3420,
    rating: 4.8,
    lessons: [
      {
        id: "1-1",
        title: "Understanding Money and Value",
        duration: "15 min",
        description: "Learn the basic concepts of money, value, and financial exchange.",
        completed: false,
      },
      {
        id: "1-2",
        title: "Creating Your First Budget",
        duration: "20 min",
        description: "Step-by-step guide to creating a personal and business budget.",
        completed: false,
      },
      {
        id: "1-3",
        title: "Saving Strategies",
        duration: "18 min",
        description: "Effective methods to save money and build emergency funds.",
        completed: false,
      },
      {
        id: "1-4",
        title: "Introduction to Credit",
        duration: "22 min",
        description: "Understanding credit, interest rates, and responsible borrowing.",
        completed: false,
      },
      {
        id: "1-5",
        title: "Basic Accounting Principles",
        duration: "25 min",
        description: "Learn to track income, expenses, and maintain financial records.",
        completed: false,
      },
    ],
  },
  {
    id: "2",
    title: "Starting Your First Business",
    description: "Everything you need to know about launching a successful business from idea to execution.",
    category: "business",
    level: "beginner",
    duration: "3 hours",
    enrolledCount: 2850,
    rating: 4.9,
    lessons: [
      {
        id: "2-1",
        title: "Finding Your Business Idea",
        duration: "20 min",
        description: "Identify market opportunities and validate your business concept.",
        completed: false,
      },
      {
        id: "2-2",
        title: "Creating a Business Plan",
        duration: "30 min",
        description: "Write a comprehensive business plan that attracts investors.",
        completed: false,
      },
      {
        id: "2-3",
        title: "Business Registration in Tanzania",
        duration: "25 min",
        description: "Navigate the legal requirements and registration process.",
        completed: false,
      },
      {
        id: "2-4",
        title: "Finding Your First Customers",
        duration: "28 min",
        description: "Marketing strategies to attract and retain customers.",
        completed: false,
      },
      {
        id: "2-5",
        title: "Managing Cash Flow",
        duration: "27 min",
        description: "Keep your business financially healthy from day one.",
        completed: false,
      },
    ],
  },
  {
    id: "3",
    title: "Digital Marketing Essentials",
    description: "Learn to market your business online using social media, content marketing, and digital ads.",
    category: "marketing",
    level: "intermediate",
    duration: "4 hours",
    enrolledCount: 1920,
    rating: 4.7,
    lessons: [
      {
        id: "3-1",
        title: "Social Media Marketing Strategy",
        duration: "35 min",
        description: "Build a strong presence on Facebook, Instagram, and WhatsApp.",
        completed: false,
      },
      {
        id: "3-2",
        title: "Content Creation for Business",
        duration: "40 min",
        description: "Create engaging content that attracts customers.",
        completed: false,
      },
      {
        id: "3-3",
        title: "Understanding Your Target Audience",
        duration: "30 min",
        description: "Research and define your ideal customer profile.",
        completed: false,
      },
      {
        id: "3-4",
        title: "Mobile Marketing in Tanzania",
        duration: "38 min",
        description: "Leverage mobile platforms for maximum reach.",
        completed: false,
      },
      {
        id: "3-5",
        title: "Measuring Marketing Success",
        duration: "32 min",
        description: "Track ROI and optimize your marketing campaigns.",
        completed: false,
      },
    ],
  },
  {
    id: "4",
    title: "Mobile Money for Business",
    description: "Integrate mobile money payments and manage digital transactions effectively.",
    category: "tech",
    level: "beginner",
    duration: "1.5 hours",
    enrolledCount: 4100,
    rating: 4.6,
    lessons: [
      {
        id: "4-1",
        title: "Mobile Money Basics",
        duration: "18 min",
        description: "Understanding M-Pesa, Tigo Pesa, and Airtel Money.",
        completed: false,
      },
      {
        id: "4-2",
        title: "Accepting Mobile Payments",
        duration: "22 min",
        description: "Set up your business to receive mobile money payments.",
        completed: false,
      },
      {
        id: "4-3",
        title: "Managing Digital Transactions",
        duration: "20 min",
        description: "Track and reconcile mobile money transactions.",
        completed: false,
      },
      {
        id: "4-4",
        title: "Security Best Practices",
        duration: "25 min",
        description: "Protect your business from mobile money fraud.",
        completed: false,
      },
    ],
  },
  {
    id: "5",
    title: "Business Growth Strategies",
    description: "Scale your business with advanced strategies for expansion and sustainability.",
    category: "business",
    level: "advanced",
    duration: "5 hours",
    enrolledCount: 1450,
    rating: 4.9,
    lessons: [
      {
        id: "5-1",
        title: "Analyzing Business Performance",
        duration: "40 min",
        description: "Use metrics and KPIs to measure success.",
        completed: false,
      },
      {
        id: "5-2",
        title: "Scaling Operations",
        duration: "45 min",
        description: "Expand your business without losing quality.",
        completed: false,
      },
      {
        id: "5-3",
        title: "Building a Team",
        duration: "38 min",
        description: "Hire, train, and manage employees effectively.",
        completed: false,
      },
      {
        id: "5-4",
        title: "Advanced Financial Management",
        duration: "50 min",
        description: "Profit optimization and financial forecasting.",
        completed: false,
      },
      {
        id: "5-5",
        title: "Seeking Investment",
        duration: "42 min",
        description: "Pitch to investors and secure funding for growth.",
        completed: false,
      },
      {
        id: "5-6",
        title: "Sustainable Business Practices",
        duration: "35 min",
        description: "Build a business that lasts for generations.",
        completed: false,
      },
    ],
  },
  {
    id: "6",
    title: "Agricultural Business Management",
    description: "Specialized training for managing and scaling agricultural ventures.",
    category: "business",
    level: "intermediate",
    duration: "3.5 hours",
    enrolledCount: 2200,
    rating: 4.8,
    lessons: [
      {
        id: "6-1",
        title: "Modern Farming Techniques",
        duration: "35 min",
        description: "Improve productivity with modern agricultural methods.",
        completed: false,
      },
      {
        id: "6-2",
        title: "Farm Financial Management",
        duration: "40 min",
        description: "Budgeting and financial planning for farms.",
        completed: false,
      },
      {
        id: "6-3",
        title: "Market Access and Distribution",
        duration: "38 min",
        description: "Get your products to market efficiently.",
        completed: false,
      },
      {
        id: "6-4",
        title: "Value Addition in Agriculture",
        duration: "42 min",
        description: "Process and package products for higher profits.",
        completed: false,
      },
      {
        id: "6-5",
        title: "Climate-Smart Agriculture",
        duration: "35 min",
        description: "Adapt to climate change and protect your business.",
        completed: false,
      },
    ],
  },
];
