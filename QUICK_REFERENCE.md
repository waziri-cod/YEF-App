# ⚡ YEF Bloom Funds - Quick Reference Guide

## 🚀 Start Development (30 seconds)

```powershell
# 1. Install dependencies
npm install

# 2. Create .env.local with Firebase credentials
# See DEPLOYMENT_GUIDE.md for exact keys needed

# 3. Run development server
npm run dev

# Visit: http://localhost:5173
```

---

## 🗺️ Navigation Quick Map

| Page | Route | Purpose |
|------|-------|---------|
| **Home** | `/` | Landing page |
| **Sign In** | `/signin` | Login page |
| **Register** | `/register` | New user registration |
| **Dashboard** | `/dashboard` | User home |
| **Profile** | `/profile` | User profile settings |
| **Loans** | `/loans` | Main loans page |
| **Loan Packages** | `/loan-packages` | Browse all loan types |
| **Marketplace** | `/marketplace` | Product/service listing |
| **Admin** | `/admin/dashboard` | Management dashboard |
| **Analytics** | `/analytics` | Business insights |
| **Security** | `/security-settings` | Biometric setup |

---

## 📦 Component Usage Quick Guide

### Search & Filter
```tsx
import { SearchAndFilter } from "@/components/SearchAndFilter";

<SearchAndFilter
  items={items}
  onItemsChange={setFiltered}
  categories={["products", "services"]}
  showPriceFilter={true}
/>
```

### Real-Time Notifications
```tsx
import { useRealTimeNotifications } from "@/hooks/useRealTimeNotifications";

const { notifications, stats, unreadNotifications } = useRealTimeNotifications();
// Automatically updates with Firestore listener
```

### Notifications Panel
```tsx
import { NotificationsPanel } from "@/components/NotificationsPanel";

<NotificationsPanel /> // Automatically fetches user's notifications
```

### Analytics Dashboard
```tsx
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";

<AnalyticsDashboard /> // Shows all charts and metrics
```

---

## 🔐 Authentication Quick Start

```tsx
import { useAuthStore } from "@/store/authStore";

export function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>Welcome, {user?.name}!</div>
  );
}
```

---

## 🗄️ Firestore Service Quick Reference

### Loans
```typescript
import { loanService } from "@/services/firestoreService";

// Create loan
const loanId = await loanService.createLoanApplication(userId, packageId, amount, docs);

// Get loan
const loan = await loanService.getLoan(loanId);

// Get all client loans
const loans = await loanService.getClientLoans(userId);

// Update status
await loanService.updateLoanStatus(loanId, "approved");

// Record payment
await loanService.recordPayment(loanId, amount, method);

// Get payment history
const payments = await loanService.getPaymentHistory(loanId);
```

### Marketplace
```typescript
import { marketplaceService } from "@/services/firestoreService";

// Create listing
const itemId = await marketplaceService.createListItem(vendorId, itemData);

// Search items
const results = await marketplaceService.searchItems("vegetables", "products");

// Add review
await marketplaceService.addReview(itemId, userId, rating, comment);
```

### Notifications
```typescript
import { notificationService } from "@/services/firestoreService";

// Create notification
await notificationService.createNotification(userId, {
  type: "loan_approved",
  title: "Loan Approved",
  message: "Your loan has been approved!"
});

// Get user notifications
const notifs = await notificationService.getUserNotifications(userId);

// Mark as read
await notificationService.markNotificationAsRead(notificationId);
```

---

## 🎨 Styling Quick Tips

### Tailwind Classes
```tsx
// Container
<div className="container mx-auto px-4">

// Responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Flexbox
<div className="flex items-center justify-between gap-4">

// Colors
<div className="bg-primary text-white">
<div className="text-muted-foreground">
<div className="border border-border">
```

### shadcn/ui Components
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
```

---

## 📝 Form Validation Quick Pattern

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  amount: z.number().min(100000, "Minimum 100K TZS"),
});

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", amount: 0 },
  });

  const onSubmit = async (data) => {
    // Handle form submission
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input {...form.register("name")} />
      {form.formState.errors.name && <p>{form.formState.errors.name.message}</p>}
    </form>
  );
}
```

---

## 🧪 Common Development Tasks

### Add New Page
1. Create `src/pages/NewPage.tsx`
2. Import in `src/App.tsx`
3. Add route in `AppContent`
4. Add navigation link in `src/components/Navigation.tsx`

### Add New Component
1. Create in `src/components/MyComponent.tsx`
2. Export as named export
3. Import where needed
4. Use with props

### Add New Firestore Collection
1. Create in Firestore Console
2. Add schema in service file
3. Create CRUD functions
4. Use in components

### Connect to Firestore
1. Get credentials from Firebase Console
2. Add to `.env.local`
3. Verify in `src/lib/firebase.ts`
4. Test connection

---

## 🐛 Debugging Tips

### Check User Auth
```typescript
const { user } = useAuthStore();
console.log("Current user:", user);
```

