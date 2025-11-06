import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { loanPolicies, applicationProcess } from "@/data/loansData";
import { ArrowLeft, Shield, FileText, CheckCircle } from "lucide-react";

const LoanPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/loans">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Loans
            </Link>
          </Button>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <Card className="p-8 gradient-card border-border text-center">
              <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-4">Loan Policies & Procedures</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Understanding our loan policies helps you make informed decisions
                and ensures a smooth borrowing experience.
              </p>
            </Card>

            {/* Policies */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Our Policies
              </h2>
              <div className="space-y-4">
                {loanPolicies.map((policy, index) => (
                  <Card
                    key={index}
                    className="p-6 hover-lift gradient-card border-border"
                  >
                    <h3 className="text-xl font-semibold mb-3">{policy.title}</h3>
                    <p className="text-muted-foreground">{policy.content}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Application Process */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-success" />
                Application Process
              </h2>
              <div className="space-y-4">
                {applicationProcess.map((step) => (
                  <Card
                    key={step.step}
                    className="p-6 hover-lift gradient-card border-border"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Important Notes */}
            <Card className="p-8 gradient-card border-border border-primary/20">
              <h2 className="text-2xl font-bold mb-4">Important Notes</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Mandatory Training:</strong> All loan recipients must
                    complete a financial literacy course before fund disbursement.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Early Repayment:</strong> You can repay your loan
                    early and receive a discount on the interest charged.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Grace Period:</strong> A 7-day grace period is
                    provided for missed payments before late fees apply.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Support System:</strong> We provide ongoing business
                    mentorship and support throughout your loan period.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <p>
                    <strong>Loan Restructuring:</strong> If you face genuine
                    difficulties, we can work with you to restructure your loan.
                  </p>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="flex-1" asChild>
                <Link to="/loans">Browse Available Loans</Link>
              </Button>
              <Button variant="outline" size="lg" className="flex-1" asChild>
                <Link to="/courses">Take Financial Literacy Course</Link>
              </Button>
            </div>

            {/* Contact */}
            <Card className="p-6 gradient-card border-border text-center">
              <h3 className="font-semibold mb-2">Have Questions?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our team is here to help you understand our policies and processes.
              </p>
              <div className="space-y-1 text-sm">
                <p>📧 Email: policy@yef.co.tz</p>
                <p>📞 Phone: +255 123 456 789</p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoanPolicy;
