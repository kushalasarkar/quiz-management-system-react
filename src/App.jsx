import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import QuizListPage from "./pages/QuizListPage";
import QuizPage from "./pages/QuizPage";

const App = () => {
  return (
    <Router>
      <nav className="p-4 bg-gray-100 flex gap-4">
        <Link to="/" className="font-medium">Home</Link>
        <Link to="/admin" className="font-medium">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<QuizListPage />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
