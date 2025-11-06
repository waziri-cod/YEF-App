import { Link, useLocation } from "react-router-dom";
import { NavLink } from "./NavLink";
import { Home, DollarSign, BookOpen, Users, LayoutDashboard, UserCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";

export function Navigation() {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { to: "/", icon: Home, label: t("home") },
    { to: "/loans", icon: DollarSign, label: t("loans") },
    { to: "/courses", icon: BookOpen, label: t("courses") },
    { to: "/mentorship", icon: Users, label: t("mentorship") },
    { to: "/dashboard", icon: LayoutDashboard, label: t("dashboard") },
    { to: "/profile", icon: UserCircle, label: t("profile") },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-hero flex items-center justify-center text-white font-bold text-xl">
              YEF
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">Youth Empower Finance</span>
              <span className="text-xs text-muted-foreground">Reducing poverty in East Africa</span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink key={item.to} {...item} />
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
