# Task Management System

A full-stack Task Management System built with a TypeScript-based backend and two frontend implementations: React.js and Next.js.

The repository is organized as a single monorepo-style project with three independent applications:

- `backend` — Backend REST APIs
- `frontend-reactjs` — React.js frontend application
- `frontend-nextjs` — Next.js frontend application

All applications communicate with the same backend API and MongoDB database.

---

## Project Overview

The Task Management System provides a scalable foundation for:

- User registration and authentication
- JWT access and refresh token authentication
- Protected APIs and routes
- Task creation, retrieval, update, and deletion
- Task filtering, searching, sorting, and pagination
- Dashboard statistics
- Input validation
- Centralized error handling
- MongoDB data persistence using Mongoose
- Type-safe backend and frontend development
- React.js and Next.js frontend implementations

---

## Repository Structure

```text
task-management-system/
│
├── backend/                         # Backend APIs
│   ├── src/
│   │   ├── config/                 # Application configuration and environment handling
│   │   ├── controllers/            # HTTP request/response handling
│   │   ├── database/               # MongoDB connection
│   │   ├── middleware/             # Auth, error handling, logging, etc.
│   │   ├── models/                 # Mongoose models/schemas
│   │   ├── routes/                 # API route definitions
│   │   ├── services/               # Business logic
│   │   ├── validators/             # Express validation rules
│   │   ├── utils/                  # Reusable utilities
│   │   ├── app.ts                  # Express application setup
│   │   └── server.ts               # Server/bootstrap entry point
│   │
│   ├── tests/                      # Backend tests
│   ├── .env                        # Local environment variables
│   ├── .env.example                # Environment variable template
│   ├── package.json
│   └── tsconfig.json
│
├── frontend-reactjs/               # React.js frontend
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── features/               # Feature-specific frontend modules
│   │   ├── pages/                  # Application pages
│   │   ├── routes/                 # React Router configuration
│   │   ├── services/               # API/service layer
│   │   ├── store/                  # Redux Toolkit store/state
│   │   ├── types/                  # TypeScript types
│   │   ├── App.tsx                 # Root React component
│   │   └── main.tsx                # React application entry point
│   │
│   ├── public/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend-nextjs/                # Next.js frontend
│   ├── public/
│   ├── src/
│   │   ├── app/                    # Next.js 16 App Router
│   │   │   ├── (authenticated)/    # Protected route group
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── tasks/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── layout.tsx
│   │   │   ├── auth/
│   │   │   │   └── page.tsx
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx             # Redirects / to /auth
│   │   │
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── AuthGuard.tsx
│   │   │   │   ├── AuthTabs.tsx
│   │   │   │   ├── GuestGuard.tsx
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   └── layout/
│   │   │       ├── AppHeader.tsx
│   │   │       └── ThemeModeSelector.tsx
│   │   │
│   │   ├── config/
│   │   │   └── env.ts
│   │   ├── hooks/                  # Reusable React hooks
│   │   ├── lib/
│   │   │   ├── axios.ts
│   │   │   └── queryClient.ts
│   │   ├── providers/
│   │   │   ├── AppProviders.tsx
│   │   │   ├── MuiProvider.tsx
│   │   │   ├── NotificationProvider.tsx
│   │   │   └── QueryProvider.tsx
│   │   ├── schemas/
│   │   │   └── auth.schema.ts      # Zod validation schemas
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   ├── types/
│   │   │   └── auth.types.ts
│   │   └── utils/
│   │       ├── api-error.ts
│   │       ├── notification.ts
│   │       └── token.ts
│   │
│   ├── .env.local
│   ├── .gitignore
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

> The three applications are intentionally kept separate so that the same backend can be consumed by either frontend implementation.

---

## Architecture

```text
                         Task Management System
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
             ▼                    ▼                    ▼
      React.js Client       Next.js Client        Backend APIs
   frontend-reactjs       frontend-nextjs          backend
             │                    │                    │
             └──────────────┬─────┘                    │
                            │                          │
                            └────── HTTP / REST ───────┘
                                                       │
                                                       ▼
                                                  MongoDB
```

### Backend Request Flow

```text
Request
   │
   ▼
Route
   │
   ▼
Middleware
   │
   ▼
Validator
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Mongoose Model
   │
   ▼
