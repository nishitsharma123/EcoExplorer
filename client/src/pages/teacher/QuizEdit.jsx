import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../utils/api'

export default function QuizEdit() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await API.get(`/teacher/quizzes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setQuiz(res.data)
        setLoading(false)
      } catch (err) {
        console.error('Failed to load quiz:', err)
      }
    }

    fetchQuiz()
  }, [id])

  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value })
  }

  const handleQuestionChange = (index, field, value) => {
    const updated = [...quiz.questions]
    if (field === 'correctAnswerIndex') {
      updated[index][field] = parseInt(value)
    } else {
      updated[index][field] = value
    }
    setQuiz({ ...quiz, questions: updated })
  }

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...quiz.questions]
    updated[qIndex].options[optIndex] = value
    setQuiz({ ...quiz, questions: updated })
  }

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
      ],
    })
  }

  const removeQuestion = (index) => {
    if (quiz.questions.length > 1) {
      const updated = [...quiz.questions]
      updated.splice(index, 1)
      setQuiz({ ...quiz, questions: updated })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await API.put(`/teacher/quizzes/update/${id}`, quiz, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert('Quiz updated successfully!')
      navigate('/teacher/quizzes')
    } catch (err) {
      console.error('Quiz update failed:', err)
      alert('Something went wrong while updating the quiz.')
    }
  }

  if (loading || !quiz) return <div className="p-6">Loading quiz...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Edit Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Quiz Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Quiz Title"
            value={quiz.title}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={quiz.category}
            onChange={handleChange}
            className="input"
            required
          />
          <select
            name="difficulty"
            value={quiz.difficulty}
            onChange={handleChange}
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
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* Questions Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Questions</h2>
          {quiz.questions.map((q, qIndex) => (
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
                    onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
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
          Update Quiz
        </button>
      </form>

      {/* Input Styling */}
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
