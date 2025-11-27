# NestJS Microservices Monorepo

A NestJS monorepo application demonstrating microservices architecture with TCP communication, JWT authentication, and MongoDB integration.

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Environment Variables](#environment-variables)

## 🏗️ Architecture Overview

This project consists of two main applications:

- **Gateway** (`apps/gateway`): HTTP REST API gateway that exposes endpoints to clients
- **Authentication** (`apps/authentication`): Microservice handling user management and authentication logic

The applications communicate via **TCP** using NestJS Microservices pattern.

```
┌─────────────┐         TCP          ┌──────────────────┐
│   Gateway   │ ◄──────────────────► │ Authentication   │
│   (HTTP)    │   Message Patterns   │   (Microservice) │
│   :3000     │                      │      :4001       │
└─────────────┘                      └──────────────────┘
                                              │
                                              ▼
                                        ┌──────────┐
                                        │ MongoDB  │
                                        │  :27017  │
                                        └──────────┘
```

## 📁 Project Structure

```
my-monorepo/
│
├── apps/
│   ├── gateway/                    # HTTP REST API Gateway
│   │   └── src/
│   │       ├── modules/
│   │       │   └── auth/
│   │       │       ├── controllers/
│   │       │       │   ├── register.controller.ts    # POST /auth/register
│   │       │       │   └── users.controller.ts       # GET /auth/users
│   │       │       ├── guards/
│   │       │       │   └── auth.guard.ts            # JWT verification guard
│   │       │       └── services/
│   │       │           └── auth.service.ts          # Proxy service for TCP calls
│   │       ├── gateway.module.ts
│   │       └── main.ts
│   │
│   └── authentication/             # Authentication Microservice
│       └── src/
│           ├── modules/
│           │   ├── auth/
│           │   │   ├── controllers/
│           │   │   │   └── auth.message.controller.ts   # Handles TCP messages
│           │   │   └── services/
│           │   │       └── auth.service.ts              # Auth business logic
│           │   │
│           │   └── user/
│           │       ├── controllers/
│           │       │   └── user.message.controller.ts
│           │       ├── entities/
│           │       │   └── user.entity.ts               # MongoDB User schema
│           │       ├── repository/
│           │       │   └── user.repository.ts           # Data access layer
│           │       └── services/
│           │           └── user.service.ts              # User business logic
│           ├── authentication.module.ts
│           └── main.ts
│
├── common/                         # Shared code across apps
│   ├── interceptors/
│   │   └── error.interceptor.ts   # Global error handling
│   └── shared/
│       ├── dtos/
│       │   └── user/
│       │       └── user-create.dto.ts   # Request DTOs
│       └── responses/
│           ├── token.response.ts        # Response DTOs
│           └── user.response.ts
│
├── core/                          # Core modules
│   ├── database/
│   │   └── database.module.ts    # MongoDB configuration
│   ├── environment/
│   │   ├── environment.module.ts
│   │   └── environment.service.ts # Environment variables service
│   ├── helpers/
│   │   └── password.helper.ts     # Password hashing
│   └── jwt/
│       └── jwt.module.ts          # JWT configuration
│
├── config/                        # Configuration files
│   ├── auth.config.ts
│   ├── jwt.config.ts
│   └── mongodb.config.ts
│
├── docker-compose.yml
├── Dockerfile
└── package.json
```

### 🔑 Key Components

#### Gateway (apps/gateway)

- **Controllers**: HTTP endpoints for client requests
- **Guards**: JWT authentication and authorization
- **Services**: Proxy services that communicate with microservices via TCP

#### Authentication Microservice (apps/authentication)

- **Message Controllers**: Handle TCP messages from Gateway
- **Services**: Business logic for authentication and user management
- **Repository**: Data access layer for MongoDB
- **Entities**: Mongoose schemas

#### Common (common/)

- **DTOs**: Data Transfer Objects for request validation
- **Responses**: Response objects for API responses
- **Interceptors**: Global error handling

#### Core (core/)

- **Database**: MongoDB connection setup
- **Environment**: Centralized environment configuration
- **JWT**: JWT token generation and validation
- **Helpers**: Utility functions (password hashing, etc.)

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for containerized setup)
- **MongoDB** (if running locally without Docker)

## 📥 Installation

1. **Clone the repository:**

