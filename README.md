# SparqUp - Lead Management Platform

> Modern lead generation and management system for web development consultancy

## 🚀 Overview

SparqUp is a full-stack lead management platform built with Next.js, featuring automated lead capture, user management, and seamless Notion integration for CRM workflows.

**Live:** [sparqup.fr](https://sparqup.fr) (or sparqup.vercel.app)

## ✨ Features

### Lead Management

- 📝 Multi-step lead qualification questionnaire
- 🎯 Budget and service categorization
- 📊 Real-time lead dashboard with statistics
- 🔍 Advanced filtering and search
- ✅ Lead status tracking (new → contacted → qualified → converted)

### User Management

- 👥 Role-based access control (Superuser, Admin, Viewer)
- 🔐 Secure authentication with NextAuth.js v5
- 🛡️ Protected API routes with middleware
- 📋 User administration dashboard (superuser only)

### Notion Integration

- 🔄 Automated lead sync to Notion database
- ⚡ GitHub Actions cron job (every 15 minutes)
- 🛡️ Rate limit protection
- 📊 Batch processing for efficiency

### Analytics

- 📈 Umami Analytics integration (production only)
- 🎯 Privacy-focused tracking

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js 15.5.10 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS
- **UI Components:** Custom components library
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation

### Backend

- **Runtime:** Node.js 20
- **API:** Next.js API Routes
- **Authentication:** NextAuth.js v5 (Credentials provider)
- **Database:** PostgreSQL (Neon Serverless)
- **ORM:** Neon Serverless Driver

### Infrastructure

- **Hosting:** Vercel (Hobby plan)
- **Database:** Neon Free Tier
- **Cron Jobs:** GitHub Actions
- **Package Manager:** pnpm 9

### Integrations

- **Notion API:** @notionhq/client
- **Analytics:** Umami

## 📦 Installation

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL database (Neon recommended)
- Notion workspace + integration

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/majitmambetzhumayev/sparqup.git
cd sparqup
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Database
DATABASE_URL=postgresql://user:password@host/database

# Auth
AUTH_SECRET=your-secret-key-here # Generate with: openssl rand -base64 32

# Notion Integration
NOTION_API_KEY=secret_xxx...
NOTION_DATABASE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Cron Security
CRON_SECRET=your-cron-secret-here # Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Analytics (optional)
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-umami-id
```

4. **Setup database**

Run the SQL schema in your Neon dashboard:

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'viewer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leads table
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  message TEXT,
  budget VARCHAR(100),
  source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new',
  synced_to_notion BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

5. **Create superuser**

In Neon SQL Editor:

```sql
INSERT INTO users (email, password, role)
VALUES ('your-email@example.com', '$2a$10$...', 'superuser');
-- Generate password hash: https://bcrypt-generator.com/
```

6. **Run development server**

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🔄 Notion Sync Setup

### 1. Create Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"New integration"**
3. Name: "SparqUp Sync"
4. Type: **Internal**
5. Copy the **Internal Integration Token** → `NOTION_API_KEY`

### 2. Create Notion Database

Create a database with these properties:

- `Name` (Title)
- `Email` (Email)
- `Phone` (Phone)
- `Company` (Text)
- `Message` (Text)
- `Budget` (Select) - Options: `<2000`, `2000-5000`, `5000-10000`, etc.
- `Source` (Select) - Options: `website`, `referral`, etc.
- `Status` (Status) - Options: `new`, `contacted`, `qualified`, `converted`

### 3. Share Database with Integration

1. Open your database
2. Click **`...`** → **Add connections**
3. Select your integration

### 4. Get Database ID

From the database URL:

```
https://notion.so/workspace/Leads-2f7a67d033fe804da5cee73808ba684e
                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                  Format with dashes: 2f7a67d0-33fe-804d-a5ce-e73808ba684e
```

### 5. Configure GitHub Actions

Add secrets in **GitHub Settings** → **Secrets and variables** → **Actions**:

- `SYNC_URL`: `https://sparqup.vercel.app/api/cron/sync-notion`
- `CRON_SECRET`: Same as in Vercel env vars

## 🚢 Deployment

### Vercel Deployment

1. **Connect to Vercel**

```bash
vercel --prod
# Or connect via Vercel Dashboard
```

2. **Add Environment Variables**
   In Vercel Dashboard → Settings → Environment Variables, add all vars from `.env.local`

3. **Deploy**
   Push to `main` branch → Auto-deploy

### GitHub Actions (Cron)

Automatically runs every 15 minutes to sync leads to Notion.

Check logs: **GitHub** → **Actions** → **Sync Notion**

## 📁 Project Structure

```
sparqup/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── signup/route.ts
│   │   │   │   └── [...nextauth]/route.ts
│   │   │   ├── cron/
│   │   │   │   └── sync-notion/route.ts
│   │   │   ├── leads/route.ts
│   │   │   └── users/[id]/route.ts
│   │   ├── dashboard/
│   │   │   ├── leads/page.tsx
│   │   │   ├── users/page.tsx
│   │   │   └── page.tsx
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── NotionSyncButton.tsx
│   │   │   └── Sidebar.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── ... (custom components)
│   └── lib/
│       ├── db.ts
│       └── utils.ts
├── .github/
│   └── workflows/
│       └── sync-notion.yml
├── auth.ts
├── middleware.ts
└── README.md
```

## 🔐 Security

- ✅ NextAuth.js v5 with secure session handling
- ✅ Role-based access control (RBAC)
- ✅ Protected API routes with middleware
- ✅ Bcrypt password hashing
- ✅ CRON endpoint protection with bearer token
- ✅ SQL injection protection (parameterized queries)
- ✅ Environment variables for secrets

## 🧪 Development

### Commands

```bash
# Development
pnpm dev          # Start dev server

# Build
pnpm build        # Production build
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm typecheck    # TypeScript type checking

# Database
# Use Neon SQL Editor for migrations
```

### Testing Notion Sync

Manual trigger:

```bash
curl -X GET http://localhost:3000/api/cron/sync-notion \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## 📊 Monitoring

- **Vercel Analytics:** Built-in performance monitoring
- **Umami Analytics:** Privacy-focused web analytics (production only)
- **GitHub Actions:** Cron job execution logs
- **Vercel Logs:** Real-time function logs

## 🐛 Troubleshooting

### Notion Sync Errors

**"Could not find database"**
→ Share the database with your Notion integration

**"Validation error: Budget/Status type mismatch"**
→ Ensure Notion properties match the expected types (Select/Status)

**Rate limited**
→ Sync automatically stops and retries on next cron run

### Authentication Issues

**"Invalid credentials"**
→ Verify password hash was generated correctly with bcrypt

**Session not persisting**
→ Check `AUTH_SECRET` is set in environment variables

## 📝 License

Private - © 2025 SparqUp

## 👤 Author

**Majit Mambetzhumayev**

- Website: [sparqup.fr](https://sparqup.fr)
- GitHub: [@majitmambetzhumayev](https://github.com/majitmambetzhumayev)

---

**Built with ❤️ for modern lead management**
