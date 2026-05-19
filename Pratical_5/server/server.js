import express from 'express'
import dotenv from 'dotenv'
import prisma from './src/lib/prisma.js'

import usersRouter from './src/routes/users.js'
import videosRouter from './src/routes/videos.js'
import commentsRouter from './src/routes/comments.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/videos', videosRouter)
app.use('/api/comments', commentsRouter)

app.get('/', (req, res) => {
  res.json({
    message: 'Practical 4 API is running',
    endpoints: {
      health: '/health',
      users: '/api/users',
      videos: '/api/videos',
      comments: '/api/comments',
    },
  })
})

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.use((err, req, res, next) => {
  console.error('Server Error:', {
    message: err.message,
    code: err.code,
    status: err.status,
    stack: err.stack
  })
  
  // Handle multer/busboy errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ message: 'File size exceeds limit (50MB max)' })
  }
  if (err.code === 'LIMIT_FILE_COUNT') {
    return res.status(413).json({ message: 'Too many files uploaded' })
  }
  if (err.code === 'LIMIT_FIELD_COUNT') {
    return res.status(413).json({ message: 'Too many fields' })
  }
  if (err.message.includes('File type')) {
    return res.status(400).json({ message: err.message })
  }
  
  res.status(err.status || 500).json({ 
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV}`)
})

process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

export default app
