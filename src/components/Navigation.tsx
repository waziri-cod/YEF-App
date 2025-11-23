import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, DollarSign, BookOpen, Users, LayoutDashboard, UserCircle, Menu, LogIn, UserPlus, LogOut, ShoppingBag, Lock, BarChart3 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NotificationsPanel } from "./NotificationsPanel";
// Import the bundled logo image from `src/assets` (fallback SVG is provided).
import logoPng from '@/assets/logo.svg';
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/", icon: Home, label: t("home") },
    { to: "/loans", icon: DollarSign, label: t("loans") },
    { to: "/loan-packages", icon: DollarSign, label: "Loan Packages" },
    { to: "/marketplace", icon: ShoppingBag, label: "Marketplace" },
    { to: "/courses", icon: BookOpen, label: t("courses") },
    { to: "/mentorship", icon: Users, label: t("mentorship") },
    ...(user ? [
      { to: "/dashboard", icon: LayoutDashboard, label: t("dashboard") },
      { to: "/analytics", icon: BarChart3, label: "Analytics" },
      { to: "/profile", icon: UserCircle, label: t("profile") },
      { to: "/security-settings", icon: Lock, label: "Security" },
    ] : []),
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        isScrolled 
          ? "bg-card/98 backdrop-blur-md shadow-lg border-border/50" 
          : "bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-border"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105"
          >
            <img src={logoPng} alt="YEF logo" className="h-10 w-10 rounded-lg shadow-lg object-cover" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground transition-colors duration-300">
                Youth Empower Finance
              </span>
              <span className="text-xs text-muted-foreground">
                Reducing poverty in East Africa
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "relative flex items-center px-3 py-2 rounded-md transition-all duration-300 hover:bg-accent/50",
                      isActive && "text-primary font-semibold"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full animate-in slide-in-from-left duration-300" />
                    )}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-border">
              <ThemeToggle />
              <LanguageSwitcher />
              {user && <NotificationsPanel />}
              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="transition-all duration-300 hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/signin")}
                    className="transition-all duration-300"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate("/register")}
                    className="transition-all duration-300 hover:shadow-glow"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="transition-all duration-300">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="flex items-center space-x-3 pb-4 border-b border-border">
                    <img src={logoPng} alt="YEF logo" className="h-10 w-10 rounded-lg shadow-sm object-cover" />
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-foreground">YEF</span>
                      <span className="text-xs text-muted-foreground">Youth Empower Finance</span>
                    </div>
                  </div>
                  
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300",
                        location.pathname === item.to
                          ? "bg-primary/10 text-primary font-semibold"
                          : "hover:bg-accent/50"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}

                  <div className="pt-4 border-t border-border space-y-2">
                    {user ? (
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            navigate("/signin");
                            setMobileMenuOpen(false);
                          }}
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Sign In
                        </Button>
                        <Button
                          variant="default"
                          className="w-full"
                          onClick={() => {
                            navigate("/register");
                            setMobileMenuOpen(false);
                          }}
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Register
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
