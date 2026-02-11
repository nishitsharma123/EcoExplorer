import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuizPlayer() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        // const res = await axios.get(`http://localhost:5000/api/quiz/${id}`)
        const res = await axios.get(`https://ecoexplorer-www0.onrender.com/api/quiz/${id}`)
        setQuiz(res.data)
        setAnswers(new Array(res.data.questions.length).fill(null))
        setLoading(false)
      } catch (err) {
        console.error('Failed to load quiz:', err)
      }
    }
    fetchQuiz()
  }, [id])

  const handleOptionSelect = (optIndex) => {
    const updated = [...answers]
    updated[current] = optIndex
    setAnswers(updated)
  }

  const handleNext = () => {
    if (current < quiz.questions.length - 1) setCurrent(current + 1)
  }

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1)
  }

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      alert('Please answer all questions before submitting.')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(
        // `http://localhost:5000/api/quiz/submit/${id}`,
        `https://ecoexplorer-www0.onrender.com/api/quiz/submit/${id}`,
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate('/quiz/result', {
        state: { score: res.data.score, total: res.data.total },
      })
    } catch (err) {
      console.error('Submission failed:', err)
      alert('Something went wrong. Try again later.')
    }
  }

  if (loading || !quiz) return <div className="p-8">Loading quiz...</div>

  const q = quiz.questions[current]

  return (
    <div className="min-h-screen bg-white px-4 md:px-16 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center">
        {quiz.title}
      </h1>

      {/* Progress Bar */}
      <div className="relative w-full h-4 bg-green-100 rounded-full overflow-hidden mb-6">
        <div
          className="absolute top-0 left-0 h-full bg-green-600 transition-all duration-300"
          style={{
            width: `${((current + 1) / quiz.questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Animated Question Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-lg font-semibold mb-3">
            {current + 1}. {q.question}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className={`px-4 py-2 text-left rounded-lg border font-medium transition ${
                  answers[current] === idx
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-gray-100 hover:bg-green-100 border-gray-300'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          disabled={current === 0}
          onClick={handlePrev}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg disabled:opacity-50"
        >
          Prev
        </button>

        {current === quiz.questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="bg-green-700 hover:bg-green-800 text-white font-medium py-2 px-6 rounded-lg"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
