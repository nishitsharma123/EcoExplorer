import express from 'express'
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  submitQuiz,
  updateQuiz,
  deleteQuiz
} from '../controllers/quizController.js'
import { authenticateUser } from '../middleware/auth.js'
import {authorizeRoles } from '../middleware/role.js'
const router = express.Router()

router.get('/', getAllQuizzes)
router.get('/:id', getQuizById)
// router.post('/', authenticateUser, createQuiz)
router.post('/submit/:id', authenticateUser, submitQuiz)
// ✅ Teacher/Admin: Create Quiz
router.post('/create', authenticateUser, authorizeRoles ('teacher', 'admin'), createQuiz)

// ✅ Teacher/Admin: Edit/Delete
router.put('/edit/:id', authenticateUser, authorizeRoles ('teacher', 'admin'), updateQuiz)
router.delete('/delete/:id', authenticateUser, authorizeRoles ('teacher', 'admin'), deleteQuiz)

export default router
