# YEF Bloom Funds - Backend API

Node.js + Express + TypeScript + MongoDB backend providing REST APIs for the YEF Bloom Funds frontend.

## Features

- **Authentication**: JWT-based user registration and login with bcrypt password hashing
- **Loan Packages**: CRUD operations for loan product management
- **Loan Applications**: Loan application submission, retrieval, and status management
- **Payments**: Payment tracking and scheduling
- **Admin Dashboard**: Basic statistics and analytics endpoints

## Quick Start

### Prerequisites

- Node.js 16+ and npm (or bun)
- MongoDB Atlas account or local MongoDB instance
- Git

### 1. Installation

```bash
cd backend
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and fill in your values:

```bash
# MongoDB connection URI
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/yef-bloom

# Server port (default: 5050)
PORT=5050

# JWT secret (use a strong random string)
JWT_SECRET=your-super-secret-key-change-this

# Environment
NODE_ENV=development
```

### 3. Seed Sample Data

Populate the database with sample loan packages and test users:

```bash
npm run seed
```

This creates:

- **8 loan package types**: Startup, Growth, Emergency, Education, Entrepreneur, Agriculture, Healthcare, Housing
- **2 test users**:
  - Admin: `admin@yef.local` / `admin123` (role: admin)
  - User: `user@yef.local` / `user123` (role: user)

### 4. Start Development Server

```bash
npm run dev
```

Server will start on `http://localhost:5050`

## Available npm Scripts

```bash
npm run dev      # Start with ts-node-dev (auto-reload)
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled JavaScript (production)
npm run seed     # Populate database with sample data
```

## API Endpoints

### Authentication

**POST** `/api/auth/register`

Register a new user.

```json
{
  "email": "user@example.com",
  "password": "securepass123",
  "name": "John Doe",
  "phone": "+255700000000"
}
```

Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+255700000000"
  }
}
```

**POST** `/api/auth/login`

Login with email and password.

```json
{
  "email": "user@example.com",
  "password": "securepass123"
}
```

**POST** `/api/auth/logout`

Logout (client clears token from localStorage).

---

### Loan Packages

**GET** `/api/loan-packages`

List all available loan packages (public endpoint).

**GET** `/api/loan-packages/:id`

Get details of a specific loan package.

**POST** `/api/loan-packages` ⚙️ **[Admin Only]**

Create a new loan package.

```json
{
  "name": "Quick Start Loan",
  "description": "For new entrepreneurs",
  "minAmount": 500000,
  "maxAmount": 5000000,
  "interestRate": 8,
  "duration": 12,
  "category": "startup",
  "features": ["Quick approval", "Mentoring"],
  "requirements": ["Valid ID", "Business plan"]
}
```

**PUT** `/api/loan-packages/:id` ⚙️ **[Admin Only]**

Update an existing loan package.

**DELETE** `/api/loan-packages/:id` ⚙️ **[Admin Only]**

Delete a loan package.

---

### Loan Applications

**POST** `/api/loan-applications` 🔐 **[Authenticated]**

Submit a new loan application.

```json
{
  "loanPackage": "507f1f77bcf86cd799439011",
  "amount": 2000000,
  "purpose": "Expand my shop",
  "businessInfo": "Running a retail shop for 2 years"
}
```

**GET** `/api/loan-applications/:id` 🔐 **[Authenticated]**

Get application details (owner or admin).

**GET** `/api/loan-applications/user/:userId` 🔐 **[Authenticated]**

List user's loan applications (owner or admin).

**PATCH** `/api/loan-applications/:id/status` ⚙️ **[Admin Only]**

Update application status.

```json
{
  "status": "approved"
}
```

**POST** `/api/loan-applications/:id/disburse` ⚙️ **[Admin Only]**

Mark a loan as disbursed.

---

### Payments

**POST** `/api/payments` 🔐 **[Authenticated]**

Record a payment.

```json
{
  "loanApplication": "507f1f77bcf86cd799439011",
  "amount": 500000,
  "paymentMethod": "mobile-money",
  "description": "Monthly installment"
}
```

**GET** `/api/payments/loan/:loanAppId` 🔐 **[Authenticated]**

Get all payments for a loan application.

**GET** `/api/payments/:id` 🔐 **[Authenticated]**

Get a specific payment.

---

### Statistics

**GET** `/api/stats/overview` ⚙️ **[Admin Only]**

Get dashboard statistics.

Response:

```json
{
  "totalPackages": 8,
  "totalApplications": 42,
  "totalDisbursed": 15,
  "totalPayments": 87,
  "totalLoaned": 45000000
}
```

---

## Authentication

### How It Works

1. User registers or logs in → receives a **JWT token**
2. Frontend stores token in `localStorage` as `authToken`
3. All authenticated requests include token in `Authorization` header:

   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
   ```

