import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function QuizCard({ quiz, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="bg-green-50 border border-green-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between"
    >
      <div>
        <h2 className="text-xl font-semibold text-green-800 mb-2">{quiz.title}</h2>
        <p className="text-gray-600 text-sm mb-3">{quiz.description}</p>

        <div className="flex flex-wrap gap-2 text-xs font-medium">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Category: {quiz.category}
          </span>
          <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
            Difficulty: {quiz.difficulty}
          </span>
        </div>
      </div>

      <Link
        to={`/quiz/${quiz._id}`}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded-lg font-medium transition"
      >
        Start Quiz
      </Link>
    </motion.div>
  )
}
