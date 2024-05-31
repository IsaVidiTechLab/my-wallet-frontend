import "./App.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import ExpensePage from "./pages/ExpensePage";
import CategoryPage from "./pages/CategoryPage";
import YearlyReportPage from "./pages/YearlyReportPage";
import MonthlyReportPage from "./pages/MonthlyReportPage";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <div>
        <Sidebar />
        <Routes>
          <Route
            path="/signup"
            element={
              <IsAnon>
                <SignupPage />
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                <LoginPage />
              </IsAnon>
            }
          />
          <Route
            path="/"
            element={
              <IsPrivate>
                <ExpensePage />
              </IsPrivate>
            }
          />
          <Route
            path="/category"
            element={
              <IsPrivate>
                <CategoryPage />
              </IsPrivate>
            }
          />
          <Route
            path="/yearly-report"
            element={
              <IsPrivate>
                <YearlyReportPage />
              </IsPrivate>
            }
          />
          <Route
            path="/monthly-report"
            element={
              <IsPrivate>
                <MonthlyReportPage />
              </IsPrivate>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
