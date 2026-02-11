// routes/teacherQuizRoutes.js

import express from 'express'
import {
  getMyQuizzes,
  getQuizById,
  createMyQuiz,
  updateMyQuiz,
  deleteMyQuiz
} from '../controllers/teacherQuizController.js'
import { authenticateUser } from '../middleware/auth.js'
import {isTeacher} from '../middleware/isTeacher.js'

const router = express.Router()

router.use(authenticateUser, isTeacher)

router.get('/my', getMyQuizzes)
router.post('/create', createMyQuiz)
router.put('/update/:id', updateMyQuiz)
router.delete('/delete/:id', deleteMyQuiz)
router.get('/:id', getQuizById)
export default router
