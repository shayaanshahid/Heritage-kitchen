# Heritage Kitchen - Restaurant Management Platform

A production-grade, full-stack restaurant management platform built with Next.js 14+, TypeScript, and MongoDB.

## Features

- **Premium Frontend**: Modern, responsive UI with Framer Motion animations.
- **Full-Stack Reservation System**: Customer submission with automated approval/rejection workflows.
- **Admin/Employee CRM**: Role-based access control (RBAC) to manage reservations, catering, and menu items.
- **Menu Management**: Backend-driven menu system with categories and availability toggles.
- **Catering Portal**: Dedicated section for event inquiries.
- **Secure Auth**: JWT-based authentication with HTTP-only cookies.
- **Email Automation**: Professional email templates via Resend/Nodemailer.

## Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS v4, Framer Motion, Lucide React.
- **Backend**: Next.js API Routes, Mongoose (MongoDB).
- **Validation**: Zod + React Hook Form.
- **Email**: Resend.

## Getting Started

### 1. Prerequisites
- Node.js 20+
- MongoDB instance (Local or Atlas)

### 2. Environment Variables
Create a `.env.local` file in the root:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Installation
```bash
npm install
```

### 4. Seed Admin User
```bash
npx tsx src/lib/seed.ts
```
Default Credentials: `admin@heritagekitchen.be` / `admin123`

### 5. Run Development Server
```bash
npm run dev
```

## Folder Structure

- `src/app`: Routes and API endpoints.
- `src/components`: Reusable UI and feature components.
- `src/models`: Mongoose database schemas.
- `src/lib`: Shared utilities (auth, db, utils).
- `src/services`: Business logic (email).
- `src/middleware.ts`: Route protection and RBAC.

## Visual Identity
Preserves the warm, elegant branding of the original Heritage Kitchen while introducing a dark-themed, premium aesthetic with gold accents and high-end typography.
