import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import QuizListPage from "./pages/QuizListPage";
import QuizPage from "./pages/QuizPage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
          <Link to="/" className="font-bold text-lg">
            QuizApp
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/admin" className="hover:underline">
              Admin
            </Link>
          </div>
        </nav>

        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<QuizListPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>

        <footer className="bg-gray-100 py-3 text-center text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} QuizApp
        </footer>
      </div>
    </Router>
  );
};

export default App;
