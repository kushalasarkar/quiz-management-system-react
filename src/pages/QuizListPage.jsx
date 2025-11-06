import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch("https://quiz-server.onrender.com/quizzes")
      .then((res) => res.json())
      .then((data) => setQuizzes(data))
      .catch((err) => console.error("Error fetching quizzes:", err));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      {quizzes.length === 0 ? (
        <p>No quizzes available. Please add one from Admin page.</p>
      ) : (
        <ul className="space-y-3">
          {quizzes.map((quiz) => (
            <li
              key={quiz.id}
              className="border rounded p-3 flex justify-between items-center"
            >
              <span className="font-medium">{quiz.title}</span>
              <Link
                to={`/quiz/${quiz.id}`}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Start
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizListPage;
