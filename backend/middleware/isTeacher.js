// middleware/isAdmin.js
export const isTeacher = (req, res, next) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Access denied. Admins only.' })
  }
  next()
}