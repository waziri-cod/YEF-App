/**
 * ============================================
 * ANALYTICS DASHBOARD COMPONENT
 * ============================================
 * Business analytics and insights dashboard
 */

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, DollarSign, Target, Activity, ArrowUp, ArrowDown } from "lucide-react";
import { managementService } from "@/services/managementService";
import { cn } from "@/lib/utils";

/**
 * Analytics data types
 */
interface AnalyticsData {
  month: string;
  applications: number;
  approvals: number;
  disbursements: number;
  repayments: number;
}

interface LoanStats {
  total: number;
  active: number;
  completed: number;
  defaulted: number;
}

interface RevenueData {
  month: string;
  interest: number;
  fees: number;
  total: number;
}

interface StatCard {
  title: string;
  value: string | number;
  change: number;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
  color: string;
}

/**
 * Stat Card Component
 */
function StatCard({ title, value, change, trend, icon, color }: StatCard) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <div className="flex items-center gap-1">
              {trend === "up" && <ArrowUp className="h-4 w-4 text-green-500" />}
              {trend === "down" && <ArrowDown className="h-4 w-4 text-red-500" />}
              <span
                className={cn(
                  "text-xs font-semibold",
                  trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500"
                )}
              >
                {change}% this month
              </span>
            </div>
          </div>
          <div className={cn("p-3 rounded-lg", color)}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Analytics Dashboard Component
 */
export function AnalyticsDashboard() {
  const [stats, setStats] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const analyticsData: AnalyticsData[] = [
    { month: "Jan", applications: 24, approvals: 18, disbursements: 15, repayments: 22 },
    { month: "Feb", applications: 32, approvals: 24, disbursements: 20, repayments: 28 },
    { month: "Mar", applications: 28, approvals: 21, disbursements: 18, repayments: 25 },
    { month: "Apr", applications: 35, approvals: 26, disbursements: 24, repayments: 32 },
    { month: "May", applications: 42, approvals: 32, disbursements: 28, repayments: 38 },
    { month: "Jun", applications: 38, approvals: 29, disbursements: 26, repayments: 34 },
  ];

  const revenueData: RevenueData[] = [
    { month: "Jan", interest: 2400, fees: 240, total: 2640 },
    { month: "Feb", interest: 2800, fees: 280, total: 3080 },
    { month: "Mar", interest: 2600, fees: 260, total: 2860 },
    { month: "Apr", interest: 3200, fees: 320, total: 3520 },
    { month: "May", interest: 3800, fees: 380, total: 4180 },
    { month: "Jun", interest: 3500, fees: 350, total: 3850 },
  ];

  const loanStatusData = [
    { name: "Active", value: 245, fill: "#3b82f6" },
    { name: "Completed", value: 189, fill: "#10b981" },
    { name: "Pending", value: 67, fill: "#f59e0b" },
    { name: "Defaulted", value: 12, fill: "#ef4444" },
  ];

  const loanTypeData = [
    { name: "Education", value: 145, fill: "#8b5cf6" },
    { name: "Entrepreneur", value: 123, fill: "#ec4899" },
    { name: "Agriculture", value: 98, fill: "#14b8a6" },
    { name: "Healthcare", value: 87, fill: "#f59e0b" },
    { name: "Housing", value: 92, fill: "#06b6d4" },
    { name: "Emergency", value: 45, fill: "#ef4444" },
  ];

  useEffect(() => {
    const loadStats = async () => {
      try {
        const dashboardStats = await managementService.getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error("Error loading analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const statCards: StatCard[] = [
    {
      title: "Total Applications",
      value: "289",
      change: 12,
      trend: "up",
      icon: <Activity className="h-5 w-5 text-white" />,
      color: "bg-blue-500/20",
    },
    {
      title: "Active Loans",
      value: "245",
      change: 8,
      trend: "up",
      icon: <DollarSign className="h-5 w-5 text-white" />,
      color: "bg-green-500/20",
    },
    {
      title: "Total Disbursed",
      value: "4.2B TZS",
      change: 15,
      trend: "up",
      icon: <TrendingUp className="h-5 w-5 text-white" />,
      color: "bg-purple-500/20",
    },
    {
      title: "Client Base",
      value: "1,247",
      change: 22,
      trend: "up",
      icon: <Users className="h-5 w-5 text-white" />,
      color: "bg-orange-500/20",
    },
    {
      title: "Approval Rate",
      value: "78.5%",
      change: 3,
      trend: "up",
      icon: <Target className="h-5 w-5 text-white" />,
      color: "bg-pink-500/20",
    },
    {
      title: "This Month Revenue",
      value: "3.85M TZS",
      change: 18,
      trend: "up",
      icon: <DollarSign className="h-5 w-5 text-white" />,
      color: "bg-cyan-500/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Loan Pipeline (6 Months)</CardTitle>
              <CardDescription>
                Application flow through approval and disbursement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="applications" fill="#3b82f6" />
                  <Bar dataKey="approvals" fill="#10b981" />
                  <Bar dataKey="disbursements" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Loan Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={loanStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {loanStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loans by Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={loanTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {loanTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>
                Interest income and fees collected
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="interest"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                  />
                  <Area
                    type="monotone"
                    dataKey="fees"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Loans Tab */}
        <TabsContent value="loans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Repayments</CardTitle>
              <CardDescription>
                Payment trends over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="repayments"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="disbursements"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Loan Approval Rate</span>
                    <Badge>78.5%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "78.5%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Payment Success Rate</span>
                    <Badge>94.2%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "94.2%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Client Retention</span>
                    <Badge>87.3%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "87.3%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Default Rate</span>
                    <Badge variant="destructive">3.8%</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "3.8%" }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Avg. Loan Size</span>
                    <Badge>2.5M TZS</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Avg. Repayment Period</span>
                    <Badge>28 months</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold text-sm">Most Popular Loan Type</h4>
                  <p className="text-sm text-muted-foreground">Education Loans (145 active)</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h4 className="font-semibold text-sm">Highest Revenue Generator</h4>
                  <p className="text-sm text-muted-foreground">Housing Loans (12.5M TZS YTD)</p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h4 className="font-semibold text-sm">Fastest Growing Segment</h4>
                  <p className="text-sm text-muted-foreground">Entrepreneur Loans (+42% YoY)</p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4 py-2">
                  <h4 className="font-semibold text-sm">Best Performing Market</h4>
                  <p className="text-sm text-muted-foreground">Dar es Salaam (38% of volume)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AnalyticsDashboard;
