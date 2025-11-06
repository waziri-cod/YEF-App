import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import {
  DollarSign,
  BookOpen,
  Users,
  TrendingUp,
  CheckCircle,
  Zap,
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const features = [
    {
      icon: DollarSign,
      title: "Collateral-Free Loans",
      description: "Access microfinance loans up to TZS 5M without collateral, powered by AI credit scoring",
    },
    {
      icon: BookOpen,
      title: "Financial Literacy",
      description: "Learn essential business and financial skills through interactive courses",
    },
    {
      icon: Users,
      title: "Mentorship Network",
      description: "Connect with successful entrepreneurs and get guidance for your business",
    },
  ];

  const stats = [
    { label: "Youth Empowered", value: "10,000+" },
    { label: "Loans Disbursed", value: "TZS 50M+" },
    { label: "Success Rate", value: "95%" },
    { label: "Avg. Processing Time", value: "24 Hours" },
  ];

  const benefits = [
    "No collateral required",
    "AI-powered instant credit assessment",
    "Mobile money integration",
    "Flexible repayment terms",
    "Free financial literacy courses",
    "Community support network",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Young entrepreneurs collaborating"
            className="w-full h-full object-cover mix-blend-overlay opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl text-center mx-auto text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Empowering Tanzania's Youth Entrepreneurs
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-95">
              Access collateral-free loans, financial education, and mentorship
              to turn your business dreams into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/loans">
                <Button variant="hero" size="lg" className="w-full sm:w-auto bg-card text-primary hover:bg-card/90">
                  <Zap className="mr-2" /> Apply for Loan
                </Button>
              </Link>
              <Link to="/courses">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 transition-smooth"
                >
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              YEF provides a complete ecosystem to help young entrepreneurs start
              and grow their businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover-lift gradient-card border-border"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Started in 3 Simple Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Account</h3>
              <p className="text-muted-foreground">
                Sign up with your phone number and complete your profile
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Credit Check</h3>
              <p className="text-muted-foreground">
                Get instant credit assessment using your mobile money history
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-success text-success-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Receive Funds</h3>
              <p className="text-muted-foreground">
                Get approved and receive funds directly to your mobile wallet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose YEF?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We understand the unique challenges young entrepreneurs face.
                That's why we've built a platform that removes barriers and
                provides comprehensive support.
              </p>
              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 gradient-card border-border shadow-lg">
                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Average Loan Amount
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      TZS 2.5M
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Interest Rate
                    </div>
                    <div className="text-3xl font-bold text-success">
                      From 8%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Approval Rate
                    </div>
                    <div className="text-3xl font-bold text-accent">95%</div>
                  </div>
                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <Link to="/loans">
                      <TrendingUp className="mr-2" /> Apply Now
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg mb-8 opacity-95">
              Join thousands of young entrepreneurs who are building successful
              businesses with YEF.
            </p>
            <Button
              variant="hero"
              size="lg"
              className="bg-card text-primary hover:bg-card/90"
              asChild
            >
              <Link to="/loans">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">Y</span>
                </div>
                <span className="font-bold">YEF</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering Tanzania's youth through accessible finance and
                education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link to="/loans" className="block text-muted-foreground hover:text-foreground transition-smooth">
                  Browse Loans
                </Link>
                <Link to="/courses" className="block text-muted-foreground hover:text-foreground transition-smooth">
                  Courses
                </Link>
                <Link to="/mentorship" className="block text-muted-foreground hover:text-foreground transition-smooth">
                  Mentorship
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-smooth">
                  Privacy Policy
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-smooth">
                  Terms of Service
                </a>
                <a href="#" className="block text-muted-foreground hover:text-foreground transition-smooth">
                  Loan Agreement
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Email: info@yef.co.tz</p>
                <p>Phone: +255 123 456 789</p>
                <p>Dar es Salaam, Tanzania</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Youth Empower Finance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
