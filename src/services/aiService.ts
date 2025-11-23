// AI Service for Credit Scoring and Financial Analysis
// This service integrates with OpenAI API for AI-powered features

export interface CreditScoreRequest {
  userId: string;
  mobileMoneyHistory?: {
    transactions: number;
    averageAmount: number;
    frequency: "daily" | "weekly" | "monthly";
    consistency: number; // 0-1 scale
  };
  businessInfo?: {
    type: string;
    age: number; // in months
    revenue: number;
    expenses: number;
  };
  personalInfo?: {
    age: number;
    education: string;
    location: string;
  };
}

export interface CreditScoreResponse {
  score: number; // 0-1000
  riskLevel: "low" | "medium" | "high";
  recommendation: string;
  maxLoanAmount: number;
  interestRate: number;
  reasoning: string;
}

export interface AIChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

class AIService {
  private apiKey: string;
  private baseUrl: string = "https://api.openai.com/v1";

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || "";
  }

  /**
   * Calculate credit score using AI
   */
  async calculateCreditScore(request: CreditScoreRequest): Promise<CreditScoreResponse> {
    try {
      // If OpenAI API key is not set, use a mock calculation
      if (!this.apiKey) {
        return this.mockCreditScore(request);
      }

      const prompt = this.buildCreditScorePrompt(request);
      const response = await this.callOpenAI(prompt);

      return this.parseCreditScoreResponse(response);
    } catch (error) {
      console.error("Error calculating credit score:", error);
      // Fallback to mock calculation
      return this.mockCreditScore(request);
    }
  }

  /**
   * Chat with AI assistant for financial advice
   */
  async chatWithAI(messages: AIChatMessage[]): Promise<string> {
    try {
      if (!this.apiKey) {
        return "AI service is not configured. Please contact support for assistance.";
      }

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful financial advisor for young entrepreneurs in Tanzania. Provide clear, practical advice about microloans, business management, and financial literacy.",
            },
            ...messages,
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI response");
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm sorry, I couldn't process your request.";
    } catch (error) {
      console.error("Error chatting with AI:", error);
      return "I'm having trouble connecting right now. Please try again later.";
    }
  }

  /**
   * Analyze loan application using AI
   */
  async analyzeLoanApplication(applicationData: any): Promise<{
    recommendation: "approve" | "reject" | "review";
    confidence: number;
    reasoning: string;
    suggestedAmount?: number;
  }> {
    try {
      if (!this.apiKey) {
        return {
          recommendation: "review",
          confidence: 0.5,
          reasoning: "AI analysis unavailable. Manual review required.",
        };
      }

      const prompt = `Analyze this loan application for a young entrepreneur in Tanzania:
${JSON.stringify(applicationData, null, 2)}

Provide a recommendation (approve/reject/review), confidence level (0-1), reasoning, and suggested loan amount if approved.`;

      const response = await this.callOpenAI(prompt);
      return this.parseLoanAnalysisResponse(response);
    } catch (error) {
      console.error("Error analyzing loan application:", error);
      return {
        recommendation: "review",
        confidence: 0.5,
        reasoning: "Error in AI analysis. Manual review required.",
      };
    }
  }

  private async callOpenAI(prompt: string): Promise<string> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error("OpenAI API error");
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "";
  }

  private buildCreditScorePrompt(request: CreditScoreRequest): string {
    return `You are a credit scoring AI for a microloan platform in Tanzania. 
Analyze the following applicant data and provide a credit score (0-1000), risk level, recommendation, max loan amount, interest rate, and reasoning.

Applicant Data:
${JSON.stringify(request, null, 2)}

Respond in JSON format:
{
  "score": number (0-1000),
  "riskLevel": "low" | "medium" | "high",
  "recommendation": "string",
  "maxLoanAmount": number (in TZS),
  "interestRate": number (percentage),
  "reasoning": "string"
}`;
  }

  private parseCreditScoreResponse(response: string): CreditScoreResponse {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error("Error parsing AI response:", error);
    }

    // Fallback to mock
    return this.mockCreditScore({ userId: "" });
  }

  private parseLoanAnalysisResponse(response: string): any {
    try {
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error("Error parsing AI response:", error);
    }

    return {
      recommendation: "review",
      confidence: 0.5,
      reasoning: "Unable to parse AI response",
    };
  }

  private mockCreditScore(request: CreditScoreRequest): CreditScoreResponse {
    // Mock credit scoring algorithm
    let score = 500; // Base score

    if (request.mobileMoneyHistory) {
      score += request.mobileMoneyHistory.consistency * 200;
      score += Math.min(request.mobileMoneyHistory.transactions / 10, 100);
    }

    if (request.businessInfo) {
      score += Math.min(request.businessInfo.age * 5, 150);
      const profit = request.businessInfo.revenue - request.businessInfo.expenses;
      if (profit > 0) {
        score += Math.min(profit / 10000, 100);
      }
    }

    score = Math.min(Math.max(score, 300), 900);

    const riskLevel = score >= 700 ? "low" : score >= 500 ? "medium" : "high";
    const maxLoanAmount = score * 1000; // TZS
    const interestRate = riskLevel === "low" ? 8 : riskLevel === "medium" ? 12 : 18;

    return {
      score: Math.round(score),
      riskLevel,
      recommendation: riskLevel === "low" 
        ? "Approved - Low risk applicant" 
        : riskLevel === "medium"
        ? "Approved with conditions - Medium risk"
        : "Requires review - High risk",
      maxLoanAmount,
      interestRate,
      reasoning: `Based on ${request.mobileMoneyHistory ? "mobile money history" : "available data"}, the applicant shows ${riskLevel} risk profile.`,
    };
  }
}

export const aiService = new AIService();

