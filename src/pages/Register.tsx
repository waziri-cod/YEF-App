import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuthStore } from "@/store/authStore";
import { UserPlus, Loader2, Mail, Lock, User, Phone, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

interface FeedbackState {
  show: boolean;
  type: "processing" | "success" | "error";
  title: string;
  message: string;
}

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>({
    show: false,
    type: "processing",
    title: "",
    message: "",
  });

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setError(null);
      
      // Show processing dialog
      setFeedback({
        show: true,
        type: "processing",
        title: "Creating Your Account",
        message: "Please wait while we set up your YEF profile...",
      });

      await register(
        values.email,
        values.password,
        values.name,
        values.phone || undefined
      );

      // Show success dialog
      setFeedback({
        show: true,
        type: "success",
        title: "Account Created Successfully! 🎉",
        message: "Welcome to YEF! Your journey to financial empowerment starts now. Let's redirect you to your dashboard.",
      });

      // Auto-redirect after 2 seconds
      setTimeout(() => {
        setFeedback({ ...feedback, show: false });
        navigate("/dashboard");
      }, 2000);

      toast.success("Account created successfully! Welcome to YEF!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create account. Please try again.";
      setError(errorMessage);
      
      // Show error dialog
      setFeedback({
        show: true,
        type: "error",
        title: "Registration Failed",
        message: errorMessage,
      });

      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-lg border-border">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-lg bg-gradient-hero flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                YEF
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Create Your Account</CardTitle>
            <CardDescription>
              Join thousands of young entrepreneurs building successful businesses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            type="text"
                            placeholder="John Doe"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            type="tel"
                            placeholder="+255 123 456 789"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary hover:underline font-semibold">
                Sign in here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Feedback Dialog */}
      <Dialog open={feedback.show} onOpenChange={(open) => !open && setFeedback({ ...feedback, show: false })}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">{feedback.title}</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center gap-4 py-6">
            {/* Icon based on feedback type */}
            {feedback.type === "processing" && (
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 animate-pulse">
                <Loader className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            )}
            
            {feedback.type === "success" && (
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            )}
            
            {feedback.type === "error" && (
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            )}

            {/* Message */}
            <p className="text-center text-muted-foreground">
              {feedback.message}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            {feedback.type === "success" && (
              <Button 
                className="gap-2"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
            
            {feedback.type === "error" && (
              <Button 
                variant="outline"
                onClick={() => setFeedback({ ...feedback, show: false })}
              >
                Try Again
              </Button>
            )}
            
            {feedback.type === "processing" && (
              <p className="text-sm text-muted-foreground">Please wait...</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Register;