MongoDB
```

### Backend Responsibilities

- **Routes** — Define API endpoints.
- **Middleware** — Authentication, authorization, logging, error handling, and request processing.
- **Validators** — Validate incoming request parameters, body, and query data.
- **Controllers** — Handle HTTP requests and responses while keeping business logic out of controllers.
- **Services** — Contain application and business logic.
- **Models** — Define MongoDB schemas, validation, relationships, and indexes.
- **Config** — Centralize environment-based configuration.
- **Utils** — Reusable helper functions.

---

## Technology Stack

### Backend — `backend`

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt
- Express Validator
- CORS
- Morgan
- dotenv

### React Frontend — `frontend-reactjs`

- React
- TypeScript
- Vite
- React Router
- Redux Toolkit
- Axios
- React MUI
- Zod where applicable

### Next.js Frontend — `frontend-nextjs`

- Next.js 16
- React
- TypeScript
- App Router
- React MUI
- TanStack Query
- TanStack Form
- Axios
- Zod

### Development & Quality

- ESLint
- Prettier
- Jest
- Supertest
- Git
- GitHub

---

## Prerequisites

Install the following before running the project:

- Node.js 20+ recommended
- npm 10+ recommended
- MongoDB 7+ or MongoDB Atlas
- Git

Verify:

```bash
node --version
npm --version
git --version
```

---

## Initial Setup

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd task-management-system
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment

Create:

```text
backend/.env
```

Use `backend/.env.example` as the reference.

### 4. Install React frontend dependencies

From the repository root:

```bash
cd frontend-reactjs
npm install
```

Create the local environment file if required:

```text
frontend-reactjs/.env
```

Use `frontend-reactjs/.env.example` as the reference.

### 5. Install Next.js frontend dependencies

From the repository root:

```bash
cd frontend-nextjs
npm install
```

Create:

```text
frontend-nextjs/.env.local
```

Use the environment configuration expected by `src/config/env.ts`.

---

## Environment Variables

Environment-specific configuration must not be hard-coded into source code.

Never commit real secrets to Git.

### Backend

File:

```text
backend/.env
```

The backend configuration includes the following environment variables:

```env
NODE_ENV=development
PORT=5000
API_PREFIX=/api/v1
MONGODB_URI=mongodb://127.0.0.1:27017/task_management
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=...
JWT_REFRESH_EXPIRES_IN=...
CORS_ORIGIN=...
LOG_FORMAT=...
```

The exact values are environment-specific and must not be hard-coded.

### React Frontend

File:

```text
frontend-reactjs/.env
```

Example:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### Next.js Frontend

File:

```text
frontend-nextjs/.env.local
```

The API configuration is read through:

```text
frontend-nextjs/src/config/env.ts
```

Do not commit `.env`, `.env.local`, or files containing real secrets.

---

## How to Run the Backend

Open Terminal 1:

```bash
cd backend
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

API base URL:

```text
http://localhost:5000/api/v1
```

### Backend Production Build

```bash
cd backend
npm run build
npm start
```

---

## How to Run React.js Frontend

Open Terminal 2:

```bash
cd frontend-reactjs
npm install
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

### React Production Build

```bash
cd frontend-reactjs
npm run build
npm run preview
```

---

## How to Run Next.js Frontend

Open Terminal 3:

```bash
cd frontend-nextjs
npm install
npm run dev
```

The Next.js development server normally runs at:

```text
http://localhost:3000
```

### Next.js Production Build

```bash
cd frontend-nextjs
npm run build
npm start
```

---

## Run the Complete System

The backend must be running before using either frontend.

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

### Terminal 2 — React.js Frontend

```bash
cd frontend-reactjs
npm run dev
```

### Terminal 3 — Next.js Frontend

```bash
cd frontend-nextjs
npm run dev
```

The development setup is:

```text
React.js
http://localhost:5173
      │
      │
      ├──────────────┐
      │              │
      ▼              ▼
Next.js          Backend API
:3000            :5000/api/v1
                     │
                     ▼
                  MongoDB
```

You can run either frontend independently against the same backend API.

---

## Authentication

Authentication is implemented through the backend API using JWT access and refresh tokens.

The authentication flow includes:

1. User registration
2. User login
3. Access token generation
4. Refresh token generation
5. Protected API requests
6. Current-user/profile API
7. Logout and refresh-token revocation handling

### Next.js Authentication Routes

The Next.js application uses the App Router:

```text
/auth       → Login / Register
/dashboard  → Protected dashboard
/tasks      → Protected task management
```

The root route redirects to `/auth`.

Authentication-related Next.js components are organized under:

```text
frontend-nextjs/src/components/auth/
```

---

## Frontend Theme

The Next.js frontend supports:

- System mode — default
- Light mode
- Dark mode

Theme selection is handled through the application theme/provider structure and the `ThemeModeSelector` component.

Relevant files:

```text
frontend-nextjs/src/components/layout/ThemeModeSelector.tsx
frontend-nextjs/src/components/layout/AppHeader.tsx
frontend-nextjs/src/providers/MuiProvider.tsx
frontend-nextjs/src/providers/AppProviders.tsx
```

---

## API Health Check

The backend provides a root API endpoint for checking whether the server is running.

```http
GET /api/v1
```

Expected response:

```json
{
  "success": true,
  "message": "Task Management API is running"
}
```

---

## Development Principles

The project follows these principles:

- TypeScript throughout backend and frontend applications
- Separation of concerns
- Modular architecture
- Thin controllers
- Business logic inside services
- Centralized error handling
- Centralized configuration
- Environment-based configuration
- Secure password hashing
- JWT-based authentication
- Protected APIs and routes
- Request validation
- MongoDB indexes where required
- Consistent API responses
- Pagination for large datasets
- Filtering, searching, and sorting where applicable
- Backend-calculated dashboard statistics
- Automated testing
- Clean and maintainable code

---

## Security

The application follows common security practices including:

- Password hashing with bcrypt
- JWT access and refresh tokens
- Protected API endpoints
- Authentication and authorization middleware
- Refresh-token validation/revocation
- Environment-based secrets
- Request validation
- CORS configuration
- Centralized error handling
- No secrets committed to source control

---

## Git Workflow

The repository contains three application areas:

```text
task-management-system/
├── backend/
├── frontend-reactjs/
└── frontend-nextjs/
```

### Backend change

```bash
git add backend/
git commit -m "feat: update task API"
```

### React.js change

```bash
git add frontend-reactjs/
git commit -m "feat: update React task UI"
```

### Next.js change

```bash
git add frontend-nextjs/
git commit -m "feat: update Next.js task UI"
```

### Complete feature

```bash
git add backend/ frontend-reactjs/ frontend-nextjs/
git commit -m "feat: implement task management feature"
```

---

## License

This project is currently intended for development and learning purposes.

Add an appropriate license before distributing the project publicly.
