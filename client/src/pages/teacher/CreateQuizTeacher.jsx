// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import API from '../../utils/api'

// export default function QuizCreate() {
//   const navigate = useNavigate()

//   const [quiz, setQuiz] = useState({
//     title: '',
//     description: '',
//     category: '',
//     difficulty: 'medium',
//     questions: [
//       { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
//     ],
//   })

//   const handleChange = (e) => {
//     setQuiz({ ...quiz, [e.target.name]: e.target.value })
//   }

//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...quiz.questions]
//     if (field === 'correctAnswerIndex') {
//       updatedQuestions[index][field] = parseInt(value)
//     } else {
//       updatedQuestions[index][field] = value
//     }
//     setQuiz({ ...quiz, questions: updatedQuestions })
//   }

//   const handleOptionChange = (qIndex, optIndex, value) => {
//     const updatedQuestions = [...quiz.questions]
//     updatedQuestions[qIndex].options[optIndex] = value
//     setQuiz({ ...quiz, questions: updatedQuestions })
//   }

//   const addQuestion = () => {
//     setQuiz({
//       ...quiz,
//       questions: [
//         ...quiz.questions,
//         { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
//       ],
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const token = localStorage.getItem('token')
//       await API.post('/teacher/quizzes/create', quiz, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       navigate('/teacher/quizzes')
//     } catch (err) {
//       console.error('Quiz creation failed:', err)
//       alert('Something went wrong while creating the quiz.')
//     }
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-green-700">Create New Quiz</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <input
//           type="text"
//           name="title"
//           placeholder="Quiz Title"
//           value={quiz.title}
//           onChange={handleChange}
//           className="input"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={quiz.description}
//           onChange={handleChange}
//           className="input"
//         />
//         <input
//           type="text"
//           name="category"
//           placeholder="Category"
//           value={quiz.category}
//           onChange={handleChange}
//           className="input"
//         />
//         <select
//           name="difficulty"
//           value={quiz.difficulty}
//           onChange={handleChange}
//           className="input"
//         >
//           <option value="easy">Easy</option>
//           <option value="medium">Medium</option>
//           <option value="hard">Hard</option>
//         </select>

//         {/* Questions */}
//         {quiz.questions.map((q, qIndex) => (
//           <div key={qIndex} className="bg-gray-50 p-4 rounded-xl border">
//             <input
//               type="text"
//               placeholder={`Question ${qIndex + 1}`}
//               value={q.question}
//               onChange={(e) =>
//                 handleQuestionChange(qIndex, 'question', e.target.value)
//               }
//               className="input mb-2"
//               required
//             />

//             <div className="grid grid-cols-2 gap-2">
//               {q.options.map((opt, optIndex) => (
//                 <input
//                   key={optIndex}
//                   type="text"
//                   placeholder={`Option ${optIndex + 1}`}
//                   value={opt}
//                   onChange={(e) =>
//                     handleOptionChange(qIndex, optIndex, e.target.value)
//                   }
//                   className="input"
//                   required
//                 />
//               ))}
//             </div>

//             <select
//               value={q.correctAnswerIndex}
//               onChange={(e) =>
//                 handleQuestionChange(qIndex, 'correctAnswerIndex', e.target.value)
//               }
//               className="input mt-2"
//             >
//               {q.options.map((_, idx) => (
//                 <option key={idx} value={idx}>
//                   Correct Answer: Option {idx + 1}
//                 </option>
//               ))}
//             </select>
//           </div>
//         ))}

//         <button
//           type="button"
//           onClick={addQuestion}
//           className="text-green-700 font-medium hover:underline"
//         >
//           + Add Another Question
//         </button>

//         <button
//           type="submit"
//           className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl"
//         >
//           Create Quiz
//         </button>
//       </form>

//       {/* Style */}
//       <style>{`
//         .input {
//           width: 100%;
//           padding: 0.75rem;
//           border: 1px solid #ccc;
//           border-radius: 0.75rem;
//           transition: border 0.2s;
//         }
//         .input:focus {
//           border-color: #15803d;
//           outline: none;
//         }
//       `}</style>
//     </div>
//   )
// }

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
