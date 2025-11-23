import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DollarSign,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Download,
  X,
} from "lucide-react";
import { loanPackageService, loanApplicationService } from "@/services/mongodbService";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

interface DocumentUpload {
  name: string;
  size: number;
  type: string;
  data: string;
}

interface LoanPackage {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  minAmount: number;
  maxAmount: number;
  interestRate: number;
  duration: number;
  category: string;
  features: string[];
  requirements: string[];
  type?: string;
}


const loanApplicationSchema = z.object({
  loanPackageId: z.string().min(1, "Please select a loan package"),
  loanAmount: z.coerce.number().min(100000, "Minimum loan amount is 100,000 TZS"),
  loanPurpose: z.string().min(10, "Please describe the loan purpose"),
  businessName: z.string().min(2, "Business name required").optional(),
  businessDescription: z.string().optional(),
  monthlyIncome: z.coerce.number().min(50000, "Minimum monthly income is 50,000 TZS"),
  repaymentMonths: z.coerce.number().min(6, "Minimum repayment period is 6 months").max(60, "Maximum 60 months"),
  documents: z.array(z.string()).min(1, "Please upload at least one document"),
  agreeTerms: z.boolean().refine(v => v === true, "You must agree to the terms"),
});

type LoanApplicationFormValues = z.infer<typeof loanApplicationSchema>;

