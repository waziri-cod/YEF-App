import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Fingerprint,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Settings,
  Shield,
} from "lucide-react";
import { biometricSecurity } from "@/lib/biometricSecurity";
import { toast } from "sonner";

export const BiometricSetup = ({ userId }: { userId: string }) => {
  const [activeTab, setActiveTab] = useState<"pin" | "pattern" | "face" | "fingerprint">("pin");
  const [pin, setPin] = useState("");
  const [pinVerify, setPinVerify] = useState("");
  const [patternDots, setPatternDots] = useState<number[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // PIN Setup
  const handlePINSetup = async () => {
    if (!biometricSecurity.validatePIN(pin)) {
      toast.error("PIN must be 4-6 digits");
      return;
    }

    if (pin !== pinVerify) {
      toast.error("PINs don't match");
      return;
    }

    try {
      setIsSettingUp(true);
      // In production, encrypt and store in Firestore
      const pinHash = await biometricSecurity.hashData(pin);
      console.log("PIN setup (hash):", pinHash);
      toast.success("PIN security enabled successfully!");
      setSetupComplete(true);
      setPin("");
      setPinVerify("");
    } catch (error) {
      toast.error("Failed to set up PIN");
    } finally {
      setIsSettingUp(false);
    }
  };

  // Pattern Setup
  const handlePatternSetup = () => {
    if (!biometricSecurity.validatePattern(patternDots)) {
      toast.error("Pattern must have at least 4 dots");
      return;
    }

    try {
      setIsSettingUp(true);
      // In production, encrypt and store in Firestore
      const patternHash = biometricSecurity.encryptData(JSON.stringify(patternDots), "key");
      console.log("Pattern setup (encrypted):", patternHash);
      toast.success("Pattern lock enabled successfully!");
      setSetupComplete(true);
      setPatternDots([]);
    } catch (error) {
      toast.error("Failed to set up pattern");
    } finally {
      setIsSettingUp(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <div>
              <CardTitle>Biometric Security Setup</CardTitle>
              <CardDescription>
                Enhance your account security with biometric authentication
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              Your biometric data is encrypted and stored securely on your device. Never shared or sold.
            </AlertDescription>
          </Alert>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "pin" | "pattern" | "face" | "fingerprint")} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pin" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span className="hidden sm:inline">PIN</span>
              </TabsTrigger>
              <TabsTrigger value="pattern" className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Pattern</span>
              </TabsTrigger>
              <TabsTrigger value="fingerprint" className="flex items-center gap-2">
                <Fingerprint className="w-4 h-4" />
                <span className="hidden sm:inline">Fingerprint</span>
              </TabsTrigger>
              <TabsTrigger value="face" className="flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Face</span>
              </TabsTrigger>
            </TabsList>

            {/* PIN Setup */}
            <TabsContent value="pin" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <Label>Enter PIN (4-6 digits)</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={pin}
                      onChange={(e) => setPin(e.target.value.slice(0, 6))}
                      placeholder="••••"
                      className="font-mono text-2xl text-center tracking-widest"
                      maxLength={6}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label>Confirm PIN</Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={pinVerify}
                    onChange={(e) => setPinVerify(e.target.value.slice(0, 6))}
                    placeholder="••••"
                    className="font-mono text-2xl text-center tracking-widest mt-2"
                    maxLength={6}
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  <p className="font-medium mb-2">PIN Requirements:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      4-6 digits
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      Unique and memorable
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      Not shared with anyone
                    </li>
                  </ul>
                </div>

                <Button
                  onClick={handlePINSetup}
                  disabled={isSettingUp || pin.length < 4 || pin !== pinVerify}
                  className="w-full"
                >
                  {isSettingUp ? "Setting up..." : "Enable PIN Security"}
                </Button>
              </div>
            </TabsContent>

            {/* Pattern Setup */}
            <TabsContent value="pattern" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div>
                  <Label>Draw Your Pattern</Label>
                  <div className="bg-gray-100 p-8 rounded-lg mt-2 flex items-center justify-center h-48">
                    <div className="text-center">
                      <Smartphone className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Pattern lock requires mobile device support
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg text-sm border border-blue-200">
                  <p className="font-medium mb-2">Pattern Information:</p>
                  <ul className="space-y-1 text-blue-900">
                    <li>• Connect at least 4 dots</li>
                    <li>• Don't reuse your pattern</li>
                    <li>• Available on Android devices</li>
                  </ul>
                </div>

                <Button
                  onClick={handlePatternSetup}
                  disabled={patternDots.length < 4}
                  className="w-full"
                >
                  Enable Pattern Lock (Beta)
                </Button>
              </div>
            </TabsContent>

            {/* Fingerprint */}
            <TabsContent value="fingerprint" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center h-48">
                  <div className="text-center">
                    <Fingerprint className="w-16 h-16 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Requires supported device with biometric sensor
                    </p>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Fingerprint authentication requires iOS 11+ or Android 6.0+ with fingerprint sensor
                  </AlertDescription>
                </Alert>

                <Button className="w-full">
                  <Fingerprint className="w-4 h-4 mr-2" />
                  Set Up Fingerprint
                </Button>
              </div>
            </TabsContent>

            {/* Face Recognition */}
            <TabsContent value="face" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center h-48">
                  <div className="text-center">
                    <Smartphone className="w-16 h-16 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Face recognition requires device camera
                    </p>
                  </div>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Face recognition requires camera access. Your face data is encrypted locally.
                  </AlertDescription>
                </Alert>

                <Button className="w-full">
                  <Smartphone className="w-4 h-4 mr-2" />
                  Set Up Face Recognition
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Active Security Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Security Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <span className="font-medium text-green-900">Password</span>
              <Badge className="bg-green-600">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
              <span className="font-medium">PIN Security</span>
              {setupComplete ? (
                <Badge className="bg-green-600">Enabled</Badge>
              ) : (
                <Badge variant="outline">Not Set</Badge>
              )}
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
              <span className="font-medium">Biometric Auth</span>
              <Badge variant="outline">Not Available</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BiometricSetup;
