import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetch(`https://quiz-management-system-react.onrender.com/quizzes/${id}`)
      .then((res) => res.json())
      .then((data) => setQuiz(data))
      .catch((err) => console.error("Error fetching quiz:", err));
  }, [id]);

  const handleChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = () => {
    if (!quiz) return;

    let correct = 0;

    quiz.questions.forEach((q) => {
      const userAns = answers[q.id];
      if (
        userAns &&
        userAns.trim().toLowerCase() === q.correctOption.trim().toLowerCase()
      ) {
        correct++;
      }
    });

    const result = {
      correct,
      total: quiz.questions.length,
      percentage: Math.round((correct / quiz.questions.length) * 100),
    };

    setScore(result);

    // Save submission to mock backend
    fetch("https://quiz-management-system-react.onrender.com/submissions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quizId: quiz.id,
        answers,
        score: result,
        submittedAt: new Date().toISOString(),
      }),
    });
  };

  const handleRetake = () => {
    setAnswers({});
    setScore(null);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  if (!quiz) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">{quiz.title}</h1>

      {!score ? (
        <>
          {quiz.questions.map((q, i) => (
            <div key={q.id} className="mb-6 border-b pb-4">
              <p className="font-medium mb-3">
                {i + 1}. {q.text}
              </p>

              {q.type === "MCQ" &&
                q.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`block mb-2 border rounded-md px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                      answers[q.id] === opt ? "bg-blue-50 border-blue-400" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q_${q.id}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}

              {q.type === "TEXT" && (
                <input
                  type="text"
                  className="border rounded-md w-full p-2 mt-2"
                  placeholder="Type your answer..."
                  value={answers[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              )}
            </div>
          ))}

          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
            >
              Submit Quiz
            </button>
          </div>
        </>
      ) : (
        <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">🎉 Quiz Completed!</h2>
          <p className="text-gray-700 mb-2">
            You scored <b>{score.correct}</b> out of <b>{score.total}</b>
          </p>
          <p className="text-gray-600 mb-6">
            ({score.percentage}% correct answers)
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleRetake}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
            >
              Retake Quiz
            </button>
            <button
              onClick={handleGoHome}
              className="bg-gray-300 text-gray-800 px-5 py-2 rounded-md hover:bg-gray-400"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
