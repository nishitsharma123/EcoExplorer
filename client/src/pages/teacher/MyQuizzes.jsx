// src/pages/teacher/QuizList.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../utils/api'

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
    const token = localStorage.getItem('token')
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get('/teacher/quizzes/my',{
            headers: { Authorization: `Bearer ${token}` }
        })
        setQuizzes(res.data)
      } catch (err) {
        console.error(err) // Add this
        console.error('Failed to load quizzes')
      } finally {
        setLoading(false)
      }
    }
    fetchQuizzes()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return
    try {
      await API.delete(`/teacher/quizzes/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setQuizzes(quizzes.filter((q) => q._id !== id))
    } catch (err) {
      alert('Failed to delete quiz')
    }
  }

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Your Quizzes</h1>
      <Link
        to="/teacher/create-quiz"
        className="mb-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
      >
        ➕ Create New Quiz
      </Link>
      {quizzes.length === 0 ? (
        <p className="mt-6 text-gray-500">You haven't created any quizzes yet.</p>
      ) : (
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="border p-4 rounded-lg shadow bg-white flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold text-green-800">{quiz.title}</h2>
                <p className="text-sm text-gray-600">{quiz.description}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={`/teacher/edit/${quiz._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(quiz._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
