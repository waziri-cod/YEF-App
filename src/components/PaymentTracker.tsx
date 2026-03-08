import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
} from "lucide-react";
import { loanService } from "@/services/firestoreService";
import { toast } from "sonner";

import { DocumentData } from "firebase/firestore";

export interface PaymentTrackerProps {
  loanId: string;
  clientId: string;
}

export const PaymentTracker = ({ loanId, clientId }: PaymentTrackerProps) => {
  const [loanData, setLoanData] = useState<DocumentData | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPaymentData = async () => {
    try {
      setIsLoading(true);
      const loan = await loanService.getLoan(loanId);
      setLoanData(loan);

      const payments = await loanService.getPaymentHistory(loanId);
      setPaymentHistory(payments);
    } catch (error) {
      toast.error("Failed to load payment data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loanId) {
      loadPaymentData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanId]);

  if (isLoading) {
    return <div className="text-center py-12">Loading payment information...</div>;
  }

  if (!loanData) {
    return <div className="text-center py-12 text-muted-foreground">Loan not found</div>;
  }

  // Calculate statistics
  const totalAmount = loanData.totalRepayment || loanData.amount;
  const paidAmount = loanData.amountPaid || 0;
  const remainingBalance = loanData.remainingBalance || loanData.amount;
  const paymentProgress = (paidAmount / totalAmount) * 100;

  // Generate payment timeline data
  const timelineData = paymentHistory.map((payment, idx) => ({
    month: `Payment ${idx + 1}`,
    amount: payment.amount,
    date: new Date(payment.createdAt?.seconds * 1000).toLocaleDateString(),
  }));

  // Payment status pie chart
  const paymentStatusData = [
    { name: "Paid", value: paidAmount },
    { name: "Remaining", value: Math.max(0, remainingBalance) },
  ];

  const COLORS = ["#10b981", "#e5e7eb"];

  const StatusCard = ({
    label,
    value,
    icon: Icon,
    color,
  }: {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
  }) => (
    <Card className={color}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className="text-muted-foreground opacity-50">{Icon}</div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Status Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Loan Payment Status</h2>
            <p className="text-muted-foreground">Loan ID: {loanId}</p>
          </div>
          <Badge className={loanData.status === "completed" ? "bg-green-600" : "bg-blue-600"}>
            {loanData.status?.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          label="Total Loan Amount"
          value={`${(totalAmount / 1000000).toFixed(2)}M TZS`}
          icon={<DollarSign className="w-8 h-8" />}
          color="bg-blue-50"
        />
        <StatusCard
          label="Amount Paid"
          value={`${(paidAmount / 1000000).toFixed(2)}M TZS`}
          icon={<CheckCircle className="w-8 h-8 text-green-600" />}
          color="bg-green-50"
        />
        <StatusCard
          label="Remaining Balance"
          value={`${(remainingBalance / 1000000).toFixed(2)}M TZS`}
          icon={<Clock className="w-8 h-8 text-orange-600" />}
          color="bg-orange-50"
        />
        <StatusCard
          label="Progress"
          value={`${paymentProgress.toFixed(0)}%`}
          icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
          color="bg-purple-50"
        />
      </div>

      {/* Payment Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Progress</CardTitle>
          <CardDescription>Your overall loan repayment progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-semibold">{paymentProgress.toFixed(1)}%</span>
            </div>
            <Progress value={paymentProgress} className="h-3" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {paymentHistory.length}
              </p>
              <p className="text-xs text-muted-foreground">Payments Made</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {Math.ceil(remainingBalance / (loanData.monthlyPayment || 1))}
              </p>
              <p className="text-xs text-muted-foreground">Payments Remaining</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {loanData.monthlyPayment ? (loanData.monthlyPayment / 1000).toFixed(0) + "K" : "N/A"}
              </p>
              <p className="text-xs text-muted-foreground">Monthly Amount</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="timeline">Payment Timeline</TabsTrigger>
          <TabsTrigger value="status">Payment Status</TabsTrigger>
        </TabsList>

        {/* Payment Timeline Chart */}
        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your payment transactions over time</CardDescription>
            </CardHeader>
            <CardContent>
              {paymentHistory.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#3b82f6" name="Payment Amount" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No payments recorded yet
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Status Chart */}
        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Payment Breakdown</CardTitle>
              <CardDescription>Paid vs. Remaining amount</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={paymentStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) =>
                      `${name}: ${(value / 1000000).toFixed(1)}M TZS`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${(value / 1000000).toFixed(2)}M TZS`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment History Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>All recorded payments for this loan</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Download Statement
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {paymentHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Date</th>
                    <th className="text-left py-3 px-4 font-semibold">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold">Method</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, idx) => (
                    <tr key={idx} className="border-b hover:bg-muted/50 transition">
                      <td className="py-3 px-4">
                        {new Date(payment.createdAt?.seconds * 1000).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {(payment.amount / 1000000).toFixed(2)}M TZS
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {payment.paymentMethod || "Bank Transfer"}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className="bg-green-600">
                          {payment.status?.toUpperCase()}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No payment history available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Due Alert */}
      {loanData.status === "disbursed" && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-900 mb-1">Next Payment Due</p>
                <p className="text-orange-800 text-sm mb-3">
                  Your next payment of {(loanData.monthlyPayment / 1000000).toFixed(2)}M TZS is due on{" "}
                  {new Date().toLocaleDateString()}
                </p>
                <Button size="sm">Make Payment Now</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentTracker;
