import './App.css'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import IsAnon from './components/IsAnon'
import IsPrivate from './components/IsPrivate'
import HomePage from './pages/HomePage'
import { Routes, Route } from "react-router-dom";
import ExpensePage from './pages/ExpensePage'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
          <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
          <Route path="/" element={<IsPrivate><HomePage /></IsPrivate>} />
          <Route path="/expense" element={<IsPrivate><ExpensePage/></IsPrivate>} />
          
        </Routes>
      </div>
    </>
  )
}

export default App
