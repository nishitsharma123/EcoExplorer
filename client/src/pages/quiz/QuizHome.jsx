import { useEffect, useState } from 'react'
import axios from 'axios'
import QuizCard from '../../components/quiz/QuizCard'

export default function QuizHome() {
  const [quizzes, setQuizzes] = useState([])

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/quiz')
        setQuizzes(res.data)
      } catch (err) {
        console.error('Failed to fetch quizzes:', err)
      }
    }

    fetchQuizzes()
  }, [])

  return (
    <div className="min-h-screen bg-white px-4 md:px-16 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">
        🌿 Explore Eco-Quizzes
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz, index) => (
          <QuizCard key={quiz._id} quiz={quiz} index={index} />
        ))}
      </div>
    </div>
  )
}
