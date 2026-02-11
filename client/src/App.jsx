// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Report from './pages/Report'
import Quiz from './pages/Quiz'
import About from './pages/About'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import QuizHome from './pages/quiz/QuizHome'
import QuizPlayer from './pages/quiz/QuizPlayer'
// import QuizPlayer from './pages/quiz/QuizPlayer'
import Dashboard from './pages/admin/Dashboard'
import AllUsers from './pages/admin/AllUsers'
import AllQuizzes from './pages/admin/AllQuizzes'
import QuizResult from './pages/quiz/QuizResult'
import CreateQuizAdmin from './pages/admin/CreateQuizAdmin'

import TeacherDashboard from './pages/teacher/TeacherDashboard'
import MyQuizzes from './pages/teacher/MyQuizzes'
import CreateQuizTeacher from './pages/teacher/CreateQuizTeacher'
import QuizEdit from './pages/teacher/QuizEdit'
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 text-gray-900 font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/report" element={<Report />} />
        {/* <Route path="/quiz" element={<Quiz />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/quiz" element={<QuizHome />} />
        <Route path="/quiz/:id" element={<QuizPlayer />} />
        <Route path="/quiz/:id" element={<QuizPlayer />} />
        <Route path="/quiz/result" element={<QuizResult />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
<Route path="/admin/users" element={<AllUsers />} />
<Route path="/admin/quizzes" element={<AllQuizzes />} />
<Route path="/admin/create" element={<CreateQuizAdmin />} />

<Route path="/teacher/dashboard" element={<TeacherDashboard />} />
<Route path="/teacher/quizzes" element={<MyQuizzes />} />
<Route path="/teacher/create-quiz" element={<CreateQuizTeacher />} />
<Route path="/teacher/edit/:id" element={<QuizEdit />} />
      </Routes>
    </div>
  )
}

export default App
