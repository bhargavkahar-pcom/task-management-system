# Task Management System

A full-stack Task Management System built with a modern TypeScript-based architecture.

The project is organized as a single repository containing separate backend and frontend applications.

## Project Overview

The Task Management System provides a scalable foundation for managing users, authentication, and tasks through a RESTful API and a React-based web application.

### Key Goals

- Secure user authentication and authorization
- Task creation and management
- RESTful backend APIs
- MongoDB-based data persistence
- Input validation and consistent API responses
- Centralized error handling
- Modular and scalable backend architecture
- Type-safe frontend and backend development
- Separation of frontend and backend responsibilities
- Production-ready project structure

## Project Structure

```text
task-management/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── tests/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── public/
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

## Architecture

The application follows a layered architecture with clear separation of responsibilities.

```text
                    ┌─────────────────────────┐
                    │       React Client      │
                    │                         │
                    │ React + TypeScript      │
                    │ Redux Toolkit           │
                    │ React Router            │
                    │ Axios                   │
                    └────────────┬────────────┘
                                 │
                                 │ HTTP / REST API
                                 ▼
                    ┌─────────────────────────┐
                    │      Express Server     │
                    │                         │
                    │ Routes                  │
                    │ Controllers             │
                    │ Middleware              │
                    │ Validators              │
                    │ Services                │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       Mongoose ORM      │
                    │                         │
                    │ Models                  │
                    │ Schemas                 │
                    │ Validation              │
                    │ Indexes                 │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │        MongoDB          │
                    └─────────────────────────┘
```

### Backend Architecture

The backend follows a modular layered architecture:

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
Model
   │
   ▼
MongoDB
```

#### Routes

Responsible for defining API endpoints and connecting them to controllers.

#### Middleware

Handles cross-cutting concerns such as:

- Authentication
- Authorization
- Request logging
- Error handling
- Request processing

#### Validators

Responsible for validating incoming request data before it reaches business logic.

#### Controllers

Handle HTTP requests and responses.

Controllers should remain thin and delegate business logic to services.

#### Services

Contain application and business logic.

Services communicate with models/repositories and return the required data to controllers.

#### Models

Define MongoDB schemas and database-level validation using Mongoose.

#### Configuration

Contains application configuration and environment-variable handling.

#### Utilities

Contains reusable helper functions that do not belong to a specific business module.

## Technology Stack

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- Morgan
- dotenv

### Frontend

- React
- TypeScript
- Redux Toolkit
- React Router
- Axios

### Development & Quality

- ESLint
- Prettier
- Jest
- Supertest
- Git
- GitHub

## Prerequisites

Before running the project, make sure the following are installed:

- Node.js 20+ recommended
- npm 10+ recommended
- MongoDB 7+ or MongoDB Atlas
- Git

Verify the installations:

```bash
node --version
npm --version
git --version
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate into the project:

```bash
cd task-management
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Create a `.env` file inside the `backend` directory:

```text
backend/.env
```

Use the `.env.example` file as a reference.

### 4. Install frontend dependencies

From the project root:

```bash
cd ../frontend
npm install
```

### 5. Configure frontend environment variables

Create:

```text
frontend/.env
```

Use the `.env.example` file as a reference.

## Environment Variables

Environment-specific configuration must not be hard-coded into the source code.

Secrets such as database credentials and JWT secrets must never be committed to GitHub.

### Backend Environment Variables

File:

```text
backend/.env
```

Example:

```env
NODE_ENV=development

PORT=5000

API_PREFIX=/api/v1

MONGODB_URI=mongodb://localhost:27017/task_management

JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRES_IN=1d
```

### Environment Variable Description

| Variable | Description | Example |
|---|---|---|
| `NODE_ENV` | Application environment | `development` |
| `PORT` | Backend server port | `5000` |
| `API_PREFIX` | REST API prefix | `/api/v1` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/task_management` |
| `JWT_SECRET` | Secret used to sign JWT tokens | Secure random value |
| `JWT_EXPIRES_IN` | JWT expiration duration | `1d` |

### Frontend Environment Variables

File:

```text
frontend/.env
```

Example:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:5000/api/v1` |

> Never commit `.env` files containing secrets. Commit `.env.example` files instead.

## How to Run Backend

Open a terminal and navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The backend will be available at:

```text
http://localhost:5000
```

The API base URL is:

```text
http://localhost:5000/api/v1
```

### Production Build

Build the backend:

```bash
npm run build
```

Start the production build:

```bash
npm start
```

## How to Run Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

### Production Build

Build the frontend:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Running Backend and Frontend Together

Use two terminals.

### Terminal 1 — Backend

```bash
cd backend
npm run dev
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

The application will then use:

```text
Frontend
http://localhost:5173

        │
        │ REST API
        ▼

Backend
http://localhost:5000/api/v1

        │
        ▼

MongoDB
```

## API Health Check

The backend provides a basic health/root endpoint to verify that the API is running.

Example:

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

## Development Principles

The project follows these principles:

- TypeScript throughout the application
- Separation of concerns
- Modular architecture
- Thin controllers
- Business logic inside services
- Centralized error handling
- Centralized configuration
- Environment-based configuration
- Secure password hashing
- JWT-based authentication
- Request validation
- MongoDB indexes where required
- Consistent API responses
- Pagination for large datasets
- Filtering, searching, and sorting where applicable
- Automated testing
- Clean and maintainable code

## Security

The application follows common backend security practices including:

- Password hashing using bcrypt
- JWT-based authentication
- Protected API endpoints
- Authorization middleware
- Environment-based secrets
- Request validation
- CORS configuration
- Centralized error handling
- No secrets committed to source control

## Git Workflow

The repository contains both applications:

```text
task-management/
├── backend/
└── frontend/
```

Changes can be committed independently or together depending on the feature.

Example:

```bash
git add backend/
git commit -m "feat: implement user authentication"
```

Or:

```bash
git add frontend/
git commit -m "feat: add login page"
```

For a complete feature involving both applications:

```bash
git add backend/ frontend/
git commit -m "feat: implement task management"
```

## License

This project is currently intended for development and learning purposes.

Add an appropriate license before distributing the project publicly.