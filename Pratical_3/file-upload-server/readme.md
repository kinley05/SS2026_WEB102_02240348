# Practical 3: File Upload on the Server Application

## Overview
This project demonstrates how to implement a **server-side file upload system** using Node.js and Express. It connects a React/Next.js frontend with an Express backend to handle multipart form data, validate files, store them securely, and serve them when needed.


## Project Setup

1. **Initialize Project**
   ```bash
   mkdir file-upload-server
   cd file-upload-server
   npm init -y

2. Install Dependencies
npm install express cors multer morgan dotenv

- express → Web server framework

- cors → Cross-Origin Resource Sharing

- multer → File upload middleware

- morgan → HTTP request logger

- dotenv → Environment variable management

## Backend Implementation
1. Basic Server Structure
- Create server.js with Express setup.
- Add middleware (cors, express.json, morgan).
- Create an uploads/ directory if it doesn’t exist.
- Serve uploaded files statically at /uploads.

2. Multer Configuration
- Storage: Defines where and how files are saved.
- File Filter: Accept only jpeg, png, and pdf.
- Limits: Max file size = 5MB.

3. Upload Endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.status(200).json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`
  });
});

4. Error Handling 
- Handle Multer errors (e.g., file too large).

- Return meaningful error messages to the frontend.

5. CORS Configuration
- Allow requests from frontend (http://localhost:3000).

- Configure allowed methods and headers.

## Frontend Integration
1. Axios Upload
Use FormData to send files.

Track progress with onUploadProgress.

2. Dropzone Component
Drag-and-drop interface for file selection.

Show preview for images.

Show filename for PDFs.

Display generic info for other file types.

3. Preview Section
Conditional rendering:

Image → preview thumbnail.

PDF → icon + filename.

Other → generic file info.

## Testing
1. Start backend:
node server.js

2. Start frontend:
npm run dev
Test file uploads:
- Progress tracked
- Validation works (type & size)
- Files saved in /uploads
- Error handling for invalid files

## Features Checklist
Multipart form data → handled by Multer

File validation → type + size checks

Error handling → custom middleware

CORS → frontend-backend connection

Progress tracking → axios.onUploadProgress

## Resources
Express.js Documentation

Multer File Upload Guide

Axios Upload Progress

React Dropzone Docs