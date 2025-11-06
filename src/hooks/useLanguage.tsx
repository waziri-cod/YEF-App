import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'sw';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'yef-language',
    }
  )
);

const translations = {
  en: {
    // Navigation
    home: "Home",
    loans: "Loans",
    courses: "Courses",
    mentorship: "Mentorship",
    dashboard: "Dashboard",
    profile: "Profile",
    
    // Hero
    heroTitle: "Empowering Tanzania's Youth Entrepreneurs",
    heroSubtitle: "Breaking the cycle of poverty in East Africa through accessible finance, education, and mentorship",
    getStarted: "Get Started",
    learnMore: "Learn More",
    
    // Features
    features: "Our Features",
    smartLoans: "Smart Loans",
    smartLoansDesc: "AI-powered credit scoring with mobile money integration",
    education: "Financial Education",
    educationDesc: "Comprehensive courses to build financial literacy",
    mentorshipTitle: "Expert Mentorship",
    mentorshipDesc: "Learn from successful entrepreneurs",
    
    // Stats
    loansProcessed: "Loans Processed",
    activeUsers: "Active Users",
    successRate: "Success Rate",
    
    // Mission
    ourMission: "Our Mission",
    missionText: "To reduce poverty in Tanzania and East Africa by empowering young entrepreneurs with accessible financial tools and knowledge",
    
    // Loan Application
    applyForLoan: "Apply for Loan",
    loanAmount: "Loan Amount",
    loanPurpose: "Loan Purpose",
    duration: "Duration",
    submit: "Submit Application",
    
    // Courses
    startLearning: "Start Learning",
    lessons: "Lessons",
    enrolled: "Enrolled",
    
    // Common
    loading: "Loading...",
    success: "Success",
    error: "Error",
  },
  sw: {
    // Navigation
    home: "Nyumbani",
    loans: "Mikopo",
    courses: "Kozi",
    mentorship: "Ushauri",
    dashboard: "Dashibodi",
    profile: "Wasifu",
    
    // Hero
    heroTitle: "Kuwawezesha Vijana Wafanyabiashara wa Tanzania",
    heroSubtitle: "Kuvunja mzunguko wa umaskini Afrika Mashariki kupitia ufikiaji wa fedha, elimu na ushauri",
    getStarted: "Anza Sasa",
    learnMore: "Jifunze Zaidi",
    
    // Features
    features: "Huduma Zetu",
    smartLoans: "Mikopo Mahiri",
    smartLoansDesc: "Ukadiriaji wa mkopo unaotumia AI na integresheni ya pesa za simu",
    education: "Elimu ya Kifedha",
    educationDesc: "Kozi kamili za kujenga ujuzi wa kifedha",
    mentorshipTitle: "Ushauri wa Kitaalamu",
    mentorshipDesc: "Jifunze kutoka kwa wafanyabiashara mafanikio",
    
    // Stats
    loansProcessed: "Mikopo Iliyoshughulikiwa",
    activeUsers: "Watumiaji Hai",
    successRate: "Kiwango cha Mafanikio",
    
    // Mission
    ourMission: "Dhamira Yetu",
    missionText: "Kupunguza umaskini Tanzania na Afrika Mashariki kwa kuwawezesha vijana wafanyabiashara kwa zana na maarifa ya kifedha yenye upatikanaji",
    
    // Loan Application
    applyForLoan: "Omba Mkopo",
    loanAmount: "Kiasi cha Mkopo",
    loanPurpose: "Madhumuni ya Mkopo",
    duration: "Muda",
    submit: "Wasilisha Ombi",
    
    // Courses
    startLearning: "Anza Kujifunza",
    lessons: "Masomo",
    enrolled: "Waliojiunga",
    
    // Common
    loading: "Inapakia...",
    success: "Mafanikio",
    error: "Hitilafu",
  },
};

export function useLanguage() {
  const { language, setLanguage } = useLanguageStore();
  
  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || translations.en[key];
  };
  
  return { language, setLanguage, t };
}
