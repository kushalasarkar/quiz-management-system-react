import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import QuizListPage from "./pages/QuizListPage";
import QuizPage from "./pages/QuizPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/slices/authSlice";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
          <Link to="/" className="font-bold text-lg">
            QuizApp
          </Link>
          <div className="space-x-4 flex items-center">
            {user?.role === "admin" && (
              <Link to="/admin" className="hover:underline">
                Admin
              </Link>
            )}
            {user ? (
              <>
                <span className="text-sm">Hi, {user.username}</span>
                <button
                  onClick={() => dispatch(logout())}
                  className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            )}
          </div>
        </nav>

        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<QuizListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute role="admin">
                  <AdminPage />
                </ProtectedRoute>
              }
            />
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