```bash
git clone <repository-url>
cd my-monorepo
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create environment file:**

Create a `.env` file in the root directory:

```bash
# MongoDB
MONGO_URI=mongodb://root:example@localhost:27017/authdb?authSource=admin

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=3600s

# Authentication Service
AUTH_HOST=localhost
AUTH_PORT=4001

# Gateway
PORT=3000
```

## 🚀 Running the Application

### Option 1: Docker Compose (Recommended)

This will start all services (MongoDB, Authentication microservice, and Gateway):

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

**Services will be available at:**
- Gateway API: http://localhost:3000
- Authentication Microservice: TCP on localhost:4001
- MongoDB: mongodb://localhost:27017
- Admin Mongo (Database UI): http://localhost:1234

To stop all services:

```bash
docker-compose down
```

To stop and remove volumes (clears database):

```bash
docker-compose down -v
```

### Option 2: Local Development

#### 1. Start MongoDB

Using Docker:

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=example \
  mongo:7
```

Or use a local MongoDB installation.

#### 2. Start Authentication Microservice

```bash
npm run start:dev:authentication
```

The microservice will start on port **4001** (TCP).

#### 3. Start Gateway

In a new terminal:

```bash
npm run start:dev:gateway
```

The Gateway will start on port **3000** (HTTP).

### Option 3: Production Build

```bash
# Build all apps
npm run build

# Start authentication microservice
node dist/apps/authentication/main.js

# Start gateway (in another terminal)
node dist/apps/gateway/main.js
```

## 📚 API Documentation

Once the Gateway is running, access the Swagger documentation at:

```
http://localhost:3000/api/docs
```

### Available Endpoints

#### 1. Register User

**POST** `/api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "age": 30,
  "password": "strongPassword123"
}
```

**Response:**
```json
{
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "age": 30,
      "email": "user@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "statusCode": 201,
  "timestamp": "2024-01-27T10:30:00.000Z"
}
```

#### 2. Get All Users (Protected)

**GET** `/api/auth/users`

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "age": 30,
      "email": "user@example.com"
    }
  ],
  "statusCode": 200,
  "timestamp": "2024-01-27T10:30:00.000Z"
}
```

### Testing with cURL

**Register a user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "age": 25,
    "password": "password123"
  }'
```

**Get users (with token):**
```bash
curl -X GET http://localhost:3000/api/auth/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🔧 Development Scripts

```bash
# Format code
npm run format

# Lint code
npm run lint

# Build all applications
npm run build

# Build specific app
npm run build authentication
npm run build gateway

# Start in development mode with watch
npm run start:dev:gateway
npm run start:dev:authentication
```

## 🌍 Environment Variables

### Gateway (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Gateway HTTP port | `3000` |
| `AUTH_HOST` | Authentication service host | `localhost` |
| `AUTH_PORT` | Authentication service port | `4001` |

### Authentication Microservice (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/authdb` |
| `JWT_SECRET` | Secret key for JWT signing | `defaultSecret` |
| `JWT_EXPIRES_IN` | JWT token expiration time | `3600s` |

### Docker Environment

When using Docker Compose, environment variables are set in `docker-compose.yml`:

```yaml
# Authentication service
MONGO_URI: mongodb://root:example@mongo:27017/authdb?authSource=admin

# Gateway service
AUTH_HOST: authentication
AUTH_PORT: 4001
```

## 🔍 Troubleshooting

### MongoDB Connection Issues

If you see "MongoNetworkError" or connection refused:

1. Make sure MongoDB is running:
```bash
docker ps | grep mongo
```

2. Check MongoDB logs:
```bash
docker logs mongo
```

3. Verify connection string in `.env` file

### Authentication Service Connection Issues

If Gateway can't connect to Authentication service:

1. Verify Authentication service is running:
```bash
# Docker
docker ps | grep authentication

# Local
ps aux | grep authentication
```

2. Check the `AUTH_HOST` and `AUTH_PORT` in `.env`

3. For Docker: use service name `authentication` as host
4. For local: use `localhost` as host

### JWT Token Issues

If you get "Unauthorized" errors:

1. Make sure you registered a user first
2. Copy the token from registration response
3. Add it to Authorization header: `Bearer <token>`
4. Check token hasn't expired (default: 1 hour)