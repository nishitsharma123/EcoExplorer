// routes/userRoutes.js
import express from 'express'
import {
  getAllUsers,
  getUserById,
  updateUserProfile,
  deleteUserById
} from '../controllers/userController.js'

import { authenticateUser } from '../middleware/auth.js'
import { authorizeRoles } from '../middleware/role.js'

const router = express.Router()

// Get all users – Admin only
router.get('/', authenticateUser, authorizeRoles('admin'), getAllUsers)

// Get user by ID
router.get('/:id', authenticateUser, getUserById)

// Update user profile (same user)
router.put('/:id', authenticateUser, updateUserProfile)

// Delete user – Admin only
router.delete('/:id', authenticateUser, authorizeRoles('admin'), deleteUserById)

export default router
