// src/pages/teacher/TeacherDashboard.jsx
import { Link } from 'react-router-dom'

export default function TeacherDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">👨‍🏫 Teacher Dashboard</h1>

      <div className="space-y-4">
        <Link to="/teacher/quizzes" className="block bg-green-100 hover:bg-green-200 px-4 py-3 rounded-lg shadow">
          📚 Manage My Quizzes
        </Link>
        <Link to="/teacher/create-quiz" className="block bg-green-100 hover:bg-green-200 px-4 py-3 rounded-lg shadow">
          ➕ Create New Quiz
        </Link>
      </div>
    </div>
  )
}
