# Quick Start Guide

## 🚀 Getting Started

### Step 1: Install Dependencies
```bash
cd yef-bloom-funds
npm install
```

### Step 2: Set Up Firebase (Required for Authentication)

1. **Create a Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Authentication:**
   - In Firebase Console, go to "Authentication"
   - Click "Get started"
   - Enable "Email/Password" sign-in method

3. **Create Firestore Database:**
   - Go to "Firestore Database"
   - Click "Create database"
   - Start in "Test mode" (for development)
   - Choose a location

4. **Get Your Firebase Config:**
   - Go to Project Settings (gear icon)
   - Scroll to "Your apps"
   - Click the web icon (`</>`)
   - Copy the config values

### Step 3: Create Environment File

Create a `.env` file in the `yef-bloom-funds` folder:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id

# Optional: For AI features
VITE_OPENAI_API_KEY=your-openai-key-here
```

### Step 4: Run the Project

```bash
npm run dev
```

The app will start at `http://localhost:5173`

## ✅ What's Working

- ✅ Animated navigation bar with scroll effects
- ✅ Sign In page (`/signin`)
- ✅ Registration page (`/register`)
- ✅ Firebase authentication integration
- ✅ AI service for credit scoring
- ✅ Responsive mobile menu

## 🎯 Test the Features

1. **Navigation:**
   - Scroll the page to see navigation animations
   - Click navigation items to see active state animations
   - On mobile, use the hamburger menu

2. **Authentication:**
   - Go to `/register` to create an account
   - Go to `/signin` to log in
   - Check the navigation bar - it shows Sign In/Register when logged out, Logout when logged in

3. **AI Features:**
   - AI service is ready (uses mock data if OpenAI key not set)
   - Credit scoring will work with or without API key

## ⚠️ Troubleshooting

### "Firebase not found" error
```bash
npm install firebase
```

### Authentication not working
- Check that `.env` file has correct Firebase config
- Verify Email/Password is enabled in Firebase Console
- Check browser console for errors

### Build errors
- Make sure all dependencies are installed: `npm install`
- Check that TypeScript is happy: `npm run lint`

## 📝 Next Steps

1. Set up Firebase (see Step 2 above)
2. Add your Firebase config to `.env`
3. Test registration and login
4. (Optional) Add OpenAI API key for full AI features

## 🆘 Need Help?

- Check `README_SETUP.md` for detailed setup
- Check browser console for error messages
- Verify all environment variables are set correctly

