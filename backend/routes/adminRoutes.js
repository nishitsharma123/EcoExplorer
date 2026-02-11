// routes/adminRoutes.js
import express from 'express'
import { getStats, getAllUsers, getAllQuizzes } from '../controllers/adminController.js'
import { authenticateUser } from '../middleware/auth.js'
import { isAdmin } from '../middleware/isAdmin.js'

const router = express.Router()

router.get('/stats', authenticateUser, isAdmin, getStats)
router.get('/users', authenticateUser, isAdmin, getAllUsers)
router.get('/quizzes', authenticateUser, isAdmin, getAllQuizzes)

export default router
