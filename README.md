
uEngage | https://uengage-phi.vercel.app

uEngage is a Next.js 15 (App Router) project built with TypeScript, Prisma, NextAuth, and TailwindCSS.  
It follows a scalable folder structure and uses server actions, role-based middleware, and modular components to ensure maintainability and production readiness.

🔑 Login Functionality

User Authentication with NextAuth.js (JWT-based)
MongoDB + Prisma ORM for user data storage

Role-based Access Control (RBAC) with three roles:
  USER(default role after signup)
  ADMIN
  SUPERADMIN

Super Admin Default Credentials:
  Email: admin@gmail.com
  Password: 12345678

Protected Routes:
  Only SUPERADMINcan access /admin
  Middleware enforces role-based access

User Signup & Login
  Users can sign up via /signup
  After successful signup, the role is automatically set to USER


Folder Structure

📦 uengage/
│
├── 📂 actions/                      # Server Actions (Next.js 15)
│   ├── get-current-user.ts           # Fetch current user from session
│   └── signup-user.ts                # User signup (create user in DB)
│
├── 📂 app/
│   ├── 📂 (auth)/                    # Auth related routes
│   │   ├── login/
│   │   │   └── page.tsx              # Login Page
│   │   ├── signup/
│   │   │   └── page.tsx              # SignUp Page
│   │   └── api/
│   │       └── auth/[...nextauth]/route.ts   # NextAuth API
│   │
│   ├── 📂 admin/                     # Admin Panel
│   │   ├── 📂 post/                  # List all posts page
│   │   │   └── page.tsx
│   │   │
│   │   ├── 📂 user/                  # User Management
│   │   │   ├── [id]/                 # Dynamic route for user details
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx              # List all users page
│   │   │
│   │   ├── layout.tsx                # Admin layout (sidebar, navbar)
│   │   ├── page.tsx                  # Admin dashboard home
│   │   └── summary.tsx               # Admin summary details
│   │
│   ├── error.tsx                     # Error boundary
│   ├── favicon.ico                   # Favicon
│   ├── layout.tsx                    # Root layout
│   ├── loading.tsx                   # Global loading state
│   ├── not-found.tsx                 # 404 page
│   ├── page.tsx                      # Home page
│   ├── robots.ts                    # search engine crawlers (Google, Bing, etc.)
│   └── sitemap.ts                    # Sitemap
│
├── 📂 components/                    # Reusable Components
│   ├── 📂 admin/                     # Admin-specific components
│   │   ├── Menu.tsx
│   │   ├── MenuData.ts
│   │   └── Sidebar.tsx
│   │
│   └── 📂 ui/                        # UI (shared) components
│       ├── AdminHeading.tsx
│       ├── DetailsModal.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── Input.tsx
│       ├── Navbar.tsx
│       ├── NullData.tsx
│       ├── Pagination.tsx
│       ├── PostTable.tsx
│       ├── UserCard.tsx
│       └── UserTable.tsx
│
├── 📂 libs/                          # Config & Helpers
│   ├── auth.ts                       # NextAuth config
│   ├── validations.ts                # Validations (Zod/Yup schemas)
│   ├── validations.test.ts           # Validations Test File (Zod/Yup schemas)
│   └── db.ts                         # Prisma helper functions
│
├── 📂 prisma/
│   └── schema.prisma                 # Prisma schema file
│
├── 📂 providers/                     # Context Providers
│   └── Providers.tsx                 # React Query, Theme, Session providers
│
├── 📂 public/                        # Static assets
│   ├── manifest.json                 # PWA
│   └── logo.png                      # Logo Image
│
├── 📂 styles/
│   └── globals.css                   # Global styles
│
├── 📂 types/                         # TypeScript Types
│   ├── index.ts                      # Root exports
│   ├── next-auth.d.ts                # Custom types (User, Session, Role etc.)
│   ├── post.ts                       # Post model types
│   └── user.ts                       # User model types
│
├── 📂 utils/                         # Utility Functions
│   ├── axios.ts                      # Axios instance
│   ├── format-number.ts              # Format Number
│   ├── formatNumber.test.ts          # Format Number Test File
│   ├── truncate.test.ts              # Format Number Test File
│   ├── axios.test.ts                 # Axios instance Test File
│   └── truncate.ts                   # Truncate text
│
├── .env                              # Environment variables
├── biome.json                        # Biome config
├── jest.config.ts                   # Jest config (root)
├── jest.setup.ts                    # Jest setup (root)
├── middleware.ts                     # Role-based middleware
├── package.json
└── tsconfig.json

🛠️ Tech Stack

Framework: Next.js 15 (App Router)
Language: TypeScript
Auth: NextAuth.js
Test: Jest
Database: Prisma ORM + MongoDB
UI: TailwindCSS
State Management: React Query / Server Actions
Linting/Formatting: Biome

🔑 Key Decisions

Next.js 15 App Router → for server components, layouts, and server actions.
Prisma + MongoDB → flexible schema-driven database with migrations.
NextAuth → session management with role-based access control.
React Query + Providers → optimized client-side state management.
TailwindCSS → utility-first styling for rapid UI development.
Testing → use Jest.
Biome → linting + formatting for consistent code quality.
Scalable structure → clear separation between app, components, libs, and utils.


⚠️ Known Limitations

Basic role system → Middleware enforces roles but lacks fine-grained permissions.
Minimal UI → Functional but limited design; can be expanded with shadcn/ui or Radix.
Email/password only → Social logins (Google, GitHub, etc.) not implemented yet.


🚀 Features

Authentication (Login, Signup with NextAuth)
User Management (list users, view user details)
Post Management (list posts)
Scalable UI components (Admin dashboard, tables, modals)
Optimized for SEO (dynamic metadata per user page)
Modular folder structure for enterprise-level apps

⚙️ Setup & Installation

1️⃣ Clone the repo
git clone https://github.com/timetraveller98/uengage.git
cd uengage

2️⃣ Install dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file in the root:

DATABASE_URL="mongodb+srv://school:student123@cluster0.64833pk.mongodb.net/uengage"
NEXTAUTH_SECRET = "uEngageSecret"

4️⃣ Setup Database
npx prisma generate
npx prisma migrate dev

5️⃣ Run the app
npm run dev
