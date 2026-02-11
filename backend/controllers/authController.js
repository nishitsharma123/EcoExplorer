// controllers/authController.js
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

export const signupUser = async (req, res) => {
  const { fullName, email, password, mobile, address, role } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ error: 'Email already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      address,
      role
    })

    const token = generateToken(user)
    res.status(201).json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ error: 'Signup failed', details: err.message })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' })

    const token = generateToken(user)
    res.status(200).json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message })
  }
}

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user', details: err.message })
  }
}
