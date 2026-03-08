# 🐛 Troubleshooting Guide - Auth & Loan Display Issues

**Last Updated**: November 22, 2025

## Current Fixes Applied ✅

1. ✅ Created `.env.local` with `VITE_API_BASE_URL=http://localhost:5050`
2. ✅ Fixed `mongodbService.ts` API base URL (was 3000, now 5050)
3. ✅ Fixed TypeScript errors in `authService.ts` (any types)
4. ✅ Added better error logging and handling
5. ✅ Added network error handling for failed requests

---

## 🔧 What to Check

### 1. **Backend is Running**

```bash
# Terminal 1: Check if backend is running on port 5050
curl http://localhost:5050
# Should show: Cannot GET / (or similar response, NOT "connection refused")
```

If backend is NOT running:
```bash
cd backend
npm install
npm run seed      # Create test data
npm run dev       # Start backend
```

**Verify output shows:**
```
Server listening on port 5050
```

---

### 2. **Frontend Environment Variables**

Check that `.env.local` exists in the root folder:

```bash
cat .env.local
# Should show:
# VITE_API_BASE_URL=http://localhost:5050
```

If missing, create it:
```bash
echo "VITE_API_BASE_URL=http://localhost:5050" > .env.local
```

Then **restart frontend dev server** for changes to take effect.

---

### 3. **Test the Auth Endpoints**

Open your browser DevTools (F12) and run:

```javascript
// In browser console:

// Test register
fetch('http://localhost:5050/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'test123',
    name: 'Test User'
  })
})
.then(r => r.json())
.then(d => console.log('Success:', d))
.catch(e => console.error('Error:', e))

// Test login
fetch('http://localhost:5050/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@yef.local',
    password: 'user123'
  })
})
.then(r => r.json())
.then(d => console.log('Success:', d))
.catch(e => console.error('Error:', e))

// Test get packages
fetch('http://localhost:5050/api/loan-packages')
.then(r => r.json())
.then(d => console.log('Packages:', d))
.catch(e => console.error('Error:', e))
```

---

### 4. **Check Browser Console**

When you try to login/register:

1. **Open DevTools** (F12)
2. Go to **Console** tab
3. Look for error messages that show:
   - `Registration error:` or `Login error:` 
   - Network errors
   - CORS issues
   - 404/500 HTTP errors

Copy the exact error message and check below.

---

## 🔍 Common Issues & Solutions

### Issue: "Failed to create account" / "Failed to sign in"

**Diagnosis:**
1. Check backend is running: `curl http://localhost:5050`
2. Check .env.local has correct URL
3. Check browser console for exact error

**Solution:**
```bash
# Backend
cd backend
npm run dev

# Frontend (in new terminal)
npm run dev

# Restart both if you changed .env.local
```

---

### Issue: "TypeError: Cannot read property 'id' of undefined"

**Cause**: Backend response missing expected fields

**Check backend response format:**
```javascript
// In browser console:
fetch('http://localhost:5050/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'user@yef.local', password: 'user123' })
})
.then(r => r.json())
.then(d => {
  console.log('Full response:', JSON.stringify(d, null, 2))
  console.log('User data:', d.user)
  console.log('Token:', d.token)
})
```

**Expected response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@yef.local",
    "name": "Test User",
    "phone": "+255700000000"
  }
}
```

If not matching, check `backend/src/routes/auth.ts` returns correct format.

---

### Issue: "CORS error" or "No Access-Control-Allow-Origin"

**Cause**: Backend CORS not configured for frontend origin

**Check:** Backend is running and showing:
```
Server listening on port 5050
```

If you see CORS errors in console, restart backend:
```bash
cd backend
npm run dev
```

---

### Issue: Loan packages not displaying

**Step 1: Check database has data**
```javascript
// Browser console:
fetch('http://localhost:5050/api/loan-packages')
.then(r => r.json())
.then(d => console.log('Packages:', JSON.stringify(d, null, 2)))
```

Should show 8 packages. If empty array, seed the database:
```bash
cd backend
npm run seed
```

**Step 2: Check API call is being made**
Open DevTools Network tab, go to /loans page, look for:
- Network request to `http://localhost:5050/api/loan-packages`
- Should be green (200 status)

If red (404/500), check backend is running.

---

### Issue: "Module not found" errors in terminal

**Solution:**
```bash
npm install
npm run dev
```

---

### Issue: Backend won't start / "Cannot find module"

**Solution:**
```bash
cd backend
npm install  # Install dependencies
npm run seed # Create test data
npm run dev  # Start
```

---

## ✅ Full Testing Checklist

### Backend Setup
- [ ] Ran `cd backend && npm install`
- [ ] Created `.env` with `MONGODB_URI` (MongoDB Atlas or local)
- [ ] Ran `npm run seed` (see "✅ Seeding completed")
- [ ] Backend starts with `npm run dev` (port 5050)
- [ ] No errors in backend console

### Frontend Setup
- [ ] `.env.local` exists with `VITE_API_BASE_URL=http://localhost:5050`
- [ ] Frontend starts with `npm run dev`
- [ ] No errors in frontend console

### Auth Testing
- [ ] Can navigate to `/register`
- [ ] Can register new user (or use `user@yef.local` / `user123`)
- [ ] After login, redirects to `/dashboard`
- [ ] Name appears in top right corner
- [ ] Can click "Loans" in navigation

### Loans Testing
- [ ] Navigate to `/loans`
- [ ] See loan packages loading (loading skeletons briefly appear)
- [ ] 8 loan packages display
- [ ] Each package shows: name, description, interest rate, duration
- [ ] Can click "Apply Now" button

---

## 🐛 Debug Commands

### Check what API base URL is being used

```javascript
// Browser console:
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL)
```

Should show: `http://localhost:5050`

### Check token is being stored

```javascript
// Browser console:
console.log('Token:', localStorage.getItem('authToken'))
```

Should show JWT token after login.

### Check auth store state

```javascript
// Browser console (after login):
// This depends on your app, but try:
console.log(localStorage)
// Look for items with keys starting with "auth-"
```

---

## 📞 Need More Help?

1. **Check the backend logs** - They show what's happening on the server
2. **Check the browser console** - They show frontend errors
3. **Check network tab** - Shows API requests and responses
4. **Run the curl tests above** - Confirms backend is working

---

## 🚀 Quick Reset

If everything is broken, try a full reset:

```bash
# Stop both servers (Ctrl+C)

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run seed
npm run dev

# Frontend (new terminal)
npm install
npm run dev

# Check .env.local
cat .env.local
# Should have: VITE_API_BASE_URL=http://localhost:5050
```

---

**Still not working?** Check the error messages in:
1. Terminal where backend runs
2. Terminal where frontend runs  
3. Browser DevTools Console
4. Browser DevTools Network tab

The exact error message will help pinpoint the issue.
