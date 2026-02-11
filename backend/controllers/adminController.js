// controllers/adminController.js
import User from '../models/User.js'
import Quiz from '../models/Quiz.js'

export const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments()
    const quizzes = await Quiz.countDocuments()
    res.json({ users, quizzes })
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('createdBy', 'fullName email')
    res.json(quizzes)
  } catch (error) {
    console.error('Error fetching quizzes:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
