import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function QuizResult() {
  const location = useLocation()
  const navigate = useNavigate()
  const { score, total } = location.state || {}

  if (score === undefined || total === undefined) {
    return (
      <div className="text-center p-10">
        <p className="text-lg text-red-600">No result data found.</p>
        <button
          onClick={() => navigate('/quiz')}
          className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg"
        >
          Go to Quiz List
        </button>
      </div>
    )
  }

  const percentage = Math.round((score / total) * 100)
  const getMessage = () => {
    if (percentage === 100) return "🌟 Perfect! You're an Eco Genius!"
    if (percentage >= 70) return "🎉 Great Job! Keep learning."
    if (percentage >= 40) return "👍 Not bad! You can do even better."
    return "📚 Keep going! Every effort counts."
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-green-50 border border-green-200 rounded-2xl shadow-md p-8 max-w-md w-full text-center"
      >
        <h2 className="text-3xl font-bold text-green-700 mb-4">Your Result</h2>

        <div className="relative w-full bg-gray-200 h-5 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-green-600 transition-all"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <p className="text-lg font-semibold text-gray-700 mb-2">
          Score: {score} / {total} ({percentage}%)
        </p>
        <p className="text-green-800 font-medium text-md mb-6">{getMessage()}</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/quiz')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Try Another Quiz
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
          >
            Home
          </button>
        </div>
      </motion.div>
    </div>
  )
}