### Monitor Firestore Calls
```typescript
// Firebase should log to console in dev mode
// Check Network tab in browser DevTools
```

### Debug Components
```tsx
console.log("Component mounted");
console.log("Data:", data);
console.log("Loading:", loading);
```

### Check Environment Variables
```typescript
console.log(import.meta.env.VITE_FIREBASE_API_KEY);
```

---

## 📊 Key File Locations

```
src/
├── components/          # All React components
├── pages/              # Page components
├── services/           # Firestore & API services
├── hooks/              # Custom React hooks
├── store/              # Zustand state management
├── lib/                # Utilities and Firebase config
├── data/               # Static data and constants
└── config/             # App configuration
```

---

## 🔗 Important Links

- **Firebase Console**: https://console.firebase.google.com
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com
- **React Router**: https://reactrouter.com
- **Firebase Docs**: https://firebase.google.com/docs

---

## 📋 Pre-Deployment Checklist

- [ ] Install dependencies: `npm install`
- [ ] Environment variables set in `.env.local`
- [ ] Build succeeds: `npm run build`
- [ ] Dev server works: `npm run dev`
- [ ] All routes accessible
- [ ] No console errors
- [ ] Forms validate correctly
- [ ] Responsive on mobile
- [ ] Firebase collections created
- [ ] Security rules deployed

---

## 🚢 Deployment (Choose One)

### Vercel (Recommended)
```powershell
npm install -g vercel
vercel
# Follow prompts to connect and deploy
```

### Firebase Hosting
```powershell
firebase init hosting
firebase deploy
```

### Netlify
```powershell
# Connect Git repo to Netlify
# Build command: npm run build
# Publish directory: dist
```

---

## 💻 Build & Preview

```powershell
# Development
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type check
npm run type-check

# Lint
npm run lint
```

---

## 🆘 Troubleshooting

### "Module not found" error
```
Solution: npm install
Restart: npm run dev
```

### "Firebase is not initialized"
```
Check: src/lib/firebase.ts
Verify: .env.local has VITE_FIREBASE_* keys
```

### "Permission denied" in Firestore
```
Update: Firestore security rules
Check: User is authenticated
```

### "Route not working"
```
Add: Route in App.tsx
Add: Link in Navigation.tsx
Restart: Development server
```

### "Component not displaying"
```
Check: Component import path
Verify: Component exports correctly
Test: In browser console
```

---

## 📞 Getting Help

1. **Check Documentation**
   - Read `DOCUMENTATION_INDEX.md`
   - Review `DEPLOYMENT_GUIDE.md`

2. **Check Code Comments**
   - JSDoc comments in all functions
   - Usage examples in components

3. **Check Console**
   - Browser DevTools console
   - Firebase console logs

4. **Check Component Files**
   - Look at similar components
   - Copy and modify patterns

---

## ⚙️ Configuration Files

- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `eslint.config.js` - ESLint rules
- `postcss.config.js` - PostCSS configuration
- `.env.local` - Environment variables (create this)

---

## 🎯 Quick Commands

```powershell
# Install all dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check

# Format code (if configured)
npm run format

# Lint code (if configured)
npm run lint
```

---

## 📱 Testing on Mobile

```powershell
# Get local IP
ipconfig

# Access from mobile
http://<YOUR_LOCAL_IP>:5173

# Or use ngrok for public URL
ngrok http 5173
```

---

## 🔒 Security Reminders

✅ **Do**:
- Keep `.env.local` private
- Use environment variables for secrets
- Enable Firestore security rules
- Validate user input on backend
- Use HTTPS in production

❌ **Don't**:
- Commit `.env.local` to Git
- Expose API keys in code
- Trust client-side validation alone
- Store passwords in plain text
- Disable security rules

---

## 📈 Performance Tips

- Use lazy loading for images
- Implement pagination for lists
- Debounce search input
- Use React.memo for expensive components
- Enable Firestore caching
- Minimize bundle size
- Use CDN for static assets

---

## 🎓 Learning Path

1. **Understand the Architecture**
   - Read `CODE_ORGANIZATION.md`
   - Review project structure

2. **Learn Key Components**
   - Start with simple components
   - Move to complex ones
   - Study patterns and conventions

3. **Practice with Features**
   - Add a new simple component
   - Connect to Firestore
   - Add to navigation

4. **Deploy & Monitor**
   - Deploy to staging
   - Test thoroughly
   - Monitor in production

---

## 🎉 You're Ready!

Everything is set up and ready to go. Choose your starting point:

1. **Quick Start**: Follow `QUICK_START.md`
2. **Setup**: Follow `SETUP_INSTRUCTIONS.md`
3. **Deploy**: Follow `DEPLOYMENT_GUIDE.md`
4. **Learn**: Read `CODE_ORGANIZATION.md`

---

**Happy Coding! 🚀**

Last Updated: November 11, 2025
