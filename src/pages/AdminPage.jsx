import React, { useState } from "react";

const AdminPage = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    text: "",
    type: "MCQ",
    options: ["", "", "", ""],
    correctOption: "",
  });

  // add current question to list
  const addQuestion = () => {
    if (!currentQuestion.text.trim()) return alert("Question text required!");
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      text: "",
      type: "MCQ",
      options: ["", "", "", ""],
      correctOption: "",
    });
  };

  // save quiz to backend
  const handleSubmit = async () => {
    if (!title.trim() || questions.length === 0) {
      alert("Please enter title and at least one question!");
      return;
    }

    const newQuiz = {
      title,
      questions,
    };

    const res = await fetch("https://quiz-management-system-react.onrender.com/quizzes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuiz),
    });

    if (res.ok) {
      alert("Quiz created successfully!");
      setTitle("");
      setQuestions([]);
    } else {
      alert("Error saving quiz!");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* <h1 className="text-2xl font-bold mb-4">Create a Quiz</h1> */}

      {/* Quiz Title */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Quiz Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Enter quiz title"
        />
      </div>

      {/* Question Form */}
      <div className="mb-6 border-t pt-4">
        <h2 className="font-semibold mb-2">Add Question</h2>

        <input
          type="text"
          value={currentQuestion.text}
          onChange={(e) =>
            setCurrentQuestion({ ...currentQuestion, text: e.target.value })
          }
          className="border p-2 w-full rounded mb-2"
          placeholder="Enter question text"
        />

        <select
          value={currentQuestion.type}
          onChange={(e) =>
            setCurrentQuestion({ ...currentQuestion, type: e.target.value })
          }
          className="border p-2 rounded mb-2"
        >
          <option value="MCQ">Multiple Choice</option>
          <option value="TRUE_FALSE">True / False</option>
          <option value="TEXT">Text</option>
        </select>

        {currentQuestion.type === "MCQ" && (
          <div>
            {currentQuestion.options.map((opt, i) => (
              <input
                key={i}
                type="text"
                value={opt}
                onChange={(e) => {
                  const newOpts = [...currentQuestion.options];
                  newOpts[i] = e.target.value;
                  setCurrentQuestion({ ...currentQuestion, options: newOpts });
                }}
                className="border p-2 w-full rounded mb-2"
                placeholder={`Option ${i + 1}`}
              />
            ))}
            <input
              type="text"
              value={currentQuestion.correctOption}
              onChange={(e) =>
                setCurrentQuestion({
                  ...currentQuestion,
                  correctOption: e.target.value,
                })
              }
              className="border p-2 w-full rounded mb-2"
              placeholder="Correct option (must match one above)"
            />
          </div>
        )}

        {currentQuestion.type === "TRUE_FALSE" && (
          <select
            value={currentQuestion.correctOption}
            onChange={(e) =>
              setCurrentQuestion({
                ...currentQuestion,
                correctOption: e.target.value,
              })
            }
            className="border p-2 rounded mb-2"
          >
            <option value="">Select correct answer</option>
            <option value="True">True</option>
            <option value="False">False</option>
          </select>
        )}

        {currentQuestion.type === "TEXT" && (
          <input
            type="text"
            value={currentQuestion.correctOption}
            onChange={(e) =>
              setCurrentQuestion({
                ...currentQuestion,
                correctOption: e.target.value,
              })
            }
            className="border p-2 w-full rounded mb-2"
            placeholder="Enter correct answer (optional)"
          />
        )}

        <button
          onClick={addQuestion}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Question
        </button>
      </div>

      {/* Display added questions */}
      {questions.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Questions Added:</h3>
          <ul className="list-disc pl-5">
            {questions.map((q, idx) => (
              <li key={idx}>
                {q.text} ({q.type})
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Save Quiz
      </button>
    </div>
  );
};

export default AdminPage;
