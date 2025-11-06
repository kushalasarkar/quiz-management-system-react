import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch("https://quiz-management-system-react.onrender.com/quizzes")
      .then((res) => res.json())
      .then((data) => setQuizzes(data))
      .catch((err) => console.error("Error fetching quizzes:", err));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Quizzes</h1>

      {quizzes.length === 0 ? (
        <p className="text-center text-gray-600">
          No quizzes available. Please add one from Admin page.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-xl shadow p-5 flex flex-col justify-between"
            >
              <h2 className="font-semibold text-lg mb-2">{quiz.title}</h2>
              <Link
                to={`/quiz/${quiz.id}`}
                className="bg-blue-600 text-white text-center rounded-md py-2 mt-3 hover:bg-blue-700"
              >
                Start Quiz
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizListPage;