export const LoanApplicationForm = ({ packageId }: { packageId?: string }) => {
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<DocumentUpload[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [applicationStep, setApplicationStep] = useState<"form" | "documents" | "review" | "submitted">("form");
  const [loanPackages, setLoanPackages] = useState<LoanPackage[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<LoanPackage | null>(null);

  const form = useForm<LoanApplicationFormValues>({
    resolver: zodResolver(loanApplicationSchema),
    defaultValues: {
      loanPackageId: packageId || "",
      loanAmount: 0,
      loanPurpose: "",
      businessName: "",
      businessDescription: "",
      monthlyIncome: 0,
      repaymentMonths: 12,
      documents: [],
      agreeTerms: false,
    },
  });

  // Fetch loan packages on mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoadingPackages(true);
        const packages = await loanPackageService.getAllPackages();
        setLoanPackages(packages);
      } catch (err) {
        console.error("Failed to fetch loan packages:", err);
        toast.error("Failed to load loan packages");
      } finally {
        setLoadingPackages(false);
      }
    };

    fetchPackages();
  }, []);

  // Update selected package when package ID changes
  const packageId_value = form.watch("loanPackageId");
  useEffect(() => {
    if (packageId_value) {
      const pkg = loanPackages.find(p => (p._id || p.id) === packageId_value);
      setSelectedPackage(pkg || null);
    } else {
      setSelectedPackage(null);
    }
  }, [packageId_value, loanPackages]);

  const loanAmount = form.watch("loanAmount");
  const monthlyIncome = form.watch("monthlyIncome");
  const repaymentMonths = form.watch("repaymentMonths");

  // Calculate debt-to-income ratio
  const debtToIncomeRatio = monthlyIncome > 0 ? (loanAmount / (monthlyIncome * 12)) * 100 : 0;

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onprogress = (event) => {
          if (event.lengthComputable) {
            setUploadProgress((event.loaded / event.total) * 100);
          }
        };
        reader.onload = () => {
          const docData: DocumentUpload = {
            name: file.name,
            size: file.size,
            type: file.type,
            data: reader.result as string,
          };
          setUploadedDocs(prev => [...prev, docData]);
          setUploadProgress(0);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeDocument = (index: number) => {
    setUploadedDocs(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (values: LoanApplicationFormValues) => {
    if (!user) {
      toast.error("Please log in to apply for a loan");
      return;
    }

    try {
      setIsSubmitting(true);
      setApplicationStep("review");

      // Submit loan application to MongoDB
      const application = await loanApplicationService.createApplication({
        userId: user.id,
        packageId: values.loanPackageId,
        amount: values.loanAmount,
        purpose: values.loanPurpose,
        businessInfo: values.businessDescription,
        monthlyIncome: values.monthlyIncome,
        repaymentMonths: values.repaymentMonths,
        documents: uploadedDocs.map((doc) => doc.name),
        status: "pending",
        applicationDate: new Date(),
      });

      // Update application step
      setApplicationStep("submitted");

      toast.success("Loan application submitted successfully!");

      // Reset form after 3 seconds
      setTimeout(() => {
        form.reset();
        setUploadedDocs([]);
        setApplicationStep("form");
      }, 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to submit application";
      toast.error(errorMessage);
      setApplicationStep("form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Loan Application</h2>
          <div className="flex gap-2">
            <Badge variant={applicationStep === "form" ? "default" : "outline"}>Step 1: Details</Badge>
            <Badge variant={applicationStep === "documents" ? "default" : "outline"}>Step 2: Documents</Badge>
            <Badge variant={applicationStep === "review" ? "default" : "outline"}>Step 3: Review</Badge>
          </div>
        </div>
        <Progress value={applicationStep === "form" ? 33 : applicationStep === "documents" ? 66 : 100} />
      </div>

      {/* Submitted State */}
      {applicationStep === "submitted" && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-12 h-12 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">Application Submitted!</h3>
                <p className="text-green-800 text-sm">
                  Your loan application has been received. We'll review it shortly and contact you with updates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {applicationStep !== "submitted" && (
        <Card>
          <CardHeader>
            <CardTitle>Apply for a Loan</CardTitle>
            <CardDescription>
              Fill out the form below to start your loan application. All fields are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Loan Details */}
                {(applicationStep === "form" || applicationStep === "review") && (
                  <>
                    {/* Loan Package Selection */}
                    <FormField
                      control={form.control}
                      name="loanPackageId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Loan Package</FormLabel>
                          {loadingPackages ? (
                            <Skeleton className="h-10 w-full" />
                          ) : (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose a loan type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {loanPackages.length > 0 ? (
                                  loanPackages.map(pkg => (
                                    <SelectItem key={pkg._id || pkg.id} value={pkg._id || pkg.id || ""}>
                                      {pkg.name} ({pkg.category || pkg.type})
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem value="" disabled>
                                    No loan packages available
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Package Info */}
                    {selectedPackage && (
                      <Alert className="bg-blue-50 border-blue-200">
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-900">
                          <strong>{selectedPackage.name}</strong>: Interest rate {selectedPackage.interestRate}% p.a., 
                          Duration {selectedPackage.duration} months
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Loan Amount */}
                    <FormField
                      control={form.control}
                      name="loanAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Requested Loan Amount (TZS)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                type="number"
                                placeholder="1,000,000"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          {selectedPackage && loanAmount > 0 && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {loanAmount >= selectedPackage.minAmount && loanAmount <= selectedPackage.maxAmount ? (
                                <span className="text-green-600">✓ Within approved range</span>
                              ) : (
                                <span className="text-red-600">
                                  Must be between {selectedPackage.minAmount.toLocaleString()} - {selectedPackage.maxAmount.toLocaleString()} TZS
                                </span>
                              )}
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Loan Purpose */}
                    <FormField
                      control={form.control}
                      name="loanPurpose"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loan Purpose</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe what you'll use this loan for"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Business Information */}
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your business name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="monthlyIncome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Income (TZS)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Repayment Terms */}
                    <FormField
                      control={form.control}
                      name="repaymentMonths"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Repayment Period (Months)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="12"
                              min="6"
                              max="60"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Loan Summary */}
                    {loanAmount > 0 && monthlyIncome > 0 && selectedPackage && (
                      <Card className="bg-gray-50">
                        <CardContent className="pt-6">
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span>Loan Amount:</span>
                              <span className="font-semibold">{loanAmount.toLocaleString()} TZS</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Interest Rate:</span>
                              <span className="font-semibold">{selectedPackage.interestRate}% p.a.</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Debt-to-Income Ratio:</span>
                              <span className={`font-semibold ${debtToIncomeRatio > 40 ? "text-red-600" : "text-green-600"}`}>
                                {debtToIncomeRatio.toFixed(1)}%
                              </span>
                            </div>
                            <div className="border-t pt-3 flex justify-between">
                              <span>Monthly Income:</span>
                              <span className="font-semibold">{monthlyIncome.toLocaleString()} TZS</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </>
                )}

                {/* Step 2: Documents */}
                {(applicationStep === "documents" || applicationStep === "review") && (
                  <div className="space-y-4">
                    <FormItem>
                      <FormLabel>Required Documents</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-gray-50 transition cursor-pointer relative">
                          <input
                            type="file"
                            multiple
                            onChange={handleDocumentUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          />
                          <Download className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
                          <p className="font-medium">Drag files here or click to upload</p>
                          <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
                          {uploadProgress > 0 && (
                            <Progress value={uploadProgress} className="mt-2" />
                          )}
                        </div>
                      </FormControl>
                    </FormItem>

                    {/* Uploaded Documents */}
                    {uploadedDocs.length > 0 && (
                      <div className="space-y-2">
                        <p className="font-medium text-sm">Uploaded Documents ({uploadedDocs.length})</p>
                        {uploadedDocs.map((doc, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm truncate">{doc.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDocument(idx)}
                            >
                              ✕
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Terms & Conditions */}
                <FormField
                  control={form.control}
                  name="agreeTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">I agree to the loan terms and conditions</FormLabel>
                        <p className="text-xs text-muted-foreground">
                          I understand the interest rate, repayment schedule, and penalties for late payment.
                        </p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="flex gap-3 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    disabled={isSubmitting}
                  >
                    Clear Form
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || uploadedDocs.length === 0}
                    className="ml-auto gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoanApplicationForm;
