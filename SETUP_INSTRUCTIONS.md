# 🚀 Setup Instructions - Step by Step

## Prerequisites

You need one of these package managers:
- **Node.js** (with npm) - [Download here](https://nodejs.org/)
- **Bun** - [Download here](https://bun.sh/) (I see you have bun.lockb, so you might prefer Bun)

## Step 1: Install Dependencies

### Option A: Using npm (if you have Node.js)
```bash
cd yef-bloom-funds
npm install
```

### Option B: Using Bun (if you have Bun)
```bash
cd yef-bloom-funds
bun install
```

## Step 2: Set Up Firebase

### 2.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name (e.g., "yef-bloom-funds")
4. Click **Continue**
5. Disable Google Analytics (optional for now)
6. Click **Create project**

### 2.2 Enable Authentication
1. In Firebase Console, click **"Authentication"** in the left menu
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. Enable it and click **"Save"**

### 2.3 Create Firestore Database
1. Click **"Firestore Database"** in the left menu
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
4. Choose a location (closest to your users)
5. Click **"Enable"**

### 2.4 Get Your Firebase Config
1. Click the **gear icon** ⚙️ next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **web icon** (`</>`)
5. Register app (give it a nickname like "YEF Web App")
6. **Copy the config values** - they look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## Step 3: Create Environment File

1. In the `yef-bloom-funds` folder, create a file named `.env`
2. Copy the contents from `.env.example`
3. Replace the placeholder values with your actual Firebase config:

```env
VITE_FIREBASE_API_KEY=AIza... (your actual apiKey)
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

**Important:** The `.env` file should be in the same folder as `package.json`

## Step 4: Run the Development Server

### Using npm:
```bash
npm run dev
```

### Using Bun:
```bash
bun run dev
```

The app will start at `http://localhost:5173`

## Step 5: Test the Application

1. **Open** `http://localhost:5173` in your browser
2. **Check the navigation bar:**
   - Scroll the page - you should see the navigation bar animate
   - Click on different menu items
3. **Test Registration:**
   - Click **"Register"** button in navigation
   - Fill in the registration form
   - Submit - you should be redirected to dashboard
4. **Test Sign In:**
   - Click **"Sign In"** button
   - Enter your credentials
   - You should be logged in

## ✅ What Should Work

- ✅ Animated navigation bar with scroll effects
- ✅ Sign In page at `/signin`
- ✅ Registration page at `/register`
- ✅ Firebase authentication (after setup)
- ✅ User data stored in Firestore
- ✅ AI credit scoring service (works with mock data if no OpenAI key)

## 🐛 Troubleshooting

### "Cannot find module 'firebase'"
**Solution:** Run `npm install` or `bun install` again

### "Firebase: Error (auth/invalid-api-key)"
**Solution:** Check your `.env` file - make sure all Firebase values are correct

### "Firebase: Error (auth/operation-not-allowed)"
**Solution:** Make sure Email/Password authentication is enabled in Firebase Console

### Port 5173 already in use
**Solution:** The dev server will automatically use the next available port, or you can specify:
```bash
npm run dev -- --port 3000
```

### Navigation not showing animations
**Solution:** Make sure you're scrolling the page - animations trigger on scroll

## 📝 Next Steps After Setup

1. **Set up Firestore Security Rules** (important for production):
   - Go to Firestore Database > Rules
   - Update rules to secure user data

2. **Optional: Add OpenAI API Key** for full AI features:
   - Get key from [OpenAI Platform](https://platform.openai.com/api-keys)
   - Add to `.env` file

3. **Test all features:**
   - Create an account
   - Sign in
   - Navigate through the app
   - Check mobile responsiveness

## 🆘 Still Need Help?

- Check browser console (F12) for error messages
- Verify `.env` file is in the correct location
- Make sure all Firebase services are enabled
- Check that dependencies are installed correctly

