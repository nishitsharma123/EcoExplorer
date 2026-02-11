// src/pages/admin/AllQuizzes.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AllQuizzes() {
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token')
        // const res = await axios.get('http://localhost:5000/api/admin/quizzes', {
        const res = await axios.get('https://ecoexplorer-www0.onrender.com/api/admin/quizzes', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setQuizzes(res.data)
      } catch (err) {
        console.error('Failed to fetch quizzes:', err)
      }
    }

    fetchQuizzes()
  }, [])

  return (
    <div className="p-6 md:p-12 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-green-700 mb-6">All Quizzes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-green-200 rounded-xl">
          <thead className="bg-green-100 text-green-800">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Difficulty</th>
              <th className="p-3 text-left">Created By</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz._id} className="border-t hover:bg-green-50">
                <td className="p-3">{quiz.title}</td>
                <td className="p-3">{quiz.category}</td>
                <td className="p-3 capitalize">{quiz.difficulty}</td>
                <td className="p-3">{quiz.createdBy?.fullName || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
