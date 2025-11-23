# 🎯 START HERE - Quick Setup Guide

## What You Need

1. **Node.js** (includes npm) - [Download Node.js](https://nodejs.org/)
   - OR **Bun** - [Download Bun](https://bun.sh/)

## Quick Setup (3 Steps)

### Step 1: Install Dependencies

Open terminal/command prompt in the `yef-bloom-funds` folder and run:

```bash
npm install
```

OR if you have Bun:

```bash
bun install
```

### Step 2: Set Up Firebase

1. Go to https://console.firebase.google.com/
2. Create a new project
3. Enable **Email/Password** authentication
4. Create a **Firestore Database** (test mode is fine)
5. Get your config from Project Settings > Your apps > Web app

### Step 3: Create `.env` File

1. In `yef-bloom-funds` folder, create a file named `.env`
2. Copy this template and fill in your Firebase values:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

### Step 4: Run the App

```bash
npm run dev
```

Open http://localhost:5173 in your browser!

## ✅ What's Ready

- ✅ Animated navigation bar
- ✅ Sign In page (`/signin`)
- ✅ Registration page (`/register`)
- ✅ Firebase integration
- ✅ AI service

## 📚 More Help

- See `SETUP_INSTRUCTIONS.md` for detailed steps
- See `QUICK_START.md` for quick reference
- See `README_SETUP.md` for full documentation

## 🆘 Problems?

**"npm not found"** → Install Node.js from nodejs.org

**"Firebase error"** → Check your `.env` file has correct values

**"Module not found"** → Run `npm install` again

**Need more help?** → Check `SETUP_INSTRUCTIONS.md`

