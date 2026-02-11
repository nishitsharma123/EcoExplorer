// server.js

import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

// Initialize app
const app = express()

// Middlewares
app.use(cors())
app.use(express.json()) // Parses JSON bodies

// Routes
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import quizRoutes from './routes/quizRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import teacherQuizRoutes from './routes/teacherQuizRoutes.js'
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/teacher/quizzes', teacherQuizRoutes)
// Root endpoint (optional)
app.get('/', (req, res) => {
  res.send('🌿 EcoExplorer API is running...')
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
