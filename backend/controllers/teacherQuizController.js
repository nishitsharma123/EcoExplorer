import Quiz from '../models/Quiz.js'

// Get all quizzes created by this teacher
export const getMyQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.user.id })
    res.json(quizzes)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch your quizzes' })
  }
}

// Create a new quiz (only for teacher)
export const createMyQuiz = async (req, res) => {
  try {
    const quiz = new Quiz({ ...req.body, createdBy: req.user.id })
    const savedQuiz = await quiz.save()
    res.status(201).json(savedQuiz)
  } catch (error) {
    
    res.status(500).json({ message: 'Failed to create quiz' })
  }
}

// Update a quiz (must be owned by the teacher)
export const updateMyQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ _id: req.params.id, createdBy: req.user.id })
    if (!quiz) return res.status(404).json({ message: 'Quiz not found or not yours' })

    Object.assign(quiz, req.body)
    const updatedQuiz = await quiz.save()
    res.json(updatedQuiz)
  } catch (error) {
    res.status(500).json({ message: 'Failed to update quiz' })
  }
}

// Delete a quiz (must be owned by the teacher)
export const deleteMyQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id })
    if (!quiz) return res.status(404).json({ message: 'Quiz not found or not yours' })

    res.json({ message: 'Quiz deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete quiz' })
  }
}


export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    })

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    res.json(quiz)
  } catch (error) {
    console.error('Error fetching quiz by ID:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
