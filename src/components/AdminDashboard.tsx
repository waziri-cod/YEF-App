import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Users,
  TrendingUp,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Search,
  Calendar,
} from "lucide-react";
import { managementService, ClientProfile } from "@/services/managementService";
import { toast } from "sonner";

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    activeClients: 0,
    totalLoansProcessed: 0,
    totalDisbursed: 0,
    pendingFollowUps: 0,
  });
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const dashboardStats = await managementService.getDashboardStats();
      setStats(dashboardStats);

      const allClients = await managementService.getAllClients();
      setClients(allClients);
      setFilteredClients(allClients);
    } catch (error) {
      toast.error("Failed to load dashboard data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = clients.filter(
      (client) =>
        client.fullName.toLowerCase().includes(term.toLowerCase()) ||
        client.email.toLowerCase().includes(term.toLowerCase()) ||
        client.phone.includes(term)
    );
    setFilteredClients(filtered);
  };

  // Mock data for charts
  const loanTrendData = [
    { month: "Jan", loans: 4, amount: 2400 },
    { month: "Feb", loans: 3, amount: 1398 },
    { month: "Mar", loans: 2, amount: 9800 },
    { month: "Apr", loans: 5, amount: 3908 },
    { month: "May", loans: 6, amount: 4800 },
    { month: "Jun", loans: 7, amount: 5300 },
  ];

  const loanStatusData = [
    { name: "Approved", value: stats.totalLoansProcessed * 0.6 },
    { name: "Pending", value: stats.totalLoansProcessed * 0.2 },
    { name: "Rejected", value: stats.totalLoansProcessed * 0.1 },
    { name: "Defaulted", value: stats.totalLoansProcessed * 0.1 },
  ];

  const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#6b7280"];

  const StatCard = ({
    icon: Icon,
    title,
    value,
    description,
    color = "bg-blue-50",
  }: {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    description: string;
    color?: string;
  }) => (
    <Card className={color}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-2">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="text-muted-foreground opacity-50">{Icon}</div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-bold">Management Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor clients, loans, and follow-up tasks
        </p>
      </div>

      {/* Statistics Cards */}
      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard
            icon={<Users className="w-8 h-8" />}
            title="Total Clients"
            value={stats.totalClients}
            description={`${stats.activeClients} active`}
            color="bg-blue-50"
          />
          <StatCard
            icon={<CheckCircle className="w-8 h-8" />}
            title="Loans Processed"
            value={stats.totalLoansProcessed}
            description="All time"
            color="bg-green-50"
          />
          <StatCard
            icon={<DollarSign className="w-8 h-8" />}
            title="Disbursed"
            value={`${(stats.totalDisbursed / 1000000).toFixed(1)}M`}
            description="Total amount"
            color="bg-emerald-50"
          />
          <StatCard
            icon={<AlertCircle className="w-8 h-8" />}
            title="Follow-ups"
            value={stats.pendingFollowUps}
            description="Pending tasks"
            color="bg-orange-50"
          />
          <StatCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Success Rate"
            value="85%"
            description="Loan approval rate"
            color="bg-purple-50"
          />
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="tasks">Follow-Up Tasks</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Loan Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Loan Trends</CardTitle>
                <CardDescription>Monthly loans and disbursements</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={loanTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="loans"
                      stroke="#3b82f6"
                      name="Number of Loans"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Loan Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Loan Status Distribution</CardTitle>
                <CardDescription>Current loan status breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
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
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Disbursement Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Disbursements</CardTitle>
              <CardDescription>Loan amount disbursements over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={loanTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#10b981" name="Amount (TZS)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clients Tab */}
        <TabsContent value="clients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Directory</CardTitle>
              <CardDescription>Search and manage client profiles</CardDescription>
              <div className="mt-4 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <div
                      key={client.id}
                      className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition"
                      onClick={() => setSelectedClient(client)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">{client.fullName}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {client.email}
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {client.phone}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {client.location}
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={
                            client.status === "active" ? "default" : "secondary"
                          }
                        >
                          {client.status}
                        </Badge>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div>Loans: {client.totalLoansRequested}</div>
                        <div>
                          Approved: {(client.approvedAmount / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No clients found
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {selectedClient && (
            <Card className="bg-blue-50">
              <CardHeader>
                <CardTitle>Client Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-semibold">{selectedClient.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold">{selectedClient.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-semibold">{selectedClient.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{selectedClient.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge>{selectedClient.status}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">KYC Verified</p>
                    <p className="font-semibold">
                      {selectedClient.kycVerified ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Follow-Up Tasks</CardTitle>
              <CardDescription>Manage and track client follow-up activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No pending follow-up tasks</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
