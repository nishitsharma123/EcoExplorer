import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, quizzes: 0 })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setStats(res.data)
      } catch (err) {
        console.error('Failed to load admin stats:', err)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="p-6 md:p-12 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-green-700 mb-8">👩‍💼 Admin Dashboard</h1>

      {/* STAT CARDS */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        <div className="p-6 bg-green-50 border-l-4 border-green-600 shadow rounded-xl">
          <h2 className="text-lg font-semibold text-green-800">Total Users</h2>
          <p className="text-3xl mt-2 font-bold">{stats.users}</p>
        </div>
        <div className="p-6 bg-blue-50 border-l-4 border-blue-600 shadow rounded-xl">
          <h2 className="text-lg font-semibold text-blue-800">Total Quizzes</h2>
          <p className="text-3xl mt-2 font-bold">{stats.quizzes}</p>
        </div>
      </div>

      {/* ADMIN ACTIONS */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/admin/users"
          className="bg-white border border-gray-200 hover:shadow-lg p-6 rounded-xl transition"
        >
          <h3 className="text-xl font-semibold text-green-700 mb-2">👥 Manage Users</h3>
          <p className="text-sm text-gray-600">View, promote, or delete users.</p>
        </Link>

        <Link
          to="/admin/quizzes"
          className="bg-white border border-gray-200 hover:shadow-lg p-6 rounded-xl transition"
        >
          <h3 className="text-xl font-semibold text-blue-700 mb-2">📝 Manage Quizzes</h3>
          <p className="text-sm text-gray-600">View, edit, or delete quizzes.</p>
        </Link>

        <Link
          to="/admin/create"
          className="bg-white border border-gray-200 hover:shadow-lg p-6 rounded-xl transition"
        >
          <h3 className="text-xl font-semibold text-yellow-600 mb-2">➕ Create New Quiz</h3>
          <p className="text-sm text-gray-600">Quickly add a new quiz.</p>
        </Link>
      </div>
    </div>
  )
}
