# 🚀 Quick Start Guide - MongoDB Backend Migration

Complete! Your app has been migrated from Firebase to MongoDB. Here's what you need to do to get it running.

## ⚡ 5-Minute Setup

### Step 1: Backend Setup (2 minutes)

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and add your MongoDB URI:
```
MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/yef-bloom
PORT=5050
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

### Step 2: Seed Database (30 seconds)

```bash
npm run seed
```

This creates 8 loan packages and 2 test users:
- Admin: `admin@yef.local` / `admin123`
- User: `user@yef.local` / `user123`

### Step 3: Start Backend (30 seconds)

```bash
npm run dev
# Server listening on port 5050
```

### Step 4: Frontend Setup (1 minute)

In a new terminal, from root:

```bash
# Make sure .env.local has correct API URL
cat .env.local
# Should show: VITE_API_BASE_URL=http://localhost:5050

# Start frontend
npm run dev
```

### Step 5: Test It! (1 minute)

1. Open http://localhost:5173 (or your frontend port)
2. Click "Sign In"
3. Use: `user@yef.local` / `user123`
4. You should see the dashboard
5. Go to "Loans" page → see 8 loan packages
6. Click "Apply Now" → submit application

✅ **Done!**

---

## 📁 What Changed

### New Backend Files
- `backend/src/models/User.ts` - User authentication model
- `backend/src/routes/auth.ts` - Register/Login endpoints
- `backend/src/scripts/seedData.ts` - Database setup script
- `backend/src/middleware/auth.ts` - JWT verification
- `backend/README.md` - Full API documentation
- `backend/package.json` - Added bcryptjs dependency

### Updated Frontend Files
- `src/services/authService.ts` - Now calls backend API
- `src/store/authStore.ts` - Removed Firebase, uses localStorage
- `src/pages/Loans.tsx` - Fetches packages from API
- `.env.local.example` - Uses http://localhost:5050

### Removed Firebase
- No more Firebase Auth SDK calls
- No more Firestore database reads
- No more `onAuthStateChanged` listeners

---

## 🔑 Test Credentials

**Admin Account**
- Email: `admin@yef.local`
- Password: `admin123`

**Regular User**
- Email: `user@yef.local`
- Password: `user123`

---

## 🛠️ Commands Reference

### Backend

```bash
cd backend

# Install dependencies
npm install

# Development mode (auto-reload on file changes)
npm run dev

# Build TypeScript to JavaScript
npm run build

# Run production build
npm start

# Seed database with sample data
npm run seed
```

### Frontend

```bash
# From root directory
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Check code quality
```

---

## 📊 API Endpoints Quick Reference

### Auth (No token needed)
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out

### Loan Packages (No token, public)
- `GET /api/loan-packages` - List all packages

### Loan Applications (Needs token)
- `POST /api/loan-applications` - Submit application
- `GET /api/loan-applications/user/:userId` - My applications

### Full API docs → See `backend/README.md`

---

## 🐛 Troubleshooting

### Backend won't start

```
Error: Cannot find module 'mongoose'
```

Fix:
```bash
cd backend
npm install
```

### Frontend can't connect to backend

```
CORS error or network error
```

Fix:
1. Check backend is running: `npm run dev` in backend folder
2. Check backend logs show "Server listening on port 5050"
3. Check frontend .env.local has: `VITE_API_BASE_URL=http://localhost:5050`
4. Restart frontend dev server

### MongoDB connection error

```
Error: MongoNetworkError
```

Fix:
1. Check `MONGODB_URI` in `.env` is correct
2. If using MongoDB Atlas, add your IP to IP Whitelist
3. Check credentials are correct
4. Test connection: `mongo "your-uri"`

### Port 5050 already in use

Fix:
```bash
# Change port in backend/.env
PORT=5051 npm run dev

# Then update frontend .env.local
VITE_API_BASE_URL=http://localhost:5051
```

---

## ✨ What's New

### Advantages of MongoDB Backend

✅ Complete control over business logic
✅ Better security with backend JWT validation
✅ Easier to add complex features
✅ Better scalability
✅ No Firebase costs
✅ Standard REST API (easier to test)

### All 15 Endpoints Implemented

- 3 Auth endpoints (register, login, logout)
- 5 Loan Package endpoints (CRUD + list)
- 5 Loan Application endpoints (submit, view, status, disburse)
- 3 Payment endpoints (record, list, details)
- 1 Stats endpoint (dashboard overview)

---

## 📚 Documentation

- **Backend API Details**: `backend/README.md`
- **Full Migration Info**: `FIREBASE_TO_MONGODB_MIGRATION.md`
- **Frontend Service**: `src/services/mongodbService.ts`
- **Auth Store**: `src/store/authStore.ts`

---

## 🎯 Next Steps

1. ✅ Get it running (follow setup above)
2. ✅ Test all features (auth, loans, applications)
3. ⏭️ Customize loan packages as needed
4. ⏭️ Deploy to production (Heroku, Railway, Render)
5. ⏭️ Add more features (notifications, admin dashboard, etc.)

---

## 🚀 You're Ready!

The migration is complete. Your app is now running on a modern, scalable MongoDB backend.

**Questions?** Check the detailed docs in:
- `backend/README.md` - API documentation
- `FIREBASE_TO_MONGODB_MIGRATION.md` - Migration details

**Let's build something amazing! 💪**
