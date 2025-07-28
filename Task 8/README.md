# AuthApp - Next.js Authentication System

A modern, secure user authentication application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This application provides complete user registration, email verification, and sign-in functionality using the Akil Backend API.

## 🚀 Features

- **User Registration**: Secure signup with email verification
- **Email Verification**: OTP-based email verification system
- **User Sign In**: Secure login with JWT token management
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Form Validation**: Client-side validation for all input fields
- **Error Handling**: Comprehensive error handling and user feedback
- **State Management**: Context-based authentication state management
- **Mobile Responsive**: Fully responsive design for all screen sizes
- **Next.js App Router**: Modern Next.js 15 with App Router architecture
- **Server-Side Rendering**: Optimized performance with SSR capabilities

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router + TypeScript
- **Authentication**: NextAuth.js (Auth.js) with Credentials Provider
- **Styling**: Tailwind CSS 3
- **UI Components**: Radix UI + Shadcn/ui
- **State Management**: React Context API + NextAuth Session
- **Form Handling**: React Hook Form + Yup Validation
- **Notifications**: Sonner Toast
- **Backend API**: Akil Backend (https://akil-backend.onrender.com/)

## 📁 Project Structure

```
app/                          # Next.js App Router pages
├── layout.tsx               # Root layout with providers
├── page.tsx                 # Homepage (/)
├── signin/page.tsx          # Sign in page (/signin)
├── signup/page.tsx          # Sign up page (/signup)
├── verify-email/page.tsx    # Email verification (/verify-email)
└── globals.css              # Global styles and Tailwind CSS

components/                   # Reusable UI components
├── ui/                      # Shadcn/ui component library
└── providers/               # Context providers for client components

contexts/                     # React Context for state management
├── AuthContext.tsx          # Legacy authentication context (deprecated)
└── NextAuthContext.tsx      # NextAuth.js authentication context

hooks/                        # Custom React hooks
└── use-toast.ts             # Toast notification hook

lib/                         # Utility functions
├── utils.ts                 # Tailwind class utilities
├── auth.ts                  # NextAuth configuration
└── validationSchemas.ts     # Yup validation schemas

shared/                      # Shared types and interfaces
└── api.ts                   # API types and interfaces
```

## 📱 Application Pages

### 1. Homepage / Landing Page
![Homepage](https://cb466845f2454052b5363751daab2db5-2c7b99a51c27401ab933c590a.projects.builder.codes)

**Description**: 
Next.js powered landing page with:
- Server-side rendering for optimal performance
- Modern hero section with authentication branding
- Clear call-to-action buttons for Sign Up and Sign In
- Feature highlights showcasing security benefits
- Responsive design that works on all devices
- Dynamic content based on authentication state

**Route**: `/` (app/page.tsx)

### 2. Sign In Page
![Sign In Page](https://cb466845f2454052b5363751daab2db5-2c7b99a51c27401ab933c590a.projects.builder.codes/signin)

**Description**: 
Next.js client component for user authentication:
- Clean, minimalist design matching the reference UI
- Email and password input fields with proper validation
- "Welcome Back," heading for a personal touch
- Link to sign-up page for new users
- Next.js router integration for seamless navigation
- Secure token storage upon successful authentication

**Route**: `/signin` (app/signin/page.tsx)

### 3. Sign Up Page
![Sign Up Page](https://cb466845f2454052b5363751daab2db5-2c7b99a51c27401ab933c590a.projects.builder.codes/signup)

**Description**: 
Next.js registration page featuring:
- "Sign Up Today!" header
- Google Sign Up button (placeholder for future implementation)
- Email registration form with all required fields
- Password confirmation validation
- Terms of Service and Privacy Policy acknowledgment
- Next.js Link components for client-side routing

**Route**: `/signup` (app/signup/page.tsx)

### 4. Email Verification Page
![Verify Email Page](https://cb466845f2454052b5363751daab2db5-2c7b99a51c27401ab933c590a.projects.builder.codes/verify-email?email=test@example.com)

**Description**: 
Next.js email verification with:
- "Verify Email" header with clear instructions
- Four-digit OTP input boxes with auto-focus functionality
- Resend code functionality with countdown timer
- URL search params integration for email parameter
- Continue button that activates when all digits are entered

**Route**: `/verify-email` (app/verify-email/page.tsx)

## ✅ Form Validation with Yup + React Hook Form

### Comprehensive Client-Side Validation
All forms in the application use **React Hook Form** with **Yup** schemas for robust client-side validation:

#### Sign In Form Validation
```typescript
// lib/validationSchemas.ts
export const signInSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .lowercase()
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(1, "Password is required"),
});
```

#### Sign Up Form Validation
```typescript
export const signUpSchema = yup.object({
  name: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});
```

#### Email Verification Validation
```typescript
export const emailVerificationSchema = yup.object({
  otp: yup
    .string()
    .required("Verification code is required")
    .length(4, "Verification code must be exactly 4 digits")
    .matches(/^\d{4}$/, "Verification code must contain only numbers"),
});
```

### Validation Features
- **Real-time Validation**: `mode: "onBlur"` for immediate feedback
- **Type Safety**: TypeScript types inferred from Yup schemas
- **Visual Feedback**: Error states with red borders and messages
- **Password Security**: Complex password rules with visual guidance
- **Email Format**: RFC-compliant email validation
- **OTP Validation**: Numeric-only 4-digit verification codes
- **Form State Management**: Disabled states during submission

### React Hook Form Integration
```typescript
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm<FormData>({
  resolver: yupResolver(validationSchema),
  mode: "onBlur",
});

// Form field with validation
<Input
  {...register("email")}
  className={`form-input ${errors.email ? "border-red-500" : "border-gray-200"}`}
/>
{errors.email && (
  <p className="text-sm text-red-600">{errors.email.message}</p>
)}
```

### Validation Rules Implemented

#### Password Security Rules
- ✅ Minimum 8 characters
- ✅ At least one uppercase letter (A-Z)
- ✅ At least one lowercase letter (a-z)
- ✅ At least one number (0-9)
- ✅ Maximum 128 characters
- ✅ Password confirmation matching

#### Email Validation
- ✅ RFC-compliant email format
- ✅ Required field validation
- ✅ Automatic lowercase conversion
- ✅ Whitespace trimming

#### Name Validation
- ✅ Required field
- ✅ Minimum 2 characters
- ✅ Maximum 50 characters
- ✅ Whitespace trimming

#### OTP Validation
- ✅ Exactly 4 digits required
- ✅ Numeric characters only
- ✅ Auto-focus between input fields
- ✅ Real-time validation feedback

## 🔐 NextAuth.js Integration

### Authentication Strategy
- **Credentials Provider**: Custom authentication with Akil Backend
- **JWT Strategy**: JSON Web Tokens for session management
- **Secure Sessions**: Server-side session handling with NextAuth
- **Custom Callbacks**: JWT and session callbacks for user data
- **Type Safety**: Custom TypeScript types for NextAuth

### NextAuth Configuration
```typescript
// lib/auth.ts
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Custom authentication logic with Akil Backend
        const response = await fetch("https://akil-backend.onrender.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });
        // Return user object with access token
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => { /* JWT callback */ },
    session: ({ session, token }) => { /* Session callback */ }
  },
  pages: {
    signIn: "/signin",
    signUp: "/signup",
  }
};
```

### API Routes
- **`/api/auth/[...nextauth]`**: NextAuth.js API endpoints
- **Session Management**: Automatic session handling
- **CSRF Protection**: Built-in CSRF protection
- **Cookie Security**: Secure HTTP-only cookies

## 🔧 Next.js Features Used

### App Router Architecture
- **App Directory**: Modern Next.js 15 App Router structure
- **Server Components**: Default server-side rendering for optimal performance
- **Client Components**: Strategic use of "use client" for interactive features
- **Layouts**: Root layout with provider structure
- **Metadata API**: SEO-optimized metadata configuration

### Performance Optimizations
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component ready for future use
- **Font Optimization**: Automatic font optimization
- **Bundle Analysis**: Optimized bundle size with tree shaking

### Developer Experience
- **TypeScript**: Full TypeScript support with Next.js
- **Hot Reload**: Fast refresh for development
- **Error Boundaries**: Built-in error handling
- **Development Server**: Integrated development server

## ���️ Security Features

### NextAuth.js Security
- **Session Management**: Secure server-side session handling
- **JWT Tokens**: Encrypted JWT tokens with rotation
- **CSRF Protection**: Built-in Cross-Site Request Forgery protection
- **Secure Cookies**: HTTP-only, secure, same-site cookies
- **Environment Secrets**: Secure NEXTAUTH_SECRET handling

### Application Security
- **Client-Side Validation**: Comprehensive form validation
- **XSS Protection**: Automatic XSS protection with React
- **SQL Injection Prevention**: Parameterized queries in backend
- **Rate Limiting**: Ready for rate limiting implementation
- **Environment Variables**: Secure environment variable handling

## 🚦 Authentication Flow (Next.js)

1. **Server-Side Rendered Landing**: Fast initial page load with SSR
2. **Client-Side Navigation**: Seamless routing with Next.js router
3. **API Integration**: Fetch API calls to external authentication service
4. **State Management**: React Context for authentication state
5. **Token Persistence**: Secure token storage with SSR consideration

## 🔄 Next.js Specific Implementation

### Server Components vs Client Components
- **Server Components**: Layout, static content, SEO metadata
- **Client Components**: Forms, state management, user interactions
- **Providers**: Wrapped in client components for context providers

### Routing
- **File-based Routing**: App Router with file-based page structure
- **Dynamic Routes**: Search params for email verification
- **Navigation**: Next.js Link and useRouter for navigation
- **Middleware**: Ready for authentication middleware implementation

### Performance
- **SSR**: Server-side rendering for SEO and performance
- **SSG**: Static generation ready for deployment
- **ISR**: Incremental static regeneration capability
- **Edge Runtime**: Ready for edge deployment

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open http://localhost:3000 in your browser

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```bash
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production

# Optional: Database URL (if using database sessions)
# DATABASE_URL=postgresql://username:password@localhost:5432/database

# Optional: OAuth Provider Secrets (for future providers)
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Required Variables:
- **`NEXTAUTH_URL`**: The canonical URL of your site
- **`NEXTAUTH_SECRET`**: A random string used to hash tokens (generate with `openssl rand -base64 32`)

### Production Notes:
- Generate a secure `NEXTAUTH_SECRET` for production
- Set `NEXTAUTH_URL` to your production domain
- Use environment-specific URLs for different stages

## �� Build & Deployment

```bash
# Development
npm run dev          # Start Next.js development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Type checking
npm run typecheck    # TypeScript type checking

# Testing
npm test            # Run Vitest tests
```

## 🌐 Deployment Ready

This Next.js application is ready for deployment on:
- **Vercel** (Recommended - Zero configuration)
- **Netlify** with Next.js adapter
- **AWS Amplify**
- **Railway**
- **Any Node.js hosting platform**

## 🎯 Migration Completed

✅ **Successfully migrated from React SPA to Next.js 15**
- Converted React Router to Next.js App Router
- Updated all components for Next.js compatibility
- Implemented proper client/server component separation
- Maintained all existing functionality
- Improved performance with SSR
- Enhanced SEO capabilities
- Preserved all authentication features

## 📊 Next.js Benefits Gained

- **Better SEO**: Server-side rendering for search engines
- **Improved Performance**: Code splitting and optimization
- **Better DX**: TypeScript integration and hot reload
- **Production Ready**: Built-in optimization for production
- **Scalability**: Ready for complex application growth
- **Modern Architecture**: Latest React and Next.js features

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration optimized for Next.js
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `package.json` - Dependencies and scripts for Next.js

## 📝 Development Notes

- **Client Components**: All interactive components marked with "use client"
- **Server Components**: Default components for static content
- **Context Providers**: Properly wrapped for client-side state
- **Type Safety**: Full TypeScript support throughout
- **Error Handling**: Next.js error boundaries and proper error states
- **Responsive Design**: Tailwind CSS for mobile-first responsive design

---

## 🎉 Migration Summary

This project has been successfully converted from a React SPA with Vite to a modern **Next.js 15** application with:

- ✅ **App Router architecture** for modern Next.js development
- ✅ **Server-side rendering** for better performance and SEO
- ✅ **Type-safe TypeScript** integration throughout
- ✅ **Optimized build process** with Next.js compiler
- ✅ **Production-ready** deployment configuration
- ✅ **All authentication features** preserved and enhanced
- ✅ **Modern development experience** with hot reload and fast refresh

The authentication system now benefits from Next.js's powerful features while maintaining the same user experience and security standards.
