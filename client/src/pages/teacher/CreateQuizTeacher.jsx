import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../utils/api'

export default function QuizCreate() {
  const navigate = useNavigate()

  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'medium',
  })

  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''],
      correctAnswerIndex: 0,
    },
  ])

  const handleQuizChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value })
  }

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions]
    if (field === 'question' || field === 'correctAnswerIndex') {
      updated[index][field] = field === 'correctAnswerIndex' ? parseInt(value) : value
    } else {
      updated[index].options[field] = value
    }
    setQuestions(updated)
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswerIndex: 0,
      },
    ])
  }

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const updated = [...questions]
      updated.splice(index, 1)
      setQuestions(updated)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await API.post(
        '/teacher/quizzes/create',
        { ...quiz, questions },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('Quiz created successfully!')
      navigate('/teacher/quizzes')
    } catch (err) {
      console.error('Quiz creation failed:', err)
      alert('Failed to create quiz.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Create New Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Quiz Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Quiz Title"
            value={quiz.title}
            onChange={handleQuizChange}
            className="input"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={quiz.category}
            onChange={handleQuizChange}
            className="input"
            required
          />
          <select
            name="difficulty"
            value={quiz.difficulty}
            onChange={handleQuizChange}
            className="input"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={quiz.description}
            onChange={handleQuizChange}
            className="input"
          />
        </div>

        {/* Questions Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Questions</h2>
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="border rounded-lg p-4 mb-4 bg-green-50 space-y-3">
              <input
                type="text"
                placeholder={`Question ${qIndex + 1}`}
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                className="input"
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    placeholder={`Option ${optIndex + 1}`}
                    value={opt}
                    onChange={(e) => handleQuestionChange(qIndex, optIndex, e.target.value)}
                    className="input"
                    required
                  />
                ))}
              </div>
              <select
                value={q.correctAnswerIndex}
                onChange={(e) =>
                  handleQuestionChange(qIndex, 'correctAnswerIndex', e.target.value)
                }
                className="input"
              >
                {q.options.map((_, idx) => (
                  <option key={idx} value={idx}>
                    Correct Option: {idx + 1}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => removeQuestion(qIndex)}
                className="text-red-600 text-sm hover:underline"
              >
                Remove Question
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addQuestion}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            + Add Question
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
        >
          Create Quiz
        </button>
      </form>

      {/* Input styling */}
      <style>{`
        .input {
          padding: 0.75rem;
          border-radius: 0.75rem;
          border: 1px solid #ccc;
          width: 100%;
          transition: border 0.2s;
        }
        .input:focus {
          border-color: #15803d;
          outline: none;
        }
      `}</style>
    </div>
  )
}
