// models/User.js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: String,
  address: {
    street: String,
    city: String,
    district: String,
    state: String,
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'teacher', 'user'], // user = general user
    default: 'user'
  },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('User', userSchema)
