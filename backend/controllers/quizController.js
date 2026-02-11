import Quiz from '../models/Quiz.js'

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().select('-questions.correctAnswerIndex') // hide answers
    res.status(200).json(quizzes)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quizzes' })
  }
}

// Get a specific quiz
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' })
    res.status(200).json(quiz)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quiz' })
  }
}

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const newQuiz = new Quiz({ ...req.body, createdBy: req.user.id })
    await newQuiz.save()
    res.status(201).json(newQuiz)
  } catch (err) {
    res.status(500).json({ message: 'Failed to create quiz' })
  }
}

// Submit quiz and check answers
export const submitQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
    const { answers } = req.body // array of selected indexes

    let score = 0
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswerIndex) score++
    })

    res.status(200).json({ score, total: quiz.questions.length })
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit quiz' })
  }
}




// controllers/quizController.js

export const updateQuiz = async (req, res) => {
  try {
    const quizId = req.params.id
    const updatedData = req.body

    const quiz = await Quiz.findById(quizId)

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    // Optional: Allow only creator or admin to update
    if (quiz.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this quiz' })
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updatedData, {
      new: true,
      runValidators: true,
    })

    res.status(200).json(updatedQuiz)
  } catch (error) {
    console.error('❌ Error updating quiz:', error)
    res.status(500).json({ message: 'Server error' })
  }
}



export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    // Optional: Only allow creator or admin to delete
    if (quiz.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this quiz' })
    }

    await Quiz.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: 'Quiz deleted successfully' })
  } catch (error) {
    console.error('❌ Error deleting quiz:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
