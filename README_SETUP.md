# YEF Bloom Funds - Setup Guide

## Project Overview
This is a Youth Empower Finance (YEF) platform for providing microloans to young Tanzanian entrepreneurs. The project includes:
- Animated navigation bar with smooth transitions
- Sign in and registration pages
- Firebase authentication and database integration
- AI-powered credit scoring service

## Features Implemented

### 1. Animated Navigation Bar
- Smooth scroll-based animations
- Active route highlighting with animated underline
- Mobile-responsive hamburger menu
- User authentication state display
- Sign in/Register buttons (when logged out)
- Logout button (when logged in)

### 2. Authentication System
- **Sign In Page** (`/signin`): User login with email and password
- **Registration Page** (`/register`): New user registration with validation
- Form validation using Zod and React Hook Form
- Firebase Authentication integration
- Persistent authentication state using Zustand

### 3. Database Integration (Firebase)
- Firebase Firestore for user data storage
- Firebase Authentication for user management
- Real-time authentication state synchronization

### 4. AI Integration
- OpenAI API integration for credit scoring
- AI-powered loan application analysis
- Financial advice chatbot
- Fallback mock scoring when API key is not configured

## Setup Instructions

### 1. Install Dependencies
```bash
cd yef-bloom-funds
npm install
npm install firebase
```

### 2. Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Copy your Firebase configuration

### 3. Environment Variables

Create a `.env` file in the `yef-bloom-funds` directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id

# OpenAI API Key (Optional - for AI features)
VITE_OPENAI_API_KEY=your-openai-api-key
```

### 4. Firestore Security Rules

Set up Firestore security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Run the Development Server

```bash
npm run dev
```

## Project Structure

```
yef-bloom-funds/
├── src/
│   ├── components/
│   │   ├── Navigation.tsx          # Animated navigation bar
│   │   └── ui/                      # UI components
│   ├── pages/
│   │   ├── SignIn.tsx               # Sign in page
│   │   ├── Register.tsx             # Registration page
│   │   └── ...
│   ├── store/
│   │   └── authStore.ts             # Authentication state management
│   ├── services/
│   │   ├── authService.ts           # Firebase auth service
│   │   └── aiService.ts             # AI credit scoring service
│   ├── lib/
│   │   └── firebase.ts              # Firebase configuration
│   └── App.tsx                      # Main app component
└── .env                             # Environment variables
```

## Key Features

### Navigation Bar
- Scroll-based background blur and shadow effects
- Active route indicator with animated underline
- Responsive mobile menu with slide-in animation
- User authentication state integration

### Authentication
- Email/password authentication
- Form validation with error messages
- Loading states during authentication
- Toast notifications for success/error
- Automatic redirect after login/registration

### Database
- User profiles stored in Firestore
- Real-time authentication state sync
- Secure user data access

### AI Service
- Credit score calculation
- Loan application analysis
- Financial advice chatbot
- Mock scoring fallback for development

## Usage

### Sign In
1. Navigate to `/signin`
2. Enter email and password
3. Click "Sign In"
4. Redirected to dashboard on success

### Register
1. Navigate to `/register`
2. Fill in name, email, password, and optional phone
3. Confirm password
4. Click "Create Account"
5. Redirected to dashboard on success

### Navigation
- Click navigation items to navigate
- Active route is highlighted with animated underline
- Mobile users can access menu via hamburger icon
- Sign in/Register buttons in navigation when logged out
- Logout button when logged in

## Notes

- Firebase must be properly configured for authentication to work
- AI features require OpenAI API key (optional)
- The project uses Zustand for state management
- All forms use React Hook Form with Zod validation
- Toast notifications use Sonner library

## Troubleshooting

### Firebase Not Working
- Check that environment variables are set correctly
- Verify Firebase project is created and configured
- Ensure Firestore and Authentication are enabled

### AI Service Not Working
- AI service will use mock scoring if API key is not set
- This is intentional for development
- Set `VITE_OPENAI_API_KEY` for full AI features

### Authentication Issues
- Clear browser localStorage if experiencing auth state issues
- Check Firebase console for authentication errors
- Verify Firestore security rules allow user data access

