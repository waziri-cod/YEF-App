import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { Navigation } from "@/components/Navigation";

interface DiagnosticStatus {
  name: string;
  status: "success" | "error" | "warning" | "pending";
  message: string;
  details?: string;
}

const Diagnostic = () => {
  const [diagnostics, setDiagnostics] = useState<DiagnosticStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runDiagnostics = async () => {
      const results: DiagnosticStatus[] = [];

      // 1. Check environment variables
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5050";
      results.push({
        name: "Environment Variables",
        status: apiBaseUrl === "http://localhost:5050" ? "success" : "warning",
        message: `API Base URL: ${apiBaseUrl}`,
        details: apiBaseUrl === "http://localhost:5050" ? "✅ Correct" : "⚠️ May be incorrect",
      });

      // 2. Check localStorage
      const token = localStorage.getItem("authToken");
      results.push({
        name: "Auth Token",
        status: token ? "success" : "warning",
        message: token ? "✅ Token found in localStorage" : "⚠️ No token (need to login)",
      });

      // 3. Check backend connectivity
      try {
        const response = await fetch(`${apiBaseUrl}/api/loan-packages`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        results.push({
          name: "Backend Connectivity",
          status: response.ok ? "success" : "error",
          message: response.ok ? "✅ Backend is responding" : `❌ Backend error: ${response.status}`,
          details: `Response status: ${response.status}`,
        });

        if (response.ok) {
          const data = await response.json();
          results.push({
            name: "Loan Packages",
            status: Array.isArray(data) && data.length > 0 ? "success" : "warning",
            message: Array.isArray(data) ? `✅ Found ${data.length} packages` : "⚠️ No packages found",
            details: `Array length: ${Array.isArray(data) ? data.length : 0}`,
          });
        }
      } catch (error) {
        results.push({
          name: "Backend Connectivity",
          status: "error",
          message: "❌ Cannot connect to backend",
          details: error instanceof Error ? error.message : "Unknown error",
        });
      }

      // 4. Check auth service
      try {
        const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
          method: "HEAD",
        });
        results.push({
          name: "Auth Service",
          status: response.status !== 404 ? "success" : "error",
          message: response.status !== 404 ? "✅ Auth service available" : "❌ Auth service not found",
          details: `Endpoint status: ${response.status}`,
        });
      } catch (error) {
        results.push({
          name: "Auth Service",
          status: "error",
          message: "❌ Auth service unreachable",
          details: error instanceof Error ? error.message : "Unknown error",
        });
      }

      setDiagnostics(results);
      setLoading(false);
    };

    runDiagnostics();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const hasErrors = diagnostics.some((d) => d.status === "error");
  const hasWarnings = diagnostics.some((d) => d.status === "warning");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="gradient-hero text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">System Diagnostic</h1>
          <p className="text-sm opacity-90">Check your app configuration and connectivity</p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            {loading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p>Running diagnostics...</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {hasErrors && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      ❌ {diagnostics.filter((d) => d.status === "error").length} error(s) found. Check details below.
                    </AlertDescription>
                  </Alert>
                )}

                {hasWarnings && !hasErrors && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      ⚠️ {diagnostics.filter((d) => d.status === "warning").length} warning(s). May need attention.
                    </AlertDescription>
                  </Alert>
                )}

                {!hasErrors && !hasWarnings && (
                  <Alert>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <AlertDescription>✅ All systems operational</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  {diagnostics.map((diagnostic, index) => (
                    <Card key={index} className={`border-2 ${getStatusColor(diagnostic.status)}`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(diagnostic.status)}
                          <div>
                            <CardTitle className="text-lg">{diagnostic.name}</CardTitle>
                            <CardDescription>{diagnostic.message}</CardDescription>
                          </div>
                          <Badge
                            className="ml-auto"
                            variant={
                              diagnostic.status === "success"
                                ? "default"
                                : diagnostic.status === "error"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {diagnostic.status.toUpperCase()}
                          </Badge>
                        </div>
                      </CardHeader>
                      {diagnostic.details && (
                        <CardContent>
                          <code className="text-sm bg-muted p-2 rounded block break-all">{diagnostic.details}</code>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>What to Do Next</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    {hasErrors && (
                      <div>
                        <p className="font-semibold mb-2">❌ Errors Found:</p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Backend server may not be running on port 5050</li>
                          <li>Run: `cd backend && npm run dev`</li>
                          <li>Check .env.local has: VITE_API_BASE_URL=http://localhost:5050</li>
                        </ul>
                      </div>
                    )}
                    {hasWarnings && !hasErrors && (
                      <div>
                        <p className="font-semibold mb-2">⚠️ Warnings:</p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {!diagnostics.find((d) => d.name === "Auth Token") && (
                            <li>Not logged in - go to /signin to login</li>
                          )}
                          {diagnostics.find((d) => d.name === "Loan Packages")?.status === "warning" && (
                            <li>No loan packages found - run: `npm run seed` in backend folder</li>
                          )}
                        </ul>
                      </div>
                    )}
                    {!hasErrors && !hasWarnings && (
                      <div>
                        <p className="font-semibold mb-2">✅ Everything Looks Good!</p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Frontend is connected to backend</li>
                          <li>Loan packages are loaded</li>
                          <li>Auth service is running</li>
                          <li>Try navigating to /loans to see packages</li>
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Diagnostic;