4. Backend verifies token and extracts user ID and role

### Testing with cURL

```bash
# Register
curl -X POST http://localhost:5050/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'

# Login
curl -X POST http://localhost:5050/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get loan packages (public - no token needed)
curl http://localhost:5050/api/loan-packages

# Create loan package (admin only - needs token)
curl -X POST http://localhost:5050/api/loan-packages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"name":"New Package","minAmount":1000000,...}'
```

## Testing with Postman

1. Open Postman
2. Create a collection "YEF Bloom API"
3. Set base URL to `{{API_URL}}` (default: `http://localhost:5050`)
4. Use "Pre-request Script" to auto-include token:

   ```javascript
   const token = pm.environment.get("token");
   if (token) {
     pm.request.headers.add({
       key: "Authorization",
       value: `Bearer ${token}`,
     });
   }
   ```

5. After login, save the token:

   ```javascript
   var jsonData = pm.response.json();
   pm.environment.set("token", jsonData.token);
   ```

## Project Structure

```
backend/
├── src/
│   ├── db.ts                 # MongoDB connection
│   ├── server.ts             # Express app and server boot
│   ├── middleware/
│   │   └── auth.ts           # JWT verification middleware
│   ├── models/
│   │   ├── User.ts           # User model (email, password hash, role)
│   │   ├── LoanPackage.ts    # Loan product model
│   │   ├── LoanApplication.ts # Loan application model
│   │   └── Payment.ts        # Payment tracking model
│   ├── routes/
│   │   ├── auth.ts           # /api/auth endpoints
│   │   ├── loanPackages.ts   # /api/loan-packages endpoints
│   │   ├── loanApplications.ts # /api/loan-applications endpoints
│   │   ├── payments.ts       # /api/payments endpoints
│   │   └── stats.ts          # /api/stats endpoints
│   └── scripts/
│       └── seedData.ts       # Database initialization script
├── .env.example              # Environment variables template
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Connecting Frontend

In your frontend `.env.local`:

```
VITE_API_BASE_URL=http://localhost:5050
```

The frontend will automatically:

1. Send auth requests to `http://localhost:5050/api/auth/*`
2. Store JWT in localStorage
3. Include JWT in all subsequent API calls
4. Use the token to load loan packages, submit applications, etc.

## Next Steps

### Production Deployment

1. **MongoDB Atlas**: Create a production cluster and update `MONGODB_URI`
2. **Environment Variables**: Use secure secret management (AWS Secrets Manager, Heroku Config Vars, etc.)
3. **CORS**: Update allowed origins in server.ts:

   ```typescript
   app.use(
     cors({
       origin: ["https://yourdomain.com", "https://www.yourdomain.com"],
     })
   );
   ```

4. **Deploy**: Use Heroku, Railway, Render, or any Node.js hosting

### Enhancements

- [ ] Add input validation (Zod/Joi)
- [ ] Add unit and integration tests
- [ ] Implement refresh token rotation
- [ ] Add email notifications
- [ ] Add rate limiting
- [ ] Add request logging
- [ ] Add error tracking (Sentry)

## Troubleshooting

### `Cannot find module 'mongoose'`

Run `npm install` in the backend folder.

### `ECONNREFUSED` when connecting to MongoDB

- Check `MONGODB_URI` is correct
- Ensure MongoDB instance is running (if local)
- Ensure IP whitelist includes your current IP (if Atlas)
- Check network connectivity

### Port already in use

```bash
# Change PORT in .env or use a different port
PORT=5051 npm run dev
```

### TypeScript compilation errors

```bash
npm run build  # Check for syntax errors
```

## Support

For issues or questions:

1. Check the logs: `npm run dev` shows detailed error messages
2. Verify `.env` file is correct
3. Ensure MongoDB connection works: `mongo "your-uri"`
4. Check frontend integration in `src/services/mongodbService.ts`

Happy building! 🚀

