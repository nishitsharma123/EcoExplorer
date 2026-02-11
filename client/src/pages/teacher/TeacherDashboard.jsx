// src/pages/teacher/TeacherDashboard.jsx
import { Link } from "react-router-dom";
import { BookOpen, PlusCircle, BarChart3, Users } from "lucide-react";

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-8">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-emerald-800 mb-2">
          👨‍🏫 Teacher Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your quizzes and track student engagement.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">

        {/* Quick Stats Section */}
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition">
            <BookOpen className="text-emerald-600" size={40} />
            <div>
              <p className="text-gray-500 text-sm">Total Quizzes</p>
              <h3 className="text-2xl font-bold text-emerald-700">12</h3>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition">
            <Users className="text-emerald-600" size={40} />
            <div>
              <p className="text-gray-500 text-sm">Total Students</p>
              <h3 className="text-2xl font-bold text-emerald-700">48</h3>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-4 hover:scale-105 transition">
            <BarChart3 className="text-emerald-600" size={40} />
            <div>
              <p className="text-gray-500 text-sm">Average Score</p>
              <h3 className="text-2xl font-bold text-emerald-700">82%</h3>
            </div>
          </div>

        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">

          <Link
            to="/teacher/quizzes"
            className="bg-white shadow-xl rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition duration-300"
          >
            <BookOpen className="text-emerald-600 mb-4" size={40} />
            <h2 className="text-2xl font-semibold text-emerald-800 mb-2">
              Manage My Quizzes
            </h2>
            <p className="text-gray-600 text-sm">
              View, edit, and manage all the quizzes you have created.
            </p>
          </Link>

          <Link
            to="/teacher/create-quiz"
            className="bg-white shadow-xl rounded-3xl p-8 hover:shadow-2xl hover:scale-105 transition duration-300"
          >
            <PlusCircle className="text-emerald-600 mb-4" size={40} />
            <h2 className="text-2xl font-semibold text-emerald-800 mb-2">
              Create New Quiz
            </h2>
            <p className="text-gray-600 text-sm">
              Design and publish a new quiz for your students.
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
}
