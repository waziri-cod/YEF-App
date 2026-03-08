# 🚀 YEF Bloom Funds - Deployment & Setup Guide

## Quick Start

### Step 1: Install Dependencies
```powershell
npm install
# or
bun install
```

### Step 2: Environment Variables
Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Optional: OpenAI API Key (for AI features)
VITE_OPENAI_API_KEY=your_openai_key
```

### Step 3: Run Development Server
```powershell
npm run dev
# or
bun run dev
```

The app will be available at `http://localhost:5173`

---

## Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable Firestore Database
4. Enable Firebase Authentication (Email/Password)
5. Enable Firebase Storage
6. Get your credentials from Project Settings

### 2. Create Firestore Collections

Run this in Firebase Console (Firestore tab):

```firestore
Collections to create:
├── loanPackages
├── clientProfiles
├── clientLoans
├── paymentSchedules
├── paymentRecords
├── marketplaceItems
├── marketplaceReviews
├── biometricData
├── followups
├── loanFollowUpTasks
├── notifications
└── successStories
```

### 3. Initialize Pre-populated Data

Add loan packages to `loanPackages` collection:

```json
{
  "id": "edu-001",
  "name": "Education Loan",
  "description": "For school tuition and educational expenses",
  "minAmount": 500000,
  "maxAmount": 5000000,
  "interestRate": 7,
  "duration": 48,
  "category": "education",
  "features": ["Grace period", "Flexible repayment", "Educational verification"],
  "requirements": ["ID", "School enrollment", "Income verification"]
}
```

### 4. Firestore Security Rules

Deploy these rules in Firebase Console:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User can read/write their own data
    match /{document=**} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.uid == request.resource.data.userId);
    }
    
    // Public read access for loan packages and marketplace
    match /loanPackages/{document=**} {
      allow read: if true;
    }
    
    match /marketplaceItems/{document=**} {
      allow read: if true;
    }
    
    match /successStories/{document=**} {
      allow read: if true;
    }
  }
}
```

---

## Build & Deployment

### Development Build
```powershell
npm run build
npm run preview
```

### Production Deployment

#### Option 1: Vercel (Recommended)
```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

#### Option 2: Firebase Hosting
```powershell
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize Firebase
firebase init hosting

# Deploy
firebase deploy
```

#### Option 3: Netlify
```powershell
# Connect your Git repo to Netlify
# Add build command: npm run build
# Add publish directory: dist
```

---

## New Routes Added

| Route | Component | Purpose |
|-------|-----------|---------|
| `/loan-packages` | LoanPackagesPage | Browse all available loan packages |
| `/marketplace` | MarketplacePage | Client marketplace listing |
| `/admin/dashboard` | AdminPanel | Admin management dashboard |
| `/security-settings` | SecuritySettings | Biometric security setup |

---

## Feature Verification Checklist

### Before Deployment
- [ ] All environment variables set
- [ ] Firebase Firestore collections created
- [ ] Security rules deployed
- [ ] Build runs without errors: `npm run build`
- [ ] Dev server works: `npm run dev`
- [ ] Navigation links work
- [ ] Pages load correctly

### After Deployment
- [ ] Test registration flow
- [ ] Test loan application
- [ ] Test marketplace listing
- [ ] Test biometric setup
- [ ] Check admin dashboard
- [ ] Verify payments tracking
- [ ] Test success stories submission

---

## Troubleshooting

### Issue: "VITE_FIREBASE_* is undefined"
**Solution**: Create `.env.local` with Firebase credentials in project root

### Issue: "Firestore is not initialized"
**Solution**: Check Firebase initialization in `src/lib/firebase.ts`

### Issue: "Collection not found in Firestore"
**Solution**: Create collections manually in Firebase Console

### Issue: "Build fails with TypeScript errors"
**Solution**: Run `npm run build` to see specific errors, fix them

### Issue: "Routes not working"
**Solution**: Restart dev server with `npm run dev`

---

## Database Structure

### Loan Document
```typescript
{
  id: string;
  userId: string;
  packageId: string;
  amount: number;
  status: "pending" | "approved" | "disbursed" | "active" | "completed";
  applicationDate: Timestamp;
  disbursalDate?: Timestamp;
  expectedCompletionDate: Timestamp;
  monthlyPayment: number;
  documents: string[];
}
```

### Marketplace Item Document
```typescript
{
  id: string;
  vendorId: string;
  title: string;
  description: string;
  category: "products" | "services" | "business";
  price: number;
  images: string[];
  location: string;
  contact: {
    phone: string;
    email: string;
  };
  rating: number;
  reviewCount: number;
  createdAt: Timestamp;
  status: "active" | "paused" | "sold";
}
```

### Success Story Document
```typescript
{
  id: string;
  clientId: string;
  loanId?: string;
  title: string;
  story: string;
  featured: boolean;
  createdAt: Timestamp;
  likes: number;
  image?: string;
}
```

---

## Performance Optimization

### Implemented
- ✅ Code splitting with Vite
- ✅ Tree shaking for unused code
- ✅ Tailwind CSS minification
- ✅ Image optimization ready
- ✅ Lazy loading components

### Recommended
- Add service worker for offline support
- Enable image CDN (Cloudinary, Firebase Storage)
- Set up analytics (Google Analytics)
- Configure error tracking (Sentry)
- Add caching headers

---

## Security Checklist

- [ ] Environment variables not exposed
- [ ] Firestore security rules configured
- [ ] Authentication enabled
- [ ] HTTPS enabled (automatically with deployment)
- [ ] CORS configured properly
- [ ] Rate limiting considered
- [ ] Input validation active
- [ ] Sensitive data encrypted

---

## Monitoring & Maintenance

### Key Metrics to Monitor
1. **User Registrations** - Track signup growth
2. **Loan Applications** - Monitor application volume
3. **Payment Processing** - Ensure smooth transactions
4. **Error Rates** - Monitor application errors
5. **Performance** - Check page load times

### Regular Tasks
- Weekly: Review logs and errors
- Monthly: Backup data
- Quarterly: Security audit
- Yearly: Performance review

---

## Support & Resources

### Documentation
- [Firebase Docs](https://firebase.google.com/docs)
- [React Router Docs](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

### Files Reference
- **Main App**: `src/App.tsx`
- **Routes**: Check App.tsx for all routes
- **Services**: `src/services/`
- **Components**: `src/components/`
- **Pages**: `src/pages/`

---

## Next Steps

1. ✅ Set up Firebase project
2. ✅ Create Firestore collections
3. ✅ Deploy security rules
4. ✅ Set environment variables
5. ✅ Run: `npm run build`
6. ✅ Deploy to hosting
7. ✅ Test all features
8. ✅ Monitor performance

---

## Need Help?

- Check `FEATURES_IMPLEMENTATION.md` for detailed feature docs
- Review `IMPLEMENTATION_CHECKLIST.md` for step-by-step guide
- Check `COMPLETE_FEATURES_SUMMARY.md` for feature overview
- Look at existing component files for code examples

---

**Happy Deploying! 🎉**

Last Updated: November 11, 2025
