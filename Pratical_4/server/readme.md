# Practical 4: Connecting TikTok to PostgreSQL with Prisma ORM

## Overview
This project demonstrates how to connect a TikTok-style REST API to a **PostgreSQL database** using **Prisma ORM**. It migrates from in-memory data storage to persistent database storage, adds authentication with password encryption, and updates API endpoints to use the database.



## Project Setup

### 1. **PostgreSQL Database**
- Create database:
  ```sql
  CREATE DATABASE tiktok_db;

Create user:
CREATE USER tiktok_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE tiktok_db TO tiktok_user;

### 2. Install Dependencies
npm install @prisma/client
npm install prisma --save-dev
npm install bcrypt jsonwebtoken

### 3. Initialize Prisma
npx prisma init
This creates:

prisma/schema.prisma → Database schema definition

.env → Environment variables

Update .env:

DATABASE_URL="postgresql://tiktok_user:your_password@localhost:5432/tiktok_db?schema=public"
PORT=5000
NODE_ENV=development
JWT_SECRET=yourverylongandsecurerandomsecret
JWT_EXPIRE=30d

## Database Schema
Define models in prisma/schema.prisma for:

- Users → authentication, followers/following

- Videos → uploaded content, likes, comments

- Comments → linked to videos and users

- Likes → video and comment likes

- Relationships → one-to-many and many-to-many

npx prisma migrate dev --name init

## Implementation Details
1. Prisma Client
Create src/lib/prisma.js:
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;

2. Authentication Middleware
src/middleware/auth.js:

Verify JWT tokens.

Attach user to request.

Reject unauthorized requests.

3. Controllers
User Controller: Registration, login, password hashing (bcrypt), JWT generation.

Video Controller: CRUD operations, relationships, transactions, aggregation.

Comment Controller: CRUD operations, likes, relationships.

4. Routes
Update route files to use authentication middleware for protected endpoints.

## Testing
1. Start server:
npm run dev

2. Test with Postman:
- Register user → POST /api/users

- Login → POST /api/users/login

- Protected routes → Include Authorization: Bearer <token> header

- Create video → POST /api/videos (requires token)

## Seed Data
1. Create prisma/seed.js to populate test data:

10 users

50 videos (5 per user)

200 comments

300 video likes

150 comment likes

40 follow relationships

2. Add script in package.json:
"scripts": {
  "dev": "nodemon src/index.js",
  "start": "node src/index.js",
  "seed": "node prisma/seed.js"
}

3. run
npm run seed

## Features Checklist
PostgreSQL database setup

Prisma ORM integration

Database migrations

Authentication with JWT + bcrypt

Controllers updated to use Prisma

Protected routes with middleware

Seed data for testing

## Resources
Prisma Documentation

PostgreSQL Documentation

JWT Authentication Guide

Bcrypt Password Hashing