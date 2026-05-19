# Practical 2: TikTok REST API

## Overview
This project demonstrates how to design and implement a **RESTful API** for a TikTok-style application using **Express.js**. The API supports CRUD operations for **videos, users, and comments**, along with features like likes and followers.


##  Project Setup

1. **Initialize Project**
   ```bash
   mkdir -p server
   cd server
   npm init -y

2. Install Dependencies
npm install express cors morgan body-parser dotenv
npm install --save-dev nodemon

3. Create Project Structure
mkdir -p src/controllers src/routes src/models src/middleware src/utils
touch src/app.js src/index.js .env

4. Configure Environment Variables
PORT=3000
NODE_ENV=development

## Implementation Details
Controllers: Handle logic for videos, users, and comments.

Routes: Map endpoints to controller functions.

Models: In-memory datastore for users, videos, and comments.

Middleware: Logging, CORS, body parsing, JSON enforcement, error handling.

## Running the Server
1. Start the server:
npm run dev
or
npm start

2. The API will run at:
http://localhost:3000

## Testing
Use Postman or curl to test endpoints:

- Get all users
curl -X GET http://localhost:3000/api/users

- Get all videos
curl -X GET http://localhost:3000/api/videos

- Create a new user
curl -X POST http://localhost:3000/api/users \
-H "Content-Type: application/json" \
-d '{"username":"kinley","email":"kinley@example.com"}'

- Like a video
curl -X POST http://localhost:3000/api/videos/1/likes \
-H "Content-Type: application/json" \
-d '{"userId":1}'

## Features Checklist
- Videos → CRUD + likes + comments

- Users → CRUD + followers/following + videos

- Comments → CRUD + likes

- Middleware → JSON enforcement, error handling

- Testing → Postman/curl

## Resources
- Express.js Documentation

- REST API Best Practices

- Postman API Testing Guide