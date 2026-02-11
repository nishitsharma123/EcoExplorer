// src/pages/teacher/QuizList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, PlusCircle, Edit, Trash2 } from "lucide-react";
import API from "../../utils/api";

export default function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get("/teacher/quizzes/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await API.delete(`/teacher/quizzes/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuizzes(quizzes.filter((q) => q._id !== id));
    } catch (err) {
      alert("Failed to delete quiz");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100">
        <p className="text-emerald-700 text-lg font-semibold">
          Loading your quizzes...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-emerald-800 mb-2">
              📚 Your Quizzes
            </h1>
            <p className="text-gray-600">
              Manage and update your created quizzes.
            </p>
          </div>

          <Link
            to="/teacher/create-quiz"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition shadow-lg"
          >
            <PlusCircle size={18} />
            Create New Quiz
          </Link>
        </div>

        {/* Empty State */}
        {quizzes.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
            <BookOpen size={50} className="mx-auto text-emerald-500 mb-4" />
            <p className="text-gray-500 text-lg">
              You haven't created any quizzes yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz._id}
                className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-emerald-800 mb-2">
                    {quiz.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {quiz.description}
                  </p>
                </div>

                <div className="flex gap-4 mt-6">
                  <Link
                    to={`/teacher/edit/${quiz._id}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(quiz._id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium transition"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
