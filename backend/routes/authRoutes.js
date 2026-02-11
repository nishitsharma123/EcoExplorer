// routes/authRoutes.js
import express from 'express'
import {
  signupUser,
  loginUser,
  getCurrentUser
} from '../controllers/authController.js'
import { authenticateUser } from '../middleware/auth.js'

const router = express.Router()

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.get('/me', authenticateUser, getCurrentUser)

export default router
