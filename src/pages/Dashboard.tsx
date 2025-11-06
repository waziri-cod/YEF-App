import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  BookOpen,
  CheckCircle,
  AlertCircle,
  Award,
  Clock,
} from "lucide-react";

const Dashboard = () => {
  // Mock user data
  const userData = {
    name: "John Doe",
    creditScore: 83,
    activeLoan: {
      amount: 2500000,
      type: "Startup Boost",
      remaining: 1800000,
      monthlyPayment: 250000,
      nextPayment: "15 Dec 2024",
      progress: 28,
    },
    coursesCompleted: 2,
    totalCourses: 6,
    upcomingPayments: [
      { date: "15 Dec", amount: 250000, status: "upcoming" },
      { date: "15 Jan", amount: 250000, status: "upcoming" },
      { date: "15 Feb", amount: 250000, status: "upcoming" },
    ],
    recentActivities: [
      {
        action: "Completed course",
        title: "Financial Literacy Basics",
        date: "2 days ago",
      },
      {
        action: "Loan payment",
        title: "TZS 250,000 paid",
        date: "5 days ago",
      },
      {
        action: "Mentorship session",
        title: "with Grace Ndege",
        date: "1 week ago",
      },
    ],
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-TZ", {
      style: "currency",
      currency: "TZS",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {userData.name}! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's an overview of your financial journey with YEF.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Credit Score */}
              <Card className="p-6 gradient-card border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Credit Score</h2>
                  <Award className="w-6 h-6 text-accent" />
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {userData.creditScore}
                      </div>
                      <div className="text-xs text-muted-foreground">/100</div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="mb-2">
                      <span className="text-sm font-semibold text-success">
                        Excellent
                      </span>
                    </div>
                    <Progress value={userData.creditScore} className="mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Complete more courses to improve your score and unlock
                      better loan terms.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Active Loan */}
              <Card className="p-6 gradient-card border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Active Loan</h2>
                  <Badge className="bg-success/10 text-success">Active</Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Loan Type:</span>
                    <span className="font-semibold">
                      {userData.activeLoan.type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Original Amount:
                    </span>
                    <span className="font-semibold">
                      {formatCurrency(userData.activeLoan.amount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Remaining Balance:
                    </span>
                    <span className="font-semibold text-primary">
                      {formatCurrency(userData.activeLoan.remaining)}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">
                        Repayment Progress
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {userData.activeLoan.progress}%
                      </span>
                    </div>
                    <Progress value={userData.activeLoan.progress} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-4">
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">
                        Monthly Payment
                      </div>
                      <div className="text-lg font-bold">
                        {formatCurrency(userData.activeLoan.monthlyPayment)}
                      </div>
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">
                        Next Payment
                      </div>
                      <div className="text-lg font-bold">
                        {userData.activeLoan.nextPayment}
                      </div>
                    </div>
                  </div>

                  <Button variant="hero" className="w-full">
                    <DollarSign className="mr-2" /> Make Payment
                  </Button>
                </div>
              </Card>

              {/* Upcoming Payments */}
              <Card className="p-6 gradient-card border-border">
                <h2 className="text-xl font-semibold mb-4">
                  Upcoming Payments
                </h2>
                <div className="space-y-3">
                  {userData.upcomingPayments.map((payment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <div className="font-semibold">{payment.date}</div>
                          <div className="text-sm text-muted-foreground">
                            Monthly installment
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {formatCurrency(payment.amount)}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Learning Progress */}
              <Card className="p-6 gradient-card border-border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent" />
                  Learning Progress
                </h3>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-accent mb-1">
                    {userData.coursesCompleted}/{userData.totalCourses}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Courses Completed
                  </div>
                </div>
                <Progress
                  value={(userData.coursesCompleted / userData.totalCourses) * 100}
                  className="mb-4"
                />
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/courses">Continue Learning</Link>
                </Button>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 gradient-card border-border">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/loans">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Apply for New Loan
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/courses">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Browse Courses
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/mentorship">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Book Mentorship
                    </Link>
                  </Button>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6 gradient-card border-border">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {userData.recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
                    >
                      <CheckCircle className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-semibold">
                          {activity.action}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {activity.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {activity.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Alert */}
              <Card className="p-6 gradient-card border-border border-accent/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Payment Reminder</h3>
                    <p className="text-sm text-muted-foreground">
                      Your next payment of {formatCurrency(250000)} is due on{" "}
                      {userData.activeLoan.nextPayment}.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
